const { app, BrowserWindow, dialog, ipcMain, shell } = require('electron')
const { spawn } = require('child_process')
const path = require('path')
const fs = require('fs')
const http = require('http')

const BACKEND_PORT = 8080
const SYNC_SERVER_PORT = 8765
const BACKEND_URL = `http://localhost:${BACKEND_PORT}`

let backendProcess = null
let syncServerProcess = null
let mainWindow = null
let logStream = null

function getLogPath() {
  return path.join(app.getPath('userData'), 'poranos-desktop.log')
}

function log(msg) {
  const line = `${new Date().toISOString()} ${msg}`
  console.log(line)
  if (logStream) {
    logStream.write(line + '\n')
  }
}

function getExePath(name) {
  if (app.isPackaged) {
    const ext = process.platform === 'win32' ? '.exe' : ''
    return path.join(process.resourcesPath, name, `${name}${ext}`)
  }
  return null
}

function spawnProcess(name, exePath, env) {
  return new Promise((resolve, reject) => {
    log(`[Electron] Starting ${name}: ${exePath}`)

    const proc = spawn(exePath, [], {
      env: { ...process.env, ...env },
      stdio: ['ignore', 'pipe', 'pipe'],
    })

    proc.stdout.on('data', (data) => {
      log(`[${name}] ${data.toString().trim()}`)
    })

    proc.stderr.on('data', (data) => {
      log(`[${name}:err] ${data.toString().trim()}`)
    })

    proc.on('error', (err) => {
      log(`[Electron] Failed to start ${name}: ${err.message}`)
      reject(err)
    })

    proc.on('exit', (code) => {
      log(`[Electron] ${name} exited with code ${code}`)
    })

    resolve(proc)
  })
}

function startSyncServer() {
  const exePath = getExePath('sync-server')
  if (!exePath) {
    console.log('[Electron] Dev mode: expecting sync-server externally')
    return Promise.resolve(null)
  }

  return spawnProcess('sync-server', exePath, {
    PORANOS_HOST: '0.0.0.0',
    PORANOS_PORT: String(SYNC_SERVER_PORT),
  })
}

function startBackend() {
  const exePath = getExePath('backend')
  if (!exePath) {
    console.log('[Electron] Dev mode: expecting backend at', BACKEND_URL)
    return Promise.resolve(null)
  }

  return spawnProcess('backend', exePath, {
    MGMT_PORT: String(BACKEND_PORT),
    STANDALONE: '1',
  })
}

function waitForReady(url, retries = 30) {
  return new Promise((resolve, reject) => {
    function attempt(remaining) {
      if (remaining <= 0) {
        reject(new Error(`${url} failed to respond within timeout`))
        return
      }

      const req = http.get(url, (res) => {
        if (res.statusCode === 200) {
          resolve()
        } else {
          setTimeout(() => attempt(remaining - 1), 500)
        }
      })

      req.on('error', () => {
        setTimeout(() => attempt(remaining - 1), 500)
      })

      req.end()
    }
    attempt(retries)
  })
}

function killProcess(proc, name) {
  if (!proc || proc.exitCode !== null) return

  log(`[Electron] Stopping ${name}...`)

  // On Windows, SIGTERM doesn't work reliably — use taskkill
  if (process.platform === 'win32') {
    try {
      spawn('taskkill', ['/pid', String(proc.pid), '/f', '/t'], { stdio: 'ignore' })
    } catch (e) {
      proc.kill()
    }
  } else {
    proc.kill('SIGTERM')
    setTimeout(() => {
      if (proc.exitCode === null) proc.kill('SIGKILL')
    }, 3000)
  }
}

