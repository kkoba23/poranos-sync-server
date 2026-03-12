# Poranos Management UI auto-open script
# Starts Docker Desktop if needed, waits for management container, then opens browser

$maxWait = 300  # seconds (Docker startup can be slow)
$interval = 5
$url = "http://127.0.0.1:8080"
$elapsed = 0

# Start ADB server on all interfaces (needed for Docker container access)
Write-Host "Starting ADB server..."
& adb kill-server 2>$null
Start-Process -FilePath "adb" -ArgumentList "-a","-P","5037","nodaemon","server" -WindowStyle Hidden

# Start Docker Desktop if not running
$docker = Get-Process "Docker Desktop" -ErrorAction SilentlyContinue
if (-not $docker) {
    Write-Host "Starting Docker Desktop..."
    Start-Process "C:\Program Files\Docker\Docker\Docker Desktop.exe"
}

Write-Host "Waiting for Poranos Management to be ready..."

while ($elapsed -lt $maxWait) {
    try {
        $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 3 -ErrorAction Stop
        if ($response.StatusCode -eq 200) {
            Write-Host "Management UI is ready. Opening browser..."
            Start-Process $url
            exit 0
        }
    } catch {
        # Not ready yet
    }
    Start-Sleep -Seconds $interval
    $elapsed += $interval
    Write-Host "  Waiting... ($elapsed/$maxWait sec)"
}

Write-Host "Timed out waiting for Management UI."
