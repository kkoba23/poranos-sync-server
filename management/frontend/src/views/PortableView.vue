<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useI18n } from '@/i18n'
import { useScrcpyStream } from '@/composables/useScrcpyStream'
import { useAuthStore } from '@/stores/authStore'
import { useSettingsStore } from '@/stores/settingsStore'
import { useRouter } from 'vue-router'
import { post } from '@/api/client'
import { useToast } from '@/composables/useToast'
import ConfirmModal from '@/components/ConfirmModal.vue'
import type { Device } from '@/types'
import type { UiMode, Language } from '@/stores/settingsStore'

const { t } = useI18n()
const authStore = useAuthStore()
const settings = useSettingsStore()
const router = useRouter()

// Settings modal
const showSettings = ref(false)

function setMode(mode: UiMode) {
  const changed = settings.uiMode !== mode
  settings.uiMode = mode
  if (changed) {
    showSettings.value = false
    if (mode === 'portable') {
      router.push('/portable')
    } else {
      router.push('/operation')
    }
  }
}

function setLanguage(lang: Language) {
  settings.language = lang
}

// Menu bar controls
const autoLaunch = ref(false)
const autoLaunchLoading = ref(false)
const allStopping = ref(false)
const allVolume = ref(8)
const allVolumeApplying = ref(false)
const allRebooting = ref(false)
const showRebootAllConfirm = ref(false)

async function fetchAutoLaunch() {
  try {
    const resp = await fetch('/api/devices/auto-launch')
    const data = await resp.json()
    autoLaunch.value = data.enabled
  } catch { /* ignore */ }
}

async function toggleAutoLaunch() {
  autoLaunchLoading.value = true
  try {
    const resp = await fetch('/api/devices/auto-launch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ enabled: !autoLaunch.value }),
    })
    const data = await resp.json()
    autoLaunch.value = data.enabled
  } catch { /* ignore */ }
  autoLaunchLoading.value = false
}

async function allStop() {
  allStopping.value = true
  try {
    await fetch('/api/devices/stop-all', { method: 'POST' })
    await fetch('/api/server/reset', { method: 'POST' })
  } catch { /* ignore */ }
  allStopping.value = false
}

async function stopAll() {
  await Promise.all([allStop(), toggleAutoLaunch()])
}

async function rebootAllDevices() {
  allRebooting.value = true
  try {
    await fetch('/api/devices/reboot-all', { method: 'POST' })
  } catch { /* ignore */ }
  allRebooting.value = false
  showRebootAllConfirm.value = false
}

async function applyAllVolume() {
  allVolumeApplying.value = true
  try {
    await fetch('/api/devices/volume-all', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ volume: allVolume.value }),
    })
  } catch { /* ignore */ }
  allVolumeApplying.value = false
}

// デバイス一覧
const devices = ref<Device[]>([])
const devicesLoaded = ref(false)
const searchGracePeriod = ref(true)  // 起動後しばらくは「検索中」を表示
let devicePollTimer: ReturnType<typeof setInterval> | null = null
const toast = useToast()
const prevProvisionedMap = new Map<string, boolean>()
let suppressProvisionToast = true  // suppress during initial load

async function fetchDevices(useCached = false) {
  try {
    const url = useCached ? '/api/devices/cached' : '/api/devices'
    const resp = await fetch(url)
    const data = await resp.json()
    const newDevices: Device[] = data.devices || []
    // Detect provisioned state changes
    if (!suppressProvisionToast) {
      for (const d of newDevices) {
        const was = prevProvisionedMap.get(d.serial)
        if (d.provisioned && was !== true) {
          toast.success(`[${d.serial}] プロビジョニング完了`)
        }
      }
    }
    prevProvisionedMap.clear()
    for (const d of newDevices) {
      prevProvisionedMap.set(d.serial, !!d.provisioned)
    }
    devices.value = newDevices
    if (newDevices.length > 0) searchGracePeriod.value = false
  } catch { /* ignore */ }
  devicesLoaded.value = true
}

