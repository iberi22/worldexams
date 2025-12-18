# Script para subir preguntas a Supabase Storage
# Agrupa en bloques de 100 preguntas y sube automáticamente
# Ejecutar: pwsh scripts/upload-questions-to-storage.ps1

param(
    [string]$ProjectRef = "",
    [string]$ServiceRoleKey = $env:SUPABASE_SERVICE_ROLE_KEY,
    [int]$QuestionsPerFile = 100,
    [switch]$DryRun = $false
)

Write-Host "`n═══════════════════════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  📤 UPLOAD DE PREGUNTAS A SUPABASE STORAGE" -ForegroundColor White
Write-Host "═══════════════════════════════════════════════════════════════════════════════`n" -ForegroundColor Cyan

# Validaciones
if (-not $ProjectRef) {
    Write-Host "❌ ERROR: ProjectRef es requerido" -ForegroundColor Red
    Write-Host "Uso: .\upload-questions-to-storage.ps1 -ProjectRef YOUR_PROJECT_REF`n" -ForegroundColor Yellow
    exit 1
}

if (-not $ServiceRoleKey) {
    Write-Host "❌ ERROR: SUPABASE_SERVICE_ROLE_KEY no encontrada" -ForegroundColor Red
    Write-Host "Por favor configura la variable de entorno:`n" -ForegroundColor Yellow
    Write-Host "`$env:SUPABASE_SERVICE_ROLE_KEY = 'your-service-role-key'`n" -ForegroundColor Cyan
    exit 1
}

# Verificar que Supabase CLI esté instalado
if (-not (Get-Command supabase -ErrorAction SilentlyContinue)) {
    Write-Host "❌ ERROR: Supabase CLI no está instalado" -ForegroundColor Red
    Write-Host "Instalar con: npm install -g supabase`n" -ForegroundColor Yellow
    exit 1
}

Write-Host "📋 Configuración:" -ForegroundColor Yellow
Write-Host "  Project: $ProjectRef" -ForegroundColor White
Write-Host "  Preguntas por archivo: $QuestionsPerFile" -ForegroundColor White
Write-Host "  Dry Run: $DryRun`n" -ForegroundColor White

# 1. Leer todos los JSON actuales
$apiPath = "saberparatodos\public\api\co\icfes"
Write-Host "🔍 Escaneando archivos JSON en: $apiPath" -ForegroundColor Cyan

if (-not (Test-Path $apiPath)) {
    Write-Host "❌ ERROR: Ruta no encontrada: $apiPath" -ForegroundColor Red
    exit 1
}

$jsonFiles = Get-ChildItem -Path $apiPath -Recurse -Filter "*.json"
Write-Host "📊 Archivos encontrados: $($jsonFiles.Count)`n" -ForegroundColor Green

# 2. Procesar cada grado y materia
$totalUploaded = 0
$totalQuestions = 0
$errors = @()

# Estructura: grado -> materia -> preguntas
$structure = @{}

