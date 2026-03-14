"""Proxy router for poranos.com API with local disk caching.

Frontend calls these endpoints instead of poranos.com directly.
On success: returns fresh data and caches it (JSON + thumbnails) to disk.
On failure (offline): returns cached data from disk.
"""

import asyncio
import logging
import os
import time
from urllib.parse import quote, urlparse, urlunparse

import aiofiles
import httpx
from fastapi import APIRouter, Header, HTTPException
from fastapi.responses import FileResponse

from config import settings
from services.cache_service import (
    save_json, load_json, has_json,
    download_and_cache_thumbnail, get_thumbnail_path, has_thumbnail,
)

router = APIRouter()
log = logging.getLogger(__name__)

PORANOS_API = "https://api.poranos.com"

# Limit concurrent thumbnail downloads to avoid saturating the event loop
_download_semaphore = asyncio.Semaphore(5)

# Offline detection: skip API calls for a cooldown period after a failure
_last_failure_time: float = 0
_OFFLINE_COOLDOWN = 30  # seconds — retry API after this many seconds

# Force-offline mode: persist across restarts via cache file
def _load_force_offline() -> bool:
    try:
        data = load_json("force_offline")
        return bool(data.get("enabled")) if data else False
    except Exception:
        return False

_force_offline: bool = _load_force_offline()

# Cache progress tracking
_cache_progress = {"total": 0, "done": 0, "active": False}


def _is_offline() -> bool:
    """Return True if we recently failed to reach poranos.com or force-offline is enabled."""
    if _force_offline:
        return True
    if _last_failure_time == 0:
        return False
    return (time.monotonic() - _last_failure_time) < _OFFLINE_COOLDOWN


async def _poranos_get(endpoint: str, token: str) -> dict | list | None:
    """Fetch from poranos.com API with Bearer token. Returns None on failure."""
    global _last_failure_time

    if _is_offline():
        return None

    try:
        headers = {"Accept": "application/json"}
        if token:
            headers["Authorization"] = f"Bearer {token}"
        async with httpx.AsyncClient(timeout=3, follow_redirects=True) as client:
            resp = await client.get(
                f"{PORANOS_API}{endpoint}",
                headers=headers,
            )
            if resp.status_code == 200:
                _last_failure_time = 0  # reset on success
                return resp.json()
            log.warning(f"[proxy] poranos.com {endpoint} returned {resp.status_code}")
    except Exception as e:
        _last_failure_time = time.monotonic()
        log.warning(f"[proxy] poranos.com {endpoint} failed (offline for {_OFFLINE_COOLDOWN}s): {e}")
    return None


async def _cache_file_thumbnails(files: list) -> list:
    """Download and cache file thumbnails (concurrency limited). Skips already cached.
    Used by get_files endpoint for individual room file caching (not tracked in progress bar).
    """
    tasks = []
    for f in files:
        fid = f.get("id")
        thumb = f.get("thumbnail") or {}
        for size_key, size_label in [("large_url", "large"), ("mini_url", "mini")]:
            url = thumb.get(size_key)
            if url and not has_thumbnail("file", fid, size_label):
                tasks.append((f, size_key, size_label, url))

    if not tasks:
        return files

    async def _download(f, size_key, size_label, url):
        async with _download_semaphore:
            await download_and_cache_thumbnail(url, "file", f["id"], size_label)

    await asyncio.gather(*[_download(*t) for t in tasks], return_exceptions=True)
    return files


def _rewrite_room_thumbnail_urls(rooms: list, offline: bool = False) -> list:
    """Replace remote S3 URLs with local proxy URLs and add cache status."""
    for room in rooms:
        rid = room.get("id")
        has_large = has_thumbnail("room", rid, "large")
        has_mini = has_thumbnail("room", rid, "mini")
        if has_large:
            room["thumbnail_large_url"] = f"/api/poranos/thumbnails/room/{rid}/large"
        elif offline:
            room["thumbnail_large_url"] = None
        if has_mini:
            room["thumbnail_mini_url"] = f"/api/poranos/thumbnails/room/{rid}/mini"
        elif offline:
            room["thumbnail_mini_url"] = None
        # True if cached, or if no thumbnail URL exists (nothing to cache)
        has_any_url = bool(room.get("thumbnail_large_url") or room.get("thumbnail_mini_url"))
        room["files_cached"] = (has_large or has_mini) if has_any_url else True
    return rooms


