<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useRoomStore } from '@/stores/roomStore'
import { useFileStore, type FileItem, isVideoFile } from '@/stores/fileStore'
import { post } from '@/api/client'
import { poranosPost } from '@/api/poranos'

const route = useRoute()
const router = useRouter()
const roomStore = useRoomStore()
const fileStore = useFileStore()

const roomId = parseInt(route.params.roomId as string)
const currentPage = ref(0)
const itemsPerPage = 6

const room = computed(() => roomStore.selectedRoom)

/** アクティブかつXRVリンク済み動画を除外 */
const visibleFiles = computed(() =>
  fileStore.files
    .filter((f) => {
      if (!f.is_active) return false
      const linkedXrvId = f.attributes?.linkedXrvId
      if (linkedXrvId) {
        const linkedXrv = fileStore.files.find((x) => x.id === linkedXrvId && x.is_active)
        if (linkedXrv) return false
      }
      return true
    })
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
)

const paginatedFiles = computed(() =>
  visibleFiles.value.slice(
    currentPage.value * itemsPerPage,
    (currentPage.value + 1) * itemsPerPage,
  )
)

const totalPages = computed(() => Math.ceil(visibleFiles.value.length / itemsPerPage))

function prevPage() {
  if (currentPage.value > 0) currentPage.value--
}
function nextPage() {
  if (currentPage.value < totalPages.value - 1) currentPage.value++
}

async function playFile(file: FileItem) {
  // トリガーアニメーション
  file.isTriggered = true
  setTimeout(() => { file.isTriggered = false }, 1000)

  // sync-server 経由で Unity にファイル再生指令
  try {
    await post('/api/remote/command', {
      room_name: 'default',
      command: 'spawn_file',
      params: { file_id: file.id },
    })
  } catch (e) {
    console.warn('sync-server command failed:', e)
  }

  // poranos.com（sync-server経由で直接指示が届くため無効化）
  // try {
  //   await poranosPost('/trigger-play-if-linked/', {
  //     room_number: room.value?.number,
  //     file_id: file.id,
  //     type: 'play',
  //   })
  // } catch {
  //   // ignore
  // }

  // 動画ファイルならMoviePlayerに遷移
  if (isVideoFile(file)) {
    router.push(`/operation/${roomId}/movie`)
  }
}

/** 動画コントロール */
async function videoControl(type: string, seekPosition = 0) {
  try {
    await post('/api/remote/command', {
      room_name: 'default',
      command: `video_${type}`,
      params: { seek_position: seekPosition },
    })
  } catch (e) {
    console.warn('sync-server command failed:', e)
  }

  // poranos.com（sync-server経由で直接指示が届くため無効化）
  // try {
  //   await poranosPost('/trigger-play-if-linked/', {
  //     room_number: room.value?.number,
  //     type,
  //     seek_position: seekPosition,
  //   })
  // } catch {
  //   // ignore
  // }
}

function goBack() {
  // ルーム離脱指令
  // poranos.com（sync-server経由で直接指示が届くため無効化）
  // poranosPost('/trigger-play-if-linked/', {
  //   room_number: room.value?.number,
  //   type: 'remove',
  // }).catch(() => {})

  post('/api/remote/command', {
    room_name: 'default',
    command: 'remove_all',
    params: {},
  }).catch(() => {})

  router.push('/operation')
}

function getThumbnailSrc(file: FileItem): string | null {
  return file.thumbnail?.mini_url || file.thumbnail?.large_url || null
}

const AUDIO_EXTENSIONS = ['mp3', 'wav', 'aac', 'aiff', 'ogg', 'flac', 'm4a']
function isAudio(file: FileItem) {
  return AUDIO_EXTENSIONS.includes(file.extension?.toLowerCase() || '')
}

onMounted(() => {
  if (!roomStore.selectedRoom) {
    roomStore.setSelectedRoom(roomId)
  }
  fileStore.loadFiles(roomId)
})
</script>

<template>
  <div class="file-player-page">
    <div class="file-player-header">
      <button class="btn btn-primary back-btn" @click="goBack">
        &larr; 戻る
      </button>
      <h2 class="room-title">{{ room?.name || 'Room' }}</h2>
    </div>

    <!-- 動画コントロール -->
    <div class="video-controls">
      <button class="btn btn-sm btn-primary" @click="videoControl('play')">&#9654; Play</button>
      <button class="btn btn-sm btn-warning" @click="videoControl('pause')">&#9646;&#9646; Pause</button>
      <button class="btn btn-sm btn-danger" @click="videoControl('stop')">&#9632; Stop</button>
    </div>

    <div v-if="fileStore.loading" class="loading-text">ファイル読み込み中...</div>

    <div v-else-if="visibleFiles.length === 0" class="empty-text">ファイルがありません</div>

    <div v-else class="file-navigation">
      <!-- Prev -->
      <button class="nav-btn" :class="{ hidden: currentPage === 0 }" @click="prevPage">
        &lsaquo;
      </button>

      <!-- File Grid -->
      <div class="file-grid">
        <div
          v-for="file in paginatedFiles"
          :key="file.id"
          class="file-card"
          :class="{ triggered: file.isTriggered }"
          @click="playFile(file)"
        >
          <div class="file-thumbnail">
            <div v-if="isAudio(file)" class="audio-thumb">&#127925;</div>
            <img
              v-else-if="getThumbnailSrc(file)"
              :src="getThumbnailSrc(file)!"
              :alt="file.name"
              class="file-img"
            />
            <div v-else class="file-img-placeholder">No Image</div>
          </div>
          <div class="file-name" :title="file.name">{{ file.name }}</div>
        </div>
      </div>

      <!-- Next -->
      <button class="nav-btn" :class="{ hidden: currentPage >= totalPages - 1 }" @click="nextPage">
        &rsaquo;
      </button>
    </div>
  </div>
</template>

<style scoped>
.file-player-page {
  max-width: 1200px;
}
.file-player-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}
.back-btn {
  flex-shrink: 0;
}
.room-title {
  font-size: 1.25rem;
  font-weight: 600;
}
.video-controls {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}
.loading-text, .empty-text {
  color: var(--text-secondary);
  text-align: center;
  padding: 3rem;
}
.file-navigation {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.nav-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--accent);
  color: white;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
}
.nav-btn:hover { background: var(--accent-hover); }
.nav-btn.hidden { opacity: 0; pointer-events: none; }

.file-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  flex: 1;
}
.file-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
}
.file-card:hover {
  border-color: var(--accent);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}
.file-card.triggered {
  background: rgba(239, 68, 68, 0.15) !important;
  border-color: var(--danger);
}
.file-thumbnail {
  width: 140px;
  height: 140px;
  border: 1px dashed var(--border);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 0.5rem;
}
.file-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.file-img-placeholder {
  color: var(--text-secondary);
  font-size: 0.85rem;
}
.audio-thumb {
  font-size: 3rem;
  background: linear-gradient(135deg, #1a1a2e, #0f3460);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.file-name {
  font-size: 0.85rem;
  font-weight: 500;
  text-align: center;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 900px) {
  .file-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
