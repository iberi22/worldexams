# Test-Country-Detection.ps1
# Tests the IP-based country detection for WorldExams

Write-Host "🌍 WorldExams Country Detection Test" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan

# Test IPs for different countries
$testIPs = @(
  @{ ip = "181.51.123.45"; expected = "CO"; name = "Colombia" },
  @{ ip = "189.234.123.45"; expected = "MX"; name = "México" },
  @{ ip = "186.9.45.123"; expected = "CL"; name = "Chile" },
  @{ ip = "190.117.89.45"; expected = "PE"; name = "Perú" },
  @{ ip = "186.101.45.123"; expected = "EC"; name = "Ecuador" },
  @{ ip = "138.0.45.123"; expected = "BR"; name = "Brasil" },
  @{ ip = "3.5.45.123"; expected = "US"; name = "Estados Unidos" }
)

$passCount = 0
$failCount = 0

foreach ($test in $testIPs) {
  Write-Host ""
  Write-Host "Testing IP: $($test.ip) ($($test.name))" -ForegroundColor Yellow

  try {
    $result = Invoke-RestMethod -Uri "http://ip-api.com/json/$($test.ip)" -TimeoutSec 10 -ErrorAction Stop

    $detectedCountry = $result.countryCode
    $countryName = $result.country_name

    if ($detectedCountry -eq $test.expected) {
      Write-Host "  ✅ PASS: Detected $($detectedCountry) ($countryName)" -ForegroundColor Green
      $passCount++
    } else {
      Write-Host "  ❌ FAIL: Expected $($test.expected) but got $($detectedCountry) ($countryName)" -ForegroundColor Red
      $failCount++
    }
  } catch {
    Write-Host "  ⚠️  ERROR: Could not reach ipapi.co - $($_.Exception.Message)" -ForegroundColor Yellow
    $failCount++
  }
}

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "Summary: $($passCount) passed, $($failCount) failed" -ForegroundColor $(if ($failCount -eq 0) { "Green" } else { "Yellow" })

# Test localStorage simulation (for client-side)
Write-Host ""
Write-Host "Testing CountryConfig data structure..." -ForegroundColor Cyan

$countries = @(
  @{ code = "CO"; name = "Colombia"; exam = "ICFES Saber"; locale = "es-CO" },
  @{ code = "MX"; name = "México"; exam = "EXANI / COMIPEMS"; locale = "es-MX" },
  @{ code = "AR"; name = "Argentina"; exam = "CBC / UBA"; locale = "es-AR" },
  @{ code = "CL"; name = "Chile"; exam = "PSU / PDT"; locale = "es-CL" },
  @{ code = "PE"; name = "Perú"; exam = "UNI / San Marcos"; locale = "es-PE" },
  @{ code = "EC"; name = "Ecuador"; exam = "SENESCYT / Ser Bachiller"; locale = "es-EC" },
  @{ code = "BR"; name = "Brasil"; exam = "ENEM"; locale = "pt-BR" }
)

foreach ($country in $countries) {
  Write-Host "  $($country.code): $($country.name) - $($country.exam) (locale: $($country.locale))" -ForegroundColor White
}

Write-Host ""
Write-Host "✅ Country detection test complete!" -ForegroundColor Green
