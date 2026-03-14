<script setup lang="ts">
import { ref } from 'vue'
import ServerStatusCard from '@/components/dashboard/ServerStatusCard.vue'
import MetricsSummary from '@/components/dashboard/MetricsSummary.vue'
import ConnectionsChart from '@/components/dashboard/ConnectionsChart.vue'
import MessagesChart from '@/components/dashboard/MessagesChart.vue'
import LatencyChart from '@/components/dashboard/LatencyChart.vue'
import RoomsList from '@/components/dashboard/RoomsList.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'
import { useMetrics } from '@/composables/useMetrics'
import { post } from '@/api/client'
import { useI18n } from '@/i18n'

const { t } = useI18n()
const { current, history, connected } = useMetrics()

const resetting = ref(false)
const showResetConfirm = ref(false)
async function onReset() {
  resetting.value = true
  try {
    await post('/api/server/reset')
  } catch (e) {
    // ignore
  } finally {
    resetting.value = false
  }
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-1">
      <h1 class="page-title">{{ t('dashboard.title') }}</h1>
      <div class="flex items-center" style="gap: 1rem;">
        <button class="btn btn-warning btn-sm" :disabled="resetting" @click="showResetConfirm = true">
          {{ resetting ? t('dashboard.resetting') : t('dashboard.resetRooms') }}
        </button>
        <span :style="{ color: connected ? 'var(--success)' : 'var(--danger)' }">
          {{ connected ? t('dashboard.live') : t('dashboard.disconnected') }}
        </span>
      </div>
    </div>

    <ServerStatusCard />

    <MetricsSummary :metrics="current" />

    <div class="grid-2 mt-1">
      <ConnectionsChart :history="history" />
      <LatencyChart :history="history" />
    </div>

    <div class="grid-2 mt-1">
      <MessagesChart :metrics="current" />
      <RoomsList :metrics="current" />
    </div>

    <ConfirmModal
      v-if="showResetConfirm"
      :title="t('dashboard.resetTitle')"
      :message="t('dashboard.resetMsg')"
      :confirm-label="t('dashboard.reset')"
      :loading="resetting"
      @confirm="onReset(); showResetConfirm = false"
      @cancel="showResetConfirm = false"
    />
  </div>
</template>
