<script setup lang="ts">
import type { SignalingDevice } from '@/types'

defineProps<{
  devices: SignalingDevice[]
  selectedDeviceId: string | null
  connectionState: string
}>()

defineEmits<{
  select: [deviceId: string]
  disconnect: []
}>()

function stateLabel(state: string): string {
  switch (state) {
    case 'connected': return 'Connected'
    case 'connecting': return 'Connecting...'
    case 'disconnected': return 'Disconnected'
    case 'failed': return 'Failed'
    default: return state
  }
}

function stateColor(state: string): string {
  switch (state) {
    case 'connected': return 'var(--success)'
    case 'connecting': return 'var(--warning)'
    case 'failed': return 'var(--danger)'
    default: return 'var(--text-secondary)'
  }
}
</script>

<template>
  <div class="card">
    <div class="card-title">Select Device</div>

    <div v-if="devices.length === 0" style="color: var(--text-secondary); padding: 1rem 0">
      No devices streaming. Start the WebRTC streamer on a Quest 3.
    </div>

    <div v-else class="device-grid">
      <div
        v-for="device in devices"
        :key="device.device_id"
        class="device-option"
        :class="{ selected: device.device_id === selectedDeviceId }"
        @click="$emit('select', device.device_id)"
      >
        <div style="font-weight: 500">{{ device.device_id }}</div>
        <div style="font-size: 0.8rem; color: var(--text-secondary)">Room: {{ device.room_name }} / Client: {{ device.client_id }}</div>
      </div>
    </div>

    <div v-if="selectedDeviceId" class="flex items-center justify-between mt-1">
      <span :style="{ color: stateColor(connectionState) }">
        {{ stateLabel(connectionState) }}
      </span>
      <button class="btn btn-danger btn-sm" @click="$emit('disconnect')">
        Disconnect
      </button>
    </div>
  </div>
</template>

<style scoped>
.device-grid {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.device-option {
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  cursor: pointer;
  transition: all 0.15s;
}
.device-option:hover {
  border-color: var(--accent);
}
.device-option.selected {
  border-color: var(--accent);
  background: rgba(59, 130, 246, 0.1);
}
</style>
