#!/usr/bin/env pwsh
# 🔄 Sincronizar cambios de UI desde saberparatodos → saber-co
# Copia solo el frontend, excluye backend y secretos

param(
    [Parameter(Mandatory=$false)]
    [string]$CommitMessage = "sync: update UI from saberparatodos",

    [Parameter(Mandatory=$false)]
    [switch]$DryRun,

    [Parameter(Mandatory=$false)]
    [switch]$SkipPush
)

# ═══════════════════════════════════════════════════════════════
# CONFIGURACIÓN
# ═══════════════════════════════════════════════════════════════

$SOURCE_DIR = "E:\scripts-python\worldexams\saberparatodos"
$TARGET_DIR = "E:\scripts-python\saber-co"

# Carpetas a sincronizar (solo UI)
$SYNC_DIRS = @(
    "src/components",
    "src/pages",
    "src/lib",
    "src/layouts",
    "src/styles",
    "src/utils",
    "public/icons",
    "public/manifest.json"
)

# Archivos de configuración a sincronizar
$SYNC_FILES = @(
    "astro.config.mjs",
    "tailwind.config.mjs",
    "tsconfig.json",
    "package.json",
    "README.md"
)

# ❌ EXCLUIR (backend, secretos, contenido privado)
$EXCLUDE_PATTERNS = @(
    ".env*",
    "supabase/functions",
    "scripts",
    "tools",
    "src/content/questions",
    "spec",
    "tests",
    "test-results",
    "playwright-report",
    "*.log",
    "node_modules",
    "dist",
    ".astro"
)

# ═══════════════════════════════════════════════════════════════
# FUNCIONES
# ═══════════════════════════════════════════════════════════════

