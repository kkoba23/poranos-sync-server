<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from '@/i18n'

const { t } = useI18n()

defineProps<{
  hasDevices: boolean
  installing: boolean
  uploadProgress: number | null
}>()

const emit = defineEmits<{
  'file-selected': [file: File]
  'install-all': []
  'install-all-local': [path: string]
}>()

const fileName = ref('')
const localPath = ref('')
const dragging = ref(false)

const hasSelection = computed(() => !!localPath.value.trim() || !!fileName.value)

function handleFile(file: File) {
  if (file.name.endsWith('.apk')) {
    fileName.value = file.name
    localPath.value = ''
    emit('file-selected', file)
  }
}

function onDrop(e: DragEvent) {
  dragging.value = false
  const file = e.dataTransfer?.files[0]
  if (file) handleFile(file)
}

function onFileInput(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (file) handleFile(file)
}

function onLocalPathInput() {
  if (localPath.value.trim()) {
    fileName.value = ''
  }
}

function onInstallClick() {
  const path = localPath.value.trim()
  if (path) {
    emit('install-all-local', path)
  } else {
    emit('install-all')
  }
}
</script>

<template>
  <div class="card">
    <div class="card-title">{{ t('apk.title') }}</div>

    <!-- Local path input -->
    <div class="local-path-row">
      <label class="local-path-label">{{ t('apk.localPath') }}</label>
      <input
        v-model="localPath"
        type="text"
        class="local-path-input"
        :placeholder="t('apk.localPathPlaceholder')"
        @input="onLocalPathInput"
      />
    </div>

    <div class="separator">
      <span>{{ t('apk.or') }}</span>
    </div>

    <!-- Drop zone (existing) -->
    <div
      class="drop-zone"
      :class="{ dragging, dimmed: !!localPath.trim() }"
      @dragover.prevent="dragging = true"
      @dragleave="dragging = false"
      @drop.prevent="onDrop"
    >
      <div v-if="fileName" style="font-weight: 500">{{ fileName }}</div>
      <div v-else style="color: var(--text-secondary)">
        {{ t('apk.dropzone') }}
      </div>
      <input
        type="file"
        accept=".apk"
        class="file-input"
        @change="onFileInput"
      />
    </div>

    <div v-if="uploadProgress != null" class="progress-bar mt-1">
      <div
        class="progress-fill"
        :class="{ indeterminate: uploadProgress >= 100 }"
        :style="uploadProgress < 100 ? { width: uploadProgress + '%' } : {}"
      ></div>
    </div>
    <div class="flex gap-1 mt-1" style="justify-content: flex-end; align-items: center">
      <span v-if="uploadProgress != null && uploadProgress < 100" style="font-size: 0.8rem; color: var(--text-secondary)">
        {{ t('apk.uploading') }} {{ uploadProgress }}%
      </span>
      <button
        class="btn btn-primary"
        :disabled="!hasSelection || !hasDevices || installing"
        @click="onInstallClick"
      >
        <template v-if="uploadProgress != null && uploadProgress < 100">{{ t('apk.uploading') }}</template>
        <template v-else-if="installing">{{ t('apk.installingAll') }}</template>
        <template v-else>{{ t('apk.installAll') }}</template>
      </button>
    </div>
  </div>
</template>

<style scoped>
.local-path-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
.local-path-label {
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
  color: var(--text-secondary);
}
.local-path-input {
  flex: 1;
  padding: 0.4rem 0.6rem;
  font-size: 0.85rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg);
  color: var(--text);
  font-family: monospace;
}
.local-path-input::placeholder {
  color: var(--text-secondary);
  opacity: 0.6;
}
.separator {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0.5rem 0;
  color: var(--text-secondary);
  font-size: 0.75rem;
}
.separator::before,
.separator::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border);
}
.drop-zone {
  position: relative;
  border: 2px dashed var(--border);
  border-radius: var(--radius);
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.15s, opacity 0.15s;
}
.drop-zone.dragging {
  border-color: var(--accent);
  background: rgba(59, 130, 246, 0.05);
}
.drop-zone.dimmed {
  opacity: 0.4;
  pointer-events: none;
}
.file-input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}
.progress-bar {
  height: 6px;
  background: var(--border);
  border-radius: 3px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: var(--accent);
  transition: width 0.2s ease;
}
.progress-fill.indeterminate {
  width: 30%;
  animation: slide 1.2s ease-in-out infinite;
}
@keyframes slide {
  0% { margin-left: 0; }
  50% { margin-left: 70%; }
  100% { margin-left: 0; }
}
</style>
