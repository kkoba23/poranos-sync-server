<script setup lang="ts">
import DeviceCard from './DeviceCard.vue'
import type { Device, InstallTask } from '@/types'

const props = defineProps<{
  devices: Device[]
  canInstall: boolean
  installTasks: Map<string, InstallTask>
  userEmail?: string
}>()

defineEmits<{
  install: [serial: string]
  launch: [serial: string]
  stop: [serial: string]
  cancelInstall: [serial: string]
  reboot: [serial: string]
  shutdown: [serial: string]
  accountChange: [serial: string, room: string, clientId: number]
  modeChange: [serial: string, room: string, clientId: number, mode: string]
}>()

function getDeviceTask(device: Device): InstallTask | undefined {
  const serial = device.adb_serial || device.serial
  let latest: InstallTask | undefined
  for (const task of props.installTasks.values()) {
    if (task.device_serial === serial || task.device_serial === device.serial) {
      latest = task
    }
  }
  return latest
}
</script>

<template>
  <div class="mt-1">
    <div v-if="devices.length === 0" class="card" style="text-align: center; padding: 2rem;">
      <div style="color: var(--text-secondary)">No devices connected</div>
      <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.5rem">
        Connect a Meta Quest 3 via USB and ensure ADB is running on the host
      </div>
    </div>
    <div v-else class="grid-3">
      <DeviceCard
        v-for="device in devices"
        :key="device.serial"
        :device="device"
        :can-install="canInstall"
        :install-task="getDeviceTask(device)"
        :user-email="userEmail"
        @install="$emit('install', device.adb_serial || device.serial)"
        @launch="$emit('launch', device.adb_serial || device.serial)"
        @stop="$emit('stop', device.adb_serial || device.serial)"
        @cancel-install="$emit('cancelInstall', device.adb_serial || device.serial)"
        @reboot="$emit('reboot', device.adb_serial || device.serial)"
        @shutdown="$emit('shutdown', device.adb_serial || device.serial)"
        @account-change="$emit('accountChange', device.adb_serial || device.serial, device.sync_room || '', device.sync_client_id || 0)"
        @mode-change="(mode: string) => $emit('modeChange', device.adb_serial || device.serial, device.sync_room || '', device.sync_client_id || 0, mode)"
      />
    </div>
  </div>
</template>
