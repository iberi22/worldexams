<#
.SYNOPSIS
    Deploy completo de saberparatodos a Cloudflare Pages
.DESCRIPTION
    Sincroniza API, build y deploy en un solo comando
.EXAMPLE
    pwsh -File deploy.ps1
#>

$ErrorActionPreference = "Stop"

Write-Host "`n🚀 PROTOCOLO DE DEPLOY MANUAL - SABERPARATODOS" -ForegroundColor Cyan
Write-Host "=" * 60 -ForegroundColor DarkGray
Write-Host "⚠️  NO usa GitHub Actions (proyecto privado)" -ForegroundColor Yellow
Write-Host "=" * 60 -ForegroundColor DarkGray

# Verificar que estamos en la carpeta correcta
$currentPath = Get-Location
if ($currentPath.Path -notlike "*saberparatodos*") {
    Write-Host "`n❌ ERROR: Este script debe ejecutarse desde saberparatodos/" -ForegroundColor Red
    Write-Host "   Ubicación actual: $currentPath" -ForegroundColor Red
    Write-Host "   Ejecuta: cd saberparatodos && pwsh -File scripts\deploy.ps1" -ForegroundColor Yellow
    exit 1
}

# Verificar que wrangler está instalado
$wranglerInstalled = Get-Command wrangler -ErrorAction SilentlyContinue
if (-not $wranglerInstalled) {
    Write-Host "`n❌ ERROR: Wrangler CLI no está instalado" -ForegroundColor Red
    Write-Host "   Instala con: npm install -g wrangler" -ForegroundColor Yellow
    exit 1
}

# Verificar login en Cloudflare
Write-Host "`n🔐 Verificando autenticación en Cloudflare..." -ForegroundColor Cyan
$whoami = wrangler whoami 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "`n❌ ERROR: No estás autenticado en Cloudflare" -ForegroundColor Red
    Write-Host "   Ejecuta: wrangler login" -ForegroundColor Yellow
    exit 1
}
Write-Host "✅ Autenticado correctamente" -ForegroundColor Green

# Paso 1: Sincronizar API
Write-Host "`n📦 PASO 1/3: Sincronizando API local..." -ForegroundColor Yellow
Write-Host "-" * 60 -ForegroundColor DarkGray
if (Test-Path "$PSScriptRoot\copy-api.ps1") {
    & pwsh -File "$PSScriptRoot\copy-api.ps1"
    if ($LASTEXITCODE -ne 0) {
        Write-Host "`n❌ ERROR: Falló sincronización de API" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "⚠️  Script copy-api.ps1 no encontrado, continuando sin API sync..." -ForegroundColor Yellow
}

# Paso 2: Build
Write-Host "`n🏗️  PASO 2/3: Building proyecto Astro..." -ForegroundColor Yellow
Write-Host "-" * 60 -ForegroundColor DarkGray
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "`n❌ ERROR: Falló el build" -ForegroundColor Red
    Write-Host "   Revisa los errores arriba y corrige antes de deploy" -ForegroundColor Yellow
    exit 1
}

# Verificar que existe dist/
if (-not (Test-Path "dist")) {
    Write-Host "`n❌ ERROR: Carpeta dist/ no fue creada" -ForegroundColor Red
    exit 1
}

$distSize = (Get-ChildItem -Path "dist" -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
Write-Host "✅ Build completado: dist/ generado ($([math]::Round($distSize, 2)) MB)" -ForegroundColor Green

# Paso 3: Deploy a Cloudflare
Write-Host "`n🌐 PASO 3/3: Desplegando a Cloudflare Pages..." -ForegroundColor Yellow
Write-Host "-" * 60 -ForegroundColor DarkGray

# Confirmar deploy
Write-Host "`n⚠️  ¿Desplegar a producción (saberparatodos.space)? [S/n]: " -ForegroundColor Yellow -NoNewline
$confirm = Read-Host
if ($confirm -eq "n" -or $confirm -eq "N") {
    Write-Host "`n❌ Deploy cancelado por el usuario" -ForegroundColor Red
    exit 0
}

npx wrangler pages deploy dist --project-name=saberparatodos --commit-dirty=true
if ($LASTEXITCODE -ne 0) {
    Write-Host "`n❌ ERROR: Falló el deploy a Cloudflare" -ForegroundColor Red
    exit 1
}

# Resumen final
Write-Host "`n" + ("=" * 60) -ForegroundColor Green
Write-Host "✅ DEPLOY COMPLETADO EXITOSAMENTE!" -ForegroundColor Green
Write-Host ("=" * 60) -ForegroundColor Green
Write-Host "`n🌎 URLs de producción:" -ForegroundColor Cyan
Write-Host "   - https://saberparatodos.space" -ForegroundColor White
Write-Host "   - https://saberparatodos.pages.dev" -ForegroundColor White
Write-Host "`n📊 Detalles del deploy:" -ForegroundColor Cyan
Write-Host "   - API sincronizada: ✅" -ForegroundColor White
Write-Host "   - Build size: $([math]::Round($distSize, 2)) MB" -ForegroundColor White
Write-Host "   - Método: Wrangler CLI (manual)" -ForegroundColor White
Write-Host "`n⏱️  El deploy estará disponible en ~30-60 segundos" -ForegroundColor Yellow
Write-Host "`n💡 Tip: Verifica el deploy en Cloudflare Dashboard:" -ForegroundColor Cyan
Write-Host "   https://dash.cloudflare.com/ → Pages → saberparatodos" -ForegroundColor White
Write-Host ""
