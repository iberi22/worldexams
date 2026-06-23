param(
  [string]$BaseUrl = 'https://saberparatodos.space',
  [ValidateSet('production', 'preview')]
  [string]$Mode = 'production'
)

$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$localBuildInfoPath = Join-Path $repoRoot 'public/build-info.json'
$localBuildInfo = $null

if (Test-Path $localBuildInfoPath) {
  $localBuildInfo = Get-Content $localBuildInfoPath -Raw | ConvertFrom-Json
}

function Invoke-Check {
  param(
    [string]$Url
  )

  Write-Host "[verify-debug] Checking URL: $Url" -ForegroundColor Gray

  $headers = @{
    'Origin' = 'https://saberparatodos.space'
    'Referer' = 'https://saberparatodos.space/'
  }

  $response = Invoke-WebRequest -Uri $Url -Method GET -TimeoutSec 30 -UseBasicParsing -Headers $headers
  [PSCustomObject]@{
    Url = $Url
    StatusCode = [int]$response.StatusCode
    Body = [string]$response.Content
  }
}

function Assert-Contains {
  param(
    [string]$Body,
    [string]$Needle,
    [string]$Message
  )

  if (-not $Body.Contains($Needle)) {
    throw "[verify] Missing expected text: $Message"
  }
}

function Assert-NotContains {
  param(
    [string]$Body,
    [string]$Needle,
    [string]$Message
  )

  if ($Body.Contains($Needle)) {
    throw "[verify] Unexpected text found: $Message"
  }
}

Write-Host "[verify] Base URL: $BaseUrl" -ForegroundColor Cyan
Write-Host "[verify] Mode:     $Mode" -ForegroundColor Cyan

$root = Invoke-Check -Url "$BaseUrl/"
if ($root.StatusCode -lt 200 -or $root.StatusCode -ge 400) {
  throw "[verify] Home did not return 2xx/3xx."
}

$guideCo = Invoke-Check -Url "$BaseUrl/guia-examen?country=co"
Assert-Contains -Body $guideCo.Body -Needle 'Como reporta resultados el ICFES' -Message 'CO guide should retain ICFES section'

$guideMx = Invoke-Check -Url "$BaseUrl/guia-examen?country=mx"
Assert-Contains -Body $guideMx.Body -Needle 'Guia Completa EXANI-II' -Message 'MX guide hero'
Assert-NotContains -Body $guideMx.Body -Needle 'Como reporta resultados el ICFES' -Message 'MX guide must not leak ICFES block'

$guideAr = Invoke-Check -Url "$BaseUrl/guia-examen?country=ar"
Assert-Contains -Body $guideAr.Body -Needle 'Localizacion en progreso' -Message 'Generic tenant fallback should stay neutral'
Assert-NotContains -Body $guideAr.Body -Needle 'Como reporta resultados el ICFES' -Message 'Generic tenant must not leak ICFES block'

$questionsMx = Invoke-Check -Url "$BaseUrl/api/questions?country=mx&exam=exani&grade=3&subject=matematicas&page=1"
if ($questionsMx.StatusCode -ge 400) {
  throw "[verify] /api/questions returned an incompatible status for MX: $($questionsMx.StatusCode)"
}

if ($localBuildInfo) {
  $cb = Get-Random
  $buildInfoRemote = Invoke-Check -Url "$BaseUrl/build-info.json?cb=$cb"
  $buildInfoJson = $buildInfoRemote.Body | ConvertFrom-Json
  if ($buildInfoJson.commit -ne $localBuildInfo.commit) {
    throw "[verify] Live build-info commit ($($buildInfoJson.commit)) does not match local commit ($($localBuildInfo.commit))."
  }
}

Write-Host '[verify] Deployment verification passed.' -ForegroundColor Green
