"""
WebSocket message router and stale client sweep.
"""

import asyncio
import json
import time
import logging

from server_room import (
    ws_to_room, ws_last_app_ping,
    handle_join_room, handle_leave_room,
    handle_instantiate, handle_model_update, handle_destroy,
    handle_request_ownership, handle_clear_ownership,
    handle_request_transform_ownership, handle_clear_transform_ownership,
    handle_transform_update,
)
from server_webrtc import (
    handle_webrtc_register, handle_webrtc_request_stream,
    handle_webrtc_offer, handle_webrtc_answer,
    handle_webrtc_ice_candidate, handle_webrtc_stop_stream,
    cleanup_webrtc_for_ws, webrtc_ws_set,
)
from server_metrics import metrics

log = logging.getLogger("poranos-ws")

# staleクライアント検出の閾値（秒）。クライアントは3秒ごとにpingを送信する。
STALE_CLIENT_TIMEOUT = 30.0
STALE_SWEEP_INTERVAL = 10.0


async def handler(ws):
    remote = ws.remote_address
    log.info(f"WebSocket connected: {remote}")
    metrics.on_connect()
    ws_last_app_ping[ws] = time.time()  # staleスイープ用の初期タイムスタンプ

    try:
        async for raw in ws:
            try:
                msg = json.loads(raw)
            except json.JSONDecodeError:
                log.warning(f"Invalid JSON from {remote}: {raw[:100]}")
                continue

            msg_type = msg.get("type", "")
            metrics.on_message(msg_type)

            if msg_type == "join_room":
                await handle_join_room(ws, msg)

            elif msg_type == "leave_room":
                await handle_leave_room(ws)

            elif msg_type == "ping":
                ws_id = id(ws)
                now = time.time()
                client_rtt = msg.get("lastRtt", -1)
                metrics.on_ping(ws_id, now, client_rtt)
                ws_last_app_ping[ws] = now
                client_ts = msg.get("timestamp", "")
                await ws.send(json.dumps({
                    "type": "pong",
                    "timestamp": client_ts,
                    "serverTime": time.time(),
                }))
                metrics.on_pong_sent(ws_id)

            elif msg_type == "instantiate":
                await handle_instantiate(ws, msg)

            elif msg_type == "model_update":
                await handle_model_update(ws, msg)

            elif msg_type == "destroy":
                await handle_destroy(ws, msg)

            elif msg_type == "request_ownership":
                await handle_request_ownership(ws, msg)

            elif msg_type == "clear_ownership":
                await handle_clear_ownership(ws, msg)

            elif msg_type == "request_transform_ownership":
                await handle_request_transform_ownership(ws, msg)

            elif msg_type == "clear_transform_ownership":
                await handle_clear_transform_ownership(ws, msg)

            elif msg_type == "transform_update":
                await handle_transform_update(ws, msg)

            # WebRTC signaling
            elif msg_type == "webrtc_register":
                await handle_webrtc_register(ws, msg)
            elif msg_type == "webrtc_request_stream":
                await handle_webrtc_request_stream(ws, msg)
            elif msg_type == "webrtc_offer":
                await handle_webrtc_offer(ws, msg)
            elif msg_type == "webrtc_answer":
                await handle_webrtc_answer(ws, msg)
            elif msg_type == "webrtc_ice_candidate":
                await handle_webrtc_ice_candidate(ws, msg)
            elif msg_type == "webrtc_stop_stream":
                await handle_webrtc_stop_stream(ws, msg)

            elif msg_type == "remote_command":
                # Management UIからのリモートコマンド → 同ルーム全クライアントにbroadcast
                info = ws_to_room.get(ws)
                if info:
                    room_name, _ = info
                    from server_room import rooms
                    room = rooms.get(room_name)
                    if room:
                        await room.broadcast_to_all(msg)
                        log.info(f"  remote_command broadcast: command={msg.get('command')} room={room_name} clients={len(room.clients)}")
                        # ack を返す（送信側が切断前にbroadcast完了を確認できるように）
                        await ws.send(json.dumps({"type": "remote_command_ack", "command": msg.get("command")}))
                else:
                    log.warning(f"  remote_command from client not in room")

            else:
                log.info(f"  Unknown message type: {msg_type}")

    except Exception as e:
        log.info(f"WebSocket disconnected: {remote} ({e})")
    finally:
        metrics.on_disconnect(id(ws))
        ws_last_app_ping.pop(ws, None)
        # WebRTCクリーンアップ
        await cleanup_webrtc_for_ws(ws)
        # 切断時にルームからクリーンアップ
        await handle_leave_room(ws)
        log.info(f"WebSocket cleaned up: {remote}")


async def stale_client_sweep():
    """アプリ層pingが一定時間途絶えたクライアントを強制退出させる定期タスク。
    WebSocket-levelのping/pongとは独立した二重安全ネット。
    """
    while True:
        await asyncio.sleep(STALE_SWEEP_INTERVAL)
        now = time.time()
        stale = []
        for ws, last_ping in ws_last_app_ping.items():
            # WebRTCのviewer/streamerはアプリ層pingを送らないのでスキップ
            if ws in webrtc_ws_set:
                continue
            if now - last_ping > STALE_CLIENT_TIMEOUT:
                stale.append(ws)
        for ws in stale:
            info = ws_to_room.get(ws)
            if info:
                room_name, client_id = info
                log.warning(f"Stale client detected: room={room_name} clientId={client_id} "
                            f"(no app ping for {STALE_CLIENT_TIMEOUT}s) → forcing leave")
            else:
                log.warning(f"Stale client detected (not in room) → closing")
            ws_last_app_ping.pop(ws, None)
            try:
                await handle_leave_room(ws)
                await ws.close(1000, "Stale client timeout")
            except Exception:
                pass
