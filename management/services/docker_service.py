from datetime import datetime, timezone

from config import settings

try:
    import docker
    from docker.errors import NotFound, APIError
    _HAS_DOCKER = True
except ImportError:
    _HAS_DOCKER = False


class DockerService:
    def __init__(self):
        if _HAS_DOCKER:
            self.client = docker.from_env()
        else:
            self.client = None
        self.container_name = settings.docker_container_name

    def get_status(self) -> dict:
        if not _HAS_DOCKER or self.client is None:
            if settings.standalone:
                return {"status": "standalone", "message": "Docker not used in standalone mode"}
            return {"status": "error", "message": "docker package not installed"}
        try:
            container = self.client.containers.get(self.container_name)
            state = container.attrs.get("State", {})
            started_at = state.get("StartedAt", "")

            uptime = None
            if container.status == "running" and started_at:
                try:
                    start_dt = datetime.fromisoformat(
                        started_at.replace("Z", "+00:00")
                    )
                    uptime = (
                        datetime.now(timezone.utc) - start_dt
                    ).total_seconds()
                except (ValueError, TypeError):
                    pass

            return {
                "status": container.status,
                "container_id": container.short_id,
                "uptime_seconds": uptime,
                "started_at": started_at,
            }
        except NotFound:
            return {"status": "not_found"}
        except APIError as e:
            return {"status": "error", "message": str(e)}

    def start(self) -> dict:
        if not _HAS_DOCKER or self.client is None:
            return {"success": False, "message": "Docker not available"}
        try:
            container = self.client.containers.get(self.container_name)
            container.start()
            return {
                "success": True,
                "message": "Sync server started",
                "container_id": container.short_id,
            }
        except NotFound:
            return {"success": False, "message": "Container not found"}
        except APIError as e:
            return {"success": False, "message": str(e)}

    def stop(self) -> dict:
        if not _HAS_DOCKER or self.client is None:
            return {"success": False, "message": "Docker not available"}
        try:
            container = self.client.containers.get(self.container_name)
            container.stop(timeout=10)
            return {"success": True, "message": "Sync server stopped"}
        except NotFound:
            return {"success": False, "message": "Container not found"}
        except APIError as e:
            return {"success": False, "message": str(e)}

    def restart(self) -> dict:
        if not _HAS_DOCKER or self.client is None:
            return {"success": False, "message": "Docker not available"}
        try:
            container = self.client.containers.get(self.container_name)
            container.restart(timeout=10)
            return {
                "success": True,
                "message": "Sync server restarted",
                "container_id": container.short_id,
            }
        except NotFound:
            return {"success": False, "message": "Container not found"}
        except APIError as e:
            return {"success": False, "message": str(e)}