def _rewrite_file_thumbnail_urls(files: list, offline: bool = False) -> list:
    """Replace remote S3 URLs with local proxy URLs and add cache status."""
    for f in files:
        fid = f.get("id")
        thumb = f.get("thumbnail")
        has_large = has_thumbnail("file", fid, "large")
        has_mini = has_thumbnail("file", fid, "mini")
        if thumb:
            if has_large:
                thumb["large_url"] = f"/api/poranos/thumbnails/file/{fid}/large"
            elif offline:
                thumb["large_url"] = None
            if has_mini:
                thumb["mini_url"] = f"/api/poranos/thumbnails/file/{fid}/mini"
            elif offline:
                thumb["mini_url"] = None
        # True if cached, or if no thumbnail URL exists (nothing to cache)
        thumb_urls = thumb and (thumb.get("large_url") or thumb.get("mini_url"))
        f["thumbnail_cached"] = (has_large or has_mini) if thumb_urls else True
    return files



async def _background_cache_all(rooms: list, token: str) -> None:
    """Wrapper that tracks overall progress for room + file thumbnail caching."""
    _cache_progress["total"] = 0
    _cache_progress["done"] = 0
    _cache_progress["active"] = True
    try:
        # Phase 1: count all uncached room thumbnails
        room_tasks = []
        for room in rooms:
            rid = room.get("id")
            for size_key, size_label in [("thumbnail_large_url", "large"), ("thumbnail_mini_url", "mini")]:
                url = room.get(size_key)
                if url and not has_thumbnail("room", rid, size_label):
                    room_tasks.append((room, size_key, size_label, url))

        # Phase 2: fetch file list once (API returns same files for all rooms) and count uncached
        file_tasks_map = {}  # (fid, size_label) -> (file_dict, size_key, size_label, url) — dedup
        all_files = None
        # Try loading from any existing cache first
        for room in rooms:
            rid = room.get("id")
            if rid and has_json(f"files_{rid}"):
                all_files = load_json(f"files_{rid}") or []
                break
        # If no cache, fetch once from API
        if all_files is None:
            first_rid = rooms[0].get("id") if rooms else None
            if first_rid:
                try:
                    all_files = await _poranos_get(f"/files/?room_id={first_rid}", token)
                except Exception as e:
                    log.warning(f"[proxy] background fetch files failed: {e}")
        if all_files:
            # Save file JSON for all rooms (same data)
            for room in rooms:
                rid = room.get("id")
                if rid and not has_json(f"files_{rid}"):
                    save_json(f"files_{rid}", all_files)
            # Count uncached thumbnails
            for f in all_files:
                fid = f.get("id")
                thumb = f.get("thumbnail") or {}
                for size_key, size_label in [("large_url", "large"), ("mini_url", "mini")]:
                    key = (fid, size_label)
                    if key in file_tasks_map:
                        continue
                    url = thumb.get(size_key)
                    if url and not has_thumbnail("file", fid, size_label):
                        file_tasks_map[key] = (f, size_key, size_label, url)
        file_tasks = list(file_tasks_map.values())

        total = len(room_tasks) + len(file_tasks)
        _cache_progress["total"] = total

        if total == 0:
            return

        # Phase 3: download all thumbnails
        async def _download_room(room, size_key, size_label, url):
            async with _download_semaphore:
                await download_and_cache_thumbnail(url, "room", room["id"], size_label)
            _cache_progress["done"] += 1

        async def _download_file(f, size_key, size_label, url):
            async with _download_semaphore:
                await download_and_cache_thumbnail(url, "file", f["id"], size_label)
            _cache_progress["done"] += 1

        await asyncio.gather(
            *[_download_room(*t) for t in room_tasks],
            *[_download_file(*t) for t in file_tasks],
            return_exceptions=True,
        )
    finally:
        _cache_progress["active"] = False


# ── Endpoints ──

@router.get("/rooms")
async def get_rooms(authorization: str = Header(default="")):
    """Get rooms list. Fetches from poranos.com and caches, or returns cache on failure."""
    token = authorization.replace("Bearer ", "") if authorization else ""

    data = await _poranos_get("/rooms/", token) if token else None

    if data is not None:
        # Online: cache JSON immediately, download thumbnails in background
        save_json("rooms", data)
        asyncio.create_task(_background_cache_all(data, token))
        data = _rewrite_room_thumbnail_urls(data)
        return {"source": "online", "data": data}

    # Offline: load from cache
    cached = load_json("rooms")
    if cached is not None:
        cached = _rewrite_room_thumbnail_urls(cached, offline=True)
        return {"source": "cache", "data": cached}

    raise HTTPException(status_code=503, detail="No connection and no cached data")


