<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useRoomStore } from '@/stores/roomStore'
import { useAuthStore } from '@/stores/authStore'
import { post, get } from '@/api/client'
import { useI18n } from '@/i18n'
import { getAuth } from 'firebase/auth'

const { t } = useI18n()
const roomStore = useRoomStore()
const authStore = useAuthStore()
const router = useRouter()

const { operationTab } = storeToRefs(roomStore)

const forceOffline = ref(false)
const toastMessage = ref('')
let toastTimer: ReturnType<typeof setTimeout> | null = null

function showToast(msg: string) {
  toastMessage.value = msg
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toastMessage.value = '' }, 3000)
}

const manualIframe = ref<HTMLIFrameElement | null>(null)
const iframeAuthSent = ref(false)

// Cache progress
const cacheTotal = ref(0)
const cacheDone = ref(0)
const cacheActive = ref(false)
const showCacheBar = ref(false)
let cacheTimer: ReturnType<typeof setInterval> | null = null
let hideTimeout: ReturnType<typeof setTimeout> | null = null

const cachePercent = computed(() => {
  if (cacheTotal.value <= 0) return 0
  return Math.round((cacheDone.value / cacheTotal.value) * 100)
})

async function pollCacheStatus() {
  try {
    const res = await get<{ total: number; done: number; active: boolean }>('/api/poranos/cache-status')
    cacheTotal.value = res.total
    cacheDone.value = res.done
    cacheActive.value = res.active

    if (res.active && res.total > 0) {
      showCacheBar.value = true
      if (hideTimeout) { clearTimeout(hideTimeout); hideTimeout = null }
    } else if (!res.active && res.total > 0 && res.done >= res.total) {
      // Completed — show for 3 seconds then hide, reload rooms to clear badges
      showCacheBar.value = true
      if (!hideTimeout) {
        roomStore.loadRooms()
        hideTimeout = setTimeout(() => {
          showCacheBar.value = false
          if (cacheTimer) { clearInterval(cacheTimer); cacheTimer = null }
        }, 3000)
      }
    }
  } catch { /* ignore */ }
}

function startCachePolling() {
  if (cacheTimer) return
  pollCacheStatus()
  cacheTimer = setInterval(pollCacheStatus, 1000)
}

function reloadIframe() {
  if (manualIframe.value) {
    iframeAuthSent.value = false
    manualIframe.value.src = manualIframe.value.src
  }
}

async function sendAuthToIframe() {
  if (iframeAuthSent.value) return
  const auth = getAuth()
  const token = await auth.currentUser?.getIdToken()
  if (token && manualIframe.value?.contentWindow) {
    manualIframe.value.contentWindow.postMessage(
      { type: 'poranos-auth-token', token },
      'https://poranos.com'
    )
    iframeAuthSent.value = true
  }
}

async function loadOfflineMode() {
  try {
    const res = await get<{ force_offline: boolean }>('/api/poranos/offline-mode')
    forceOffline.value = res.force_offline
  } catch { /* ignore */ }
}

async function toggleOfflineMode() {
  const newVal = !forceOffline.value
  try {
    const res = await post<{ force_offline: boolean }>('/api/poranos/offline-mode', { force_offline: newVal })
    forceOffline.value = res.force_offline
    await roomStore.loadRooms()
    // Turned off offline mode but server is still returning cache → actually offline
    if (!forceOffline.value && roomStore.dataSource === 'cache') {
      await post('/api/poranos/offline-mode', { force_offline: true })
      forceOffline.value = true
      showToast(t('operation.noNetwork'))
    }
  } catch { /* ignore */ }
}

function switchTab(tab: 'rooms' | 'manual') {
  operationTab.value = tab
  if (tab === 'rooms') {
    router.push('/operation')
  }
}

// Auto-enable offline mode when server detects offline (dataSource becomes 'cache')
watch(() => roomStore.dataSource, (src) => {
  if (src === 'cache' && !forceOffline.value) {
    post('/api/poranos/offline-mode', { force_offline: true }).then(() => {
      forceOffline.value = true
    }).catch(() => {})
  }
})

onMounted(() => {
  loadOfflineMode()
  startCachePolling()
})

onBeforeUnmount(() => {
  if (cacheTimer) { clearInterval(cacheTimer); cacheTimer = null }
  if (hideTimeout) { clearTimeout(hideTimeout); hideTimeout = null }
})
</script>

