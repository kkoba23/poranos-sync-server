"""
ScrcpyService: scrcpy v3.2 server を起動し、H.264 ストリームを WebSocket に中継する。

アーキテクチャ:
  Quest 3  ──ADB forward──>  Python (TCP read)  ──WebSocket──>  Browser (WebCodecs)
  scrcpy-server v3.2          ScrcpyService                      MirroringView.vue
"""
import asyncio
import logging
import os
import random
import struct
import sys
import time
from typing import Optional

from config import settings
from services import get_adb_path

logger = logging.getLogger(__name__)

# scrcpy-server の場所
def _scrcpy_server_path() -> str:
    if getattr(sys, "frozen", False):
        # PyInstaller bundle: vendor/ is in _MEIPASS
        return os.path.join(sys._MEIPASS, "vendor", "scrcpy-server")
    if settings.standalone:
        # Standalone dev: relative to this file
        return os.path.join(os.path.dirname(__file__), "..", "vendor", "scrcpy-server")
    return "/app/vendor/scrcpy-server"


SCRCPY_SERVER_DEVICE_PATH = "/data/local/tmp/scrcpy-server.jar"
SCRCPY_VERSION = "3.2"

# パケットフラグ
PACKET_FLAG_CONFIG = 1 << 63
PACKET_FLAG_KEY_FRAME = 1 << 62
PACKET_PTS_MASK = PACKET_FLAG_KEY_FRAME - 1