@router.get("/rooms/{room_id}/files")
async def get_files(room_id: int, authorization: str = Header(default="")):
    """Get files for a room. Fetches from poranos.com and caches."""
    token = authorization.replace("Bearer ", "") if authorization else ""

    data = await _poranos_get(f"/files/?room_id={room_id}", token) if token else None

    if data is not None:
        save_json(f"files_{room_id}", data)
        asyncio.create_task(_cache_file_thumbnails(data))
        data = _rewrite_file_thumbnail_urls(data)
        return {"source": "online", "data": data}

    cached = load_json(f"files_{room_id}")
    if cached is not None:
        cached = _rewrite_file_thumbnail_urls(cached, offline=True)
        return {"source": "cache", "data": cached}

    raise HTTPException(status_code=503, detail="No connection and no cached data")


@router.get("/thumbnails/{category}/{item_id}/{size}")
async def get_thumbnail(category: str, item_id: int, size: str):
    """Serve a cached thumbnail image."""
    if category not in ("room", "file") or size not in ("large", "mini"):
        raise HTTPException(status_code=400, detail="Invalid category or size")

    path = get_thumbnail_path(category, item_id, size)
    if not path.exists():
        raise HTTPException(status_code=404, detail="Thumbnail not cached")

    return FileResponse(str(path), media_type="image/jpeg")


# ── Cache status ──

@router.get("/cache-status")
async def get_cache_status():
    """Get background cache download progress."""
    return _cache_progress


# ── Offline simulation ──

@router.get("/offline-mode")
async def get_offline_mode():
    """Get current force-offline mode status."""
    return {"force_offline": _force_offline}


@router.post("/offline-mode")
async def set_offline_mode(body: dict):
    """Toggle force-offline mode for cache testing."""
    global _force_offline
    _force_offline = bool(body.get("force_offline", False))
    save_json("force_offline", {"enabled": _force_offline})
    log.info(f"[proxy] force-offline mode: {_force_offline}")
    return {"force_offline": _force_offline}


# ── APK Release Endpoints ──

@router.get("/releases")
async def get_releases(authorization: str = Header(default="")):
    """Get available releases from poranos.com."""
    token = authorization.replace("Bearer ", "") if authorization else ""

    data = await _poranos_get("/app-releases/", token)

    if data is not None:
        save_json("releases", data)
        return {"source": "online", "data": data}

    cached = load_json("releases")
    if cached is not None:
        return {"source": "cache", "data": cached}

    raise HTTPException(status_code=503, detail="No connection and no cached data")


async def _broadcast_download_progress(percent: int, file_name: str):
    """Broadcast APK download progress through the devices WebSocket."""
    try:
        from routers.devices import _device_ws_clients
        msg = {"type": "apk_download_progress", "percent": percent, "file_name": file_name}
        disconnected = []
        for ws_client in _device_ws_clients:
            try:
                await ws_client.send_json(msg)
            except Exception:
                disconnected.append(ws_client)
        for ws_client in disconnected:
            _device_ws_clients.remove(ws_client)
    except Exception:
        pass


async def _download_apk(download_url: str, file_name: str, expected_size: int = 0) -> str:
    """Download APK from presigned URL to local uploads directory. Returns local file path."""
    apk_dir = os.path.join(settings.upload_dir, "apk_releases")
    os.makedirs(apk_dir, exist_ok=True)
    apk_path = os.path.join(apk_dir, file_name)

    # Skip download if file already exists and size matches (or no expected size given)
    if os.path.exists(apk_path) and os.path.getsize(apk_path) > 0:
        local_size = os.path.getsize(apk_path)
        if expected_size == 0 or local_size == expected_size:
            log.info(f"[releases] APK already cached: {apk_path}")
            return apk_path
        log.info(f"[releases] Cache size mismatch ({local_size} != {expected_size}), re-downloading")

    log.info(f"[releases] Downloading APK: {file_name}")
    # Encode spaces in URL path, but avoid double-encoding already-encoded chars
    parsed = urlparse(download_url)
    encoded_url = urlunparse(parsed._replace(path=quote(parsed.path, safe="/%")))

    await _broadcast_download_progress(0, file_name)

    async with httpx.AsyncClient(timeout=httpx.Timeout(10, read=300), follow_redirects=True) as client:
        async with client.stream("GET", encoded_url) as resp:
            if resp.status_code != 200:
                raise HTTPException(
                    status_code=502,
                    detail=f"Failed to download APK: HTTP {resp.status_code}",
                )
            total = int(resp.headers.get("content-length", 0))
            downloaded = 0
            last_percent = -1
            async with aiofiles.open(apk_path, "wb") as f:
                async for chunk in resp.aiter_bytes(chunk_size=256 * 1024):
                    await f.write(chunk)
                    downloaded += len(chunk)
                    if total > 0:
                        percent = min(int(downloaded * 100 / total), 100)
                        if percent != last_percent:
                            last_percent = percent
                            await _broadcast_download_progress(percent, file_name)

    await _broadcast_download_progress(100, file_name)
    log.info(f"[releases] APK downloaded: {apk_path} ({os.path.getsize(apk_path)} bytes)")
    return apk_path


