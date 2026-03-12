<script setup lang="ts">
import { ref, watch, computed, onMounted, onUnmounted } from 'vue'
import type { Device } from '@/types'

const props = defineProps<{
  stream: MediaStream | null
  deviceId: string
  state: string
  deviceInfo?: Device
}>()

const videoRef = ref<HTMLVideoElement | null>(null)
const videoStatus = ref('waiting')
let healthCheckInterval: ReturnType<typeof setInterval> | null = null

function attachStream(stream: MediaStream | null) {
  const video = videoRef.value
  if (!video || !stream) return

  video.srcObject = stream
  videoStatus.value = `tracks: ${stream.getTracks().length}`

  video.play().then(() => {
    videoStatus.value = `${video.videoWidth}x${video.videoHeight}`
  }).catch((e) => {
    videoStatus.value = `play error: ${e.message}`
  })
}

// 定期ヘルスチェック: 映像が止まっていたら play() を再試行
function startHealthCheck() {
  stopHealthCheck()
  healthCheckInterval = setInterval(() => {
    const video = videoRef.value
    if (!video || !props.stream) return

    // paused状態でストリームがあれば再生を試みる
    if (video.paused && props.stream.active) {
      video.play().catch(() => {})
    }

    // 解像度が取得できたら表示更新
    if (video.videoWidth > 0) {
      videoStatus.value = `${video.videoWidth}x${video.videoHeight}`
    }
  }, 3000)
}

function stopHealthCheck() {
  if (healthCheckInterval) {
    clearInterval(healthCheckInterval)
    healthCheckInterval = null
  }
}

watch(() => props.stream, (stream) => {
  attachStream(stream)
  if (stream) {
    startHealthCheck()
  } else {
    stopHealthCheck()
    videoStatus.value = 'waiting'
  }
})

onMounted(() => {
  if (props.stream) {
    attachStream(props.stream)
    startHealthCheck()
  }
  const video = videoRef.value
  if (video) {
    video.addEventListener('loadedmetadata', () => {
      videoStatus.value = `${video.videoWidth}x${video.videoHeight}`
    })
    video.addEventListener('error', () => {
      videoStatus.value = `error: ${video.error?.message}`
    })
  }
})

onUnmounted(() => {
  stopHealthCheck()
})

// device_id (e.g. "quest3-4-demo3_at_poranos_dot_com") → readable label
function formatDeviceId(deviceId: string): string {
  // Extract "quest3-4" pattern
  const match = deviceId.match(/^(quest\d*)-(\d+)/)
  if (match) {
    return `Quest 3 #${match[2]}`
  }
  return deviceId
}

function stateColor(state: string): string {
  switch (state) {
    case 'connected': return 'var(--success)'
    case 'connecting': return 'var(--warning)'
    case 'failed': return 'var(--danger)'
    default: return 'var(--text-secondary)'
  }
}
</script>

<template>
  <div class="video-card">
    <div class="video-header">
      <div class="device-info-row">
        <span class="device-label">{{ deviceInfo?.serial || formatDeviceId(deviceId) }}</span>
        <span v-if="deviceInfo?.model" class="device-model">{{ deviceInfo.model }}</span>
        <span v-else class="device-model">{{ deviceId }}</span>
      </div>
      <div class="device-status-row">
        <template v-if="deviceInfo">
          <span class="sync-badge" :class="deviceInfo.sync_connected ? 'sync-on' : 'sync-off'">
            Sync: {{ deviceInfo.sync_connected ? 'Connected' : 'Disconnected' }}
          </span>
          <span v-if="deviceInfo.sync_room" class="room-badge">{{ deviceInfo.sync_room }}</span>
        </template>
        <span class="state-dot" :style="{ background: stateColor(state) }"></span>
      </div>
    </div>
    <div class="video-container">
      <div v-if="!stream" class="placeholder">
        <div v-if="state === 'connecting'" style="color: var(--warning)">
          Connecting...
        </div>
        <div v-else-if="state === 'failed'" style="color: var(--danger)">
          Failed
        </div>
        <div v-else style="color: var(--text-secondary)">
          Waiting for stream...
        </div>
      </div>
      <video
        v-show="stream"
        ref="videoRef"
        autoplay
        playsinline
        muted
        class="video-element"
      ></video>
      <div v-if="stream" class="video-overlay">
        {{ videoStatus }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.video-card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
}
.video-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid var(--border);
  font-size: 0.8rem;
  gap: 0.5rem;
}
.device-info-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
}
.device-label {
  font-weight: 500;
  font-family: monospace;
  white-space: nowrap;
}
.device-model {
  color: var(--text-secondary);
  font-size: 0.7rem;
  white-space: nowrap;
}
.device-status-row {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-shrink: 0;
}
.sync-badge {
  font-size: 0.65rem;
  padding: 0.1rem 0.35rem;
  border-radius: 3px;
  white-space: nowrap;
}
.sync-on {
  background: rgba(34, 197, 94, 0.15);
  color: var(--success);
}
.sync-off {
  background: rgba(150, 150, 150, 0.15);
  color: var(--text-secondary);
}
.room-badge {
  font-size: 0.65rem;
  padding: 0.1rem 0.35rem;
  border-radius: 3px;
  background: rgba(59, 130, 246, 0.15);
  color: #3b82f6;
  white-space: nowrap;
  font-family: monospace;
}
.state-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.video-container {
  position: relative;
  background: #000;
  aspect-ratio: 4 / 3;
  overflow: hidden;
}
.placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
}
.video-element {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.video-overlay {
  position: absolute;
  bottom: 0.4rem;
  left: 0.4rem;
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.7);
  background: rgba(0, 0, 0, 0.5);
  padding: 0.15rem 0.4rem;
  border-radius: 3px;
  font-family: monospace;
}
</style>
