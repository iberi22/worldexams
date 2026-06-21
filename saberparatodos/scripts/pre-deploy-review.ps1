# pre-deploy-review.ps1
# Pre-Deploy Review + Auto-Deploy for SaberParaTodos
#
# Pipeline:
#   1. Detect changes & generate changelog
#   2. Bump version (package.json + build-info.json)
#   3. Run pre-deploy-check.js
#   4. pnpm run build
#   5. pnpm run validate:strict
#   6. OpenCode (DeepSeek v4 Pro) reviews the diff
#   7. If APPROVED -> deploy-manual.ps1 (production)
#   8. If REJECTED -> abort with detailed report
#
param(
    [string]$BumpStrategy = "patch",
    [switch]$DryRun,
    [switch]$SkipBuild,
    [switch]$SkipValidate,
    [switch]$SkipOpenCode
)

# Don't use 'Stop' for native commands - git/pnpm/node output warnings to stderr
$ErrorActionPreference = 'Continue'
$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

# Paths
$LOG_FILE   = "$repoRoot\.worldexams\pre-deploy-review.log"
$CHANGELOG  = "$repoRoot\.worldexams\CHANGELOG_PENDING.md"
$REPORT     = "$repoRoot\.worldexams\pre-deploy-report.md"
$OPCODE_OUT = "$repoRoot\.worldexams\opencode-veredict.txt"

# Logger
$script:Log = @()
function Log($msg, $level = "INFO") {
    $ts = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $line = "[$ts][$level] $msg"
    Write-Host $line
    $script:Log += $line
}
function Save-Log {
    [System.IO.File]::WriteAllText($LOG_FILE, ($script:Log -join "`n") + "`n", [System.Text.UTF8Encoding]::new($false))
}
function Write-Report($status, $body) {
    $hdr = "# Pre-Deploy Report`n**Date:** $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")`n**Status:** $status`n**Version:** $(if ($script:newVersion) { $script:newVersion } else { "N/A" })`n`n---`n"
    [System.IO.File]::WriteAllText($REPORT, $hdr + $body, [System.Text.UTF8Encoding]::new($false))
}

# === STEP 0: Environment check ===
Log "=== PRE-DEPLOY REVIEW: SaberParaTodos ===" "HEADER"
Log "Bump: $BumpStrategy | DryRun: $DryRun | SkipBuild: $SkipBuild | SkipValidate: $SkipValidate | SkipOpenCode: $SkipOpenCode" "HEADER"
Log "=== " "HEADER"

# Check opencode
$opencodePath = (Get-Command "opencode" -ErrorAction SilentlyContinue).Source
if (-not $opencodePath) {
    Log "OpenCode CLI not found. Install: pnpm add -g opencode-ai" "ERROR"
    exit 10
}
Log "OpenCode: $opencodePath" "INFO"

# === STEP 1: Detect changes & changelog ===
Log "-- Step 1: Detect changes --" "STEP"

$currentVersion = (Get-Content "$repoRoot\package.json" | ConvertFrom-Json).version
Log "Current version: $currentVersion" "INFO"

$lastTag = git describe --tags --abbrev=0 2>$null
if (-not $lastTag) {
    Log "No tags found. Using last 50 commits." "WARN"
    $commits = git log --oneline -50
    $commitCount = 50
    $diff = $null
} else {
    Log "Last tag: $lastTag" "INFO"
    $commits = git log "$lastTag..HEAD" --oneline
    $commitCount = ($commits -split "`n" | Where-Object { $_ }).Count
    if ($commitCount -eq 0) {
        Log "No changes since $lastTag." "ERROR"
        exit 20
    }
    $diff = git diff "$lastTag..HEAD" 2>$null
}

Log "Commits: $commitCount" "INFO"

# Write changelog
$clBody = "# Changelog (since $lastTag)`n`n**$commitCount** commits`n`n"
$clBody += ($commits -split "`n" | Where-Object { $_ } | ForEach-Object { "- $_" }) -join "`n"
$clBody += "`n`n### Files changed`n"
$clBody += git diff --stat "$lastTag..HEAD" 2>$null
[System.IO.File]::WriteAllText($CHANGELOG, $clBody, [System.Text.UTF8Encoding]::new($false))
Log "Changelog saved" "INFO"

# === STEP 2: Version bump + metadata ===
Log "-- Step 2: Version bump ($BumpStrategy) --" "STEP"

