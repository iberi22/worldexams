$ErrorActionPreference = "Stop"

Write-Host "🚀 Starting E2E Test Suite..." -ForegroundColor Cyan

# 1. Cleanup ports
Write-Host "🧹 Cleaning up ports..." -ForegroundColor Yellow
try {
    $portProcess = Get-NetTCPConnection -LocalPort 4321 -ErrorAction SilentlyContinue
    if ($portProcess) {
        Stop-Process -Id $portProcess.OwningProcess -Force -ErrorAction SilentlyContinue
        Write-Host "   Freed port 4321"
    }
} catch {}

# 2. Start Rust Backend
Write-Host "🦀 Starting Rust Party Server..." -ForegroundColor Yellow
$rustServerPath = "e:\scripts-python\worldexams\party-server-rust\target\debug\party-server.exe"
$rustProcess = Start-Process -FilePath $rustServerPath -RedirectStandardOutput "rust_server.log" -RedirectStandardError "rust_server_err.log" -PassThru -WindowStyle Hidden
Write-Host "   Rust Server PID: $($rustProcess.Id)"

# 3. Start Astro Frontend
Write-Host "⭐ Starting Astro Frontend..." -ForegroundColor Yellow
$astroProcess = Start-Process -FilePath "npm.cmd" -ArgumentList "run dev -- --port 4321" -WorkingDirectory "e:\scripts-python\worldexams\saberparatodos" -PassThru -WindowStyle Hidden
Write-Host "   Astro Server PID: $($astroProcess.Id)"

# Wait for servers to initialize
Write-Host "⏳ Waiting 15 seconds for servers to be ready..."
Start-Sleep -Seconds 15

try {
    # 3. Run Playwright Tests
    Write-Host "🎭 Running Playwright Tests..." -ForegroundColor Magenta
    Set-Location "e:\scripts-python\worldexams\saberparatodos"
    npx playwright test
}
catch {
    Write-Host "❌ Tests Failed!" -ForegroundColor Red
    $PSItem | Out-String | Write-Host
}
finally {
    # 4. Cleanup
    Write-Host "🧹 Cleaning up processes..." -ForegroundColor Yellow
    
    if ($rustProcess -and -not $rustProcess.HasExited) {
        Stop-Process -Id $rustProcess.Id -Force
        Write-Host "   Stopped Rust Server"
    }

    if ($astroProcess -and -not $astroProcess.HasExited) {
        # npm run dev spawns child processes, we might need to kill node/astro specifically if Stop-Process isn't enough
        # But for now, let's try stopping the process handle
        Stop-Process -Id $astroProcess.Id -Force
        Write-Host "   Stopped Astro Server"
        
        # Aggressive cleanup for node/astro on port 4321 if needed
        # Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
    }
    
    Write-Host "✅ Done." -ForegroundColor Green
}
