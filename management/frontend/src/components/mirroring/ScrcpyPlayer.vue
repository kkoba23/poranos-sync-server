<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useScrcpyStream } from '@/composables/useScrcpyStream'
import ConfirmModal from '@/components/ConfirmModal.vue'
import type { Device } from '@/types'

const props = withDefaults(defineProps<{
  device: Device
  compact?: boolean
}>(), {
  compact: false
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
const { state, connect, disconnect } = useScrcpyStream()
const isFullscreen = ref(false)
const showDeviceInfo = ref(false)

function batteryColor(level?: number): string {
  if (!level) return 'var(--text-secondary)'
  if (level > 50) return 'var(--success)'
  if (level > 20) return 'var(--warning)'
  return 'var(--danger)'
}

const syncViaLabel = computed(() => {
  const via = props.device.sync_connected_via || ''
  return via.includes('localhost') ? 'adb reverse' : 'WiFi direct'
})

// 音量制御
const localVolume = ref(props.device.volume_music ?? 0)
let volumeTimeout: ReturnType<typeof setTimeout> | null = null

watch(() => props.device.volume_music, (v) => {
  if (v != null && !volumeTimeout) {
    localVolume.value = v
  }
})

function onVolumeInput(e: Event) {
  const val = parseInt((e.target as HTMLInputElement).value)
  localVolume.value = val
  if (volumeTimeout) clearTimeout(volumeTimeout)
  volumeTimeout = setTimeout(() => {
    sendVolume(val)
    volumeTimeout = null
  }, 300)
}

async function sendVolume(volume: number) {
  const serial = props.device.adb_serial || props.device.serial
  try {
    await fetch(`/api/devices/${encodeURIComponent(serial)}/volume`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ volume }),
    })
  } catch { /* ignore */ }
}

async function launchApp() {
  const serial = props.device.adb_serial || props.device.serial
  try {
    await fetch(`/api/devices/${encodeURIComponent(serial)}/launch`, { method: 'POST' })
  } catch { /* ignore */ }
}

async function stopApp() {
  const serial = props.device.adb_serial || props.device.serial
  try {
    await fetch(`/api/devices/${encodeURIComponent(serial)}/stop`, { method: 'POST' })
  } catch { /* ignore */ }
}

async function toggleSleep() {
  const serial = props.device.adb_serial || props.device.serial
  const action = props.device.wakefulness === 'Awake' ? 'sleep' : 'wake'
  try {
    await fetch(`/api/devices/${encodeURIComponent(serial)}/${action}`, { method: 'POST' })
  } catch { /* ignore */ }
}

async function sendMenu() {
  const serial = props.device.adb_serial || props.device.serial
  try {
    await fetch(`/api/devices/${encodeURIComponent(serial)}/menu`, { method: 'POST' })
  } catch { /* ignore */ }
}

const showRebootConfirm = ref(false)

async function rebootDevice() {
  const serial = props.device.adb_serial || props.device.serial
  try {
    await fetch(`/api/devices/${encodeURIComponent(serial)}/reboot`, { method: 'POST' })
  } catch { /* ignore */ }
}

// adb_serial があればそちらを使う（Wi-Fi含む）
const streamSerial = () => props.device.adb_serial || props.device.serial

function toggleFullscreen() {
  isFullscreen.value = !isFullscreen.value
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isFullscreen.value) {
    isFullscreen.value = false
  }
}

onMounted(() => {
  if (canvasRef.value) {
    connect(streamSerial(), canvasRef.value)
  }
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  disconnect()
  window.removeEventListener('keydown', onKeydown)
})

// デバイスが変わったら再接続
watch(() => props.device.serial, () => {
  if (canvasRef.value) {
    connect(streamSerial(), canvasRef.value)
  }
})
</script>

