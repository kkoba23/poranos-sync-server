; Custom NSIS include for Poranos Management
; Override the "app is running" check — the update mechanism handles shutdown before launching installer
!macro customCheckAppRunning
  ; No-op: skip the running process check
!macroend
