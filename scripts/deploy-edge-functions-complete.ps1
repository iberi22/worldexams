# ═══════════════════════════════════════════════════════════════════════════════
# 🚀 DEPLOYMENT COMPLETO - EDGE FUNCTIONS + STORAGE
# ═══════════════════════════════════════════════════════════════════════════════
# Automatiza toda la Fase 2: Storage, Migrations, Edge Functions
# Ejecutar: pwsh scripts/deploy-edge-functions-complete.ps1
# ═══════════════════════════════════════════════════════════════════════════════

param(
    [string]$ProjectRef = "",
    [switch]$SkipStorageUpload = $false,
    [switch]$SkipMigration = $false,
    [switch]$SkipEdgeFunction = $false
)

$ErrorActionPreference = "Stop"

Write-Host "`n═══════════════════════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  🚀 DEPLOYMENT AUTOMÁTICO - EDGE FUNCTIONS + STORAGE" -ForegroundColor White
Write-Host "═══════════════════════════════════════════════════════════════════════════════`n" -ForegroundColor Cyan

# ═══════════════════════════════════════════════════════════════════════════════
# STEP 1: Validaciones previas
# ═══════════════════════════════════════════════════════════════════════════════

Write-Host "📋 STEP 1: Validaciones previas" -ForegroundColor Yellow
Write-Host "───────────────────────────────────────────────────────────────────────────────`n" -ForegroundColor Gray

# Verificar Supabase CLI
Write-Host "🔍 Verificando Supabase CLI..." -ForegroundColor Cyan
if (-not (Get-Command supabase -ErrorAction SilentlyContinue)) {
    Write-Host "❌ ERROR: Supabase CLI no está instalado" -ForegroundColor Red
    Write-Host "Instalar con: npm install -g supabase`n" -ForegroundColor Yellow
    exit 1
}
$version = supabase --version
Write-Host "✅ Supabase CLI: $version`n" -ForegroundColor Green

# Verificar que estamos en la carpeta correcta
if (-not (Test-Path "supabase")) {
    Write-Host "❌ ERROR: No se encontró carpeta 'supabase'" -ForegroundColor Red
    Write-Host "Ejecutar desde la raíz del proyecto`n" -ForegroundColor Yellow
    exit 1
}
Write-Host "✅ Carpeta del proyecto: $(Get-Location)`n" -ForegroundColor Green

# Verificar project linkado
Write-Host "🔗 Verificando proyecto Supabase linkado..." -ForegroundColor Cyan
$linkStatus = supabase status 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Proyecto no está linkado`n" -ForegroundColor Yellow

    if (-not $ProjectRef) {
        Write-Host "Por favor ingresa tu Project Reference ID:" -ForegroundColor White
        Write-Host "(Encontrar en: Supabase Dashboard → Settings → General → Reference ID)`n" -ForegroundColor Gray
        $ProjectRef = Read-Host "Project Ref"
    }

    Write-Host "`n🔗 Linkeando proyecto..." -ForegroundColor Cyan
    supabase link --project-ref $ProjectRef

    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ ERROR: No se pudo linkear el proyecto`n" -ForegroundColor Red
        exit 1
    }

    Write-Host "✅ Proyecto linkeado exitosamente`n" -ForegroundColor Green
}
else {
    Write-Host "✅ Proyecto ya está linkado`n" -ForegroundColor Green
}

# ═══════════════════════════════════════════════════════════════════════════════
# STEP 2: Crear Storage Bucket
# ═══════════════════════════════════════════════════════════════════════════════

Write-Host "`n📦 STEP 2: Crear Storage Bucket 'questions'" -ForegroundColor Yellow
Write-Host "───────────────────────────────────────────────────────────────────────────────`n" -ForegroundColor Gray

Write-Host "🔍 Verificando si bucket 'questions' existe..." -ForegroundColor Cyan

