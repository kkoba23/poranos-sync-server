import { ref, onMounted, onUnmounted } from 'vue'
import { wsUrl, post } from '@/api/client'
import type { Device, InstallTask } from '@/types'

export function useDevices() {
  const devices = ref<Device[]>([])
  const installTasks = ref<Map<string, InstallTask>>(new Map())
  const connected = ref(false)
  let ws: WebSocket | null = null
  let reconnectTimer: ReturnType<typeof setTimeout> | null = null

  function connect() {
    ws = new WebSocket(wsUrl('/api/devices/ws'))

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
        if (msg.type === 'devices_update') {
          devices.value = msg.devices
        } else if (msg.type === 'install_progress' || msg.type === 'install_complete') {
          installTasks.value.set(msg.task_id, msg)
        }
      } catch {
        // ignore
      }
    }
  }

  async function installApk(serial: string, file: File): Promise<InstallTask> {
    const form = new FormData()
    form.append('apk', file)
    const task = await post<InstallTask>(`/api/devices/${serial}/install`, form)
    installTasks.value.set(task.task_id, task)
    return task
  }

  async function installAll(file: File): Promise<InstallTask[]> {
    const form = new FormData()
    form.append('apk', file)
    const result = await post<{ tasks: InstallTask[] }>('/api/devices/install-all', form)
    for (const task of result.tasks) {
      installTasks.value.set(task.task_id, task)
    }
    return result.tasks
  }

  async function launchApp(serial: string): Promise<{ success: boolean; message: string }> {
    return post('/api/devices/' + serial + '/launch')
  }

  async function launchAll(): Promise<void> {
    await post('/api/devices/launch-all')
  }

  async function stopApp(serial: string): Promise<{ success: boolean; message: string }> {
    return post('/api/devices/' + serial + '/stop')
  }

  async function stopAll(): Promise<void> {
    await post('/api/devices/stop-all')
  }

  async function cancelInstall(serial: string): Promise<void> {
    await post('/api/devices/' + serial + '/cancel-install')
  }

  async function rebootDevice(serial: string): Promise<{ success: boolean; message: string }> {
    return post('/api/devices/' + serial + '/reboot')
  }

  async function sendKeyevent(serial: string, keycode: number): Promise<{ success: boolean; message: string }> {
    return post('/api/devices/' + serial + '/keyevent', { keycode })
  }

  async function rebootAll(): Promise<void> {
    await post('/api/devices/reboot-all')
  }

  onMounted(connect)

  onUnmounted(() => {
    if (reconnectTimer) clearTimeout(reconnectTimer)
    ws?.close()
  })

  return { devices, installTasks, connected, installApk, installAll, launchApp, launchAll, stopApp, stopAll, cancelInstall, rebootDevice, rebootAll, sendKeyevent }
}
