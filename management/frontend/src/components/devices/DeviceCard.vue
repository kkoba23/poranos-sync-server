<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { Device, InstallTask } from '@/types'
import ConfirmModal from '@/components/ConfirmModal.vue'
import { useI18n } from '@/i18n'

const { t } = useI18n()

const props = defineProps<{
  device: Device
  canInstall: boolean
  installTask?: InstallTask
  userEmail?: string
}>()

const emit = defineEmits<{
  install: []
  launch: []
  stop: []
  cancelInstall: []
  reboot: []
  shutdown: []
  accountChange: []
  modeChange: [mode: string]
}>()

const showRebootConfirm = ref(false)
const showShutdownConfirm = ref(false)

function batteryColor(level?: number): string {
  if (!level) return 'var(--text-secondary)'
  if (level > 50) return 'var(--success)'
  if (level > 20) return 'var(--warning)'
  return 'var(--danger)'
}

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

const syncViaType = computed(() => {
  const via = props.device.sync_connected_via || ''
  return via.includes('localhost') ? 'local' : 'remote'
})

const syncViaLabel = computed(() => {
  const via = props.device.sync_connected_via || ''
  return via.includes('localhost') ? t('device.adbReverse') : t('device.wifiDirect')
})

const storageColor = computed(() => {
  const used = props.device.storage_used_gb
  const total = props.device.storage_total_gb
  if (used == null || total == null || total === 0) return 'var(--text-secondary)'
  const pct = used / total * 100
  if (pct > 90) return 'var(--danger)'
  if (pct > 75) return 'var(--warning)'
  return 'var(--success)'
})

const isAccountSame = computed(() => {
  if (!props.userEmail || !props.device.app_account) return false
  return props.device.app_account === props.userEmail
})

const isMultiplayMode = computed(() => {
  const m = props.device.app_mode || ''
  return m === 'Multiplay' || m === 'MultiplayOnPre'
})

const modeLabel = computed(() => {
  const m = props.device.app_mode || ''
  if (m === 'Standalone') return t('device.modeStandalone')
  if (m === 'Multiplay' || m === 'MultiplayOnPre') return t('device.modeMultiplay')
  return m || '-'
})

async function sendVolume(volume: number) {
  const serial = props.device.adb_serial || props.device.serial
  try {
    await fetch(`/api/devices/${encodeURIComponent(serial)}/volume`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ volume }),
    })
  } catch {
    // ignore
  }
}
</script>

