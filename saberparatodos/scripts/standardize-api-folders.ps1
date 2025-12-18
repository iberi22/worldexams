<#
.SYNOPSIS
  Estandariza nombres de carpetas del API a convención snake_case

.DESCRIPTION
  Este script elimina carpetas duplicadas con nombres inconsistentes (kebab-case)
  y mantiene solo la versión snake_case (guiones bajos).

  Convención estándar: snake_case
  - ciencias_naturales ✅
  - lectura_critica ✅
  - sociales_y_ciudadanas ✅

  A eliminar: kebab-case
  - ciencias-naturales ❌
  - lectura-critica ❌
  - sociales-ciudadanas ❌

.NOTES
  Autor: World Exams
  Fecha: 2025-12-17
  Versión: 1.0
#>

$ErrorActionPreference = "Stop"

# Ruta base del API
$ApiBase = "saberparatodos\public\api\co\icfes"

# Mapeo de carpetas duplicadas (kebab-case → snake_case)
$FolderMappings = @{
    # Grado 11
    "11\lectura-critica" = "11\lectura_critica"

    # Grado 3
    "3\ciencias-naturales" = "3\ciencias_naturales"
    "3\sociales-ciudadanas" = "3\sociales_y_ciudadanas"

    # Grado 5
    "5\sociales-ciudadanas" = "5\sociales_y_ciudadanas"

    # Grado 7
    "7\ciencias-naturales" = "7\ciencias_naturales"
    "7\sociales-ciudadanas" = "7\sociales_y_ciudadanas"

    # Grado 9
    "9\ciencias-naturales" = "9\ciencias_naturales"
    "9\sociales-ciudadanas" = "9\sociales_y_ciudadanas"
}

Write-Host "🔧 API Folder Standardization Script" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
Write-Host ""

# Verificar que estamos en la raíz del proyecto
if (-not (Test-Path $ApiBase)) {
    Write-Host "❌ Error: No se encontró la carpeta $ApiBase" -ForegroundColor Red
    Write-Host "   Asegúrate de ejecutar este script desde la raíz del proyecto worldexams" -ForegroundColor Yellow
    exit 1
}

Write-Host "📂 Ruta base: $ApiBase" -ForegroundColor White
Write-Host ""

# Contador de operaciones
$MergedCount = 0
$DeletedCount = 0
$ErrorCount = 0

foreach ($mapping in $FolderMappings.GetEnumerator()) {
    $kebabPath = Join-Path $ApiBase $mapping.Key
    $snakePath = Join-Path $ApiBase $mapping.Value

    Write-Host "🔄 Procesando: $($mapping.Key)" -ForegroundColor Yellow

    # Verificar si la carpeta kebab-case existe
    if (-not (Test-Path $kebabPath)) {
        Write-Host "   ⚠️  Carpeta no encontrada (puede que ya se haya eliminado): $kebabPath" -ForegroundColor DarkYellow
        continue
    }

    # Verificar si la carpeta snake_case existe
    if (-not (Test-Path $snakePath)) {
        Write-Host "   ⚠️  Carpeta destino no existe, creando: $snakePath" -ForegroundColor DarkYellow
        New-Item -ItemType Directory -Path $snakePath -Force | Out-Null
    }

    try {
        # Mover archivos de kebab-case a snake_case
        $files = Get-ChildItem -Path $kebabPath -File

        if ($files.Count -gt 0) {
            Write-Host "   📦 Moviendo $($files.Count) archivos..." -ForegroundColor Cyan

            foreach ($file in $files) {
                $destFile = Join-Path $snakePath $file.Name

                # Si el archivo ya existe en destino, comparar y mantener el más nuevo
                if (Test-Path $destFile) {
                    $sourceDate = $file.LastWriteTime
                    $destDate = (Get-Item $destFile).LastWriteTime

                    if ($sourceDate -gt $destDate) {
                        Write-Host "   🔄 Reemplazando archivo más antiguo: $($file.Name)" -ForegroundColor DarkCyan
                        Copy-Item -Path $file.FullName -Destination $destFile -Force
                    } else {
                        Write-Host "   ⏭️  Saltando (destino más reciente): $($file.Name)" -ForegroundColor DarkGray
                    }
                } else {
                    Copy-Item -Path $file.FullName -Destination $destFile
                }
            }

            $MergedCount++
        } else {
            Write-Host "   📭 Carpeta vacía" -ForegroundColor DarkGray
        }

        # Eliminar carpeta kebab-case
        Write-Host "   🗑️  Eliminando carpeta duplicada: $kebabPath" -ForegroundColor Red
        Remove-Item -Path $kebabPath -Recurse -Force
        $DeletedCount++

        Write-Host "   ✅ Completado: $($mapping.Key) → $($mapping.Value)" -ForegroundColor Green

    } catch {
        Write-Host "   ❌ Error procesando $($mapping.Key): $($_.Exception.Message)" -ForegroundColor Red
        $ErrorCount++
    }

    Write-Host ""
}

# Resumen final
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
Write-Host "📊 Resumen de Estandarización" -ForegroundColor Cyan
Write-Host ""
Write-Host "   📦 Carpetas fusionadas:  $MergedCount" -ForegroundColor Green
Write-Host "   🗑️  Carpetas eliminadas:  $DeletedCount" -ForegroundColor Yellow
Write-Host "   ❌ Errores:              $ErrorCount" -ForegroundColor $(if ($ErrorCount -gt 0) { "Red" } else { "Gray" })
Write-Host ""

if ($ErrorCount -eq 0) {
    Write-Host "✅ Estandarización completada exitosamente" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 Siguiente paso:" -ForegroundColor Cyan
    Write-Host "   Ejecuta: npm run build" -ForegroundColor White
    Write-Host "   Luego: pwsh -File scripts\copy-api.ps1" -ForegroundColor White
} else {
    Write-Host "⚠️  Estandarización completada con errores" -ForegroundColor Yellow
    Write-Host "   Revisa los mensajes de error anteriores" -ForegroundColor DarkYellow
}
