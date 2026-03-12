<script setup lang="ts">
import { ref, computed } from 'vue'
import DeviceList from '@/components/devices/DeviceList.vue'
import ApkUploader from '@/components/devices/ApkUploader.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'
import { useDevices } from '@/composables/useDevices'

const { devices, installTasks, connected, launchApp, launchAll, stopApp, stopAll, cancelInstall, rebootDevice, rebootAll, sendKeyevent } = useDevices()
const selectedFile = ref<File | null>(null)
const launching = ref(false)
const stopping = ref(false)
const rebooting = ref(false)
const showRebootAllConfirm = ref(false)
const uploadProgress = ref<number | null>(null)

// Master volume control
const masterVolume = ref(9)
const applyingVolume = ref(false)

async function onApplyVolume() {
  applyingVolume.value = true
  try {
    await setAllVolumes(masterVolume.value)
  } finally {
    applyingVolume.value = false
  }
}

async function setAllVolumes(volume: number) {
  const activeDevices = devices.value.filter(d => d.status === 'device')
  await Promise.all(activeDevices.map(d => {
    const serial = d.adb_serial || d.serial
    return fetch(`/api/devices/${encodeURIComponent(serial)}/volume`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ volume }),
    }).catch(() => {})
  }))
}

const installing = computed(() =>
  uploadProgress.value != null ||
  Array.from(installTasks.value.values()).some(t => t.status === 'queued' || t.status === 'installing')
)

function onFileSelected(file: File) {
  selectedFile.value = file
}

function uploadApk<T>(url: string, file: File): Promise<T> {
  return new Promise((resolve, reject) => {
    const form = new FormData()
    form.append('apk', file)
    const xhr = new XMLHttpRequest()
    xhr.open('POST', url)
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        uploadProgress.value = Math.round((e.loaded / e.total) * 100)
      }
    }
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText))
      } else {
        reject(new Error(`Upload failed: ${xhr.status}`))
      }
    }
    xhr.onerror = () => reject(new Error('Upload failed'))
    xhr.send(form)
  })
}

async function onInstall(serial: string) {
  if (!selectedFile.value) return
  uploadProgress.value = 0
  try {
    const task = await uploadApk<any>(`/api/devices/${serial}/install`, selectedFile.value)
    installTasks.value.set(task.task_id, task)
  } finally {
    uploadProgress.value = null
  }
}

async function onInstallAll() {
  if (!selectedFile.value) return
  uploadProgress.value = 0
  try {
    const result = await uploadApk<{ tasks: any[] }>('/api/devices/install-all', selectedFile.value)
    for (const task of result.tasks) {
      installTasks.value.set(task.task_id, task)
    }
  } finally {
    uploadProgress.value = null
  }
}

async function onLaunchAll() {
  launching.value = true
  try {
    await launchAll()
  } finally {
    launching.value = false
  }
}

async function onStopAll() {
  stopping.value = true
  try {
    await stopAll()
  } finally {
    stopping.value = false
  }
}

async function onRebootAll() {
  rebooting.value = true
  try {
    await rebootAll()
  } finally {
    rebooting.value = false
  }
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-1">
      <h1 class="page-title">Devices</h1>
      <span :style="{ color: connected ? 'var(--success)' : 'var(--danger)' }">
        {{ connected ? 'Live' : 'Disconnected' }}
      </span>
    </div>

    <div class="card mb-1">
      <div class="flex items-center justify-between">
        <div class="card-title" style="margin: 0">App Control</div>
        <div class="flex items-center" style="gap: 0.5rem">
          <button
            class="btn btn-success"
            :disabled="devices.length === 0 || launching"
            @click="onLaunchAll"
          >
            {{ launching ? 'Launching...' : 'Launch All' }}
          </button>
          <button
            class="btn btn-danger"
            :disabled="devices.length === 0 || stopping"
            @click="onStopAll"
          >
            {{ stopping ? 'Stopping...' : 'Stop All' }}
          </button>
          <button
            class="btn btn-warning"
            :disabled="devices.length === 0 || rebooting"
            @click="showRebootAllConfirm = true"
          >
            {{ rebooting ? 'Rebooting...' : 'Reboot All' }}
          </button>
        </div>
      </div>
      <div class="master-volume" v-if="devices.length > 0">
        <div style="flex: 1"></div>
        <span class="master-volume-label">All Volume</span>
        <input
          type="range"
          class="master-volume-slider"
          :min="0"
          :max="15"
          v-model.number="masterVolume"
        />
        <span class="master-volume-value">{{ masterVolume }}</span>
        <button
          class="btn btn-primary btn-sm"
          :disabled="applyingVolume"
          @click="onApplyVolume"
        >
          {{ applyingVolume ? '...' : 'Apply' }}
        </button>
      </div>
    </div>

    <ApkUploader
      :has-devices="devices.length > 0"
      :installing="installing"
      :upload-progress="uploadProgress"
      @file-selected="onFileSelected"
      @install-all="onInstallAll"
    />

    <DeviceList
      :devices="devices"
      :selected-file="selectedFile"
      :installing="installing"
      :install-tasks="installTasks"
      @install="onInstall"
      @launch="(serial: string) => launchApp(serial)"
      @stop="(serial: string) => stopApp(serial)"
      @cancel-install="cancelInstall"
      @reboot="(serial: string) => rebootDevice(serial)"
      @menu="(serial: string) => sendKeyevent(serial, 3)"
    />

    <ConfirmModal
      v-if="showRebootAllConfirm"
      title="Reboot All Devices"
      :message="`接続中の全デバイス（${devices.length}台）を再起動しますか？`"
      confirm-label="Reboot All"
      confirm-class="btn-warning"
      :loading="rebooting"
      @confirm="onRebootAll(); showRebootAllConfirm = false"
      @cancel="showRebootAllConfirm = false"
    />
  </div>
</template>

<style scoped>
.master-volume {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border, #333);
}
.master-volume-label {
  color: var(--text-secondary);
  font-size: 0.85rem;
  flex-shrink: 0;
}
.master-volume-slider {
  width: 200px;
  height: 6px;
  -webkit-appearance: none;
  appearance: none;
  background: var(--border, #444);
  border-radius: 3px;
  outline: none;
  cursor: pointer;
}
.master-volume-slider::-webkit-slider-runnable-track {
  height: 6px;
  border-radius: 3px;
}
.master-volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--primary, #4a9eff);
  border: 2px solid #fff;
  cursor: pointer;
  margin-top: -7px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
}
.master-volume-slider::-moz-range-track {
  height: 6px;
  background: var(--border, #444);
  border-radius: 3px;
}
.master-volume-slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--primary, #4a9eff);
  border: 2px solid #fff;
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
}
.master-volume-value {
  font-family: monospace;
  font-size: 0.9rem;
  min-width: 1.5em;
  text-align: right;
}
</style>
