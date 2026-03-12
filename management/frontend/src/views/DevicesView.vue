<script setup lang="ts">
import { ref, computed } from 'vue'
import DeviceList from '@/components/devices/DeviceList.vue'
import ApkUploader from '@/components/devices/ApkUploader.vue'
import ApkReleaseInstaller from '@/components/devices/ApkReleaseInstaller.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'
import { useDevices } from '@/composables/useDevices'
import { useAuthStore } from '@/stores/authStore'
import { post, proxyPost } from '@/api/client'

const { devices, installTasks, connected, launchApp, stopApp, cancelInstall, rebootDevice, rebootAll } = useDevices()
const authStore = useAuthStore()
const selectedFile = ref<File | null>(null)
const rebooting = ref(false)
const showRebootAllConfirm = ref(false)
const uploadProgress = ref<number | null>(null)
const notifyMessage = ref('')

// Install tab: 'release' (poranos.com) or 'manual' (local APK file)
const installTab = ref<'release' | 'manual'>('release')
const releaseInstallerRef = ref<InstanceType<typeof ApkReleaseInstaller>>()

const anyInstalling = computed(() =>
  uploadProgress.value != null ||
  Array.from(installTasks.value.values()).some(t => t.status === 'queued' || t.status === 'installing')
)

const canInstallOnDevice = computed(() => {
  if (anyInstalling.value) return false
  if (installTab.value === 'release') {
    return !!releaseInstallerRef.value?.latestRelease
  }
  return !!selectedFile.value
})

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

async function onManualInstall(serial: string) {
  if (!selectedFile.value) return
  uploadProgress.value = 0
  try {
    const task = await uploadApk<any>(`/api/devices/${serial}/install`, selectedFile.value)
    installTasks.value.set(task.task_id, task)
  } finally {
    uploadProgress.value = null
  }
}

async function onManualInstallAll() {
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

async function onDeviceInstall(serial: string) {
  if (installTab.value === 'release') {
    const latest = releaseInstallerRef.value?.latestRelease
    if (!latest) {
      notifyMessage.value = 'リリースが見つかりません。Refreshしてください'
      return
    }
    try {
      const task = await proxyPost<any>(`/api/poranos/releases/${latest.id}/install/${encodeURIComponent(serial)}`)
      installTasks.value.set(task.task_id, task)
    } catch (e: any) {
      notifyMessage.value = `インストール失敗: ${e.message}`
    }
  } else {
    await onManualInstall(serial)
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

function onReleaseTasks(tasks: any[]) {
  for (const task of tasks) {
    installTasks.value.set(task.task_id, task)
  }
}

async function onAccountChange(_serial: string, room: string, clientId: number) {
  const email = authStore.userEmail
  if (!email) {
    notifyMessage.value = 'Management UIにログインしてください'
    return
  }
  if (!room || !clientId) {
    notifyMessage.value = 'デバイスがSync Serverに接続されていません'
    return
  }
  try {
    await post('/api/remote/command', {
      room_name: room,
      command: 'change_account',
      params: { email, target_client_id: clientId },
    })
  } catch (e: any) {
    notifyMessage.value = `アカウント設定に失敗しました: ${e.message}`
  }
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-1">
      <h1 class="page-title">Devices</h1>
      <div class="flex items-center" style="gap: 0.75rem">
        <button
          class="btn btn-warning btn-sm"
          :disabled="devices.length === 0 || rebooting"
          @click="showRebootAllConfirm = true"
        >
          {{ rebooting ? 'Rebooting...' : 'Reboot All' }}
        </button>
        <span :style="{ color: connected ? 'var(--success)' : 'var(--danger)' }">
          {{ connected ? 'Live' : 'Disconnected' }}
        </span>
      </div>
    </div>

    <!-- Install tabs -->
    <div class="install-tabs">
      <button
        class="tab-btn"
        :class="{ active: installTab === 'release' }"
        @click="installTab = 'release'"
      >
        APK FROM PORANOS.COM
      </button>
      <button
        class="tab-btn"
        :class="{ active: installTab === 'manual' }"
        @click="installTab = 'manual'"
      >
        APK INSTALLATION
      </button>
    </div>

    <ApkReleaseInstaller
      v-show="installTab === 'release'"
      ref="releaseInstallerRef"
      :devices="devices"
      :install-tasks="installTasks"
      @release-tasks="onReleaseTasks"
    />

    <ApkUploader
      v-show="installTab === 'manual'"
      :has-devices="devices.length > 0"
      :installing="anyInstalling"
      :upload-progress="uploadProgress"
      @file-selected="onFileSelected"
      @install-all="onManualInstallAll"
    />

    <DeviceList
      :devices="devices"
      :can-install="canInstallOnDevice"
      :install-tasks="installTasks"
      :user-email="authStore.userEmail || undefined"
      @install="onDeviceInstall"
      @launch="(serial: string) => launchApp(serial)"
      @stop="(serial: string) => stopApp(serial)"
      @cancel-install="cancelInstall"
      @reboot="(serial: string) => rebootDevice(serial)"
      @account-change="onAccountChange"
    />

    <ConfirmModal
      v-if="notifyMessage"
      title="通知"
      :message="notifyMessage"
      confirm-label="OK"
      confirm-class="btn-primary"
      hide-cancel
      @confirm="notifyMessage = ''"
      @cancel="notifyMessage = ''"
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
.install-tabs {
  display: flex;
  gap: 0;
  margin-bottom: 0;
}
.tab-btn {
  flex: 1;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  border: 1px solid var(--border, #333);
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.15s;
}
.tab-btn:first-child {
  border-radius: var(--radius, 6px) 0 0 0;
}
.tab-btn:last-child {
  border-radius: 0 var(--radius, 6px) 0 0;
  border-left: none;
}
.tab-btn.active {
  background: var(--bg-secondary, #1e293b);
  color: var(--text);
  border-bottom-color: var(--bg-secondary, #1e293b);
}
.tab-btn:hover:not(.active) {
  background: rgba(255,255,255,0.03);
}
</style>