<template>
  <div class="scrcpy-card" :class="{ fullscreen: isFullscreen }">
    <div class="scrcpy-header">
      <span class="device-label">{{ device.serial }}</span>
      <!-- WiFi icon -->
      <svg v-if="device.connection_type === 'wifi'" class="wifi-icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
      </svg>
      <span v-if="state.connected" class="status-dot connected"></span>
      <span v-else class="status-dot"></span>

      <div class="header-spacer"></div>

      <!-- Launch/Stop -->
      <button
        v-if="!device.app_running"
        class="btn btn-success btn-xs"
        :disabled="!device.app_installed || device.status !== 'device'"
        @click="launchApp"
      >Launch</button>
      <button
        v-else
        class="btn btn-danger btn-xs"
        :disabled="device.status !== 'device'"
        @click="stopApp"
      >Stop</button>

      <!-- Volume -->
      <div class="header-volume" v-if="device.volume_music != null">
        <input
          type="range"
          class="volume-slider"
          :min="0"
          :max="device.volume_max ?? 15"
          :value="localVolume"
          :disabled="device.status !== 'device'"
          @input="onVolumeInput"
        />
        <span class="volume-value">{{ localVolume }}</span>
      </div>

      <!-- Fullscreen -->
      <button class="fullscreen-btn" @click="toggleFullscreen" :title="isFullscreen ? 'Exit fullscreen' : 'Fullscreen'">
        <svg v-if="!isFullscreen" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 3 21 3 21 9"></polyline>
          <polyline points="9 21 3 21 3 15"></polyline>
          <line x1="21" y1="3" x2="14" y2="10"></line>
          <line x1="3" y1="21" x2="10" y2="14"></line>
        </svg>
        <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="4 14 10 14 10 20"></polyline>
          <polyline points="20 10 14 10 14 4"></polyline>
          <line x1="14" y1="10" x2="21" y2="3"></line>
          <line x1="3" y1="21" x2="10" y2="14"></line>
        </svg>
      </button>
    </div>
    <div class="scrcpy-video">
      <canvas ref="canvasRef" class="scrcpy-canvas"></canvas>
      <div v-if="state.error" class="error-overlay">{{ state.error }}</div>
      <div v-else-if="!state.connected" class="loading-overlay">Connecting...</div>

      <!-- Device info overlay -->
      <div class="device-info-overlay" :class="{ open: showDeviceInfo }">
        <div class="info-row">
          <span class="info-label">Battery</span>
          <span class="info-value" :style="{ color: batteryColor(device.battery_level) }">
            {{ device.battery_level != null ? `${device.battery_level}%` : '—' }}
          </span>
        </div>
        <div class="info-row" v-if="device.controller_left_battery != null || device.controller_right_battery != null">
          <span class="info-label">Controllers</span>
          <span class="info-value controller-batteries">
            <span v-if="device.controller_left_battery != null" :style="{ color: batteryColor(device.controller_left_battery) }">
              L:{{ device.controller_left_battery }}%
            </span>
            <span v-if="device.controller_right_battery != null" :style="{ color: batteryColor(device.controller_right_battery) }">
              R:{{ device.controller_right_battery }}%
            </span>
          </span>
        </div>
        <div class="info-row" v-if="device.wifi_ssid">
          <span class="info-label">WiFi</span>
          <span class="info-value">{{ device.wifi_ssid }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Provisioned</span>
          <span class="info-value" :style="{ color: device.provisioned ? 'var(--success)' : 'var(--danger)' }">
            {{ device.provisioned ? 'Yes' : 'No' }}
          </span>
        </div>
        <div class="info-row">
          <span class="info-label">App</span>
          <span class="info-value" :style="{ color: device.app_running ? 'var(--success)' : 'var(--text-secondary)' }">
            {{ device.app_running ? 'Running' : device.app_installed ? 'Stopped' : 'Not installed' }}
            <template v-if="device.app_installed && device.app_version"> v{{ device.app_version }}</template>
          </span>
        </div>
        <div class="info-row" v-if="device.wakefulness">
          <span class="info-label">Headset</span>
          <span class="info-value" :style="{ color: device.wakefulness === 'Awake' ? 'var(--success)' : 'var(--text-secondary)' }">
            {{ device.wakefulness }}
            <button
              class="sleep-btn"
              :disabled="device.status !== 'device'"
              @click="toggleSleep"
            >{{ device.wakefulness === 'Awake' ? 'Sleep' : 'Awake' }}</button>
          </span>
        </div>
        <div class="info-row">
          <span class="info-label">Sync</span>
          <span class="info-value" :style="{ color: device.sync_connected ? 'var(--success)' : 'var(--text-secondary)' }">
            {{ device.sync_connected ? `Connected (${syncViaLabel})` : 'Disconnected' }}
          </span>
        </div>
        <div class="overlay-actions">
          <button
            class="btn btn-secondary btn-xs"
            :disabled="device.status !== 'device'"
            @click="sendMenu"
            title="Send Meta button (toggle menu)"
          >Menu</button>
          <button
            class="btn btn-warning btn-xs"
            :disabled="device.status !== 'device'"
            @click="showRebootConfirm = true"
          >Reboot</button>
        </div>
      </div>

    </div>

    <!-- Toggle button (card-level) -->
    <button class="info-toggle-btn" :class="{ open: showDeviceInfo }" @click="showDeviceInfo = !showDeviceInfo" title="Device info">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    </button>

    <ConfirmModal
      v-if="showRebootConfirm"
      title="Reboot Device"
      :message="`${device.model} (${device.serial}) を再起動しますか？`"
      confirm-label="Reboot"
      confirm-class="btn-warning"
      @confirm="showRebootConfirm = false; rebootDevice()"
      @cancel="showRebootConfirm = false"
    />
  </div>
</template>

<style scoped>
.scrcpy-card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
}
.scrcpy-card.fullscreen {
  position: fixed;
  inset: 0;
  z-index: 1000;
  border-radius: 0;
  border: none;
  display: flex;
  flex-direction: column;
}
.scrcpy-card.fullscreen .scrcpy-video {
  flex: 1;
  aspect-ratio: auto;
}
.scrcpy-header {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.5rem;
  border-bottom: 1px solid var(--border);
  font-size: 0.7rem;
  overflow: hidden;
  min-width: 0;
  flex-shrink: 0;
}
.device-label {
  font-weight: 500;
  font-family: monospace;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  flex-shrink: 1;
}
.device-model {
  color: var(--text-secondary);
  font-size: 0.7rem;
}
.wifi-icon {
  color: var(--warning, #ff9800);
  flex-shrink: 0;
}
.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--text-secondary);
}
.status-dot.connected {
  background: #22c55e;
}
.header-spacer {
  flex: 1;
}
.header-volume {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  flex-shrink: 0;
}
.header-volume .volume-slider {
  width: 60px;
  height: 4px;
  -webkit-appearance: none;
  appearance: none;
  background: var(--border, #444);
  border-radius: 2px;
  outline: none;
  cursor: pointer;
}
.header-volume .volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--primary, #4a9eff);
  border: 1.5px solid #fff;
  cursor: pointer;
  margin-top: -4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}
