#!/bin/bash
# =============================================================================
# Poranos Desktop デプロイスクリプト (Docker版)
#
# sync serverはDockerコンテナ `poranos-desktop-sync` で動作。
# ホスト上で直接pythonを起動しないこと（ポート競合の原因になる）。
#
# 使い方:
#   bash Server/deploy.sh          # フルデプロイ（初回）
#   bash Server/deploy.sh update   # ファイル更新＋再起動
#   bash Server/deploy.sh start    # サーバー起動
#   bash Server/deploy.sh stop     # サーバー停止
#   bash Server/deploy.sh restart  # サーバー再起動
#   bash Server/deploy.sh status   # サーバー状態確認
#   bash Server/deploy.sh logs     # ログ表示（直近50行）
# =============================================================================

set -e

# --- 設定 ---
REMOTE_USER="smacan"
REMOTE_HOST="192.168.8.10"
REMOTE_PORT=8765
SSH_TARGET="${REMOTE_USER}@${REMOTE_HOST}"
CONTAINER_NAME="poranos-desktop-sync"
# ホスト上のステージングディレクトリ（SCPでファイルを送り、docker cpでコンテナにコピー）
STAGING_DIR="C:/Services/poranos-desktop"

# ローカルのServerディレクトリ
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# サーバーファイル一覧
SERVER_FILES=(
    "server.py"
    "server_handler.py"
    "server_room.py"
    "server_metrics.py"
    "server_webrtc.py"
    "requirements.txt"
)

# --- ヘルパー ---
SSH_CMD="/c/WINDOWS/System32/OpenSSH/ssh.exe"
SCP_CMD="/c/WINDOWS/System32/OpenSSH/scp.exe"

ssh_run() {
    "${SSH_CMD}" -o ConnectTimeout=10 "${SSH_TARGET}" "$@"
}

scp_file() {
    "${SCP_CMD}" -o ConnectTimeout=10 "$1" "${SSH_TARGET}:${STAGING_DIR}/"
}

# ステージング → Dockerコンテナにコピー
docker_cp() {
    local filename="$1"
    ssh_run "docker cp ${STAGING_DIR}/${filename} ${CONTAINER_NAME}:/app/${filename}"
}

# Dockerコンテナ操作
docker_start() {
    ssh_run "docker start ${CONTAINER_NAME}"
}

docker_stop() {
    ssh_run "docker stop ${CONTAINER_NAME}"
}

docker_restart() {
    ssh_run "docker restart ${CONTAINER_NAME}"
}

docker_status() {
    ssh_run "docker inspect -f '{{.State.Status}}' ${CONTAINER_NAME} 2>nul"
}

echo "=== Poranos Desktop (Docker) ==="
echo "Target: ${SSH_TARGET}  Container: ${CONTAINER_NAME}"
echo ""

# --- コマンド分岐 ---
CMD="${1:-deploy}"

case "$CMD" in

# ----- 状態確認 -----
status)
    echo "[status] コンテナ状態..."
    STATUS=$(docker_status 2>/dev/null || echo "not found")
    echo "  Container: ${STATUS}"
    if [ "$STATUS" = "running" ]; then
        echo "  Port: ${REMOTE_PORT}"
        ssh_run "netstat -ano | findstr :${REMOTE_PORT} | findstr LISTENING" 2>/dev/null || echo "  (ポートLISTENなし)"
    fi
    ;;

# ----- ログ表示 -----
logs)
    echo "[logs] 直近のログ..."
    ssh_run "docker logs ${CONTAINER_NAME} --tail 50"
    ;;

# ----- 起動 -----
start)
    echo "[start] コンテナ起動..."
    docker_start
    sleep 2
    echo "  Status: $(docker_status)"
    ;;

# ----- 停止 -----
stop)
    echo "[stop] コンテナ停止..."
    docker_stop
    echo "Done."
    ;;

# ----- 再起動 -----
restart)
    echo "[restart] コンテナ再起動..."
    docker_restart
    sleep 2
    echo "  Status: $(docker_status)"
    ;;

# ----- ファイル更新＋再起動 -----
update)
    echo "[1/3] ファイル転送 (SCP → ステージング)..."
    for f in "${SERVER_FILES[@]}"; do
        if [ -f "${SCRIPT_DIR}/${f}" ]; then
            scp_file "${SCRIPT_DIR}/${f}"
            echo "  ${f}"
        fi
    done
    # webrtc_viewer.htmlも転送（存在する場合）
    if [ -f "${SCRIPT_DIR}/webrtc_viewer.html" ]; then
        scp_file "${SCRIPT_DIR}/webrtc_viewer.html"
        echo "  webrtc_viewer.html"
    fi

    echo "[2/3] ステージング → Dockerコンテナにコピー..."
    for f in "${SERVER_FILES[@]}"; do
        if [ -f "${SCRIPT_DIR}/${f}" ]; then
            docker_cp "${f}"
        fi
    done
    if [ -f "${SCRIPT_DIR}/webrtc_viewer.html" ]; then
        docker_cp "webrtc_viewer.html"
    fi
    echo "  コピー完了"

    echo "[3/3] コンテナ再起動..."
    docker_restart
    sleep 2
    echo "  Status: $(docker_status)"

    echo ""
    echo "=== Update complete ==="
    ;;

# ----- フルデプロイ（初回） -----
deploy)
    echo "[1/3] ステージングディレクトリ作成..."
    ssh_run "mkdir ${STAGING_DIR} 2>nul & echo ok"

    echo "[2/3] ファイル転送..."
    for f in "${SERVER_FILES[@]}"; do
        if [ -f "${SCRIPT_DIR}/${f}" ]; then
            scp_file "${SCRIPT_DIR}/${f}"
            echo "  ${f}"
        fi
    done
    if [ -f "${SCRIPT_DIR}/webrtc_viewer.html" ]; then
        scp_file "${SCRIPT_DIR}/webrtc_viewer.html"
        echo "  webrtc_viewer.html"
    fi

    echo "[3/3] Dockerコンテナにコピー＋再起動..."
    for f in "${SERVER_FILES[@]}"; do
        if [ -f "${SCRIPT_DIR}/${f}" ]; then
            docker_cp "${f}"
        fi
    done
    if [ -f "${SCRIPT_DIR}/webrtc_viewer.html" ]; then
        docker_cp "webrtc_viewer.html"
    fi
    docker_restart
    sleep 2

    echo ""
    echo "=== Deploy complete ==="
    echo ""
    echo "Container: ${CONTAINER_NAME} ($(docker_status))"
    echo "接続先: ws://${REMOTE_HOST}:${REMOTE_PORT}"
    echo ""
    echo "管理コマンド:"
    echo "  bash Server/deploy.sh status   # 状態確認"
    echo "  bash Server/deploy.sh logs     # ログ確認"
    echo "  bash Server/deploy.sh update   # 更新＋再起動"
    echo "  bash Server/deploy.sh restart  # 再起動"
    echo "  bash Server/deploy.sh stop     # 停止"
    ;;

*)
    echo "使い方: bash Server/deploy.sh [deploy|update|start|stop|restart|status|logs]"
    exit 1
    ;;
esac
