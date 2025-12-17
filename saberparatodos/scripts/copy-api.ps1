<#
.SYNOPSIS
    Copia los archivos de la API generados al directorio public y dist de saberparatodos
.DESCRIPTION
    Este script copia los archivos JSON de api/v1/ a saberparatodos/public/api/ (para dev) y saberparatodos/dist/api/ (para build)
#>

$ErrorActionPreference = "Stop"

# La API está en la raíz del workspace, no dentro de saberparatodos
$WorkspaceRoot = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
$ApiSource = Join-Path $WorkspaceRoot "api\v1"
$PublicApi = Join-Path (Split-Path $PSScriptRoot -Parent) "public\api"
$DistApi = Join-Path (Split-Path $PSScriptRoot -Parent) "dist\api"

Write-Host "📦 Copiando archivos de API..." -ForegroundColor Cyan
Write-Host "   Origen: $ApiSource"
Write-Host "   Destino (dev): $PublicApi"
Write-Host "   Destino (build): $DistApi"

# Copiar todos los archivos recursivamente
if (Test-Path $ApiSource) {
    # Copiar a public/ (para dev)
    if (!(Test-Path $PublicApi)) {
        New-Item -ItemType Directory -Path $PublicApi -Force | Out-Null
    }
    Copy-Item -Path "$ApiSource\*" -Destination $PublicApi -Recurse -Force
    
    # Contar archivos copiados
    $jsonFiles = (Get-ChildItem -Path $PublicApi -Recurse -Filter "*.json").Count
    Write-Host "✅ Copiados $jsonFiles archivos JSON a public/" -ForegroundColor Green
    
    # Copiar a dist/ también si existe (para build)
    if (Test-Path (Split-Path $DistApi -Parent)) {
        if (!(Test-Path $DistApi)) {
            New-Item -ItemType Directory -Path $DistApi -Force | Out-Null
        }
        Copy-Item -Path "$ApiSource\*" -Destination $DistApi -Recurse -Force
        Write-Host "✅ Copiados $jsonFiles archivos JSON a dist/" -ForegroundColor Green
    }
} else {
    Write-Host "⚠️  Directorio de origen no encontrado: $ApiSource" -ForegroundColor Yellow
    Write-Host "   Ejecuta primero: pwsh -File scripts\generate-questions-api.ps1" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Copia completada" -ForegroundColor Green
