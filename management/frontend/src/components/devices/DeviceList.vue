<script setup lang="ts">
import { computed } from 'vue'
import DeviceCard from './DeviceCard.vue'
import type { Device, InstallTask } from '@/types'

const props = defineProps<{
  devices: Device[]
  selectedFile: File | null
  installing: boolean
  installTasks: Map<string, InstallTask>
}>()

defineEmits<{
  install: [serial: string]
  launch: [serial: string]
  stop: [serial: string]
  cancelInstall: [serial: string]
  reboot: [serial: string]
  menu: [serial: string]
}>()

function getDeviceTask(device: Device): InstallTask | undefined {
  const serial = device.adb_serial || device.serial
  // Find most recent task for this device (iterate in reverse insertion order)
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
        :can-install="!!selectedFile && !installing"
        :install-task="getDeviceTask(device)"
        @install="$emit('install', device.adb_serial || device.serial)"
        @launch="$emit('launch', device.adb_serial || device.serial)"
        @stop="$emit('stop', device.adb_serial || device.serial)"
        @cancel-install="$emit('cancelInstall', device.adb_serial || device.serial)"
        @reboot="$emit('reboot', device.adb_serial || device.serial)"
        @menu="$emit('menu', device.adb_serial || device.serial)"
      />
    </div>
  </div>
</template>
