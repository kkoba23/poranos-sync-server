import { ref } from 'vue'

export interface Toast {
  id: number
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  duration: number
}

const toasts = ref<Toast[]>([])
let nextId = 0

const defaultDuration: Record<Toast['type'], number> = {
  info: 8000,
  success: 4000,
  warning: 6000,
  error: 8000,
}

function addToast(message: string, type: Toast['type'], duration?: number) {
  duration = duration ?? defaultDuration[type]
  const id = nextId++
  toasts.value.push({ id, message, type, duration })
  setTimeout(() => removeToast(id), duration)
}

function removeToast(id: number) {
  const idx = toasts.value.findIndex(t => t.id === id)
  if (idx !== -1) toasts.value.splice(idx, 1)
}

export function useToast() {
  return {
    toasts,
    info: (msg: string, duration?: number) => addToast(msg, 'info', duration),
    success: (msg: string, duration?: number) => addToast(msg, 'success', duration),
    warning: (msg: string, duration?: number) => addToast(msg, 'warning', duration),
    error: (msg: string, duration?: number) => addToast(msg, 'error', duration),
    remove: removeToast,
  }
}
