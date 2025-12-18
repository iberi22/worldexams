# Upload a Supabase Storage usando REST API directamente
# Evita problemas con versiones antiguas del CLI

param(
    [string]$ProjectRef = "tzmrgvtptdtsjcugwqyq",
    [string]$ServiceRoleKey = $env:SUPABASE_SERVICE_ROLE_KEY,
    [string]$BucketName = "questions"
)

Write-Host "`n═══════════════════════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  📤 UPLOAD A STORAGE (REST API)" -ForegroundColor White
Write-Host "═══════════════════════════════════════════════════════════════════════════════`n" -ForegroundColor Cyan

if (-not $ServiceRoleKey) {
    Write-Host "❌ ERROR: SUPABASE_SERVICE_ROLE_KEY no encontrada" -ForegroundColor Red
    exit 1
}

$baseUrl = "https://$ProjectRef.supabase.co/storage/v1"
$headers = @{
    "Authorization" = "Bearer $ServiceRoleKey"
    "Content-Type" = "application/json"
}

# 1. Crear bucket si no existe
Write-Host "📦 Creando bucket '$BucketName'..." -ForegroundColor Cyan
$createBucketBody = @{
    id = $BucketName
    name = $BucketName
    public = $false
    file_size_limit = 5242880
    allowed_mime_types = @("application/json")
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/bucket" -Method Post -Headers $headers -Body $createBucketBody -ErrorAction SilentlyContinue
    Write-Host "✅ Bucket creado exitosamente" -ForegroundColor Green
} catch {
    if ($_.Exception.Response.StatusCode -eq 409) {
        Write-Host "✅ Bucket ya existe" -ForegroundColor Green
    } else {
        Write-Host "⚠️ Advertencia al crear bucket: $($_.Exception.Message)" -ForegroundColor Yellow
    }
}

# 2. Escanear archivos JSON
$apiPath = "saberparatodos\public\api\co\icfes"
Write-Host "`n🔍 Escaneando archivos en: $apiPath" -ForegroundColor Cyan
$jsonFiles = Get-ChildItem -Path $apiPath -Recurse -Filter "*.json"
Write-Host "📊 Archivos encontrados: $($jsonFiles.Count)" -ForegroundColor White

# 3. Subir archivos
$uploadHeaders = @{
    "Authorization" = "Bearer $ServiceRoleKey"
}

$uploaded = 0
$failed = 0

foreach ($file in $jsonFiles) {
    # Construir path relativo para Storage
    $relativePath = $file.FullName.Replace($apiPath, "").TrimStart("\").Replace("\", "/")
    $storagePath = "co/icfes/$relativePath"
    
    Write-Host "`n📤 Uploading: $storagePath" -ForegroundColor Cyan
    Write-Host "   Local: $($file.Name) ($('{0:N2}' -f ($file.Length/1KB)) KB)" -ForegroundColor Gray
    
    try {
        $fileContent = Get-Content $file.FullName -Raw
        $uploadUrl = "$baseUrl/object/$BucketName/$storagePath"
        
        # Configurar Content-Type correcto
        $uploadHeaders["Content-Type"] = "application/json"
        
        $response = Invoke-RestMethod -Uri $uploadUrl -Method Post -Headers $uploadHeaders -Body $fileContent
        Write-Host "   ✅ Subido exitosamente" -ForegroundColor Green
        $uploaded++
    } catch {
        Write-Host "   ❌ Error: $($_.Exception.Message)" -ForegroundColor Red
        $failed++
    }
}

Write-Host "`n═══════════════════════════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host "  ✅ UPLOAD COMPLETADO" -ForegroundColor White
Write-Host "═══════════════════════════════════════════════════════════════════════════════`n" -ForegroundColor Green

Write-Host "📊 RESUMEN:" -ForegroundColor Yellow
Write-Host "  ✅ Archivos subidos: $uploaded" -ForegroundColor Green
Write-Host "  ❌ Errores: $failed" -ForegroundColor $(if ($failed -gt 0) { "Red" } else { "Green" })
Write-Host "  📦 Bucket: $BucketName" -ForegroundColor White
Write-Host "  🔗 URL base: https://$ProjectRef.supabase.co/storage/v1/object/$BucketName/`n" -ForegroundColor Cyan
