#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Cleanse secrets from WorldExams git history
.DESCRIPTION
    Replaces exposed secrets (API keys, tokens, passwords) in git history
    with placeholder values. Uses git filter-repo.
.NOTES
    Requires: git-filter-repo (pip install git-filter-repo)
    WARNING: This rewrites git history. All collaborators must rebase.
#>

$ROOT = Split-Path -Parent $PSScriptRoot
Set-Location $ROOT

Write-Host "⚡ WorldExams - Git History Secret Cleanse" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""

# ── Step 1: Verify tools ──
Write-Host "📋 Step 1: Checking dependencies..." -ForegroundColor Yellow
$hasFilterRepo = $null -ne (Get-Command git-filter-repo -ErrorAction SilentlyContinue)
$hasBfg = $null -ne (Get-Command bfg -ErrorAction SilentlyContinue)

if (-not $hasFilterRepo -and -not $hasBfg) {
    Write-Host "  ⚠️  No git-filter-repo found. Installing..." -ForegroundColor Yellow
    pip install git-filter-repo 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✅ git-filter-repo installed" -ForegroundColor Green
        $hasFilterRepo = $true
    } else {
        Write-Host "  ❌ Could not install git-filter-repo" -ForegroundColor Red
        Write-Host "  Try: pip install git-filter-repo"
        exit 1
    }
}
Write-Host "  ✅ Dependencies ready" -ForegroundColor Green

# ── Step 2: Confirm with user ──
Write-Host ""
Write-Host "⚠️  WARNING: This will REWRITE git history!" -ForegroundColor Red
Write-Host "  All collaborators will need to rebase their branches."
Write-Host "  This is destructive and irreversible."
Write-Host ""
$confirm = Read-Host "  Type 'yes' to continue"
if ($confirm -ne "yes") {
    Write-Host "  ❌ Aborted." -ForegroundColor Red
    exit 1
}

# ── Step 3: Backup ──
Write-Host ""
Write-Host "📦 Step 3: Creating backup..." -ForegroundColor Yellow
$backupDir = Join-Path $ROOT "../worldexams-backup-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
Copy-Item -Recurse $ROOT $backupDir -Force
Write-Host "  ✅ Backup at: $backupDir" -ForegroundColor Green

# ── Step 4: Identify secrets to replace ──
Write-Host ""
Write-Host "🔍 Step 4: Identifying secrets in history..." -ForegroundColor Yellow

# Patterns to search for (grab from .env.example)
$patterns = @(
    "SUPABASE_URL",
    "SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    "TELEGRAM_BOT_TOKEN",
    "TELEGRAM_CHAT_ID",
    "TELEGRAM_MODERATION_SECRET",
    "GROQ_API_KEY",
    "OPENAI_API_KEY",
    "ANTHROPIC_API_KEY",
    "HF_TOKEN",
    "ELEVENLABS_API_KEY",
    "PUBLIC_SUPABASE_URL",
    "PUBLIC_SUPABASE_ANON_KEY",
    "PUBLIC_API_BASE_URL",
    "PUBLIC_SITE_URL",
    "SESSION_SECRET",
    "JWT_SECRET",
    "CLOUDFLARE_API_TOKEN",
    "CLOUDFLARE_ACCOUNT_ID"
)

# ── Step 5: Run git filter-repo ──
Write-Host ""
Write-Host "🧹 Step 5: Replacing secrets in git history..." -ForegroundColor Yellow

# Build the --replace-text patterns file
$replacements = @()
$envExample = Get-Content "$ROOT/saberparatodos/.env.example" -ErrorAction SilentlyContinue
if ($envExample) {
    foreach ($line in $envExample) {
        if ($line -match '^([A-Z_]+)=') {
            $key = $matches[1]
            $val = $line -split '=', 2 | Select-Object -Last 1
            if ($val -and $val.Length -gt 3 -and $val -notmatch '^(your|YOUR)') {
                $replacements += "$val==>YOUR_$key"
            }
        }
    }
}

# Also add direct secret patterns
$replacements += @(
    "key_teleg=>YOUR_TELEGRAM_BOT_TOKEN"
    "tokens/icfes=>YOUR_TOKEN"
)

if ($replacements.Count -gt 0) {
    $patternFile = [System.IO.Path]::GetTempFileName()
    $replacements | Out-File -FilePath $patternFile -Encoding utf8
    Write-Host "  Patterns file created at: $patternFile"

    Write-Host "  Running git filter-repo (may take a while)..." -ForegroundColor Gray
    git filter-repo --force --replace-text $patternFile 2>&1

    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✅ Git history cleaned!" -ForegroundColor Green
    } else {
        Write-Host "  ❌ git filter-repo failed" -ForegroundColor Red
    }

    Remove-Item $patternFile -Force
} else {
    Write-Host "  ℹ️  No replacement patterns found" -ForegroundColor Yellow
    Write-Host "  Check saberparatodos/.env.example for actual values"
}

# ── Step 6: Force push ──
Write-Host ""
Write-Host "🚀 Step 6: Force push to remote..." -ForegroundColor Yellow
$confirm2 = Read-Host "  Push to origin/main? (type 'yes')"
if ($confirm2 -eq "yes") {
    git remote add origin "git@github.com:iberi22/worldexams.git" 2>$null
    git push origin --force --all 2>&1
    Write-Host "  ✅ Force push complete" -ForegroundColor Green

    Write-Host ""
    Write-Host "⚠️  IMPORTANT: All collaborators must re-clone or rebase!" -ForegroundColor Yellow
    Write-Host "  git fetch origin"
    Write-Host "  git rebase origin/main"
} else {
    Write-Host "  ⏸️  Skipped push. Local history is cleaned but remote still has secrets." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "✅ Secret cleanse complete!" -ForegroundColor Cyan
