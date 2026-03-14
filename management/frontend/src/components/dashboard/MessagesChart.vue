<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '@/i18n'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import type { MetricsSnapshot } from '@/types'

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip)

const { t } = useI18n()

const props = defineProps<{
  metrics: MetricsSnapshot | null
}>()

const COLORS = [
  '#3b82f6', '#22c55e', '#f59e0b', '#ef4444',
  '#8b5cf6', '#06b6d4', '#ec4899', '#f97316',
]

const chartData = computed(() => {
  const byType = props.metrics?.messages?.by_type ?? {}
  const labels = Object.keys(byType)
  const values = Object.values(byType)
  return {
    labels,
    datasets: [{
      label: 'Messages',
      data: values,
      backgroundColor: labels.map((_, i) => COLORS[i % COLORS.length]),
    }],
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 0 },
  indexAxis: 'y' as const,
  scales: {
    x: {
      grid: { color: 'rgba(255,255,255,0.05)' },
      ticks: { color: '#94a3b8' },
    },
    y: {
      grid: { display: false },
      ticks: { color: '#94a3b8', font: { size: 11 } },
    },
  },
}
</script>

<template>
  <div class="card">
    <div class="card-title">{{ t('chart.messagesByType') }}</div>
    <div style="height: 200px">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>
