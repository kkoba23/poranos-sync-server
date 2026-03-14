import { defineStore } from 'pinia'
import { ref } from 'vue'
import { poranosGet } from '@/api/poranos'
import { proxyGet } from '@/api/proxyClient'

export interface FileItem {
  id: number
  name: string
  extension: string
  thumbnail?: {
    mini_url: string | null
    large_url: string | null
  }
  is_active: boolean
  order: number
  attributes?: {
    linkedXrvId?: number
    linkedVideoId?: number
    videoScreenType?: string
  }
  isTriggered?: boolean
  presigned_url?: string | null
  thumbnail_cached?: boolean
}

const VIDEO_EXTENSIONS = ['mp4', 'webm', 'ogg', 'mov']

export function isVideoFile(file: FileItem): boolean {
  return VIDEO_EXTENSIONS.includes(file.extension?.toLowerCase() || '')
}

export const useFileStore = defineStore('fileStore', () => {
  const files = ref<FileItem[]>([])
  const loading = ref(false)

  async function loadFiles(roomId: number) {
    loading.value = true
    files.value = []
    try {
      const result = await proxyGet<{ source: string; data: FileItem[] }>(
        `/api/poranos/rooms/${roomId}/files`
      )
      files.value = result.data.map((f) => ({ ...f, isTriggered: false }))
    } catch (e) {
      console.error('Failed to load files:', e)
    } finally {
      loading.value = false
    }
  }

  async function refreshPresignedUrl(fileId: number): Promise<string | null> {
    try {
      const data = await poranosGet<{ presigned_url: string }>(
        `/files/${fileId}/refresh_url/?type=main`
      )
      const file = files.value.find((f) => f.id === fileId)
      if (file) {
        file.presigned_url = data.presigned_url
      }
      return data.presigned_url
    } catch (e) {
      console.error('Failed to refresh presigned URL:', e)
      return null
    }
  }

  return { files, loading, loadFiles, refreshPresignedUrl }
})
