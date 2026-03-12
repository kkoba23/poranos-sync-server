"""Local cache service for poranos.com data (rooms, files, thumbnails).

Caches JSON data and thumbnail images to disk so the app works offline.
On successful API fetch, data is saved. On failure, cached data is returned.
"""

import json
import logging
import os
import sys
from pathlib import Path

import httpx

log = logging.getLogger(__name__)


def _get_cache_dir() -> Path:
    """Return cache directory path. Uses app data dir for frozen builds."""
    if getattr(sys, "frozen", False):
        # Electron / PyInstaller: use %LOCALAPPDATA%/PoranosManagement/cache
        base = os.environ.get("LOCALAPPDATA", os.path.expanduser("~"))
        return Path(base) / "PoranosManagement" / "cache"
    # Dev: use Server/management/cache/
    return Path(__file__).parent.parent / "cache"


CACHE_DIR = _get_cache_dir()
THUMBNAILS_DIR = CACHE_DIR / "thumbnails"


def _ensure_dirs():
    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    THUMBNAILS_DIR.mkdir(parents=True, exist_ok=True)


# ── JSON cache ──

def save_json(key: str, data) -> None:
    """Save JSON-serializable data to cache."""
    _ensure_dirs()
    path = CACHE_DIR / f"{key}.json"
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    log.info(f"[cache] saved {key} ({len(json.dumps(data))} bytes)")


def load_json(key: str):
    """Load cached JSON data. Returns None if not found."""
    path = CACHE_DIR / f"{key}.json"
    if not path.exists():
        return None
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception as e:
        log.warning(f"[cache] failed to read {key}: {e}")
        return None


# ── Thumbnail cache ──

def get_thumbnail_path(category: str, item_id: int, size: str) -> Path:
    """Return local path for a cached thumbnail image."""
    return THUMBNAILS_DIR / f"{category}_{item_id}_{size}.jpg"


async def download_and_cache_thumbnail(
    url: str, category: str, item_id: int, size: str
) -> Path | None:
    """Download a thumbnail image and save it locally. Returns local path or None."""
    if not url:
        return None

    path = get_thumbnail_path(category, item_id, size)
    # Skip if already cached
    if path.exists() and path.stat().st_size > 0:
        return path

    _ensure_dirs()
    try:
        async with httpx.AsyncClient(timeout=15, follow_redirects=True) as client:
            resp = await client.get(url)
            if resp.status_code == 200:
                path.write_bytes(resp.content)
                log.info(f"[cache] thumbnail saved: {path.name} ({len(resp.content)} bytes)")
                return path
            else:
                log.warning(f"[cache] thumbnail download failed ({resp.status_code}): {url}")
    except Exception as e:
        log.warning(f"[cache] thumbnail download error: {e}")
    return None


def has_thumbnail(category: str, item_id: int, size: str) -> bool:
    path = get_thumbnail_path(category, item_id, size)
    return path.exists() and path.stat().st_size > 0
