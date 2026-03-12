<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import ScrcpyPlayer from './ScrcpyPlayer.vue'
import type { Device } from '@/types'

const props = defineProps<{
  expanded?: boolean
}>()

const devices = ref<Device[]>([])
const devicesLoaded = ref(false)
let pollTimer: ReturnType<typeof setInterval> | null = null

const containerRef = ref<HTMLElement | null>(null)
const containerWidth = ref(0)
const containerHeight = ref(0)
let resizeObserver: ResizeObserver | null = null

/** コンテナサイズとデバイス数から最適な列数を計算 */
const gridCols = computed(() => {
  const n = devices.value.length
  if (!props.expanded || n === 0) return 1
  const w = containerWidth.value
  const h = containerHeight.value - 40 // ボタン分
  if (w === 0 || h === 0) return 1

  // カードのアスペクト比（ヘッダー含めて約4:3.5）
  const cardAspect = 4 / 3.5

  let bestCols = 1
  let bestSize = 0
  for (let cols = 1; cols <= n; cols++) {
    const rows = Math.ceil(n / cols)
    const cardW = (w - (cols - 1) * 16) / cols
    const cardH = (h - (rows - 1) * 16) / rows
    // アスペクト比で制約される実際のサイズ
    const fitW = Math.min(cardW, cardH * cardAspect)
    if (fitW > bestSize) {
      bestSize = fitW
      bestCols = cols
    }
  }
  return bestCols
})

const gridStyle = computed(() => {
  if (!props.expanded) return {}
  return {
    display: 'grid',
    gridTemplateColumns: `repeat(${gridCols.value}, 1fr)`,
    gap: '1rem',
    alignContent: 'start',
  }
})

async function fetchDevices(useCached = false) {
  try {
    const url = useCached ? '/api/devices/cached' : '/api/devices'
    const resp = await fetch(url)
    const data = await resp.json()
    devices.value = data.devices || []
  } catch { /* ignore */ }
  devicesLoaded.value = true
}

onMounted(async () => {
  await fetchDevices(true)
  fetchDevices()
  pollTimer = setInterval(fetchDevices, 5000)

  if (containerRef.value) {
    resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (entry) {
        containerWidth.value = entry.contentRect.width
        containerHeight.value = entry.contentRect.height
      }
    })
    resizeObserver.observe(containerRef.value)
  }
})

onUnmounted(() => {
  if (pollTimer) clearInterval(pollTimer)
  resizeObserver?.disconnect()
})
</script>

<template>
  <div ref="containerRef" class="device-sidebar" :style="gridStyle">
    <div v-if="!devicesLoaded" class="sidebar-status">Connecting...</div>
    <div v-else-if="devices.length === 0" class="sidebar-status">No devices</div>
    <template v-else>
      <ScrcpyPlayer
        v-for="device in devices"
        :key="device.serial"
        :device="device"
        :compact="!expanded"
        class="sidebar-player"
      />
    </template>
  </div>
</template>

<style scoped>
.device-sidebar {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  height: 100%;
}
.sidebar-status {
  color: var(--text-secondary);
  font-size: 0.8rem;
  text-align: center;
  padding: 1rem;
}
.sidebar-player {
  width: 100%;
}
</style>
