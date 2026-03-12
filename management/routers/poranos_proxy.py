"""Proxy router for poranos.com API with local disk caching.

Frontend calls these endpoints instead of poranos.com directly.
On success: returns fresh data and caches it (JSON + thumbnails) to disk.
On failure (offline): returns cached data from disk.
"""

import asyncio
import logging
import time

import httpx
from fastapi import APIRouter, Header, HTTPException
from fastapi.responses import FileResponse

from services.cache_service import (
    save_json, load_json,
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


def _is_offline() -> bool:
    """Return True if we recently failed to reach poranos.com."""
    if _last_failure_time == 0:
        return False
    return (time.monotonic() - _last_failure_time) < _OFFLINE_COOLDOWN


async def _poranos_get(endpoint: str, token: str) -> dict | list | None:
    """Fetch from poranos.com API with Bearer token. Returns None on failure."""
    global _last_failure_time

    if _is_offline():
        return None

    try:
        async with httpx.AsyncClient(timeout=3, follow_redirects=True) as client:
            resp = await client.get(
                f"{PORANOS_API}{endpoint}",
                headers={
                    "Authorization": f"Bearer {token}",
                    "Accept": "application/json",
                },
            )
            if resp.status_code == 200:
                _last_failure_time = 0  # reset on success
                return resp.json()
            log.warning(f"[proxy] poranos.com {endpoint} returned {resp.status_code}")
    except Exception as e:
        _last_failure_time = time.monotonic()
        log.warning(f"[proxy] poranos.com {endpoint} failed (offline for {_OFFLINE_COOLDOWN}s): {e}")
    return None


async def _cache_room_thumbnails(rooms: list) -> list:
    """Download and cache room thumbnails (concurrency limited)."""
    tasks = []
    for room in rooms:
        for size_key, size_label in [("thumbnail_large_url", "large"), ("thumbnail_mini_url", "mini")]:
            url = room.get(size_key)
            if url:
                tasks.append((room, size_key, size_label, url))

    async def _download(room, size_key, size_label, url):
        async with _download_semaphore:
            await download_and_cache_thumbnail(url, "room", room["id"], size_label)

    await asyncio.gather(*[_download(*t) for t in tasks], return_exceptions=True)
    return rooms


async def _cache_file_thumbnails(files: list) -> list:
    """Download and cache file thumbnails (concurrency limited)."""
    tasks = []
    for f in files:
        thumb = f.get("thumbnail") or {}
        for size_key, size_label in [("large_url", "large"), ("mini_url", "mini")]:
            url = thumb.get(size_key)
            if url:
                tasks.append((f, size_key, size_label, url))

    async def _download(f, size_key, size_label, url):
        async with _download_semaphore:
            await download_and_cache_thumbnail(url, "file", f["id"], size_label)

    await asyncio.gather(*[_download(*t) for t in tasks], return_exceptions=True)
    return files


def _rewrite_room_thumbnail_urls(rooms: list) -> list:
    """Replace remote S3 URLs with local proxy URLs."""
    for room in rooms:
        rid = room.get("id")
        if has_thumbnail("room", rid, "large"):
            room["thumbnail_large_url"] = f"/api/poranos/thumbnails/room/{rid}/large"
        if has_thumbnail("room", rid, "mini"):
            room["thumbnail_mini_url"] = f"/api/poranos/thumbnails/room/{rid}/mini"
    return rooms


def _rewrite_file_thumbnail_urls(files: list) -> list:
    """Replace remote S3 URLs with local proxy URLs."""
    for f in files:
        fid = f.get("id")
        thumb = f.get("thumbnail")
        if not thumb:
            continue
        if has_thumbnail("file", fid, "large"):
            thumb["large_url"] = f"/api/poranos/thumbnails/file/{fid}/large"
        if has_thumbnail("file", fid, "mini"):
            thumb["mini_url"] = f"/api/poranos/thumbnails/file/{fid}/mini"
    return files


# ── Endpoints ──

@router.get("/rooms")
async def get_rooms(authorization: str = Header(default="")):
    """Get rooms list. Fetches from poranos.com and caches, or returns cache on failure."""
    token = authorization.replace("Bearer ", "") if authorization else ""

    data = await _poranos_get("/rooms/", token) if token else None

    if data is not None:
        # Online: cache JSON immediately, download thumbnails in background
        save_json("rooms", data)
        asyncio.create_task(_cache_room_thumbnails(data))
        data = _rewrite_room_thumbnail_urls(data)
        return {"source": "online", "data": data}

    # Offline: load from cache
    cached = load_json("rooms")
    if cached is not None:
        cached = _rewrite_room_thumbnail_urls(cached)
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
        cached = _rewrite_file_thumbnail_urls(cached)
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