if ($BumpStrategy -eq "skip") {
    $script:newVersion = $currentVersion
    Log "Keeping version: $currentVersion" "WARN"
} else {
    $v = $currentVersion -split '\.'
    $major = [int]$v[0]; $minor = [int]$v[1]; $patch = [int]$v[2]
    switch ($BumpStrategy) {
        "major" { $major++; $minor = 0; $patch = 0 }
        "minor" { $minor++; $patch = 0; break }
        "patch" { $patch++; break }
    }
    $script:newVersion = "$major.$minor.$patch"
    Log "Bumping: $currentVersion -> $script:newVersion" "INFO"

    # package.json
    $pkg = Get-Content "$repoRoot\package.json" | ConvertFrom-Json
    $pkg.version = $script:newVersion
    $jsonStr = $pkg | ConvertTo-Json -Depth 10
    [System.IO.File]::WriteAllText("$repoRoot\package.json", $jsonStr, [System.Text.UTF8Encoding]::new($false))

    # build-info.json (visible in frontend footer/debug)
    $ts = [DateTimeOffset]::Now.ToUnixTimeMilliseconds()
    $bi = @{
        version   = $script:newVersion
        timestamp = $ts
        buildTime = $ts
        iso       = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss.fffZ")
        commit    = git rev-parse HEAD
        previous  = $currentVersion
    }
    $biStr = $bi | ConvertTo-Json -Depth 10
    [System.IO.File]::WriteAllText("$repoRoot\public\build-info.json", $biStr, [System.Text.UTF8Encoding]::new($false))
    Log "build-info.json updated" "INFO"

    # Full pnpm install to ensure pnpm-lock.yaml is 100% in sync
    Log "Running pnpm install to sync lockfile..." "INFO"
    $pnpmLockOut = pnpm install --frozen-lockfile --silent 2>&1
    Log "pnpm install exit: $LASTEXITCODE" "INFO"
    if ($LASTEXITCODE -ne 0) { throw "pnpm install failed" }

    # Commit version bump
    try {
        git add "package.json" -ErrorAction SilentlyContinue 2>$null
        git add "pnpm-lock.yaml" -ErrorAction SilentlyContinue 2>$null
        git add -f "public\build-info.json" -ErrorAction SilentlyContinue 2>$null
        $commitMsg = "chore(release): bump to v$script:newVersion [skip ci]"
        $commitResult = git commit -m $commitMsg 2>&1
        Log "Version commit: $commitResult" "INFO"
    } catch {
        Log "Version commit skipped (git warning): $_" "WARN"
    }
}

# === STEP 3: Pre-deploy checks ===
Log "-- Step 3: pre-deploy-check.js --" "STEP"
$checkOut = node "$repoRoot\scripts\pre-deploy-check.js" 2>&1
Log "Output: $checkOut" "INFO"
if ($LASTEXITCODE -ne 0) {
    Log "FAILED (exit $LASTEXITCODE)" "ERROR"
    Write-Report "PRE-CHECK FAILED" "pre-deploy-check.js failed.`n`n$checkOut"
    Save-Log
    exit 30
}
Log "PASSED" "INFO"

