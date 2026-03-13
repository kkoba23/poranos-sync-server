import { computed } from 'vue'
import { useSettingsStore } from '@/stores/settingsStore'

const messages: Record<string, string> = {
  // ── Sidebar / Navigation ──
  'nav.settings': 'Settings',
  'nav.settings.ja': '設定',
  'nav.operation': 'Operation',
  'nav.operation.ja': 'オペレーション',
  'nav.files': 'Files',
  'nav.files.ja': 'ファイル',
  'nav.devices': 'Devices',
  'nav.devices.ja': 'デバイス',
  'nav.mirroring': 'Mirroring',
  'nav.mirroring.ja': 'ミラーリング',
  'nav.syncServer': 'Sync Server',
  'nav.syncServer.ja': '同期サーバー',
  'nav.login': 'Login',
  'nav.login.ja': 'ログイン',

  // ── Settings page ──
  'settings.title': 'Settings',
  'settings.title.ja': '設定',
  'settings.uiMode': 'UI Mode',
  'settings.uiMode.ja': 'UIモード',
  'settings.uiMode.portable': 'Portable',
  'settings.uiMode.portable.ja': 'ポータブル',
  'settings.uiMode.advance': 'Advance',
  'settings.uiMode.advance.ja': 'アドバンス',
  'settings.uiMode.portableDesc': 'Simple view for single device use',
  'settings.uiMode.portableDesc.ja': '1台のデバイス向けのシンプル表示',
  'settings.uiMode.advanceDesc': 'Full-featured view for multi-device management',
  'settings.uiMode.advanceDesc.ja': '複数デバイス管理向けの全機能表示',
  'settings.language': 'Language',
  'settings.language.ja': '言語',
  'settings.update': 'App Update',
  'settings.update.ja': 'アプリ更新',
  'settings.update.current': 'Current version',
  'settings.update.current.ja': '現在のバージョン',
  'settings.update.latest': 'Latest version',
  'settings.update.latest.ja': '最新バージョン',
  'settings.update.check': 'Check for updates',
  'settings.update.check.ja': '更新を確認',
  'settings.update.install': 'Download & Install',
  'settings.update.install.ja': 'ダウンロード＆インストール',
  'settings.update.downloading': 'Downloading...',
  'settings.update.downloading.ja': 'ダウンロード中...',
  'settings.update.upToDate': 'Up to date',
  'settings.update.upToDate.ja': '最新です',

  // ── Portable view ──
  'portable.noDevices': 'No devices connected',
  'portable.noDevices.ja': 'デバイスが接続されていません',
  'portable.connecting': 'Connecting...',
  'portable.connecting.ja': '接続中...',
  'portable.searchingDevices': 'Searching for devices...',
  'portable.searchingDevices.ja': 'デバイス検索中...',
  'portable.mirroring': 'Mirroring',
  'portable.mirroring.ja': 'ミラーリング',
  'portable.deviceInfo': 'Device Info',
  'portable.deviceInfo.ja': 'デバイス情報',
  'portable.model': 'Model',
  'portable.model.ja': 'モデル',
  'portable.battery': 'Battery',
  'portable.battery.ja': 'バッテリー',
  'portable.controllerBattery': 'Controller',
  'portable.controllerBattery.ja': 'コントローラー',
  'portable.wifi': 'WiFi',
  'portable.wifi.ja': 'WiFi',
  'portable.app': 'App',
  'portable.app.ja': 'アプリ',
  'portable.appRunning': 'Running',
  'portable.appRunning.ja': '実行中',
  'portable.appStopped': 'Stopped',
  'portable.appStopped.ja': '停止',
  'portable.appNotInstalled': 'Not installed',
  'portable.appNotInstalled.ja': '未インストール',
  'portable.syncServer': 'Sync Server',
  'portable.syncServer.ja': '同期サーバー',
  'portable.syncConnected': 'Connected',
  'portable.syncConnected.ja': '接続中',
  'portable.syncDisconnected': 'Disconnected',
  'portable.syncDisconnected.ja': '未接続',
  'portable.storage': 'Storage',
  'portable.storage.ja': 'ストレージ',
  'portable.volume': 'Volume',
  'portable.volume.ja': '音量',
  'portable.launch': 'Launch',
  'portable.launch.ja': '起動',
  'portable.stop': 'Stop',
  'portable.stop.ja': '停止',
  'portable.reboot': 'Reboot',
  'portable.reboot.ja': '再起動',
  'portable.account': 'Account',
  'portable.account.ja': 'アカウント',
  'portable.provisioning': 'Provisioning',
  'portable.provisioning.ja': 'プロビジョニング',
  'portable.provisioned': 'Done',
  'portable.provisioned.ja': '済',
  'portable.notProvisioned': 'Not yet',
  'portable.notProvisioned.ja': '未済',
  'portable.launchAll': 'Poranos Launch',
  'portable.launchAll.ja': 'Poranos起動',
  'portable.stopAll': 'Poranos Stop',
  'portable.stopAll.ja': 'Poranos停止',

  // ── Sidebar controls ──
  'sidebar.autoLaunch': 'Auto Launch',
  'sidebar.autoLaunch.ja': '自動起動',
  'sidebar.allStop': 'All Stop + Reset',
  'sidebar.allStop.ja': '全停止 + リセット',
  'sidebar.allStopProgress': 'Stopping...',
  'sidebar.allStopProgress.ja': '停止中...',
  'sidebar.allVolume': 'All Volume',
  'sidebar.allVolume.ja': '全体音量',
  'sidebar.apply': 'Apply',
  'sidebar.apply.ja': '適用',
  'sidebar.logout': 'Logout',
  'sidebar.logout.ja': 'ログアウト',
  'sidebar.kioskMode': 'Kiosk Mode',
  'sidebar.kioskMode.ja': 'キオスクモード',
  'sidebar.exitFullscreen': 'Exit Fullscreen',
  'sidebar.exitFullscreen.ja': '全画面解除',
  'sidebar.reload': 'Reload',
  'sidebar.reload.ja': 'リロード',
}

// Build lookup: { key: { en, ja } }
const dict: Record<string, { en: string; ja: string }> = {}
for (const key of Object.keys(messages)) {
  if (key.endsWith('.ja')) continue
  const en = messages[key]
  const ja = messages[`${key}.ja`] || en
  dict[key] = { en, ja }
}

export function useI18n() {
  const settings = useSettingsStore()

  function t(key: string): string {
    const entry = dict[key]
    if (!entry) return key
    return settings.language === 'ja' ? entry.ja : entry.en
  }

  const lang = computed(() => settings.language)

  return { t, lang }
}
