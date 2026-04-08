param(
  [ValidateSet('production', 'preview')]
  [string]$Target,
  [string]$ProjectName,
  [string]$BaseUrl,
  [string]$WorkersDevSubdomain = $env:CLOUDFLARE_WORKERS_SUBDOMAIN,
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

function Get-PowerShellHost {
  $pwsh = Get-Command pwsh -ErrorAction SilentlyContinue
  if ($pwsh) {
    return $pwsh.Source
  }

  $powershell = Get-Command powershell.exe -ErrorAction SilentlyContinue
  if ($powershell) {
    return $powershell.Source
  }

  throw '[deploy] ABORT: No PowerShell host found. Install pwsh or ensure powershell.exe is available.'
}

function Invoke-RepoScript {
  param(
    [string[]]$Arguments
  )

  $shellHost = Get-PowerShellHost
  & $shellHost -NoProfile -ExecutionPolicy Bypass @Arguments
  if ($LASTEXITCODE -ne 0) {
    throw "[deploy] Script failed: $($Arguments -join ' ')"
  }
}

function Resolve-PreviewBaseUrl {
  param(
    [string]$Name,
    [string]$WorkersSubdomain
  )

  if ($WorkersSubdomain) {
    return "https://$Name.$WorkersSubdomain.workers.dev"
  }

  throw "[deploy] ABORT: Preview deploy requires -BaseUrl or CLOUDFLARE_WORKERS_SUBDOMAIN so verification and PUBLIC_SITE_URL do not fall back to production."
}

$currentBranch = (git rev-parse --abbrev-ref HEAD).Trim()
Write-Host "[deploy] Current branch: $currentBranch" -ForegroundColor Gray

if (-not $Target) {
  if ($currentBranch -eq 'main') {
    $Target = 'production'
  } else {
    $Target = 'preview'
  }
}

if (-not $ProjectName) {
  if ($Target -eq 'production') {
    $ProjectName = 'saberparatodos'
  } elseif ($currentBranch -eq 'develop') {
    $ProjectName = 'saberparatodos-develop'
  } else {
    $ProjectName = 'saberparatodos-preview'
  }
}

if (-not $BaseUrl) {
  if ($Target -eq 'production') {
    $BaseUrl = 'https://saberparatodos.space'
  } else {
    $BaseUrl = Resolve-PreviewBaseUrl -Name $ProjectName -WorkersSubdomain $WorkersDevSubdomain
  }
}

Write-Host "[deploy] Target Mode:    $Target" -ForegroundColor Cyan
Write-Host "[deploy] Target Project: $ProjectName" -ForegroundColor Cyan
Write-Host "[deploy] Target URL:     $BaseUrl" -ForegroundColor Cyan

$isProductionDeploy = $Target -eq 'production'
$isPreviewDeploy = $Target -eq 'preview'

if ($isProductionDeploy -and $currentBranch -ne 'main' -and -not $Force) {
  throw "[deploy] ABORT: Production deploy requires branch 'main'. Current branch: '$currentBranch'."
}

if ($isPreviewDeploy -and $BaseUrl -match 'saberparatodos\.space' -and -not $Force) {
  throw '[deploy] ABORT: Preview deploy cannot target saberparatodos.space. Use a workers.dev URL or pass -Force intentionally.'
}

if ($isProductionDeploy) {
  $workingTreeDirty = [bool](git status --porcelain)
  if ($workingTreeDirty -and -not $Force) {
    throw '[deploy] ABORT: Production deploy requires a clean working tree so the deploy tag maps to an exact commit.'
  }
}

if (-not $Fast) {
  Write-Host '[deploy] Copying API artifacts...' -ForegroundColor Gray
  Invoke-RepoScript -Arguments @('-File', 'scripts/copy-api.ps1')

  if (-not $SkipValidate) {
    Write-Host '[deploy] Running validation...' -ForegroundColor Gray
    npm run validate:strict
    if ($LASTEXITCODE -ne 0) {
      throw '[deploy] validate:strict failed.'
    }
  }
}

Write-Host '[deploy] Building bundle...' -ForegroundColor Gray
npm run build
if ($LASTEXITCODE -ne 0) {
  throw '[deploy] build failed.'
}

Write-Host '[deploy] Normalizing Wrangler config...' -ForegroundColor Gray
node scripts/normalize-wrangler-config.mjs --target $Target --public-site-url $BaseUrl --name $ProjectName
if ($LASTEXITCODE -ne 0) {
  throw '[deploy] normalize-wrangler-config failed.'
}

Write-Host "[deploy] Deploying Cloudflare Worker (Name: $ProjectName)..." -ForegroundColor Gray
npx wrangler deploy --config dist/server/wrangler.json --name=$ProjectName
if ($LASTEXITCODE -ne 0) {
  throw '[deploy] wrangler deploy failed.'
}

if (-not $SkipVerify) {
  Write-Host "[deploy] Verifying deployment at $BaseUrl..." -ForegroundColor Gray
  Invoke-RepoScript -Arguments @('-File', 'scripts/verify-deployment.ps1', '-BaseUrl', $BaseUrl, '-Mode', $Target)
}

if ($isProductionDeploy -and -not $SkipTag) {
  Write-Host "[deploy] Creating deploy tag..." -ForegroundColor Gray
  Invoke-RepoScript -Arguments @('-File', 'scripts/create-deploy-tag.ps1', '-ProjectName', $ProjectName, '-RemoteName', $RemoteName, '-Push')
}

Write-Host "[deploy] Manual deployment to $Target finished successfully." -ForegroundColor Green