# === STEP 4: Build ===
if (-not $SkipBuild) {
    Log "-- Step 4: Build --" "STEP"
    $buildOut = pnpm run build 2>&1
    if ($LASTEXITCODE -ne 0) {
        Log "BUILD FAILED (exit $LASTEXITCODE)" "ERROR"
        $tail = $buildOut -split "`n" | Select-Object -Last 30
        Write-Report "BUILD FAILED" "pnpm run build failed.`n`nLast 30 lines:`n$($tail -join "`n")"
        Save-Log
        exit 40
    }
    Log "Build SUCCESS" "INFO"
} else {
    Log "Skipping build" "WARN"
}

# === STEP 5: Validate strict ===
if (-not $SkipValidate) {
    Log "-- Step 5: validate:strict --" "STEP"
    $valOut = pnpm run validate:strict 2>&1
    if ($LASTEXITCODE -ne 0) {
        Log "VALIDATION FAILED" "ERROR"
        Write-Report "VALIDATION FAILED" "pnpm run validate:strict found issues.`n`n$valOut"
        Save-Log
        exit 50
    }
    Log "PASSED" "INFO"
} else {
    Log "Skipping validate" "WARN"
}

# === STEP 6: OpenCode review ===
if ($SkipOpenCode) {
    Log "Skipping OpenCode review" "WARN"
    Log "Manual review required. Run deploy-manual.ps1 manually." "INFO"
    Save-Log
    exit 0
}

Log "-- Step 6: OpenCode review (DeepSeek v4 Pro) --" "STEP"

# Capture DeepSeek API key before launching
$dsKey = [System.Environment]::GetEnvironmentVariable("DEEPSEEK_API_KEY", "User")
if (-not $dsKey) { $dsKey = [System.Environment]::GetEnvironmentVariable("DEEPSEEK_API_KEY", "Process") }
if (-not $dsKey) { $dsKey = [System.Environment]::GetEnvironmentVariable("DEEPSEEK_API_KEY", "Machine") }

Log "DEEPSEEK_API_KEY: $(if ($dsKey) { "found (" + $dsKey.Substring(0, [Math]::Min(8, $dsKey.Length)) + "...)" } else { "NOT SET" })" "INFO"

# Kill stale opencode processes
Get-Process "opencode" -ErrorAction SilentlyContinue | Stop-Process -Force 2>$null
Start-Sleep -Seconds 1

# Build the opencode command as a single .bat file (reliable execution)
$ocMessage = "Review SaberParaTodos v$script:newVersion for pre-deploy. "
$ocMessage += "Check package.json, pnpm-lock.yaml, build-info.json, wrangler.toml, src/ changes since last tag. "
$ocMessage += "Verify: (1) version bump is correct, (2) no breaking API changes, (3) no hardcoded secrets, "
$ocMessage += "(4) tsconfig/build config is valid, (5) no obvious runtime errors. "
$ocMessage += "Read key files and git diff. DO NOT read .env files. "
$ocMessage += "Respond with EXACTLY one line: APPROVED: <reason> or REJECTED: <issue>"

$ocOutputPath = $OPCODE_OUT  # resolve early

$batContent = @"
@echo OFF
set DEEPSEEK_API_KEY=$dsKey
cd /d "$repoRoot"
echo === OPENCODE REVIEW START ===
opencode run "$ocMessage" -m deepseek/deepseek-v4-pro --dir "$repoRoot" --title "Pre-Deploy Review v$script:newVersion" --timeoutMs 300000 > "$ocOutputPath" 2>&1
echo === OPENCODE REVIEW END === >> "$ocOutputPath"
"@

$batPath = "$repoRoot\.worldexams\run-opencode.bat"
[System.IO.File]::WriteAllText($batPath, $batContent, [System.Text.UTF8Encoding]::new($false))

Log "Launching opencode reviewer (bat)..." "INFO"
Log "Output -> $ocOutputPath" "INFO"

$p = Start-Process -FilePath "cmd.exe" -ArgumentList "/c `"$batPath`"" -Wait -NoNewWindow -PassThru -ErrorAction Stop

Log "OpenCode exit code: $($p.ExitCode)" "INFO"

Remove-Item $batPath -Force -ErrorAction SilentlyContinue

# Read OpenCode output
$ocOutput = ""
if (Test-Path $OPCODE_OUT) {
    $ocOutput = [System.IO.File]::ReadAllText($OPCODE_OUT)
    Log "OpenCode output: $($ocOutput.Length) chars" "INFO"
} else {
    Log "No output file: $OPCODE_OUT" "WARN"
}

# Parse verdict — look for APPROVED: or REJECTED:
$verdict = "UNKNOWN"
$verdictLines = @()
if ($ocOutput -match '(?i)APPROVED\s*:') {
    $verdict = "APPROVED"
    $verdictLines = $ocOutput -split "`n" | Where-Object { $_ -match '(?i)APPROVED\s*:' }
    $verdictLine = $verdictLines | Select-Object -First 1
    Log "Verdict line: $verdictLine" "INFO"
} elseif ($ocOutput -match '(?i)\bREJECTED\b') {
    $verdict = "REJECTED"
    $verdictLines = $ocOutput -split "`n" | Where-Object { $_ -match '(?i)REJECTED' }
    $verdictLine = $verdictLines | Select-Object -First 1
    Log "Verdict line: $verdictLine" "INFO"
}

Log "Verdict: $verdict" "INFO"
Write-Report $verdict "OpenCode verdict: $verdict`n`n$ocOutput"

if ($verdict -ne "APPROVED") {
    Log "=== REJECTED ===" "ERROR"
    if ($verdict -eq "UNKNOWN") {
        Log "OpenCode response format unrecognized. Manual review required." "ERROR"
    }
    Save-Log
    exit 70
}

Log "=== APPROVED ===" "SUCCESS"

# === STEP 7: Deploy ===
if ($DryRun) {
    Log "DryRun: deploy skipped. All checks passed." "INFO"
    Save-Log
    exit 0
}

Log "-- Step 7: Deploy to Production --" "STEP"
$deployOut = powershell -NoProfile -ExecutionPolicy Bypass -File "$repoRoot\scripts\deploy-manual.ps1" -Target production 2>&1
if ($LASTEXITCODE -ne 0) {
    Log "DEPLOY FAILED (exit $LASTEXITCODE)" "ERROR"
    $tail = $deployOut -split "`n" | Select-Object -Last 50
    Write-Report "DEPLOY FAILED" "deploy-manual.ps1 failed.`n`nLast 50 lines:`n$($tail -join "`n")"
    Save-Log
    exit 80
}

Log "=== DEPLOY COMPLETE: v$script:newVersion LIVE ===" "SUCCESS"

# Create deploy tag
$tagName = "saberparatodos-v$script:newVersion-deploy-$(Get-Date -Format 'yyyyMMdd-HHmmss')-$(git rev-parse --short HEAD)"
git tag $tagName
git push origin --tags 2>$null
Log "Tag created: $tagName" "INFO"

Write-Report "DEPLOYED" "v$script:newVersion deployed to production."
Save-Log
exit 0
