export interface ConnectionMetrics {
  total: number
  current: number
}

export interface PingMetrics {
  avg: number
  min: number
  max: number
  p50: number
  p95: number
  samples: number
}

export interface RttMetrics {
  clients: number
  avg: number
  min: number
  max: number
}

export interface RoomDetail {
  clients: number
  objects: number
}

export interface MetricsSnapshot {
  timestamp: string
  uptime_seconds: number
  connections: ConnectionMetrics
  rooms: {
    count: number
    details: Record<string, RoomDetail>
  }
  clients_total: number
  objects_total: number
  messages: {
    total: number
    by_type: Record<string, number>
  }
  ping_processing_ms: PingMetrics
  client_rtt_ms: RttMetrics
}

export interface ServerStatus {
  status: 'running' | 'stopped' | 'restarting' | 'error' | 'not_found'
  container_id?: string
  uptime_seconds?: number
  started_at?: string
}

export interface Device {
  serial: string
  adb_serial?: string
  hw_serial?: string
  connection_type?: 'usb' | 'wifi'
  wifi_serial?: string
  usb_serial?: string
  status: string
  model: string
  battery_level?: number
  battery_plugged?: boolean
  battery_charging_ma?: number
  battery_weak_charger?: boolean
  controller_left_battery?: number
  controller_right_battery?: number
  app_installed: boolean
  app_version?: string
  app_running: boolean
  wakefulness?: string
  volume_music?: number
  volume_max?: number
  android_id?: string
  wifi_ssid?: string
  provisioned?: boolean
  sync_connected?: boolean
  sync_room?: string
  sync_client_id?: number
  sync_connected_via?: string
  webrtc_available: boolean
}

export interface InstallTask {
  task_id: string
  status: 'queued' | 'installing' | 'success' | 'failed' | 'cancelled'
  device_serial: string
  apk_filename: string
  progress_percent: number
  message?: string
  started_at?: string
  completed_at?: string
}

export interface SignalingDevice {
  device_id: string
  room_name: string
  client_id: number
}

export interface DeviceStream {
  deviceId: string
  stream: MediaStream | null
  state: 'connecting' | 'connected' | 'disconnected' | 'failed'
}