<template>
  <div class="card">
    <!-- Header: Serial + badges + indicators -->
    <div class="flex items-center justify-between mb-1">
      <div class="flex items-center" style="gap: 0.5rem">
        <span style="font-weight: 600">{{ device.serial }}</span>
        <span
          v-if="device.connection_type"
          class="conn-badge"
          :class="device.connection_type"
        >
          {{ device.connection_type === 'usb' ? 'USB' : 'WiFi' }}
        </span>
      </div>
      <div class="flex items-center" style="gap: 0.35rem">
        <span
          class="status-dot"
          :class="device.status === 'device' ? 'running' : 'stopped'"
          title="ADB"
        ></span>
        <span
          class="status-dot"
          :class="device.sync_connected ? 'sync-on' : 'sync-off'"
          title="Sync Server"
        ></span>
      </div>
    </div>

    <div class="device-info">
      <div class="info-row">
        <span class="info-label">{{ t('device.device') }}</span>
        <span class="info-value">{{ device.model }}</span>
      </div>
      <div class="info-row" v-if="device.battery_level != null">
        <span class="info-label">{{ t('device.headBattery') }}</span>
        <span class="info-value" :style="{ color: batteryColor(device.battery_level) }">
          {{ device.battery_level }}%
          <template v-if="device.battery_plugged">
            <span
              class="charger-badge"
              :class="device.battery_weak_charger === false ? 'fast' : 'slow'"
              :title="device.battery_charging_ma ? `${device.battery_charging_ma}mA` : ''"
            >
              &#x26A1;{{ device.battery_weak_charger === false ? t('device.fast') : t('device.slow') }}
            </span>
          </template>
        </span>
      </div>
      <div class="info-row" v-if="device.controller_left_battery != null || device.controller_right_battery != null">
        <span class="info-label">{{ t('device.controllerBatteries') }}</span>
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
        <span class="info-label">{{ t('device.wifi') }}</span>
        <span class="info-value">{{ device.wifi_ssid }}</span>
      </div>
      <div class="info-row">
        <span class="info-label">{{ t('device.provisioned') }}</span>
        <span class="info-value" :style="{ color: device.provisioned ? 'var(--success)' : 'var(--danger)' }">
          {{ device.provisioned ? t('device.yes') : t('device.no') }}
        </span>
      </div>
      <div class="info-row">
        <span class="info-label">{{ t('device.app') }}</span>
        <span class="info-value">
          {{ device.app_installed ? `v${device.app_version || '?'}` : t('device.notInstalled') }}
        </span>
      </div>
      <div class="info-row">
        <span class="info-label">Poranos_LT</span>
        <span class="info-value" :style="{ color: device.app_running ? 'var(--success)' : 'var(--text-secondary)' }">
          {{ device.app_running ? t('device.running') : t('device.stopped') }}
        </span>
      </div>
      <div class="info-row" v-if="device.app_account">
        <span class="info-label">{{ t('device.account') }}</span>
        <span class="info-value account-value" :title="device.app_account">{{ device.app_account }}</span>
      </div>
      <div class="info-row" v-if="device.storage_total_gb != null">
        <span class="info-label">{{ t('device.storage') }}</span>
        <span class="info-value">
          <span :style="{ color: storageColor }">{{ device.storage_used_gb }}GB</span>
          <span style="color: var(--text-secondary)"> / {{ device.storage_total_gb }}GB</span>
        </span>
      </div>
      <div class="info-row">
        <span class="info-label">{{ t('device.sync') }}</span>
        <span class="info-value" :style="{ color: device.sync_connected ? 'var(--success)' : 'var(--text-secondary)' }">
          <template v-if="device.sync_connected">
            {{ t('device.connected') }}
            <span class="sync-via-badge" :class="syncViaType">{{ syncViaLabel }}</span>
          </template>
          <template v-else>{{ t('device.disconnected') }}</template>
        </span>
      </div>
      <div class="info-row" v-if="device.app_mode">
        <span class="info-label">{{ t('device.appMode') }}</span>
        <span class="info-value" :style="{ color: isMultiplayMode ? 'var(--success)' : 'var(--warning)' }">
          {{ modeLabel }}
        </span>
      </div>
      <div class="volume-row" v-if="device.volume_music != null">
        <span class="info-label">{{ t('device.volume') }}</span>
        <div class="volume-control">
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
      </div>
    </div>

    <!-- Install task status -->
    <div v-if="installTask && (installTask.status === 'installing' || installTask.status === 'queued')" class="install-status mt-1">
      <div class="flex items-center justify-between">
        <span class="install-status-text installing">
          {{ installTask.status === 'queued' ? t('device.queued') : t('device.installing') }}
        </span>
        <button class="btn-cancel-sm" @click="$emit('cancelInstall')">{{ t('device.cancel') }}</button>
      </div>
      <div class="install-progress-bar">
        <div class="install-progress-fill indeterminate"></div>
      </div>
    </div>
    <div v-else-if="installTask && installTask.status === 'success'" class="install-status mt-1">
      <span class="install-status-text success">{{ t('device.installComplete') }}</span>
    </div>
    <div v-else-if="installTask && installTask.status === 'failed'" class="install-status mt-1">
      <span class="install-status-text failed">{{ t('device.installFailed') }}</span>
      <span v-if="installTask.message" class="install-message">{{ installTask.message }}</span>
    </div>

    <!-- Buttons -->
    <div class="btn-group mt-1">
      <button
        v-if="!device.app_running"
        class="btn btn-success btn-sm"
        :disabled="!device.app_installed || device.status !== 'device'"
        @click="$emit('launch')"
      >
        {{ t('device.launch') }}
      </button>
      <button
        v-else
        class="btn btn-danger btn-sm"
        :disabled="device.status !== 'device'"
        @click="$emit('stop')"
      >
        {{ t('device.stop') }}
      </button>
      <button
        class="btn btn-primary btn-sm"
        :disabled="!canInstall || device.status !== 'device'"
        @click="$emit('install')"
      >
        {{ t('device.installApk') }}
      </button>
      <button
        class="btn btn-account btn-sm"
        :disabled="!device.sync_connected || isAccountSame"
        @click="$emit('accountChange')"
        :title="isAccountSame ? t('device.accountSameTitle') : t('device.accountSetTitle')"
      >
        {{ t('device.accountChange') }}
      </button>
      <button
        v-if="device.sync_connected && isMultiplayMode"
        class="btn btn-mode-standalone btn-sm"
        @click="$emit('modeChange', 'standalone')"
      >
        {{ t('device.switchToStandalone') }}
      </button>
      <button
        v-if="device.sync_connected && !isMultiplayMode"
        class="btn btn-mode-multiplay btn-sm"
        @click="$emit('modeChange', 'multiplay')"
      >
        {{ t('device.switchToMultiplay') }}
      </button>
      <button
        class="btn btn-warning btn-sm"
        :disabled="device.status !== 'device'"
        @click="showRebootConfirm = true"
      >
        {{ t('device.reboot') }}
      </button>
      <button
        class="btn btn-danger btn-sm"
        :disabled="device.status !== 'device'"
        @click="showShutdownConfirm = true"
      >
        {{ t('device.shutdown') }}
      </button>
    </div>

    <ConfirmModal
      v-if="showRebootConfirm"
      :title="t('device.rebootTitle')"
      :message="t('device.rebootMsg', { model: device.model, serial: device.serial })"
      :confirm-label="t('device.reboot')"
      confirm-class="btn-warning"
      @confirm="showRebootConfirm = false; emit('reboot')"
      @cancel="showRebootConfirm = false"
    />

    <ConfirmModal
      v-if="showShutdownConfirm"
      :title="t('device.shutdownTitle')"
      :message="t('device.shutdownMsg', { model: device.model, serial: device.serial })"
      :confirm-label="t('device.shutdown')"
      confirm-class="btn-danger"
      @confirm="showShutdownConfirm = false; emit('shutdown')"
      @cancel="showShutdownConfirm = false"
    />
  </div>
