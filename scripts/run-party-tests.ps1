# Script para ejecutar tests E2E de Party Mode
# Asegura que el servidor de desarrollo esté corriendo

Write-Host "🧪 Preparando pruebas E2E de Party Mode..." -ForegroundColor Cyan
Write-Host ""

# Verificar si el servidor ya está corriendo
$serverRunning = $false
try {
    $response = Invoke-WebRequest -Uri "http://localhost:4321" -TimeoutSec 2 -UseBasicParsing -ErrorAction SilentlyContinue
    if ($response.StatusCode -eq 200) {
        $serverRunning = $true
    }
} catch {
    $serverRunning = $false
}

if ($serverRunning) {
    Write-Host "✅ Servidor de desarrollo ya está corriendo en http://localhost:4321" -ForegroundColor Green
} else {
    Write-Host "⚠️  Servidor no detectado. Por favor, inicia el servidor en otra terminal con:" -ForegroundColor Yellow
    Write-Host "   cd saberparatodos" -ForegroundColor Gray
    Write-Host "   npm run dev" -ForegroundColor Gray
    Write-Host ""
    Write-Host "❌ Cancelando tests..." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🚀 Ejecutando tests de Party Mode con 4 estudiantes..." -ForegroundColor Green
Write-Host ""

# Cambiar al directorio saberparatodos
Set-Location -Path "$PSScriptRoot\..\saberparatodos"

# Ejecutar tests
$headed = $args[0] -eq "--headed"

if ($headed) {
    Write-Host "🖥️  Modo: Con UI visible (--headed)" -ForegroundColor Cyan
    npx playwright test party-mode.spec.ts --headed
} else {
    Write-Host "🤖 Modo: Headless (sin UI)" -ForegroundColor Cyan
    npx playwright test party-mode.spec.ts
}

$exitCode = $LASTEXITCODE

Write-Host ""
if ($exitCode -eq 0) {
    Write-Host "✅ Tests completados exitosamente!" -ForegroundColor Green
} else {
    Write-Host "❌ Tests fallaron. Revisa los logs arriba." -ForegroundColor Red
}

exit $exitCode
