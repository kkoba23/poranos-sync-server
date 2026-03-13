<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useSettingsStore } from '@/stores/settingsStore'
import { useI18n } from '@/i18n'
import { useRouter } from 'vue-router'
import type { UiMode, Language } from '@/stores/settingsStore'

const settings = useSettingsStore()
const { t } = useI18n()
const router = useRouter()

function setMode(mode: UiMode) {
  const changed = settings.uiMode !== mode
  settings.uiMode = mode
  if (changed) {
    if (mode === 'portable') {
      router.push('/portable')
    } else {
      router.push('/operation')
    }
  }
}

function setLanguage(lang: Language) {
  settings.language = lang
}

// Desktop update
const isElectron = !!(window as any).electronAPI?.isElectron
const currentVersion = ref('')
const latestDesktopRelease = ref<any>(null)
const updateChecking = ref(false)
const updateDownloading = ref(false)
const updateError = ref('')
const hasUpdate = computed(() => {
  if (!latestDesktopRelease.value || !currentVersion.value) return false
  return latestDesktopRelease.value.version !== currentVersion.value
})

async function checkForUpdate() {
  updateChecking.value = true
  updateError.value = ''
  try {
    if (isElectron) {
      currentVersion.value = await (window as any).electronAPI.getAppVersion()
    }
    const resp = await fetch('/api/poranos/desktop-release')
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
    latestDesktopRelease.value = await resp.json()
  } catch (e: any) {
    updateError.value = e.message || 'Failed to check for updates'
  } finally {
    updateChecking.value = false
  }
}

async function downloadAndInstall() {
  if (!latestDesktopRelease.value) return
  updateDownloading.value = true
  updateError.value = ''
  try {
    const resp = await fetch(`/api/poranos/desktop-release/${latestDesktopRelease.value.id}/download`, { method: 'POST' })
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
    const data = await resp.json()

    if (isElectron) {
      await (window as any).electronAPI.launchInstaller(data.file_path)
    } else {
      const a = document.createElement('a')
      a.href = `/api/poranos/desktop-release/${latestDesktopRelease.value.id}/download`
      a.download = data.file_name
      a.click()
    }
  } catch (e: any) {
    updateError.value = e.message || 'Download failed'
  } finally {
    updateDownloading.value = false
  }
}

onMounted(checkForUpdate)
</script>

<template>
  <div>
    <h1 class="page-title">{{ t('settings.title') }}</h1>

    <!-- UI Mode -->
    <div class="settings-section">
      <h2 class="section-title">{{ t('settings.uiMode') }}</h2>
      <div class="mode-cards">
        <button
          class="mode-card"
          :class="{ active: settings.uiMode === 'portable' }"
          @click="setMode('portable')"
        >
          <div class="mode-card-header">
            <span class="mode-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                <line x1="12" y1="18" x2="12.01" y2="18"></line>
              </svg>
            </span>
            <span class="mode-name">{{ t('settings.uiMode.portable') }}</span>
          </div>
          <p class="mode-desc">{{ t('settings.uiMode.portableDesc') }}</p>
        </button>
        <button
          class="mode-card"
          :class="{ active: settings.uiMode === 'advance' }"
          @click="setMode('advance')"
        >
          <div class="mode-card-header">
            <span class="mode-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
            </span>
            <span class="mode-name">{{ t('settings.uiMode.advance') }}</span>
          </div>
          <p class="mode-desc">{{ t('settings.uiMode.advanceDesc') }}</p>
        </button>
      </div>
    </div>

    <!-- Language -->
    <div class="settings-section">
      <h2 class="section-title">{{ t('settings.language') }}</h2>
      <div class="language-toggle">
        <button
          class="lang-btn"
          :class="{ active: settings.language === 'ja' }"
          @click="setLanguage('ja')"
        >日本語</button>
        <button
          class="lang-btn"
          :class="{ active: settings.language === 'en' }"
          @click="setLanguage('en')"
        >English</button>
      </div>
    </div>

    <!-- App Update -->
    <div class="settings-section">
      <h2 class="section-title">{{ t('settings.update') }}</h2>
      <div class="update-section">
        <div class="update-row">
          <span class="update-label">{{ t('settings.update.current') }}</span>
          <span class="update-version">v{{ currentVersion || '?' }}</span>
        </div>

        <div v-if="latestDesktopRelease" class="update-row">
          <span class="update-label">{{ t('settings.update.latest') }}</span>
          <span class="update-version" :class="{ 'has-update': hasUpdate }">
            v{{ latestDesktopRelease.version }}
          </span>
        </div>

        <div v-if="updateError" class="update-error">{{ updateError }}</div>

        <div class="update-actions">
          <button
            class="btn btn-secondary btn-sm"
            :disabled="updateChecking"
            @click="checkForUpdate"
          >{{ updateChecking ? '...' : t('settings.update.check') }}</button>

          <button
            v-if="hasUpdate"
            class="btn btn-primary btn-sm"
            :disabled="updateDownloading"
            @click="downloadAndInstall"
          >{{ updateDownloading ? t('settings.update.downloading') : t('settings.update.install') }}</button>

          <span v-if="latestDesktopRelease && !hasUpdate && !updateChecking" class="update-uptodate">
            {{ t('settings.update.upToDate') }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.settings-section {
  margin-bottom: 2rem;
}
.section-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
}

.mode-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}
.mode-card {
  background: var(--bg-card);
  border: 2px solid var(--border);
  border-radius: var(--radius);
  padding: 1.25rem;
  cursor: pointer;
  text-align: left;
  transition: all 0.15s;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.mode-card:hover {
  border-color: var(--accent);
  background: rgba(59, 130, 246, 0.05);
}
.mode-card.active {
  border-color: var(--accent);
  background: rgba(59, 130, 246, 0.1);
  box-shadow: 0 0 0 1px var(--accent);
}
.mode-card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.mode-icon {
  color: var(--accent);
  flex-shrink: 0;
}
.mode-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
}
.mode-desc {
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.4;
}

.language-toggle {
  display: flex;
  gap: 2px;
  background: var(--border);
  border-radius: var(--radius);
  padding: 2px;
  width: fit-content;
}
.lang-btn {
  padding: 0.5rem 1.5rem;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 0.9rem;
  border-radius: calc(var(--radius) - 2px);
  transition: all 0.15s;
}
.lang-btn.active {
  background: var(--bg-card);
  color: var(--text-primary);
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}
.lang-btn:hover:not(.active) {
  color: var(--text-primary);
}

/* Update section */
.update-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.update-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 300px;
  font-size: 0.9rem;
}
.update-label {
  color: var(--text-secondary);
}
.update-version {
  font-family: monospace;
  font-weight: 600;
  color: var(--text-primary);
}
.update-version.has-update {
  color: var(--accent, #3b82f6);
}
.update-error {
  font-size: 0.85rem;
  color: var(--danger, #ef4444);
}
.update-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
}
.update-uptodate {
  font-size: 0.85rem;
  color: var(--success, #22c55e);
}
</style>
