#!/usr/bin/env pwsh
# Script para configurar secrets en GitHub Organization usando GitHub CLI

param(
    [Parameter(Mandatory=$false)]
    [switch]$Verify,

    [Parameter(Mandatory=$false)]
    [switch]$Setup
)

$ErrorActionPreference = "Stop"

Write-Host "`n╔═══════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  🔐 World Exams - GitHub Secrets Manager                 ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════════════════════╝" -ForegroundColor Cyan

# Verificar que GitHub CLI esté instalado
try {
    $ghVersion = gh --version | Select-String "gh version"
    Write-Host "`n✅ GitHub CLI instalado: $ghVersion" -ForegroundColor Green
} catch {
    Write-Host "`n❌ GitHub CLI no está instalado" -ForegroundColor Red
    Write-Host "   Descarga desde: https://cli.github.com/" -ForegroundColor Yellow
    exit 1
}

# Verificar autenticación
try {
    $user = gh api user --jq '.login'
    Write-Host "✅ Autenticado como: $user" -ForegroundColor Green
} catch {
    Write-Host "`n❌ No estás autenticado en GitHub CLI" -ForegroundColor Red
    Write-Host "   Ejecuta: gh auth login" -ForegroundColor Yellow
    exit 1
}

$org = "world-exams"

# Lista de secrets requeridos
$required_secrets = @(
    @{Name="TELEGRAM_BOT_TOKEN"; Description="Token del bot de Telegram"; HasValue=$true; Value="8116938644:AAEPc7fpKCb-XKbqv0rVGgAOPO42fO_ZTu8"},
    @{Name="TELEGRAM_CHAT_ID"; Description="Chat ID de Telegram"; HasValue=$true; Value="2076598024"},
    @{Name="DISCORD_WEBHOOK_URL"; Description="Webhook URL de Discord"; HasValue=$false},
    @{Name="DISCORD_BOT_TOKEN"; Description="Token del bot de Discord (opcional)"; HasValue=$false},
    @{Name="TWITTER_API_KEY"; Description="API Key de Twitter"; HasValue=$false},
    @{Name="TWITTER_API_SECRET"; Description="API Secret de Twitter"; HasValue=$false},
    @{Name="TWITTER_ACCESS_TOKEN"; Description="Access Token de Twitter"; HasValue=$false},
    @{Name="TWITTER_ACCESS_SECRET"; Description="Access Secret de Twitter"; HasValue=$false},
    @{Name="TWITTER_BEARER_TOKEN"; Description="Bearer Token de Twitter"; HasValue=$false},
    @{Name="GITHUB_TOKEN"; Description="Personal Access Token de GitHub"; HasValue=$false},
    @{Name="SUPABASE_URL"; Description="URL de Supabase"; HasValue=$true; Value="https://tzmrgvtptdtsjcugwqyq.supabase.co"},
    @{Name="SUPABASE_SERVICE_ROLE_KEY"; Description="Service Role Key de Supabase"; HasValue=$false}
)

if ($Verify) {
    Write-Host "`n🔍 Verificando secrets en organización $org..." -ForegroundColor Cyan
    Write-Host ""

    foreach ($secret in $required_secrets) {
        try {
            # Intentar obtener el secret (no muestra el valor por seguridad)
            $result = gh secret list --org $org 2>&1 | Select-String $secret.Name

            if ($result) {
                Write-Host "  ✅ $($secret.Name)" -ForegroundColor Green -NoNewline
                Write-Host " - $($secret.Description)" -ForegroundColor Gray
            } else {
                Write-Host "  ❌ $($secret.Name)" -ForegroundColor Red -NoNewline
                Write-Host " - $($secret.Description)" -ForegroundColor Gray
            }
        } catch {
            Write-Host "  ❌ $($secret.Name)" -ForegroundColor Red -NoNewline
            Write-Host " - $($secret.Description)" -ForegroundColor Gray
        }
    }

    Write-Host "`n💡 Para configurar secrets faltantes, ejecuta:" -ForegroundColor Yellow
    Write-Host "   ./setup-secrets.ps1 -Setup" -ForegroundColor White
    Write-Host ""

} elseif ($Setup) {
    Write-Host "`n🚀 Configurando secrets en organización $org..." -ForegroundColor Cyan
    Write-Host ""

    foreach ($secret in $required_secrets) {
        Write-Host "📝 Configurando: $($secret.Name)" -ForegroundColor Cyan
        Write-Host "   Descripción: $($secret.Description)" -ForegroundColor Gray

        if ($secret.HasValue) {
            # Secret con valor predefinido
            Write-Host "   ✅ Valor predefinido disponible" -ForegroundColor Green

            $confirm = Read-Host "   ¿Usar valor predefinido? (Y/n)"

            if ($confirm -eq "" -or $confirm -eq "Y" -or $confirm -eq "y") {
                $value = $secret.Value
            } else {
                $value = Read-Host "   Ingresa el valor"
            }
        } else {
            # Pedir valor al usuario
            $value = Read-Host "   Ingresa el valor (Enter para omitir)"

            if ([string]::IsNullOrWhiteSpace($value)) {
                Write-Host "   ⏭️  Omitido" -ForegroundColor Yellow
                Write-Host ""
                continue
            }
        }

        # Crear o actualizar el secret
        try {
            # Usar pipeline para pasar el valor de forma segura
            $value | gh secret set $secret.Name --org $org --repos="*" 2>&1 | Out-Null
            Write-Host "   ✅ Secret configurado exitosamente" -ForegroundColor Green
        } catch {
            Write-Host "   ❌ Error al configurar secret: $_" -ForegroundColor Red
        }

        Write-Host ""
    }

    Write-Host "╔═══════════════════════════════════════════════════════════╗" -ForegroundColor Green
    Write-Host "║  ✅ Configuración completada                             ║" -ForegroundColor Green
    Write-Host "╚═══════════════════════════════════════════════════════════╝" -ForegroundColor Green

    Write-Host "`n🔍 Verificar secrets configurados:" -ForegroundColor Cyan
    Write-Host "   ./setup-secrets.ps1 -Verify" -ForegroundColor White
    Write-Host ""

} else {
    # Mostrar ayuda
    Write-Host "`n📖 Uso:" -ForegroundColor Cyan
    Write-Host "  ./setup-secrets.ps1 -Verify    # Verificar secrets existentes" -ForegroundColor White
    Write-Host "  ./setup-secrets.ps1 -Setup     # Configurar secrets interactivamente" -ForegroundColor White
    Write-Host ""
    Write-Host "📚 Documentación completa:" -ForegroundColor Cyan
    Write-Host "  docs/SECRETS_SETUP_GUIDE.md" -ForegroundColor Yellow
    Write-Host ""
}
