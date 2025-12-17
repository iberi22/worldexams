#!/usr/bin/env pwsh
# 🔗 Script para conectar Cloudflare Pages con repo público saber-co
# Esto configura deploy automático SIN usar GitHub Actions

Write-Host @"

╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   🔗 SETUP CLOUDFLARE PAGES DIRECT INTEGRATION               ║
║      Deploy automático desde repo público (GRATIS)           ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝

"@ -ForegroundColor Cyan

# ═══════════════════════════════════════════════════════════════
# CONFIGURACIÓN
# ═══════════════════════════════════════════════════════════════

$PROJECT_NAME = "saberparatodos"
$REPO_NAME = "iberi22/saber-co"
$BRANCH = "main"
$BUILD_COMMAND = "npm run build"
$BUILD_OUTPUT = "dist"

Write-Host "📋 Configuración:" -ForegroundColor Yellow
Write-Host "   Proyecto: $PROJECT_NAME" -ForegroundColor White
Write-Host "   Repo: $REPO_NAME (público)" -ForegroundColor White
Write-Host "   Branch: $BRANCH" -ForegroundColor White
Write-Host "   Build: $BUILD_COMMAND → $BUILD_OUTPUT" -ForegroundColor White
Write-Host ""

# ═══════════════════════════════════════════════════════════════
# PASO 1: Verificar Login en Cloudflare
# ═══════════════════════════════════════════════════════════════

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "  PASO 1: Verificar autenticación Cloudflare" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`n" -ForegroundColor Cyan

Write-Host "🔐 Verificando login..." -ForegroundColor Yellow

try {
    $whoami = npx wrangler whoami 2>&1 | Out-String

    if ($whoami -match "You are logged in") {
        Write-Host "✅ Autenticado en Cloudflare" -ForegroundColor Green
    } else {
        Write-Host "❌ No autenticado. Ejecuta: npx wrangler login" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "❌ Error verificando autenticación: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# ═══════════════════════════════════════════════════════════════
# PASO 2: INSTRUCCIONES MANUALES (Cloudflare Dashboard)
# ═══════════════════════════════════════════════════════════════

Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "  PASO 2: Conectar GitHub (Manual en Dashboard)" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`n" -ForegroundColor Cyan

Write-Host "⚠️  IMPORTANTE: El CLI de Wrangler NO soporta conectar GitHub automáticamente." -ForegroundColor Yellow
Write-Host "   Debes hacerlo manualmente en el Dashboard (solo una vez, toma 2 minutos)." -ForegroundColor Yellow
Write-Host ""
Write-Host "📋 Sigue estos pasos:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. 🌐 Abre: https://dash.cloudflare.com/" -ForegroundColor White
Write-Host ""
Write-Host "2. 🔗 Ve a: Workers & Pages → Create application → Pages → Connect to Git" -ForegroundColor White
Write-Host ""
Write-Host "3. 🔐 Autoriza GitHub:" -ForegroundColor White
Write-Host "   - Click 'Connect GitHub'" -ForegroundColor Gray
Write-Host "   - Autoriza Cloudflare Pages app" -ForegroundColor Gray
Write-Host "   - Selecciona 'Only select repositories'" -ForegroundColor Gray
Write-Host "   - Escoge: iberi22/saber-co" -ForegroundColor Green
Write-Host ""
Write-Host "4. ⚙️  Configuración del proyecto:" -ForegroundColor White
Write-Host "   Project name:          $PROJECT_NAME" -ForegroundColor Green
Write-Host "   Production branch:     $BRANCH" -ForegroundColor Green
Write-Host "   Framework preset:      None (manual)" -ForegroundColor Green
Write-Host "   Build command:         $BUILD_COMMAND" -ForegroundColor Green
Write-Host "   Build output directory: $BUILD_OUTPUT" -ForegroundColor Green
Write-Host ""
Write-Host "5. 🌍 Environment variables (AGREGAR ESTAS):" -ForegroundColor White
Write-Host ""
Write-Host "   PUBLIC_SUPABASE_URL:" -ForegroundColor Cyan
Write-Host "   https://tzmrgvtptdtsjcugwqyq.supabase.co" -ForegroundColor Gray
Write-Host ""
Write-Host "   PUBLIC_SUPABASE_ANON_KEY:" -ForegroundColor Cyan
Write-Host "   (Copia desde tu .env local en saberparatodos)" -ForegroundColor Gray
Write-Host ""
Write-Host "   PUBLIC_SITE_URL:" -ForegroundColor Cyan
Write-Host "   https://saberparatodos.space" -ForegroundColor Gray
Write-Host ""
Write-Host "6. 💾 Click 'Save and Deploy'" -ForegroundColor White
Write-Host ""
Write-Host "7. ⏳ Espera el primer build (2-3 minutos)" -ForegroundColor White
Write-Host ""
Write-Host "8. 🔗 Configura custom domain:" -ForegroundColor White
Write-Host "   - En el proyecto → Settings → Custom domains" -ForegroundColor Gray
Write-Host "   - Agregar: saberparatodos.space" -ForegroundColor Green
Write-Host ""