onMounted(async () => {
  fetchAutoLaunch()
  await fetchDevices(true)
  await fetchDevices()
  // Enable provisioning toasts after initial load
  suppressProvisionToast = false
  devicePollTimer = setInterval(fetchDevices, 5000)
  // 10秒間はデバイス0台でも「検索中」を表示
  setTimeout(() => { searchGracePeriod.value = false }, 10000)
})

onUnmounted(() => {
  if (devicePollTimer) clearInterval(devicePollTimer)
})

// 各デバイスごとの scrcpy ストリーム管理（plain Map, not reactive — avoids ref unwrapping）
const streamsMap = new Map<string, ReturnType<typeof useScrcpyStream>>()
const canvasRefsMap = new Map<string, HTMLCanvasElement>()

function getStream(serial: string) {
  if (!streamsMap.has(serial)) {
    streamsMap.set(serial, useScrcpyStream())
  }
  return streamsMap.get(serial)!
}

// :ref コールバック — canvas登録のみ。connect()はここで呼ばない
// （state変更 → 再レンダリング → :ref再呼び出しの無限ループ防止）
function setCanvasRef(serial: string, el: HTMLCanvasElement | null) {
  if (el) {
    canvasRefsMap.set(serial, el)
  }
}

// 接続が必要なデバイスに対してストリーム接続を試みる
// setCanvasRefとは分離し、watch/初期化から呼ぶ
function connectIfReady(device: Device) {
  const serial = device.adb_serial || device.serial
  if (device.status !== 'device') return
  const canvas = canvasRefsMap.get(serial)
  if (!canvas) return
  const stream = getStream(serial)
  if (!stream.state.value.connected) {
    stream.connect(serial, canvas)
  }
}

// 前回のadb_serialを追跡（USB→WiFi切替検知用）
const prevAdbSerialMap = new Map<string, string>()

// デバイス一覧が変わったら接続/切断を制御
watch(devices, (newDevices) => {
  for (const device of newDevices) {
    const serial = device.adb_serial || device.serial
    const hwSerial = device.hw_serial || device.serial

    if (device.status === 'device') {
      // adb_serialが変わった場合（USB→WiFi等）、古いストリームを切断して新しいserialで再接続
      const prevSerial = prevAdbSerialMap.get(hwSerial)
      if (prevSerial && prevSerial !== serial) {
        console.log(`[PortableView] Serial changed for ${hwSerial}: ${prevSerial} -> ${serial}`)
        const oldStream = streamsMap.get(prevSerial)
        if (oldStream) {
          oldStream.disconnect()
          streamsMap.delete(prevSerial)
        }
        // canvasRefも旧serialから新serialに移行
        const oldCanvas = canvasRefsMap.get(prevSerial)
        if (oldCanvas) {
          canvasRefsMap.set(serial, oldCanvas)
          canvasRefsMap.delete(prevSerial)
        }
      }
      prevAdbSerialMap.set(hwSerial, serial)

      connectIfReady(device)
    } else {
      // デバイスがオフラインになったら切断
      const stream = streamsMap.get(serial)
      if (stream && stream.state.value.connected) {
        stream.disconnect()
      }
    }
  }
})

onUnmounted(() => {
  for (const stream of streamsMap.values()) {
    stream.disconnect()
  }
})

// 音量制御
const localVolumes = ref<Map<string, number>>(new Map())
const volumeTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

function getVolume(device: Device): number {
  const serial = device.adb_serial || device.serial
  return localVolumes.value.get(serial) ?? device.volume_music ?? 0
}

