"""
Room management: Room, NetworkObject classes and room-related message handlers.
"""

import asyncio
import json
import logging
import time

log = logging.getLogger("poranos-ws")


class NetworkObject:
    """ネットワーク同期オブジェクトの状態"""

    def __init__(self, object_id: int, prefab_name: str, position: dict, rotation: dict,
                 owner_client_id: int = -1, destroy_when_owner_leaves: bool = True):
        self.object_id = object_id
        self.prefab_name = prefab_name
        self.position = position
        self.rotation = rotation
        self.owner_client_id = owner_client_id
        self.destroy_when_owner_leaves = destroy_when_owner_leaves
        # RealtimeTransform独立所有権（-1=RealtimeViewに従う）
        self.transform_owner_client_id: int = -1
        # componentIndex -> {propertyId -> {value, valueType}}
        self.components: dict[int, dict[int, dict]] = {}

    def to_dict(self) -> dict:
        """room_state送信用のシリアライズ"""
        result = {
            "objectId": self.object_id,
            "prefabName": self.prefab_name,
            "position": self.position,
            "rotation": self.rotation,
            "ownerClientId": self.owner_client_id,
            "destroyWhenOwnerLeaves": self.destroy_when_owner_leaves,
            "transformOwnerClientId": self.transform_owner_client_id,
        }
        if self.components:
            comps = {}
            for comp_idx, props in self.components.items():
                comps[str(comp_idx)] = {
                    str(prop_id): prop_data
                    for prop_id, prop_data in props.items()
                }
            result["components"] = comps
        return result


class Room:
    """ルーム管理。ClientIDをルームごとに1から振り出す。"""

    def __init__(self, name: str):
        self.name = name
        self.next_client_id = 1
        # clientId -> websocket
        self.clients: dict[int, object] = {}
        # objectId -> NetworkObject（動的オブジェクト）
        self.objects: dict[int, NetworkObject] = {}
        # (objectId, componentIndex) -> {propIdStr -> propData}（シーンオブジェクトのモデル状態）
        self.scene_model_states: dict[tuple[int, int], dict] = {}

    def add_client(self, ws) -> int:
        client_id = self.next_client_id
        self.next_client_id += 1
        self.clients[client_id] = ws
        return client_id

    def remove_client(self, client_id: int):
        self.clients.pop(client_id, None)

    def is_empty(self) -> bool:
        return len(self.clients) == 0

    def client_ids(self) -> list[int]:
        return list(self.clients.keys())

    async def broadcast(self, msg: dict, exclude_client_id: int = -1):
        """ルーム内の全クライアントに送信（exclude指定で除外可能）"""
        data = json.dumps(msg)
        tasks = []
        for cid, ws in self.clients.items():
            if cid != exclude_client_id:
                tasks.append(ws.send(data))
        if tasks:
            await asyncio.gather(*tasks, return_exceptions=True)

    async def send_to_client(self, client_id: int, msg: dict) -> bool:
        """特定のクライアントにメッセージを送信。成功時True"""
        ws = self.clients.get(client_id)
        if ws is None:
            return False
        try:
            await ws.send(json.dumps(msg))
            return True
        except Exception as e:
            log.warning(f"  send_to_client failed: clientId={client_id} error={e}")
            return False

    async def broadcast_to_all(self, msg: dict):
        """ルーム内の全クライアントに送信（除外なし）"""
        data = json.dumps(msg)
        cid_ws = list(self.clients.items())
        tasks = [ws.send(data) for _, ws in cid_ws]
        if tasks:
            results = await asyncio.gather(*tasks, return_exceptions=True)
            # remote_command の場合は各クライアントへの送信結果をログ
            if msg.get("type") == "remote_command":
                for (cid, _), result in zip(cid_ws, results):
                    if isinstance(result, Exception):
                        log.warning(f"  remote_command send FAILED to client {cid}: {result}")
                    else:
                        log.info(f"  remote_command sent OK to client {cid}")


# ---------------------------------------------------------------------------
# Module-level shared state
# ---------------------------------------------------------------------------

# roomName -> Room
rooms: dict[str, Room] = {}

# websocket -> (roomName, clientId) のマッピング（切断時のクリーンアップ用）
ws_to_room: dict[object, tuple[str, int]] = {}

# websocket -> 最終アプリレベルping受信時刻（staleクライアント検出用）
ws_last_app_ping: dict[object, float] = {}

# websocket -> デバイス情報（join_roomで送信されたdeviceId/deviceName/deviceModel）
ws_device_info: dict[object, dict] = {}


# ---------------------------------------------------------------------------
# Helper
# ---------------------------------------------------------------------------

def get_room_for_ws(ws) -> tuple:
    """wsからRoom, clientIdを取得。見つからなければ(None, None)"""
    if ws not in ws_to_room:
        return None, None
    room_name, client_id = ws_to_room[ws]
    room = rooms.get(room_name)
    return room, client_id


