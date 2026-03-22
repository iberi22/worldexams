param(
  [string]$Workdir = 'saberparatodos'
)

$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$productDir = Join-Path $repoRoot $Workdir
$productFunctionsDir = Join-Path $productDir 'supabase/functions'
$rootFunctionsDir = Join-Path $repoRoot 'supabase/functions'

if (-not (Test-Path $productFunctionsDir)) {
  throw "[audit-supabase-functions] Missing product functions directory: $productFunctionsDir"
}

if (-not (Test-Path $rootFunctionsDir)) {
  throw "[audit-supabase-functions] Missing root functions directory: $rootFunctionsDir"
}

Write-Host "[audit-supabase-functions] Repo root: $repoRoot" -ForegroundColor Cyan
Write-Host "[audit-supabase-functions] Product dir: $productDir" -ForegroundColor Cyan

$projectRefPath = Join-Path $productDir 'supabase/.temp/project-ref'
$projectRef = if (Test-Path $projectRefPath) { (Get-Content $projectRefPath -Raw).Trim() } else { '' }

$remoteJson = supabase functions list --workdir $productDir --output json 2>&1 | Out-String
if ($LASTEXITCODE -ne 0) {
  throw '[audit-supabase-functions] supabase functions list failed.'
}

$remoteFunctions = @()
$jsonStart = $remoteJson.IndexOf('[')

if ($jsonStart -ge 0) {
  $jsonPayload = $remoteJson.Substring($jsonStart).Trim()
  $jsonEnd = $jsonPayload.LastIndexOf(']')
  if ($jsonEnd -ge 0) {
    $jsonPayload = $jsonPayload.Substring(0, $jsonEnd + 1)
    $remoteFunctions = @(
      ($jsonPayload | ConvertFrom-Json | ForEach-Object { $_.slug }) |
        Where-Object { $_ } |
        Sort-Object -Unique
    )
  }
}

if ($remoteFunctions.Count -eq 0) {
  $ansiFree = [regex]::Replace($remoteJson, "`e\[[\d;]*[A-Za-z]", '')
  $remoteFunctions = @(
    $ansiFree -split "`r?`n" |
      Where-Object { $_ -match '│' -and $_ -match 'ACTIVE' } |
      ForEach-Object {
        $parts = $_ -split '│'
        if ($parts.Count -ge 4) {
          $parts[2].Trim()
        }
      } |
      Where-Object { $_ } |
      Sort-Object -Unique
  )
}

if ($remoteFunctions.Count -eq 0) {
  throw '[audit-supabase-functions] Could not parse remote function names from Supabase CLI output.'
}

$productFunctions = @(
  Get-ChildItem $productFunctionsDir -Directory |
    ForEach-Object { $_.Name } |
    Where-Object { $_ -ne '_shared' } |
    Sort-Object -Unique
)

$rootFunctions = @(
  Get-ChildItem $rootFunctionsDir -Directory |
    ForEach-Object { $_.Name } |
    Sort-Object -Unique
)

$remoteOnly = @($remoteFunctions | Where-Object { $_ -notin $productFunctions -and $_ -notin $rootFunctions })
$productOnly = @($productFunctions | Where-Object { $_ -notin $remoteFunctions })
$rootOnly = @($rootFunctions | Where-Object { $_ -notin $remoteFunctions })
$remoteAndProduct = @($productFunctions | Where-Object { $_ -in $remoteFunctions })
$remoteAndRoot = @($rootFunctions | Where-Object { $_ -in $remoteFunctions })
$duplicateLocalOwnership = @($productFunctions | Where-Object { $_ -in $rootFunctions })

$summary = [PSCustomObject]@{
  project_ref = $projectRef
  remote_count = $remoteFunctions.Count
  product_count = $productFunctions.Count
  root_count = $rootFunctions.Count
  remote_only = $remoteOnly
  product_only = $productOnly
  root_only = $rootOnly
  remote_and_product = $remoteAndProduct
  remote_and_root = $remoteAndRoot
  duplicate_local_ownership = $duplicateLocalOwnership
}

$summary | ConvertTo-Json -Depth 5

if ($remoteOnly.Count -gt 0 -or $productOnly.Count -gt 0 -or $duplicateLocalOwnership.Count -gt 0) {
  Write-Warning '[audit-supabase-functions] Drift detected between remote and local function trees.'
}