class ScrcpyStream:
    """1デバイスの scrcpy ストリームを管理"""

    def __init__(self, serial: str, max_size: int = 640, crop: str = ""):
        self.serial = serial
        self.max_size = max_size
        self.crop = crop  # "W:H:X:Y" format — empty means no crop
        self.scid = f"{random.randint(0, 0x7FFFFFFF):08x}"
        self.local_port: Optional[int] = None
        self.process: Optional[asyncio.subprocess.Process] = None
        self.reader: Optional[asyncio.StreamReader] = None
        self.writer: Optional[asyncio.StreamWriter] = None
        self.codec_id: Optional[int] = None
        self.width: int = 0
        self.height: int = 0
        self.running = False
        self._subscribers: list[asyncio.Queue] = []
        self._relay_task: Optional[asyncio.Task] = None
        # キャッシュ: 新規subscriber用
        self._cached_config: Optional[bytes] = None   # SPS/PPS パケット
        self._cached_keyframe: Optional[bytes] = None  # 最新キーフレーム

    def _get_env(self) -> dict:
        env = os.environ.copy()
        env["ANDROID_ADB_SERVER_ADDRESS"] = settings.adb_host
        env["ANDROID_ADB_SERVER_PORT"] = str(settings.adb_port)
        return env

    async def _run_adb(self, *args, timeout: float = 30) -> tuple[str, str, int]:
        env = self._get_env()
        try:
            proc = await asyncio.create_subprocess_exec(
                get_adb_path(), *args,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE,
                env=env,
            )
            stdout, stderr = await asyncio.wait_for(proc.communicate(), timeout=timeout)
            return stdout.decode(errors="replace"), stderr.decode(errors="replace"), proc.returncode or 0
        except asyncio.TimeoutError:
            if proc:
                try:
                    proc.kill()
                    await proc.wait()
                except ProcessLookupError:
                    pass
            return "", "timeout", -1
        except FileNotFoundError:
            return "", "adb not found", -1

    async def start(self) -> bool:
        """scrcpy-server を起動してストリーム中継を開始"""
        try:
            # 0. デバイス上の古い scrcpy-server プロセスをkill
            #    (adb shell のローカルプロセスをkillしてもリモート側は残る)
            await self._run_adb(
                "-s", self.serial, "shell",
                "pkill -f 'app_process.*com.genymobile.scrcpy.Server' 2>/dev/null; "
                "sleep 0.5",
                timeout=5,
            )
            # 古い forward もクリア
            await self._run_adb(
                "-s", self.serial, "forward", "--remove-all",
                timeout=5,
            )

            # 1. scrcpy-server を push（検証付きリトライ）
            for push_attempt in range(3):
                logger.info(f"[{self.serial}] Pushing scrcpy-server... (attempt {push_attempt + 1})")
                _, stderr, rc = await self._run_adb(
                    "-s", self.serial, "push", _scrcpy_server_path(), SCRCPY_SERVER_DEVICE_PATH,
                    timeout=15,
                )
                if rc != 0:
                    logger.error(f"[{self.serial}] Push failed: {stderr}")
                    if push_attempt < 2:
                        await asyncio.sleep(1.0)
                        continue
                    return False
                # push成功を検証: デバイス上にファイルが存在するか確認
                verify_out, _, verify_rc = await self._run_adb(
                    "-s", self.serial, "shell",
                    f"ls -l {SCRCPY_SERVER_DEVICE_PATH} 2>/dev/null && echo VERIFIED",
                    timeout=5,
                )
                if "VERIFIED" in verify_out:
                    break
                logger.warning(
                    f"[{self.serial}] Push reported success but file not found on device "
                    f"(attempt {push_attempt + 1})"
                )
                if push_attempt < 2:
                    await asyncio.sleep(1.0)
            else:
                logger.error(f"[{self.serial}] Push verification failed after 3 attempts")
                return False

            # 2. ADB forward を設定
            self.local_port = ScrcpyStream._allocate_port()
            _, stderr, rc = await self._run_adb(
                "-s", self.serial, "forward",
                f"tcp:{self.local_port}",
                f"localabstract:scrcpy_{self.scid}",
                timeout=5,
            )
            if rc != 0:
                logger.error(f"[{self.serial}] Forward failed: {stderr}")
                return False
            logger.info(f"[{self.serial}] Forward tcp:{self.local_port} -> scrcpy_{self.scid}")

            # 3. scrcpy-server を起動（バックグラウンド）
            crop_opt = f"crop={self.crop} " if self.crop else ""
            server_cmd = (
                f"CLASSPATH={SCRCPY_SERVER_DEVICE_PATH} "
                f"app_process / com.genymobile.scrcpy.Server {SCRCPY_VERSION} "
                f"scid={self.scid} "
                f"log_level=info "
                f"video=true "
                f"audio=false "
                f"control=false "
                f"tunnel_forward=true "
                f"send_device_meta=false "
                f"send_frame_meta=true "
                f"send_codec_meta=true "
                f"send_dummy_byte=true "
                f"{crop_opt}"
                f"max_size={self.max_size} "
                f"max_fps=15 "
                f"video_bit_rate=500000 "
                f"video_codec=h264"
            )
            env = self._get_env()
            self.process = await asyncio.create_subprocess_exec(
                get_adb_path(), "-s", self.serial, "shell", server_cmd,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE,
                env=env,
            )
            logger.info(f"[{self.serial}] scrcpy-server started (scid={self.scid})")

            # 4. サーバー起動を待ってTCP接続
            # ADB forward は 127.0.0.1 (IPv4) でリッスンするため、
            # "localhost" (IPv6 ::1 に解決される可能性) ではなく明示的に 127.0.0.1 を使用
            tcp_host = "127.0.0.1" if settings.standalone else settings.adb_host
            await asyncio.sleep(2.0)
            connected = False
            for attempt in range(10):
                # scrcpy-server プロセスが死んでいないかチェック
                if self.process and self.process.returncode is not None:
                    # プロセスの出力を読む
                    try:
                        out = await self.process.stdout.read()
                        err = await self.process.stderr.read()
                        output = (out.decode(errors="replace") + err.decode(errors="replace")).strip()
                    except Exception:
                        output = ""
                    logger.error(
                        f"[{self.serial}] scrcpy-server process exited with code "
                        f"{self.process.returncode}: {output[:500]}"
                    )
                    await self.stop()
                    return False

                try:
                    self.reader, self.writer = await asyncio.wait_for(
                        asyncio.open_connection(tcp_host, self.local_port),
                        timeout=2.0,
                    )
                    connected = True
                    break
                except (ConnectionRefusedError, asyncio.TimeoutError, OSError) as e:
                    if attempt == 0 or attempt == 9:
                        logger.info(
                            f"[{self.serial}] TCP connect attempt {attempt+1}/10 "
                            f"to {tcp_host}:{self.local_port} failed: {e}"
                        )
                    await asyncio.sleep(0.5)

            if not connected:
                # プロセスの出力を読んでエラー原因を特定
                proc_output = ""
                if self.process:
                    try:
                        # 少し待ってから出力を読む
                        out = await asyncio.wait_for(self.process.stdout.read(4096), timeout=1.0)
                        err = await asyncio.wait_for(self.process.stderr.read(4096), timeout=1.0)
                        proc_output = (out.decode(errors="replace") + err.decode(errors="replace")).strip()
                    except Exception:
                        pass
                logger.error(
                    f"[{self.serial}] Could not connect to scrcpy-server at "
                    f"{tcp_host}:{self.local_port}. Process output: {proc_output[:500] or '(none)'}"
                )
                await self.stop()
                return False

            # 5. ハンドシェイク: dummy byte + codec meta
            # dummy byte (1 byte)
            dummy = await asyncio.wait_for(self.reader.readexactly(1), timeout=5.0)
            logger.debug(f"[{self.serial}] Dummy byte: {dummy.hex()}")

            # codec meta (12 bytes): codec_id(4) + width(4) + height(4)
            codec_meta = await asyncio.wait_for(self.reader.readexactly(12), timeout=5.0)
            self.codec_id = struct.unpack(">I", codec_meta[0:4])[0]
            self.width = struct.unpack(">I", codec_meta[4:8])[0]
            self.height = struct.unpack(">I", codec_meta[8:12])[0]
            logger.info(
                f"[{self.serial}] Stream ready: codec=0x{self.codec_id:08x} "
                f"size={self.width}x{self.height}"
            )

            # 6. リレータスク開始
            self.running = True
            self._relay_task = asyncio.create_task(self._relay_loop())
            return True

        except Exception as e:
            # プロセス出力を読んでエラー原因を特定
            proc_output = ""
            if self.process:
                try:
                    out = await asyncio.wait_for(self.process.stdout.read(4096), timeout=1.0)
                    err = await asyncio.wait_for(self.process.stderr.read(4096), timeout=1.0)
                    proc_output = (out.decode(errors="replace") + err.decode(errors="replace")).strip()
                except Exception:
                    pass
            logger.error(f"[{self.serial}] Start failed: {e}. Process output: {proc_output[:500] or '(none)'}")
            await self.stop()
            return False

    async def stop(self):
        """ストリームを停止してリソースを解放"""
        self.running = False
        if self._relay_task and not self._relay_task.done():
            self._relay_task.cancel()
            try:
                await self._relay_task
            except asyncio.CancelledError:
                pass

        if self.writer:
            try:
                self.writer.close()
                await self.writer.wait_closed()
            except Exception:
                pass
            self.writer = None
            self.reader = None

        if self.process and self.process.returncode is None:
            try:
                self.process.kill()
                await self.process.wait()
            except ProcessLookupError:
                pass
            self.process = None

        # ADB forward を削除
        if self.local_port:
            await self._run_adb(
                "-s", self.serial, "forward", "--remove", f"tcp:{self.local_port}",
                timeout=5,
            )
            self.local_port = None

        # 全subscriber に終了通知
        for q in self._subscribers:
            try:
                q.put_nowait(None)
            except asyncio.QueueFull:
                pass
        self._subscribers.clear()
        logger.info(f"[{self.serial}] Stream stopped")

    def subscribe(self) -> asyncio.Queue:
        """新しい subscriber を追加。Queue で H.264 パケットを受信。
        キャッシュされた CONFIG + 最新キーフレームを即座にキューに入れる。"""
        q: asyncio.Queue = asyncio.Queue(maxsize=120)
        # キャッシュされたパケットを先に送る
        if self._cached_config:
            try:
                q.put_nowait(self._cached_config)
            except asyncio.QueueFull:
                pass
        if self._cached_keyframe:
            try:
                q.put_nowait(self._cached_keyframe)
            except asyncio.QueueFull:
                pass
        self._subscribers.append(q)
        return q

    def unsubscribe(self, q: asyncio.Queue):
        """subscriber を削除"""
        try:
            self._subscribers.remove(q)
        except ValueError:
            pass

    async def _relay_loop(self):
        """TCP ソケットから H.264 パケットを読んで全 subscriber にブロードキャスト"""
        try:
            while self.running:
                # frame header: 12 bytes
                header = await self.reader.readexactly(12)
                pts_and_flags = struct.unpack(">Q", header[0:8])[0]
                packet_size = struct.unpack(">I", header[8:12])[0]

                if packet_size == 0:
                    continue
                if packet_size > 10 * 1024 * 1024:  # 10MB sanity check
                    logger.warning(f"[{self.serial}] Abnormal packet size: {packet_size}")
                    break

                data = await self.reader.readexactly(packet_size)

                is_config = bool(pts_and_flags & PACKET_FLAG_CONFIG)
                is_keyframe = bool(pts_and_flags & PACKET_FLAG_KEY_FRAME)

                # WebSocket 用のフレーム: 1byte flags + 4byte size + data
                flags_byte = (0x01 if is_config else 0) | (0x02 if is_keyframe else 0)
                ws_header = struct.pack(">BI", flags_byte, packet_size)
                ws_packet = ws_header + data

                # キャッシュ: CONFIG と最新キーフレームを保存
                if is_config:
                    self._cached_config = ws_packet
                    logger.debug(f"[{self.serial}] CONFIG cached: {packet_size} bytes")
                if is_keyframe:
                    self._cached_keyframe = ws_packet
                    logger.debug(f"[{self.serial}] Keyframe cached: {packet_size} bytes")

                # ブロードキャスト
                dead_queues = []
                for q in self._subscribers:
                    try:
                        q.put_nowait(ws_packet)
                    except asyncio.QueueFull:
                        # 遅いクライアント: 古いフレームを捨てて最新を入れる
                        try:
                            q.get_nowait()
                        except asyncio.QueueEmpty:
                            pass
                        try:
                            q.put_nowait(ws_packet)
                        except asyncio.QueueFull:
                            dead_queues.append(q)

                for q in dead_queues:
                    self._subscribers.remove(q)

        except asyncio.IncompleteReadError:
            logger.info(f"[{self.serial}] Stream ended (EOF)")
        except asyncio.CancelledError:
            raise
        except Exception as e:
            logger.error(f"[{self.serial}] Relay error: {e}")
        finally:
            self.running = False

    # ADB forward 用ポート範囲（ホスト側のポート）
    _next_port = 27183

    @classmethod
    def _allocate_port(cls) -> int:
        """ADB forward 用ポートを割り当て（27183〜27199）"""
        port = cls._next_port
        cls._next_port += 1
        if cls._next_port > 27199:
            cls._next_port = 27183
        return port


