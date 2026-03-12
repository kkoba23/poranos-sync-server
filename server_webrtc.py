"""
WebRTC signaling: streamer/viewer registration, offer/answer/ICE relay, device list.
"""

import json
import logging

from server_room import ws_to_room

log = logging.getLogger("poranos-ws")


# ---------------------------------------------------------------------------
# Module-level shared state
# ---------------------------------------------------------------------------

# device_id -> {"ws": ws, "client_id": int, "room_name": str}
webrtc_streamers: dict[str, dict] = {}
# viewer_id -> {"ws": ws, "watching": str|None}
webrtc_viewers: dict[str, dict] = {}
webrtc_viewer_counter = 0
# Only the latest viewer can request streams (prevents multi-tab conflicts)
webrtc_latest_viewer: str | None = None
# WebRTCのviewer/streamer WSをstale sweep除外用に追跡
webrtc_ws_set: set = set()


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def find_webrtc_streamer_by_ws(ws) -> str | None:
    for device_id, info in webrtc_streamers.items():
        if info["ws"] is ws:
            return device_id
    return None


def find_webrtc_viewer_by_ws(ws) -> str | None:
    for viewer_id, info in webrtc_viewers.items():
        if info["ws"] is ws:
            return viewer_id
    return None


def get_webrtc_device_list() -> list[dict]:
    return [
        {"device_id": did, "room_name": info.get("room_name", ""), "client_id": info.get("client_id", -1)}
        for did, info in webrtc_streamers.items()
    ]


async def broadcast_webrtc_device_list():
    """全ビューアーにデバイスリストを送信"""
    msg = json.dumps({"type": "webrtc_device_list", "devices": get_webrtc_device_list()})
    disconnected = []
    for vid, info in webrtc_viewers.items():
        try:
            await info["ws"].send(msg)
        except Exception:
            disconnected.append(vid)
    for vid in disconnected:
        webrtc_viewers.pop(vid, None)


async def notify_viewers_device_disconnected(device_id: str):
    """ストリーマー切断を全ビューアーに通知"""
    msg = json.dumps({"type": "webrtc_device_disconnected", "device_id": device_id})
    disconnected = []
    for vid, info in webrtc_viewers.items():
        try:
            await info["ws"].send(msg)
            watching = info.get("watching")
            if isinstance(watching, set):
                watching.discard(device_id)
        except Exception:
            disconnected.append(vid)
    for vid in disconnected:
        webrtc_viewers.pop(vid, None)


# ---------------------------------------------------------------------------
# WebRTC handlers
# ---------------------------------------------------------------------------

async def handle_webrtc_register(ws, msg: dict):
    global webrtc_viewer_counter, webrtc_latest_viewer
    role = msg.get("role")

    if role == "streamer":
        room_info = ws_to_room.get(ws)
        if room_info:
            room_name, client_id = room_info
            device_id = f"quest3-{client_id}-{room_name}"
            webrtc_streamers[device_id] = {"ws": ws, "client_id": client_id, "room_name": room_name}
            await ws.send(json.dumps({"type": "webrtc_registered", "device_id": device_id}))
            log.info(f"  WebRTC streamer registered: {device_id}")
            await broadcast_webrtc_device_list()
        else:
            await ws.send(json.dumps({"type": "error", "message": "Must join a room before registering as streamer"}))

    elif role == "viewer":
        webrtc_viewer_counter += 1
        viewer_id = f"viewer-{webrtc_viewer_counter}"
        webrtc_viewers[viewer_id] = {"ws": ws, "watching": set()}
        webrtc_ws_set.add(ws)
        old_viewer = webrtc_latest_viewer
        webrtc_latest_viewer = viewer_id

        # Stop existing streams on all Quest devices so they accept the new viewer
        if old_viewer and old_viewer != viewer_id:
            for did, sinfo in webrtc_streamers.items():
                try:
                    await sinfo["ws"].send(json.dumps({"type": "webrtc_stop_stream"}))
                except Exception:
                    pass
            log.info(f"  WebRTC stop sent to all streamers (viewer changed: {old_viewer} -> {viewer_id})")

        await ws.send(json.dumps({
            "type": "webrtc_registered",
            "viewer_id": viewer_id,
            "devices": get_webrtc_device_list(),
        }))
        log.info(f"  WebRTC viewer registered: {viewer_id} (active viewer)")


