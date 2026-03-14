<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useFilesLibraryStore, type DownloadTask } from '@/stores/filesLibraryStore'
import { useI18n } from '@/i18n'

const { t } = useI18n()
const auth = useAuthStore()
const store = useFilesLibraryStore()

const expandedExt = ref<string | null>(null)

onMounted(() => {
  if (auth.userEmail) {
    store.loadFiles(auth.userEmail)
  }
  store.loadQuestFiles()
  store.connectWs()
})

onUnmounted(() => {
  store.disconnectWs()
})

function toggleExpand(ext: string) {
  expandedExt.value = expandedExt.value === ext ? null : ext
}

function formatSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
  return (bytes / Math.pow(1024, i)).toFixed(i > 0 ? 1 : 0) + ' ' + units[i]
}

function taskStatusClass(task: DownloadTask): string {
  switch (task.status) {
    case 'downloading':
      return 'status-downloading'
    case 'completed':
      return 'status-completed'
    case 'failed':
      return 'status-failed'
    case 'aborted':
      return 'status-aborted'
    default:
      return 'status-pending'
  }
}

// Active download tasks sorted by recency
const activeDownloads = computed(() => {
  return [...store.tasks.values()]
    .filter((t) => t.status === 'pending' || t.status === 'downloading')
    .sort((a, b) => a.file_name.localeCompare(b.file_name))
})

// Recently finished tasks (last 10)
const recentTasks = computed(() => {
  return [...store.tasks.values()]
    .filter((t) => t.status === 'completed' || t.status === 'failed' || t.status === 'aborted')
    .slice(-10)
    .reverse()
})
</script>

