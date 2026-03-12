import { ref, onMounted, onUnmounted } from 'vue'
import { wsUrl } from '@/api/client'
import type { MetricsSnapshot } from '@/types'

const MAX_HISTORY = 360 // 30 min at 5s interval

export function useMetrics() {
  const current = ref<MetricsSnapshot | null>(null)
  const history = ref<MetricsSnapshot[]>([])
  const connected = ref(false)
  let ws: WebSocket | null = null
  let reconnectTimer: ReturnType<typeof setTimeout> | null = null

  function connect() {
    ws = new WebSocket(wsUrl('/api/metrics/ws'))

    ws.onopen = () => {
      connected.value = true
    }

    ws.onclose = () => {
      connected.value = false
      reconnectTimer = setTimeout(connect, 3000)
    }

    ws.onerror = () => {
      ws?.close()
    }

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data)
        if (msg.type === 'metrics_update') {
          current.value = msg.data
          history.value.push(msg.data)
          if (history.value.length > MAX_HISTORY) {
            history.value.shift()
          }
        }
      } catch {
        // ignore parse errors
      }
    }
  }

  onMounted(connect)

  onUnmounted(() => {
    if (reconnectTimer) clearTimeout(reconnectTimer)
    ws?.close()
  })

  return { current, history, connected }
}
