"""
Poranos WebSocket Server
Unity (Quest 3) との同期サーバー

機能:
  - ルーム管理（RoomNameが同じクライアントをグループ化）
  - ルームごとのClientID振り出し（1から連番）
  - 参加/退出のブロードキャスト
  - ネットワークオブジェクトの状態管理・同期
  - Transform同期
  - 所有権管理
  - メトリクス収集（/metrics HTTPエンドポイント）

使い方:
    pip install websockets
    python server.py
"""

import asyncio
import os
import logging
import websockets

from server_handler import handler, stale_client_sweep
from server_metrics import handle_metrics_request

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%H:%M:%S",
)
log = logging.getLogger("poranos-ws")

HOST = os.environ.get("PORANOS_HOST", "0.0.0.0")
PORT = int(os.environ.get("PORANOS_PORT", "8765"))


async def main():
    log.info(f"Starting Poranos WS Server on ws://{HOST}:{PORT}")
    log.info(f"Metrics endpoint: http://{HOST}:{PORT}/metrics")
    log.info("Press Ctrl+C to stop")
    async with websockets.serve(
        handler, HOST, PORT,
        process_request=handle_metrics_request,
        ping_interval=10,    # 10秒ごとにWebSocket Pingフレーム送信（dead connection検出用）
        ping_timeout=30,     # 30秒Pong未受信で切断
    ):
        # staleクライアントの定期スイープ（アプリ層ping未受信クライアントを強制退出）
        asyncio.create_task(stale_client_sweep())
        await asyncio.Future()


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        log.info("Server stopped")
