import asyncio
import logging
import sys
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from starlette.responses import FileResponse

from routers import server_control, metrics, devices, signaling, mirroring, remote, poranos_proxy
from services import get_adb_path
from services.metrics_service import MetricsService
from services.scrcpy_service import ScrcpyService

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)

logger = logging.getLogger(__name__)


def _get_base_dir() -> Path:
    """PyInstaller frozen exe uses sys._MEIPASS for bundled data."""
    if getattr(sys, "frozen", False):
        return Path(sys._MEIPASS)
    return Path(__file__).parent

metrics_service = MetricsService()
scrcpy_service = ScrcpyService()


async def _ensure_adb_server():
    """Start ADB server daemon using bundled adb.exe (needed on PCs without Android SDK)."""
    adb = get_adb_path()
    try:
        proc = await asyncio.create_subprocess_exec(
            adb, "start-server",
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
        )
        stdout, stderr = await asyncio.wait_for(proc.communicate(), timeout=15)
        output = (stdout.decode(errors="replace") + stderr.decode(errors="replace")).strip()
        if proc.returncode == 0:
            logger.info(f"ADB server started: {output or 'OK'}")
        else:
            logger.warning(f"ADB start-server returned {proc.returncode}: {output}")
    except FileNotFoundError:
        logger.warning(f"ADB not found at: {adb}")
    except asyncio.TimeoutError:
        logger.warning("ADB start-server timed out (15s)")
    except Exception as e:
        logger.warning(f"ADB start-server error: {e}")


@asynccontextmanager
async def lifespan(app: FastAPI):
    await _ensure_adb_server()
    metrics.set_metrics_service(metrics_service)
    mirroring.set_scrcpy_service(scrcpy_service)
    await metrics_service.start()
    yield
    await scrcpy_service.stop_all()
    await metrics_service.stop()


app = FastAPI(title="Poranos Management", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# API routes
app.include_router(server_control.router, prefix="/api/server", tags=["server"])
app.include_router(metrics.router, prefix="/api/metrics", tags=["metrics"])
app.include_router(devices.router, prefix="/api/devices", tags=["devices"])
app.include_router(signaling.router, prefix="/api/signaling", tags=["signaling"])
app.include_router(mirroring.router, prefix="/api/mirror", tags=["mirroring"])
app.include_router(remote.router, prefix="/api/remote", tags=["remote"])
app.include_router(poranos_proxy.router, prefix="/api/poranos", tags=["poranos"])

# Serve Vue build as static files (SPA catch-all)
static_dir = _get_base_dir() / "static"


@app.get("/{full_path:path}")
async def spa_fallback(full_path: str):
    # Mount assets on first request if available
    if not hasattr(app.state, "_assets_mounted"):
        assets_dir = static_dir / "assets"
        if assets_dir.exists():
            app.mount("/assets", StaticFiles(directory=str(assets_dir)), name="assets")
        app.state._assets_mounted = True

    if full_path:
        file_path = static_dir / full_path
        try:
            file_path.resolve().relative_to(static_dir.resolve())
            if file_path.exists() and file_path.is_file():
                return FileResponse(str(file_path))
        except ValueError:
            pass
    index = static_dir / "index.html"
    if index.exists():
        return FileResponse(str(index))
    return {"detail": "Frontend not deployed yet. Deploy static files to /app/static/"}


if __name__ == "__main__":
    import uvicorn
    from config import settings

    uvicorn.run(app, host="127.0.0.1", port=settings.mgmt_port, log_level="info")