# ---------------------------------------------------------------------------
# Room handlers
# ---------------------------------------------------------------------------

async def handle_join_room(ws, msg: dict):
    """クライアントをルームに参加させる"""
    room_name = msg.get("roomName", "")
    if not room_name:
        await ws.send(json.dumps({"type": "error", "message": "roomName is required"}))
        return

    # 既にルームに参加中なら先に退出
    if ws in ws_to_room:
        await handle_leave_room(ws)

    # ルーム取得または新規作成
    if room_name not in rooms:
        rooms[room_name] = Room(room_name)
        log.info(f"Room created: '{room_name}'")

    room = rooms[room_name]
    client_id = room.add_client(ws)
    ws_to_room[ws] = (room_name, client_id)

    # デバイス情報を保存
    device_id = msg.get("deviceId", "")
    device_name = msg.get("deviceName", "")
    device_model = msg.get("deviceModel", "")
    android_id = msg.get("androidId", "")
    hw_serial = msg.get("hwSerial", "")
    connected_via = msg.get("connectedVia", "")
    account = msg.get("account", "")
    app_mode = msg.get("app_mode", "")
    if device_id or device_name or connected_via:
        ws_device_info[ws] = {"deviceId": device_id, "deviceName": device_name, "deviceModel": device_model, "androidId": android_id, "hwSerial": hw_serial, "connectedVia": connected_via, "account": account, "app_mode": app_mode}

    log.info(f"  [{room_name}] Client joined: clientId={client_id} device={device_name}({device_model}) hwSerial={hw_serial} via={connected_via} (total={len(room.clients)})")

    # 参加者に応答
    await ws.send(json.dumps({
        "type": "room_joined",
        "roomName": room_name,
        "clientId": client_id,
        "clients": room.client_ids(),
    }))

    # 他のクライアントに通知
    await room.broadcast({
        "type": "client_joined",
        "roomName": room_name,
        "clientId": client_id,
    }, exclude_client_id=client_id)

    # room_state送信（既存オブジェクトの全状態、空でも必ず送信）
    # クライアント側はroom_state受信後にdidConnectToRoomを発火する
    # modelStates: シーンオブジェクトの蓄積モデル状態（途中参加者への同期用）
    model_states = []
    for (obj_id, comp_idx), props in room.scene_model_states.items():
        model_states.append({
            "objectId": obj_id,
            "componentIndex": comp_idx,
            "properties": props,
        })
    await ws.send(json.dumps({
        "type": "room_state",
        "objects": [obj.to_dict() for obj in room.objects.values()],
        "modelStates": model_states,
    }))


async def handle_update_device_info(ws, msg: dict):
    """クライアントのデバイス情報を部分更新（アカウント変更時など）"""
    info = ws_device_info.get(ws)
    if info is None:
        return
    for key in ("account", "app_mode"):
        if key in msg:
            info[key] = msg[key]
    log.info(f"  update_device_info: account={info.get('account', '')} app_mode={info.get('app_mode', '')}")


async def handle_leave_room(ws):
    """クライアントをルームから退出させる"""
    if ws not in ws_to_room:
        return

    room_name, client_id = ws_to_room.pop(ws)
    ws_device_info.pop(ws, None)
    room = rooms.get(room_name)
    if room is None:
        return

    room.remove_client(client_id)
    log.info(f"  [{room_name}] Client left: clientId={client_id} (remaining={len(room.clients)})")

    # destroyWhenOwnerLeaves対象のオブジェクトを削除
    destroyed_ids = []
    for obj_id, obj in list(room.objects.items()):
        if obj.destroy_when_owner_leaves and obj.owner_client_id == client_id:
            destroyed_ids.append(obj_id)
            del room.objects[obj_id]

    # 退出者に応答
    try:
        await ws.send(json.dumps({
            "type": "room_left",
            "roomName": room_name,
        }))
    except Exception:
        pass  # 切断済みの場合は無視

    # 他のクライアントに退出通知
    await room.broadcast({
        "type": "client_left",
        "roomName": room_name,
        "clientId": client_id,
    })

    # 破棄されたオブジェクトを他のクライアントに通知
    for obj_id in destroyed_ids:
        await room.broadcast({
            "type": "object_destroyed",
            "objectId": obj_id,
        })

    # 空になったルームを削除
    if room.is_empty():
        rooms.pop(room_name, None)
        log.info(f"Room deleted: '{room_name}' (empty)")