# ═══════════════════════════════════════════════════════════════
# PASO 3: Esperar confirmación del usuario
# ═══════════════════════════════════════════════════════════════

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`n" -ForegroundColor Cyan

$confirmation = Read-Host "¿Ya completaste la configuración en el Dashboard? (y/N)"

if ($confirmation -ne 'y' -and $confirmation -ne 'Y') {
    Write-Host "`n⏸️  Pausado. Completa los pasos y vuelve a ejecutar este script." -ForegroundColor Yellow
    exit 0
}

# ═══════════════════════════════════════════════════════════════
# PASO 4: Verificar el proyecto
# ═══════════════════════════════════════════════════════════════

Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "  PASO 3: Verificar configuración" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`n" -ForegroundColor Cyan

Write-Host "🔍 Listando proyectos de Cloudflare Pages..." -ForegroundColor Yellow

try {
    npx wrangler pages project list
} catch {
    Write-Host "❌ Error listando proyectos: $($_.Exception.Message)" -ForegroundColor Red
}

# ═══════════════════════════════════════════════════════════════
# PASO 5: Verificar deployment
# ═══════════════════════════════════════════════════════════════

Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "  PASO 4: Verificar deployments" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`n" -ForegroundColor Cyan

Write-Host "📜 Últimos deployments de $PROJECT_NAME..." -ForegroundColor Yellow

try {
    npx wrangler pages deployment list --project-name=$PROJECT_NAME
} catch {
    Write-Host "⚠️  Proyecto aún no existe. Completa la configuración manual primero." -ForegroundColor Yellow
}

# ═══════════════════════════════════════════════════════════════
# RESUMEN FINAL
# ═══════════════════════════════════════════════════════════════

Write-Host "`n╔═══════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║                  ✅ CONFIGURACIÓN LISTA                      ║" -ForegroundColor Green
Write-Host "╚═══════════════════════════════════════════════════════════════╝`n" -ForegroundColor Green

Write-Host "📋 Próximos pasos:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. 🔄 Hacer un push a saber-co:" -ForegroundColor White
Write-Host "   cd ../saber-co" -ForegroundColor Gray
Write-Host "   git commit --allow-empty -m 'test: trigger deployment'" -ForegroundColor Gray
Write-Host "   git push origin main" -ForegroundColor Gray
Write-Host ""
Write-Host "2. 📊 Monitorear build:" -ForegroundColor White
Write-Host "   https://dash.cloudflare.com/ → Workers & Pages → $PROJECT_NAME" -ForegroundColor Gray
Write-Host ""
Write-Host "3. ✅ Verificar sitio:" -ForegroundColor White
Write-Host "   https://saberparatodos.space" -ForegroundColor Gray
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "💡 Deploy automático configurado (100% GRATIS)" -ForegroundColor Green
Write-Host "   Cada push a main → Build automático en Cloudflare" -ForegroundColor Green
Write-Host "   NO usa GitHub Actions = NO consume créditos ✨" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`n" -ForegroundColor Cyan