function Write-Step {
    param([string]$Message)
    Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
    Write-Host "  $Message" -ForegroundColor Cyan
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`n" -ForegroundColor Cyan
}

function Write-Success {
    param([string]$Message)
    Write-Host "✅ $Message" -ForegroundColor Green
}

function Write-Warning-Custom {
    param([string]$Message)
    Write-Host "⚠️  $Message" -ForegroundColor Yellow
}

function Write-Error-Custom {
    param([string]$Message)
    Write-Host "❌ $Message" -ForegroundColor Red
}

# ═══════════════════════════════════════════════════════════════
# HEADER
# ═══════════════════════════════════════════════════════════════

Write-Host @"

╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║         🔄 SYNC UI: saberparatodos → saber-co                ║
║            (Solo frontend, sin backend)                       ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝

"@ -ForegroundColor Cyan

if ($DryRun) {
    Write-Warning-Custom "Modo DRY RUN - No se harán cambios reales"
}

# ═══════════════════════════════════════════════════════════════
# VALIDACIONES
# ═══════════════════════════════════════════════════════════════

Write-Step "🔍 Validando directorios"

if (-not (Test-Path $SOURCE_DIR)) {
    Write-Error-Custom "Source directory no existe: $SOURCE_DIR"
    exit 1
}
Write-Success "Source: $SOURCE_DIR"

if (-not (Test-Path $TARGET_DIR)) {
    Write-Error-Custom "Target directory no existe: $TARGET_DIR"
    Write-Host ""
    Write-Host "Crear saber-co primero:" -ForegroundColor Yellow
    Write-Host "  cd E:\scripts-python" -ForegroundColor Gray
    Write-Host "  gh repo clone iberi22/saber-co" -ForegroundColor Gray
    exit 1
}
Write-Success "Target: $TARGET_DIR"

# Verificar que target sea un repo git
if (-not (Test-Path "$TARGET_DIR\.git")) {
    Write-Error-Custom "$TARGET_DIR no es un repositorio git"
    exit 1
}
Write-Success "Git repo detectado"

# ═══════════════════════════════════════════════════════════════
# SINCRONIZACIÓN DE CARPETAS
# ═══════════════════════════════════════════════════════════════

Write-Step "📁 Sincronizando carpetas UI"

$syncedDirs = 0
$syncedFiles = 0

foreach ($dir in $SYNC_DIRS) {
    $sourcePath = Join-Path $SOURCE_DIR $dir
    $targetPath = Join-Path $TARGET_DIR $dir

    if (Test-Path $sourcePath) {
        Write-Host "📂 $dir..." -ForegroundColor Yellow

        if (-not $DryRun) {
            # Crear directorio destino si no existe
            $targetParent = Split-Path $targetPath -Parent
            if (-not (Test-Path $targetParent)) {
                New-Item -ItemType Directory -Path $targetParent -Force | Out-Null
            }

            # Copiar recursivamente
            if (Test-Path $sourcePath -PathType Container) {
                Copy-Item -Path $sourcePath -Destination $targetParent -Recurse -Force
            } else {
                Copy-Item -Path $sourcePath -Destination $targetPath -Force
            }
        }

        $syncedDirs++
        Write-Success "  ✓ Copiado"
    } else {
        Write-Warning-Custom "  ⊗ No existe en source (omitido)"
    }
}

# ═══════════════════════════════════════════════════════════════
# SINCRONIZACIÓN DE ARCHIVOS
# ═══════════════════════════════════════════════════════════════

Write-Step "📄 Sincronizando archivos de configuración"

foreach ($file in $SYNC_FILES) {
    $sourcePath = Join-Path $SOURCE_DIR $file
    $targetPath = Join-Path $TARGET_DIR $file

    if (Test-Path $sourcePath) {
        Write-Host "📄 $file..." -ForegroundColor Yellow

        if (-not $DryRun) {
            Copy-Item -Path $sourcePath -Destination $targetPath -Force
        }

        $syncedFiles++
        Write-Success "  ✓ Copiado"
    } else {
        Write-Warning-Custom "  ⊗ No existe en source (omitido)"
    }
}

# ═══════════════════════════════════════════════════════════════
# LIMPIAR ARCHIVOS PROHIBIDOS (seguridad)
# ═══════════════════════════════════════════════════════════════

Write-Step "🧹 Verificando archivos prohibidos en target"

$prohibitedFound = @()

# Verificar .env
if (Test-Path "$TARGET_DIR\.env") {
    Write-Warning-Custom "Encontrado .env en target (ELIMINANDO)"
    if (-not $DryRun) {
        Remove-Item "$TARGET_DIR\.env" -Force
    }
    $prohibitedFound += ".env"
}

# Verificar supabase/functions
if (Test-Path "$TARGET_DIR\supabase\functions") {
    Write-Warning-Custom "Encontrado supabase/functions en target (ELIMINANDO)"
    if (-not $DryRun) {
        Remove-Item "$TARGET_DIR\supabase\functions" -Recurse -Force
    }
    $prohibitedFound += "supabase/functions"
}

# Verificar scripts backend
if (Test-Path "$TARGET_DIR\scripts") {
    Write-Warning-Custom "Encontrado scripts/ en target (ELIMINANDO)"
    if (-not $DryRun) {
        Remove-Item "$TARGET_DIR\scripts" -Recurse -Force
    }
    $prohibitedFound += "scripts/"
}

if ($prohibitedFound.Count -eq 0) {
    Write-Success "No se encontraron archivos prohibidos"
} else {
    Write-Success "Eliminados: $($prohibitedFound -join ', ')"
}

# ═══════════════════════════════════════════════════════════════
# GIT STATUS
# ═══════════════════════════════════════════════════════════════

Write-Step "📊 Cambios detectados"

Push-Location $TARGET_DIR

try {
    $gitStatus = git status --porcelain

    if ($gitStatus) {
        $changedFiles = ($gitStatus | Measure-Object).Count
        Write-Host "📝 Archivos modificados: $changedFiles" -ForegroundColor Yellow
        Write-Host ""
        Write-Host $gitStatus -ForegroundColor Gray
    } else {
        Write-Success "No hay cambios (repos ya están sincronizados)"
        Pop-Location
        exit 0
    }
} finally {
    Pop-Location
}

# ═══════════════════════════════════════════════════════════════
# COMMIT Y PUSH
# ═══════════════════════════════════════════════════════════════

if (-not $DryRun -and -not $SkipPush) {
    Write-Step "💾 Commit y Push"

    Push-Location $TARGET_DIR

    try {
        Write-Host "📝 git add..." -ForegroundColor Yellow
        git add .

        Write-Host "💾 git commit..." -ForegroundColor Yellow
        git commit -m $CommitMessage

        if ($LASTEXITCODE -ne 0) {
            Write-Warning-Custom "No hay cambios para commitear"
        } else {
            Write-Host "📤 git push..." -ForegroundColor Yellow
            git push origin main

            if ($LASTEXITCODE -eq 0) {
                Write-Success "Push exitoso"
            } else {
                Write-Error-Custom "Error en push"
                exit 1
            }
        }
    } finally {
        Pop-Location
    }
}

# ═══════════════════════════════════════════════════════════════
# RESUMEN
# ═══════════════════════════════════════════════════════════════

Write-Host ""
Write-Host "╔═══════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║                  ✅ SINCRONIZACIÓN COMPLETA                  ║" -ForegroundColor Green
Write-Host "╚═══════════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
Write-Host "📊 Estadísticas:" -ForegroundColor Cyan
Write-Host "   Carpetas sincronizadas: $syncedDirs" -ForegroundColor White
Write-Host "   Archivos sincronizados: $syncedFiles" -ForegroundColor White
Write-Host ""
Write-Host "📍 Target: $TARGET_DIR" -ForegroundColor Cyan
Write-Host ""

if (-not $SkipPush) {
    Write-Host "🚀 Cloudflare Pages detectará el push automáticamente" -ForegroundColor Green
    Write-Host "   Deployment iniciará en ~30 segundos" -ForegroundColor Green
    Write-Host ""
    Write-Host "📍 Monitorear en:" -ForegroundColor Cyan
    Write-Host "   https://dash.cloudflare.com/ → Workers & Pages → saberparatodos" -ForegroundColor Gray
    Write-Host ""
}

Write-Host "✅ Sincronización exitosa!" -ForegroundColor Green
Write-Host ""
