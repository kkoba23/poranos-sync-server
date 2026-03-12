import logging

from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from services.signaling_service import SignalingService

logger = logging.getLogger(__name__)

router = APIRouter()

_signaling_service = SignalingService()


def get_signaling_service() -> SignalingService:
    return _signaling_service


@router.get("/devices")
async def get_signaling_devices():
    return {"devices": _signaling_service.get_device_list()}


@router.websocket("/ws")
async def signaling_ws(ws: WebSocket):
    await ws.accept()
    role = None
    device_id = None
    viewer_id = None

    try:
        while True:
            msg = await ws.receive_json()
            msg_type = msg.get("type")

            if msg_type == "register":
                role = msg.get("role")

                if role == "streamer":
                    serial = msg.get("serial", "unknown")
                    model = msg.get("model", "Quest 3")
                    device_id = _signaling_service.register_streamer(
                        serial, model, ws
                    )
                    await ws.send_json({
                        "type": "registered",
                        "device_id": device_id,
                    })
                    await _signaling_service.broadcast_device_list()

                elif role == "viewer":
                    viewer_id = _signaling_service.register_viewer(ws)
                    await ws.send_json({
                        "type": "registered",
                        "viewer_id": viewer_id,
                    })
                    await ws.send_json({
                        "type": "device_list",
                        "devices": _signaling_service.get_device_list(),
                    })

            elif msg_type == "request_stream" and viewer_id:
                target_device = msg.get("device_id")
                viewer = _signaling_service.viewers.get(viewer_id)
                if viewer:
                    viewer.watching_device_id = target_device
                await _signaling_service.relay_to_streamer(
                    target_device,
                    {"type": "stream_requested", "viewer_id": viewer_id},
                )

            elif msg_type == "offer" and device_id:
                target_viewer = msg.get("viewer_id")
                await _signaling_service.relay_to_viewer(
                    target_viewer,
                    {
                        "type": "offer",
                        "device_id": device_id,
                        "sdp": msg.get("sdp"),
                    },
                )

            elif msg_type == "answer" and viewer_id:
                target_device = msg.get("device_id")
                await _signaling_service.relay_to_streamer(
                    target_device,
                    {
                        "type": "answer",
                        "viewer_id": viewer_id,
                        "sdp": msg.get("sdp"),
                    },
                )

            elif msg_type == "ice_candidate":
                candidate = msg.get("candidate")
                if role == "streamer" and device_id:
                    target_viewer = msg.get("viewer_id")
                    await _signaling_service.relay_to_viewer(
                        target_viewer,
                        {
                            "type": "ice_candidate",
                            "device_id": device_id,
                            "candidate": candidate,
                        },
                    )
                elif role == "viewer" and viewer_id:
                    target_device = msg.get("device_id")
                    await _signaling_service.relay_to_streamer(
                        target_device,
                        {
                            "type": "ice_candidate",
                            "viewer_id": viewer_id,
                            "candidate": candidate,
                        },
                    )

            elif msg_type == "stop_stream":
                if role == "viewer" and viewer_id:
                    target_device = msg.get("device_id")
                    await _signaling_service.relay_to_streamer(
                        target_device,
                        {"type": "stop_stream"},
                    )
                    viewer = _signaling_service.viewers.get(viewer_id)
                    if viewer:
                        viewer.watching_device_id = None

    except WebSocketDisconnect:
        pass
    except Exception as e:
        logger.error(f"Signaling WebSocket error: {e}")
    finally:
        if role == "streamer" and device_id:
            await _signaling_service.notify_device_disconnected(device_id)
            _signaling_service.unregister_streamer(device_id)
            await _signaling_service.broadcast_device_list()
        elif role == "viewer" and viewer_id:
            _signaling_service.unregister_viewer(viewer_id)
