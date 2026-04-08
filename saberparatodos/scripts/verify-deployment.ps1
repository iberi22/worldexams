param(
  [string]$BaseUrl = 'https://saberparatodos.space',
  [ValidateSet('production', 'preview')]
  [string]$Mode = 'production'
)

$ErrorActionPreference = 'Stop'

function Test-Endpoint {
  param(
    [string]$Url
  )

  $curl = Get-Command curl.exe -ErrorAction SilentlyContinue
  if ($curl) {
    $statusCode = & $curl.Source -sS -o NUL -L -w '%{http_code}' $Url
    $statusInt = 0
    [void][int]::TryParse(($statusCode | Out-String).Trim(), [ref]$statusInt)
    return [PSCustomObject]@{
      Url = $Url
      StatusCode = $statusInt
      Ok = $statusInt -ge 200 -and $statusInt -lt 400
    }
  }

  $res = Invoke-WebRequest -Uri $Url -Method GET -TimeoutSec 30 -UseBasicParsing
  return [PSCustomObject]@{
    Url = $Url
    StatusCode = $res.StatusCode
    Ok = $res.StatusCode -ge 200 -and $res.StatusCode -lt 400
  }
}

if ($Mode -eq 'preview') {
  $targets = @(
    '/',
    '/guia-examen',
    '/sobre-nosotros',
    '/contacto'
  )
} else {
  $targets = @(
    '/',
    '/novedades',
    '/novedades/2026-03-09-filtrado-ingles-y-comentarios',
    '/ranking',
    '/dashboard',
    '/api/packs/week-9-grade-11-subject-matematicas.json'
  )
}

Write-Host "[verify] Base URL: $BaseUrl" -ForegroundColor Cyan
Write-Host "[verify] Mode:     $Mode" -ForegroundColor Cyan

$results = @()
foreach ($path in $targets) {
  $url = "$BaseUrl$path"
  try {
    $results += Test-Endpoint -Url $url
  }
  catch {
    $results += [PSCustomObject]@{
      Url = $url
      StatusCode = 0
      Ok = $false
    }
  }
}

$results | Format-Table -AutoSize

$failed = $results | Where-Object { -not $_.Ok }
if ($failed.Count -gt 0) {
  throw "[verify] Deployment verification failed for $($failed.Count) endpoint(s)."
}

Write-Host '[verify] Deployment verification passed.' -ForegroundColor Green
