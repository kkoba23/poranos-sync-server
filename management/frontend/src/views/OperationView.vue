<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useRoomStore, type Room } from '@/stores/roomStore'
import { post } from '@/api/client'
import { useI18n } from '@/i18n'

const { t } = useI18n()
const roomStore = useRoomStore()
const router = useRouter()

const { operationPage: currentPage } = storeToRefs(roomStore)
const itemsPerPage = 4

const rooms = computed(() => roomStore.myRooms)

const paginatedRooms = computed(() =>
  rooms.value.slice(
    currentPage.value * itemsPerPage,
    (currentPage.value + 1) * itemsPerPage,
  )
)

const totalPages = computed(() => Math.ceil(rooms.value.length / itemsPerPage))

function prevPage() {
  if (currentPage.value > 0) currentPage.value--
}
function nextPage() {
  if (currentPage.value < totalPages.value - 1) currentPage.value++
}

function openRoom(room: Room) {
  roomStore.setSelectedRoom(room.id)

  // sync-server 経由で Unity にルーム切り替え指令（応答を待たずfire-and-forget）
  post('/api/remote/command', {
    room_name: 'default',
    command: 'switch_room',
    params: { room_number: room.number },
  }).catch(() => {})

  // AutoPlayの場合はMoviePlayerViewに直接遷移、それ以外はファイル一覧画面へ
  if (room.isAutoPlay) {
    router.push(`/operation/${room.id}/movie`)
  } else {
    router.push(`/operation/${room.id}/files`)
  }
}

onMounted(() => {
  roomStore.loadRooms()
})
</script>

<template>
  <div class="operation-page">
    <h1 class="page-title">{{ t('operation.title') }}</h1>

    <div v-if="roomStore.loading" class="loading-text">{{ t('operation.loading') }}</div>

    <div v-else-if="rooms.length === 0" class="empty-text">{{ t('operation.noRooms') }}</div>

    <div v-else class="room-navigation">
      <!-- Prev -->
      <button
        class="nav-btn"
        :class="{ hidden: currentPage === 0 }"
        @click="prevPage"
      >
        &lsaquo;
      </button>

      <!-- Room Grid -->
      <div class="room-grid">
        <div
          v-for="room in paginatedRooms"
          :key="room.id"
          class="room-card"
          @click="openRoom(room)"
        >
          <div class="room-thumbnail">
            <img
              v-if="room.thumbnail_large_url"
              :src="room.thumbnail_large_url"
              :alt="room.name"
              class="room-img"
            />
            <div v-else class="room-img-placeholder">{{ t('operation.noImage') }}</div>
            <span class="room-number-badge">{{ room.number }}</span>
            <span v-if="!room.files_cached" class="not-cached-badge">{{ t('operation.notCached') }}</span>
          </div>
          <div class="room-name">{{ room.name }}</div>
        </div>
      </div>

      <!-- Next -->
      <button
        class="nav-btn"
        :class="{ hidden: currentPage >= totalPages - 1 }"
        @click="nextPage"
      >
        &rsaquo;
      </button>
    </div>
  </div>
</template>

<style scoped>
.operation-page {
  max-width: 1100px;
}
.page-title {
  margin-bottom: 1rem;
}
.loading-text, .empty-text {
  color: var(--text-secondary);
  text-align: center;
  padding: 3rem;
}
.room-navigation {
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

.room-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  flex: 1;
}
.room-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
}
.room-card:hover {
  border-color: var(--accent);
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.15);
  transform: translateY(-2px);
}
.room-thumbnail {
  position: relative;
  width: 100%;
  height: 260px;
  overflow: hidden;
}
.room-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.room-img-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-primary);
  color: var(--text-secondary);
  font-size: 0.9rem;
}
.room-number-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.8rem;
}
.not-cached-badge {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(245, 158, 11, 0.85);
  color: #000;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.65rem;
  font-weight: 600;
}
.room-name {
  padding: 0.75rem 1rem;
  font-weight: 500;
  font-size: 0.95rem;
}
</style>
