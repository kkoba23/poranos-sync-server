import asyncio
import logging
import os
import uuid
from datetime import datetime, timezone
from typing import Optional

import hashlib

import httpx

from config import settings
from services import get_adb_path

logger = logging.getLogger(__name__)

# In-memory install task tracking
_install_tasks: dict[str, dict] = {}

# serial -> running adb install subprocess
_active_install_procs: dict[str, "asyncio.subprocess.Process"] = {}

# コールバック: インストールタスク更新時にWebSocket通知用
_on_task_update = None
# コールバック: プロビジョニングイベント通知用
_on_provision_event = None


def set_task_update_callback(callback):
    global _on_task_update
    _on_task_update = callback


def set_provision_event_callback(callback):
    global _on_provision_event
    _on_provision_event = callback


async def _notify_task_update(task: dict):
    if _on_task_update:
        await _on_task_update(task)


async def _notify_provision_event(serial: str, message: str, level: str = "info"):
    if _on_provision_event:
        await _on_provision_event({"serial": serial, "message": message, "level": level})


def _parse_wifi_devices(raw: str) -> list[str]:
    """Parse comma-separated WiFi device addresses into "ip:port" list."""
    devices = []
    for entry in raw.split(","):
        entry = entry.strip()
        if not entry:
            continue
        if ":" not in entry:
            entry = f"{entry}:5555"
        devices.append(entry)
    return devices


