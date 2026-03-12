<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  hasDevices: boolean
  installing: boolean
  uploadProgress: number | null
}>()

const emit = defineEmits<{
  'file-selected': [file: File]
  'install-all': []
}>()

const fileName = ref('')
const dragging = ref(false)

function handleFile(file: File) {
  if (file.name.endsWith('.apk')) {
    fileName.value = file.name
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
</script>

<template>
  <div class="card">
    <div class="card-title">APK Installation</div>
    <div
      class="drop-zone"
      :class="{ dragging }"
      @dragover.prevent="dragging = true"
      @dragleave="dragging = false"
      @drop.prevent="onDrop"
    >
      <div v-if="fileName" style="font-weight: 500">{{ fileName }}</div>
      <div v-else style="color: var(--text-secondary)">
        Drop APK file here or click to select
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
        Uploading... {{ uploadProgress }}%
      </span>
      <button
        class="btn btn-primary"
        :disabled="!fileName || !hasDevices || installing"
        @click="$emit('install-all')"
      >
        <template v-if="uploadProgress != null && uploadProgress < 100">Uploading...</template>
        <template v-else-if="installing">Installing...</template>
        <template v-else>Install to All Devices</template>
      </button>
    </div>
  </div>
</template>

<style scoped>
.drop-zone {
  position: relative;
  border: 2px dashed var(--border);
  border-radius: var(--radius);
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.15s;
}
.drop-zone.dragging {
  border-color: var(--accent);
  background: rgba(59, 130, 246, 0.05);
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
