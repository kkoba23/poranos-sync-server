import { ref, onMounted, onUnmounted } from 'vue'
import { get, post } from '@/api/client'
import type { ServerStatus } from '@/types'

const POLL_INTERVAL = 30_000 // 30秒間隔

export function useServerControl() {
  const status = ref<ServerStatus>({ status: 'stopped' })
  const loading = ref(false)
  let pollTimer: ReturnType<typeof setInterval> | null = null

  async function fetchStatus() {
    try {
      status.value = await get<ServerStatus>('/api/server/status')
    } catch {
      status.value = { status: 'error' }
    }
  }

  async function start() {
    loading.value = true
    try {
      await post('/api/server/start')
      await fetchStatus()
    } finally {
      loading.value = false
    }
  }

  async function stop() {
    loading.value = true
    try {
      await post('/api/server/stop')
      await fetchStatus()
    } finally {
      loading.value = false
    }
  }

  async function restart() {
    loading.value = true
    try {
      await post('/api/server/restart')
      await fetchStatus()
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchStatus()
    pollTimer = setInterval(fetchStatus, POLL_INTERVAL)
  })

  onUnmounted(() => {
    if (pollTimer) {
      clearInterval(pollTimer)
      pollTimer = null
    }
  })

  return { status, loading, start, stop, restart, fetchStatus }
}
