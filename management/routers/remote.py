import asyncio
import json
import logging

import httpx
import websockets
from fastapi import APIRouter
from pydantic import BaseModel

from config import settings

router = APIRouter()
log = logging.getLogger(__name__)


class RemoteCommand(BaseModel):
    room_name: str = ""
    command: str
    params: dict = {}


async def _resolve_room_name(room_name: str) -> list[str]:
    """room_nameが空または'default'の場合、sync-serverの/debugから全ルーム名を取得。"""
    if room_name and room_name != "default":
        return [room_name]

    try:
        async with httpx.AsyncClient(timeout=3) as client:
            resp = await client.get(f"{settings.sync_server_url}/debug")
            rooms = resp.json()
            if rooms:
                names = list(rooms.keys())
                log.info(f"[remote] auto-resolved rooms: {names}")
                return names
    except Exception as e:
        log.warning(f"[remote] failed to resolve room names: {e}")

    return [room_name or "default"]


@router.post("/command")
async def send_command(cmd: RemoteCommand):
    """Management UIからsync-serverへWebSocket経由でremote_commandを送信。

    短命WebSocket接続でjoinしてbroadcast、即切断。
    room_nameが未指定/'default'の場合はsync-serverの全アクティブルームに送信。
    """
    ws_url = settings.sync_server_url.replace("http://", "ws://").replace("https://", "wss://")
    room_names = await _resolve_room_name(cmd.room_name)

    results = []
    for room_name in room_names:
        try:
            async with websockets.connect(ws_url) as ws:
                # ルームにjoin
                await ws.send(json.dumps({
                    "type": "join_room",
                    "roomName": room_name,
                }))
                # join応答を待つ
                resp = await ws.recv()
                log.info(f"[remote] joined room={room_name}: {resp}")

                # remote_commandをbroadcast
                await ws.send(json.dumps({
                    "type": "remote_command",
                    "command": cmd.command,
                    "params": cmd.params,
                }))
                # broadcast完了のackを待ってから切断
                try:
                    ack = await asyncio.wait_for(ws.recv(), timeout=3.0)
                    log.info(f"[remote] command={cmd.command} room={room_name} (ack received)")
                except Exception:
                    log.warning(f"[remote] command={cmd.command} room={room_name} (no ack, broadcast may have failed)")

            results.append({"ok": True, "room_name": room_name})
        except Exception as e:
            log.error(f"[remote] error for room={room_name}: {e}")
            results.append({"ok": False, "room_name": room_name, "error": str(e)})

    return {
        "ok": all(r["ok"] for r in results),
        "command": cmd.command,
        "rooms": results,
    }
