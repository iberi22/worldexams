$packsDir = "E:\scripts-python\worldexams\saberparatodos\public\api\packs"

# Colombia packs analysis: separate by prefix
$coPacks = Get-ChildItem -Path $packsDir -Filter "co-week-*"
$colombiaPacks = Get-ChildItem -Path $packsDir -Filter "colombia-week-*"
$plainPacks = Get-ChildItem -Path $packsDir -Filter "week-1-grade-*"

Write-Host "=== PACKS ORIGINALES (src: questions_data/) ===" -ForegroundColor Cyan

# Check if there's a questions_data folder in the main repo
$mainDir = "E:\scripts-python\worldexams\questions_data"
if (Test-Path $mainDir) {
    Write-Host "questions_data encontrado en raíz del repo"
    Get-ChildItem -Path $mainDir -Recurse -Filter "*.json" | ForEach-Object {
        Write-Host "  $($_.FullName -replace [regex]::Escape('E:\scripts-python\worldexams\'), '')"
    }
} else { 
    Write-Host "questions_data NO EXISTE en raíz del repo" -ForegroundColor Yellow
}

# Check .worldexams for history
$genDir = "E:\scripts-python\worldexams\.worldexams\generation"
Write-Host "`n=== GENERATION QUEUE ===" -ForegroundColor Cyan
if (Test-Path "$genDir\queue.json") {
    $queue = Get-Content "$genDir\queue.json" -Raw | ConvertFrom-Json
    Write-Host "Queue tasks: $($queue.Count)"
    $queue | Group-Object status | ForEach-Object { Write-Host "  $($_.Name): $($_.Count)" }
}

Write-Host "`n=== HISTORY BATCHES ===" -ForegroundColor Cyan
Get-ChildItem -Path "$genDir\history" -Filter "*.json" | Select-Object Name

Write-Host "`n=== CO- PACKS DETALLE ===" -ForegroundColor Cyan
$coPacks = $coPacks | Sort-Object Name
$coPacks | ForEach-Object {
    $json = Get-Content $_.FullName -Raw | ConvertFrom-Json
    $g = if ($_.Name -match 'grade[_-](\d+)') { $matches[1] } else { '?' }
    $s = if ($_.Name -match 'subject[_-](.+?)\.json$') { $matches[1] } else { '?' }
    Write-Host "  Grade $g | $s | $($json.questions.Count) preguntas"
}

Write-Host "`n=== COLOMBIA- PACKS DETALLE ===" -ForegroundColor Cyan
$colombiaPacks = $colombiaPacks | Sort-Object Name
$colombiaPacks | ForEach-Object {
    $json = Get-Content $_.FullName -Raw | ConvertFrom-Json
    $g = if ($_.Name -match 'grade[_-](\d+)') { $matches[1] } else { '?' }
    $s = if ($_.Name -match 'subject[_-](.+?)\.json$') { $matches[1] } else { '?' }
    Write-Host "  Grade $g | $s | $($json.questions.Count) preguntas"
}

Write-Host "`n=== PLAIN PACKS (week-1-grade) DETALLE ===" -ForegroundColor Cyan
$plainPacks = $plainPacks | Sort-Object Name
$plainPacks | ForEach-Object {
    $json = Get-Content $_.FullName -Raw | ConvertFrom-Json
    $g = if ($_.Name -match 'grade[_-](\d+)') { $matches[1] } else { '?' }
    $s = if ($_.Name -match 'subject[_-](.+?)\.json$') { $matches[1] } else { '?' }
    Write-Host "  Grade $g | $s | $($json.questions.Count) preguntas"
}

# Now check the generate script for how periodos work
Write-Host "`n=== CHECK PERIODOS ===" -ForegroundColor Cyan
# Check all packs for any period > 1
$allPacks = Get-ChildItem -Path $packsDir -Filter "*.json" | Where-Object { $_.Name -notin @('current.json','metadata.json') }
$hasPeriods = $false
$periodPacks = @()
foreach ($p in $allPacks) {
    $json = Get-Content $p.FullName -Raw | ConvertFrom-Json
    if ($json.metadata.period -and $json.metadata.period -gt 1) {
        $periodPacks += $p
        $hasPeriods = $true
    }
}
if ($hasPeriods) {
    Write-Host "Packs con periodo > 1: $($periodPacks.Count)"
    $periodPacks | ForEach-Object { Write-Host "  $($_.Name)" }
} else {
    Write-Host "NO hay packs con periodo > 1" -ForegroundColor Yellow
    Write-Host "Todos los packs son week-1 solamente" -ForegroundColor Yellow
}

# Count unique questions by subject and grade across ALL colombia packs
Write-Host "`n=== IDS UNICOS POR MATERIA (Colombia) ===" -ForegroundColor Cyan
$allCO = @($coPacks) + @($colombiaPacks) + @($plainPacks)
$bySubject = @{}
$byGrade = @{}
foreach ($p in $allCO) {
    try {
        $json = Get-Content $p.FullName -Raw | ConvertFrom-Json
        $grade = if ($p.Name -match 'grade[_-](\d+)') { $matches[1] } else { '?' }
        foreach ($q in $json.questions) {
            $id = $q.id
            $subj = if ($id -match '^CO-([A-Za-z]+)') { $matches[1] } else { 'OTHER' }
            if (-not $bySubject.ContainsKey($subj)) { $bySubject[$subj] = @{} }
            $bySubject[$subj][$id] = $true
            
            if (-not $byGrade.ContainsKey($grade)) { $byGrade[$grade] = @{packs=0; questions=@{}} }
            $byGrade[$grade].questions[$id] = $true
        }
        $byGrade[$grade].packs++
    } catch { }
}
Write-Host "Por materia (IDs únicos):"
$bySubject.Keys | Sort-Object | ForEach-Object {
    Write-Host "  $_ : $($bySubject[$_].Count) preguntas únicas"
}
Write-Host "`nPor grado (preguntas únicas):"
$byGrade.Keys | Sort-Object { [int]$_ } | ForEach-Object {
    Write-Host "  Grado $_ : $($byGrade[$_].questions.Count) preguntas únicas en $($byGrade[$_].packs) packs"
}
