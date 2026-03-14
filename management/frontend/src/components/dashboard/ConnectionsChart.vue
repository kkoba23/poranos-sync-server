<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '@/i18n'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Filler,
} from 'chart.js'
import 'chartjs-adapter-date-fns'
import type { MetricsSnapshot } from '@/types'

ChartJS.register(LineElement, PointElement, LinearScale, TimeScale, Title, Tooltip, Filler)

const { t } = useI18n()

const props = defineProps<{
  history: MetricsSnapshot[]
}>()

const chartData = computed(() => ({
  datasets: [
    {
      label: 'Clients in Rooms',
      data: props.history.map(h => ({
        x: new Date(h.timestamp).getTime(),
        y: h.clients_total ?? 0,
      })),
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
      tension: 0.3,
      pointRadius: 0,
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 0 },
  scales: {
    x: {
      type: 'time' as const,
      time: { unit: 'minute' as const },
      grid: { color: 'rgba(255,255,255,0.05)' },
      ticks: { color: '#94a3b8' },
    },
    y: {
      beginAtZero: true,
      grid: { color: 'rgba(255,255,255,0.05)' },
      ticks: { color: '#94a3b8', stepSize: 1 },
    },
  },
  plugins: {
    tooltip: { mode: 'index' as const, intersect: false },
  },
}
</script>

<template>
  <div class="card">
    <div class="card-title">{{ t('chart.clientsOverTime') }}</div>
    <div style="height: 200px">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>
