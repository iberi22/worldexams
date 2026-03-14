param(
  [switch]$SkipGeneration
)

$ErrorActionPreference = 'Stop'
$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

Write-Host '[copy-api] Preparing static API artifacts...' -ForegroundColor Cyan

if (-not $SkipGeneration) {
  node scripts/generate-static-packs.js
  if ($LASTEXITCODE -ne 0) {
    throw '[copy-api] generate-static-packs failed.'
  }
}

$apiDir = Join-Path $repoRoot 'public/api'
if (-not (Test-Path $apiDir)) {
  throw "[copy-api] Missing expected directory: $apiDir"
}

$jsonCount = (Get-ChildItem -Path $apiDir -Recurse -File -Filter *.json | Measure-Object).Count
Write-Host "[copy-api] Ready. JSON files in public/api: $jsonCount" -ForegroundColor Green
