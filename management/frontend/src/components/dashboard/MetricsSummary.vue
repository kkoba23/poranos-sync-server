<script setup lang="ts">
import { useI18n } from '@/i18n'
import type { MetricsSnapshot } from '@/types'

const { t } = useI18n()

const props = defineProps<{
  metrics: MetricsSnapshot | null
}>()
</script>

<template>
  <div class="grid-4 mt-1">
    <div class="card">
      <div class="card-title">{{ t('metrics.clients') }}</div>
      <div class="kpi-value">{{ metrics?.clients_total ?? 0 }}</div>
      <div class="kpi-label">{{ t('metrics.inRooms', { count: metrics?.connections?.current ?? 0 }) }}</div>
    </div>
    <div class="card">
      <div class="card-title">{{ t('metrics.rooms') }}</div>
      <div class="kpi-value">{{ metrics?.rooms?.count ?? 0 }}</div>
      <div class="kpi-label">{{ t('metrics.active') }}</div>
    </div>
    <div class="card">
      <div class="card-title">{{ t('metrics.messages') }}</div>
      <div class="kpi-value">{{ metrics?.messages?.total?.toLocaleString() ?? 0 }}</div>
      <div class="kpi-label">{{ t('metrics.totalProcessed') }}</div>
    </div>
    <div class="card">
      <div class="card-title">{{ t('metrics.avgLatency') }}</div>
      <div class="kpi-value">{{ metrics?.client_rtt_ms?.avg?.toFixed(1) ?? '-' }}</div>
      <div class="kpi-label">{{ t('metrics.clientRtt') }}</div>
    </div>
  </div>
</template>
