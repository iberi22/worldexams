# 🗑️ Script de Limpieza de Ramas Remotas - World Exams
# Fecha: 2025-12-10
# Autor: GitHub Copilot
# Propósito: Eliminar todas las ramas remotas obsoletas (formato v1.0)

param(
    [switch]$DryRun = $false,  # Simular sin eliminar
    [switch]$Force = $false     # No pedir confirmación
)

Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "🗑️  LIMPIEZA DE RAMAS REMOTAS - WORLD EXAMS" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Lista de ramas a eliminar
$branchesToDelete = @(
    # Ramas copilot sin PR (formato v1.0)
    "copilot/generate-computer-questions-co",
    "copilot/generate-history-question-variations",
    "copilot/generate-math-question-variations",
    "copilot/generate-computer-questions-us",
    "copilot/generate-geography-questions-co-again",
    "copilot/generate-mathematics-questions",
    "copilot/generate-questions-for-mx",
    "copilot/generate-30-history-questions",
    "copilot/generate-question-variations-colombia",
    "copilot/generate-history-questions-mx",
    "copilot/generate-30-math-questions-mx",
    
    # Ramas copilot con PR DRAFT (formato v1.0)
    "copilot/generate-math-questions-co",
    "copilot/generate-math-questions-mx",
    "copilot/generate-history-questions-co",
    "copilot/generate-geography-questions-co",
    "copilot/generate-science-questions-co",
    "copilot/generate-history-questions-br",
    "copilot/generate-science-questions-br",
    "copilot/generate-geography-questions-br",
    
    # Rama con PR MERGED (ya integrada)
    "copilot/generate-mathematics-questions-again",
    
    # Rama feat con PR CLOSED (ya analizada)
    "feat/migrate-questions-v2"
)

Write-Host "📊 Total de ramas a eliminar: $($branchesToDelete.Count)" -ForegroundColor Magenta
Write-Host ""

if ($DryRun) {
    Write-Host "🔍 MODO DRY-RUN: No se eliminarán ramas realmente" -ForegroundColor Yellow
    Write-Host ""
}

# Mostrar lista de ramas
Write-Host "📋 Ramas que serán eliminadas:" -ForegroundColor Cyan
$branchesToDelete | ForEach-Object { Write-Host "  - $_" -ForegroundColor White }
Write-Host ""

# Pedir confirmación
if (-not $Force -and -not $DryRun) {
    $confirmation = Read-Host "¿Estás seguro de que quieres eliminar estas $($branchesToDelete.Count) ramas? (si/no)"
    if ($confirmation -ne "si") {
        Write-Host "❌ Operación cancelada por el usuario" -ForegroundColor Red
        exit 0
    }
}

Write-Host ""
Write-Host "🚀 Iniciando eliminación de ramas..." -ForegroundColor Green
Write-Host ""

$successCount = 0
$failCount = 0
$errors = @()

foreach ($branch in $branchesToDelete) {
    if ($DryRun) {
        Write-Host "🔍 [DRY-RUN] Eliminaría: origin/$branch" -ForegroundColor Yellow
        $successCount++
    } else {
        try {
            Write-Host "🗑️  Eliminando: origin/$branch..." -NoNewline -ForegroundColor Yellow
            git push origin --delete $branch 2>&1 | Out-Null
            
            if ($LASTEXITCODE -eq 0) {
                Write-Host " ✅" -ForegroundColor Green
                $successCount++
            } else {
                Write-Host " ❌" -ForegroundColor Red
                $failCount++
                $errors += "Error eliminando $branch (exit code: $LASTEXITCODE)"
            }
        } catch {
            Write-Host " ❌" -ForegroundColor Red
            $failCount++
            $errors += "Excepción eliminando $branch : $_"
        }
    }
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "📊 RESUMEN DE ELIMINACIÓN" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ Eliminadas exitosamente: $successCount" -ForegroundColor Green
Write-Host "❌ Fallos: $failCount" -ForegroundColor Red
Write-Host "📊 Total procesadas: $($branchesToDelete.Count)" -ForegroundColor Cyan
Write-Host ""

if ($errors.Count -gt 0) {
    Write-Host "⚠️  ERRORES DETECTADOS:" -ForegroundColor Red
    $errors | ForEach-Object { Write-Host "  - $_" -ForegroundColor White }
    Write-Host ""
}

if ($DryRun) {
    Write-Host "💡 Para ejecutar realmente, ejecuta sin -DryRun:" -ForegroundColor Yellow
    Write-Host "   .\scripts\limpiar-ramas-remote.ps1" -ForegroundColor White
    Write-Host "   .\scripts\limpiar-ramas-remote.ps1 -Force  (sin confirmación)" -ForegroundColor White
} else {
    Write-Host "✅ Limpieza completada!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 Próximos pasos:" -ForegroundColor Cyan
    Write-Host "  1. Cerrar PRs DRAFT (#20, #21, #22, #23, #24, #37, #38)" -ForegroundColor White
    Write-Host "  2. Verificar que main tiene Protocolo v2.0 completo" -ForegroundColor White
    Write-Host "  3. Continuar generando contenido SOLO en formato v2.0" -ForegroundColor White
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
