$packsDir = "E:\scripts-python\worldexams\saberparatodos\public\api\packs"
$packs = Get-ChildItem -Path $packsDir -Filter "*.json" | Where-Object { $_.Name -notin @('current.json','metadata.json') }

$totalQuestions = 0
$byGrade = @{}
$byCountry = @{}

foreach ($p in $packs) {
    try {
        $json = Get-Content $p.FullName -Raw | ConvertFrom-Json
        $qCount = 0
        if ($json.questions) { $qCount = $json.questions.Count }
        $totalQuestions += $qCount
        
        # Grade
        $grade = if ($p.Name -match 'grade[_-](\d+)') { $matches[1] } else { 'unknown' }
        if (-not $byGrade.ContainsKey($grade)) { $byGrade[$grade] = 0 }
        $byGrade[$grade] += $qCount
        
        # Country
        $country = if ($p.Name -match '^([a-z]+(?:[_-][a-z]+)*?)-week') { $matches[1] } elseif ($p.Name -match '^week') { 'colombia' } else { 'other' }
        if (-not $byCountry.ContainsKey($country)) { $byCountry[$country] = @{packs=0; questions=0} }
        $byCountry[$country].packs++
        $byCountry[$country].questions += $qCount
    } catch { Write-Host "Error: $($p.Name)" }
}

Write-Host "=== TOTAL: $totalQuestions preguntas en $($packs.Count) packs ==="
Write-Host ""
Write-Host "--- POR GRADO ---"
$byGrade.Keys | Sort-Object { [int]$_ } | ForEach-Object { Write-Host "Grado $_`: $($byGrade[$_]) preguntas" }
Write-Host ""
Write-Host "--- POR PAIS (top) ---"
$byCountry.Keys | Sort-Object | ForEach-Object { Write-Host "$_`: $($byCountry[$_].packs) packs, $($byCountry[$_].questions) preguntas" }
