import { ref, reactive, computed, markRaw, onMounted, onUnmounted } from 'vue'
import type { SignalingDevice, DeviceStream } from '@/types'

const CONNECTING_TIMEOUT_MS = 15000
const DISCONNECT_RETRY_MS = 5000
const FAIL_RETRY_MS = 1000
const MAX_BACKOFF_MS = 30000

/**
 * sync-server (port 8765) のWebRTCシグナリングに直接接続する。
 * 複数デバイスへの自動接続をサポート。
 * デバイスが登録されると自動的にストリームをリクエストする。
 * 接続断/タイムアウト→自動再接続（指数バックオフ）。
 */
export function useSignaling() {
  const availableDevices = ref<SignalingDevice[]>([])
  const streams = reactive<Record<string, DeviceStream>>({})
  const debugLog = ref<string[]>([])
  const wsConnected = ref(false)

  // Internal: keep RTCPeerConnection refs separate (not reactive)
  const peerConnections: Record<string, RTCPeerConnection> = {}
  // Per-device timers
  const deviceReconnectTimers: Record<string, ReturnType<typeof setTimeout>> = {}
  const deviceConnectingTimers: Record<string, ReturnType<typeof setTimeout>> = {}
  const deviceRetryCount: Record<string, number> = {}

  let ws: WebSocket | null = null
  let reconnectTimer: ReturnType<typeof setTimeout> | null = null
  let viewerId: string | null = null
  let destroyed = false

  function log(msg: string) {
    const ts = new Date().toLocaleTimeString()
    debugLog.value = [...debugLog.value.slice(-49), `${ts} ${msg}`]
    console.log(`[Signaling] ${msg}`)
  }

  function syncServerWsUrl(): string {
    const proto = location.protocol === 'https:' ? 'wss:' : 'ws:'
    return `${proto}//${location.hostname}:8765`
  }

  // ── WebSocket ──

  function connect() {
    ws = new WebSocket(syncServerWsUrl())

    ws.onopen = () => {
      log('WS connected, registering as viewer')
      wsConnected.value = true
      ws!.send(JSON.stringify({ type: 'webrtc_register', role: 'viewer' }))
    }

    ws.onclose = () => {
      wsConnected.value = false
      viewerId = null
      cleanupAll()
      if (!destroyed) {
        reconnectTimer = setTimeout(connect, 3000)
      }
    }

    ws.onerror = () => {
      ws?.close()
    }

    ws.onmessage = async (event) => {
      try {
        const msg = JSON.parse(event.data)
        switch (msg.type) {
          case 'webrtc_registered':
            viewerId = msg.viewer_id
            if (msg.devices) {
              updateDevices(msg.devices)
            }
            log(`Registered as ${viewerId}, devices: ${msg.devices?.length ?? 0}`)
            break

          case 'webrtc_device_list':
            updateDevices(msg.devices)
            log(`Device list: ${msg.devices?.length ?? 0} devices`)
            break

          case 'webrtc_offer':
            log(`Offer from ${msg.device_id} (sdp len: ${String(msg.sdp).length})`)
            await handleOffer(msg)
            break

          case 'webrtc_ice_candidate':
            await handleIceCandidate(msg)
            break

          case 'webrtc_device_disconnected':
            log(`Device disconnected: ${msg.device_id}`)
            cancelAllTimers(msg.device_id)
            cleanupDevice(msg.device_id)
            break
        }
      } catch (e: any) {
        log(`WS message error: ${e.message}`)
      }
    }
  }

  // ── デバイス管理 ──

  function updateDevices(devices: SignalingDevice[]) {
    availableDevices.value = devices
    const currentIds = new Set(devices.map(d => d.device_id))

    for (const device of devices) {
      const existing = streams[device.device_id]
      if (!existing) {
        deviceRetryCount[device.device_id] = 0
        requestStream(device.device_id)
      } else if (existing.state === 'disconnected' || existing.state === 'failed') {
        // デバイスリスト更新で再接続（Unityスリープ復帰など）
        deviceRetryCount[device.device_id] = 0
        cancelAllTimers(device.device_id)
        reconnectDevice(device.device_id)
      }
    }

    for (const deviceId of Object.keys(streams)) {
      if (!currentIds.has(deviceId)) {
        cancelAllTimers(deviceId)
        cleanupDevice(deviceId)
      }
    }
  }

  // ── PeerConnection ──

  function createPeerConnection(deviceId: string): RTCPeerConnection {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    })

    pc.onicecandidate = (event) => {
      if (event.candidate && ws?.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({
          type: 'webrtc_ice_candidate',
          device_id: deviceId,
          candidate: event.candidate.toJSON(),
        }))
      }
    }

    pc.ontrack = (event) => {
      const stream = event.streams[0] || new MediaStream([event.track])
      const ds = streams[deviceId]
      if (ds) {
        ds.stream = markRaw(stream)
        ds.state = 'connected'
      }
      deviceRetryCount[deviceId] = 0
      cancelAllTimers(deviceId)
      log(`[${deviceId}] track: ${event.track.kind}, tracks=${stream.getTracks().length}`)
    }

    pc.onconnectionstatechange = () => {
      const state = pc.connectionState
      const ds = streams[deviceId]
      if (ds) {
        if (state === 'connected') {
          ds.state = 'connected'
          deviceRetryCount[deviceId] = 0
          cancelAllTimers(deviceId)
        } else if (state === 'failed') {
          ds.state = 'failed'
          cancelConnectingTimer(deviceId)
          scheduleReconnect(deviceId, FAIL_RETRY_MS)
        } else if (state === 'disconnected') {
          ds.state = 'disconnected'
          cancelConnectingTimer(deviceId)
          scheduleReconnect(deviceId, DISCONNECT_RETRY_MS)
        } else if (state === 'closed') {
          ds.state = 'disconnected'
        }
      }
      log(`[${deviceId}] pc.state: ${state}`)
    }

    return pc
  }

  function requestStream(deviceId: string) {
    log(`Requesting stream: ${deviceId}`)
    const pc = createPeerConnection(deviceId)
    peerConnections[deviceId] = pc
    streams[deviceId] = {
      deviceId,
      stream: null,
      state: 'connecting',
    }
    wsSend({ type: 'webrtc_request_stream', device_id: deviceId })
    // connecting状態が続いたらタイムアウトで再試行
    startConnectingTimer(deviceId)
  }

  // ── タイマー管理 ──

  function startConnectingTimer(deviceId: string) {
    cancelConnectingTimer(deviceId)
    deviceConnectingTimers[deviceId] = setTimeout(() => {
      delete deviceConnectingTimers[deviceId]
      const ds = streams[deviceId]
      if (ds && ds.state === 'connecting') {
        const retries = deviceRetryCount[deviceId] || 0
        log(`[${deviceId}] connecting timeout (${CONNECTING_TIMEOUT_MS}ms), retry #${retries + 1}`)
        deviceRetryCount[deviceId] = retries + 1
        reconnectDevice(deviceId)
      }
    }, CONNECTING_TIMEOUT_MS)
  }

  function cancelConnectingTimer(deviceId: string) {
    if (deviceConnectingTimers[deviceId]) {
      clearTimeout(deviceConnectingTimers[deviceId])
      delete deviceConnectingTimers[deviceId]
    }
  }

  function scheduleReconnect(deviceId: string, baseDelay: number) {
    if (deviceReconnectTimers[deviceId]) return

    const retries = deviceRetryCount[deviceId] || 0
    const delay = Math.min(baseDelay * Math.pow(2, retries), MAX_BACKOFF_MS)

    log(`[${deviceId}] reconnect in ${(delay / 1000).toFixed(1)}s (retry #${retries + 1})`)

    deviceReconnectTimers[deviceId] = setTimeout(() => {
      delete deviceReconnectTimers[deviceId]
      const ds = streams[deviceId]
      if (ds && (ds.state === 'failed' || ds.state === 'disconnected')) {
        const stillAvailable = availableDevices.value.some(d => d.device_id === deviceId)
        if (stillAvailable && ws?.readyState === WebSocket.OPEN) {
          deviceRetryCount[deviceId] = retries + 1
          reconnectDevice(deviceId)
        } else {
          log(`[${deviceId}] skip reconnect (device gone or WS down)`)
        }
      }
    }, delay)
  }

  function cancelAllTimers(deviceId: string) {
    cancelConnectingTimer(deviceId)
    if (deviceReconnectTimers[deviceId]) {
      clearTimeout(deviceReconnectTimers[deviceId])
      delete deviceReconnectTimers[deviceId]
    }
  }

  function reconnectDevice(deviceId: string) {
    log(`Reconnecting: ${deviceId}`)
    cancelAllTimers(deviceId)
    const oldPc = peerConnections[deviceId]
    if (oldPc) {
      oldPc.close()
      delete peerConnections[deviceId]
    }
    const pc = createPeerConnection(deviceId)
    peerConnections[deviceId] = pc
    const ds = streams[deviceId]
    if (ds) {
      ds.stream = null
      ds.state = 'connecting'
    } else {
      streams[deviceId] = { deviceId, stream: null, state: 'connecting' }
    }
    wsSend({ type: 'webrtc_request_stream', device_id: deviceId })
    startConnectingTimer(deviceId)
  }

  // ── シグナリング ──

  function wsSend(msg: object) {
    if (ws?.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(msg))
    } else {
      log(`WS not open (state: ${ws?.readyState}), message dropped: ${(msg as any).type}`)
    }
  }

  async function handleOffer(msg: any) {
    const deviceId = msg.device_id
    if (!deviceId) return

    // オファー受信 → connectingタイマーをキャンセル（通信は来ている）
    cancelConnectingTimer(deviceId)

    let pc = peerConnections[deviceId]
    if (!pc) {
      pc = createPeerConnection(deviceId)
      peerConnections[deviceId] = pc
      streams[deviceId] = { deviceId, stream: null, state: 'connecting' }
    }

    const sdp = typeof msg.sdp === 'string'
      ? { type: 'offer' as RTCSdpType, sdp: msg.sdp }
      : msg.sdp

    try {
      await pc.setRemoteDescription(new RTCSessionDescription(sdp))
      log(`[${deviceId}] setRemoteDescription OK`)
      const answer = await pc.createAnswer()
      await pc.setLocalDescription(answer)
      log(`[${deviceId}] answer sent (len: ${answer.sdp?.length})`)
      wsSend({
        type: 'webrtc_answer',
        device_id: deviceId,
        sdp: answer.sdp,
      })
    } catch (e: any) {
      log(`[${deviceId}] offer error: ${e.message}`)
      // オファー処理失敗 → 再接続スケジュール
      const ds = streams[deviceId]
      if (ds) ds.state = 'failed'
      scheduleReconnect(deviceId, FAIL_RETRY_MS)
    }
  }

  async function handleIceCandidate(msg: any) {
    const deviceId = msg.device_id
    const pc = deviceId ? peerConnections[deviceId] : null
    if (pc && msg.candidate) {
      try {
        await pc.addIceCandidate(new RTCIceCandidate(msg.candidate))
      } catch (e: any) {
        log(`[${deviceId}] ICE error: ${e.message}`)
      }
    }
  }

  // ── クリーンアップ ──

  function cleanupDevice(deviceId: string) {
    cancelAllTimers(deviceId)
    const pc = peerConnections[deviceId]
    if (pc) {
      pc.close()
      delete peerConnections[deviceId]
    }
    delete streams[deviceId]
    delete deviceRetryCount[deviceId]
  }

  function cleanupAll() {
    for (const deviceId of Object.keys(deviceConnectingTimers)) {
      clearTimeout(deviceConnectingTimers[deviceId])
      delete deviceConnectingTimers[deviceId]
    }
    for (const deviceId of Object.keys(deviceReconnectTimers)) {
      clearTimeout(deviceReconnectTimers[deviceId])
      delete deviceReconnectTimers[deviceId]
    }
    for (const deviceId of Object.keys(peerConnections)) {
      peerConnections[deviceId].close()
      delete peerConnections[deviceId]
    }
    for (const deviceId of Object.keys(streams)) {
      delete streams[deviceId]
    }
    for (const deviceId of Object.keys(deviceRetryCount)) {
      delete deviceRetryCount[deviceId]
    }
  }

  function stopStream(deviceId: string) {
    wsSend({ type: 'webrtc_stop_stream', device_id: deviceId })
    cleanupDevice(deviceId)
  }

  function reconnect() {
    log('Manual reconnect requested')
    if (reconnectTimer) {
      clearTimeout(reconnectTimer)
      reconnectTimer = null
    }
    cleanupAll()
    // Prevent onclose from scheduling its own reconnect
    if (ws) {
      ws.onclose = null
      ws.close()
      ws = null
    }
    wsConnected.value = false
    viewerId = null
    connect()
  }

  const activeStreams = computed(() => Object.values(streams))

  /** WebRTCシグナリングを開始（WebRTCモード有効時のみ呼ぶ） */
  function start() {
    if (destroyed) return
    if (!ws || ws.readyState === WebSocket.CLOSED || ws.readyState === WebSocket.CLOSING) {
      connect()
    }
  }

  /** WebRTCシグナリングを停止（scrcpyモード時にQuest負荷を除去） */
  function stop() {
    log('Stopping WebRTC signaling')
    if (reconnectTimer) {
      clearTimeout(reconnectTimer)
      reconnectTimer = null
    }
    cleanupAll()
    if (ws) {
      ws.onclose = null
      ws.close()
      ws = null
    }
    wsConnected.value = false
    viewerId = null
  }

  onUnmounted(() => {
    destroyed = true
    stop()
  })

  return {
    availableDevices,
    streams,
    activeStreams,
    wsConnected,
    stopStream,
    reconnect,
    debugLog,
    start,
    stop,
  }
}
