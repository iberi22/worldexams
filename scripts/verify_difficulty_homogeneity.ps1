
param(
    [string]$SearchPath = "e:\scripts-python\worldexams\src\content\questions\colombia"
)

$bundles = Get-ChildItem -Path $SearchPath -Recurse -Filter "*-bundle.md"

$failed = 0
$passed = 0

foreach ($file in $bundles) {
    $content = Get-Content $file.FullName -Raw

    # Check 1: Frontmatter difficulty_distribution
    if ($content -notmatch "difficulty_distribution:.*Low.*Medium.*High") {
        Write-Host "FAIL [Frontmatter]: $($file.Name) - Missing 'difficulty_distribution' with Low/Medium/High" -ForegroundColor Red
        $failed++
        continue
    }

    # Check 2: Headers
    if ($content -notmatch "\(Low") {
        Write-Host "FAIL [Headers]: $($file.Name) - Missing 'Low' headers" -ForegroundColor Red
        $failed++
        continue
    }

    # Check 3: Validation Table
    if ($content -notmatch "\|.*Low.*\|") {
        Write-Host "FAIL [Table]: $($file.Name) - Missing 'Low' in validation table" -ForegroundColor Red
        $failed++
        continue
    }

    $passed++
}

Write-Host "Verification Complete."
Write-Host "Passed: $passed" -ForegroundColor Green
Write-Host "Failed: $failed" -ForegroundColor Red
