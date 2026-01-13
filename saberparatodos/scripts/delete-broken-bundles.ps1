# delete-broken-bundles.ps1
# Deletes UNI-ENG bundles with Q6 or Q10 missing context

param(
    [string]$Path = "src\content\questions\ingles",
    [switch]$DryRun = $false
)

$deletedCount = 0
$files = Get-ChildItem -Recurse "$Path\grado-*\UNI-ENG-*.md"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw

    # Check if Q6 or Q10 is missing context (pattern: "## Question N...\nID:...\n\n### Enunciado")
    $missingQ6 = $content -match '## Question 6.*?\r?\nID:.*?\r?\n\r?\n### Enunciado'
    $missingQ10 = $content -match '## Question 10.*?\r?\nID:.*?\r?\n\r?\n### Enunciado'

    if ($missingQ6 -or $missingQ10) {
        Write-Host "DELETE: $($file.FullName)" -ForegroundColor Red
        if (-not $DryRun) {
            Remove-Item $file.FullName -Force
        }
        $deletedCount++
    }
}

Write-Host "`n==================" -ForegroundColor Cyan
Write-Host "Deleted $deletedCount files." -ForegroundColor Green
if ($DryRun) {
    Write-Host "(DRY RUN - no files actually deleted)" -ForegroundColor Yellow
}
