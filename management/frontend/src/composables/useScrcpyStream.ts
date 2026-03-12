/**
 * useScrcpyStream: WebSocket 経由で scrcpy H.264 ストリームを受信し、
 * WebCodecs VideoDecoder でデコードして canvas に描画する composable。
 *
 * プロトコル:
 *   初回 12 bytes: codec_id(4) + width(4) + height(4)  [big-endian]
 *   以降 binary frames: flags(1) + packet_size(4) + data(N)
 *     flags: bit0=CONFIG(SPS/PPS), bit1=KEYFRAME
 */
import { ref, onUnmounted } from 'vue'

export interface ScrcpyStreamState {
  connected: boolean
  width: number
  height: number
  error: string | null
  fps: number
}

export function useScrcpyStream() {
  const state = ref<ScrcpyStreamState>({
    connected: false,
    width: 0,
    height: 0,
    error: null,
    fps: 0,
  })

  let ws: WebSocket | null = null
  let decoder: VideoDecoder | null = null
  let canvas: HTMLCanvasElement | null = null
  let ctx: CanvasRenderingContext2D | null = null
  let spsData: Uint8Array | null = null  // SPS/PPS in Annex B format
  let gotFirstKeyframe = false
  let frameCount = 0
  let fpsTimer: ReturnType<typeof setInterval> | null = null
  let timestampCounter = 0
  let retryTimer: ReturnType<typeof setTimeout> | null = null
  let retryCount = 0
  let currentSerial: string | null = null
  let currentMaxSize = 640
  let intentionalDisconnect = false
  let pendingFrame: VideoFrame | null = null
  let rafId: number | null = null

  function connect(serial: string, canvasEl: HTMLCanvasElement, maxSize: number = 640) {
    intentionalDisconnect = false
    disconnect()
    intentionalDisconnect = false  // reset after disconnect sets it
    currentSerial = serial
    currentMaxSize = maxSize
    canvas = canvasEl
    ctx = canvas.getContext('2d')
    retryCount = 0
    connectInternal(serial, maxSize)
  }

  function connectInternal(serial: string, maxSize: number) {
    state.value = { connected: false, width: 0, height: 0, error: null, fps: 0 }
    gotFirstKeyframe = false
    spsData = null
    frameCount = 0
    timestampCounter = 0

    // FPS counter
    if (fpsTimer) clearInterval(fpsTimer)
    fpsTimer = setInterval(() => {
      state.value.fps = frameCount
      frameCount = 0
    }, 1000)

    const wsUrl = `${location.protocol === 'https:' ? 'wss:' : 'ws:'}//${location.host}/api/mirror/stream/${serial}?max_size=${maxSize}`
    ws = new WebSocket(wsUrl)
    ws.binaryType = 'arraybuffer'

    let metaReceived = false

    ws.onopen = () => {
      state.value.connected = true
      retryCount = 0
      console.log(`[ScrcpyStream] Connected: ${serial}`)
    }

    ws.onmessage = (event: MessageEvent) => {
      const data = event.data as ArrayBuffer
      if (data.byteLength === 0) return // keepalive

      if (!metaReceived) {
        // 初回: codec meta (12 bytes)
        if (data.byteLength >= 12) {
          const view = new DataView(data)
          const codecId = view.getUint32(0)
          const width = view.getUint32(4)
          const height = view.getUint32(8)
          state.value.width = width
          state.value.height = height

          console.log(`[ScrcpyStream] Codec: 0x${codecId.toString(16)}, Size: ${width}x${height}`)

          // canvas サイズを左目（ステレオ左半分）に合わせる
          canvas!.width = Math.floor(width / 2)
          canvas!.height = height

          // デコーダー初期化
          initDecoder(codecId)
          metaReceived = true
        }
        return
      }

      // H.264 パケット: flags(1) + size(4) + data
      if (data.byteLength < 5) return
      const view = new DataView(data)
      const flags = view.getUint8(0)
      const packetSize = view.getUint32(1)
      if (data.byteLength < 5 + packetSize) return
      const packetData = new Uint8Array(data, 5, packetSize)

      const isConfig = (flags & 0x01) !== 0
      const isKeyframe = (flags & 0x02) !== 0

      if (isConfig) {
        // SPS/PPS in Annex B format — save for prepending to keyframes
        spsData = new Uint8Array(packetData)
        console.log(`[ScrcpyStream] SPS/PPS received: ${spsData.length} bytes, first bytes:`, Array.from(spsData.slice(0, 16)).map(b => b.toString(16).padStart(2, '0')).join(' '))
        return
      }

      if (!decoder || decoder.state !== 'configured') {
        if (frameCount === 0) console.warn(`[ScrcpyStream] Decoder not ready: state=${decoder?.state}`)
        return
      }

      // 最初の数パケットをログ
      if (frameCount < 3) {
        console.log(`[ScrcpyStream] Packet: config=${isConfig} key=${isKeyframe} size=${packetSize} first bytes:`, Array.from(packetData.slice(0, 8)).map(b => b.toString(16).padStart(2, '0')).join(' '))
      }

      // 最初のキーフレーム（+SPS/PPS）が来るまでスキップ
      if (!gotFirstKeyframe) {
        if (!isKeyframe || !spsData) {
          if (frameCount === 0) console.log(`[ScrcpyStream] Waiting for keyframe+SPS (key=${isKeyframe}, hasSPS=${!!spsData})`)
          return
        }
        gotFirstKeyframe = true
        console.log(`[ScrcpyStream] First keyframe! Decoding starts`)
      }

      try {
        // キーフレームには SPS/PPS を先頭に結合（Annex B形式のまま）
        let frameData: Uint8Array
        if (isKeyframe && spsData) {
          frameData = new Uint8Array(spsData.length + packetData.length)
          frameData.set(spsData, 0)
          frameData.set(packetData, spsData.length)
        } else {
          frameData = packetData
        }

        const chunk = new EncodedVideoChunk({
          type: isKeyframe ? 'key' : 'delta',
          timestamp: timestampCounter,
          data: frameData,
        })
        timestampCounter += 33333 // ~30fps in microseconds
        decoder.decode(chunk)
        frameCount++
      } catch (e) {
        console.error('[ScrcpyStream] Decode error:', e)
      }
    }

    ws.onerror = () => {
      // error is followed by close, retry logic is in onclose
    }

    ws.onclose = (event: CloseEvent) => {
      state.value.connected = false
      console.log(`[ScrcpyStream] Disconnected: ${serial} (code=${event.code})`)

      // 自動リトライ（意図的な切断でなければ）
      if (!intentionalDisconnect && currentSerial && canvas) {
        const maxRetries = 10
        if (retryCount < maxRetries) {
          retryCount++
          // 1013 (Try Again Later) = サーバー側クールダウン中 → 長めの間隔で待つ
          const baseDelay = event.code === 1013 ? 15000 : 2000 * retryCount
          const delay = Math.min(baseDelay, 30000)
          console.log(`[ScrcpyStream] Retry ${retryCount}/${maxRetries} in ${delay}ms...`)
          state.value.error = null // エラーを表示せずConnecting...を維持
          retryTimer = setTimeout(() => {
            if (!intentionalDisconnect && currentSerial && canvas) {
              connectInternal(currentSerial, currentMaxSize)
            }
          }, delay)
        } else {
          state.value.error = 'Connection failed after retries'
        }
      }
    }
  }

  function initDecoder(codecId: number) {
    if (decoder && decoder.state !== 'closed') {
      decoder.close()
    }

    // codec string: h264 → High Profile Level 4.1, h265 → Main Profile
    const codec = codecId === 0x68323634 ? 'avc1.640029' : 'hev1.1.6.L120.90'

    decoder = new VideoDecoder({
      output: (frame: VideoFrame) => {
        if (pendingFrame) {
          pendingFrame.close()
        }
        pendingFrame = frame
      },
      error: (e: DOMException) => {
        console.error('[ScrcpyDecoder] error:', e)
        state.value.error = e.message
      },
    })

    // description なしで configure — SPS/PPS はフレームデータに含める
    decoder.configure({
      codec,
      optimizeForLatency: true,
    })
    console.log(`[ScrcpyStream] Decoder configured: ${codec}`)

    // 描画ループ開始
    startRenderLoop()
  }

  function startRenderLoop() {
    if (rafId !== null) return
    function render() {
      if (pendingFrame && ctx && canvas) {
        const frame = pendingFrame
        pendingFrame = null
        // ステレオ映像の左半分（左目）だけをcanvasに描画
        const srcW = frame.displayWidth / 2
        const srcH = frame.displayHeight
        if (canvas!.width !== srcW || canvas!.height !== srcH) {
          canvas!.width = srcW
          canvas!.height = srcH
        }
        ctx!.drawImage(frame, 0, 0, srcW, srcH, 0, 0, srcW, srcH)
        frame.close()
      }
      rafId = requestAnimationFrame(render)
    }
    rafId = requestAnimationFrame(render)
  }

  function stopRenderLoop() {
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
    if (pendingFrame) {
      pendingFrame.close()
      pendingFrame = null
    }
  }

  function disconnect() {
    intentionalDisconnect = true
    stopRenderLoop()
    if (retryTimer) {
      clearTimeout(retryTimer)
      retryTimer = null
    }
    if (fpsTimer) {
      clearInterval(fpsTimer)
      fpsTimer = null
    }
    if (ws) {
      ws.onmessage = null
      ws.onerror = null
      ws.onclose = null
      ws.close()
      ws = null
    }
    if (decoder && decoder.state !== 'closed') {
      try {
        decoder.close()
      } catch {}
    }
    decoder = null
    canvas = null
    ctx = null
    spsData = null
    gotFirstKeyframe = false
    currentSerial = null
    retryCount = 0
    state.value = { connected: false, width: 0, height: 0, error: null, fps: 0 }
  }

  onUnmounted(() => {
    disconnect()
  })

  return { state, connect, disconnect }
}
