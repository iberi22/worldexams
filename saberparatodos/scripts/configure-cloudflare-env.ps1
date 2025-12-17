#!/usr/bin/env pwsh
# 🔐 Configurar Environment Variables en Cloudflare Pages via CLI
# Agrega automáticamente todas las variables necesarias

param(
    [Parameter(Mandatory=$false)]
    [string]$ProjectName = "saberparatodos"
)

# ═══════════════════════════════════════════════════════════════
# CONFIGURACIÓN
# ═══════════════════════════════════════════════════════════════

$ENV_VARS = @{
    "PUBLIC_SUPABASE_URL" = "https://tzmrgvtptdtsjcugwqyq.supabase.co"
    "PUBLIC_SUPABASE_ANON_KEY" = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6bXJndnRwdGR0c2pjdWd3cXlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxMTc0NDYsImV4cCI6MjA3OTY5MzQ0Nn0.sPtxeTyDlF9sdQVrfM1wLp_RLKhI1sFk0W-h8Mc_VIc"
    "PUBLIC_SITE_URL" = "https://saberparatodos.space"
}

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

function Write-Error-Custom {
    param([string]$Message)
    Write-Host "❌ $Message" -ForegroundColor Red
}

function Write-Warning-Custom {
    param([string]$Message)
    Write-Host "⚠️  $Message" -ForegroundColor Yellow
}

# ═══════════════════════════════════════════════════════════════
# HEADER
# ═══════════════════════════════════════════════════════════════

Write-Host @"

╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║     🔐 CONFIGURAR ENVIRONMENT VARIABLES - CLOUDFLARE         ║
║              Usando Wrangler CLI                              ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝

"@ -ForegroundColor Cyan

Write-Host "📋 Proyecto: $ProjectName" -ForegroundColor Yellow
Write-Host "🔑 Variables a configurar: $($ENV_VARS.Count)" -ForegroundColor Yellow
Write-Host ""

# ═══════════════════════════════════════════════════════════════
# VALIDACIONES
# ═══════════════════════════════════════════════════════════════

Write-Step "🔍 Validando autenticación"

try {
    $whoami = npx wrangler whoami 2>&1 | Out-String

    if ($whoami -match "You are logged in") {
        Write-Success "Autenticado en Cloudflare"
    } else {
        Write-Error-Custom "No autenticado. Ejecuta: npx wrangler login"
        exit 1
    }
} catch {
    Write-Error-Custom "Error verificando autenticación: $($_.Exception.Message)"
    exit 1
}

# ═══════════════════════════════════════════════════════════════
# VERIFICAR SI EL PROYECTO EXISTE
# ═══════════════════════════════════════════════════════════════

Write-Step "🔍 Verificando proyecto existente"

Write-Host "📜 Listando proyectos de Cloudflare Pages..." -ForegroundColor Yellow

try {
    $projectsList = npx wrangler pages project list 2>&1 | Out-String

    if ($projectsList -match $ProjectName) {
        Write-Success "Proyecto '$ProjectName' encontrado"
    } else {
        Write-Warning-Custom "Proyecto '$ProjectName' no existe aún"
        Write-Host ""
        Write-Host "⚠️  IMPORTANTE: Debes crear el proyecto primero en Cloudflare Dashboard." -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Sigue estos pasos:" -ForegroundColor Cyan
        Write-Host "1. Ve a: https://dash.cloudflare.com/" -ForegroundColor White
        Write-Host "2. Workers & Pages → Create application → Pages → Connect to Git" -ForegroundColor White
        Write-Host "3. Conecta el repo: iberi22/saber-co" -ForegroundColor White
        Write-Host "4. Configura project name: $ProjectName" -ForegroundColor White
        Write-Host "5. Haz el primer deploy (sin variables por ahora)" -ForegroundColor White
        Write-Host "6. Luego vuelve a ejecutar este script" -ForegroundColor White
        Write-Host ""

        $createNow = Read-Host "¿Quieres que abra el Dashboard ahora? (y/N)"
        if ($createNow -eq 'y' -or $createNow -eq 'Y') {
            Start-Process "https://dash.cloudflare.com/"
        }

        exit 0
    }
} catch {
    Write-Error-Custom "Error listando proyectos: $($_.Exception.Message)"
    exit 1
}

# ═══════════════════════════════════════════════════════════════
# CONFIGURAR ENVIRONMENT VARIABLES
# ═══════════════════════════════════════════════════════════════

