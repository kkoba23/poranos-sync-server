<script setup lang="ts">
import { useServerControl } from '@/composables/useServerControl'
import { useI18n } from '@/i18n'

const { t } = useI18n()
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
          <div style="font-weight: 600">{{ t('server.syncServer') }}</div>
          <div style="font-size: 0.8rem; color: var(--text-secondary)">
            {{ status.status }} &middot; {{ t('server.uptime') }}: {{ formatUptime(status.uptime_seconds) }}
          </div>
        </div>
      </div>
      <div class="flex gap-1">
        <button class="btn btn-success btn-sm" :disabled="loading || status.status === 'running'" @click="start">
          {{ t('server.start') }}
        </button>
        <button class="btn btn-danger btn-sm" :disabled="loading || status.status !== 'running'" @click="stop">
          {{ t('server.stop') }}
        </button>
        <button class="btn btn-warning btn-sm" :disabled="loading" @click="restart">
          {{ t('server.restart') }}
        </button>
      </div>
    </div>
  </div>
</template>
