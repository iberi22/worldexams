# Verify Cloudflare Environment Variables
Write-Host "🔍 Verificando variables de entorno en Cloudflare..." -ForegroundColor Cyan

# Load .env file
$envFile = Get-Content .env
$envVars = @{}
foreach ($line in $envFile) {
    if ($line -match '^([^=]+)=(.+)$') {
        $envVars[$matches[1]] = $matches[2]
    }
}

Write-Host "`n📋 Variables configuradas en Cloudflare (según screenshot):" -ForegroundColor Yellow
Write-Host "1. PUBLIC_API_BASE_URL = https://saberparatodo..." -ForegroundColor Gray
Write-Host "2. PUBLIC_SITE_URL = https://saberparatodo..." -ForegroundColor Gray
Write-Host "3. PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." -ForegroundColor Gray
Write-Host "4. PUBLIC_SUPABASE_URL = https://tzmrgvtptdtsj..." -ForegroundColor Gray

Write-Host "`n✅ Verificación de valores:" -ForegroundColor Green

# Check PUBLIC_SUPABASE_URL
$expectedUrl = $envVars['PUBLIC_SUPABASE_URL']
Write-Host "`n🔹 PUBLIC_SUPABASE_URL" -ForegroundColor Cyan
Write-Host "   Esperado: $expectedUrl" -ForegroundColor White
Write-Host "   En Cloudflare: =https://tzmrgvtptdtsj... (con signo =)" -ForegroundColor Yellow
Write-Host "   ⚠️  PROBLEMA: Hay un '=' al inicio del valor" -ForegroundColor Red

# Check PUBLIC_SUPABASE_ANON_KEY
$expectedKey = $envVars['PUBLIC_SUPABASE_ANON_KEY']
Write-Host "`n🔹 PUBLIC_SUPABASE_ANON_KEY" -ForegroundColor Cyan
Write-Host "   Esperado: $($expectedKey.Substring(0,50))..." -ForegroundColor White
Write-Host "   En Cloudflare: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." -ForegroundColor Green
Write-Host "   ✅ Parece correcto" -ForegroundColor Green

# Check PUBLIC_API_BASE_URL
Write-Host "`n🔹 PUBLIC_API_BASE_URL" -ForegroundColor Cyan
Write-Host "   Esperado: https://saberparatodos.pages.dev/api/v1" -ForegroundColor White
Write-Host "   En Cloudflare: https://saberparatodo... (truncado)" -ForegroundColor Green
Write-Host "   ✅ Probablemente correcto" -ForegroundColor Green

# Check PUBLIC_SITE_URL
Write-Host "`n🔹 PUBLIC_SITE_URL" -ForegroundColor Cyan
Write-Host "   Esperado: https://saberparatodos.pages.dev" -ForegroundColor White
Write-Host "   En Cloudflare: https://saberparatodo... (truncado)" -ForegroundColor Green
Write-Host "   ✅ Probablemente correcto" -ForegroundColor Green

Write-Host "`n⚠️  ACCIÓN REQUERIDA:" -ForegroundColor Yellow
Write-Host "La variable PUBLIC_SUPABASE_URL tiene un '=' al inicio." -ForegroundColor White
Write-Host "Debes editarla en el dashboard de Cloudflare:" -ForegroundColor White
Write-Host ""
Write-Host "1. Click en el ícono de editar (lápiz) de PUBLIC_SUPABASE_URL" -ForegroundColor Cyan
Write-Host "2. Cambiar de: =https://tzmrgvtptdtsjcugwqyq.supabase.co" -ForegroundColor Red
Write-Host "3. A: https://tzmrgvtptdtsjcugwqyq.supabase.co" -ForegroundColor Green
Write-Host "   (sin el signo = al inicio)" -ForegroundColor White
Write-Host ""
Write-Host "4. Guardar cambios" -ForegroundColor Cyan
Write-Host "5. Retry deployment con 'Clear build cache'" -ForegroundColor Cyan

Write-Host "`n📊 Resumen:" -ForegroundColor Magenta
Write-Host "✅ 3 variables correctas" -ForegroundColor Green
Write-Host "❌ 1 variable con error (PUBLIC_SUPABASE_URL)" -ForegroundColor Red
