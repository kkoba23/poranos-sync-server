import logging
import uuid
from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Optional

logger = logging.getLogger(__name__)


@dataclass
class Streamer:
    device_id: str
    serial: str
    model: str
    ws: object
    connected_at: str = field(
        default_factory=lambda: datetime.now(timezone.utc).isoformat()
    )


@dataclass
class Viewer:
    viewer_id: str
    ws: object
    watching_device_id: Optional[str] = None


class SignalingService:
    def __init__(self):
        self.streamers: dict[str, Streamer] = {}
        self.viewers: dict[str, Viewer] = {}

    def register_streamer(self, serial: str, model: str, ws) -> str:
        device_id = f"quest3-{serial}"
        self.streamers[device_id] = Streamer(
            device_id=device_id, serial=serial, model=model, ws=ws
        )
        logger.info(f"Streamer registered: {device_id}")
        return device_id

    def unregister_streamer(self, device_id: str):
        if device_id in self.streamers:
            del self.streamers[device_id]
            logger.info(f"Streamer unregistered: {device_id}")

    def register_viewer(self, ws) -> str:
        viewer_id = str(uuid.uuid4())
        self.viewers[viewer_id] = Viewer(viewer_id=viewer_id, ws=ws)
        logger.info(f"Viewer registered: {viewer_id}")
        return viewer_id

    def unregister_viewer(self, viewer_id: str):
        if viewer_id in self.viewers:
            del self.viewers[viewer_id]
            logger.info(f"Viewer unregistered: {viewer_id}")

    def get_device_list(self) -> list[dict]:
        return [
            {
                "device_id": s.device_id,
                "serial": s.serial,
                "model": s.model,
                "streaming": True,
                "connected_at": s.connected_at,
            }
            for s in self.streamers.values()
        ]

    def find_streamer_by_ws(self, ws) -> Optional[str]:
        for device_id, streamer in self.streamers.items():
            if streamer.ws is ws:
                return device_id
        return None

    def find_viewer_by_ws(self, ws) -> Optional[str]:
        for viewer_id, viewer in self.viewers.items():
            if viewer.ws is ws:
                return viewer_id
        return None

    async def relay_to_streamer(self, device_id: str, message: dict):
        streamer = self.streamers.get(device_id)
        if streamer:
            try:
                await streamer.ws.send_json(message)
            except Exception as e:
                logger.error(f"Failed to relay to streamer {device_id}: {e}")

    async def relay_to_viewer(self, viewer_id: str, message: dict):
        viewer = self.viewers.get(viewer_id)
        if viewer:
            try:
                await viewer.ws.send_json(message)
            except Exception as e:
                logger.error(f"Failed to relay to viewer {viewer_id}: {e}")

    async def broadcast_device_list(self):
        device_list = self.get_device_list()
        msg = {"type": "device_list", "devices": device_list}
        disconnected = []
        for viewer_id, viewer in self.viewers.items():
            try:
                await viewer.ws.send_json(msg)
            except Exception:
                disconnected.append(viewer_id)
        for vid in disconnected:
            self.unregister_viewer(vid)

    async def notify_device_disconnected(self, device_id: str):
        msg = {"type": "device_disconnected", "device_id": device_id}
        disconnected = []
        for viewer_id, viewer in self.viewers.items():
            if viewer.watching_device_id == device_id:
                try:
                    await viewer.ws.send_json(msg)
                    viewer.watching_device_id = None
                except Exception:
                    disconnected.append(viewer_id)
        for vid in disconnected:
            self.unregister_viewer(vid)