<template>
  <div class="files-view">
    <div class="files-header">
      <h1>{{ t('files.title') }}</h1>
      <span v-if="auth.userEmail" class="files-email">{{ auth.userEmail }}</span>
      <button
        v-if="!store.loading"
        class="btn-refresh"
        @click="auth.userEmail && store.loadFiles(auth.userEmail)"
      >
        {{ t('files.refresh') }}
      </button>
    </div>

    <!-- Loading -->
    <div v-if="store.loading" class="files-loading">{{ t('files.loading') }}</div>

    <!-- Error -->
    <div v-else-if="store.error" class="files-error">{{ store.error }}</div>

    <!-- Content -->
    <template v-else-if="store.files.length > 0">
      <!-- Summary bar -->
      <div class="summary-bar">
        <span class="summary-total">
          {{ t('files.summary', { total: store.totalFiles, downloaded: store.downloadedFiles }) }}
        </span>
        <div class="summary-actions">
          <button
            v-if="store.downloadedFiles < store.totalFiles"
            class="btn-download-all"
            :disabled="store.hasActiveDownloads"
            @click="store.downloadAll()"
          >
            {{ t('files.downloadAll') }}
          </button>
          <button
            v-if="store.hasActiveDownloads"
            class="btn-abort-all"
            @click="store.abortAll()"
          >
            {{ t('files.abortAll') }}
          </button>
        </div>
      </div>

      <!-- Quest device selector -->
      <div class="quest-bar">
        <span class="quest-label">{{ t('files.quest') }}</span>
        <select
          v-if="store.questDeviceNames.length > 0"
          v-model="store.selectedQuestDevice"
          class="quest-select"
        >
          <option v-for="name in store.questDeviceNames" :key="name" :value="name">
            {{ name }}
          </option>
        </select>
        <span v-else class="quest-none">{{ t('files.noDevices') }}</span>
        <span v-if="store.selectedQuestDevice" class="quest-count">
          {{ t('files.filesOnDevice', { count: store.selectedQuestFileIds.size }) }}
        </span>
        <button
          class="btn-refresh-quest"
          :disabled="store.questLoading"
          @click="store.loadQuestFiles()"
        >
          {{ store.questLoading ? '...' : t('files.scan') }}
        </button>
      </div>

      <!-- Extension groups -->
      <div class="ext-groups">
        <div
          v-for="group in store.extensionGroups"
          :key="group.extension"
          class="ext-group"
        >
          <div class="ext-header" @click="toggleExpand(group.extension)">
            <span class="ext-chevron">{{ expandedExt === group.extension ? '&#9660;' : '&#9654;' }}</span>
            <span class="ext-name">.{{ group.extension }}</span>
            <span class="ext-count">{{ group.downloaded }}/{{ group.total }}</span>
            <span v-if="store.selectedQuestDevice" class="ext-quest-count" :class="{ 'quest-complete': group.onQuest === group.total }">
              Q:{{ group.onQuest }}
            </span>
            <span class="ext-size">{{ formatSize(group.totalSize) }}</span>
            <div class="ext-bar-container">
              <div
                class="ext-bar-fill"
                :style="{ width: group.total > 0 ? (group.downloaded / group.total * 100) + '%' : '0%' }"
                :class="{ complete: group.downloaded === group.total }"
              />
            </div>
            <button
              v-if="group.downloaded < group.total"
              class="btn-ext-download"
              :disabled="store.hasActiveDownloads"
              @click.stop="store.downloadByExtension(group.extension)"
            >
              DL
            </button>
            <span v-else class="ext-check">&#10003;</span>
          </div>

          <!-- Expanded file list -->
          <div v-if="expandedExt === group.extension" class="ext-files">
            <div
              v-for="file in group.files"
              :key="file.id"
              class="file-row"
              :class="{ downloaded: file.is_downloaded }"
            >
              <span class="file-name" :title="file.name">{{ file.name }}</span>
              <span class="file-size">{{ formatSize(file.file_size) }}</span>
              <span v-if="store.selectedQuestDevice" class="file-quest-status" :class="{ 'on-quest': store.isOnQuest(file.id) }">
                {{ store.isOnQuest(file.id) ? 'Q' : '-' }}
              </span>
              <template v-if="file.is_downloaded">
                <span class="file-status-ok">&#10003;</span>
              </template>
              <template v-else>
                <template v-if="store.getTaskForFile(file.id)">
                  <span class="file-task-status" :class="taskStatusClass(store.getTaskForFile(file.id)!)">
                    {{ store.getTaskForFile(file.id)!.status }}
                  </span>
                </template>
                <button
                  v-else
                  class="btn-file-download"
                  :disabled="store.hasActiveDownloads && !store.getTaskForFile(file.id)"
                  @click="store.downloadFile(file)"
                >
                  DL
                </button>
              </template>
            </div>
          </div>
        </div>
      </div>

      <!-- Active downloads panel -->
      <div v-if="activeDownloads.length > 0" class="downloads-panel">
        <h2>{{ t('files.downloading') }}</h2>
        <div v-for="task in activeDownloads" :key="task.task_id" class="download-item">
          <div class="download-info">
            <span class="download-name">{{ task.file_name }}</span>
            <span class="download-pct">{{ Math.round(task.progress * 100) }}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: (task.progress * 100) + '%' }" />
          </div>
          <div class="download-meta">
            <span class="download-bytes">{{ formatSize(task.downloaded_bytes) }} / {{ formatSize(task.file_size) }}</span>
            <button class="btn-abort" @click="store.abortTask(task.task_id)">{{ t('files.abort') }}</button>
          </div>
        </div>
      </div>

      <!-- Recent tasks -->
      <div v-if="recentTasks.length > 0" class="recent-panel">
        <h2>{{ t('files.recent') }}</h2>
        <div v-for="task in recentTasks" :key="task.task_id" class="recent-item">
          <span class="recent-name">{{ task.file_name }}</span>
          <span class="recent-status" :class="taskStatusClass(task)">{{ task.status }}</span>
          <span v-if="task.error" class="recent-error">{{ task.error }}</span>
        </div>
      </div>
    </template>

    <!-- Empty state -->
    <div v-else class="files-empty">
      <template v-if="auth.isAuthenticated">
        {{ t('files.noFiles') }}
      </template>
      <template v-else>
        {{ t('files.loginRequired') }}
      </template>
    </div>
  </div>