class ScrcpyService:
    """複数デバイスの scrcpy ストリームを管理"""

    def __init__(self):
        self._streams: dict[str, ScrcpyStream] = {}
        # 起動失敗時のクールダウン: serial -> 次に起動を許可する時刻(monotonic)
        self._cooldown: dict[str, float] = {}
        self._cooldown_seconds = 30  # 失敗後30秒間は再試行しない
        # デバイスごとのstart_streamロック（同時起動による pkill 競合を防止）
        self._start_locks: dict[str, asyncio.Lock] = {}
        # グローバルセマフォ: ADBサーバー負荷軽減のため1台ずつ逐次起動
        self._start_semaphore = asyncio.Semaphore(1)

    def is_cooling_down(self, serial: str) -> bool:
        """クールダウン中かどうかを返す"""
        cooldown_until = self._cooldown.get(serial, 0)
        return time.monotonic() < cooldown_until

    async def _get_screen_size(self, serial: str) -> tuple[int, int]:
        """ADB経由でデバイスの画面サイズを取得"""
        env = os.environ.copy()
        env["ANDROID_ADB_SERVER_ADDRESS"] = settings.adb_host
        env["ANDROID_ADB_SERVER_PORT"] = str(settings.adb_port)
        try:
            proc = await asyncio.create_subprocess_exec(
                get_adb_path(), "-s", serial, "shell", "wm", "size",
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE,
                env=env,
            )
            stdout, stderr = await asyncio.wait_for(proc.communicate(), timeout=5.0)
            # Output: "Physical size: 1832x1920" or similar
            text = stdout.decode(errors="replace")
            logger.info(f"[{serial}] wm size output: {text.strip()!r}")
            for line in text.strip().split("\n"):
                if "size" in line.lower():
                    parts = line.split(":")[-1].strip().split("x")
                    if len(parts) == 2:
                        return int(parts[0]), int(parts[1])
        except Exception as e:
            logger.warning(f"[{serial}] Failed to get screen size: {e}")
        return 0, 0

    async def start_stream(self, serial: str, max_size: int = 640) -> Optional[ScrcpyStream]:
        """デバイスのストリームを開始（既存なら再利用、解像度変更時は再起動）"""
        # デバイスごとのロックで同時起動を防止（pkill が新プロセスを殺す問題を回避）
        if serial not in self._start_locks:
            self._start_locks[serial] = asyncio.Lock()
        lock = self._start_locks[serial]

        if lock.locked():
            # 別の接続が起動中 → 完了を待って既存ストリームを返す
            async with lock:
                return self._streams.get(serial) if serial in self._streams and self._streams[serial].running else None

        async with lock:
            logger.info(f"[{serial}] start_stream called (existing={serial in self._streams})")
            if serial in self._streams and self._streams[serial].running:
                if self._streams[serial].max_size == max_size:
                    return self._streams[serial]
                # 解像度変更: 既存ストリームを停止して再起動
                logger.info(f"[{serial}] Restarting stream: max_size {self._streams[serial].max_size} -> {max_size}")
                await self._streams[serial].stop()
                del self._streams[serial]

            # クールダウン中は起動しない（失敗リトライループ防止）
            cooldown_until = self._cooldown.get(serial, 0)
            if time.monotonic() < cooldown_until:
                remaining = int(cooldown_until - time.monotonic())
                logger.info(f"[{serial}] In cooldown, retry in {remaining}s")
                return None

            # 既存の停止済みストリームをクリーンアップ
            if serial in self._streams:
                await self._streams[serial].stop()
                del self._streams[serial]

            # crop なし — Quest OS既知バグ(#5913)でcrop使用時に点滅するため
            # クライアント側で左目をクロップする
            stream = ScrcpyStream(serial, max_size=max_size)
            # セマフォで同時起動数を制限（ADBサーバー負荷軽減）
            async with self._start_semaphore:
                success = await stream.start()
            if success:
                self._cooldown.pop(serial, None)
                self._streams[serial] = stream
                return stream
            # 失敗時はクールダウン設定
            self._cooldown[serial] = time.monotonic() + self._cooldown_seconds
            logger.warning(f"[{serial}] Stream start failed, cooldown {self._cooldown_seconds}s")
            return None

    async def stop_stream(self, serial: str):
        """デバイスのストリームを停止"""
        if serial in self._streams:
            await self._streams[serial].stop()
            del self._streams[serial]

    async def stop_all(self):
        """全ストリームを停止"""
        for stream in list(self._streams.values()):
            await stream.stop()
        self._streams.clear()

    def get_stream(self, serial: str) -> Optional[ScrcpyStream]:
        """アクティブなストリームを取得"""
        stream = self._streams.get(serial)
        if stream and stream.running:
            return stream
        return None

    def get_active_streams(self) -> list[dict]:
        """アクティブなストリーム一覧"""
        return [
            {
                "serial": s.serial,
                "width": s.width,
                "height": s.height,
                "subscribers": len(s._subscribers),
            }
            for s in self._streams.values()
            if s.running
        ]
