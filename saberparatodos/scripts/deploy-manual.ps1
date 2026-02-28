param(
  [string]$ProjectName = 'saberparatodos',
  [string]$BaseUrl = 'https://saberparatodos.space',
  [switch]$SkipValidate,
  [switch]$SkipVerify,
  [switch]$Fast
)

$ErrorActionPreference = 'Stop'
$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

Write-Host '[deploy] Starting manual deploy...' -ForegroundColor Cyan

if (-not $Fast) {
  pwsh -File scripts/copy-api.ps1

  if (-not $SkipValidate) {
    npm run validate:strict
    if ($LASTEXITCODE -ne 0) {
      throw '[deploy] validate:strict failed.'
    }
  }
}

npm run build
if ($LASTEXITCODE -ne 0) {
  throw '[deploy] build failed.'
}

npx wrangler pages deploy dist --project-name=$ProjectName
if ($LASTEXITCODE -ne 0) {
  throw '[deploy] wrangler deploy failed.'
}

if (-not $SkipVerify) {
  pwsh -File scripts/verify-deployment.ps1 -BaseUrl $BaseUrl
}

Write-Host '[deploy] Manual deployment finished.' -ForegroundColor Green
