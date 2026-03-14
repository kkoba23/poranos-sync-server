<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '@/i18n'
import type { MetricsSnapshot } from '@/types'

const { t } = useI18n()

const props = defineProps<{
  metrics: MetricsSnapshot | null
}>()

const rooms = computed(() => {
  const details = props.metrics?.rooms?.details ?? {}
  return Object.entries(details).map(([name, info]) => ({
    name,
    clients: info.clients,
    objects: info.objects,
  }))
})
</script>

<template>
  <div class="card">
    <div class="card-title">{{ t('rooms.activeRooms') }}</div>
    <table class="table" v-if="rooms.length > 0">
      <thead>
        <tr>
          <th>{{ t('rooms.room') }}</th>
          <th>{{ t('rooms.clients') }}</th>
          <th>{{ t('rooms.objects') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="room in rooms" :key="room.name">
          <td>{{ room.name }}</td>
          <td>{{ room.clients }}</td>
          <td>{{ room.objects }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else style="color: var(--text-secondary); font-size: 0.9rem;">
      {{ t('rooms.noRooms') }}
    </div>
  </div>
</template>
