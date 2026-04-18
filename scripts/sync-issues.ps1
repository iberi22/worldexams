#!/usr/bin/env powershell
# =============================================================================
# sync-issues.ps1 - GitCore Issue Sync Script
# Sincroniza issues de GitHub hacia espejos locales en .gitcore/planning/
# 
# Uso:
#   powershell -File scripts/sync-issues.ps1                  # Sync todos los issues abiertos
#   powershell -File scripts/sync-issues.ps1 -IssueNumber 230 # Sync un issue especifico
#   powershell -File scripts/sync-issues.ps1 -Labels "curriculo,nuevo-pais" # Filtrar por labels
#   powershell -File scripts/sync-issues.ps1 -DryRun          # Ver que se crearia sin crear
#
# Requisitos: gh CLI autenticado (gh auth status)
# =============================================================================

param(
    [int]$IssueNumber = 0,
    [string]$Labels = "",
    [string[]]$ExcludeTitlePattern = @("\[CI\]", "Security Scans failed", "dependabot"),
    [switch]$DryRun
)

$ErrorActionPreference = "Stop"
$PlanningDir = Join-Path (Join-Path $PSScriptRoot "..") ".gitcore\planning"

# Verificar gh CLI
if (-not (Get-Command "gh" -ErrorAction SilentlyContinue)) {
    Write-Error "gh CLI no encontrado. Instalar desde https://cli.github.com/"
    exit 1
}

Write-Host "GitCore Issue Sync - WorldExams" -ForegroundColor Cyan
Write-Host "Destino: $PlanningDir" -ForegroundColor Gray

Write-Host ""
Write-Host "Obteniendo issues desde GitHub..." -ForegroundColor Yellow

# Obtener issues segun modo
if ($IssueNumber -gt 0) {
    $rawJson = gh issue view $IssueNumber --json number,title,body,labels
    $issues = @($rawJson | ConvertFrom-Json)
} else {
    $rawJson = gh issue list --state open --json number,title,body,labels --limit 100
    $issues = $rawJson | ConvertFrom-Json

    # Filter by labels if specified
    if ($Labels) {
        $labelList = $Labels -split ","
        $filtered = @()
        foreach ($iss in $issues) {
            $issueLabels = $iss.labels | ForEach-Object { $_.name }
            foreach ($lbl in $labelList) {
                if ($issueLabels -contains $lbl) {
                    $filtered += $iss
                    break
                }
            }
        }
        $issues = $filtered
    }

    # Exclude CI/bot noise by default
    if ($ExcludeTitlePattern.Count -gt 0) {
        $issues = $issues | Where-Object {
            $title = $_.title
            $exclude = $false
            foreach ($pat in $ExcludeTitlePattern) {
                if ($title -match $pat) { $exclude = $true; break }
            }
            -not $exclude
        }
    }
}

Write-Host "Issues encontrados: $($issues.Count)" -ForegroundColor Green

foreach ($issue in $issues) {
    $num = $issue.number
    # Sanitize title: remove non-ASCII and problematic chars
    $rawTitle = $issue.title -replace "[^\x20-\x7E]", "" -replace "[^\w\s-]", "" -replace "\s+", "_"
    if ($rawTitle.Length -gt 50) { $rawTitle = $rawTitle.Substring(0, 50) }

    # Verificar si ya existe un espejo para este numero
    $existingMirror = Get-ChildItem $PlanningDir -Filter "ISSUE_${num}_*.md" -ErrorAction SilentlyContinue

    if ($existingMirror) {
        Write-Host "  #$num - Espejo ya existe: $($existingMirror.Name)" -ForegroundColor Gray
        continue
    }

    Write-Host "  #$num - $($issue.title)" -ForegroundColor White

    $filename = "ISSUE_${num}_${rawTitle}.md"
    $filepath = Join-Path $PlanningDir $filename

    if ($DryRun) {
        Write-Host "     [DRY RUN] Crearia: $filename" -ForegroundColor Magenta
        continue
    }

    # Construir labels string
    $labelNames = ($issue.labels | ForEach-Object { $_.name }) -join ", "
    $syncDate = Get-Date -Format "yyyy-MM-dd HH:mm"
    $repoUrl = "https://github.com/iberi22/worldexams/issues/$num"

    # Construir contenido linea por linea (evitar problemas con here-string en PS5.1)
    $lines = @()
    $lines += "# Issue Local Mirror: #$num - $($issue.title)"
    $lines += ""
    $lines += "**GitHub Issue:** $repoUrl"
    $lines += "**Status:** Open"
    $lines += "**Labels:** $labelNames"
    $lines += "**Synced:** $syncDate"
    $lines += ""
    $lines += "## Descripcion Original (GitHub)"
    $lines += ""
    if ($issue.body) {
        $lines += $issue.body
    } else {
        $lines += "(Sin descripcion)"
    }
    $lines += ""
    $lines += "---"
    $lines += "*Espejo local generado por scripts/sync-issues.ps1. Re-ejecutar para actualizar.*"

    $lines | Set-Content -Path $filepath -Encoding UTF8
    Write-Host "     Creado: $filename" -ForegroundColor Green
}

Write-Host ""
Write-Host "Sincronizacion completada." -ForegroundColor Green
Write-Host "Espejos en: $PlanningDir" -ForegroundColor Gray
Write-Host ""

# Mostrar resumen de todos los espejos locales
$allMirrors = Get-ChildItem $PlanningDir -Filter "ISSUE_*.md" | Sort-Object Name
Write-Host "Resumen de issues locales ($($allMirrors.Count) total):" -ForegroundColor Cyan
foreach ($mirror in $allMirrors) {
    if ($mirror.Name -match "ISSUE_(\d+)") {
        $issNum = $Matches[1]
    } else {
        $issNum = "???"
    }
    Write-Host "   #$issNum -> $($mirror.Name)" -ForegroundColor White
}
