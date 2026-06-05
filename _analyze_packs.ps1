$packsDir = "E:\scripts-python\worldexams\saberparatodos\public\api\packs"
$packs = Get-ChildItem -Path $packsDir -Filter "*.json" | Where-Object { $_.Name -notin @('current.json','metadata.json') }

Write-Host "=== TOTAL PACKS: $($packs.Count) ==="
Write-Host ""

# Count by grade
$grades = @{}
foreach ($p in $packs) {
    if ($p.Name -match 'grade[_-](\d+)') {
        $g = $matches[1]
    } else { $g = 'unknown' }
    if (-not $grades.ContainsKey($g)) { $grades[$g] = @{count=0; subjects=@{}} }
    $grades[$g].count++
    if ($p.Name -match 'subject[_-](.+?)\.json$') {
        $subj = $matches[1]
        if (-not $grades[$g].subjects.ContainsKey($subj)) { $grades[$g].subjects[$subj] = 0 }
        $grades[$g].subjects[$subj]++
    }
}

$grades.Keys | Sort-Object { [int]$_ } | ForEach-Object {
    $g = $_
    $info = $grades[$g]
    $subjList = ($info.subjects.Keys | Sort-Object) -join ', '
    Write-Host "Grado $g`: $($info.count) packs [$subjList]"
}

Write-Host ""
Write-Host "=== POR PAIS ==="
$countries = @{}
foreach ($p in $packs) {
    if ($p.Name -match '^([a-z]+(?:[_-][a-z]+)*?)-week') {
        $c = $matches[1]
    } elseif ($p.Name -match '^week') { $c = 'colombia' }
    else { $c = 'other' }
    if (-not $countries.ContainsKey($c)) { $countries[$c] = 0 }
    $countries[$c]++
}
$countries.Keys | Sort-Object | ForEach-Object {
    Write-Host "$_`: $($countries[$_]) packs"
}

Write-Host ""
Write-Host "=== TOTAL QUESTIONS (sample some packs) ==="
$questions = 0
$packCount = 0
foreach ($p in $packs) {
    try {
        $json = Get-Content $p.FullName -Raw | ConvertFrom-Json
        if ($json.questions) { $q = $json.questions.Count }
        elseif ($json.packs) { $q = ($json.packs | ForEach-Object { $_.questions.Count }) -join '+' }
        elseif ($json.exam -and $json.exam.questions) { $q = $json.exam.questions.Count }
        else { $q = 0 }
        # try to sum
        if ($q -is [int]) { $questions += $q; $packCount++ }
    } catch { }
}
Write-Host "Sampled $packCount packs"
Write-Host "Try reading a pack to see its structure..."