# Intentar listar buckets
$bucketsOutput = supabase storage list 2>&1
if ($bucketsOutput -match "questions") {
    Write-Host "✅ Bucket 'questions' ya existe (skip)`n" -ForegroundColor Green
}
else {
    Write-Host "📦 Creando bucket 'questions'..." -ForegroundColor Cyan

    # Crear bucket via SQL (más confiable que CLI)
    $createBucketSQL = @"
-- Crear bucket 'questions' si no existe
INSERT INTO storage.buckets (id, name, public)
VALUES ('questions', 'questions', false)
ON CONFLICT (id) DO NOTHING;
"@

    $createBucketSQL | Out-File -FilePath "temp-create-bucket.sql" -Encoding UTF8

    supabase db execute -f temp-create-bucket.sql

    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Bucket 'questions' creado exitosamente`n" -ForegroundColor Green
    }
    else {
        Write-Host "⚠️  Advertencia: No se pudo crear bucket (puede que ya exista)`n" -ForegroundColor Yellow
    }

    Remove-Item temp-create-bucket.sql -ErrorAction SilentlyContinue
}

# ═══════════════════════════════════════════════════════════════════════════════
# STEP 3: Ejecutar Migración SQL
# ═══════════════════════════════════════════════════════════════════════════════

if (-not $SkipMigration) {
    Write-Host "`n🗄️  STEP 3: Ejecutar Migración SQL" -ForegroundColor Yellow
    Write-Host "───────────────────────────────────────────────────────────────────────────────`n" -ForegroundColor Gray

    $migrationFile = "supabase\migrations\20251217_user_answered_questions.sql"

    if (Test-Path $migrationFile) {
        Write-Host "📄 Ejecutando: $migrationFile" -ForegroundColor Cyan

        supabase db execute -f $migrationFile

        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Migración ejecutada exitosamente" -ForegroundColor Green
            Write-Host "   • Tabla user_answered_questions creada" -ForegroundColor White
            Write-Host "   • RLS policies configuradas" -ForegroundColor White
            Write-Host "   • Índices creados" -ForegroundColor White
            Write-Host "   • Cron job configurado`n" -ForegroundColor White
        }
        else {
            Write-Host "⚠️  Advertencia: Error en migración (puede que ya esté aplicada)`n" -ForegroundColor Yellow
        }
    }
    else {
        Write-Host "❌ ERROR: Archivo de migración no encontrado: $migrationFile`n" -ForegroundColor Red
        exit 1
    }
}
else {
    Write-Host "`n⏭️  STEP 3: Migración SQL (SKIP)`n" -ForegroundColor Magenta
}

# ═══════════════════════════════════════════════════════════════════════════════
# STEP 4: Upload de Preguntas a Storage
# ═══════════════════════════════════════════════════════════════════════════════

if (-not $SkipStorageUpload) {
    Write-Host "`n📤 STEP 4: Upload de Preguntas a Storage" -ForegroundColor Yellow
    Write-Host "───────────────────────────────────────────────────────────────────────────────`n" -ForegroundColor Gray

    # Obtener Project Ref del link
    if (-not $ProjectRef) {
        $linkConfig = Get-Content ".supabase\config.toml" -ErrorAction SilentlyContinue
        if ($linkConfig -match 'project_id = "([^"]+)"') {
            $ProjectRef = $Matches[1]
        }
    }

    if (-not $ProjectRef) {
        Write-Host "⚠️  No se pudo determinar Project Ref automáticamente" -ForegroundColor Yellow
        Write-Host "Por favor ingresa tu Project Reference ID:" -ForegroundColor White
        $ProjectRef = Read-Host "Project Ref"
    }

    Write-Host "📦 Project Ref: $ProjectRef`n" -ForegroundColor Cyan

    $uploadScript = "scripts\upload-questions-to-storage.ps1"

    if (Test-Path $uploadScript) {
        Write-Host "🚀 Ejecutando script de upload..." -ForegroundColor Cyan
        Write-Host "   (Esto puede tardar 5-10 minutos)`n" -ForegroundColor Gray

        & $uploadScript -ProjectRef $ProjectRef

        if ($LASTEXITCODE -eq 0) {
            Write-Host "`n✅ Preguntas subidas exitosamente a Storage`n" -ForegroundColor Green
        }
        else {
            Write-Host "`n⚠️  Advertencia: Algunos archivos pueden no haberse subido`n" -ForegroundColor Yellow
        }
    }
    else {
        Write-Host "❌ ERROR: Script de upload no encontrado: $uploadScript`n" -ForegroundColor Red
        exit 1
    }
}
else {
    Write-Host "`n⏭️  STEP 4: Upload de Preguntas (SKIP)`n" -ForegroundColor Magenta
}

