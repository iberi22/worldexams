# Script para agregar metadata de licencias a bundles existentes
# Autor: World Exams Organization
# Fecha: 2025-12-12
# Propósito: Migrar bundles al Protocol v2.1 con licencias duales

param(
    [string]$SourceDir = "src\content\questions",
    [switch]$DryRun = $false,
    [switch]$Verbose = $false
)

$ErrorActionPreference = "Stop"

Write-Host "🔐 Agregando metadata de licencias a bundles..." -ForegroundColor Cyan
Write-Host ""

# Contador de archivos
$processed = 0
$updated = 0
$skipped = 0
$errors = 0

# Función para verificar si el archivo ya tiene metadata de licencias
function Test-HasLicenseMetadata {
    param([string]$Content)

    return $Content -match 'licenses:\s*\n\s*v1:\s*"CC BY-SA 4\.0"' -or
           $Content -match "licenses:\s*{.*v1.*CC BY-SA.*}"
}

# Función para agregar metadata de licencias al frontmatter
function Add-LicenseMetadata {
    param([string]$Content)

    # Buscar el final del frontmatter (segundo ---)
    if ($Content -match '(?s)(---\s*\n.*?\n)---') {
        $frontmatter = $matches[1]

        # Verificar si ya tiene el campo licenses
        if ($frontmatter -match 'licenses:') {
            return $null # Ya tiene licencias
        }

        # Agregar licenses al final del frontmatter
        $newFrontmatter = $frontmatter.TrimEnd("`n", " ") + @"

licenses:
  v1: "CC BY-SA 4.0"       # Pregunta original (uso comercial permitido)
  v2-v7: "CC BY-NC-SA 4.0" # Variantes pedagógicas (solo uso no-comercial)
---
"@

        # Reemplazar en el contenido original
        $newContent = $Content -replace '(?s)(---\s*\n.*?\n)---', $newFrontmatter
        return $newContent
    }

    return $null
}

# Buscar todos los archivos .md en la carpeta de preguntas
$files = Get-ChildItem -Path $SourceDir -Filter "*.md" -Recurse -ErrorAction SilentlyContinue

if ($files.Count -eq 0) {
    Write-Host "⚠️  No se encontraron archivos .md en $SourceDir" -ForegroundColor Yellow
    exit 0
}

Write-Host "📂 Encontrados $($files.Count) archivos .md" -ForegroundColor Green
Write-Host ""

foreach ($file in $files) {
    $processed++

    try {
        # Leer contenido
        $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8

        if ($Verbose) {
            Write-Host "  📄 Procesando: $($file.Name)" -ForegroundColor Gray
        }

        # Verificar si ya tiene metadata
        if (Test-HasLicenseMetadata -Content $content) {
            $skipped++
            if ($Verbose) {
                Write-Host "    ⏭️  Ya tiene metadata de licencias (omitido)" -ForegroundColor Yellow
            }
            continue
        }

        # Agregar metadata
        $newContent = Add-LicenseMetadata -Content $content

        if ($null -eq $newContent) {
            $skipped++
            if ($Verbose) {
                Write-Host "    ⏭️  No se pudo procesar frontmatter (omitido)" -ForegroundColor Yellow
            }
            continue
        }

        # Escribir cambios (solo si no es DryRun)
        if (-not $DryRun) {
            Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8 -NoNewline
            $updated++
            Write-Host "  ✅ Actualizado: $($file.Name)" -ForegroundColor Green
        } else {
            $updated++
            Write-Host "  🔍 [DRY RUN] Se actualizaría: $($file.Name)" -ForegroundColor Cyan
        }

    } catch {
        $errors++
        Write-Host "  ❌ Error procesando $($file.Name): $_" -ForegroundColor Red
    }
}

# Resumen
Write-Host ""
Write-Host "═══════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "📊 RESUMEN DE MIGRACIÓN" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  📂 Archivos procesados: $processed" -ForegroundColor White
Write-Host "  ✅ Archivos actualizados: $updated" -ForegroundColor Green
Write-Host "  ⏭️  Archivos omitidos: $skipped" -ForegroundColor Yellow
Write-Host "  ❌ Errores: $errors" -ForegroundColor Red
Write-Host ""

if ($DryRun) {
    Write-Host "🔍 Modo DRY RUN activo. Ejecuta sin -DryRun para aplicar cambios." -ForegroundColor Cyan
} else {
    Write-Host "✨ Migración completada!" -ForegroundColor Green
}

Write-Host ""

# Exit code
if ($errors -gt 0) {
    exit 1
} else {
    exit 0
}