.header-volume .volume-slider::-moz-range-thumb {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--primary, #4a9eff);
  border: 1.5px solid #fff;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}
.header-volume .volume-slider:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.header-volume .volume-value {
  font-family: monospace;
  font-size: 0.6rem;
  color: var(--text-secondary);
  min-width: 1em;
  text-align: right;
}
.fullscreen-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: 1px solid var(--primary, #4a9eff);
  background: rgba(74, 158, 255, 0.15);
  color: var(--primary, #4a9eff);
  cursor: pointer;
  border-radius: 4px;
  padding: 0;
  margin-left: 0.25rem;
}
.fullscreen-btn:hover {
  background: var(--primary, #4a9eff);
  color: #fff;
}
.scrcpy-video {
  background: #000;
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  flex: 1 1 auto;
  min-height: 0;
}
.scrcpy-canvas {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transform: rotate(20.5deg) scale(2);
  transform-origin: center center;
}
.error-overlay,
.loading-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  font-size: 0.8rem;
}
.error-overlay {
  color: #ef4444;
}
/* Device info overlay */
.device-info-overlay {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(20, 20, 35, 0.92);
  backdrop-filter: blur(8px);
  padding: 0.5rem 0.6rem;
  transform: translateY(100%);
  transition: transform 0.25s ease;
  z-index: 5;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
.device-info-overlay.open {
  transform: translateY(0);
}
.device-info-overlay .info-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  padding: 0.1rem 0;
}
.device-info-overlay .info-label {
  color: var(--text-secondary);
  flex-shrink: 0;
}
.device-info-overlay .info-value {
  font-family: monospace;
  font-size: 0.7rem;
  text-align: right;
}
.device-info-overlay .controller-batteries {
  display: flex;
  gap: 0.5rem;
}
.sleep-btn {
  margin-left: 0.3rem;
  font-size: 0.55rem;
  font-weight: 600;
  padding: 0.05rem 0.3rem;
  border-radius: 3px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  color: var(--text);
  cursor: pointer;
  vertical-align: middle;
}
.sleep-btn:hover:not(:disabled) {
  background: var(--primary);
  color: #fff;
  border-color: var(--primary);
}
.sleep-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.overlay-actions {
  display: flex;
  gap: 0.4rem;
  margin-top: 0.35rem;
  padding-top: 0.35rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}
.btn-xs {
  font-size: 0.65rem;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
}
.info-toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 18px;
  border: none;
  background: rgba(20, 20, 35, 0.7);
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0;
  z-index: 6;
  transition: background 0.15s, color 0.15s;
  opacity: 0.6;
  flex-shrink: 0;
}
.info-toggle-btn:hover {
  background: rgba(20, 20, 35, 0.9);
  color: var(--text);
  opacity: 1;
}
.info-toggle-btn.open {
  opacity: 1;
}
.info-toggle-btn svg {
  transition: transform 0.25s ease;
}
.info-toggle-btn.open svg {
  transform: rotate(180deg);
}
</style>
