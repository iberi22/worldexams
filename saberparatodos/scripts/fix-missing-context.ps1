# fix-missing-context.ps1
# Fixes Questions 6 and 10 in UNI-ENG bundles by copying context from Q5 and Q9

param(
    [string]$Path = "src\content\questions\ingles",
    [switch]$DryRun = $false
)

$countFixed = 0
$files = Get-ChildItem -Recurse "$Path\grado-*\UNI-ENG-*.md"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $modified = $false

    # --- Fix Q6 ---
    # Pattern: Q5 has context, Q6 does not
    $q5ContextPattern = '(?s)(## Question 5.*?### Contexto\s*\n\*\*Text:\*\*\s*\n([^\n]+\(5\)[^\n]+\(6\)[^\n]+).*?---\s*\n\s*)(## Question 6.*?\nID:[^\n]+\n\n)(### Enunciado\s*\nChoose the correct)'

    if ($content -match $q5ContextPattern) {
        $contextText = $matches[2].Trim()
        $q6Header = $matches[3]

        $replacement = "${q6Header}### Contexto`n**Text (same as above):**`n$contextText`n`n$($matches[4])"

        # Only fix if Q6 doesn't already have context
        if (-not ($content -match "## Question 6.*?### Contexto.*?### Enunciado")) {
            $content = $content -replace [regex]::Escape("${q6Header}$($matches[4])"), $replacement
            $modified = $true
            Write-Host "  Fixed Q6 in: $($file.Name)" -ForegroundColor Yellow
        }
    }

    # --- Fix Q10 ---
    $q9ContextPattern = '(?s)(## Question 9.*?### Contexto\s*\n\*\*Text:\*\*\s*\n([^\n]+\(9\)[^\n]+\(10\)[^\n]+).*?---\s*\n\s*)(## Question 10.*?\nID:[^\n]+\n\n)(### Enunciado\s*\nChoose the correct)'

    if ($content -match $q9ContextPattern) {
        $contextText = $matches[2].Trim()
        $q10Header = $matches[3]

        $replacement = "${q10Header}### Contexto`n**Text (same as above):**`n$contextText`n`n$($matches[4])"

        if (-not ($content -match "## Question 10.*?### Contexto.*?### Enunciado")) {
            $content = $content -replace [regex]::Escape("${q10Header}$($matches[4])"), $replacement
            $modified = $true
            Write-Host "  Fixed Q10 in: $($file.Name)" -ForegroundColor Yellow
        }
    }

    if ($modified) {
        if (-not $DryRun) {
            Set-Content -Path $file.FullName -Value $content -NoNewline
        }
        $countFixed++
    }
}

Write-Host "`n==================" -ForegroundColor Cyan
Write-Host "Fixed $countFixed files." -ForegroundColor Green
if ($DryRun) {
    Write-Host "(DRY RUN - no files actually modified)" -ForegroundColor Yellow
}
