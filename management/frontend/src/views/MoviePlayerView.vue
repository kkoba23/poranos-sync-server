<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router'
import { useRoomStore } from '@/stores/roomStore'
import { useFileStore, isVideoFile } from '@/stores/fileStore'
import { post } from '@/api/client'
import { poranosPost } from '@/api/poranos'

const route = useRoute()
const router = useRouter()
const roomStore = useRoomStore()
const fileStore = useFileStore()

const roomId = parseInt(route.params.roomId as string)
const room = computed(() => roomStore.selectedRoom)

const videoUrl = ref<string | null>(null)
const videoFileName = ref('')
const videoRef = ref<HTMLVideoElement | null>(null)
const currentTime = ref(0)
const duration = ref(0)
const isPlaying = ref(false)
const sliderValue = ref(0)
const isDragging = ref(false)

// ステレオ動画判定
const isStereoVideo = ref(false)
const showFullStereo = ref(false)

function checkStereoVideo() {
  if (!videoRef.value) return
  const w = videoRef.value.videoWidth
  const h = videoRef.value.videoHeight
  const ratio = w / h
  const is360 = ratio >= 1.95 && ratio <= 2.05
  isStereoVideo.value = ratio > 1.78 && !is360
}

// ── dual-send helper ──
async function sendCommand(command: string, params: Record<string, any> = {}) {
  // sync-server
  try {
    await post('/api/remote/command', {
      room_name: 'default',
      command,
      params,
    })
  } catch (e) {
    console.warn('sync-server command failed:', e)
  }
}

async function sendVideoAction(type: string, seekPosition = 0) {
  // sync-server
  sendCommand(`video_${type}`, { seek_position: seekPosition })

  // poranos.com（sync-server経由で直接指示が届くため無効化）
  // try {
  //   await poranosPost('/trigger-play-if-linked/', {
  //     room_number: room.value?.number,
  //     type,
  //     ...(seekPosition > 0 ? { seek_position: seekPosition } : {}),
  //   })
  // } catch {
  //   // ignore
  // }
}

// ── 再生/一時停止 ──
async function togglePlay() {
  if (!videoRef.value) return

  const type = isPlaying.value ? 'pause' : 'play'
  const seekPos = duration.value > 0 ? sliderValue.value / duration.value : 0

  await sendVideoAction(type, type === 'play' ? seekPos : 0)

  if (isPlaying.value) {
    videoRef.value.pause()
  } else {
    videoRef.value.play()
  }
  isPlaying.value = !isPlaying.value
}

// ── シーク ──
function startDragging() {
  if (videoRef.value && !videoRef.value.paused) {
    togglePlay()
  }
  isDragging.value = true
}

async function stopDragging() {
  if (!videoRef.value) return
  videoRef.value.currentTime = sliderValue.value
  isDragging.value = false

  const seekPos = duration.value > 0 ? sliderValue.value / duration.value : 0
  await sendVideoAction('seek', seekPos)
}

function onSliderInput(e: Event) {
  const target = e.target as HTMLInputElement
  sliderValue.value = parseFloat(target.value)
  if (videoRef.value && isDragging.value) {
    videoRef.value.currentTime = sliderValue.value
  }
}

// ── タイムライン更新 ──
function updateCurrentTime() {
  if (videoRef.value && !isDragging.value) {
    sliderValue.value = videoRef.value.currentTime
    currentTime.value = videoRef.value.currentTime
  }
}

function setDuration() {
  if (videoRef.value) {
    duration.value = videoRef.value.duration
    checkStereoVideo()
  }
}

