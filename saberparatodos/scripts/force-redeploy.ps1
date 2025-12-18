# Retry latest deployment to force cache invalidation
# This will create a new deployment with the same content, effectively purging the cache

Write-Host "🔄 Forzando nuevo deployment para purgar cache..." -ForegroundColor Yellow
Write-Host ""

# Get the latest deployment ID
Write-Host "📋 Obteniendo último deployment..." -ForegroundColor Cyan
$deployments = npx wrangler pages deployment list --project-name=saberparatodos 2>&1

# Extract the first deployment ID (most recent)
$latestDeployment = $deployments | Select-String -Pattern "https://([a-f0-9]+)\.saberparatodos\.pages\.dev" | Select-Object -First 1
if ($latestDeployment -match "https://([a-f0-9]+)\.saberparatodos\.pages\.dev") {
    $deploymentId = $matches[1]
    Write-Host "✓ Último deployment: $deploymentId" -ForegroundColor Green
} else {
    Write-Host "❌ No se pudo encontrar el último deployment" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🚀 Creando nuevo deployment..." -ForegroundColor Cyan
Write-Host ""

# Redeploy the same content
npx wrangler pages deploy dist --project-name=saberparatodos --commit-dirty=true

Write-Host ""
Write-Host "✅ Nuevo deployment completado!" -ForegroundColor Green
Write-Host "🔄 El cache ha sido invalidado automáticamente" -ForegroundColor Cyan
Write-Host ""
Write-Host "📍 Verifica en ~30 segundos:" -ForegroundColor White
Write-Host "   - https://saberparatodos.space" -ForegroundColor Blue
Write-Host "   - https://www.saberparatodos.space" -ForegroundColor Blue
Write-Host ""
Write-Host "💡 El dominio personalizado ahora mostrará el contenido actualizado" -ForegroundColor Yellow
