from pydantic import BaseModel
from typing import Optional


class ServerStatus(BaseModel):
    status: str  # running, stopped, restarting, error, not_found
    container_id: Optional[str] = None
    uptime_seconds: Optional[float] = None
    started_at: Optional[str] = None


class ServerAction(BaseModel):
    success: bool
    message: str
    container_id: Optional[str] = None


class ConnectionMetrics(BaseModel):
    total: int = 0
    current: int = 0


class RoomDetail(BaseModel):
    clients: int = 0
    objects: int = 0


class PingMetrics(BaseModel):
    avg: float = 0
    min: float = 0
    max: float = 0
    p50: float = 0
    p95: float = 0
    samples: int = 0


class RttMetrics(BaseModel):
    clients: int = 0
    avg: float = 0
    min: float = 0
    max: float = 0


class MetricsSnapshot(BaseModel):
    timestamp: str
    uptime_seconds: float = 0
    connections: ConnectionMetrics = ConnectionMetrics()
    rooms: dict = {}
    clients_total: int = 0
    objects_total: int = 0
    messages: dict = {}
    ping_processing_ms: PingMetrics = PingMetrics()
    client_rtt_ms: RttMetrics = RttMetrics()


class Device(BaseModel):
    serial: str
    status: str
    model: str = "Unknown"
    battery_level: Optional[int] = None
    app_installed: bool = False
    app_version: Optional[str] = None
    webrtc_available: bool = False


class InstallTask(BaseModel):
    task_id: str
    status: str  # queued, installing, success, failed
    device_serial: str
    apk_filename: str
    progress_percent: int = 0
    message: Optional[str] = None
    started_at: Optional[str] = None
    completed_at: Optional[str] = None
