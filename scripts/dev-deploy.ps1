#!/usr/bin/env pwsh
<#
.SYNOPSIS
    WorldExams Dev Deploy — Build + Preview local para testing
.DESCRIPTION
    Prepara y levanta el entorno de desarrollo para probar cambios localmente.
    Usa variables de entorno separadas de production.
.PARAMETER Clean
    Elimina node_modules y hace fresh install antes de build
.PARAMETER BuildOnly
    Solo build, no inicia dev server
.PARAMETER Port
    Puerto para el preview server (default: 4321)
.EXAMPLE
    ./scripts/dev-deploy.ps1
    ./scripts/dev-deploy.ps1 -Clean
    ./scripts/dev-deploy.ps1 -BuildOnly
#>

param(
    [switch]$Clean,
    [switch]$BuildOnly,
    [int]$Port = 4321
)

$ROOT = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$SABERPARATODOS = Join-Path $ROOT "saberparatodos"
$DEV_ENV = Join-Path $ROOT ".env.development"

Write-Host "⚡ WorldExams Dev Deploy" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan

# ── Step 0: Validate ───────────────────────────────────────────
Write-Host "`n📋 Step 0: Validating..." -ForegroundColor Yellow

# Check for uncommitted changes
$status = git -C $ROOT status --porcelain
if ($status) {
    Write-Host "  ⚠️  Uncommitted changes detected:" -ForegroundColor Yellow
    $status | ForEach-Object { Write-Host "     $_" -ForegroundColor Gray }
    $choice = Read-Host "  Continue anyway? (y/N)"
    if ($choice -ne "y") {
        Write-Host "  ❌ Aborted. Commit or stash your changes first." -ForegroundColor Red
        exit 1
    }
}

# ── Step 1: Clean install ──────────────────────────────────────
if ($Clean) {
    Write-Host "`n🧹 Step 1: Clean install..." -ForegroundColor Yellow
    if (Test-Path (Join-Path $SABERPARATODOS "node_modules")) {
        Remove-Item -Recurse -Force (Join-Path $SABERPARATODOS "node_modules")
        Write-Host "  ✅ Removed node_modules"
    }
    Remove-Item -Recurse -Force (Join-Path $SABERPARATODOS "dist") -ErrorAction SilentlyContinue
}

Write-Host "`n📦 Step 1: Installing dependencies..." -ForegroundColor Yellow
Set-Location $ROOT
npm install 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "  ❌ npm install failed" -ForegroundColor Red
    exit 1
}
Write-Host "  ✅ Dependencies installed"

# ── Step 2: Generate build info ─────────────────────────────────
Write-Host "`n🔧 Step 2: Generating build info..." -ForegroundColor Yellow
Set-Location $SABERPARATODOS
node scripts/generate-build-info.js 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "  ⚠️  generate-build-info had warnings, continuing..." -ForegroundColor Yellow
} else {
    Write-Host "  ✅ Build info generated"
}

node scripts/generate-static-packs.js 2>&1 | Out-Null
if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✅ Static packs generated"
}

# ── Step 3: Build ───────────────────────────────────────────────
Write-Host "`n🏗️  Step 3: Building saberparatodos..." -ForegroundColor Yellow
npx astro build 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "  ❌ Build failed! Check errors above." -ForegroundColor Red
    exit 1
}
Write-Host "  ✅ Build successful"

# ── Step 4: Dev Server or Preview ─────────────────────────────
if ($BuildOnly) {
    Write-Host "`n✅ Dev deploy complete (build only)." -ForegroundColor Green
    Write-Host "   Artifacts in: $SABERPARATODOS/dist/"
    exit 0
}

Write-Host "`n🚀 Step 4: Starting preview server on port $Port..." -ForegroundColor Yellow
Write-Host "   Open: http://localhost:$Port" -ForegroundColor Green
Write-Host "   Press Ctrl+C to stop.`n" -ForegroundColor Gray

npx astro preview --port $Port