Write-Step "🔐 Configurando Environment Variables"

Write-Host "ℹ️  Nota: Wrangler CLI tiene limitaciones para environment variables en Pages." -ForegroundColor Yellow
Write-Host "   Usaremos la API de Cloudflare directamente via wrangler." -ForegroundColor Yellow
Write-Host ""

$successCount = 0
$failCount = 0

foreach ($key in $ENV_VARS.Keys) {
    $value = $ENV_VARS[$key]
    $displayValue = if ($value.Length -gt 50) { "$($value.Substring(0, 50))..." } else { $value }

    Write-Host "🔑 Configurando: $key" -ForegroundColor Cyan
    Write-Host "   Valor: $displayValue" -ForegroundColor Gray

    # NOTA: wrangler pages no tiene comando directo para set env vars
    # Necesitamos usar la API REST de Cloudflare
    # Por ahora, mostramos las instrucciones para hacerlo manualmente

    Write-Warning-Custom "   CLI de Wrangler no soporta 'pages env set' aún"
    Write-Host "   Debes agregarlo manualmente en Dashboard" -ForegroundColor Gray

    $failCount++
}

# ═══════════════════════════════════════════════════════════════
# ALTERNATIVA: USAR API DE CLOUDFLARE
# ═══════════════════════════════════════════════════════════════

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Yellow
Write-Host ""
Write-Host "⚠️  LIMITACIÓN DEL CLI DE WRANGLER" -ForegroundColor Yellow
Write-Host ""
Write-Host "El CLI de Wrangler NO soporta configurar environment variables" -ForegroundColor White
Write-Host "en Cloudflare Pages directamente desde la terminal." -ForegroundColor White
Write-Host ""
Write-Host "Opciones disponibles:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. 🌐 Manual en Dashboard (MÁS SIMPLE - RECOMENDADO):" -ForegroundColor Green
Write-Host "   https://dash.cloudflare.com/" -ForegroundColor Gray
Write-Host "   → Workers & Pages → $ProjectName → Settings → Environment variables" -ForegroundColor Gray
Write-Host ""
Write-Host "2. 🔌 API REST de Cloudflare (AVANZADO):" -ForegroundColor Yellow
Write-Host "   Requiere CLOUDFLARE_API_TOKEN y ACCOUNT_ID" -ForegroundColor Gray
Write-Host "   Ver: .\scripts\configure-env-via-api.ps1" -ForegroundColor Gray
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Yellow
Write-Host ""

# ═══════════════════════════════════════════════════════════════
# GENERAR COMANDO PARA COPIAR/PEGAR
# ═══════════════════════════════════════════════════════════════

Write-Step "📋 Variables para copiar/pegar en Dashboard"

Write-Host "Abre en tu navegador:" -ForegroundColor Cyan
Write-Host "https://dash.cloudflare.com/" -ForegroundColor White
Write-Host ""
Write-Host "Navega a:" -ForegroundColor Cyan
Write-Host "Workers & Pages → $ProjectName → Settings → Environment variables" -ForegroundColor White
Write-Host ""
Write-Host "Agrega estas variables (Production y Preview):" -ForegroundColor Cyan
Write-Host ""

$counter = 1
foreach ($key in $ENV_VARS.Keys) {
    $value = $ENV_VARS[$key]

    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
    Write-Host "Variable $counter de $($ENV_VARS.Count):" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Variable name:" -ForegroundColor Cyan
    Write-Host $key -ForegroundColor White
    Write-Host ""
    Write-Host "Value:" -ForegroundColor Cyan
    Write-Host $value -ForegroundColor White
    Write-Host ""
    Write-Host "Environments: ✅ Production  ✅ Preview" -ForegroundColor Green
    Write-Host ""

    $counter++
}

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
Write-Host ""

# ═══════════════════════════════════════════════════════════════
# OPCIÓN: USAR API REST
# ═══════════════════════════════════════════════════════════════

Write-Host "💡 ¿Quieres configurarlas automáticamente via API REST?" -ForegroundColor Yellow
Write-Host "   Necesitarás tu CLOUDFLARE_API_TOKEN" -ForegroundColor Gray
Write-Host ""

$useAPI = Read-Host "¿Usar API REST para configurar automáticamente? (y/N)"