</template>

<style scoped>
.device-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.info-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
}
.info-label {
  color: var(--text-secondary);
  flex-shrink: 0;
}
.controller-batteries {
  display: flex;
  gap: 0.5rem;
}
.info-value {
  font-family: monospace;
  font-size: 0.8rem;
}
.btn-group {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.btn-group .btn {
  flex: 1;
  min-width: 0;
}
.conn-badge {
  font-size: 0.65rem;
  font-weight: 700;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}
.conn-badge.usb {
  background: var(--primary);
  color: #fff;
}
.conn-badge.wifi {
  background: var(--warning, #ff9800);
  color: #1a1a2e;
}
.charger-badge {
  margin-left: 0.3rem;
  font-size: 0.65rem;
  font-weight: 700;
  padding: 0.05rem 0.35rem;
  border-radius: 4px;
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
.volume-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.85rem;
  gap: 0.5rem;
}
.volume-control {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex: 1;
  justify-content: flex-end;
}
.volume-slider {
  width: 100%;
  max-width: 120px;
  height: 6px;
  -webkit-appearance: none;
  appearance: none;
  background: var(--border, #444);
  border-radius: 3px;
  outline: none;
  cursor: pointer;
}
.volume-slider::-webkit-slider-runnable-track {
  height: 6px;
  border-radius: 3px;
}
.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--primary, #4a9eff);
  border: 2px solid #fff;
  cursor: pointer;
  margin-top: -6px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
}
.volume-slider::-moz-range-track {
  height: 6px;
  background: var(--border, #444);
  border-radius: 3px;
}
.volume-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--primary, #4a9eff);
  border: 2px solid #fff;
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
}
.volume-slider:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.volume-slider:disabled::-webkit-slider-thumb {
  cursor: not-allowed;
}
.volume-slider:disabled::-moz-range-thumb {
  cursor: not-allowed;
}
.volume-value {
  font-family: monospace;
  font-size: 0.8rem;
  min-width: 1.5em;
  text-align: right;
}
.sync-via-badge {
  margin-left: 0.3rem;
  font-size: 0.6rem;
  font-weight: 700;
  padding: 0.05rem 0.35rem;
  border-radius: 4px;
  vertical-align: middle;
}
.sync-via-badge.local {
  background: var(--primary, #4a9eff);
  color: #fff;
}
.sync-via-badge.remote {
  background: var(--warning, #ff9800);
  color: #1a1a2e;
}
.status-dot.sync-on {
  background: var(--primary, #4a9eff);
}
.status-dot.sync-off {
  background: var(--text-secondary, #666);
}
.install-status {
  padding: 0.4rem 0.5rem;
  background: var(--card-bg-alt, rgba(255,255,255,0.03));
  border-radius: var(--radius, 6px);
  border: 1px solid var(--border);
}
.install-status-text {
  font-size: 0.8rem;
  font-weight: 500;
}
.install-status-text.installing {
  color: var(--accent, #4a9eff);
}
.install-status-text.success {
  color: var(--success, #22c55e);
}
.install-status-text.failed {
  color: var(--danger, #ef4444);
}
.install-message {
  display: block;
  font-size: 0.7rem;
  color: var(--text-secondary);
  margin-top: 0.15rem;
}
.install-progress-bar {
  height: 3px;
  background: var(--border);
  border-radius: 2px;
  overflow: hidden;
  margin-top: 0.35rem;
}
.install-progress-fill {
  height: 100%;
  background: var(--accent, #4a9eff);
}
.install-progress-fill.indeterminate {
  width: 30%;
  animation: install-slide 1.2s ease-in-out infinite;
}
@keyframes install-slide {
  0% { margin-left: 0; }
  50% { margin-left: 70%; }
  100% { margin-left: 0; }
}
.mt-05 {
  margin-top: 0.35rem;
}
.btn-account {
  background: var(--accent, #8b5cf6);
  color: #fff;
  border-color: var(--accent, #8b5cf6);
}
.btn-account:hover:not(:disabled) {
  opacity: 0.85;
}
.btn-account:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.btn-mode-standalone {
  background: var(--warning, #ff9800);
  color: #1a1a2e;
  border-color: var(--warning, #ff9800);
}
.btn-mode-standalone:hover:not(:disabled) {
  opacity: 0.85;
}
.btn-mode-multiplay {
  background: var(--success, #22c55e);
  color: #fff;
  border-color: var(--success, #22c55e);
}
.btn-mode-multiplay:hover:not(:disabled) {
  opacity: 0.85;
}
.btn-cancel-sm {
  padding: 0.05rem 0.4rem;
  font-size: 0.7rem;
  border: 1px solid var(--danger);
  color: var(--danger);
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
}
.btn-cancel-sm:hover {
  background: var(--danger);
  color: white;
}
.account-value {
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
