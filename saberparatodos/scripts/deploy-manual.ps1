param(
  [string]$ProjectName,
  [string]$BaseUrl,
  [string]$RemoteName = 'iberi22',
  [switch]$SkipValidate,
  [switch]$SkipVerify,
  [switch]$SkipTag,
  [switch]$Fast,
  [switch]$Force
)

$ErrorActionPreference = 'Stop'
$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

# Detect branch
$currentBranch = (git rev-parse --abbrev-ref HEAD).Trim()
Write-Host "[deploy] Current branch: $currentBranch" -ForegroundColor Gray

# Intelligent defaults based on branch
if (-not $ProjectName) {
    if ($currentBranch -eq 'main') {
        $ProjectName = 'saberparatodos'
    } elseif ($currentBranch -eq 'develop') {
        $ProjectName = 'saberparatodos-dev'
    } else {
        $ProjectName = 'saberparatodos-preview'
    }
}

if (-not $BaseUrl) {
    if ($currentBranch -eq 'main') {
        $BaseUrl = 'https://saberparatodos.space'
    } elseif ($currentBranch -eq 'develop') {
        $BaseUrl = 'https://saberparatodos.pages.dev'
    } else {
        $BaseUrl = 'https://saberparatodos.pages.dev'
    }
}

# Production Safety Check
if ($ProjectName -eq 'saberparatodos' -and $currentBranch -ne 'main' -and -not $Force) {
    throw "[deploy] ABORT: Attempting to deploy to production project from branch '$currentBranch'. Use -Force if you are sure."
}

Write-Host "[deploy] Target Project: $ProjectName" -ForegroundColor Cyan
Write-Host "[deploy] Target URL:     $BaseUrl" -ForegroundColor Cyan

$isProductionDeploy = $ProjectName -eq 'saberparatodos' -and $currentBranch -eq 'main'

if ($isProductionDeploy) {
  $workingTreeDirty = [bool](git status --porcelain)
  if ($workingTreeDirty -and -not $Force) {
    throw '[deploy] ABORT: Production deploy requires a clean working tree so the deploy tag maps to an exact commit. Commit or stash changes, or use -Force if you intentionally want to bypass this guard.'
  }
}

if (-not $Fast) {
  Write-Host '[deploy] Copying API artifacts...' -ForegroundColor Gray
  pwsh -File scripts/copy-api.ps1

  if (-not $SkipValidate) {
    Write-Host '[deploy] Running validation...' -ForegroundColor Gray
    npm run validate:strict
    if ($LASTEXITCODE -ne 0) {
      throw '[deploy] validate:strict failed.'
    }
  }
}

Write-Host '[deploy] Building production bundle...' -ForegroundColor Gray
npm run build
if ($LASTEXITCODE -ne 0) {
  throw '[deploy] build failed.'
}

Write-Host "[deploy] Deploying to Cloudflare Pages (Project: $ProjectName)..." -ForegroundColor Gray
npx wrangler pages deploy dist --project-name=$ProjectName
if ($LASTEXITCODE -ne 0) {
  throw '[deploy] wrangler deploy failed.'
}

if (-not $SkipVerify) {
  Write-Host "[deploy] Verifying deployment at $BaseUrl..." -ForegroundColor Gray
  pwsh -File scripts/verify-deployment.ps1 -BaseUrl $BaseUrl
}

if ($isProductionDeploy -and -not $SkipTag) {
  Write-Host "[deploy] Creating deploy tag..." -ForegroundColor Gray
  pwsh -File scripts/create-deploy-tag.ps1 -ProjectName $ProjectName -RemoteName $RemoteName -Push
  if ($LASTEXITCODE -ne 0) {
    throw '[deploy] create-deploy-tag failed.'
  }
}

Write-Host "[deploy] Manual deployment to $currentBranch finished successfully." -ForegroundColor Green
