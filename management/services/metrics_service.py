import asyncio
import logging
from collections import deque
from datetime import datetime, timezone
from typing import Optional

import httpx

from config import settings

logger = logging.getLogger(__name__)


class MetricsService:
    def __init__(self):
        self.sync_url = settings.sync_server_url
        self.poll_interval = settings.metrics_poll_interval
        # Store up to 24h of history at poll_interval
        max_entries = (24 * 3600) // self.poll_interval
        self.history: deque[dict] = deque(maxlen=max_entries)
        self.current: Optional[dict] = None
        self._ws_clients: list = []
        self._task: Optional[asyncio.Task] = None

    async def start(self):
        self._task = asyncio.create_task(self._poll_loop())

    async def stop(self):
        if self._task:
            self._task.cancel()
            try:
                await self._task
            except asyncio.CancelledError:
                pass

    def add_ws_client(self, ws):
        self._ws_clients.append(ws)

    def remove_ws_client(self, ws):
        if ws in self._ws_clients:
            self._ws_clients.remove(ws)

    async def fetch_metrics(self) -> Optional[dict]:
        try:
            async with httpx.AsyncClient(timeout=5.0) as client:
                resp = await client.get(f"{self.sync_url}/metrics")
                if resp.status_code == 200:
                    data = resp.json()
                    data["timestamp"] = datetime.now(
                        timezone.utc
                    ).isoformat()
                    return data
        except Exception as e:
            logger.warning(f"Failed to fetch metrics: {e}")
        return None

    def get_history(self, minutes: int = 30) -> list[dict]:
        cutoff = datetime.now(timezone.utc).timestamp() - (minutes * 60)
        result = []
        for entry in self.history:
            try:
                ts = datetime.fromisoformat(entry["timestamp"]).timestamp()
                if ts >= cutoff:
                    result.append(entry)
            except (KeyError, ValueError):
                continue
        return result

    async def _poll_loop(self):
        while True:
            try:
                data = await self.fetch_metrics()
                if data:
                    self.current = data
                    self.history.append(data)
                    await self._broadcast(data)
            except asyncio.CancelledError:
                raise
            except Exception as e:
                logger.error(f"Metrics poll error: {e}")
            await asyncio.sleep(self.poll_interval)

    async def _broadcast(self, data: dict):
        msg = {"type": "metrics_update", "data": data}
        disconnected = []
        for ws in self._ws_clients:
            try:
                await ws.send_json(msg)
            except Exception:
                disconnected.append(ws)
        for ws in disconnected:
            self.remove_ws_client(ws)