foreach ($file in $jsonFiles) {
    # Parsear ruta: .../11/matematicas/1.json
    $relativePath = $file.FullName.Replace((Resolve-Path $apiPath).Path, "").TrimStart("\")
    $parts = $relativePath -split "\\"

    if ($parts.Count -lt 3) { continue }

    $grade = $parts[0]
    $subject = $parts[1]

    if (-not $structure.ContainsKey($grade)) {
        $structure[$grade] = @{}
    }
    if (-not $structure[$grade].ContainsKey($subject)) {
        $structure[$grade][$subject] = @()
    }

    # Leer preguntas del archivo
    try {
        $content = Get-Content $file.FullName -Raw | ConvertFrom-Json
        $structure[$grade][$subject] += $content
        $totalQuestions += $content.Count
    }
    catch {
        Write-Host "⚠️ Error leyendo $($file.Name): $_" -ForegroundColor Yellow
        $errors += "Error leyendo $($file.Name)"
    }
}

Write-Host "📊 RESUMEN DE PREGUNTAS:" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════════════════════════════════════════`n" -ForegroundColor Cyan

foreach ($grade in ($structure.Keys | Sort-Object)) {
    Write-Host "📚 Grado $grade" -ForegroundColor Cyan
    foreach ($subject in ($structure[$grade].Keys | Sort-Object)) {
        $count = $structure[$grade][$subject].Count
        Write-Host "   • $subject : $count preguntas" -ForegroundColor White
    }
    Write-Host ""
}

Write-Host "📊 Total de preguntas: $totalQuestions`n" -ForegroundColor Green

# 3. Agrupar en bloques y subir
Write-Host "📤 INICIANDO UPLOAD A STORAGE..." -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════════════════════════════════════════`n" -ForegroundColor Cyan

$uploadedFiles = 0

foreach ($grade in $structure.Keys) {
    foreach ($subject in $structure[$grade].Keys) {
        $questions = $structure[$grade][$subject]

        # Dividir en páginas de $QuestionsPerFile preguntas
        $pageNumber = 1
        for ($i = 0; $i -lt $questions.Count; $i += $QuestionsPerFile) {
            $endIndex = [Math]::Min($i + $QuestionsPerFile - 1, $questions.Count - 1)
            $batch = $questions[$i..$endIndex]

            # Crear JSON temporal
            $jsonContent = $batch | ConvertTo-Json -Depth 10 -Compress
            $tempFile = "temp-page-$pageNumber.json"
            $jsonContent | Out-File -FilePath $tempFile -Encoding UTF8 -NoNewline

            # Path en Storage: co/icfes/{grade}/{subject}/page-{N}.json
            $storagePath = "co/icfes/$grade/$subject/page-$pageNumber.json"

            Write-Host "📤 Uploading: $storagePath" -ForegroundColor Yellow
            Write-Host "   └─ $($batch.Count) preguntas | $(($jsonContent.Length / 1KB).ToString('0.00')) KB" -ForegroundColor White

            if (-not $DryRun) {
                try {
                    # Subir usando Supabase CLI
                    $uploadResult = & supabase storage upload questions $storagePath $tempFile --project-ref $ProjectRef 2>&1

                    if ($LASTEXITCODE -eq 0) {
                        Write-Host "   ✅ Éxito" -ForegroundColor Green
                        $uploadedFiles++
                    }
                    else {
                        Write-Host "   ❌ Error: $uploadResult" -ForegroundColor Red
                        $errors += "Error subiendo $storagePath"
                    }
                }
                catch {
                    Write-Host "   ❌ Excepción: $_" -ForegroundColor Red
                    $errors += "Excepción en $storagePath : $_"
                }
            }
            else {
                Write-Host "   ⏭️ SKIP (Dry Run)" -ForegroundColor Magenta
            }

            # Limpiar archivo temporal
            if (Test-Path $tempFile) {
                Remove-Item $tempFile -Force
            }

            $pageNumber++
        }

        Write-Host ""
    }
}

Write-Host "`n═══════════════════════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  ✅ UPLOAD COMPLETADO" -ForegroundColor White
Write-Host "═══════════════════════════════════════════════════════════════════════════════`n" -ForegroundColor Cyan

Write-Host "📊 RESUMEN FINAL:" -ForegroundColor Yellow
Write-Host "  • Total preguntas procesadas: $totalQuestions" -ForegroundColor White
Write-Host "  • Archivos generados: $uploadedFiles" -ForegroundColor White
Write-Host "  • Preguntas por archivo: $QuestionsPerFile" -ForegroundColor White

if ($errors.Count -gt 0) {
    Write-Host "`n⚠️ ERRORES ENCONTRADOS:" -ForegroundColor Red
    foreach ($error in $errors) {
        Write-Host "  • $error" -ForegroundColor Yellow
    }
}

if ($DryRun) {
    Write-Host "`n💡 DRY RUN MODE: No se subieron archivos realmente" -ForegroundColor Magenta
    Write-Host "   Ejecuta sin -DryRun para subir de verdad`n" -ForegroundColor Cyan
}
else {
    Write-Host "`n✅ ¡Upload exitoso! Las preguntas están ahora en Supabase Storage" -ForegroundColor Green
    Write-Host "📍 Bucket: questions" -ForegroundColor White
    Write-Host "🔗 URL Edge Function: https://$ProjectRef.supabase.co/functions/v1/get-questions`n" -ForegroundColor Cyan
}
