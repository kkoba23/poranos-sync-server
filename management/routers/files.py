"""Router for file library management.

Lists all files for an account, downloads from poranos.com to local disk,
and tracks download progress via WebSocket.
Also queries Quest devices for on-device file status via ADB.
"""

import asyncio
import logging
import re

import httpx
from fastapi import APIRouter, Header, HTTPException, WebSocket, WebSocketDisconnect
from pydantic import BaseModel

from services.cache_service import save_json, load_json
from services.file_download_service import FileDownloadService
from services.adb_service import AdbService

router = APIRouter()
log = logging.getLogger(__name__)

PORANOS_API = "https://api.poranos.com"

_download_service = FileDownloadService()
_adb = AdbService()

# Quest app data path
_QUEST_FILES_PATH = "/sdcard/Android/data/com.Krelations.Poranos_LT/files"

# Pattern: {file_id}.{extension} — excludes _mini thumbnails, UUIDs, directories
_FILE_ID_PATTERN = re.compile(r"^(\d+)\.(\w+)$")


# ── Models ──

class DownloadRequest(BaseModel):
    file_id: int
    file_name: str
    file_size: int
    presigned_url: str


class BatchDownloadRequest(BaseModel):
    files: list[DownloadRequest]


class AbortRequest(BaseModel):
    task_id: str


# ── Endpoints ──

@router.get("/list")
async def list_account_files(authorization: str = Header(default="")):
    """Fetch all files for the authenticated user from poranos.com (GET).
    Uses Bearer token for auth. Caches result locally."""
    token = authorization.replace("Bearer ", "") if authorization else ""

    data = None
    if token:
        try:
            async with httpx.AsyncClient(timeout=httpx.Timeout(10, read=30), follow_redirects=True) as client:
                resp = await client.get(
                    f"{PORANOS_API}/account-all-files/",
                    headers={
                        "Authorization": f"Bearer {token}",
                        "Accept": "application/json",
                    },
                )
                if resp.status_code == 200:
                    data = resp.json()
                else:
                    log.warning(f"[files] poranos.com returned {resp.status_code}")
        except Exception as e:
            log.warning(f"[files] poranos.com failed: {type(e).__name__}: {e}")

    cache_key = "account_files"
    if data is not None:
        save_json(cache_key, data)
    else:
        data = load_json(cache_key)
        if data is None:
            raise HTTPException(status_code=503, detail="No connection and no cached data")

    # Annotate with local download status
    files = data.get("files", [])
    downloaded_ids = _download_service.get_downloaded_file_ids()
    for f in files:
        f["is_downloaded"] = f.get("id") in downloaded_ids

    return {
        "source": "online" if data is not None else "cache",
        "files": files,
        "active_tasks": _download_service.get_active_tasks(),
    }


@router.get("/local")
async def list_local_files():
    """List locally downloaded files."""
    return {"files": _download_service.get_local_files_info()}


@router.post("/download")
async def start_download(req: DownloadRequest):
    """Start downloading a single file."""
    task = _download_service.start_download(
        file_id=req.file_id,
        file_name=req.file_name,
        file_size=req.file_size,
        presigned_url=req.presigned_url,
    )
    return task.to_dict()


@router.post("/download-batch")
async def start_batch_download(req: BatchDownloadRequest):
    """Start downloading multiple files."""
    tasks = _download_service.start_batch_download([
        {
            "file_id": f.file_id,
            "file_name": f.file_name,
            "file_size": f.file_size,
            "presigned_url": f.presigned_url,
        }
        for f in req.files
    ])
    return {"tasks": [t.to_dict() for t in tasks]}


@router.post("/abort")
async def abort_download(req: AbortRequest):
    """Abort a running download."""
    ok = _download_service.abort_download(req.task_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Task not found or not running")
    return {"status": "aborted"}


@router.post("/abort-all")
async def abort_all_downloads():
    """Abort all running downloads."""
    count = _download_service.abort_all()
    return {"aborted": count}


@router.get("/tasks")
async def list_tasks():
    """List all download tasks (active + completed)."""
    return {"tasks": _download_service.get_all_tasks()}


@router.delete("/local/{file_id}")
async def delete_local_file(file_id: int):
    """Delete a locally downloaded file."""
    ok = _download_service.delete_local_file(file_id)
    if not ok:
        raise HTTPException(status_code=404, detail="File not found locally")
    return {"status": "deleted"}


@router.get("/quest-files/{serial}")
async def list_quest_files(serial: str):
    """List files on a Quest device and extract file IDs.

    Runs `adb shell ls` on the device's app data folder and parses filenames
    matching the pattern {file_id}.{extension}.
    """
    try:
        stdout, stderr, rc = await _adb._run_adb(
            "-s", serial, "shell", "ls", "-1", _QUEST_FILES_PATH,
            timeout=10,
        )
    except asyncio.TimeoutError:
        raise HTTPException(status_code=504, detail="ADB command timed out")

    if rc != 0:
        # Common case: device offline or path doesn't exist
        if "No such file or directory" in stderr or "No such file or directory" in stdout:
            return {"serial": serial, "file_ids": [], "files": [], "error": None}
        raise HTTPException(status_code=502, detail=f"ADB error: {stderr.strip()}")

    quest_files = []
    file_ids = set()
    for line in stdout.strip().splitlines():
        name = line.strip()
        if not name:
            continue
        m = _FILE_ID_PATTERN.match(name)
        if m:
            fid = int(m.group(1))
            file_ids.add(fid)
            quest_files.append({"file_id": fid, "extension": m.group(2), "filename": name})

    return {
        "serial": serial,
        "file_ids": sorted(file_ids),
        "files": quest_files,
    }


@router.get("/quest-files-all")
async def list_quest_files_all_devices():
    """List files on all connected Quest devices."""
    devices = await _adb.get_devices()
    results = {}
    for dev in devices:
        adb_serial = dev.get("adb_serial", dev.get("serial", ""))
        display_serial = dev.get("display_serial") or dev.get("serial", adb_serial)
        if dev.get("status") != "device":
            continue
        try:
            stdout, _, rc = await _adb._run_adb(
                "-s", adb_serial, "shell", "ls", "-1", _QUEST_FILES_PATH,
                timeout=10,
            )
            file_ids = set()
            if rc == 0:
                for line in stdout.strip().splitlines():
                    name = line.strip()
                    m = _FILE_ID_PATTERN.match(name)
                    if m:
                        file_ids.add(int(m.group(1)))
            results[display_serial] = sorted(file_ids)
        except Exception as e:
            log.warning(f"[files] quest-files failed for {display_serial}: {e}")
            results[display_serial] = []

    return {"devices": results}


@router.websocket("/ws")
async def download_progress_ws(ws: WebSocket):
    """WebSocket endpoint for real-time download progress updates."""
    await ws.accept()
    queue = _download_service.subscribe()
    try:
        # Send current active tasks on connect
        active = _download_service.get_active_tasks()
        if active:
            await ws.send_json({"type": "active_tasks", "tasks": active})

        while True:
            try:
                data = await asyncio.wait_for(queue.get(), timeout=30)
                await ws.send_json({"type": "download_progress", "task": data})
            except asyncio.TimeoutError:
                # Send keepalive ping
                await ws.send_json({"type": "ping"})
    except WebSocketDisconnect:
        pass
    except Exception as e:
        log.debug(f"[files] WS closed: {e}")
    finally:
        _download_service.unsubscribe(queue)
