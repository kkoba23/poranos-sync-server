import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { get, post, proxyGet, wsUrl } from '@/api/client'
import { getAuth } from 'firebase/auth'

export interface LibraryFile {
  id: number
  name: string
  extension: string
  file_url: string
  thumbnail_url: string | null
  file_size: number
  presigned_url: string | null
  presigned_thumbnail_url: string | null
  attributes: Record<string, any>
  is_downloaded: boolean
}

export interface DownloadTask {
  task_id: string
  file_id: number
  file_name: string
  file_size: number
  status: 'pending' | 'downloading' | 'completed' | 'failed' | 'aborted'
  progress: number
  downloaded_bytes: number
  error: string
}

export interface ExtensionGroup {
  extension: string
  total: number
  downloaded: number
  onQuest: number
  totalSize: number
  files: LibraryFile[]
}

export interface QuestDeviceFiles {
  [serial: string]: number[] // serial -> array of file_ids
}

export const useFilesLibraryStore = defineStore('filesLibrary', () => {
  const files = ref<LibraryFile[]>([])
  const loading = ref(false)
  const tasks = ref<Map<string, DownloadTask>>(new Map())
  // Track file_id -> task_id for active downloads
  const fileTaskMap = ref<Map<number, string>>(new Map())
  const error = ref('')

  // Quest device files: serial -> set of file IDs
  const questDeviceFiles = ref<QuestDeviceFiles>({})
  const questLoading = ref(false)
  const selectedQuestDevice = ref<string>('')

  // WebSocket connection
  let ws: WebSocket | null = null

  const extensionGroups = computed<ExtensionGroup[]>(() => {
    const groups = new Map<string, LibraryFile[]>()
    for (const f of files.value) {
      const ext = (f.extension || 'other').toLowerCase()
      if (!groups.has(ext)) groups.set(ext, [])
      groups.get(ext)!.push(f)
    }

    // Sort by extension name
    const result: ExtensionGroup[] = []
    const sorted = [...groups.entries()].sort((a, b) => a[0].localeCompare(b[0]))
    const questIds = selectedQuestFileIds.value
    for (const [ext, extFiles] of sorted) {
      result.push({
        extension: ext,
        total: extFiles.length,
        downloaded: extFiles.filter((f) => f.is_downloaded).length,
        onQuest: extFiles.filter((f) => questIds.has(f.id)).length,
        totalSize: extFiles.reduce((s, f) => s + (f.file_size || 0), 0),
        files: extFiles,
      })
    }
    return result
  })

  const totalFiles = computed(() => files.value.length)
  const downloadedFiles = computed(() => files.value.filter((f) => f.is_downloaded).length)
  const hasActiveDownloads = computed(() =>
    [...tasks.value.values()].some(
      (t) => t.status === 'pending' || t.status === 'downloading',
    ),
  )

  // File IDs on the selected Quest device
  const selectedQuestFileIds = computed<Set<number>>(() => {
    const serial = selectedQuestDevice.value
    if (!serial || !questDeviceFiles.value[serial]) return new Set()
    return new Set(questDeviceFiles.value[serial])
  })

  const questDeviceNames = computed(() => Object.keys(questDeviceFiles.value))

  async function loadQuestFiles() {
    questLoading.value = true
    try {
      const result = await get<{ devices: QuestDeviceFiles }>('/api/files/quest-files-all')
      questDeviceFiles.value = result.devices
      // Auto-select first device if none selected
      const serials = Object.keys(result.devices)
      if (serials.length > 0 && !selectedQuestDevice.value) {
        selectedQuestDevice.value = serials[0]
      }
    } catch (e) {
      console.error('Failed to load quest files:', e)
    } finally {
      questLoading.value = false
    }
  }

  function isOnQuest(fileId: number): boolean {
    return selectedQuestFileIds.value.has(fileId)
  }

  async function loadFiles(_email?: string) {
    loading.value = true
    error.value = ''
    try {
      // Refresh Firebase token before request (same pattern as Operation page)
      try {
        const user = getAuth().currentUser
        if (user) {
          const token = await user.getIdToken(true)
          localStorage.setItem('idToken', token)
        }
      } catch { /* use existing localStorage token */ }

      const result = await proxyGet<{
        source: string
        files: LibraryFile[]
        active_tasks: DownloadTask[]
      }>('/api/files/list')

      files.value = result.files

      // Restore active tasks
      for (const t of result.active_tasks) {
        tasks.value.set(t.task_id, t)
        fileTaskMap.value.set(t.file_id, t.task_id)
      }
    } catch (e: any) {
      error.value = e.message || 'Failed to load files'
      console.error('Failed to load files:', e)
    } finally {
      loading.value = false
    }
  }

  async function downloadFile(file: LibraryFile) {
    if (!file.presigned_url) {
      console.error('No presigned URL for file:', file.name)
      return
    }
    try {
      const result = await post<DownloadTask>('/api/files/download', {
        file_id: file.id,
        file_name: file.name,
        file_size: file.file_size,
        presigned_url: file.presigned_url,
      })
      tasks.value.set(result.task_id, result)
      fileTaskMap.value.set(file.id, result.task_id)
    } catch (e) {
      console.error('Download start failed:', e)
    }
  }

  async function downloadByExtension(ext: string) {
    const group = extensionGroups.value.find((g) => g.extension === ext)
    if (!group) return

    const toDownload = group.files.filter((f) => !f.is_downloaded && f.presigned_url)
    if (toDownload.length === 0) return

    try {
      const result = await post<{ tasks: DownloadTask[] }>('/api/files/download-batch', {
        files: toDownload.map((f) => ({
          file_id: f.id,
          file_name: f.name,
          file_size: f.file_size,
          presigned_url: f.presigned_url,
        })),
      })
      for (const t of result.tasks) {
        tasks.value.set(t.task_id, t)
        fileTaskMap.value.set(t.file_id, t.task_id)
      }
    } catch (e) {
      console.error('Batch download failed:', e)
    }
  }

  async function downloadAll() {
    const toDownload = files.value.filter((f) => !f.is_downloaded && f.presigned_url)
    if (toDownload.length === 0) return

    try {
      const result = await post<{ tasks: DownloadTask[] }>('/api/files/download-batch', {
        files: toDownload.map((f) => ({
          file_id: f.id,
          file_name: f.name,
          file_size: f.file_size,
          presigned_url: f.presigned_url,
        })),
      })
      for (const t of result.tasks) {
        tasks.value.set(t.task_id, t)
        fileTaskMap.value.set(t.file_id, t.task_id)
      }
    } catch (e) {
      console.error('Download all failed:', e)
    }
  }

  async function abortTask(taskId: string) {
    try {
      await post('/api/files/abort', { task_id: taskId })
    } catch (e) {
      console.error('Abort failed:', e)
    }
  }

  async function abortAll() {
    try {
      await post('/api/files/abort-all')
    } catch (e) {
      console.error('Abort all failed:', e)
    }
  }

  function getTaskForFile(fileId: number): DownloadTask | undefined {
    const taskId = fileTaskMap.value.get(fileId)
    if (!taskId) return undefined
    return tasks.value.get(taskId)
  }

  // WebSocket for progress updates
  function connectWs() {
    if (ws) return
    ws = new WebSocket(wsUrl('/api/files/ws'))

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data)
      if (msg.type === 'download_progress') {
        const task: DownloadTask = msg.task
        tasks.value.set(task.task_id, task)
        fileTaskMap.value.set(task.file_id, task.task_id)

        // Update is_downloaded on completion
        if (task.status === 'completed') {
          const file = files.value.find((f) => f.id === task.file_id)
          if (file) file.is_downloaded = true
        }
      } else if (msg.type === 'active_tasks') {
        for (const task of msg.tasks) {
          tasks.value.set(task.task_id, task)
          fileTaskMap.value.set(task.file_id, task.task_id)
        }
      }
    }

    ws.onclose = () => {
      ws = null
      // Reconnect after 3s
      setTimeout(() => connectWs(), 3000)
    }
  }

  function disconnectWs() {
    if (ws) {
      ws.close()
      ws = null
    }
  }

  return {
    files,
    loading,
    tasks,
    error,
    extensionGroups,
    totalFiles,
    downloadedFiles,
    hasActiveDownloads,
    questDeviceFiles,
    questLoading,
    selectedQuestDevice,
    questDeviceNames,
    selectedQuestFileIds,
    loadFiles,
    loadQuestFiles,
    isOnQuest,
    downloadFile,
    downloadByExtension,
    downloadAll,
    abortTask,
    abortAll,
    getTaskForFile,
    connectWs,
    disconnectWs,
  }
})
