<script setup lang="ts">
import type { MetricsSnapshot } from '@/types'

const props = defineProps<{
  metrics: MetricsSnapshot | null
}>()
</script>

<template>
  <div class="grid-4 mt-1">
    <div class="card">
      <div class="card-title">Clients</div>
      <div class="kpi-value">{{ metrics?.clients_total ?? 0 }}</div>
      <div class="kpi-label">in rooms ({{ metrics?.connections?.current ?? 0 }} ws)</div>
    </div>
    <div class="card">
      <div class="card-title">Rooms</div>
      <div class="kpi-value">{{ metrics?.rooms?.count ?? 0 }}</div>
      <div class="kpi-label">active</div>
    </div>
    <div class="card">
      <div class="card-title">Messages</div>
      <div class="kpi-value">{{ metrics?.messages?.total?.toLocaleString() ?? 0 }}</div>
      <div class="kpi-label">total processed</div>
    </div>
    <div class="card">
      <div class="card-title">Avg Latency</div>
      <div class="kpi-value">{{ metrics?.client_rtt_ms?.avg?.toFixed(1) ?? '-' }}</div>
      <div class="kpi-label">ms (client RTT)</div>
    </div>
  </div>
</template>
