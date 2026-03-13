import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export type UiMode = 'portable' | 'advance'
export type Language = 'ja' | 'en'

const STORAGE_KEY = 'poranos-settings'

interface PersistedSettings {
  uiMode: UiMode
  language: Language
}

function loadSettings(): PersistedSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* ignore */ }
  return { uiMode: 'portable', language: 'ja' }
}

function saveSettings(s: PersistedSettings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s))
}

export const useSettingsStore = defineStore('settings', () => {
  const saved = loadSettings()
  const uiMode = ref<UiMode>(saved.uiMode)
  const language = ref<Language>(saved.language)

  watch([uiMode, language], () => {
    saveSettings({ uiMode: uiMode.value, language: language.value })
  })

  return { uiMode, language }
})
