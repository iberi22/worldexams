#!/usr/bin/env pwsh
# Script para ejecutar el Social Orchestrator localmente

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("publish", "triage", "report", "build", "test")]
    [string]$Action = "build",

    [Parameter(Mandatory=$false)]
    [string]$ContentType = "daily-tip"
)

$ErrorActionPreference = "Stop"
$serviceRoot = $PSScriptRoot

Write-Host "`n╔═══════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  🤖 Social Orchestrator - World Exams                    ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════════════════════╝" -ForegroundColor Cyan

# Verificar que estamos en el directorio correcto
if (-not (Test-Path (Join-Path $serviceRoot "Cargo.toml"))) {
    Write-Host "`n❌ Error: No se encontró Cargo.toml junto al script" -ForegroundColor Red
    exit 1
}

# Verificar que Rust está instalado
try {
    $rustVersion = cargo --version
    Write-Host "`n✅ Rust instalado: $rustVersion" -ForegroundColor Green
} catch {
    Write-Host "`n❌ Error: Rust no está instalado" -ForegroundColor Red
    Write-Host "   Instala Rust desde: https://rustup.rs/" -ForegroundColor Yellow
    exit 1
}

# Verificar .env
if (-not (Test-Path (Join-Path $serviceRoot ".env"))) {
    Write-Host "`n⚠️  Archivo .env no encontrado" -ForegroundColor Yellow
    Write-Host "   Copiando .env.example a .env..." -ForegroundColor Gray
    Copy-Item (Join-Path $serviceRoot ".env.example") (Join-Path $serviceRoot ".env")
    Write-Host "   📝 Edita services/social-orchestrator/.env con tus tokens" -ForegroundColor Yellow
}

Set-Location $serviceRoot

switch ($Action) {
    "build" {
        Write-Host "`n🔨 Compilando Social Orchestrator..." -ForegroundColor Cyan
        cargo build --release

        if ($LASTEXITCODE -eq 0) {
            Write-Host "`n✅ Compilación exitosa!" -ForegroundColor Green
            Write-Host "   Binario: target/release/social-orchestrator.exe" -ForegroundColor Gray
        } else {
            Write-Host "`n❌ Error en la compilación" -ForegroundColor Red
            exit 1
        }
    }

    "publish" {
        Write-Host "`n📱 Publicando contenido: $ContentType" -ForegroundColor Cyan

        # Build si no existe
        if (-not (Test-Path "target/release/social-orchestrator.exe")) {
            Write-Host "   Compilando primero..." -ForegroundColor Gray
            cargo build --release
        }

        ./target/release/social-orchestrator.exe publish-content --content-type $ContentType

        if ($LASTEXITCODE -eq 0) {
            Write-Host "`n✅ Contenido publicado exitosamente" -ForegroundColor Green
        }
    }

    "triage" {
        Write-Host "`n🏷️  Ejecutando triage de issues..." -ForegroundColor Cyan

        if (-not (Test-Path "target/release/social-orchestrator.exe")) {
            cargo build --release
        }

        ./target/release/social-orchestrator.exe triage-issues --repo world-exams/world-exams

        if ($LASTEXITCODE -eq 0) {
            Write-Host "`n✅ Triage completado" -ForegroundColor Green
        }
    }

    "report" {
        Write-Host "`n📊 Generando reporte semanal..." -ForegroundColor Cyan

        if (-not (Test-Path "target/release/social-orchestrator.exe")) {
            cargo build --release
        }

        ./target/release/social-orchestrator.exe weekly-report --week current

        if ($LASTEXITCODE -eq 0) {
            Write-Host "`n✅ Reporte generado" -ForegroundColor Green
        }
    }

    "test" {
        Write-Host "`n🧪 Ejecutando tests..." -ForegroundColor Cyan
        cargo test

        if ($LASTEXITCODE -eq 0) {
            Write-Host "`n✅ Tests pasaron exitosamente" -ForegroundColor Green
        }
    }
}

Set-Location (Split-Path $serviceRoot -Parent)

Write-Host "`n═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "✨ Operación completada" -ForegroundColor Green
Write-Host "`n" -ForegroundColor White
