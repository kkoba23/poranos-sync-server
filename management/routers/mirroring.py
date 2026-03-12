"""
Mirroring API: scrcpy ベースのデバイスミラーリング WebSocket エンドポイント
"""
import asyncio
import logging
import struct

from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Query

from services.scrcpy_service import ScrcpyService

logger = logging.getLogger(__name__)
router = APIRouter()

_scrcpy_service: ScrcpyService | None = None


def set_scrcpy_service(service: ScrcpyService):
    global _scrcpy_service
    _scrcpy_service = service


@router.get("/streams")
async def list_streams():
    """アクティブなストリーム一覧"""
    if not _scrcpy_service:
        return {"streams": []}
    return {"streams": _scrcpy_service.get_active_streams()}


@router.websocket("/stream/{serial}")
async def stream_device(websocket: WebSocket, serial: str, max_size: int = Query(default=640)):
    """
    デバイスの H.264 ストリームを WebSocket で配信。

    プロトコル (binary frames):
      初回: 12 bytes = codec_id(4) + width(4) + height(4)
      以降: 5 bytes header + N bytes data
            header = flags(1) + packet_size(4)
            flags: bit0=CONFIG(SPS/PPS), bit1=KEYFRAME
    """
    await websocket.accept()
    logger.info(f"[{serial}] WebSocket client connected (max_size={max_size})")

    if not _scrcpy_service:
        await websocket.close(code=1011, reason="Service not initialized")
        return

    # クールダウン中はすぐに閉じる（リトライループ防止）
    if _scrcpy_service.is_cooling_down(serial):
        await websocket.close(code=1013, reason="Try again later")
        return

    # ストリーム開始（既に起動中なら再利用、解像度変更時は再起動）
    stream = await _scrcpy_service.start_stream(serial, max_size=max_size)
    if not stream:
        await websocket.close(code=1013, reason="Failed to start scrcpy stream")
        return

    # コーデック情報を送信
    codec_meta = struct.pack(">III", stream.codec_id, stream.width, stream.height)
    await websocket.send_bytes(codec_meta)

    # subscribe して H.264 パケットを中継
    queue = stream.subscribe()
    try:
        while stream.running:
            try:
                packet = await asyncio.wait_for(queue.get(), timeout=5.0)
            except asyncio.TimeoutError:
                # keepalive ping
                try:
                    await websocket.send_bytes(b"")
                except Exception:
                    break
                continue

            if packet is None:
                # ストリーム終了
                break

            try:
                await websocket.send_bytes(packet)
            except Exception:
                break

    except WebSocketDisconnect:
        pass
    except Exception as e:
        logger.error(f"[{serial}] WebSocket error: {e}")
    finally:
        stream.unsubscribe(queue)
        logger.info(f"[{serial}] WebSocket client disconnected")


@router.post("/start/{serial}")
async def start_stream(serial: str):
    """ストリームを手動開始"""
    if not _scrcpy_service:
        return {"success": False, "message": "Service not initialized"}
    stream = await _scrcpy_service.start_stream(serial)
    if stream:
        return {"success": True, "width": stream.width, "height": stream.height}
    return {"success": False, "message": "Failed to start stream"}


@router.post("/stop/{serial}")
async def stop_stream(serial: str):
    """ストリームを停止"""
    if not _scrcpy_service:
        return {"success": False, "message": "Service not initialized"}
    await _scrcpy_service.stop_stream(serial)
    return {"success": True}
