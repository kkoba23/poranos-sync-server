<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { proxyGet, proxyPost } from '@/api/client'
import type { AppRelease, Device, InstallTask } from '@/types'

const props = defineProps<{
  devices: Device[]
  installTasks: Map<string, InstallTask>
}>()

const emit = defineEmits<{
  'release-tasks': [tasks: InstallTask[]]
}>()

const releases = ref<AppRelease[]>([])
const loading = ref(false)
const error = ref('')
const installingReleaseId = ref<number | null>(null)
const downloadingReleaseId = ref<number | null>(null)

const latestRelease = computed(() => releases.value.length > 0 ? releases.value[0] : null)

const hasUpdateAvailable = computed(() => {
  if (!latestRelease.value) return false
  const latestVersion = latestRelease.value.version
  return props.devices.some(d =>
    d.status === 'device' && d.app_installed && d.app_version && d.app_version !== latestVersion
  )
})

const devicesNeedingUpdate = computed(() => {
  if (!latestRelease.value) return 0
  const latestVersion = latestRelease.value.version
  return props.devices.filter(d =>
    d.status === 'device' && d.app_installed && d.app_version && d.app_version !== latestVersion
  ).length
})

const isInstalling = computed(() =>
  installingReleaseId.value !== null ||
  Array.from(props.installTasks.values()).some(t => t.status === 'queued' || t.status === 'installing')
)

async function fetchReleases() {
  loading.value = true
  error.value = ''
  try {
    const result = await proxyGet<{ source: string; data: AppRelease[] }>('/api/poranos/releases')
    releases.value = result.data
  } catch (e: any) {
    error.value = e.message || 'Failed to fetch releases'
  } finally {
    loading.value = false
  }
}

async function installRelease(releaseId: number, serial?: string) {
  installingReleaseId.value = releaseId
  try {
    if (serial) {
      const task = await proxyPost<InstallTask>(`/api/poranos/releases/${releaseId}/install/${encodeURIComponent(serial)}`)
      emit('release-tasks', [task])
    } else {
      const result = await proxyPost<{ tasks: InstallTask[] }>(`/api/poranos/releases/${releaseId}/install-all`)
      emit('release-tasks', result.tasks)
    }
  } catch (e: any) {
    error.value = e.message || 'Install failed'
  } finally {
    installingReleaseId.value = null
  }
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
}

onMounted(fetchReleases)

defineExpose({ latestRelease, installRelease, isInstalling })
</script>

<template>
  <div class="card">
    <div class="flex items-center justify-between">
      <div class="card-title" style="margin: 0">
        APK from Poranos.com
      </div>
      <button class="btn btn-secondary btn-sm" :disabled="loading" @click="fetchReleases">
        {{ loading ? 'Loading...' : 'Refresh' }}
      </button>
    </div>

    <div v-if="error" class="error-msg mt-1">{{ error }}</div>

    <div v-if="releases.length === 0 && !loading && !error" class="empty-msg mt-1">
      No releases available
    </div>

    <!-- Update notification banner -->
    <div v-if="hasUpdateAvailable && latestRelease" class="update-banner mt-1">
      <div class="update-banner-text">
        <span class="update-icon">&#x2B06;</span>
        New version available: <strong>v{{ latestRelease.version }}</strong>
        <span class="update-count">({{ devicesNeedingUpdate }} device{{ devicesNeedingUpdate > 1 ? 's' : '' }} need update)</span>
      </div>
      <button
        class="btn btn-primary btn-sm"
        :disabled="isInstalling || devices.length === 0"
        @click="installRelease(latestRelease.id)"
      >
        {{ installingReleaseId === latestRelease.id ? 'Installing...' : 'Update All Devices' }}
      </button>
    </div>

    <!-- Release list -->
    <div v-if="releases.length > 0" class="release-list mt-1">
      <div
        v-for="release in releases"
        :key="release.id"
        class="release-item"
        :class="{ latest: release === latestRelease }"
      >
        <div class="release-info">
          <div class="release-header">
            <span class="release-version">v{{ release.version }}</span>
            <span v-if="release === latestRelease" class="latest-badge">Latest</span>
          </div>
          <div class="release-meta">
            <span>{{ release.file_name }}</span>
            <span v-if="release.created_at" class="release-date">{{ formatDate(release.created_at) }}</span>
          </div>
          <div v-if="release.notes" class="release-notes">{{ release.notes }}</div>
        </div>
        <div class="release-actions">
          <button
            class="btn btn-primary btn-sm"
            :disabled="isInstalling || devices.length === 0"
            @click="installRelease(release.id)"
          >
            {{ installingReleaseId === release.id ? 'Installing...' : 'Install All' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error-msg {
  color: var(--danger);
  font-size: 0.85rem;
}
.empty-msg {
  color: var(--text-secondary);
  font-size: 0.85rem;
  text-align: center;
  padding: 1rem;
}
.update-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 0.8rem;
  background: rgba(74, 158, 255, 0.1);
  border: 1px solid var(--accent, #4a9eff);
  border-radius: var(--radius, 6px);
  gap: 0.75rem;
}
.update-banner-text {
  font-size: 0.85rem;
  color: var(--accent, #4a9eff);
}
.update-icon {
  margin-right: 0.25rem;
}
.update-count {
  color: var(--text-secondary);
  font-size: 0.8rem;
  margin-left: 0.25rem;
}
.release-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.release-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--border, #333);
  gap: 0.75rem;
}
.release-item:last-child {
  border-bottom: none;
}
.release-info {
  flex: 1;
  min-width: 0;
}
.release-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.release-version {
  font-weight: 600;
  font-size: 0.9rem;
}
.latest-badge {
  font-size: 0.6rem;
  font-weight: 700;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  background: var(--success, #22c55e);
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}
.release-meta {
  font-size: 0.75rem;
  color: var(--text-secondary);
  display: flex;
  gap: 0.75rem;
  margin-top: 0.15rem;
}
.release-date {
  flex-shrink: 0;
}
.release-notes {
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-top: 0.25rem;
  white-space: pre-line;
}
.release-actions {
  flex-shrink: 0;
}
</style>