def _get_release_by_id(releases: list, release_id: int) -> dict | None:
    """Find a release by ID from the releases list."""
    for r in releases:
        if r.get("id") == release_id:
            return r
    return None


async def _fetch_release(release_id: int, token: str) -> dict:
    """Fetch releases and find the specified one. Raises HTTPException if not found."""
    data = await _poranos_get("/app-releases/", token)
    if data is None:
        data = load_json("releases")
    if data is None:
        raise HTTPException(status_code=503, detail="Cannot fetch releases")

    release = _get_release_by_id(data, release_id)
    if not release:
        raise HTTPException(status_code=404, detail="Release not found")
    if not release.get("download_url"):
        raise HTTPException(status_code=404, detail="Release has no download URL")
    return release


@router.post("/releases/{release_id}/install/{serial}")
async def install_release_on_device(
    release_id: int, serial: str,
    authorization: str = Header(default=""),
):
    """Download APK from poranos.com and install on a specific device via adb."""
    from routers.devices import _adb_service, _broadcast_task_update
    from services.adb_service import AdbService, set_task_update_callback

    token = authorization.replace("Bearer ", "") if authorization else ""
    release = await _fetch_release(release_id, token)

    apk_path = await _download_apk(release["download_url"], release["file_name"])

    # Cancel any existing install for this device
    await _adb_service.cancel_install_for_device(serial)

    task = AdbService.create_task(serial, release["file_name"])
    asyncio.create_task(
        _adb_service.install_apk(serial, apk_path, task["task_id"])
    )
    return task


@router.post("/releases/{release_id}/install-all")
async def install_release_on_all(
    release_id: int,
    authorization: str = Header(default=""),
):
    """Download APK from poranos.com and install on all connected devices via adb."""
    from routers.devices import _adb_service, _broadcast_task_update
    from services.adb_service import AdbService, set_task_update_callback

    token = authorization.replace("Bearer ", "") if authorization else ""
    release = await _fetch_release(release_id, token)

    apk_path = await _download_apk(release["download_url"], release["file_name"])

    devices = await _adb_service.get_devices()
    tasks = []
    install_queue: list[tuple[str, str]] = []
    for device in devices:
        if device["status"] != "device":
            continue
        adb_serial = device.get("adb_serial") or device["serial"]
        display_serial = device["serial"]
        await _adb_service.cancel_install_for_device(adb_serial)
        task = AdbService.create_task(display_serial, release["file_name"])
        install_queue.append((adb_serial, task["task_id"]))
        tasks.append(task)

    async def _batched_install():
        for i in range(0, len(install_queue), 2):
            batch = install_queue[i:i + 2]
            await asyncio.gather(*(
                _adb_service.install_apk(adb_serial, apk_path, task_id)
                for adb_serial, task_id in batch
            ))

    asyncio.create_task(_batched_install())

    return {"tasks": tasks}


# ── Desktop (Windows) Release Endpoints ──

@router.get("/desktop-release")
async def get_desktop_release(authorization: str = Header(default="")):
    """Get the latest desktop release from poranos.com."""
    token = authorization.replace("Bearer ", "") if authorization else ""

    data = await _poranos_get("/app-releases/", token)
    if data is None:
        data = load_json("releases")
    if data is None:
        raise HTTPException(status_code=503, detail="No connection and no cached data")

    # Filter for desktop releases
    desktop = [r for r in data if r.get("app_type") == "desktop" and r.get("is_active")]
    if not desktop:
        raise HTTPException(status_code=404, detail="No desktop release available")

    latest = desktop[0]  # Already sorted by newest first from API
    return latest


@router.post("/desktop-release/{release_id}/download")
async def download_desktop_release(
    release_id: int,
    authorization: str = Header(default=""),
):
    """Download desktop installer and return local file path for Electron to open."""
    token = authorization.replace("Bearer ", "") if authorization else ""
    release = await _fetch_release(release_id, token)

    if release.get("app_type") != "desktop":
        raise HTTPException(status_code=400, detail="Not a desktop release")

    # Download to local cache (pass expected size to invalidate stale cache)
    file_path = await _download_apk(release["download_url"], release["file_name"], release.get("file_size", 0))
    file_size = os.path.getsize(file_path)

    return {
        "file_path": file_path,
        "file_name": release["file_name"],
        "file_size": file_size,
        "version": release["version"],
    }