function onVolumeInput(device: Device, e: Event) {
  const serial = device.adb_serial || device.serial
  const val = parseInt((e.target as HTMLInputElement).value)
  localVolumes.value.set(serial, val)
  const prev = volumeTimeouts.get(serial)
  if (prev) clearTimeout(prev)
  volumeTimeouts.set(serial, setTimeout(() => {
    sendVolume(serial, val)
    volumeTimeouts.delete(serial)
  }, 300))
}

async function sendVolume(serial: string, volume: number) {
  try {
    await fetch(`/api/devices/${encodeURIComponent(serial)}/volume`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ volume }),
    })
  } catch { /* ignore */ }
}

async function launchApp(device: Device) {
  const serial = device.adb_serial || device.serial
  try {
    await fetch(`/api/devices/${encodeURIComponent(serial)}/launch`, { method: 'POST' })
  } catch { /* ignore */ }
}

async function stopApp(device: Device) {
  const serial = device.adb_serial || device.serial
  try {
    await fetch(`/api/devices/${encodeURIComponent(serial)}/stop`, { method: 'POST' })
  } catch { /* ignore */ }
}

const rebootTarget = ref<Device | null>(null)

async function rebootDevice(device: Device) {
  const serial = device.adb_serial || device.serial
  try {
    await fetch(`/api/devices/${encodeURIComponent(serial)}/reboot`, { method: 'POST' })
  } catch { /* ignore */ }
  rebootTarget.value = null
}

function batteryColor(level?: number): string {
  if (!level) return 'var(--text-secondary)'
  if (level > 50) return 'var(--success)'
  if (level > 20) return 'var(--warning)'
  return 'var(--danger)'
}

function storageColor(device: Device): string {
  const used = device.storage_used_gb
  const total = device.storage_total_gb
  if (used == null || total == null || total === 0) return 'var(--text-secondary)'
  const pct = used / total * 100
  if (pct > 90) return 'var(--danger)'
  if (pct > 75) return 'var(--warning)'
  return 'var(--success)'
}

// フルスクリーン
const fullscreenSerial = ref<string | null>(null)

function toggleFullscreen(serial: string) {
  fullscreenSerial.value = fullscreenSerial.value === serial ? null : serial
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && fullscreenSerial.value) {
    fullscreenSerial.value = null
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))

// Desktop update — auto-check when settings modal opens
watch(showSettings, (open) => {
  if (open && !latestDesktopRelease.value) checkForUpdate()
})

const isElectron = !!(window as any).electronAPI?.isElectron
const currentVersion = ref('')
const latestDesktopRelease = ref<any>(null)
const updateChecking = ref(false)
const updateDownloading = ref(false)
const updateError = ref('')
const hasUpdate = computed(() => {
  if (!latestDesktopRelease.value || !currentVersion.value) return false
  return latestDesktopRelease.value.version !== currentVersion.value
})

async function checkForUpdate() {
  updateChecking.value = true
  updateError.value = ''
  try {
    if (isElectron) {
      currentVersion.value = await (window as any).electronAPI.getAppVersion()
    }
    const resp = await fetch('/api/poranos/desktop-release')
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
    latestDesktopRelease.value = await resp.json()
  } catch (e: any) {
    updateError.value = e.message || 'Failed to check for updates'
  } finally {
    updateChecking.value = false
  }
}

async function downloadAndInstall() {
  if (!latestDesktopRelease.value) return
  updateDownloading.value = true
  updateError.value = ''
  try {
    const resp = await fetch(`/api/poranos/desktop-release/${latestDesktopRelease.value.id}/download`, { method: 'POST' })
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
    const data = await resp.json()

    if (isElectron) {
      // Launch installer and quit
      await (window as any).electronAPI.launchInstaller(data.file_path)
    } else {
      // Non-Electron: download via browser
      const a = document.createElement('a')
      a.href = `/api/poranos/desktop-release/${latestDesktopRelease.value.id}/download`
      a.download = data.file_name
      a.click()
    }
  } catch (e: any) {
    updateError.value = e.message || 'Download failed'
  } finally {
    updateDownloading.value = false
  }
}
</script>