class AdbService:
    def __init__(self):
        self.adb_host = settings.adb_host
        self.adb_port = str(settings.adb_port)
        # serial -> last known status ("device", "offline", "unauthorized", etc.)
        self._device_status: dict[str, str] = {}
        self._reverse_set: set[str] = set()
        self._provisioned_set: set[str] = set()
        self._wifi_devices: list[str] = _parse_wifi_devices(settings.wifi_devices)
        # config由来のWiFiデバイス（自動削除しない）
        self._wifi_persistent: set[str] = set(self._wifi_devices)
        # WiFi devices that are currently connected
        self._wifi_connected: set[str] = set()
        # WiFi connect 連続失敗カウンター（バックオフ用）
        self._wifi_fail_count: dict[str, int] = {}
        # 動的追加デバイスの自動削除閾値（連続失敗回数）
        self._wifi_auto_remove_threshold = 15
        # hw_serial -> serial mappings for USB/WiFi fallback
        self._hw_to_wifi: dict[str, str] = {}
        self._hw_to_usb: dict[str, str] = {}
        # 前回の正常なデバイスリスト（タイムアウト時のフォールバック用）
        self._last_devices: list[dict] = []
        # serial -> 前回の正常なデバイス情報（個別タイムアウト時のフォールバック用）
        self._last_device_info: dict[str, dict] = {}
        # ADBコマンド同時実行数を制限（ADBサーバー過負荷防止）
        self._adb_semaphore = asyncio.Semaphore(4)
        # WiFiデバイスのoffline連続カウンター（自動disconnect用）
        self._wifi_offline_count: dict[str, int] = {}
        # offline連続回数がこの閾値に達したらadb disconnect（約5分 = 30回 × 10秒ポーリング）
        self._wifi_offline_threshold = 30

    def _get_env(self) -> dict:
        env = os.environ.copy()
        env["ANDROID_ADB_SERVER_ADDRESS"] = self.adb_host
        env["ANDROID_ADB_SERVER_PORT"] = self.adb_port
        return env

    async def _run_adb(self, *args, timeout: float = 30) -> tuple[str, str, int]:
        env = self._get_env()
        proc = None
        try:
            proc = await asyncio.create_subprocess_exec(
                get_adb_path(), *args,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE,
                env=env,
            )
            stdout, stderr = await asyncio.wait_for(
                proc.communicate(), timeout=timeout
            )
            return (
                stdout.decode(errors="replace"),
                stderr.decode(errors="replace"),
                proc.returncode or 0,
            )
        except asyncio.TimeoutError:
            if proc:
                try:
                    proc.kill()
                    await proc.wait()
                except ProcessLookupError:
                    pass
            cmd_str = " ".join(str(a) for a in args)
            logger.warning(f"adb command timed out ({timeout}s): {cmd_str[:120]}")
            return "", "Command timed out", -1
        except FileNotFoundError:
            return "", "adb not found", -1

    async def _connect_wifi_devices(self):
        """WiFiデバイスに adb connect を実行（未接続のもののみ、バックオフ付き）"""
        if not self._wifi_devices:
            return
        tasks = []
        for addr in list(self._wifi_devices):
            if addr not in self._wifi_connected:
                # 連続失敗時はバックオフ: 3回失敗後は3回に1回だけ試行
                fail_count = self._wifi_fail_count.get(addr, 0)
                if fail_count >= 3 and fail_count % 3 != 0:
                    self._wifi_fail_count[addr] = fail_count + 1
                    continue
                tasks.append(self._connect_wifi_device(addr))
        if tasks:
            await asyncio.gather(*tasks)

    async def _connect_wifi_device(self, addr: str):
        """単一WiFiデバイスへの adb connect（タイムアウト2秒）"""
        stdout, stderr, rc = await self._run_adb("connect", addr, timeout=2)
        output = stdout + stderr
        if rc == 0 and ("connected to" in output or "already connected" in output):
            if addr not in self._wifi_connected:
                logger.info(f"WiFi ADB connected: {addr}")
            self._wifi_connected.add(addr)
            self._wifi_fail_count.pop(addr, None)
        else:
            if addr in self._wifi_connected:
                logger.warning(f"WiFi ADB lost: {addr} ({output.strip()})")
            self._wifi_connected.discard(addr)
            fail_count = self._wifi_fail_count.get(addr, 0) + 1
            self._wifi_fail_count[addr] = fail_count

            # 動的追加デバイスは連続失敗が閾値に達したら自動削除
            if addr not in self._wifi_persistent and fail_count >= self._wifi_auto_remove_threshold:
                logger.warning(f"WiFi device auto-removed after {fail_count} failures: {addr}")
                self.remove_wifi_device(addr)
                # ADBサーバーからも切断
                await self._run_adb("disconnect", addr, timeout=2)

    def add_wifi_device(self, addr: str) -> str:
        """WiFiデバイスを動的に追加。正規化した addr を返す"""
        if ":" not in addr:
            addr = f"{addr}:5555"
        if addr not in self._wifi_devices:
            self._wifi_devices.append(addr)
            logger.info(f"WiFi device added: {addr}")
        return addr

    def remove_wifi_device(self, addr: str) -> str:
        """WiFiデバイスを動的に削除"""
        if ":" not in addr:
            addr = f"{addr}:5555"
        if addr in self._wifi_devices:
            self._wifi_devices.remove(addr)
            self._wifi_connected.discard(addr)
            logger.info(f"WiFi device removed: {addr}")
        return addr

    def get_wifi_devices(self) -> list[dict]:
        """登録済みWiFiデバイス一覧"""
        return [
            {"address": addr, "connected": addr in self._wifi_connected}
            for addr in self._wifi_devices
        ]

    async def get_devices(self) -> list[dict]:
        # WiFiデバイスへの自動接続
        await self._connect_wifi_devices()

        stdout, stderr, rc = await self._run_adb("devices", "-l")
        if rc != 0:
            logger.error(f"adb devices failed: {stderr}")
            if self._last_devices:
                logger.info(f"Returning cached devices ({len(self._last_devices)} devices)")
            return list(self._last_devices)

        active_serials: list[str] = []
        devices = []
        current_serials: set[str] = set()
        for line in stdout.splitlines():
            line = line.strip()
            if not line or line.startswith("List of devices"):
                continue
            parts = line.split()
            if len(parts) < 2:
                continue
            serial = parts[0]
            status = parts[1]
            current_serials.add(serial)
            self._device_status[serial] = status

            if status != "device":
                # WiFiデバイスは接続完了（device状態）するまで表示しない
                if self._is_wifi_serial(serial):
                    self._wifi_offline_count[serial] = self._wifi_offline_count.get(serial, 0) + 1
                    if self._wifi_offline_count[serial] >= self._wifi_offline_threshold:
                        logger.info(f"WiFi device {serial} offline for {self._wifi_offline_count[serial]} polls, disconnecting")
                        await self._run_adb("disconnect", serial, timeout=5)
                        self._wifi_offline_count.pop(serial, None)
                    continue  # WiFi非device → 常に非表示
                devices.append({
                    "serial": serial,
                    "status": status,
                    "model": "Unknown",
                })
            else:
                # 復帰したらofflineカウンタをリセット
                self._wifi_offline_count.pop(serial, None)
                active_serials.append(serial)

        # インストール中のデバイスはADBコマンドをスキップしてキャッシュを使用
        installing_serials = set(_active_install_procs.keys())
        poll_serials = []
        for s in active_serials:
            if s in installing_serials:
                cached = self._last_device_info.get(s)
                if cached:
                    logger.debug(f"Skipping ADB poll for {s} (install in progress)")
                    devices.append(dict(cached))
                else:
                    poll_serials.append(s)
            else:
                poll_serials.append(s)

        # アクティブなデバイスの情報を並列取得（セマフォで同時実行数制限）
        if poll_serials:
            async def _get_info_limited(s):
                async with self._adb_semaphore:
                    return await self._get_device_info(s)
            tasks = [_get_info_limited(s) for s in poll_serials]
            results = await asyncio.gather(*tasks)
            devices.extend(results)

        # USB/WiFi統合: 同一hw_serialのデバイスをUSB優先で統合
        devices = self._merge_usb_wifi(devices)

        # 切断されたデバイスをトラッキングから除去
        self._reverse_set &= current_serials
        self._provisioned_set &= current_serials
        self._wifi_connected &= current_serials
        for serial in list(self._device_status):
            if serial not in current_serials:
                del self._device_status[serial]
        for serial in list(self._wifi_offline_count):
            if serial not in current_serials:
                del self._wifi_offline_count[serial]

        # sync serverの接続情報を付与
        await self._enrich_sync_status(devices)

        # シリアル番号でソート（表示順を安定させる）
        devices.sort(key=lambda d: d.get("serial", ""))

        # 正常取得時はキャッシュを更新
        self._last_devices = list(devices)
        return devices

    def _merge_usb_wifi(self, devices: list[dict]) -> list[dict]:
        """同一hw_serialのUSB/WiFiデバイスを統合（USB優先）"""
        # hw_serialが取れないデバイス（offlineなど）はそのまま返す
        no_hw: list[dict] = []
        by_hw: dict[str, list[dict]] = {}
        for dev in devices:
            hw = dev.get("hw_serial")
            if not hw:
                no_hw.append(dev)
                continue
            by_hw.setdefault(hw, []).append(dev)

        # WiFi→hw_serial逆引きマップを構築
        wifi_to_hw: dict[str, str] = {v: k for k, v in self._hw_to_wifi.items()}
        # hw_serialが取れたUSBデバイスのシリアル集合
        active_hw_serials = set(by_hw.keys())

        # hw_serialなしのWiFiデバイスは常に非表示
        # （hw_serialが取れればby_hwで統合される。取れないうちは重複カードになるため隠す）
        filtered_no_hw: list[dict] = []
        for dev in no_hw:
            serial = dev.get("serial", "")
            adb_serial = dev.get("adb_serial", serial)
            if self._is_wifi_serial(serial) or self._is_wifi_serial(adb_serial):
                continue  # WiFi + hw_serialなし → 常に非表示
            filtered_no_hw.append(dev)

        merged: list[dict] = list(filtered_no_hw)
        for hw, devs in by_hw.items():
            usb = [d for d in devs if d.get("connection_type") == "usb"]
            wifi = [d for d in devs if d.get("connection_type") == "wifi"]

            if usb and wifi:
                # USB優先: USBのデバイス情報を使い、WiFiシリアルをフォールバックとして保持
                primary = usb[0]
                primary["connection_type"] = "usb"
                primary["wifi_serial"] = wifi[0]["serial"]
                # hw_serialマッピングを記録（USB切断時のフォールバック用）
                self._hw_to_wifi[hw] = wifi[0]["serial"]
                self._hw_to_usb[hw] = usb[0]["serial"]
                merged.append(primary)
            elif usb:
                primary = usb[0]
                # WiFi情報が残っていればフォールバックとして保持
                if hw in self._hw_to_wifi:
                    primary["wifi_serial"] = self._hw_to_wifi[hw]
                merged.append(primary)
            elif wifi:
                primary = wifi[0]
                # WiFi-onlyの場合、wifi_serialにADBシリアル（ip:port）を保持
                primary["wifi_serial"] = wifi[0]["adb_serial"]
                # USB情報が残っていればフォールバックとして保持
                if hw in self._hw_to_usb:
                    primary["usb_serial"] = self._hw_to_usb[hw]
                merged.append(primary)
            else:
                merged.extend(devs)

        return merged

    @staticmethod
    def _is_wifi_serial(serial: str) -> bool:
        """WiFi接続のシリアル番号か判定（ip:port形式）"""
        return ":" in serial and "." in serial

    async def _enrich_sync_status(self, devices: list[dict]):
        """sync serverの/debugからクライアント情報を取得し、deviceId/hwSerialで照合してデバイスに接続状況を付与"""
        try:
            async with httpx.AsyncClient(timeout=3.0) as client:
                resp = await client.get(f"{settings.sync_server_url}/debug")
                resp.raise_for_status()
                debug_data = resp.json()
        except Exception as e:
            logger.debug(f"sync server /debug fetch failed: {e}")
            for dev in devices:
                dev.setdefault("sync_connected", False)
            return

        # 照合キー -> sync client info のマップを構築
        # hwSerial, deviceId の両方をキーとして登録（どちらかがhw_serialと一致すればOK）
        sync_by_key: dict[str, dict] = {}
        for room_name, room_data in debug_data.items():
            for cid, client_info in room_data.get("clients", {}).items():
                info = {
                    "room": room_name,
                    "clientId": int(cid),
                    "connectedVia": client_info.get("connectedVia", ""),
                    "account": client_info.get("account", ""),
                }
                hw = client_info.get("hwSerial", "")
                if hw:
                    sync_by_key[hw] = info
                did = client_info.get("deviceId", "")
                if did:
                    sync_by_key[did] = info

        for dev in devices:
            info = None
            # 1. hw_serial で直接マッチ（hwSerialが送られている場合）
            hw = dev.get("hw_serial", "")
            if hw:
                info = sync_by_key.get(hw)
            # 2. android_id の MD5 = deviceId でマッチ
            #    (Unity SystemInfo.deviceUniqueIdentifier = MD5(android_id))
            if not info:
                aid = dev.get("android_id", "")
                if aid:
                    device_uid = hashlib.md5(aid.encode()).hexdigest()
                    info = sync_by_key.get(device_uid)
            if info:
                dev["sync_connected"] = True
                dev["sync_room"] = info["room"]
                dev["sync_client_id"] = info["clientId"]
                dev["sync_connected_via"] = info["connectedVia"]
                if info.get("account"):
                    dev["app_account"] = info["account"]
            else:
                dev["sync_connected"] = False

    async def _get_device_info(self, serial: str) -> dict:
        """1回のadb shellで全情報を取得し、reverseは並列実行"""
        package = "com.Krelations.Poranos_LT"
        # 1つのshellコマンドで全情報を一括取得（ADB接続1回で済む）
        combined_cmd = (
            f"echo '==HWSERIAL=='; getprop ro.serialno; "
            f"echo '==MODEL=='; getprop ro.product.model; "
            f"echo '==BATTERY=='; dumpsys battery | grep -E 'level|plugged|powered|Max charging current|Weak Charger'; "
            f"echo '==PACKAGE=='; dumpsys package {package} | grep versionName; "
            f"echo '==PID=='; pidof -s {package}; "
            f"echo '==WAKE=='; dumpsys power | grep mWakefulness=; "
            f"echo '==VOLUME=='; dumpsys audio | sed -n '/^- STREAM_MUSIC:/,/^-/p'; "
            f"echo '==ANDROIDID=='; settings get secure android_id; "
            f"echo '==CONTROLLERS=='; dumpsys OVRRemoteService 2>/dev/null | grep 'Paired device:'; "
            f"echo '==WIFISSID=='; "
            f"dumpsys wifi | grep 'mWifiInfo' | sed 's/.*mWifiInfo SSID: //;s/, BSSID:.*//;s/\"//g' | head -1; "
            f"echo '==STORAGE=='; "
            f"df /data | tail -1; "
            f"echo '==ACCOUNT=='; "
            f"run-as {package} sh -c 'cat /data/data/{package}/shared_prefs/*.playerprefs.xml 2>/dev/null' | grep -o '\"Account\"[^<]*<string>[^<]*' | sed 's/.*<string>//' | head -1; "
            f"echo '==END=='"
        )
        shell_task = self._run_adb(
            "-s", serial, "shell", combined_cmd, timeout=10
        )
        reverse_task = self._setup_reverse(serial)
        provision_task = self._provision_device(serial)
        (stdout, stderr, rc), _, _ = await asyncio.gather(
            shell_task, reverse_task, provision_task
        )

        hw_serial = None
        model = None
        battery = None
        battery_plugged = False
        battery_charging_current = None  # microamps
        battery_weak_charger = None
        app_installed = False
        app_version = None
        app_running = False
        wakefulness = None
        volume_music = None
        volume_max = None
        android_id = None
        controller_left_battery = None
        controller_right_battery = None
        wifi_ssid = None
        storage_used_gb = None
        storage_total_gb = None
        app_account = None

        # タイムアウト時は前回の情報を返す
        if rc != 0:
            cached = self._last_device_info.get(serial)
            if cached:
                logger.info(f"Using cached device info for {serial}")
                return dict(cached)
            # キャッシュもなければデフォルト値で返す

        if rc == 0:
            section = ""
            for line in stdout.splitlines():
                line = line.strip()
                if line.startswith("==") and line.endswith("=="):
                    section = line
                    continue
                if not line:
                    continue
                if section == "==HWSERIAL==":
                    hw_serial = line
                elif section == "==MODEL==":
                    model = line
                elif section == "==BATTERY==":
                    if "level:" in line:
                        try:
                            battery = int(line.split(":")[-1].strip())
                        except ValueError:
                            pass
                    elif "plugged:" in line:
                        try:
                            battery_plugged = int(line.split(":")[-1].strip()) > 0
                        except ValueError:
                            pass
                    elif "powered:" in line and "true" in line.lower():
                        battery_plugged = True
                    elif "Max charging current:" in line:
                        try:
                            battery_charging_current = int(line.split(":")[-1].strip())
                        except ValueError:
                            pass
                    elif "Weak Charger:" in line:
                        battery_weak_charger = "true" in line.lower()
                elif section == "==PACKAGE==":
                    if "versionName=" in line:
                        app_installed = True
                        app_version = line.split("versionName=")[-1].strip()
                elif section == "==PID==":
                    app_running = len(line) > 0
                elif section == "==WAKE==":
                    if "mWakefulness=" in line:
                        wakefulness = line.split("mWakefulness=")[-1].strip()
                elif section == "==VOLUME==":
                    # Format: "Max: 15", "streamVolume:9"
                    if line.startswith("Max:"):
                        try:
                            volume_max = int(line.split(":")[-1].strip())
                        except ValueError:
                            pass
                    elif line.startswith("streamVolume:"):
                        try:
                            volume_music = int(line.split(":")[-1].strip())
                        except ValueError:
                            pass
                elif section == "==ANDROIDID==":
                    if line and line != "null":
                        android_id = line
                elif section == "==CONTROLLERS==":
                    # "Paired device: ..., Type:  Right, ..., Battery:  40%, ..."
                    if "Paired device:" in line:
                        import re
                        type_match = re.search(r'Type:\s*(Left|Right)', line)
                        bat_match = re.search(r'Battery:\s*(\d+)%', line)
                        if type_match and bat_match:
                            bat_val = int(bat_match.group(1))
                            if type_match.group(1) == "Left":
                                controller_left_battery = bat_val
                            else:
                                controller_right_battery = bat_val
                elif section == "==WIFISSID==":
                    if line and line != "<unknown ssid>" and not wifi_ssid:
                        # Remove quotes and check it's not a MAC address
                        cleaned = line.strip().strip('"')
                        if cleaned and not re.match(r'^([0-9a-fA-F]{2}:){5}[0-9a-fA-F]{2}$', cleaned):
                            wifi_ssid = cleaned
                elif section == "==STORAGE==":
                    # df output: "/dev/... 123456789 98765432 24691357 80% /data"
                    parts = line.split()
                    if len(parts) >= 4:
                        try:
                            total_kb = int(parts[1])
                            used_kb = int(parts[2])
                            storage_total_gb = round(total_kb / 1048576, 1)
                            storage_used_gb = round(used_kb / 1048576, 1)
                        except (ValueError, IndexError):
                            pass
                elif section == "==ACCOUNT==":
                    if line and not app_account:
                        app_account = line.strip()

            # dumpsys package が結果を返したが versionName がない場合もインストール済み
            if not app_installed and "Unable to find package" not in stdout:
                # versionNameが見つからなくてもpackageセクションにデータがあればインストール済み
                pass

        connection_type = "wifi" if self._is_wifi_serial(serial) else "usb"
        # シリアル表示: hw_serialが取れればそちらを使う（WiFi時もハードウェアシリアルを表示）
        display_serial = hw_serial or serial

        result = {
            "serial": display_serial,
            "adb_serial": serial,
            "hw_serial": hw_serial,
            "connection_type": connection_type,
            "status": "device",
            "model": model or "Unknown",
            "battery_level": battery,
            "battery_plugged": battery_plugged,
            "battery_charging_ma": round(battery_charging_current / 1000) if battery_charging_current else None,
            "battery_weak_charger": battery_weak_charger,
            "app_installed": app_installed,
            "app_version": app_version,
            "app_running": app_running,
            "wakefulness": wakefulness,
            "volume_music": volume_music,
            "volume_max": volume_max,
            "android_id": android_id,
            "controller_left_battery": controller_left_battery,
            "controller_right_battery": controller_right_battery,
            "wifi_ssid": wifi_ssid,
            "storage_used_gb": storage_used_gb,
            "storage_total_gb": storage_total_gb,
            "app_account": app_account,
            "provisioned": serial in self._provisioned_set,
            "webrtc_available": False,
        }
        # 正常取得時はキャッシュを更新
        if rc == 0:
            self._last_device_info[serial] = dict(result)
        return result

    async def _setup_reverse(self, serial: str):
        """sync-serverへのリバースポートフォワーディングを設定（べき等）"""
        port = settings.sync_server_port
        stdout, stderr, rc = await self._run_adb(
            "-s", serial, "reverse", f"tcp:{port}", f"tcp:{port}",
            timeout=8
        )
        if rc == 0:
            if serial not in self._reverse_set:
                logger.info(f"adb reverse tcp:{port} set for {serial}")
            self._reverse_set.add(serial)
        else:
            if serial in self._reverse_set:
                logger.warning(f"adb reverse lost for {serial}: {stderr}")
            self._reverse_set.discard(serial)

    async def _provision_device(self, serial: str):
        """デバイス接続時にスリープ防止＋近接センサー無効化＋WiFi ADB有効化

        基本プロビジョニング（setprop, am broadcast）は揮発性のため毎回実行する。
        hw_serial書き込み、pm grant、WiFi ADB等は1回だけで十分なのでスキップする。
        """
        already_provisioned = serial in self._provisioned_set
        # 基本プロビジョニング（冪等・揮発性のため毎回実行）
        cmd = (
            "settings put global stay_on_while_plugged_in 3; "
            "settings put system screen_off_timeout 86400000; "
            "am broadcast -a com.oculus.vrpowermanager.prox_close; "
            "setprop debug.oculus.guardian_pause 1"
        )
        _, stderr, rc = await self._run_adb(
            "-s", serial, "shell", cmd, timeout=8
        )
        if rc == 0:
            if not already_provisioned:
                logger.info(f"Device provisioned (no-sleep + proximity off + boundary off) for {serial}")
                await _notify_provision_event(serial, "スリープ防止を設定しました")
                await _notify_provision_event(serial, "近接センサーを無効化しました")
                await _notify_provision_event(serial, "境界線を無効化しました")
            else:
                logger.debug(f"Device re-provisioned (volatile settings refreshed) for {serial}")
            self._provisioned_set.add(serial)
        else:
            logger.warning(f"Device provisioning failed for {serial}: {stderr}")
            if not already_provisioned:
                await _notify_provision_event(serial, f"プロビジョニング失敗: {stderr[:100]}", "error")
            return  # 基本プロビジョニング失敗なら以降もスキップ

        # 以降は1回だけ実行すれば十分な操作
        if already_provisioned:
            return

        # hw_serial ファイル書き込み（Unityアプリがデバイスシリアルを読めるようにする）
        package = "com.Krelations.Poranos_LT"
        hw_serial_for_file = serial if not self._is_wifi_serial(serial) else ""
        if not hw_serial_for_file:
            # WiFi接続の場合はgetpropでシリアルを取得
            out, _, rc2 = await self._run_adb("-s", serial, "shell", "getprop ro.serialno", timeout=5)
            if rc2 == 0 and out.strip():
                hw_serial_for_file = out.strip()
        if hw_serial_for_file:
            serial_cmd = (
                f"mkdir -p /sdcard/Android/data/{package}/files && "
                f"echo '{hw_serial_for_file}' > /sdcard/Android/data/{package}/files/.poranos_serial"
            )
            _, _, rc2 = await self._run_adb("-s", serial, "shell", serial_cmd, timeout=5)
            if rc2 == 0:
                logger.info(f"Serial file written for {serial}: {hw_serial_for_file}")
                await _notify_provision_event(serial, f"シリアル番号を書き込みました: {hw_serial_for_file}")
            else:
                logger.warning(f"Failed to write serial file for {serial}")

        # WRITE_SECURE_SETTINGS権限付与（失敗しても問題なし、APKに権限宣言が必要）
        _, stderr, rc = await self._run_adb(
            "-s", serial, "shell",
            f"pm grant {package} android.permission.WRITE_SECURE_SETTINGS",
            timeout=8
        )
        if rc == 0:
            logger.info(f"WRITE_SECURE_SETTINGS granted for {serial}")
            await _notify_provision_event(serial, "WRITE_SECURE_SETTINGS権限を付与しました")
        elif "has not requested permission" in stderr:
            pass  # APKにまだ権限宣言がない場合は無視
        else:
            logger.warning(f"pm grant failed for {serial}: {stderr.strip()[:200]}")

        # WiFi接続のデバイスはそのアドレスをWiFiリストに登録（再起動後も再接続可能にする）
        if self._is_wifi_serial(serial):
            self.add_wifi_device(serial)
            return

        # USB接続のデバイスにWiFi ADBを有効化（USB切断後もWiFiで接続可能にする）
        if not self._is_wifi_serial(serial):
            # tcpip 5555はADB接続をリセットするため、先にIPを取得する
            await self._auto_register_wifi(serial)
            # tcpip はADBデーモンを再起動し、実行中のadb shell（scrcpy等）を
            # 全てkillするため、WiFi ADBが既に有効なら実行しない
            already_wifi = any(
                d.get("hw_serial") == serial and d.get("connection_type") == "wifi"
                for d in self._last_devices
            )
            if already_wifi:
                logger.debug(f"WiFi ADB already active for {serial}, skipping tcpip")
            else:
                _, stderr, rc = await self._run_adb(
                    "-s", serial, "tcpip", "5555", timeout=10
                )
                if rc == 0:
                    logger.info(f"WiFi ADB enabled (tcpip 5555) for {serial}")
                else:
                    logger.warning(f"WiFi ADB enable failed for {serial}: {stderr}")

    async def _auto_register_wifi(self, serial: str):
        """USB接続デバイスのWiFi IPを取得し、WiFiデバイスリストに自動登録"""
        stdout, _, rc = await self._run_adb(
            "-s", serial, "shell",
            "ip addr show wlan0 | grep 'inet '",
            timeout=5,
        )
        if rc != 0 or not stdout.strip():
            return
        # "    inet 192.168.8.248/24 ..." からIPを抽出
        for line in stdout.splitlines():
            line = line.strip()
            if line.startswith("inet "):
                ip = line.split()[1].split("/")[0]
                addr = self.add_wifi_device(ip)
                # USB→WiFiマッピングを先行登録（デバイスカード統合で使用）
                self._hw_to_wifi[serial] = addr
                self._hw_to_usb[serial] = serial
                logger.info(f"Auto-registered WiFi device {addr} for USB serial {serial}")
                await _notify_provision_event(serial, f"WiFi IP {ip} を登録しました")
                return

    async def _get_prop(self, serial: str, prop: str) -> Optional[str]:
        stdout, _, rc = await self._run_adb(
            "-s", serial, "shell", "getprop", prop
        )
        if rc == 0 and stdout.strip():
            return stdout.strip()
        return None

    async def _get_battery(self, serial: str) -> Optional[int]:
        stdout, _, rc = await self._run_adb(
            "-s", serial, "shell", "dumpsys", "battery"
        )
        if rc != 0:
            return None
        for line in stdout.splitlines():
            if "level:" in line:
                try:
                    return int(line.split(":")[-1].strip())
                except ValueError:
                    pass
        return None

    async def _get_app_info(
        self, serial: str, package: str = "com.Krelations.Poranos_LT"
    ) -> dict:
        stdout, _, rc = await self._run_adb(
            "-s", serial, "shell", "dumpsys", "package", package
        )
        if rc != 0 or "Unable to find package" in stdout:
            return {"installed": False}

        version = None
        for line in stdout.splitlines():
            if "versionName=" in line:
                version = line.split("versionName=")[-1].strip()
                break
        return {"installed": True, "version": version}

    async def _get_wakefulness(self, serial: str) -> Optional[str]:
        stdout, _, rc = await self._run_adb(
            "-s", serial, "shell",
            "dumpsys", "power",
            timeout=5,
        )
        if rc != 0:
            return None
        for line in stdout.splitlines():
            if "mWakefulness=" in line:
                return line.split("mWakefulness=")[-1].strip()
        return None

    async def _is_app_running(
        self, serial: str, package: str = "com.Krelations.Poranos_LT"
    ) -> bool:
        stdout, _, rc = await self._run_adb(
            "-s", serial, "shell",
            "pidof", "-s", package,
            timeout=5,
        )
        return rc == 0 and stdout.strip() != ""

    async def _get_main_activity(
        self, serial: str, package: str = "com.Krelations.Poranos_LT"
    ) -> Optional[str]:
        stdout, stderr, rc = await self._run_adb(
            "-s", serial, "shell",
            "cmd", "package", "resolve-activity",
            "--brief", "-c", "android.intent.category.LAUNCHER",
            package,
        )
        output = stdout + stderr
        for line in output.splitlines():
            line = line.strip()
            if "/" in line and package in line:
                logger.info(f"{serial}: main activity -> {line}")
                return line
        logger.warning(f"{serial}: could not resolve main activity, rc={rc}, output={output.strip()[:200]}")
        return None

    async def check_and_ensure_foreground(
        self, serial: str, package: str = "com.Krelations.Poranos_LT"
    ) -> dict:
        """アプリの状態を確認し、必要に応じて起動/前面化する（poranos_kiosk.py相当）

        判定ロジック:
        1. スリープ中 → ウェイク
        2. アプリがtopResumedActivity → 正常動作中、何もしない
           ただし vrshell が VisibleActivityProcess に「ない」場合はオーバーレイ画面
           → force-stop + 再起動
        3. アプリのプロセスはあるが前面にない → am start で前面化
        4. アプリが起動していない → force-stop + 起動
        """
        # まずpidofでアプリが起動しているか確認
        pid_out, pid_err, pid_rc = await self._run_adb(
            "-s", serial, "shell", "pidof", "-s", package, timeout=8
        )
        if pid_rc == -1:
            # タイムアウト → 状態不明、安全のため何もしない
            return {"action": "none", "reason": "pidof timed out"}
        app_running = pid_rc == 0 and pid_out.strip() != ""

        if not app_running:
            # アプリが起動していない → 起動
            activity = await self._get_main_activity(serial, package)
            if not activity:
                return {"action": "error", "message": "Could not resolve main activity"}
            await self._run_adb("-s", serial, "shell", "am", "force-stop", package, timeout=10)
            await self._run_adb("-s", serial, "shell", "am", "start", "-n", activity, timeout=10)
            return {"action": "launch"}

        # アプリは起動中 → dumpsysでフォアグラウンド状態を確認
        stdout, _, rc = await self._run_adb(
            "-s", serial, "shell",
            f"dumpsys activity activities | grep -E 'topResumedActivity|VisibleActivityProcess'",
            timeout=10,
        )
        if rc != 0:
            # dumpsysタイムアウト → アプリは起動中なので安全のため何もしない
            return {"action": "none", "reason": "dumpsys timed out"}

        output = stdout
        top_has_app = False
        vrshell_visible = False
        for line in output.splitlines():
            if "topResumedActivity" in line and package in line:
                top_has_app = True
            if "VisibleActivityProcess" in line and "com.oculus.vrshell" in line:
                vrshell_visible = True

        if top_has_app and vrshell_visible:
            # アプリが前面 + vrshellも見えている = 正常動作中
            return {"action": "none"}

        if top_has_app and not vrshell_visible:
            # アプリが前面だがvrshellが見えない = オーバーレイ画面表示中
            # → force-stop + 再起動して前面化
            activity = await self._get_main_activity(serial, package)
            if activity:
                await self._run_adb("-s", serial, "shell", "am", "force-stop", package, timeout=10)
                await self._run_adb("-s", serial, "shell", "am", "start", "-n", activity, timeout=10)
                return {"action": "restart_foreground"}
            return {"action": "error", "message": "Could not resolve main activity"}

        # アプリは起動中だが前面にない → 前面に持ってくる
        activity = await self._get_main_activity(serial, package)
        if not activity:
            return {"action": "error", "message": "Could not resolve main activity"}
        await self._run_adb("-s", serial, "shell", "am", "start", "-n", activity, timeout=10)
        return {"action": "bring_foreground"}

    async def launch_app(
        self, serial: str, package: str = "com.Krelations.Poranos_LT"
    ) -> dict:
        activity = await self._get_main_activity(serial, package)
        if not activity:
            return {"success": False, "message": "Could not resolve main activity"}

        # force-stop then start
        await self._run_adb(
            "-s", serial, "shell", "am", "force-stop", package,
            timeout=10,
        )
        stdout, stderr, rc = await self._run_adb(
            "-s", serial, "shell",
            "am", "start", "-n", activity,
            timeout=10,
        )
        output = stdout + stderr
        if rc == 0 and "Error" not in output:
            logger.info(f"App launched on {serial}: {activity}")
            return {"success": True, "message": f"Launched {activity}"}
        else:
            logger.error(f"App launch failed on {serial}: {output.strip()[:200]}")
            return {"success": False, "message": output.strip()[:200]}

    async def stop_app(
        self, serial: str, package: str = "com.Krelations.Poranos_LT"
    ) -> dict:
        stdout, stderr, rc = await self._run_adb(
            "-s", serial, "shell", "am", "force-stop", package,
            timeout=10,
        )
        if rc == 0:
            logger.info(f"App stopped on {serial}")
            return {"success": True, "message": "App stopped"}
        else:
            return {"success": False, "message": (stdout + stderr).strip()[:200]}

    async def reboot(self, serial: str) -> dict:
        """デバイスを再起動する。"""
        stdout, stderr, rc = await self._run_adb(
            "-s", serial, "reboot",
            timeout=15,
        )
        if rc == 0:
            logger.info(f"Device rebooting: {serial}")
            return {"success": True, "message": "Rebooting"}
        else:
            logger.error(f"Reboot failed on {serial}: {(stdout + stderr).strip()[:200]}")
            return {"success": False, "message": (stdout + stderr).strip()[:200]}

    async def send_keyevent(self, serial: str, keycode: int) -> dict:
        """キーイベントを送信する。"""
        stdout, stderr, rc = await self._run_adb(
            "-s", serial, "shell", "input", "keyevent", str(keycode),
            timeout=10,
        )
        if rc == 0:
            logger.info(f"Keyevent {keycode} sent to {serial}")
            return {"success": True, "message": f"Keyevent {keycode} sent"}
        else:
            msg = (stdout + stderr).strip()[:200]
            logger.error(f"Keyevent failed on {serial}: {msg}")
            return {"success": False, "message": msg}

    async def set_volume(self, serial: str, volume: int, stream: int = 3) -> dict:
        """音量を設定 (stream 3 = STREAM_MUSIC)。
        Quest 3では adjustStreamVolume (service call audio 11) で+1/-1ずつ変更する。
        """
        # 現在の音量を取得
        stdout, _, rc = await self._run_adb(
            "-s", serial, "shell",
            f"dumpsys audio | sed -n '/^- STREAM_MUSIC:/,/^-/p'",
            timeout=5,
        )
        current = None
        if rc == 0:
            for line in stdout.splitlines():
                line = line.strip()
                if line.startswith("streamVolume:"):
                    try:
                        current = int(line.split(":")[-1].strip())
                    except ValueError:
                        pass
                    break

        if current is None:
            return {"success": False, "message": "Could not read current volume"}

        diff = volume - current
        if diff == 0:
            return {"success": True, "volume": volume}

        # adjustStreamVolume: service call audio 11 i32 <stream> i32 <direction> i32 <flags>
        # direction: 1=up, -1=down, flags: 0=no UI
        direction = 1 if diff > 0 else -1
        steps = abs(diff)
        # Build a single shell command with all steps chained
        calls = "; ".join(
            f"service call audio 11 i32 {stream} i32 {direction} i32 0 s16 com.android.shell > /dev/null"
            for _ in range(steps)
        )
        _, stderr, rc = await self._run_adb(
            "-s", serial, "shell", calls,
            timeout=max(5, steps),
        )
        if rc == 0:
            logger.info(f"Volume set {current} -> {volume} on {serial} ({steps} steps)")
            return {"success": True, "volume": volume}
        else:
            output = stderr.strip()[:200]
            logger.warning(f"Volume set failed on {serial}: {output}")
            return {"success": False, "message": output}

    async def cancel_install_for_device(self, serial: str):
        """Cancel any in-progress install for the given device."""
        # Mark active tasks for this device as cancelled
        for task in _install_tasks.values():
            if task["device_serial"] == serial and task["status"] in ("queued", "installing"):
                task["status"] = "cancelled"
                task["message"] = "Cancelled by new install"
                task["completed_at"] = datetime.now(timezone.utc).isoformat()
                await _notify_task_update(task)
        # Kill the running adb process
        proc = _active_install_procs.get(serial)
        if proc and proc.returncode is None:
            logger.info(f"Killing in-progress adb install for {serial}")
            try:
                proc.kill()
                await proc.wait()
            except ProcessLookupError:
                pass

    async def install_apk(self, serial: str, apk_path: str, task_id: str):
        task = _install_tasks[task_id]

        # Already cancelled before we started
        if task["status"] == "cancelled":
            return

        task["status"] = "installing"
        task["started_at"] = datetime.now(timezone.utc).isoformat()
        await _notify_task_update(task)

        env = self._get_env()
        proc = None
        try:
            proc = await asyncio.create_subprocess_exec(
                get_adb_path(), "-s", serial, "install", "-r", "-d", apk_path,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE,
                env=env,
            )
            _active_install_procs[serial] = proc

            stdout_bytes, stderr_bytes = await asyncio.wait_for(
                proc.communicate(), timeout=600
            )

            # Cancelled while executing — status already set by cancel_install_for_device
            if task["status"] == "cancelled":
                return

            stdout = stdout_bytes.decode(errors="replace")
            stderr = stderr_bytes.decode(errors="replace")
            rc = proc.returncode or 0
            output = stdout + stderr
            if rc == 0 and "Success" in output:
                task["status"] = "success"
                task["progress_percent"] = 100
                task["message"] = "Install succeeded"
                logger.info(f"APK install succeeded for {serial}")
            else:
                task["status"] = "failed"
                task["message"] = output.strip()[:500]
                logger.error(f"APK install failed for {serial}: rc={rc}, output={output.strip()[:500]}")
        except asyncio.TimeoutError:
            if proc:
                try:
                    proc.kill()
                    await proc.wait()
                except ProcessLookupError:
                    pass
            if task["status"] == "cancelled":
                return
            task["status"] = "failed"
            task["message"] = "Command timed out (600s)"
            logger.warning(f"APK install timed out for {serial}")
        finally:
            # Only remove proc if it's still ours (not replaced by a new install)
            if _active_install_procs.get(serial) is proc:
                _active_install_procs.pop(serial, None)

        if task["status"] != "cancelled":
            task["completed_at"] = datetime.now(timezone.utc).isoformat()
            await _notify_task_update(task)

    @staticmethod
    def create_task(serial: str, filename: str) -> dict:
        task_id = str(uuid.uuid4())
        task = {
            "task_id": task_id,
            "status": "queued",
            "device_serial": serial,
            "apk_filename": filename,
            "progress_percent": 0,
            "message": None,
            "started_at": None,
            "completed_at": None,
        }
        _install_tasks[task_id] = task
        return task

    @staticmethod
    def get_task(task_id: str) -> Optional[dict]:
        return _install_tasks.get(task_id)

    @staticmethod
    def get_active_tasks() -> list[dict]:
        """Return tasks that are queued or installing."""
        return [t for t in _install_tasks.values() if t["status"] in ("queued", "installing")]
