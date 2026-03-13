const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  isElectron: true,
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  launchInstaller: (filePath) => ipcRenderer.invoke('launch-installer', filePath),
})
