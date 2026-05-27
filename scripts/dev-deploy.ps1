#Requires -Version 7.2
<#
.SYNOPSIS
  Dev deploy script for BELA (Belal) to test WorldExams changes locally.

.DESCRIPTION
  - Verifies the working tree is clean (no uncommitted changes).
  - Builds saberparatodos (Astro + Cloudflare Worker).
  - Starts a local preview server, OR deploys to a Cloudflare preview Worker.
  - Uses development env variables (never production routes or secrets).
  - Opens the browser automatically when possible.

.PARAMETER Target
  'local'  => `astro preview` after build (default).
  'preview'=> Deploy to Cloudflare Workers preview env.

.PARAMETER Force
  Skip the clean-working-tree check.

.PARAMETER Port
  Port for local preview (default 4321).

.EXAMPLE
  .\scripts\dev-deploy.ps1
  .\scripts\dev-deploy.ps1 -Target preview
  .\scripts\dev-deploy.ps1 -Target local -Port 3000
#>

param(
  [ValidateSet('local','preview')]
  [string]$Target = 'local',
  [switch]$Force,
  [int]$Port = 4321
)

$ErrorActionPreference = 'Stop'
$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

$devTag = "dev-$(git rev-parse --short HEAD)"
$branch = (git rev-parse --abbrev-ref HEAD).Trim()

# ---------------------------------------------------------------------------
# 1. Verify clean working tree
# ---------------------------------------------------------------------------
Write-Host "[dev-deploy] Branch: $branch | Tag: $devTag" -ForegroundColor Cyan

$dirty = [bool](git status --porcelain)
if ($dirty -and -not $Force) {
  Write-Host '[dev-deploy] ERROR: Uncommitted changes detected.' -ForegroundColor Red
  Write-Host '             Commit or stash before deploying, or use -Force.' -ForegroundColor Yellow
  git status --short
  exit 1
}
if ($dirty -and $Force) {
  Write-Host '[dev-deploy] WARNING: Working tree is dirty, but -Force is set.' -ForegroundColor Yellow
}

# ---------------------------------------------------------------------------
# 2. Build saberparatodos
# ---------------------------------------------------------------------------
Write-Host '[dev-deploy] Building saberparatodos...' -ForegroundColor Cyan
npm run build:saberparatodos
if ($LASTEXITCODE -ne 0) { throw '[dev-deploy] Build failed.' }
Write-Host '[dev-deploy] Build OK.' -ForegroundColor Green

# ---------------------------------------------------------------------------
# 3. Choose env vars
# ---------------------------------------------------------------------------
$envFile = Join-Path $repoRoot 'saberparatodos' '.env.development'

if ($Target -eq 'local') {
  # -------------------------------------------------------------------------
  # LOCAL PREVIEW (astro preview)
  # -------------------------------------------------------------------------
  Write-Host "[dev-deploy] Starting LOCAL preview on port $Port..." -ForegroundColor Cyan

  # Astro picks up .env.development automatically in dev mode,
  # but `preview` uses .env.production by default. We force dev env inline.
  $env:PUBLIC_SITE_URL = "http://localhost:$Port"
  $env:PUBLIC_API_BASE_URL = "http://localhost:$Port/api"

  if (Test-Path $envFile) {
    Get-Content $envFile | ForEach-Object {
      if ($_ -match '^([A-Z_]+)=(.*)$') {
        $varName = $matches[1]
        $varValue = $matches[2]
        if (-not [Environment]::GetEnvironmentVariable($varName)) {
          [Environment]::SetEnvironmentVariable($varName, $varValue)
        }
      }
    }
    Write-Host '[dev-deploy] Loaded .env.development overrides.' -ForegroundColor Gray
  }

  Set-Location (Join-Path $repoRoot 'saberparatodos')
  npm run preview -- --port $Port
}
else {
  # -------------------------------------------------------------------------
  # CLOUDFLARE PREVIEW DEPLOY
  # -------------------------------------------------------------------------
  Write-Host '[dev-deploy] Deploying to Cloudflare PREVIEW worker...' -ForegroundColor Cyan

  $projectName = "saberparatodos-dev-$($branch -replace '[^a-zA-Z0-9]','-')"
  $workersDevSubdomain = $env:CLOUDFLARE_WORKERS_SUBDOMAIN
  if (-not $workersDevSubdomain) {
    $workersDevSubdomain = Read-Host '[dev-deploy] Enter your Cloudflare Workers subdomain (e.g. your-account)'
  }
  $previewUrl = "https://$projectName.$workersDevSubdomain.workers.dev"

  Write-Host "[dev-deploy] Preview URL: $previewUrl" -ForegroundColor Cyan

  Set-Location (Join-Path $repoRoot 'saberparatodos')

  # Normalize wrangler for preview
  node scripts/normalize-wrangler-config.mjs --target preview --public-site-url $previewUrl --name $projectName
  if ($LASTEXITCODE -ne 0) { throw '[dev-deploy] Wrangler config normalization failed.' }

  # Inject preview env vars inline so production secrets are never used
  $env:PUBLIC_SITE_URL = $previewUrl
  $env:PUBLIC_API_BASE_URL = "$previewUrl/api"

  npx wrangler deploy --config dist/server/wrangler.json --name=$projectName --env preview
  if ($LASTEXITCODE -ne 0) { throw '[dev-deploy] Wrangler deploy failed.' }

  Write-Host "[dev-deploy] Preview deployed!" -ForegroundColor Green
  Write-Host "             URL: $previewUrl" -ForegroundColor Green

  # Try to open browser
  try { Start-Process $previewUrl } catch { Write-Host '[dev-deploy] (Browser open failed — open manually)' -ForegroundColor Yellow }
}