if ($useAPI -eq 'y' -or $useAPI -eq 'Y') {
    Write-Host ""
    Write-Host "🔐 Ingresa tu Cloudflare API Token:" -ForegroundColor Cyan
    Write-Host "   (Obtén uno en: https://dash.cloudflare.com/profile/api-tokens)" -ForegroundColor Gray
    Write-Host "   Permisos necesarios: Account → Cloudflare Pages → Edit" -ForegroundColor Gray
    Write-Host ""

    $apiToken = Read-Host "API Token" -AsSecureString
    $apiTokenPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
        [Runtime.InteropServices.Marshal]::SecureStringToBSTR($apiToken)
    )

    Write-Host ""
    Write-Host "🆔 Ingresa tu Cloudflare Account ID:" -ForegroundColor Cyan
    Write-Host "   (Encuéntralo en: Dashboard → Workers & Pages → Account ID)" -ForegroundColor Gray
    Write-Host ""

    $accountId = Read-Host "Account ID"

    Write-Host ""
    Write-Step "🚀 Configurando via API REST"

    foreach ($key in $ENV_VARS.Keys) {
        $value = $ENV_VARS[$key]

        Write-Host "🔑 Configurando: $key..." -ForegroundColor Yellow

        # Endpoint de la API de Cloudflare Pages
        $apiUrl = "https://api.cloudflare.com/client/v4/accounts/$accountId/pages/projects/$ProjectName"

        try {
            # Obtener configuración actual del proyecto
            $headers = @{
                "Authorization" = "Bearer $apiTokenPlain"
                "Content-Type" = "application/json"
            }

            $projectData = Invoke-RestMethod -Uri $apiUrl -Headers $headers -Method Get

            # Preparar deployment_configs con las nuevas variables
            $body = @{
                "deployment_configs" = @{
                    "production" = @{
                        "env_vars" = @{
                            $key = @{
                                "type" = "plain_text"
                                "value" = $value
                            }
                        }
                    }
                    "preview" = @{
                        "env_vars" = @{
                            $key = @{
                                "type" = "plain_text"
                                "value" = $value
                            }
                        }
                    }
                }
            } | ConvertTo-Json -Depth 10

            # Actualizar proyecto con nueva variable
            $response = Invoke-RestMethod -Uri $apiUrl -Headers $headers -Method Patch -Body $body

            if ($response.success) {
                Write-Success "  ✓ Variable configurada"
                $successCount++
            } else {
                Write-Error-Custom "  ✗ Error: $($response.errors)"
                $failCount++
            }
        } catch {
            Write-Error-Custom "  ✗ Error: $($_.Exception.Message)"
            $failCount++
        }
    }

    Write-Host ""
    if ($successCount -eq $ENV_VARS.Count) {
        Write-Host "╔═══════════════════════════════════════════════════════════════╗" -ForegroundColor Green
        Write-Host "║           ✅ TODAS LAS VARIABLES CONFIGURADAS                ║" -ForegroundColor Green
        Write-Host "╚═══════════════════════════════════════════════════════════════╝" -ForegroundColor Green
    } else {
        Write-Host "╔═══════════════════════════════════════════════════════════════╗" -ForegroundColor Yellow
        Write-Host "║           ⚠️  ALGUNAS VARIABLES FALLARON                     ║" -ForegroundColor Yellow
        Write-Host "╚═══════════════════════════════════════════════════════════════╝" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "✅ Exitosas: $successCount" -ForegroundColor Green
        Write-Host "❌ Fallidas: $failCount" -ForegroundColor Red
    }
}

# ═══════════════════════════════════════════════════════════════
# INSTRUCCIONES FINALES
# ═══════════════════════════════════════════════════════════════

Write-Host ""
Write-Step "📋 Próximos Pasos"

Write-Host "1. ✅ Verificar variables en Dashboard:" -ForegroundColor White
Write-Host "   https://dash.cloudflare.com/ → Workers & Pages → $ProjectName" -ForegroundColor Gray
Write-Host ""
Write-Host "2. 🔄 Trigger nuevo deployment:" -ForegroundColor White
Write-Host "   Dashboard → Deployments → View details → Retry deployment" -ForegroundColor Gray
Write-Host "   Marca: ✅ Clear build cache and retry" -ForegroundColor Gray
Write-Host ""
Write-Host "3. ✅ Verificar sitio:" -ForegroundColor White
Write-Host "   https://saberparatodos.space" -ForegroundColor Gray
Write-Host ""

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "💡 Documentación completa:" -ForegroundColor Cyan
Write-Host "   CLOUDFLARE_SETUP_MANUAL.md" -ForegroundColor Gray
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""