<template>
  <div class="portable-container">
    <!-- Menu bar -->
    <div class="portable-menubar">
      <!-- Poranos Launch / Stop -->
      <button
        v-if="!autoLaunch"
        class="btn btn-success btn-sm"
        :disabled="autoLaunchLoading"
        @click="toggleAutoLaunch"
      >{{ t('portable.launchAll') }}</button>
      <button
        v-else
        class="btn btn-danger btn-sm"
        :disabled="autoLaunchLoading || allStopping"
        @click="stopAll()"
      >{{ allStopping ? t('sidebar.allStopProgress') : t('portable.stopAll') }}</button>

      <div class="menubar-divider"></div>

      <!-- All Volume -->
      <div class="menubar-item">
        <span class="menubar-label">{{ t('portable.volume') }}</span>
        <input
          type="range"
          class="menubar-volume-slider"
          min="0"
          max="15"
          v-model.number="allVolume"
        />
        <span class="menubar-volume-value">{{ allVolume }}</span>
        <button
          class="menubar-btn-apply"
          :disabled="allVolumeApplying"
          @click="applyAllVolume"
        >{{ allVolumeApplying ? '...' : t('sidebar.apply') }}</button>
      </div>

      <div class="menubar-divider"></div>

      <!-- Reboot All -->
      <button
        class="btn btn-warning btn-sm"
        :disabled="allRebooting || devices.length === 0"
        @click="showRebootAllConfirm = true"
      >{{ allRebooting ? '...' : t('portable.reboot') }}</button>

      <div class="menubar-spacer"></div>

      <!-- Settings gear -->
      <button class="menubar-gear" @click="showSettings = true" :title="t('nav.settings')">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      </button>
    </div>

    <!-- No devices -->
    <div v-if="devices.length === 0" class="no-devices-card">
      <div class="no-devices-text">
        <template v-if="!devicesLoaded || searchGracePeriod">{{ t('portable.searchingDevices') }}</template>
        <template v-else>{{ t('portable.noDevices') }}</template>
      </div>
    </div>

    <!-- Device columns -->
    <div v-else class="device-columns">
      <div
        v-for="device in devices"
        :key="device.serial"
        class="device-column"
        :class="{ 'is-fullscreen': fullscreenSerial === (device.adb_serial || device.serial) }"
      >
        <!-- Mirroring card -->
        <div class="portable-card mirroring-card">
          <div class="card-header">
            <span class="card-header-title">{{ t('portable.mirroring') }}</span>
            <span class="device-serial">{{ device.serial }}</span>
            <!-- WiFi icon -->
            <svg v-if="device.connection_type === 'wifi'" class="wifi-icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
            </svg>
            <span
              v-if="getStream(device.adb_serial || device.serial).state.value.connected"
              class="status-dot connected"
            ></span>
            <span v-else class="status-dot"></span>
            <!-- Sync server indicator -->
            <span
              class="status-dot"
              :class="{ 'sync-connected': device.sync_connected }"
              :title="device.sync_connected ? 'Sync: Connected' : 'Sync: Disconnected'"
            ></span>
            <div class="header-spacer"></div>
            <button
              class="fullscreen-btn"
              @click="toggleFullscreen(device.adb_serial || device.serial)"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 3 21 3 21 9"></polyline>
                <polyline points="9 21 3 21 3 15"></polyline>
                <line x1="21" y1="3" x2="14" y2="10"></line>
                <line x1="3" y1="21" x2="10" y2="14"></line>
              </svg>
            </button>
          </div>
          <div class="video-area">
            <canvas
              :ref="(el) => setCanvasRef(device.adb_serial || device.serial, el as HTMLCanvasElement)"
              class="scrcpy-canvas"
            ></canvas>
            <div
              v-if="getStream(device.adb_serial || device.serial).state.value.error"
              class="overlay error-overlay"
            >{{ getStream(device.adb_serial || device.serial).state.value.error }}</div>
            <div
              v-else-if="!getStream(device.adb_serial || device.serial).state.value.connected"
              class="overlay loading-overlay"
            >{{ t('portable.connecting') }}</div>
          </div>
        </div>

        <!-- Device info card -->
        <div class="portable-card info-card">
          <div class="card-header">
            <span class="card-header-title">{{ t('portable.deviceInfo') }}</span>
          </div>
          <div class="info-body">
            <!-- Model -->
            <div class="info-row">
              <span class="info-label">{{ t('portable.model') }}</span>
              <span class="info-value">{{ device.model }}</span>
            </div>

            <!-- Battery -->
            <div class="info-row" v-if="device.battery_level != null">
              <span class="info-label">{{ t('portable.battery') }}</span>
              <span class="info-value" :style="{ color: batteryColor(device.battery_level) }">
                {{ device.battery_level }}%
                <span v-if="device.battery_plugged" class="charger-badge" :class="device.battery_weak_charger === false ? 'fast' : 'slow'">
                  &#x26A1;{{ device.battery_weak_charger === false ? 'Fast' : 'Slow' }}
                </span>
              </span>
            </div>

            <!-- Controller batteries -->
            <div class="info-row" v-if="device.controller_left_battery != null || device.controller_right_battery != null">
              <span class="info-label">{{ t('portable.controllerBattery') }}</span>
              <span class="info-value controller-batteries">
                <span v-if="device.controller_left_battery != null" :style="{ color: batteryColor(device.controller_left_battery) }">
                  L:{{ device.controller_left_battery }}%
                </span>
                <span v-if="device.controller_right_battery != null" :style="{ color: batteryColor(device.controller_right_battery) }">
                  R:{{ device.controller_right_battery }}%
                </span>
              </span>
            </div>

            <!-- WiFi -->
            <div class="info-row" v-if="device.wifi_ssid">
              <span class="info-label">{{ t('portable.wifi') }}</span>
              <span class="info-value">{{ device.wifi_ssid }}</span>
            </div>

            <!-- App status -->
            <div class="info-row">
              <span class="info-label">{{ t('portable.app') }}</span>
              <span class="info-value">
                <template v-if="!device.app_installed">
                  <span style="color: var(--text-secondary)">{{ t('portable.appNotInstalled') }}</span>
                </template>
                <template v-else>
                  <span :style="{ color: device.app_running ? 'var(--success)' : 'var(--text-secondary)' }">
                    {{ device.app_running ? t('portable.appRunning') : t('portable.appStopped') }}
                  </span>
                  <span style="color: var(--text-secondary); margin-left: 0.3rem; font-size: 0.7rem">
                    v{{ device.app_version || '?' }}
                  </span>
                </template>
              </span>
            </div>

            <!-- Sync server -->
            <div class="info-row">
              <span class="info-label">{{ t('portable.syncServer') }}</span>
              <span class="info-value" :style="{ color: device.sync_connected ? 'var(--success)' : 'var(--text-secondary)' }">
                {{ device.sync_connected ? t('portable.syncConnected') : t('portable.syncDisconnected') }}
              </span>
            </div>

            <!-- Storage -->
            <div class="info-row" v-if="device.storage_total_gb != null">
              <span class="info-label">{{ t('portable.storage') }}</span>
              <span class="info-value">
                <span :style="{ color: storageColor(device) }">{{ device.storage_used_gb }}GB</span>
                <span style="color: var(--text-secondary)"> / {{ device.storage_total_gb }}GB</span>
              </span>
            </div>

            <!-- Account -->
            <div class="info-row" v-if="device.app_account">
              <span class="info-label">{{ t('portable.account') }}</span>
              <span class="info-value account-text" :title="device.app_account">{{ device.app_account }}</span>
            </div>

            <!-- Provisioning -->
            <div class="info-row">
              <span class="info-label">{{ t('portable.provisioning') }}</span>
              <span class="info-value" :style="{ color: device.provisioned ? 'var(--success)' : 'var(--warning, #ff9800)' }">
                {{ device.provisioned ? t('portable.provisioned') : t('portable.notProvisioned') }}
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- Reboot confirm -->
    <ConfirmModal
      v-if="rebootTarget"
      :title="t('portable.reboot')"
      :message="`${rebootTarget.model} (${rebootTarget.serial}) を再起動しますか？`"
      :confirm-label="t('portable.reboot')"
      confirm-class="btn-warning"
      @confirm="rebootDevice(rebootTarget!)"
      @cancel="rebootTarget = null"
    />

    <!-- Reboot All confirm -->
    <ConfirmModal
      v-if="showRebootAllConfirm"
      :title="t('portable.reboot')"
      :message="`接続中の全デバイス（${devices.length}台）を再起動しますか？`"
      :confirm-label="t('portable.reboot')"
      confirm-class="btn-warning"
      :loading="allRebooting"
      @confirm="rebootAllDevices()"
      @cancel="showRebootAllConfirm = false"
    />

    <!-- Settings modal -->
    <Teleport to="body">
      <div v-if="showSettings" class="settings-modal-overlay" @click.self="showSettings = false">
        <div class="settings-modal">
          <div class="settings-modal-header">
            <h2>{{ t('settings.title') }}</h2>
            <button class="settings-modal-close" @click="showSettings = false">&times;</button>
          </div>
          <div class="settings-modal-body">
            <!-- UI Mode -->
            <div class="settings-section">
              <h3 class="section-title">{{ t('settings.uiMode') }}</h3>
              <div class="mode-cards">
                <button
                  class="mode-card"
                  :class="{ active: settings.uiMode === 'portable' }"
                  @click="setMode('portable')"
                >
                  <div class="mode-card-header">
                    <span class="mode-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                        <line x1="12" y1="18" x2="12.01" y2="18"></line>
                      </svg>
                    </span>
                    <span class="mode-name">{{ t('settings.uiMode.portable') }}</span>
                  </div>
                  <p class="mode-desc">{{ t('settings.uiMode.portableDesc') }}</p>
                </button>
                <button
                  class="mode-card"
                  :class="{ active: settings.uiMode === 'advance' }"
                  @click="setMode('advance')"
                >
                  <div class="mode-card-header">
                    <span class="mode-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                        <line x1="8" y1="21" x2="16" y2="21"></line>
                        <line x1="12" y1="17" x2="12" y2="21"></line>
                      </svg>
                    </span>
                    <span class="mode-name">{{ t('settings.uiMode.advance') }}</span>
                  </div>
                  <p class="mode-desc">{{ t('settings.uiMode.advanceDesc') }}</p>
                </button>
              </div>
            </div>

            <!-- Language -->
            <div class="settings-section">
              <h3 class="section-title">{{ t('settings.language') }}</h3>
              <div class="language-toggle">
                <button
                  class="lang-btn"
                  :class="{ active: settings.language === 'ja' }"
                  @click="setLanguage('ja')"
                >日本語</button>
                <button
                  class="lang-btn"
                  :class="{ active: settings.language === 'en' }"
                  @click="setLanguage('en')"
                >English</button>
              </div>
            </div>

            <!-- App Update -->
            <div class="settings-section">
              <h3 class="section-title">{{ t('settings.update') }}</h3>
              <div class="update-section">
                <div class="update-current">
                  <span class="update-label">{{ t('settings.update.current') }}</span>
                  <span class="update-version">v{{ currentVersion || '?' }}</span>
                </div>

                <div v-if="latestDesktopRelease" class="update-latest">
                  <span class="update-label">{{ t('settings.update.latest') }}</span>
                  <span class="update-version" :class="{ 'has-update': hasUpdate }">
                    v{{ latestDesktopRelease.version }}
                  </span>
                </div>

                <div v-if="updateError" class="update-error">{{ updateError }}</div>

                <div class="update-actions">
                  <button
                    class="btn btn-secondary btn-sm"
                    :disabled="updateChecking"
                    @click="checkForUpdate"
                  >{{ updateChecking ? '...' : t('settings.update.check') }}</button>

                  <button
                    v-if="hasUpdate"
                    class="btn btn-primary btn-sm"
                    :disabled="updateDownloading"
                    @click="downloadAndInstall"
                  >{{ updateDownloading ? t('settings.update.downloading') : t('settings.update.install') }}</button>

                  <span v-if="latestDesktopRelease && !hasUpdate && !updateChecking" class="update-uptodate">
                    {{ t('settings.update.upToDate') }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.portable-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* Menu bar */
.portable-menubar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.75rem;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}
.menubar-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.menubar-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
  white-space: nowrap;
}
.menubar-divider {
  width: 1px;
  height: 20px;
  background: var(--border);
  flex-shrink: 0;
}
.menubar-volume-slider {
  width: 80px;
  height: 4px;
  accent-color: var(--accent);
}
.menubar-volume-value {
  font-size: 0.7rem;
  color: var(--text-secondary);
  min-width: 1.2rem;
  text-align: center;
  font-family: monospace;
}
.menubar-btn-apply {
  padding: 0.15rem 0.4rem;
  border: 1px solid var(--accent);
  border-radius: 4px;
  background: rgba(59, 130, 246, 0.1);
  color: var(--accent);
  cursor: pointer;
  font-size: 0.7rem;
  transition: all 0.15s;
}
.menubar-btn-apply:hover:not(:disabled) {
  background: rgba(59, 130, 246, 0.25);
}
.menubar-btn-apply:disabled {
  opacity: 0.5;
  cursor: default;
}
.menubar-spacer {
  flex: 1;
}
.menubar-gear {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.15s;
}
.menubar-gear:hover {
  color: var(--accent);
  border-color: var(--accent);
  background: rgba(59, 130, 246, 0.1);
}

