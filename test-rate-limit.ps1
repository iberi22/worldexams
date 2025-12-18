# Script para probar Rate Limiting (PowerShell)
# ⚠️ Solo ejecutar en ambiente de prueba

Write-Host "🧪 Iniciando prueba de Rate Limiting..." -ForegroundColor Cyan
Write-Host "Intentando descargar 150 archivos en 1 minuto...`n" -ForegroundColor Yellow

$baseUrl = "https://saberparatodos.space/api/co/icfes/11/matematicas"
$successCount = 0
$blockedCount = 0
$captchaCount = 0

for ($i = 1; $i -le 150; $i++) {
    try {
        $response = Invoke-WebRequest -Uri "$baseUrl/$i.json" -ErrorAction Stop
        $statusCode = $response.StatusCode

        if ($statusCode -eq 200) {
            $successCount++
            Write-Host "✅ Request $i - OK" -ForegroundColor Green
        }
    }
    catch {
        $statusCode = $_.Exception.Response.StatusCode.value__

        if ($statusCode -eq 429) {
            $blockedCount++
            Write-Host "🚫 Request $i - BLOCKED (429 Too Many Requests)" -ForegroundColor Red
        }
        elseif ($statusCode -eq 403) {
            $captchaCount++
            Write-Host "🔐 Request $i - CAPTCHA CHALLENGE (403)" -ForegroundColor Yellow
        }
        else {
            Write-Host "❓ Request $i - Error $statusCode" -ForegroundColor Magenta
        }
    }

    # Pequeño delay para simular scraping realista
    Start-Sleep -Milliseconds 300
}

Write-Host "`n═══════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "📊 RESULTADOS DE LA PRUEBA" -ForegroundColor White
Write-Host "═══════════════════════════════════════════════`n" -ForegroundColor Cyan
Write-Host "✅ Exitosos: $successCount / 150" -ForegroundColor Green
Write-Host "🔐 CAPTCHA challenges: $captchaCount / 150" -ForegroundColor Yellow
Write-Host "🚫 Bloqueados: $blockedCount / 150" -ForegroundColor Red

if ($successCount -le 100 -and ($captchaCount -gt 0 -or $blockedCount -gt 0)) {
    Write-Host "`n✅ PROTECCIÓN FUNCIONANDO CORRECTAMENTE" -ForegroundColor Green
    Write-Host "El Rate Limiting está activo y bloqueando scraping masivo." -ForegroundColor Green
}
else {
    Write-Host "`n⚠️ ADVERTENCIA: Protección no detectada" -ForegroundColor Red
    Write-Host "Verifica que las reglas de Rate Limiting estén activas en Cloudflare." -ForegroundColor Yellow
}
