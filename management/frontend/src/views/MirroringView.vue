<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import VideoPlayer from '@/components/mirroring/VideoPlayer.vue'
import ScrcpyPlayer from '@/components/mirroring/ScrcpyPlayer.vue'
import { useSignaling } from '@/composables/useSignaling'
import { useI18n } from '@/i18n'
import type { Device } from '@/types'

const { t } = useI18n()
const {
  activeStreams,
  availableDevices,
  wsConnected,
  reconnect,
  debugLog,
  start: startWebRTC,
  stop: stopWebRTC,
} = useSignaling()

// ミラーリングモード: 'native' | 'webrtc'
const mirrorMode = ref<'native' | 'webrtc'>('native')

// WebRTCモード切り替え時に接続を制御
watch(mirrorMode, (mode, oldMode) => {
  if (mode === 'webrtc') {
    startWebRTC()
  } else if (oldMode === 'webrtc') {
    stopWebRTC()
  }
})

// デバイス情報を定期取得
const devices = ref<Device[]>([])
const devicesLoaded = ref(false)
let devicePollTimer: ReturnType<typeof setInterval> | null = null

async function fetchDevices(useCached = false) {
  try {
    const url = useCached ? '/api/devices/cached' : '/api/devices'
    const resp = await fetch(url)
    const data = await resp.json()
    devices.value = data.devices || []
  } catch { /* ignore */ }
  devicesLoaded.value = true
}

// SignalingDevice の client_id + room_name → Device のマッピング
function getDeviceInfo(deviceId: string): Device | undefined {
  const sig = availableDevices.value.find(d => d.device_id === deviceId)
  if (!sig) return undefined
  return devices.value.find(
    d => d.sync_room === sig.room_name && d.sync_client_id === sig.client_id
  )
}

onMounted(async () => {
  // キャッシュから即座にデバイス一覧を取得（ADB問い合わせなし）
  await fetchDevices(true)
  // バックグラウンドでフレッシュデータを取得
  fetchDevices()
  devicePollTimer = setInterval(fetchDevices, 5000)
})

onUnmounted(() => {
  if (devicePollTimer) clearInterval(devicePollTimer)
})
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-1">
      <h1 class="page-title" style="margin-bottom: 0">{{ t('mirroring.title') }}</h1>
      <div class="header-actions">
        <div class="mode-toggle">
          <button
            class="btn btn-sm"
            :class="{ active: mirrorMode === 'native' }"
            @click="mirrorMode = 'native'"
          >{{ t('mirroring.native') }}</button>
          <button
            class="btn btn-sm"
            :class="{ active: mirrorMode === 'webrtc' }"
            @click="mirrorMode = 'webrtc'"
          >{{ t('mirroring.webrtc') }}</button>
        </div>
        <button
          v-if="mirrorMode === 'webrtc'"
          class="btn btn-sm"
          @click="reconnect"
          :disabled="!wsConnected"
        >{{ t('mirroring.reconnect') }}</button>
      </div>
    </div>

    <!-- Native scrcpy mode: WebSocket + WebCodecs -->
    <template v-if="mirrorMode === 'native'">
      <div v-if="devices.length === 0" class="card">
        <div style="color: var(--text-secondary); padding: 0.5rem 0; text-align: center">
          <template v-if="!devicesLoaded">{{ t('mirroring.connecting') }}</template>
          <template v-else>{{ t('mirroring.noDevices') }}</template>
        </div>
      </div>

      <div v-else class="video-grid">
        <ScrcpyPlayer
          v-for="device in devices"
          :key="device.serial"
          :device="device"
        />
      </div>
    </template>

    <!-- WebRTC mode: existing implementation -->
    <template v-if="mirrorMode === 'webrtc'">
      <div v-if="activeStreams.length === 0" class="card">
        <div style="color: var(--text-secondary); padding: 0.5rem 0; text-align: center">
          <template v-if="!wsConnected">{{ t('mirroring.connectingSync') }}</template>
          <template v-else>{{ t('mirroring.noStreaming') }}</template>
        </div>
      </div>

      <div v-else class="video-grid">
        <VideoPlayer
          v-for="ds in activeStreams"
          :key="ds.deviceId"
          :stream="ds.stream"
          :device-id="ds.deviceId"
          :state="ds.state"
          :device-info="getDeviceInfo(ds.deviceId)"
        />
      </div>

      <div class="card mt-1" style="font-family: monospace; font-size: 0.75rem">
        <div class="card-title">{{ t('mirroring.debugLog') }}</div>
        <div style="max-height: 200px; overflow-y: auto; white-space: pre-wrap; color: var(--text-secondary)">
          <div v-for="(line, i) in debugLog" :key="i">{{ line }}</div>
          <div v-if="debugLog.length === 0">{{ t('mirroring.noEvents') }}</div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.header-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.mode-toggle {
  display: flex;
  gap: 2px;
  background: var(--border);
  border-radius: var(--radius);
  padding: 2px;
}
.mode-toggle .btn {
  border: none;
  background: transparent;
  color: var(--text-secondary);
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: calc(var(--radius) - 2px);
}
.mode-toggle .btn.active {
  background: var(--card-bg);
  color: var(--text);
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}
.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 1rem;
}
</style>
