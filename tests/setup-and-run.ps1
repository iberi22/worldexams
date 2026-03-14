# E2E Test Suite Setup & Execution
# World Exams - Security & Performance Tests

Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "🧪 E2E TEST SUITE - SETUP & EXECUTION" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`n" -ForegroundColor Cyan

# Verificar Node.js
Write-Host "📦 Verificando dependencias..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if ($nodeVersion) {
    Write-Host "   ✅ Node.js: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "   ❌ Node.js no encontrado. Instalar desde https://nodejs.org" -ForegroundColor Red
    exit 1
}

# Cambiar a directorio de tests
Set-Location -Path "tests"

# Instalar dependencias
Write-Host "`n📥 Instalando Playwright..." -ForegroundColor Yellow
npm install

# Instalar navegadores de Playwright
Write-Host "`n🌐 Instalando navegadores..." -ForegroundColor Yellow
npx playwright install

Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "✅ SETUP COMPLETADO" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`n" -ForegroundColor Cyan

Write-Host "📋 Comandos disponibles:`n" -ForegroundColor Cyan
Write-Host "   npm test              - Ejecutar todos los tests" -ForegroundColor White
Write-Host "   npm run test:headed   - Ejecutar con navegador visible" -ForegroundColor White
Write-Host "   npm run test:ui       - Abrir UI interactiva" -ForegroundColor White
Write-Host "   npm run test:debug    - Modo debug" -ForegroundColor White
Write-Host "   npm run test:report   - Ver reporte HTML`n" -ForegroundColor White

Write-Host "🚀 Ejecutar tests ahora? (Y/N): " -ForegroundColor Yellow -NoNewline
$response = Read-Host

if ($response -eq 'Y' -or $response -eq 'y') {
    Write-Host "`n🧪 Ejecutando tests...`n" -ForegroundColor Cyan
    npm test

    Write-Host "`n📊 Generando reporte...`n" -ForegroundColor Cyan
    npm run test:report
} else {
    Write-Host "`n✅ Setup completo. Ejecuta 'npm test' cuando estés listo.`n" -ForegroundColor Green
}

Set-Location -Path ".."
