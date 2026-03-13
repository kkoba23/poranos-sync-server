#!/bin/bash
# Build Poranos Management Electron App
# Usage: bash build.sh [frontend|backend|sync-server|electron|all]
#
# Prerequisites:
#   - Node.js (npm)
#   - Python 3.13+ with pip
#   - PyInstaller: pip install pyinstaller
#
# Output:
#   dist-pyinstaller/backend/      - Management backend (FastAPI)
#   dist-pyinstaller/sync-server/  - Sync server (WebSocket)
#   dist-electron/                 - Electron installer/portable exe

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

# Cross-platform npm command
if [[ "$(uname)" == "Darwin" ]]; then
    NPM_CMD="npm"
else
    NPM_CMD="/c/nvm4w/nodejs/npm.cmd"
fi
SERVER_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

step_frontend() {
    echo "=== Build Vue.js frontend ==="
    cd "$SCRIPT_DIR/frontend"
    "$NPM_CMD" install
    "$NPM_CMD" run build
    echo "Frontend built to frontend/dist/"
    cd "$SCRIPT_DIR"
}

step_backend() {
    echo "=== Build Management backend (PyInstaller) ==="
    cd "$SCRIPT_DIR"

    if ! command -v pyinstaller &> /dev/null; then
        echo "PyInstaller not found. Installing..."
        pip install pyinstaller
    fi

    pyinstaller backend.spec \
        --distpath dist-pyinstaller \
        --workpath build/pyinstaller-backend \
        --noconfirm

    echo "Backend built to dist-pyinstaller/backend/"
}

step_sync_server() {
    echo "=== Build Sync Server (PyInstaller) ==="
    cd "$SERVER_DIR"

    if ! command -v pyinstaller &> /dev/null; then
        echo "PyInstaller not found. Installing..."
        pip install pyinstaller
    fi

    pyinstaller sync-server.spec \
        --distpath "$SCRIPT_DIR/dist-pyinstaller" \
        --workpath "$SCRIPT_DIR/build/pyinstaller-sync" \
        --noconfirm

    echo "Sync server built to dist-pyinstaller/sync-server/"
    cd "$SCRIPT_DIR"
}

step_electron() {
    echo "=== Build Electron app ==="
    cd "$SCRIPT_DIR/electron"
    "$NPM_CMD" install
    "$NPM_CMD" run dist
    echo "Electron app built to dist-electron/"
    cd "$SCRIPT_DIR"
}

case "${1:-all}" in
    frontend)
        step_frontend
        ;;
    backend)
        step_backend
        ;;
    sync-server)
        step_sync_server
        ;;
    electron)
        step_electron
        ;;
    all)
        step_frontend
        step_backend
        step_sync_server
        step_electron
        echo ""
        echo "=== Build complete ==="
        echo "Output: dist-electron/"
        ls -la dist-electron/*.exe 2>/dev/null || echo "(Check dist-electron/ for output files)"
        ;;
    *)
        echo "Usage: bash build.sh [frontend|backend|sync-server|electron|all]"
        exit 1
        ;;
esac
