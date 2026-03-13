<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useSettingsStore } from '@/stores/settingsStore'
import { useI18n } from '@/i18n'
import { post, get } from '@/api/client'
import DeviceSidebar from '@/components/mirroring/DeviceSidebar.vue'
import AppToast from '@/components/AppToast.vue'

const authStore = useAuthStore()
const settings = useSettingsStore()
const { t } = useI18n()
const route = useRoute()

const isPortable = computed(() => settings.uiMode === 'portable')
const showDeviceSidebar = computed(() => !isPortable.value && route.path.startsWith('/operation'))

const sidebarCollapsed = ref(false)
const contentCollapsed = ref(false)
const mirrorCollapsed = ref(false)
const isFullscreen = ref(!!document.fullscreenElement)

// Auto Launch
const autoLaunch = ref(false)
const autoLaunchLoading = ref(false)

// All Stop
const allStopping = ref(false)

// All Volume
const allVolume = ref(8)
const allVolumeApplying = ref(false)

onMounted(async () => {
  try {
    const res = await get<{ enabled: boolean }>('/api/devices/auto-launch')
    autoLaunch.value = res.enabled
  } catch { /* ignore */ }
})

async function toggleAutoLaunch() {
  autoLaunchLoading.value = true
  try {
    const res = await post<{ enabled: boolean }>('/api/devices/auto-launch', { enabled: !autoLaunch.value })
    autoLaunch.value = res.enabled
  } catch { /* ignore */ }
  autoLaunchLoading.value = false
}

async function allStop() {
  allStopping.value = true
  try {
    await post('/api/devices/stop-all')
    await post('/api/server/reset')
  } catch { /* ignore */ }
  allStopping.value = false
}

async function applyAllVolume() {
  allVolumeApplying.value = true
  try {
    await post('/api/devices/volume-all', { volume: allVolume.value })
  } catch { /* ignore */ }
  allVolumeApplying.value = false
}

function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    document.documentElement.requestFullscreen()
  }
}

document.addEventListener('fullscreenchange', () => {
  isFullscreen.value = !!document.fullscreenElement
  if (isFullscreen.value) {
    sessionStorage.setItem('kiosk', '1')
  } else {
    sessionStorage.removeItem('kiosk')
  }
})

// リロード後にKIOSKモードを復帰
if (sessionStorage.getItem('kiosk')) {
  document.addEventListener('click', function restoreKiosk() {
    document.documentElement.requestFullscreen().catch(() => {})
    document.removeEventListener('click', restoreKiosk)
  }, { once: true })
}

function reloadPage() {
  if (document.fullscreenElement) {
    sessionStorage.setItem('kiosk', '1')
  }
  window.location.reload()
}
</script>

<template>
  <div class="app-layout" :class="{ 'sidebar-collapsed': sidebarCollapsed, 'content-collapsed': contentCollapsed, 'mirror-collapsed': mirrorCollapsed, 'no-sidebar': isPortable }">
    <!-- Sidebar: hidden in portable mode -->
    <template v-if="!isPortable">
      <aside class="sidebar">
        <div class="sidebar-title">Poranos</div>
        <ul class="sidebar-nav">
          <li v-if="authStore.isAuthenticated">
            <router-link to="/operation">{{ t('nav.operation') }}</router-link>
          </li>
          <li v-else>
            <router-link to="/login">{{ t('nav.login') }}</router-link>
          </li>
          <li v-if="authStore.isAuthenticated">
            <router-link to="/files">{{ t('nav.files') }}</router-link>
          </li>
          <li><router-link to="/devices">{{ t('nav.devices') }}</router-link></li>
          <li><router-link to="/mirroring">{{ t('nav.mirroring') }}</router-link></li>
          <li><router-link to="/sync-server">{{ t('nav.syncServer') }}</router-link></li>

          <li class="nav-separator"></li>
          <li>
            <router-link to="/settings">{{ t('nav.settings') }}</router-link>
          </li>
        </ul>

        <div class="sidebar-controls">
          <div class="control-row">
            <span class="control-label">{{ t('sidebar.autoLaunch') }}</span>
            <button
              class="toggle-btn"
              :class="{ active: autoLaunch }"
              :disabled="autoLaunchLoading"
              @click="toggleAutoLaunch"
            >{{ autoLaunch ? 'ON' : 'OFF' }}</button>
          </div>
          <button
            class="btn-fullscreen btn-danger-outline"
            :disabled="allStopping"
            @click="allStop"
          >{{ allStopping ? t('sidebar.allStopProgress') : t('sidebar.allStop') }}</button>
          <div class="control-group">
            <span class="control-group-label">{{ t('sidebar.allVolume') }}</span>
            <div class="control-row">
              <input
                type="range"
                min="0"
                max="15"
                v-model.number="allVolume"
                class="volume-slider"
              />
              <span class="volume-value">{{ allVolume }}</span>
              <button
                class="btn-apply"
                :disabled="allVolumeApplying"
                @click="applyAllVolume"
              >{{ allVolumeApplying ? '...' : t('sidebar.apply') }}</button>
            </div>
          </div>
        </div>

        <div class="sidebar-bottom">
          <div v-if="authStore.isAuthenticated" class="auth-info">
            <span class="auth-email">{{ authStore.userEmail }}</span>
            <button class="btn-fullscreen" @click="authStore.logout()">{{ t('sidebar.logout') }}</button>
          </div>
          <button class="btn-fullscreen" @click="toggleFullscreen">
            {{ isFullscreen ? t('sidebar.exitFullscreen') : t('sidebar.kioskMode') }}
          </button>
          <button class="btn-fullscreen" @click="reloadPage">
            {{ t('sidebar.reload') }}
          </button>
        </div>
      </aside>
      <div class="area-divider" @click="sidebarCollapsed = !sidebarCollapsed" :title="sidebarCollapsed ? 'Show sidebar' : 'Hide sidebar'">
        <button class="area-divider-btn">
          {{ sidebarCollapsed ? '&raquo;' : '&laquo;' }}
        </button>
      </div>
    </template>
    <main v-show="!contentCollapsed" class="main-content" :class="{ 'portable-main': isPortable }">
      <router-view />
    </main>
    <div v-if="showDeviceSidebar && !mirrorCollapsed" class="area-divider" @click="contentCollapsed = !contentCollapsed" :title="contentCollapsed ? 'Show content' : 'Hide content'">
      <button class="area-divider-btn">
        {{ contentCollapsed ? '&raquo;' : '&laquo;' }}
      </button>
    </div>
    <div v-if="showDeviceSidebar && !contentCollapsed" class="area-divider" @click="mirrorCollapsed = !mirrorCollapsed" :title="mirrorCollapsed ? 'Show mirroring' : 'Hide mirroring'">
      <button class="area-divider-btn">
        {{ mirrorCollapsed ? '&laquo;' : '&raquo;' }}
      </button>
    </div>
    <aside v-if="showDeviceSidebar && !mirrorCollapsed" class="device-sidebar-area">
      <DeviceSidebar :expanded="contentCollapsed" />
    </aside>
  </div>
  <AppToast />
</template>
