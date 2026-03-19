param(
  [string]$ProjectName = 'saberparatodos',
  [string]$RemoteName = 'iberi22',
  [string]$Version,
  [string]$Commit,
  [switch]$Push
)

$ErrorActionPreference = 'Stop'
$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

$currentBranch = (git rev-parse --abbrev-ref HEAD).Trim()
if (-not $Commit) {
  $Commit = (git rev-parse --short HEAD).Trim()
}

if (-not $Version) {
  $packageJsonPath = Join-Path $repoRoot 'package.json'
  $packageJson = Get-Content -Raw -Path $packageJsonPath | ConvertFrom-Json
  $Version = [string]$packageJson.version
}

$timestamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$tagName = "$ProjectName-v$Version-deploy-$timestamp-$Commit"
$tagMessage = @"
Deploy tag for $ProjectName

project: $ProjectName
version: $Version
branch: $currentBranch
commit: $Commit
timestamp: $(Get-Date -Format o)
"@

$existingTag = git tag --list $tagName
if ($existingTag) {
  Write-Host "[tag] Tag already exists: $tagName" -ForegroundColor Yellow
} else {
  git tag -a $tagName -m $tagMessage
  if ($LASTEXITCODE -ne 0) {
    throw "[tag] Failed to create tag $tagName"
  }
  Write-Host "[tag] Created tag: $tagName" -ForegroundColor Green
}

if ($Push) {
  git push $RemoteName $tagName
  if ($LASTEXITCODE -ne 0) {
    throw "[tag] Failed to push tag $tagName to remote $RemoteName"
  }
  Write-Host "[tag] Pushed tag to $RemoteName" -ForegroundColor Green
}