</template>

<style scoped>
.files-view {
  padding: 20px;
  max-width: 900px;
  color: var(--text);
}

.files-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}
.files-header h1 {
  font-size: 1.4rem;
  margin: 0;
}
.files-email {
  color: var(--text-muted);
  font-size: 0.85rem;
}
.btn-refresh {
  margin-left: auto;
  padding: 4px 12px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: transparent;
  color: var(--text);
  cursor: pointer;
}
.btn-refresh:hover {
  background: var(--bg-hover);
}

.files-loading,
.files-error,
.files-empty {
  padding: 40px 0;
  text-align: center;
  color: var(--text-muted);
}
.files-error {
  color: #f55;
}

/* Summary bar */
.summary-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: var(--bg-surface);
  border-radius: 6px;
  margin-bottom: 12px;
}
.summary-total {
  font-size: 0.9rem;
  color: var(--text-muted);
}
.summary-actions {
  display: flex;
  gap: 8px;
}
.btn-download-all {
  padding: 4px 14px;
  border: 1px solid #4a9;
  border-radius: 4px;
  background: transparent;
  color: #4a9;
  cursor: pointer;
  font-size: 0.85rem;
}
.btn-download-all:hover:not(:disabled) {
  background: rgba(68, 170, 153, 0.15);
}
.btn-download-all:disabled {
  opacity: 0.4;
  cursor: default;
}
.btn-abort-all {
  padding: 4px 14px;
  border: 1px solid #f55;
  border-radius: 4px;
  background: transparent;
  color: #f55;
  cursor: pointer;
  font-size: 0.85rem;
}
.btn-abort-all:hover {
  background: rgba(255, 85, 85, 0.15);
}

/* Quest device bar */
.quest-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 12px;
  background: var(--bg-surface);
  border-radius: 6px;
  margin-bottom: 12px;
  font-size: 0.85rem;
}
.quest-label {
  font-weight: 600;
  color: var(--text-muted);
}
.quest-select {
  padding: 2px 8px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: var(--bg);
  color: var(--text);
  font-size: 0.85rem;
}
.quest-none {
  color: var(--text-muted);
  font-style: italic;
}
.quest-count {
  color: #a8f;
  font-size: 0.8rem;
}
.btn-refresh-quest {
  margin-left: auto;
  padding: 2px 10px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: transparent;
  color: var(--text);
  cursor: pointer;
  font-size: 0.8rem;
}
.btn-refresh-quest:hover:not(:disabled) {
  background: var(--bg-hover);
}
.btn-refresh-quest:disabled {
  opacity: 0.4;
  cursor: default;
}

/* Extension groups */
.ext-groups {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.ext-group {
  border: 1px solid var(--border);
  border-radius: 6px;
  overflow: hidden;
}
.ext-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  cursor: pointer;
  user-select: none;
}
.ext-header:hover {
  background: var(--bg-hover);
}
.ext-chevron {
  font-size: 0.7rem;
  width: 12px;
  color: var(--text-muted);
}
.ext-name {
  font-weight: 600;
  min-width: 60px;
}
.ext-count {
  font-size: 0.85rem;
  color: var(--text-muted);
  min-width: 50px;
}
.ext-size {
  font-size: 0.8rem;
  color: var(--text-muted);
  min-width: 70px;
  text-align: right;
}
.ext-bar-container {
  flex: 1;
  height: 6px;
  background: var(--bg-surface);
  border-radius: 3px;
  overflow: hidden;
  min-width: 60px;
}
.ext-bar-fill {
  height: 100%;
  background: #4a9;
  border-radius: 3px;
  transition: width 0.3s ease;
}
.ext-bar-fill.complete {
  background: #4a9;
}
.btn-ext-download {
  padding: 2px 10px;
  border: 1px solid #4a9;
  border-radius: 4px;
  background: transparent;
  color: #4a9;
  cursor: pointer;
  font-size: 0.8rem;
}
.btn-ext-download:hover:not(:disabled) {
  background: rgba(68, 170, 153, 0.15);
}
.btn-ext-download:disabled {
  opacity: 0.4;
  cursor: default;
}
.ext-quest-count {
  font-size: 0.8rem;
  color: #a8f;
  min-width: 36px;
}
.ext-quest-count.quest-complete {
  color: #8f8;
}
.ext-check {
  color: #4a9;
  font-size: 1rem;
}

