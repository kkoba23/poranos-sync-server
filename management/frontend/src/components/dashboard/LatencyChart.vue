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
  Legend,
} from 'chart.js'
import 'chartjs-adapter-date-fns'
import type { MetricsSnapshot } from '@/types'

ChartJS.register(LineElement, PointElement, LinearScale, TimeScale, Title, Tooltip, Legend)

const { t } = useI18n()

const props = defineProps<{
  history: MetricsSnapshot[]
}>()

const chartData = computed(() => ({
  datasets: [
    {
      label: 'Client RTT avg (ms)',
      data: props.history.map(h => ({
        x: new Date(h.timestamp).getTime(),
        y: h.client_rtt_ms?.avg ?? 0,
      })),
      borderColor: '#f59e0b',
      tension: 0.3,
      pointRadius: 0,
    },
    {
      label: 'Server ping (ms)',
      data: props.history.map(h => ({
        x: new Date(h.timestamp).getTime(),
        y: h.ping_processing_ms?.avg ?? 0,
      })),
      borderColor: '#22c55e',
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
      ticks: { color: '#94a3b8' },
    },
  },
  plugins: {
    legend: {
      labels: { color: '#94a3b8' },
    },
    tooltip: { mode: 'index' as const, intersect: false },
  },
}
</script>

<template>
  <div class="card">
    <div class="card-title">{{ t('chart.latency') }}</div>
    <div style="height: 200px">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>