<template>
  <div class="operation-layout">
    <!-- Shared header -->
    <div class="layout-header">
      <div class="tab-bar">
        <button
          class="tab-btn"
          :class="{ active: operationTab === 'rooms' }"
          @click="switchTab('rooms')"
        >{{ t('operation.tabRooms') }}</button>
        <button
          class="tab-btn"
          :class="{ active: operationTab === 'manual' }"
          @click="switchTab('manual')"
        >{{ t('operation.tabManual') }}</button>
      </div>
      <div class="header-right">
        <span class="header-email">{{ authStore.userEmail }}</span>
        <button
          class="offline-toggle"
          :class="{ active: forceOffline }"
          @click="toggleOfflineMode"
          :title="t('operation.forceOffline')"
        >
          {{ t('operation.forceOffline') }}
        </button>
      </div>
    </div>

    <!-- Cache progress bar -->
    <div v-if="showCacheBar" class="cache-progress">
      <div class="cache-progress-bar">
        <div class="cache-progress-fill" :style="{ width: cachePercent + '%' }"></div>
      </div>
      <span class="cache-progress-text">{{ t('operation.caching') }} {{ cacheDone }}/{{ cacheTotal }} ({{ cachePercent }}%)</span>
    </div>

    <!-- Content: either router-view (rooms/files/movie) or manual iframe -->
    <template v-if="operationTab === 'rooms'">
      <router-view />
    </template>
    <div v-else-if="operationTab === 'manual'" class="manual-iframe-container">
      <div class="iframe-toolbar">
        <button class="reload-btn" @click="reloadIframe" :title="t('operation.reload')">&#x21bb;</button>
      </div>
      <iframe
        ref="manualIframe"
        src="https://poranos.com/app/manual"
        class="manual-iframe"
        allow="fullscreen"
        @load="sendAuthToIframe"
      ></iframe>
    </div>
    <!-- Toast -->
    <transition name="toast-fade">
      <div v-if="toastMessage" class="toast">{{ toastMessage }}</div>
    </transition>
  </div>
</template>

<style scoped>
.operation-layout {
  max-width: 1200px;
}
.operation-layout:has(.manual-iframe-container) {
  max-width: none;
}

/* Header */
.layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}
.header-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.header-email {
  color: var(--text-secondary);
  font-size: 0.85rem;
}

/* Tab bar */
.tab-bar {
  display: flex;
  gap: 0;
}
.tab-btn {
  padding: 0.5rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.15s, border-color 0.15s;
}
.tab-btn:hover {
  color: var(--text-primary);
}
.tab-btn.active {
  color: var(--accent);
  border-bottom-color: var(--accent);
}

.offline-toggle {
  padding: 0.35rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg-card);
  color: var(--text-secondary);
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}
.offline-toggle:hover {
  border-color: var(--text-secondary);
}
.offline-toggle.active {
  background: #f59e0b;
  color: #000;
  border-color: #f59e0b;
  font-weight: 600;
}

/* Cache progress */
.cache-progress {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}
.cache-progress-bar {
  flex: 1;
  height: 6px;
  background: var(--bg-card);
  border-radius: 3px;
  overflow: hidden;
}
.cache-progress-fill {
  height: 100%;
  background: var(--accent);
  border-radius: 3px;
  transition: width 0.3s ease;
}
.cache-progress-text {
  color: var(--text-secondary);
  font-size: 0.75rem;
  white-space: nowrap;
}

/* Manual iframe */
.manual-iframe-container {
  width: 100%;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
}
.iframe-toolbar {
  display: flex;
  justify-content: flex-end;
  padding: 0 0 0.4rem 0;
}
.reload-btn {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--text-secondary);
  font-size: 1.2rem;
  width: 36px;
  height: 36px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
}
.reload-btn:hover {
  color: var(--accent);
  border-color: var(--accent);
}
.manual-iframe {
  width: 100%;
  flex: 1;
  border: 1px solid var(--border);
  border-radius: 8px;
}
/* Toast */
.toast {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.85);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.9rem;
  z-index: 1000;
  pointer-events: none;
}
.toast-fade-enter-active, .toast-fade-leave-active {
  transition: opacity 0.3s;
}
.toast-fade-enter-from, .toast-fade-leave-to {
  opacity: 0;
}
</style>
