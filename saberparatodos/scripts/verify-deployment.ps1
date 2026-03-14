param(
  [string]$BaseUrl = 'https://saberparatodos.space'
)

$ErrorActionPreference = 'Stop'

$targets = @(
  '/',
  '/novedades',
  '/novedades/2026-03-09-filtrado-ingles-y-comentarios',
  '/ranking',
  '/dashboard',
  '/api/packs/week-9-grade-11-subject-matematicas.json'
)

Write-Host "[verify] Base URL: $BaseUrl" -ForegroundColor Cyan

$results = @()
foreach ($path in $targets) {
  $url = "$BaseUrl$path"
  try {
    $res = Invoke-WebRequest -Uri $url -Method GET -TimeoutSec 30
    $ok = $res.StatusCode -ge 200 -and $res.StatusCode -lt 400
    $results += [PSCustomObject]@{
      Url = $url
      StatusCode = $res.StatusCode
      Ok = $ok
    }
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
