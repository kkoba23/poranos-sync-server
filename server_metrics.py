"""
Metrics collection and HTTP endpoint handlers (/metrics, /debug, /viewer).
"""

import collections
import json
import time
import logging
from pathlib import Path
from websockets.http11 import Response as WsResponse
from websockets.datastructures import Headers as WsHeaders

from server_room import rooms, ws_last_app_ping, ws_device_info

log = logging.getLogger("poranos-ws")


class Metrics:
    def __init__(self):
        self.start_time = time.time()
        self.connections_total = 0       # 累計接続数
        self.connections_current = 0     # 現在の接続数
        self.messages_total = 0          # 累計受信メッセージ数
        self.messages_by_type: dict[str, int] = collections.defaultdict(int)
        # ping レイテンシー（直近100件のサーバー処理時間 ms）
        self.ping_latencies: collections.deque[float] = collections.deque(maxlen=100)
        # ws_id -> ping受信時刻（pong送信完了で消費）
        self._ping_recv_times: dict[int, float] = {}
        # クライアント報告RTT（ws_id -> 直近値 ms）
        self._client_rtts: dict[int, float] = {}

    def on_connect(self):
        self.connections_total += 1
        self.connections_current += 1

    def on_disconnect(self, ws_id: int = 0):
        self.connections_current = max(0, self.connections_current - 1)
        self._client_rtts.pop(ws_id, None)
        self._ping_recv_times.pop(ws_id, None)

    def on_message(self, msg_type: str):
        self.messages_total += 1
        self.messages_by_type[msg_type] += 1

    def on_ping(self, ws_id: int, server_recv_time: float, client_rtt: float = -1):
        """pingを受信した時刻を記録。pong送信後にレイテンシーを確定"""
        self._ping_recv_times[ws_id] = server_recv_time
        if client_rtt >= 0:
            self._client_rtts[ws_id] = client_rtt

    def on_pong_sent(self, ws_id: int):
        """pong送信完了時にサーバー処理時間を記録"""
        recv_time = self._ping_recv_times.pop(ws_id, None)
        if recv_time is not None:
            processing_ms = (time.time() - recv_time) * 1000
            self.ping_latencies.append(processing_ms)

    def _client_rtt_stats(self) -> dict:
        """クライアント報告RTTの統計"""
        rtts = list(self._client_rtts.values())
        if not rtts:
            return {"description": "クライアント報告ネットワークRTT", "clients": 0}
        avg = sum(rtts) / len(rtts)
        s = sorted(rtts)
        return {
            "description": "クライアント報告ネットワークRTT",
            "clients": len(rtts),
            "avg": round(avg, 1),
            "min": round(s[0], 1),
            "max": round(s[-1], 1),
        }

    def to_dict(self) -> dict:
        uptime = time.time() - self.start_time
        latencies = list(self.ping_latencies)
        avg_latency = sum(latencies) / len(latencies) if latencies else 0
        min_latency = min(latencies) if latencies else 0
        max_latency = max(latencies) if latencies else 0
        # p50, p95
        if latencies:
            s = sorted(latencies)
            p50 = s[len(s) // 2]
            p95 = s[int(len(s) * 0.95)]
        else:
            p50 = p95 = 0

        total_clients = sum(len(r.clients) for r in rooms.values())
        total_objects = sum(len(r.objects) for r in rooms.values())

        return {
            "uptime_seconds": round(uptime, 1),
            "connections": {
                "total": self.connections_total,
                "current": self.connections_current,
            },
            "rooms": {
                "count": len(rooms),
                "details": {
                    name: {
                        "clients": len(r.clients),
                        "objects": len(r.objects),
                    }
                    for name, r in rooms.items()
                },
            },
            "clients_total": total_clients,
            "objects_total": total_objects,
            "messages": {
                "total": self.messages_total,
                "by_type": dict(self.messages_by_type),
            },
            "ping_processing_ms": {
                "description": "サーバー側ping→pong処理時間",
                "samples": len(latencies),
                "avg": round(avg_latency, 2),
                "min": round(min_latency, 2),
                "max": round(max_latency, 2),
                "p50": round(p50, 2),
                "p95": round(p95, 2),
            },
            "client_rtt_ms": self._client_rtt_stats(),
        }


# Module-level singleton
metrics = Metrics()


async def handle_metrics_request(connection, request):
    """websockets 13+ の process_request フックで /metrics, /viewer HTTPリクエストを処理"""
    if request.path == "/metrics":
        body = json.dumps(metrics.to_dict(), indent=2, ensure_ascii=False).encode()
        return WsResponse(200, "OK", WsHeaders({"Content-Type": "application/json"}), body)
    if request.path == "/reset":
        # 全ルームのオブジェクト・シーンモデル状態をクリアし、クライアントにリセット通知
        import asyncio
        reset_rooms = []
        for room_name, room in list(rooms.items()):
            obj_count = len(room.objects)
            scene_count = len(room.scene_model_states)
            room.objects.clear()
            room.scene_model_states.clear()
            reset_rooms.append({"room": room_name, "cleared_objects": obj_count, "cleared_scene_states": scene_count, "clients": len(room.clients)})
            # 接続中クライアントにリセット通知
            asyncio.create_task(room.broadcast_to_all({"type": "server_reset"}))
        log.info(f"Server reset: {len(reset_rooms)} rooms cleared")
        result = json.dumps({"status": "ok", "rooms": reset_rooms}, ensure_ascii=False).encode()
        return WsResponse(200, "OK", WsHeaders({"Content-Type": "application/json"}), result)
    if request.path == "/debug":
        now = time.time()
        debug_info = {}
        for room_name, room in rooms.items():
            clients_info = {}
            for cid, ws in room.clients.items():
                last_ping = ws_last_app_ping.get(ws, 0)
                dev_info = ws_device_info.get(ws, {})
                clients_info[str(cid)] = {
                    "remote": str(ws.remote_address),
                    "deviceId": dev_info.get("deviceId", ""),
                    "deviceName": dev_info.get("deviceName", ""),
                    "deviceModel": dev_info.get("deviceModel", ""),
                    "androidId": dev_info.get("androidId", ""),
                    "hwSerial": dev_info.get("hwSerial", ""),
                    "connectedVia": dev_info.get("connectedVia", ""),
                    "account": dev_info.get("account", ""),
                    "last_ping_ago_sec": round(now - last_ping, 1) if last_ping else None,
                }
            objects_info = {}
            for oid, obj in room.objects.items():
                objects_info[str(oid)] = {
                    "prefabName": obj.prefab_name,
                    "ownerClientId": obj.owner_client_id,
                    "destroyWhenOwnerLeaves": obj.destroy_when_owner_leaves,
                    "position": obj.position,
                }
            debug_info[room_name] = {
                "clients": clients_info,
                "objects": objects_info,
            }
        body = json.dumps(debug_info, indent=2, ensure_ascii=False).encode()
        return WsResponse(200, "OK", WsHeaders({"Content-Type": "application/json"}), body)
    if request.path == "/viewer":
        html_path = Path(__file__).parent / "webrtc_viewer.html"
        if html_path.exists():
            body = html_path.read_bytes()
            return WsResponse(200, "OK", WsHeaders({"Content-Type": "text/html; charset=utf-8"}), body)
        return WsResponse(404, "Not Found", WsHeaders(), b"webrtc_viewer.html not found")
    # WebSocket Upgrade ヘッダーがない通常HTTPリクエスト（favicon.ico等）は404で返す
    upgrade = request.headers.get("Upgrade", "")
    if upgrade.lower() != "websocket":
        return WsResponse(404, "Not Found", WsHeaders(), b"")
    # WebSocket接続として処理を続行