function formatTime(seconds: number): string {
  if (isNaN(seconds)) return '00:00'
  const m = Math.floor(seconds / 60).toString().padStart(2, '0')
  const s = Math.floor(seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

// ── ページ離脱時にstop送信 ──
onBeforeRouteLeave(async () => {
  if (videoRef.value && !videoRef.value.paused) {
    videoRef.value.pause()
  }

  await sendVideoAction('stop')
  return true
})

// ── 戻る ──
function goBack() {
  // AutoPlayルームの場合はOperation画面に戻る（FilePlayerを経由していないため）
  if (room.value?.isAutoPlay) {
    router.push('/operation')
  } else {
    router.push(`/operation/${roomId}/files`)
  }
}

// ── 初期化 ──
onMounted(async () => {
  if (!roomStore.selectedRoom) {
    roomStore.setSelectedRoom(roomId)
    if (roomStore.rooms.length === 0) {
      await roomStore.loadRooms()
    }
  }

  await fileStore.loadFiles(roomId)

  // アクティブな動画ファイルを探す
  const videoFile = fileStore.files.find((f) => f.is_active && isVideoFile(f))
  if (!videoFile) {
    console.warn('No active video file found')
    return
  }

  videoFileName.value = videoFile.name || 'Video'

  // presigned URLを取得
  const url = await fileStore.refreshPresignedUrl(videoFile.id)
  if (url) {
    videoUrl.value = url
  }

  // 動画要素の準備後に自動再生
  nextTick(() => {
    const video = videoRef.value
    if (!video) return

    video.addEventListener('play', () => (isPlaying.value = true))
    video.addEventListener('pause', () => (isPlaying.value = false))

    video.play()
      .then(() => { isPlaying.value = true })
      .catch(() => { isPlaying.value = false })
  })
})

// スライダーの進捗率（CSS変数用）
const sliderProgress = computed(() => {
  if (duration.value <= 0) return 0
  return (sliderValue.value / duration.value) * 100
})
</script>

<template>
  <div class="movie-player-page">
    <!-- ヘッダー -->
    <div class="player-header">
      <button class="btn btn-primary back-btn" @click="goBack">&larr; 戻る</button>
      <h2 class="video-title">{{ videoFileName || 'Video' }}</h2>
      <label v-if="isStereoVideo" class="stereo-toggle">
        <input type="checkbox" v-model="showFullStereo" />
        <span>{{ showFullStereo ? '全体表示' : '左目のみ' }}</span>
      </label>
    </div>

    <!-- 動画 -->
    <div class="video-wrapper">
      <div
        v-if="videoUrl"
        class="video-container"
        :class="{ 'stereo-crop': isStereoVideo && !showFullStereo }"
      >
        <video
          ref="videoRef"
          :src="videoUrl"
          muted
          loop
          playsinline
          @timeupdate="updateCurrentTime"
          @loadedmetadata="setDuration"
          :class="{ 'stereo-video': isStereoVideo && !showFullStereo }"
        />
      </div>
      <div v-else class="loading-message">動画を読み込んでいます...</div>
    </div>

    <!-- コントロール -->
    <div class="controls">
      <button class="play-btn" @click="togglePlay">
        {{ isPlaying ? '&#9646;&#9646;' : '&#9654;' }}
      </button>

      <div class="slider-area">
        <input
          type="range"
          class="timeline-slider"
          :value="sliderValue"
          :max="duration || 1"
          step="0.1"
          :style="{ '--progress': sliderProgress + '%' }"
          @input="onSliderInput"
          @mousedown="startDragging"
          @mouseup="stopDragging"
          @touchstart="startDragging"
          @touchend="stopDragging"
        />
        <div class="time-labels">
          <span>{{ formatTime(sliderValue) }}</span>
          <span>{{ formatTime(duration) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie-player-page {
  max-width: 1000px;
}

.player-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}
.video-title {
  font-size: 1.25rem;
  font-weight: 600;
  flex: 1;
}
.stereo-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
  cursor: pointer;
}
.stereo-toggle input { cursor: pointer; }

/* 動画 */
.video-wrapper {
  margin-bottom: 1rem;
}
.video-container {
  position: relative;
  width: 100%;
  height: 640px;
  background: #000;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.video-container video {
  max-width: 100%;
  max-height: 100%;
  display: block;
}
.video-container.stereo-crop {
  overflow: hidden;
}
.video-container.stereo-crop video.stereo-video {
  width: 200%;
  max-width: none;
}
.loading-message {
  text-align: center;
  padding: 4rem;
  color: var(--text-secondary);
}

/* コントロール */
.controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
}
.play-btn {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background: var(--accent);
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
}
.play-btn:hover {
  background: var(--accent-hover);
}

.slider-area {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* レンジスライダー */
.timeline-slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 8px;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  background: linear-gradient(
    to right,
    var(--accent) 0%,
    var(--accent) var(--progress, 0%),
    var(--bg-card) var(--progress, 0%),
    var(--bg-card) 100%
  );
}
.timeline-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--accent);
  border: 2px solid white;
  cursor: pointer;
}
.timeline-slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--accent);
  border: 2px solid white;
  cursor: pointer;
}

.time-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-top: 0.25rem;
}
</style>