/* Expanded file list */
.ext-files {
  border-top: 1px solid var(--border);
  max-height: 300px;
  overflow-y: auto;
}
.file-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 4px 12px 4px 34px;
  font-size: 0.85rem;
}
.file-row:hover {
  background: var(--bg-hover);
}
.file-row.downloaded {
  opacity: 0.6;
}
.file-name {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.file-size {
  color: var(--text-muted);
  min-width: 60px;
  text-align: right;
  font-size: 0.8rem;
}
.file-quest-status {
  font-size: 0.75rem;
  color: var(--text-muted);
  min-width: 16px;
  text-align: center;
}
.file-quest-status.on-quest {
  color: #a8f;
  font-weight: 600;
}
.file-status-ok {
  color: #4a9;
}
.btn-file-download {
  padding: 1px 8px;
  border: 1px solid var(--border);
  border-radius: 3px;
  background: transparent;
  color: var(--text);
  cursor: pointer;
  font-size: 0.75rem;
}
.btn-file-download:hover:not(:disabled) {
  border-color: #4a9;
  color: #4a9;
}
.btn-file-download:disabled {
  opacity: 0.3;
  cursor: default;
}
.file-task-status {
  font-size: 0.75rem;
  padding: 1px 6px;
  border-radius: 3px;
}

/* Status colors */
.status-downloading {
  color: #4af;
}
.status-completed {
  color: #4a9;
}
.status-failed {
  color: #f55;
}
.status-aborted {
  color: #fa5;
}
.status-pending {
  color: var(--text-muted);
}

/* Downloads panel */
.downloads-panel {
  margin-top: 20px;
  padding: 12px;
  background: var(--bg-surface);
  border-radius: 6px;
}
.downloads-panel h2 {
  font-size: 1rem;
  margin: 0 0 10px;
}
.download-item {
  margin-bottom: 10px;
}
.download-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  margin-bottom: 4px;
}
.download-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
}
.download-pct {
  font-weight: 600;
  margin-left: 8px;
  color: #4af;
}
.progress-bar {
  height: 8px;
  background: var(--border);
  border-radius: 4px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: #4af;
  border-radius: 4px;
  transition: width 0.3s ease;
}
.download-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4px;
  font-size: 0.8rem;
}
.download-bytes {
  color: var(--text-muted);
}
.btn-abort {
  padding: 2px 10px;
  border: 1px solid #f55;
  border-radius: 3px;
  background: transparent;
  color: #f55;
  cursor: pointer;
  font-size: 0.75rem;
}
.btn-abort:hover {
  background: rgba(255, 85, 85, 0.15);
}

/* Recent panel */
.recent-panel {
  margin-top: 16px;
  padding: 12px;
  background: var(--bg-surface);
  border-radius: 6px;
}
.recent-panel h2 {
  font-size: 1rem;
  margin: 0 0 8px;
}
.recent-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.8rem;
  padding: 2px 0;
}
.recent-name {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.recent-status {
  font-size: 0.75rem;
  padding: 1px 6px;
  border-radius: 3px;
}
.recent-error {
  color: #f55;
  font-size: 0.75rem;
}
</style>