async def handle_webrtc_request_stream(ws, msg: dict):
    viewer_id = find_webrtc_viewer_by_ws(ws)
    device_id = msg.get("device_id")
    if viewer_id and device_id in webrtc_streamers:
        # Only the latest viewer can request streams (prevents multi-tab conflicts)
        if viewer_id != webrtc_latest_viewer:
            log.info(f"  WebRTC stream request dropped: {viewer_id} -> {device_id} (not active viewer, active={webrtc_latest_viewer})")
            return
        webrtc_viewers[viewer_id]["watching"].add(device_id)
        streamer = webrtc_streamers[device_id]
        await streamer["ws"].send(json.dumps({"type": "webrtc_stream_requested", "viewer_id": viewer_id}))
        log.info(f"  WebRTC stream requested: {viewer_id} -> {device_id}")


async def handle_webrtc_offer(ws, msg: dict):
    viewer_id = msg.get("viewer_id")
    viewer = webrtc_viewers.get(viewer_id)
    if viewer:
        device_id = find_webrtc_streamer_by_ws(ws)
        await viewer["ws"].send(json.dumps({
            "type": "webrtc_offer",
            "device_id": device_id,
            "sdp": msg.get("sdp"),
        }))
        log.info(f"  WebRTC offer relayed: {device_id} -> {viewer_id}")


async def handle_webrtc_answer(ws, msg: dict):
    device_id = msg.get("device_id")
    streamer = webrtc_streamers.get(device_id)
    if streamer:
        viewer_id = find_webrtc_viewer_by_ws(ws)
        await streamer["ws"].send(json.dumps({
            "type": "webrtc_answer",
            "viewer_id": viewer_id,
            "sdp": msg.get("sdp"),
        }))
        log.info(f"  WebRTC answer relayed: {viewer_id} -> {device_id}")


async def handle_webrtc_ice_candidate(ws, msg: dict):
    target_viewer = msg.get("viewer_id")
    target_device = msg.get("device_id")

    if target_viewer:
        # Streamer -> Viewer
        viewer = webrtc_viewers.get(target_viewer)
        if viewer:
            device_id = find_webrtc_streamer_by_ws(ws)
            await viewer["ws"].send(json.dumps({
                "type": "webrtc_ice_candidate",
                "device_id": device_id,
                "candidate": msg.get("candidate"),
            }))
            log.info(f"  WebRTC ICE candidate relayed: {device_id} -> {target_viewer}")
        else:
            log.warning(f"  WebRTC ICE candidate: viewer {target_viewer} not found")
    elif target_device:
        # Viewer -> Streamer
        streamer = webrtc_streamers.get(target_device)
        if streamer:
            viewer_id = find_webrtc_viewer_by_ws(ws)
            await streamer["ws"].send(json.dumps({
                "type": "webrtc_ice_candidate",
                "viewer_id": viewer_id,
                "candidate": msg.get("candidate"),
            }))
            log.info(f"  WebRTC ICE candidate relayed: {viewer_id} -> {target_device}")
        else:
            log.warning(f"  WebRTC ICE candidate: streamer {target_device} not found")
    else:
        log.warning(f"  WebRTC ICE candidate: no target_viewer or target_device")


async def handle_webrtc_stop_stream(ws, msg: dict):
    viewer_id = find_webrtc_viewer_by_ws(ws)
    device_id = msg.get("device_id")
    if viewer_id and device_id:
        streamer = webrtc_streamers.get(device_id)
        if streamer:
            await streamer["ws"].send(json.dumps({"type": "webrtc_stop_stream"}))
        webrtc_viewers[viewer_id]["watching"].discard(device_id)
        log.info(f"  WebRTC stream stopped: {viewer_id} -> {device_id}")


async def cleanup_webrtc_for_ws(ws):
    """WebSocket切断時のWebRTCクリーンアップ"""
    webrtc_ws_set.discard(ws)
    device_id = find_webrtc_streamer_by_ws(ws)
    if device_id:
        webrtc_streamers.pop(device_id, None)
        await notify_viewers_device_disconnected(device_id)
        await broadcast_webrtc_device_list()
    viewer_id = find_webrtc_viewer_by_ws(ws)
    if viewer_id:
        webrtc_viewers.pop(viewer_id, None)
