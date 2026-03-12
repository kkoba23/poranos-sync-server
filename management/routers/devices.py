import asyncio
import logging
import os

import aiofiles
from fastapi import APIRouter, UploadFile, File, WebSocket, WebSocketDisconnect

from services.adb_service import AdbService, set_task_update_callback
from config import settings

logger = logging.getLogger(__name__)

router = APIRouter()

_adb_service = AdbService()
_device_ws_clients: list[WebSocket] = []
_cached_devices: list[dict] = []

# Auto Launch state
_auto_launch_enabled = False
_auto_launch_task: asyncio.Task | None = None


async def _broadcast_task_update(task: dict):
    """インストールタスク更新をWebSocketクライアントに通知"""
    msg_type = "install_complete" if task["status"] in ("success", "failed", "cancelled") else "install_progress"
    msg = {"type": msg_type, **task}
    disconnected = []
    for ws in _device_ws_clients:
        try:
            await ws.send_json(msg)
        except Exception:
            disconnected.append(ws)
    for ws in disconnected:
        _device_ws_clients.remove(ws)


set_task_update_callback(_broadcast_task_update)


@router.get("")
async def list_devices():
    devices = await _adb_service.get_devices()
    _cached_devices.clear()
    _cached_devices.extend(devices)
    return {"devices": devices}


@router.get("/cached")
async def list_cached_devices():
    """キャッシュ済みデバイス一覧を即座に返す（ADB問い合わせなし）"""
    return {"devices": list(_cached_devices)}


@router.post("/{serial}/install")
async def install_apk(serial: str, apk: UploadFile = File(...)):
    # Cancel any existing install for this device
    await _adb_service.cancel_install_for_device(serial)

    os.makedirs(settings.upload_dir, exist_ok=True)
    apk_path = os.path.join(settings.upload_dir, apk.filename)

    async with aiofiles.open(apk_path, "wb") as f:
        content = await apk.read()
        await f.write(content)

    task = AdbService.create_task(serial, apk.filename)
    asyncio.create_task(
        _adb_service.install_apk(serial, apk_path, task["task_id"])
    )
    return task


@router.post("/install-all")
async def install_all(apk: UploadFile = File(...)):
    os.makedirs(settings.upload_dir, exist_ok=True)
    apk_path = os.path.join(settings.upload_dir, apk.filename)

    async with aiofiles.open(apk_path, "wb") as f:
        content = await apk.read()
        await f.write(content)

    devices = await _adb_service.get_devices()
    tasks = []
    install_queue: list[tuple[str, str]] = []  # (adb_serial, task_id)
    for device in devices:
        if device["status"] != "device":
            continue
        adb_serial = device.get("adb_serial") or device["serial"]
        display_serial = device["serial"]
        # Cancel any existing install for this device
        await _adb_service.cancel_install_for_device(adb_serial)

        task = AdbService.create_task(display_serial, apk.filename)
        install_queue.append((adb_serial, task["task_id"]))
        tasks.append(task)

    # 2台ずつ並列インストール: ADB帯域とスループットのバランス
    async def _batched_install():
        for i in range(0, len(install_queue), 2):
            batch = install_queue[i:i + 2]
            await asyncio.gather(*(
                _adb_service.install_apk(adb_serial, apk_path, task_id)
                for adb_serial, task_id in batch
            ))

    asyncio.create_task(_batched_install())

    return {"tasks": tasks}


@router.post("/{serial}/launch")
async def launch_app(serial: str):
    result = await _adb_service.launch_app(serial)
    return result


@router.post("/launch-all")
async def launch_all():
    devices = await _adb_service.get_devices()
    results = []
    for device in devices:
        if device["status"] != "device" or not device.get("app_installed"):
            continue
        adb_serial = device.get("adb_serial") or device["serial"]
        result = await _adb_service.launch_app(adb_serial)
        results.append({"serial": device["serial"], **result})
    return {"results": results}


@router.post("/stop-all")
async def stop_all():
    devices = await _adb_service.get_devices()
    results = []
    for device in devices:
        if device["status"] != "device" or not device.get("app_running"):
            continue
        adb_serial = device.get("adb_serial") or device["serial"]
        result = await _adb_service.stop_app(adb_serial)
        results.append({"serial": device["serial"], **result})
    return {"results": results}


@router.post("/{serial}/stop")
async def stop_app(serial: str):
    result = await _adb_service.stop_app(serial)
    return result


@router.post("/{serial}/sleep")
async def sleep_device(serial: str):
    """デバイスをスリープさせる (KEYCODE_SLEEP=223)"""
    result = await _adb_service.send_keyevent(serial, 223)
    return result


@router.post("/{serial}/wake")
async def wake_device(serial: str):
    """デバイスを起こす (KEYCODE_WAKEUP=224)"""
    result = await _adb_service.send_keyevent(serial, 224)
    return result


@router.post("/{serial}/reboot")
async def reboot_device(serial: str):
    result = await _adb_service.reboot(serial)
    return result


