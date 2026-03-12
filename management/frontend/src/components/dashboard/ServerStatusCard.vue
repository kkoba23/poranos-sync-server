<script setup lang="ts">
import { useServerControl } from '@/composables/useServerControl'

const { status, loading, start, stop, restart } = useServerControl()

function formatUptime(seconds?: number): string {
  if (!seconds) return '-'
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  return `${h}h ${m}m ${s}s`
}
</script>

<template>
  <div class="card mb-1">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-1">
        <span class="status-dot" :class="status.status"></span>
        <div>
          <div style="font-weight: 600">Sync Server</div>
          <div style="font-size: 0.8rem; color: var(--text-secondary)">
            {{ status.status }} &middot; Uptime: {{ formatUptime(status.uptime_seconds) }}
          </div>
        </div>
      </div>
      <div class="flex gap-1">
        <button class="btn btn-success btn-sm" :disabled="loading || status.status === 'running'" @click="start">
          Start
        </button>
        <button class="btn btn-danger btn-sm" :disabled="loading || status.status !== 'running'" @click="stop">
          Stop
        </button>
        <button class="btn btn-warning btn-sm" :disabled="loading" @click="restart">
          Restart
        </button>
      </div>
    </div>
  </div>
</template>