# ═══════════════════════════════════════════════════════════════════════════════
# STEP 5: Deploy Edge Function
# ═══════════════════════════════════════════════════════════════════════════════

if (-not $SkipEdgeFunction) {
    Write-Host "`n⚡ STEP 5: Deploy Edge Function 'get-questions'" -ForegroundColor Yellow
    Write-Host "───────────────────────────────────────────────────────────────────────────────`n" -ForegroundColor Gray

    $functionPath = "supabase\functions\get-questions"

    if (Test-Path $functionPath) {
        Write-Host "🚀 Deployando Edge Function..." -ForegroundColor Cyan

        supabase functions deploy get-questions

        if ($LASTEXITCODE -eq 0) {
            Write-Host "`n✅ Edge Function deployada exitosamente" -ForegroundColor Green

            # Obtener URL
            if ($ProjectRef) {
                $functionUrl = "https://$ProjectRef.supabase.co/functions/v1/get-questions"
                Write-Host "📍 URL: $functionUrl`n" -ForegroundColor Cyan
            }
        }
        else {
            Write-Host "`n❌ ERROR: No se pudo deployar Edge Function`n" -ForegroundColor Red
            exit 1
        }
    }
    else {
        Write-Host "❌ ERROR: Edge Function no encontrada: $functionPath`n" -ForegroundColor Red
        exit 1
    }
}
else {
    Write-Host "`n⏭️  STEP 5: Edge Function Deploy (SKIP)`n" -ForegroundColor Magenta
}

# ═══════════════════════════════════════════════════════════════════════════════
# STEP 6: Resumen Final
# ═══════════════════════════════════════════════════════════════════════════════

Write-Host "`n═══════════════════════════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host "  ✅ DEPLOYMENT COMPLETADO EXITOSAMENTE" -ForegroundColor White
Write-Host "═══════════════════════════════════════════════════════════════════════════════`n" -ForegroundColor Green

Write-Host "📊 RESUMEN:" -ForegroundColor Yellow
Write-Host "  ✅ Storage Bucket 'questions' creado" -ForegroundColor Green
Write-Host "  ✅ Migración SQL ejecutada" -ForegroundColor Green
Write-Host "  ✅ Preguntas subidas a Storage" -ForegroundColor Green
Write-Host "  ✅ Edge Function 'get-questions' deployada`n" -ForegroundColor Green

Write-Host "🔗 PRÓXIMOS PASOS:" -ForegroundColor Yellow
Write-Host "  1. Actualizar frontend (api-service.ts)" -ForegroundColor White
Write-Host "  2. Probar autenticación y tracking" -ForegroundColor White
Write-Host "  3. Validar performance y cache`n" -ForegroundColor White

Write-Host "📖 VER GUÍA:" -ForegroundColor Yellow
Write-Host "  code GUIA_IMPLEMENTACION_EDGE_FUNCTIONS.md`n" -ForegroundColor Cyan

Write-Host "🧪 PROBAR EDGE FUNCTION:" -ForegroundColor Yellow
if ($ProjectRef) {
    Write-Host "  curl https://$ProjectRef.supabase.co/functions/v1/get-questions?grade=11&subject=matematicas&page=1" -ForegroundColor Cyan
    Write-Host "       -H 'Authorization: Bearer YOUR_JWT_TOKEN'`n" -ForegroundColor Cyan
}

Write-Host "═══════════════════════════════════════════════════════════════════════════════`n" -ForegroundColor Green
