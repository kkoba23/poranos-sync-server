from fastapi import APIRouter, Depends
import httpx

from config import settings
from services.docker_service import DockerService

router = APIRouter()


def get_docker_service():
    return DockerService()


@router.get("/status")
async def status(svc: DockerService = Depends(get_docker_service)):
    return svc.get_status()


@router.post("/start")
async def start(svc: DockerService = Depends(get_docker_service)):
    return svc.start()


@router.post("/stop")
async def stop(svc: DockerService = Depends(get_docker_service)):
    return svc.stop()


@router.post("/restart")
async def restart(svc: DockerService = Depends(get_docker_service)):
    return svc.restart()


@router.post("/reset")
async def reset_sync_server():
    """Sync serverの全ルーム状態（オブジェクト・シーンモデル）をリセット"""
    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            resp = await client.get(f"{settings.sync_server_url}/reset")
            return resp.json()
    except Exception as e:
        return {"status": "error", "message": str(e)}
