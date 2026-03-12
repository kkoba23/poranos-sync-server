"""Service for downloading files from poranos.com to local disk.

Manages concurrent downloads with progress tracking and abort support.
Files are stored in: {upload_dir}/content_files/{file_id}_{filename}
"""

import asyncio
import logging
import os
import time
from dataclasses import dataclass, field
from enum import Enum

import httpx

from config import settings

log = logging.getLogger(__name__)


class DownloadStatus(str, Enum):
    PENDING = "pending"
    DOWNLOADING = "downloading"
    COMPLETED = "completed"
    FAILED = "failed"
    ABORTED = "aborted"


@dataclass
class DownloadTask:
    task_id: str
    file_id: int
    file_name: str
    file_size: int
    status: DownloadStatus = DownloadStatus.PENDING
    progress: float = 0.0  # 0.0 - 1.0
    downloaded_bytes: int = 0
    error: str = ""
    started_at: float = 0.0
    completed_at: float = 0.0
    _cancel_event: asyncio.Event = field(default_factory=asyncio.Event, repr=False)

    def to_dict(self) -> dict:
        return {
            "task_id": self.task_id,
            "file_id": self.file_id,
            "file_name": self.file_name,
            "file_size": self.file_size,
            "status": self.status.value,
            "progress": round(self.progress, 3),
            "downloaded_bytes": self.downloaded_bytes,
            "error": self.error,
            "started_at": self.started_at,
            "completed_at": self.completed_at,
        }


def _content_dir() -> str:
    d = os.path.join(settings.upload_dir, "content_files")
    os.makedirs(d, exist_ok=True)
    return d


def get_local_path(file_id: int, file_name: str) -> str:
    """Return local file path for a given file."""
    safe_name = file_name.replace("/", "_").replace("\\", "_")
    return os.path.join(_content_dir(), f"{file_id}_{safe_name}")