function stopAll() {
  killProcess(backendProcess, 'backend')
  killProcess(syncServerProcess, 'sync-server')
  backendProcess = null
  syncServerProcess = null
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    title: 'Poranos Desktop',
    icon: path.join(__dirname, 'poranos.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  mainWindow.loadURL(BACKEND_URL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(async () => {
  // Open log file
  const logPath = getLogPath()
  logStream = fs.createWriteStream(logPath, { flags: 'a' })
  log(`[Electron] Log file: ${logPath}`)
  log(`[Electron] App version: ${app.getVersion()}, Electron: ${process.versions.electron}`)

  try {
    // Start sync-server first, then backend
    syncServerProcess = await startSyncServer()
    backendProcess = await startBackend()

    if (backendProcess) {
      // Wait for backend API to be ready
      await waitForReady(`${BACKEND_URL}/api/server/status`)
      log('[Electron] Backend is ready')
    }
  } catch (err) {
    dialog.showErrorBox(
      'Startup Error',
      `Failed to start servers.\n\n${err.message}\n\nThe application will now exit.`
    )
    stopAll()
    app.quit()
    return
  }

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// IPC handlers for desktop update
ipcMain.handle('get-app-version', () => app.getVersion())

ipcMain.handle('launch-installer', async (_event, filePath) => {
  log(`[Electron] Launching installer: ${filePath}`)
  try {
    // Stop backend/sync-server first, then launch installer as detached process and quit
    stopAll()

    // Write a temporary VBS script that waits then launches the installer
    // wscript runs fully independently and survives the parent process exit
    const vbsPath = path.join(app.getPath('temp'), 'poranos-update.vbs')
    // NSIS FIND_PROCESS checks ALL processes whose Path starts with $INSTDIR.
    // The downloaded installer is inside $INSTDIR, so NSIS detects its own process!
    // Fix: copy installer to TEMP before running, and kill all app processes via WMI.
    const tempInstaller = path.join(app.getPath('temp'), 'poranos-update-installer.exe')
    const installDir = path.dirname(app.getPath('exe')).replace(/\\/g, '\\\\')
    const vbsContent = [
      '\'  Step 1: Copy installer to TEMP so it runs outside $INSTDIR',
      'Set fso = CreateObject("Scripting.FileSystemObject")',
      `fso.CopyFile "${filePath}", "${tempInstaller}", True`,
      '',
      '\'  Step 2: Kill ALL processes from the install directory via WMI',
      `Dim installPath : installPath = LCase("${installDir}")`,
      'Set wmi = GetObject("winmgmts:\\\\.\\root\\cimv2")',
      'Set procs = wmi.ExecQuery("SELECT ProcessId, ExecutablePath FROM Win32_Process")',
      'For Each proc In procs',
      '  On Error Resume Next',
      '  If Not IsNull(proc.ExecutablePath) Then',
      '    If Left(LCase(proc.ExecutablePath), Len(installPath)) = installPath Then',
      '      proc.Terminate',
      '    End If',
      '  End If',
      '  On Error GoTo 0',
      'Next',
      'WScript.Sleep 3000',
      '',
      '\'  Step 3: Launch installer from TEMP',
      `Set shell = CreateObject("WScript.Shell")`,
      `shell.Run """${tempInstaller}""", 1, False`,
    ].join('\r\n')
    fs.writeFileSync(vbsPath, vbsContent, 'utf8')
    log(`[Electron] VBS script written: ${vbsPath}`)

    const child = spawn('wscript', [vbsPath], {
      detached: true,
      stdio: 'ignore',
    })
    child.unref()

    log(`[Electron] Installer scheduled, force exiting...`)
    // Force kill all child processes by name to ensure NSIS won't detect them
    try {
      spawn('taskkill', ['/IM', 'backend.exe', '/F'], { stdio: 'ignore' })
      spawn('taskkill', ['/IM', 'sync-server.exe', '/F'], { stdio: 'ignore' })
    } catch (_) {}
    // Force exit immediately so NSIS doesn't detect running process
    setTimeout(() => process.exit(0), 500)
    return { success: true }
  } catch (err) {
    log(`[Electron] Failed to launch installer: ${err.message}`)
    return { success: false, error: err.message }
  }
})

app.on('window-all-closed', () => {
  stopAll()
  app.quit()
})

app.on('before-quit', () => {
  stopAll()
})
