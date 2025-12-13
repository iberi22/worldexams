# Test Cloudflare Deployment Status
Write-Host "🔍 Verificando estado del deployment de Cloudflare..." -ForegroundColor Cyan

# Test the main site
$url = "https://saberparatodos.pages.dev"
Write-Host "`n📍 URL: $url" -ForegroundColor White

try {
    Write-Host "`n⏳ Haciendo request a la página principal..." -ForegroundColor Yellow
    $response = Invoke-WebRequest -Uri $url -Method GET -TimeoutSec 10 -UseBasicParsing
    
    Write-Host "✅ Status Code: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "✅ El sitio está respondiendo!" -ForegroundColor Green
    
    # Check if contains expected content
    if ($response.Content -match "Saber Para Todos" -or $response.Content -match "saberparatodos") {
        Write-Host "✅ Contenido detectado: La página parece estar correcta" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Contenido inesperado" -ForegroundColor Yellow
    }
    
} catch {
    Write-Host "❌ Error al conectar: $($_.Exception.Message)" -ForegroundColor Red
}

# Check Party Mode endpoint
Write-Host "`n📍 Verificando Party Mode endpoint..." -ForegroundColor Cyan
$partyUrl = "https://saberparatodos.pages.dev/party"

try {
    $partyResponse = Invoke-WebRequest -Uri $partyUrl -Method GET -TimeoutSec 10 -UseBasicParsing
    Write-Host "✅ Party Mode endpoint está respondiendo (Status: $($partyResponse.StatusCode))" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Party Mode endpoint: $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host "`n📊 Próximos pasos:" -ForegroundColor Magenta
Write-Host "1. El deployment automático puede tardar 2-5 minutos" -ForegroundColor White
Write-Host "2. Ve al dashboard: https://dash.cloudflare.com/" -ForegroundColor White
Write-Host "3. Workers & Pages > saberparatodos > Deployments" -ForegroundColor White
Write-Host "4. Verifica que el nuevo deployment (commit c9d6263) esté en progreso" -ForegroundColor White
Write-Host ""
Write-Host "💡 Si el deployment no inicia automáticamente:" -ForegroundColor Yellow
Write-Host "   - Ve a Deployments en el dashboard" -ForegroundColor Gray
Write-Host "   - Click en 'Create deployment'" -ForegroundColor Gray
Write-Host "   - Selecciona la rama 'main'" -ForegroundColor Gray
Write-Host "   - Click en 'Save and Deploy'" -ForegroundColor Gray
