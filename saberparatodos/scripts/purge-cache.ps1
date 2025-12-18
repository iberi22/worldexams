# Purge Cloudflare Cache for saberparatodos.space
# This script purges ALL cache for the domain

Write-Host "🔥 Purgando cache de Cloudflare para saberparatodos.space..." -ForegroundColor Yellow

# Get Cloudflare credentials from environment or wrangler config
$ZONE_ID = "963f01052b7f84cb785e72ba2b4d6e12"  # Your Cloudflare zone ID

# Try multiple paths for wrangler config
$possiblePaths = @(
    "$env:USERPROFILE\.wrangler\config\default.toml",
    "$env:USERPROFILE\.config\.wrangler\config\default.toml",
    "$env:APPDATA\.wrangler\config\default.toml"
)

$apiToken = $null
foreach ($path in $possiblePaths) {
    if (Test-Path $path) {
        $content = Get-Content $path -Raw
        if ($content -match 'api_token\s*=\s*"([^"]+)"') {
            $apiToken = $matches[1]
            Write-Host "✓ Token encontrado en: $path" -ForegroundColor Green
            break
        }
    }
}

if (-not $apiToken) {
    Write-Host "❌ No se pudo obtener el API token automáticamente" -ForegroundColor Red
    Write-Host ""
    Write-Host "🔑 Ingresa tu Cloudflare API Token manualmente:" -ForegroundColor Yellow
    Write-Host "   (Lo puedes obtener de: https://dash.cloudflare.com/profile/api-tokens)" -ForegroundColor Cyan
    $apiToken = Read-Host "API Token"

    if (-not $apiToken) {
        Write-Host "❌ Token requerido. Abortando." -ForegroundColor Red
        exit 1
    }
}

# Purge all cache for the zone
$headers = @{
    "Authorization" = "Bearer $apiToken"
    "Content-Type" = "application/json"
}

$body = @{
    purge_everything = $true
} | ConvertTo-Json

try {
    Write-Host "🌐 Enviando solicitud a Cloudflare API..." -ForegroundColor Cyan

    $response = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/purge_cache" `
        -Method POST `
        -Headers $headers `
        -Body $body `
        -ErrorAction Stop

    if ($response.success) {
        Write-Host "✅ Cache purgado exitosamente!" -ForegroundColor Green
        Write-Host "🔄 El dominio saberparatodos.space mostrará el contenido nuevo en ~30 segundos" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "📍 Verifica en:" -ForegroundColor White
        Write-Host "   - https://saberparatodos.space" -ForegroundColor Blue
        Write-Host "   - https://www.saberparatodos.space" -ForegroundColor Blue
    } else {
        Write-Host "❌ Error al purgar cache:" -ForegroundColor Red
        Write-Host ($response | ConvertTo-Json -Depth 10)
    }
} catch {
    Write-Host "❌ Error en la solicitud:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red

    if ($_.Exception.Response) {
        $reader = [System.IO.StreamReader]::new($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Detalles:" -ForegroundColor Yellow
        Write-Host $responseBody
    }
}
