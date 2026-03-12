from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Query

router = APIRouter()

# Will be set by main.py after service creation
_metrics_service = None


def set_metrics_service(svc):
    global _metrics_service
    _metrics_service = svc


@router.get("")
async def get_metrics():
    if _metrics_service and _metrics_service.current:
        return _metrics_service.current
    return {"error": "No metrics available"}


@router.get("/history")
async def get_history(minutes: int = Query(default=30, ge=1, le=1440)):
    if _metrics_service:
        return {
            "interval_seconds": _metrics_service.poll_interval,
            "data": _metrics_service.get_history(minutes),
        }
    return {"interval_seconds": 5, "data": []}


@router.websocket("/ws")
async def metrics_ws(ws: WebSocket):
    await ws.accept()
    _metrics_service.add_ws_client(ws)
    try:
        # Send current snapshot immediately
        if _metrics_service.current:
            await ws.send_json({
                "type": "metrics_update",
                "data": _metrics_service.current,
            })
        # Keep connection alive, handle client messages
        while True:
            await ws.receive_text()
    except WebSocketDisconnect:
        pass
    finally:
        _metrics_service.remove_ws_client(ws)
