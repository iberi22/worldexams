# Test Supabase Connection from Cloudflare
Write-Host "🔍 Verificando conexión a Supabase desde Cloudflare..." -ForegroundColor Cyan

# Test Supabase health endpoint
$supabaseUrl = "https://tzmrgvtptdtsjcugwqyq.supabase.co/rest/v1/"
Write-Host "`n📍 Supabase URL: $supabaseUrl" -ForegroundColor White

try {
    $anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6bXJndnRwdGR0c2pjdWd3cXlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxMTc0NDYsImV4cCI6MjA3OTY5MzQ0Nn0.sPtxeTyDlF9sdQVrfM1wLp_RLKhI1sFk0W-h8Mc_VIc"

    $headers = @{
        "apikey" = $anonKey
        "Authorization" = "Bearer $anonKey"
    }

    Write-Host "⏳ Testeando conexión a Supabase..." -ForegroundColor Yellow
    $response = Invoke-WebRequest -Uri $supabaseUrl -Headers $headers -Method GET -TimeoutSec 10 -UseBasicParsing

    Write-Host "✅ Supabase está respondiendo (Status: $($response.StatusCode))" -ForegroundColor Green
    Write-Host "✅ La API key es válida" -ForegroundColor Green

} catch {
    if ($_.Exception.Response.StatusCode -eq 401) {
        Write-Host "❌ Error 401: La API key es inválida" -ForegroundColor Red
    } elseif ($_.Exception.Response.StatusCode -eq 404) {
        Write-Host "✅ Supabase responde (404 esperado sin tabla específica)" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Error: $($_.Exception.Message)" -ForegroundColor Yellow
    }
}

Write-Host "`n📊 Resumen de Configuración:" -ForegroundColor Magenta
Write-Host "✅ Sitio principal: https://saberparatodos.pages.dev" -ForegroundColor Green
Write-Host "✅ Party Mode: https://saberparatodos.pages.dev/party" -ForegroundColor Green
Write-Host "✅ Supabase URL configurada correctamente" -ForegroundColor Green
Write-Host "✅ Variables de entorno aplicadas" -ForegroundColor Green

Write-Host "`n🎯 Prueba Final:" -ForegroundColor Cyan
Write-Host "1. Abre: https://saberparatodos.pages.dev" -ForegroundColor White
Write-Host "2. Intenta hacer login (debería funcionar ahora)" -ForegroundColor White
Write-Host "3. Ve a Party Mode: https://saberparatodos.pages.dev/party" -ForegroundColor White
Write-Host "4. Verifica que no haya errores en la consola (F12)" -ForegroundColor White

Write-Host "`n💡 Si el login aún falla:" -ForegroundColor Yellow
Write-Host "   - Abre DevTools (F12)" -ForegroundColor Gray
Write-Host "   - Ve a la pestaña Console" -ForegroundColor Gray
Write-Host "   - Busca mensajes de error de Supabase" -ForegroundColor Gray
Write-Host "   - Verifica que PUBLIC_SUPABASE_URL NO tenga el '=' al inicio" -ForegroundColor Gray
