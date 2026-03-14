import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from './authStore'
import { proxyGet } from '@/api/proxyClient'

export interface Room {
  id: number
  name: string
  number: string
  thumbnail_large_url: string | null
  thumbnail_mini_url: string | null
  order: number
  owner_email: string
  isAutoPlay?: boolean
  files_cached?: boolean
}

export const useRoomStore = defineStore('roomStore', () => {
  const rooms = ref<Room[]>([])
  const selectedRoomId = ref<number | null>(null)
  const loading = ref(false)
  const operationPage = ref(0)
  const operationTab = ref<'rooms' | 'manual'>('rooms')
  const dataSource = ref<'online' | 'cache' | ''>('')

  const selectedRoom = computed(() =>
    rooms.value.find((r) => r.id === selectedRoomId.value) || null
  )

  /** 自分のルーム（order順） */
  const myRooms = computed(() => {
    const authStore = useAuthStore()
    const email = authStore.userEmail
    return rooms.value
      .filter((r) => r.owner_email === email)
      .sort((a, b) => a.order - b.order)
  })

  async function loadRooms() {
    loading.value = true
    try {
      const result = await proxyGet<{ source: string; data: any[] }>('/api/poranos/rooms')
      dataSource.value = result.source as 'online' | 'cache'
      rooms.value = result.data.map((r) => ({
        ...r,
        isAutoPlay: r.settings?.isAutoPlay ?? false,
      }))
    } catch (e) {
      console.error('Failed to load rooms:', e)
    } finally {
      loading.value = false
    }
  }

  function setSelectedRoom(id: number) {
    selectedRoomId.value = id
  }

  return { rooms, myRooms, selectedRoom, selectedRoomId, loading, operationPage, operationTab, dataSource, loadRooms, setSelectedRoom }
})