.no-devices-card {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50vh;
}
.no-devices-text {
  color: var(--text-secondary);
  font-size: 1rem;
}

.device-columns {
  display: flex;
  gap: 1rem;
  flex: 1;
  min-height: 0;
  overflow-x: auto;
  padding: 0.75rem;
}

.device-column {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-width: 360px;
  flex: 1;
}

.device-column.is-fullscreen {
  position: fixed;
  inset: 0;
  z-index: 1000;
  max-width: none;
  min-width: 0;
  background: var(--bg-primary);
  padding: 0;
  gap: 0;
}
.device-column.is-fullscreen .info-card {
  display: none;
}
.device-column.is-fullscreen .mirroring-card {
  flex: 1;
  border-radius: 0;
  border: none;
}

.portable-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.6rem;
  border-bottom: 1px solid var(--border);
  font-size: 0.75rem;
  flex-shrink: 0;
}
.card-header-title {
  font-weight: 600;
  color: var(--text-primary);
}
.device-serial {
  font-family: monospace;
  color: var(--text-secondary);
  font-size: 0.7rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.header-spacer {
  flex: 1;
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
  flex-shrink: 0;
}
.status-dot.connected {
  background: #22c55e;
}
.status-dot.sync-connected {
  background: var(--accent, #3b82f6);
}

.mirroring-card {
  flex: 1;
  min-height: 0;
}

.video-area {
  background: #000;
  position: relative;
  flex: 1;
  min-height: 200px;
  overflow: hidden;
}
.scrcpy-canvas {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transform: rotate(20.5deg) scale(2);
  transform-origin: center center;
}
.overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
}
.loading-overlay {
  color: var(--text-secondary);
}
.error-overlay {
  color: #ef4444;
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
  flex-shrink: 0;
}
.fullscreen-btn:hover {
  background: var(--primary, #4a9eff);
  color: #fff;
}

/* Info card */
.info-body {
  padding: 0.5rem 0.6rem;
}
.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  padding: 0.2rem 0;
}
.info-label {
  color: var(--text-secondary);
  flex-shrink: 0;
  min-width: 5rem;
}
.info-value {
  font-family: monospace;
  font-size: 0.75rem;
  text-align: right;
}
.controller-batteries {
  display: flex;
  gap: 0.5rem;
}
.account-text {
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.charger-badge {
  margin-left: 0.2rem;
  font-size: 0.55rem;
  font-weight: 700;
  padding: 0.02rem 0.25rem;
  border-radius: 3px;
  vertical-align: middle;
}
.charger-badge.fast {
  background: var(--success, #4caf50);
  color: #fff;
}
.charger-badge.slow {
  background: var(--warning, #ff9800);
  color: #1a1a2e;
}

.volume-control {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}
.volume-control .volume-slider {
  width: 80px;
  height: 4px;
  -webkit-appearance: none;
  appearance: none;
  background: var(--border, #444);
  border-radius: 2px;
  outline: none;
  cursor: pointer;
}
.volume-control .volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--primary, #4a9eff);
  border: 1.5px solid #fff;
  cursor: pointer;
  margin-top: -4px;
}
.volume-control .volume-slider:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.volume-val {
  font-family: monospace;
  font-size: 0.7rem;
  color: var(--text-secondary);
  min-width: 1em;
  text-align: right;
}

.action-row {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

/* Settings modal */
.settings-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
}
.settings-modal {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  width: 90%;
  max-width: 480px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}
.settings-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--border);
}
.settings-modal-header h2 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}
.settings-modal-close {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 1.5rem;
  cursor: pointer;
  line-height: 1;
  padding: 0 0.25rem;
}
.settings-modal-close:hover {
  color: var(--text-primary);
}
.settings-modal-body {
  padding: 1.25rem;
}

/* Settings sections inside modal */
.settings-section {
  margin-bottom: 1.5rem;
}
.settings-section:last-child {
  margin-bottom: 0;
}
.section-title {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
}
.mode-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}
.mode-card {
  background: var(--bg-card);
  border: 2px solid var(--border);
  border-radius: var(--radius);
  padding: 1rem;
  cursor: pointer;
  text-align: left;
  transition: all 0.15s;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.mode-card:hover {
  border-color: var(--accent);
  background: rgba(59, 130, 246, 0.05);
}
.mode-card.active {
  border-color: var(--accent);
  background: rgba(59, 130, 246, 0.1);
  box-shadow: 0 0 0 1px var(--accent);
}
.mode-card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.mode-icon {
  color: var(--accent);
  flex-shrink: 0;
}
.mode-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
}
.mode-desc {
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.4;
}
.language-toggle {
  display: flex;
  gap: 2px;
  background: var(--border);
  border-radius: var(--radius);
  padding: 2px;
  width: fit-content;
}
.lang-btn {
  padding: 0.4rem 1.25rem;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 0.85rem;
  border-radius: calc(var(--radius) - 2px);
  transition: all 0.15s;
}
.lang-btn.active {
  background: var(--bg-card);
  color: var(--text-primary);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}
.lang-btn:hover:not(.active) {
  color: var(--text-primary);
}

/* Update section */
.update-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.update-current,
.update-latest {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.85rem;
}
.update-label {
  color: var(--text-secondary);
}
.update-version {
  font-family: monospace;
  font-weight: 600;
  color: var(--text-primary);
}
.update-version.has-update {
  color: var(--accent, #3b82f6);
}
.update-error {
  font-size: 0.8rem;
  color: var(--danger, #ef4444);
}
.update-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
}
.update-uptodate {
  font-size: 0.8rem;
  color: var(--success, #22c55e);
}
</style>
