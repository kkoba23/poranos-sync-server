<script setup lang="ts">
import { computed } from 'vue'
import type { InstallTask } from '@/types'
import { useI18n } from '@/i18n'

const { t } = useI18n()

const props = defineProps<{
  tasks: Map<string, InstallTask>
}>()

const emit = defineEmits<{
  cancel: [serial: string]
}>()

const taskList = computed(() => Array.from(props.tasks.values()).reverse())

function statusColor(status: string): string {
  switch (status) {
    case 'success': return 'var(--success)'
    case 'failed': return 'var(--danger)'
    case 'cancelled': return 'var(--warning, #f59e0b)'
    case 'installing': return 'var(--accent)'
    default: return 'var(--text-secondary)'
  }
}
</script>

<template>
  <div class="card mt-1" v-if="taskList.length > 0">
    <div class="card-title">{{ t('install.title') }}</div>
    <div class="task-list">
      <div v-for="task in taskList" :key="task.task_id" class="task-item">
        <div class="flex items-center justify-between">
          <div>
            <span style="font-weight: 500">{{ task.device_serial }}</span>
            <span style="margin-left: 0.5rem; font-size: 0.8rem; color: var(--text-secondary)">
              {{ task.apk_filename }}
            </span>
          </div>
          <div class="flex items-center" style="gap: 0.5rem">
            <span :style="{ color: statusColor(task.status), fontWeight: 500, fontSize: '0.85rem' }">
              {{ task.status }}
            </span>
            <button
              v-if="task.status === 'installing' || task.status === 'queued'"
              class="btn-cancel"
              @click="emit('cancel', task.device_serial)"
            >
              {{ t('device.cancel') }}
            </button>
          </div>
        </div>
        <div v-if="task.status === 'installing'" class="progress-bar mt-1">
          <div class="progress-fill indeterminate"></div>
        </div>
        <div v-if="task.message" style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.25rem">
          {{ task.message }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.task-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.task-item {
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--border);
}
.task-item:last-child {
  border-bottom: none;
}
.progress-bar {
  height: 4px;
  background: var(--border);
  border-radius: 2px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: var(--accent);
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
.btn-cancel {
  padding: 0.1rem 0.5rem;
  font-size: 0.75rem;
  border: 1px solid var(--danger);
  color: var(--danger);
  background: transparent;
  border-radius: var(--radius);
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.btn-cancel:hover {
  background: var(--danger);
  color: white;
}
</style>