@router.post("/reboot-all")
async def reboot_all():
    devices = await _adb_service.get_devices()
    results = []
    for device in devices:
        if device["status"] != "device":
            continue
        adb_serial = device.get("adb_serial") or device["serial"]
        result = await _adb_service.reboot(adb_serial)
        results.append({"serial": device["serial"], **result})
    return {"results": results}


@router.post("/{serial}/volume")
async def set_volume(serial: str, body: dict):
    volume = body.get("volume")
    if volume is None:
        return {"error": "volume is required"}
    result = await _adb_service.set_volume(serial, int(volume))
    return result


@router.post("/{serial}/keyevent")
async def send_keyevent(serial: str, body: dict):
    keycode = body.get("keycode")
    if keycode is None:
        return {"error": "keycode is required"}
    result = await _adb_service.send_keyevent(serial, int(keycode))
    return result


@router.post("/{serial}/cancel-install")
async def cancel_install(serial: str):
    await _adb_service.cancel_install_for_device(serial)
    return {"success": True, "message": f"Install cancelled for {serial}"}


@router.get("/install/{task_id}")
async def get_install_status(task_id: str):
    task = AdbService.get_task(task_id)
    if task:
        return task
    return {"error": "Task not found"}


@router.get("/wifi")
async def list_wifi_devices():
    return {"devices": _adb_service.get_wifi_devices()}


@router.post("/wifi")
async def add_wifi_device(body: dict):
    addr = body.get("address", "")
    if not addr:
        return {"error": "address is required"}
    normalized = _adb_service.add_wifi_device(addr)
    return {"success": True, "address": normalized}


@router.delete("/wifi/{address}")
async def remove_wifi_device(address: str):
    _adb_service.remove_wifi_device(address)
    return {"success": True}


@router.post("/volume-all")
async def volume_all(body: dict):
    volume = body.get("volume")
    if volume is None:
        return {"error": "volume is required"}
    devices = await _adb_service.get_devices()
    results = []
    for device in devices:
        if device["status"] != "device":
            continue
        adb_serial = device.get("adb_serial") or device["serial"]
        result = await _adb_service.set_volume(adb_serial, int(volume))
        results.append({"serial": device["serial"], **result})
    return {"results": results}


@router.post("/auto-launch")
async def toggle_auto_launch(body: dict):
    global _auto_launch_enabled, _auto_launch_task
    enabled = body.get("enabled", False)
    _auto_launch_enabled = enabled

    if enabled and (_auto_launch_task is None or _auto_launch_task.done()):
        _auto_launch_task = asyncio.create_task(_auto_launch_loop())
        logger.info("Auto Launch enabled")
    elif not enabled and _auto_launch_task and not _auto_launch_task.done():
        _auto_launch_task.cancel()
        _auto_launch_task = None
        logger.info("Auto Launch disabled")

    return {"enabled": _auto_launch_enabled}


@router.get("/auto-launch")
async def get_auto_launch_status():
    return {"enabled": _auto_launch_enabled}


async def _auto_launch_loop():
    """Auto Launch バックグラウンドタスク: 10秒間隔で全デバイスをチェック"""
    while _auto_launch_enabled:
        try:
            devices = list(_cached_devices) if _cached_devices else await _adb_service.get_devices()
            for device in devices:
                if not _auto_launch_enabled:
                    return
                if device["status"] != "device" or not device.get("app_installed"):
                    continue
                adb_serial = device.get("adb_serial") or device["serial"]
                try:
                    result = await _adb_service.check_and_ensure_foreground(adb_serial)
                    if result["action"] != "none":
                        logger.info(f"Auto Launch [{device['serial']}]: {result['action']}")
                except Exception as e:
                    logger.warning(f"Auto Launch error for {device['serial']}: {e}")
        except Exception as e:
            logger.warning(f"Auto Launch loop error: {e}")
        await asyncio.sleep(10)


@router.websocket("/ws")
async def devices_ws(ws: WebSocket):
    await ws.accept()
    _device_ws_clients.append(ws)
    try:
        # Send cached devices immediately, then fetch fresh data
        if _cached_devices:
            await ws.send_json({"type": "devices_update", "devices": _cached_devices})

        # Send active install tasks so returning clients see in-flight installs
        for task in AdbService.get_active_tasks():
            await ws.send_json({"type": "install_progress", **task})

        # Fetch fresh data and send
        devices = await _adb_service.get_devices()
        _cached_devices.clear()
        _cached_devices.extend(devices)
        await ws.send_json({"type": "devices_update", "devices": devices})

        # Periodic updates
        while True:
            await asyncio.sleep(settings.device_poll_interval)
            devices = await _adb_service.get_devices()
            _cached_devices.clear()
            _cached_devices.extend(devices)
            await ws.send_json({"type": "devices_update", "devices": devices})
    except WebSocketDisconnect:
        pass
    except Exception:
        pass
    finally:
        if ws in _device_ws_clients:
            _device_ws_clients.remove(ws)