async def handle_instantiate(ws, msg: dict):
    room, client_id = get_room_for_ws(ws)
    if room is None:
        return

    obj = NetworkObject(
        object_id=msg.get("objectId", 0),
        prefab_name=msg.get("prefabName", ""),
        position=msg.get("position", {"x": 0, "y": 0, "z": 0}),
        rotation=msg.get("rotation", {"x": 0, "y": 0, "z": 0, "w": 1}),
        owner_client_id=msg.get("ownerClientId", -1),
        destroy_when_owner_leaves=msg.get("destroyWhenOwnerLeaves", True),
    )
    room.objects[obj.object_id] = obj
    log.info(f"  [{room.name}] Instantiate: objectId={obj.object_id} prefab={obj.prefab_name} owner={obj.owner_client_id}")

    await room.broadcast({
        "type": "object_instantiated",
        **obj.to_dict(),
    }, exclude_client_id=client_id)


async def handle_model_update(ws, msg: dict):
    room, client_id = get_room_for_ws(ws)
    if room is None:
        return

    object_id = msg.get("objectId", 0)
    comp_idx = msg.get("componentIndex", 0)
    properties = msg.get("properties", {})

    # サーバー側の状態を更新
    obj = room.objects.get(object_id)
    if obj is not None:
        # 動的オブジェクト: NetworkObject内に保存
        if comp_idx not in obj.components:
            obj.components[comp_idx] = {}
        for prop_id_str, prop_data in properties.items():
            try:
                prop_id = int(prop_id_str)
                obj.components[comp_idx][prop_id] = prop_data
            except (ValueError, TypeError):
                pass
    else:
        # シーンオブジェクト（room.objectsに未登録）: scene_model_statesに保存
        key = (object_id, comp_idx)
        if key not in room.scene_model_states:
            room.scene_model_states[key] = {}
        for prop_id_str, prop_data in properties.items():
            room.scene_model_states[key][prop_id_str] = prop_data

    # 他のクライアントに転送
    await room.broadcast({
        "type": "model_updated",
        "objectId": object_id,
        "componentIndex": comp_idx,
        "properties": properties,
    }, exclude_client_id=client_id)


async def handle_destroy(ws, msg: dict):
    room, client_id = get_room_for_ws(ws)
    if room is None:
        return

    object_id = msg.get("objectId", 0)
    room.objects.pop(object_id, None)
    log.info(f"  [{room.name}] Destroy: objectId={object_id}")

    await room.broadcast({
        "type": "object_destroyed",
        "objectId": object_id,
    }, exclude_client_id=client_id)


async def handle_request_ownership(ws, msg: dict):
    room, client_id = get_room_for_ws(ws)
    if room is None:
        return

    object_id = msg.get("objectId", 0)
    owner_client_id = msg.get("ownerClientId", client_id)

    obj = room.objects.get(object_id)
    if obj is not None:
        obj.owner_client_id = owner_client_id

    # 他のクライアントに通知（送信者は既にローカルで設定済み）
    await room.broadcast({
        "type": "ownership_changed",
        "objectId": object_id,
        "ownerClientId": owner_client_id,
    }, exclude_client_id=client_id)


async def handle_clear_ownership(ws, msg: dict):
    room, client_id = get_room_for_ws(ws)
    if room is None:
        return

    object_id = msg.get("objectId", 0)

    obj = room.objects.get(object_id)
    if obj is not None:
        obj.owner_client_id = -1

    await room.broadcast({
        "type": "ownership_changed",
        "objectId": object_id,
        "ownerClientId": -1,
    }, exclude_client_id=client_id)


async def handle_request_transform_ownership(ws, msg: dict):
    room, client_id = get_room_for_ws(ws)
    if room is None:
        return

    object_id = msg.get("objectId", 0)
    owner_client_id = msg.get("ownerClientId", client_id)

    obj = room.objects.get(object_id)
    if obj is not None:
        obj.transform_owner_client_id = owner_client_id

    await room.broadcast({
        "type": "transform_ownership_changed",
        "objectId": object_id,
        "ownerClientId": owner_client_id,
    }, exclude_client_id=client_id)


async def handle_clear_transform_ownership(ws, msg: dict):
    room, client_id = get_room_for_ws(ws)
    if room is None:
        return

    object_id = msg.get("objectId", 0)

    obj = room.objects.get(object_id)
    if obj is not None:
        obj.transform_owner_client_id = -1

    await room.broadcast({
        "type": "transform_ownership_changed",
        "objectId": object_id,
        "ownerClientId": -1,
    }, exclude_client_id=client_id)


async def handle_transform_update(ws, msg: dict):
    room, client_id = get_room_for_ws(ws)
    if room is None:
        return

    object_id = msg.get("objectId", 0)
    position = msg.get("position", {"x": 0, "y": 0, "z": 0})
    rotation = msg.get("rotation", {"x": 0, "y": 0, "z": 0, "w": 1})

    # サーバー側の位置を更新
    obj = room.objects.get(object_id)
    if obj is not None:
        obj.position = position
        obj.rotation = rotation

    # 他のクライアントに転送
    await room.broadcast({
        "type": "transform_updated",
        "objectId": object_id,
        "position": position,
        "rotation": rotation,
    }, exclude_client_id=client_id)
