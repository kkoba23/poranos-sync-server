import os
from pydantic_settings import BaseSettings


_standalone = os.environ.get("STANDALONE", "0") == "1"


class Settings(BaseSettings):
    standalone: bool = _standalone
    sync_server_url: str = "http://localhost:8765" if _standalone else "http://sync-server:8765"
    sync_server_port: int = 8765
    adb_host: str = "localhost" if _standalone else "host.docker.internal"
    adb_port: int = 5037
    upload_dir: str = os.path.join(os.path.dirname(__file__), "uploads") if _standalone else "/app/uploads"
    docker_container_name: str = "poranos-desktop-sync"
    metrics_poll_interval: int = 5
    device_poll_interval: int = 10
    # WiFi ADB: comma-separated "ip:port" or "ip" (default port 5555)
    wifi_devices: str = "192.168.8.21"
    mgmt_port: int = int(os.environ.get("MGMT_PORT", "8080"))

    class Config:
        env_file = ".env"


settings = Settings()
