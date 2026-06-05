$packsDir = "E:\scripts-python\worldexams\saberparatodos\public\api\packs"

# Compare colombia-* vs co-* for grade 11 to see if they're duplicates
$colombia = Get-ChildItem -Path $packsDir -Filter "colombia-week-1-grade-11-*"
$co = Get-ChildItem -Path $packsDir -Filter "co-week-1-grade-11-*"

Write-Host "=== colombia-week-1-grade-11 =="
$colombia | ForEach-Object { 
    $json = Get-Content $_.FullName -Raw | ConvertFrom-Json
    Write-Host "$($_.Name): $($json.questions.Count) questions"
}

Write-Host "=== co-week-1-grade-11 =="
$co | ForEach-Object { 
    $json = Get-Content $_.FullName -Raw | ConvertFrom-Json
    Write-Host "$($_.Name): $($json.questions.Count) questions"
}

# Now total unique Colombia questions - just count co- + colombia- non-overlapping
# Since colombia- has the same 5 subjects as co-, take co- as authoritative
Write-Host "`n=== UNIFIED COLOMBIA ==="
Write-Host "Taking 'co-' packs as primary (covers grades 3-11)"
Write-Host "colombia- packs likely redundant duplicates"

# Also check week-1-grade-11 packs (no country prefix)
$plain = Get-ChildItem -Path $packsDir -Filter "week-1-grade-11-*"
Write-Host "`n=== week-1-grade-11 (no country prefix) =="
$plain | ForEach-Object { 
    $json = Get-Content $_.FullName -Raw | ConvertFrom-Json
    Write-Host "$($_.Name): $($json.questions.Count) questions"
}