class FileDownloadService:
    def __init__(self):
        self._tasks: dict[str, DownloadTask] = {}  # task_id -> DownloadTask
        self._active_downloads: dict[int, str] = {}  # file_id -> task_id
        self._listeners: list[asyncio.Queue] = []
        self._semaphore = asyncio.Semaphore(3)  # max 3 concurrent downloads

    # ── Public API ──

    def get_downloaded_file_ids(self) -> set[int]:
        """Scan content_files dir and return set of file IDs that exist locally."""
        result = set()
        content_dir = _content_dir()
        try:
            for name in os.listdir(content_dir):
                parts = name.split("_", 1)
                if len(parts) >= 2:
                    try:
                        result.add(int(parts[0]))
                    except ValueError:
                        pass
        except FileNotFoundError:
            pass
        return result

    def get_local_files_info(self) -> list[dict]:
        """Return list of locally downloaded files with sizes."""
        result = []
        content_dir = _content_dir()
        try:
            for name in os.listdir(content_dir):
                path = os.path.join(content_dir, name)
                if not os.path.isfile(path):
                    continue
                parts = name.split("_", 1)
                if len(parts) < 2:
                    continue
                try:
                    file_id = int(parts[0])
                except ValueError:
                    continue
                result.append({
                    "file_id": file_id,
                    "file_name": parts[1],
                    "local_size": os.path.getsize(path),
                    "local_path": path,
                })
        except FileNotFoundError:
            pass
        return result

    def start_download(self, file_id: int, file_name: str, file_size: int,
                       presigned_url: str) -> DownloadTask:
        """Start a file download. Returns task info."""
        # If already downloading this file, return existing task
        if file_id in self._active_downloads:
            existing_id = self._active_downloads[file_id]
            if existing_id in self._tasks:
                task = self._tasks[existing_id]
                if task.status == DownloadStatus.DOWNLOADING:
                    return task

        task_id = f"dl_{file_id}_{int(time.time())}"
        task = DownloadTask(
            task_id=task_id,
            file_id=file_id,
            file_name=file_name,
            file_size=file_size,
        )
        self._tasks[task_id] = task
        self._active_downloads[file_id] = task_id

        asyncio.create_task(self._run_download(task, presigned_url))
        return task

    def start_batch_download(self, files: list[dict]) -> list[DownloadTask]:
        """Start downloading multiple files. Each dict needs: file_id, file_name, file_size, presigned_url."""
        tasks = []
        for f in files:
            task = self.start_download(
                file_id=f["file_id"],
                file_name=f["file_name"],
                file_size=f["file_size"],
                presigned_url=f["presigned_url"],
            )
            tasks.append(task)
        return tasks

    def abort_download(self, task_id: str) -> bool:
        """Abort a running download."""
        task = self._tasks.get(task_id)
        if not task or task.status != DownloadStatus.DOWNLOADING:
            return False
        task._cancel_event.set()
        return True

    def abort_all(self) -> int:
        """Abort all running downloads. Returns count aborted."""
        count = 0
        for task in self._tasks.values():
            if task.status == DownloadStatus.DOWNLOADING:
                task._cancel_event.set()
                count += 1
        return count

    def get_task(self, task_id: str) -> DownloadTask | None:
        return self._tasks.get(task_id)

    def get_all_tasks(self) -> list[dict]:
        return [t.to_dict() for t in self._tasks.values()]

    def get_active_tasks(self) -> list[dict]:
        return [
            t.to_dict() for t in self._tasks.values()
            if t.status in (DownloadStatus.PENDING, DownloadStatus.DOWNLOADING)
        ]

    def subscribe(self) -> asyncio.Queue:
        """Subscribe to progress events. Returns a Queue that receives task dicts."""
        q: asyncio.Queue = asyncio.Queue(maxsize=100)
        self._listeners.append(q)
        return q

    def unsubscribe(self, q: asyncio.Queue):
        if q in self._listeners:
            self._listeners.remove(q)

    def delete_local_file(self, file_id: int) -> bool:
        """Delete a locally downloaded file."""
        content_dir = _content_dir()
        try:
            for name in os.listdir(content_dir):
                if name.startswith(f"{file_id}_"):
                    os.remove(os.path.join(content_dir, name))
                    log.info(f"[files] deleted local file: {name}")
                    return True
        except Exception as e:
            log.warning(f"[files] delete failed for file_id={file_id}: {e}")
        return False

    # ── Internal ──

    async def _broadcast(self, task: DownloadTask):
        data = task.to_dict()
        dead = []
        for q in self._listeners:
            try:
                q.put_nowait(data)
            except asyncio.QueueFull:
                dead.append(q)
        for q in dead:
            self._listeners.remove(q)

    async def _run_download(self, task: DownloadTask, url: str):
        async with self._semaphore:
            task.status = DownloadStatus.DOWNLOADING
            task.started_at = time.time()
            await self._broadcast(task)

            local_path = get_local_path(task.file_id, task.file_name)
            tmp_path = local_path + ".tmp"

            try:
                async with httpx.AsyncClient(timeout=httpx.Timeout(10, read=300),
                                             follow_redirects=True) as client:
                    async with client.stream("GET", url) as resp:
                        if resp.status_code != 200:
                            raise Exception(f"HTTP {resp.status_code}")

                        total = int(resp.headers.get("content-length", task.file_size or 0))
                        if total > 0:
                            task.file_size = total

                        downloaded = 0
                        last_broadcast = 0.0

                        with open(tmp_path, "wb") as f:
                            async for chunk in resp.aiter_bytes(chunk_size=65536):
                                if task._cancel_event.is_set():
                                    raise asyncio.CancelledError()

                                f.write(chunk)
                                downloaded += len(chunk)
                                task.downloaded_bytes = downloaded
                                if total > 0:
                                    task.progress = downloaded / total

                                # Broadcast at most every 0.3s
                                now = time.monotonic()
                                if now - last_broadcast > 0.3:
                                    last_broadcast = now
                                    await self._broadcast(task)

                # Rename tmp -> final
                if os.path.exists(local_path):
                    os.remove(local_path)
                os.rename(tmp_path, local_path)

                task.status = DownloadStatus.COMPLETED
                task.progress = 1.0
                task.completed_at = time.time()
                log.info(f"[files] downloaded: {task.file_name} ({downloaded} bytes)")

            except asyncio.CancelledError:
                task.status = DownloadStatus.ABORTED
                task.error = "Aborted by user"
                log.info(f"[files] aborted: {task.file_name}")
                self._cleanup_tmp(tmp_path)

            except Exception as e:
                task.status = DownloadStatus.FAILED
                task.error = str(e)
                log.warning(f"[files] download failed: {task.file_name} - {e}")
                self._cleanup_tmp(tmp_path)

            finally:
                self._active_downloads.pop(task.file_id, None)
                await self._broadcast(task)

    @staticmethod
    def _cleanup_tmp(path: str):
        try:
            if os.path.exists(path):
                os.remove(path)
        except Exception:
            pass
