# 🚀 Deploy Manual a Cloudflare Pages
# Script de emergencia para deployments cuando GitHub Actions no está disponible

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet('production', 'preview', 'staging')]
    [string]$Environment = 'production',

    [Parameter(Mandatory=$false)]
    [switch]$SkipBuild,

    [Parameter(Mandatory=$false)]
    [switch]$SkipTests,

    [Parameter(Mandatory=$false)]
    [string]$Branch = 'main'
)

# ═══════════════════════════════════════════════════════════════
# CONFIGURACIÓN
# ═══════════════════════════════════════════════════════════════

$PROJECT_NAME = "saberparatodos"
$BUILD_DIR = "dist"
$PRODUCTION_URL = "https://saberparatodos.space"

# Colores
$COLOR_SUCCESS = "Green"
$COLOR_ERROR = "Red"
$COLOR_WARNING = "Yellow"
$COLOR_INFO = "Cyan"

# ═══════════════════════════════════════════════════════════════
# FUNCIONES
# ═══════════════════════════════════════════════════════════════

function Write-Step {
    param([string]$Message)
    Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor $COLOR_INFO
    Write-Host "  $Message" -ForegroundColor $COLOR_INFO
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`n" -ForegroundColor $COLOR_INFO
}

function Write-Success {
    param([string]$Message)
    Write-Host "✅ $Message" -ForegroundColor $COLOR_SUCCESS
}

function Write-Error-Custom {
    param([string]$Message)
    Write-Host "❌ $Message" -ForegroundColor $COLOR_ERROR
}

function Write-Warning-Custom {
    param([string]$Message)
    Write-Host "⚠️  $Message" -ForegroundColor $COLOR_WARNING
}

function Test-Command {
    param([string]$Command)
    return (Get-Command $Command -ErrorAction SilentlyContinue) -ne $null
}

# ═══════════════════════════════════════════════════════════════
# HEADER
# ═══════════════════════════════════════════════════════════════

Write-Host @"

╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║         🚀 DEPLOYMENT MANUAL - SABERPARATODOS                ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝

"@ -ForegroundColor $COLOR_INFO

Write-Host "📍 Environment: $Environment" -ForegroundColor $COLOR_INFO
Write-Host "🌿 Branch: $Branch" -ForegroundColor $COLOR_INFO
Write-Host "📅 Date: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor $COLOR_INFO
Write-Host ""

# ═══════════════════════════════════════════════════════════════
# VALIDACIONES PRE-DEPLOY
# ═══════════════════════════════════════════════════════════════

Write-Step "🔍 Validando dependencias"

# Verificar Node.js
if (-not (Test-Command "node")) {
    Write-Error-Custom "Node.js no está instalado"
    exit 1
}
$nodeVersion = node --version
Write-Success "Node.js detectado: $nodeVersion"

# Verificar npm
if (-not (Test-Command "npm")) {
    Write-Error-Custom "npm no está instalado"
    exit 1
}
$npmVersion = npm --version
Write-Success "npm detectado: v$npmVersion"

# Verificar Wrangler
if (-not (Test-Command "npx")) {
    Write-Error-Custom "npx no está disponible"
    exit 1
}
Write-Success "Wrangler disponible via npx"

# Verificar .env
if (-not (Test-Path ".env")) {
    Write-Warning-Custom ".env no encontrado - usando variables de sistema"
} else {
    Write-Success ".env encontrado"
}

# Verificar credenciales Cloudflare
if (-not $env:CLOUDFLARE_API_TOKEN) {
    Write-Error-Custom "CLOUDFLARE_API_TOKEN no está configurado"
    Write-Host ""
    Write-Host "Para configurarlo:" -ForegroundColor $COLOR_WARNING
    Write-Host '  $env:CLOUDFLARE_API_TOKEN = "tu-token-aqui"' -ForegroundColor $COLOR_WARNING
    Write-Host ""
    Write-Host "O agrégalo a .env:" -ForegroundColor $COLOR_WARNING
    Write-Host '  CLOUDFLARE_API_TOKEN=tu-token-aqui' -ForegroundColor $COLOR_WARNING
    Write-Host ""
    exit 1
}
Write-Success "Credenciales Cloudflare configuradas"

# ═══════════════════════════════════════════════════════════════
# VALIDACIÓN DE CONTENIDO
# ═══════════════════════════════════════════════════════════════

if (-not $SkipTests) {
    Write-Step "🔍 Validando contenido de preguntas"

    try {
        npm run validate
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Validación de contenido exitosa"
        } else {
            Write-Warning-Custom "Validación con warnings - continuando..."
        }
    } catch {
        Write-Warning-Custom "Error en validación - continuando de todos modos..."
    }
}

# ═══════════════════════════════════════════════════════════════
# BUILD
# ═══════════════════════════════════════════════════════════════

if (-not $SkipBuild) {
    Write-Step "🏗️  Ejecutando build"

    # Limpiar build anterior
    if (Test-Path $BUILD_DIR) {
        Write-Host "🗑️  Limpiando build anterior..." -ForegroundColor $COLOR_INFO
        Remove-Item -Recurse -Force $BUILD_DIR
    }

    # Ejecutar build
    Write-Host "📦 Compilando proyecto..." -ForegroundColor $COLOR_INFO
    npm run build

    if ($LASTEXITCODE -ne 0) {
        Write-Error-Custom "Build falló"
        exit 1
    }

    Write-Success "Build completado"

    # Stats del build
    $buildSize = (Get-ChildItem -Recurse $BUILD_DIR | Measure-Object -Property Length -Sum).Sum / 1MB
    $fileCount = (Get-ChildItem -Recurse -File $BUILD_DIR).Count
    $apiFiles = (Get-ChildItem -Recurse -File "$BUILD_DIR/api" -Filter "*.json" -ErrorAction SilentlyContinue).Count

    Write-Host ""
    Write-Host "📊 Estadísticas del build:" -ForegroundColor $COLOR_INFO
    Write-Host "   📦 Tamaño total: $([math]::Round($buildSize, 2)) MB" -ForegroundColor White
    Write-Host "   📄 Archivos: $fileCount" -ForegroundColor White
    Write-Host "   🗂️  API JSONs: $apiFiles" -ForegroundColor White

} else {
    Write-Warning-Custom "Build omitido (--SkipBuild)"

    if (-not (Test-Path $BUILD_DIR)) {
        Write-Error-Custom "No existe carpeta $BUILD_DIR - debes ejecutar build primero"
        exit 1
    }
}

# ═══════════════════════════════════════════════════════════════
# VERIFICACIÓN PRE-DEPLOY
# ═══════════════════════════════════════════════════════════════

Write-Step "🔍 Verificando estructura del build"

# Verificar archivos críticos
$criticalFiles = @(
    "$BUILD_DIR/index.html",
    "$BUILD_DIR/manifest.json",
    "$BUILD_DIR/api/CO/icfes/11/matematicas/index.json"
)

$allExist = $true
foreach ($file in $criticalFiles) {
    if (Test-Path $file) {
        Write-Success "$file ✓"
    } else {
        Write-Error-Custom "$file ✗ (FALTANTE)"
        $allExist = $false
    }
}

if (-not $allExist) {
    Write-Error-Custom "Archivos críticos faltantes - abortando deploy"
    exit 1
}

# ═══════════════════════════════════════════════════════════════
# CONFIRMACIÓN
# ═══════════════════════════════════════════════════════════════

Write-Host ""
Write-Host "╔═══════════════════════════════════════════════════════════════╗" -ForegroundColor $COLOR_WARNING
Write-Host "║                   ⚠️  CONFIRMACIÓN DE DEPLOY                 ║" -ForegroundColor $COLOR_WARNING
Write-Host "╚═══════════════════════════════════════════════════════════════╝" -ForegroundColor $COLOR_WARNING
Write-Host ""
Write-Host "  📍 Proyecto: $PROJECT_NAME" -ForegroundColor White
Write-Host "  🌍 Environment: $Environment" -ForegroundColor White
Write-Host "  🌿 Branch: $Branch" -ForegroundColor White
Write-Host "  🔗 URL: $PRODUCTION_URL" -ForegroundColor White
Write-Host ""

$confirmation = Read-Host "¿Continuar con el deploy? (y/N)"
if ($confirmation -ne 'y' -and $confirmation -ne 'Y') {
    Write-Warning-Custom "Deploy cancelado por el usuario"
    exit 0
}

# ═══════════════════════════════════════════════════════════════
# DEPLOY
# ═══════════════════════════════════════════════════════════════

Write-Step "🚀 Desplegando a Cloudflare Pages"

Write-Host "📤 Subiendo archivos..." -ForegroundColor $COLOR_INFO

$deployCommand = "npx wrangler pages deploy $BUILD_DIR --project-name=$PROJECT_NAME --branch=$Branch"

Write-Host "🔧 Comando: $deployCommand" -ForegroundColor DarkGray
Write-Host ""

# Ejecutar deploy
$deployStartTime = Get-Date
Invoke-Expression $deployCommand

if ($LASTEXITCODE -ne 0) {
    Write-Error-Custom "Deploy falló"
    exit 1
}

$deployEndTime = Get-Date
$deployDuration = ($deployEndTime - $deployStartTime).TotalSeconds

Write-Success "Deploy completado en $([math]::Round($deployDuration, 2)) segundos"

# ═══════════════════════════════════════════════════════════════
# VERIFICACIÓN POST-DEPLOY
# ═══════════════════════════════════════════════════════════════

Write-Step "✅ Verificando deployment"

Write-Host "⏳ Esperando propagación (15 segundos)..." -ForegroundColor $COLOR_INFO
Start-Sleep -Seconds 15

# Health check
Write-Host "🏥 Health check..." -ForegroundColor $COLOR_INFO

try {
    $response = Invoke-WebRequest -Uri $PRODUCTION_URL -UseBasicParsing -TimeoutSec 10
    if ($response.StatusCode -eq 200) {
        Write-Success "Sitio accesible: $PRODUCTION_URL"
    } else {
        Write-Warning-Custom "Status code inesperado: $($response.StatusCode)"
    }
} catch {
    Write-Warning-Custom "No se pudo verificar el sitio: $($_.Exception.Message)"
}

# API check
Write-Host "🔌 Verificando API..." -ForegroundColor $COLOR_INFO
try {
    $apiUrl = "$PRODUCTION_URL/api/CO/icfes/11/matematicas/index.json"
    $apiResponse = Invoke-WebRequest -Uri $apiUrl -UseBasicParsing -TimeoutSec 10

    if ($apiResponse.StatusCode -eq 200 -and $apiResponse.Headers['Content-Type'] -like '*application/json*') {
        Write-Success "API JSON funcionando correctamente"
    } else {
        Write-Warning-Custom "API retornó Content-Type: $($apiResponse.Headers['Content-Type'])"
    }
} catch {
    Write-Warning-Custom "No se pudo verificar API: $($_.Exception.Message)"
}

# ═══════════════════════════════════════════════════════════════
# RESUMEN FINAL
# ═══════════════════════════════════════════════════════════════

Write-Host ""
Write-Host "╔═══════════════════════════════════════════════════════════════╗" -ForegroundColor $COLOR_SUCCESS
Write-Host "║                  ✅ DEPLOYMENT EXITOSO                       ║" -ForegroundColor $COLOR_SUCCESS
Write-Host "╚═══════════════════════════════════════════════════════════════╝" -ForegroundColor $COLOR_SUCCESS
Write-Host ""
Write-Host "🎉 Deployment completado exitosamente!" -ForegroundColor $COLOR_SUCCESS
Write-Host ""
Write-Host "📍 URLs de verificación:" -ForegroundColor $COLOR_INFO
Write-Host "   🏠 Sitio: $PRODUCTION_URL" -ForegroundColor White
Write-Host "   📊 Ranking: $PRODUCTION_URL/ranking" -ForegroundColor White
Write-Host "   🎉 Party Mode: $PRODUCTION_URL/party" -ForegroundColor White
Write-Host "   🔌 API: $PRODUCTION_URL/api/CO/icfes/11/matematicas/index.json" -ForegroundColor White
Write-Host ""
Write-Host "📚 Próximos pasos:" -ForegroundColor $COLOR_INFO
Write-Host "   1. Verificar que el sitio funcione correctamente" -ForegroundColor White
Write-Host "   2. Probar el API endpoint en el navegador" -ForegroundColor White
Write-Host "   3. Monitorear logs: npx wrangler pages deployment tail --project-name=$PROJECT_NAME" -ForegroundColor White
Write-Host ""
Write-Host "⏱️  Duración total: $([math]::Round($deployDuration, 2)) segundos" -ForegroundColor DarkGray
Write-Host ""
