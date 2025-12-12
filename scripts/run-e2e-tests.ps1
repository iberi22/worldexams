#!/usr/bin/env pwsh
# Script para ejecutar servidor y tests E2E automáticamente
# Autor: World Exams Organization
# Fecha: 2025-12-12

param(
    [switch]$Headed = $false,
    [switch]$SkipBuild = $false,
    [int]$Port = 4321,
    [int]$Timeout = 120
)

$ErrorActionPreference = "Stop"

Write-Host "🚀 World Exams - E2E Test Runner" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Cambiar al directorio saberparatodos
$projectDir = Join-Path $PSScriptRoot ".." "saberparatodos"
Set-Location -Path $projectDir

# Variables
$serverUrl = "http://localhost:$Port"
$serverProcess = $null

function Test-ServerRunning {
    try {
        $response = Invoke-WebRequest -Uri $serverUrl -TimeoutSec 2 -UseBasicParsing -ErrorAction SilentlyContinue
        return $response.StatusCode -eq 200
    } catch {
        return $false
    }
}

function Start-DevServer {
    Write-Host "📦 Instalando dependencias..." -ForegroundColor Yellow
    npm install --silent

    if (-not $SkipBuild) {
        Write-Host "🔨 Verificando build..." -ForegroundColor Yellow
        npm run astro check
    }

    Write-Host "🌐 Iniciando servidor de desarrollo en puerto $Port..." -ForegroundColor Green
    $serverProcess = Start-Process -FilePath "npm" -ArgumentList "run", "dev" -PassThru -NoNewWindow

    # Esperar a que el servidor esté listo
    $elapsed = 0
    $maxWait = 30

    Write-Host "⏳ Esperando a que el servidor esté listo..." -ForegroundColor Yellow

    while (-not (Test-ServerRunning) -and $elapsed -lt $maxWait) {
        Start-Sleep -Seconds 1
        $elapsed++
        Write-Host "." -NoNewline
    }

    Write-Host ""

    if (Test-ServerRunning) {
        Write-Host "✅ Servidor listo en $serverUrl" -ForegroundColor Green
        return $serverProcess
    } else {
        Write-Host "❌ Timeout esperando al servidor" -ForegroundColor Red
        if ($serverProcess) {
            Stop-Process -Id $serverProcess.Id -Force -ErrorAction SilentlyContinue
        }
        exit 1
    }
}

function Stop-DevServer {
    param($Process)

    if ($Process -and -not $Process.HasExited) {
        Write-Host "🛑 Deteniendo servidor..." -ForegroundColor Yellow
        Stop-Process -Id $Process.Id -Force -ErrorAction SilentlyContinue

        # Cleanup: matar procesos de Node.js en el puerto
        $processes = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess
        foreach ($pid in $processes) {
            Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
        }
    }
}

try {
    # Verificar si el servidor ya está corriendo
    if (Test-ServerRunning) {
        Write-Host "⚠️  Servidor ya está corriendo en $serverUrl" -ForegroundColor Yellow
        Write-Host "📝 Usando servidor existente..." -ForegroundColor Cyan
        $serverProcess = $null
    } else {
        $serverProcess = Start-DevServer
    }

    Write-Host ""
    Write-Host "🧪 Ejecutando tests E2E de Party Mode..." -ForegroundColor Cyan
    Write-Host "═══════════════════════════════════════════" -ForegroundColor Cyan
    Write-Host ""

    # Ejecutar tests
    if ($Headed) {
        Write-Host "🖥️  Modo: Con UI visible (--headed)" -ForegroundColor Cyan
        npx playwright test party-mode.spec.ts --headed --timeout=$($Timeout * 1000)
    } else {
        Write-Host "🤖 Modo: Headless (sin UI)" -ForegroundColor Cyan
        npx playwright test party-mode.spec.ts --timeout=$($Timeout * 1000)
    }

    $testExitCode = $LASTEXITCODE

    Write-Host ""
    Write-Host "═══════════════════════════════════════════" -ForegroundColor Cyan

    if ($testExitCode -eq 0) {
        Write-Host "✅ Tests completados exitosamente!" -ForegroundColor Green
    } else {
        Write-Host "❌ Tests fallaron. Revisa los logs arriba." -ForegroundColor Red
    }

    exit $testExitCode

} catch {
    Write-Host ""
    Write-Host "❌ Error inesperado: $_" -ForegroundColor Red
    exit 1
} finally {
    # Cleanup: detener servidor si lo iniciamos nosotros
    if ($serverProcess) {
        Stop-DevServer -Process $serverProcess
        Write-Host "✅ Servidor detenido" -ForegroundColor Green
    }
}
