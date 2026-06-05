$packsDir = "E:\scripts-python\worldexams\saberparatodos\public\api\packs"
$mdDir = "E:\scripts-python\worldexams\questions_data\colombia"

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "   INFORME COMPLETO - COLOMBIA" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan

# ===== A) SOURCE FILES =====
Write-Host "`n=== A) MASTERY BUNDLES ORIGINALES (questions_data/) ===" -ForegroundColor Yellow

$mdFiles = Get-ChildItem -Recurse -File -Path $mdDir | Where-Object { $_.Extension -eq '.md' -and $_.Length -gt 0 -and $_.Name -notlike 'README*' }

$byPeriod = @{}
$bySubject = @{}

foreach ($f in $mdFiles) {
    $period = if ($f.Name -match 'P(\d+)') { $matches[1] } else { '?' }
    $subject = $f.Directory.Parent.Name  
    $subSubject = $f.Directory.Name      
    $key = $subject + "/" + $subSubject
    if (-not $byPeriod.ContainsKey($period)) { $byPeriod[$period] = @{} }
    if (-not $byPeriod[$period].ContainsKey($key)) { $byPeriod[$period][$key] = 0 }
    $byPeriod[$period][$key]++
    if (-not $bySubject.ContainsKey($subject)) { $bySubject[$subject] = @{} }
    $bySubject[$subject][$period]++
}

Write-Host "  Total archivos: " $mdFiles.Count
Write-Host "`n  --- Por periodo ---"
$byPeriod.Keys | Sort-Object | ForEach-Object {
    $p = $_
    $items = $byPeriod[$_]
    $total = ($items.Values | Measure-Object -Sum).Sum
    Write-Host "  Periodo " $p ": " $total " bundles"
    $items.Keys | Sort-Object | ForEach-Object { Write-Host "     " $_ " : " $items[$_] }
}

Write-Host "`n  --- Por materia ---"
$bySubject.Keys | Sort-Object | ForEach-Object {
    $s = $_
    $periods = $bySubject[$_]
    $total = ($periods.Values | Measure-Object -Sum).Sum
    Write-Host "  " $s ": " $total " bundles total"
    $periods.Keys | Sort-Object | ForEach-Object { Write-Host "     P" $_ " : " $periods[$_] }
}

# ===== B) PACKS SERVIDOS =====
Write-Host "`n=== B) PACKS SERVIDOS (public/api/packs/) ===" -ForegroundColor Yellow

$allColombia = @(
    Get-ChildItem -Path $packsDir -Filter "co-week-1-*" 
    Get-ChildItem -Path $packsDir -Filter "colombia-week-1-*" 
    Get-ChildItem -Path $packsDir -Filter "week-1-grade-*-subject-*"
)

$byGrade = @{}
foreach ($p in $allColombia) {
    $json = Get-Content $p.FullName -Raw | ConvertFrom-Json
    $grade = if ($p.Name -match 'grade[_-](\d+)') { $matches[1] } else { '?' }
    if (-not $byGrade.ContainsKey($grade)) { $byGrade[$grade] = @{packs=0; questions=@{}} }
    $byGrade[$grade].packs++
    foreach ($q in $json.questions) { $byGrade[$grade].questions[$q.id] = $true }
}

Write-Host "  Preguntas UNICAS por grado (IDs deduplicados):"
$byGrade.Keys | Sort-Object { [int]$_ } | ForEach-Object {
    $info = $byGrade[$_]
    Write-Host "  Grado " $_ ": " $info.packs " packs, " $info.questions.Count " preguntas únicas"
}

# ===== C) SIMULACROS =====
Write-Host "`n=== C) SIMULACROS POSIBLES ===" -ForegroundColor Yellow
Write-Host "  ¿5 simulacros de 60 preguntas = 300 preguntas UNICAS?"

$gradeCount = @{}
foreach ($p in $allColombia) {
    $json = Get-Content $p.FullName -Raw | ConvertFrom-Json
    $grade = if ($p.Name -match 'grade[_-](\d+)') { $matches[1] } else { '?' }
    if (-not $gradeCount.ContainsKey($grade)) { $gradeCount[$grade] = @{} }
    foreach ($q in $json.questions) { $gradeCount[$grade][$q.id] = $true }
}

$gradeCount.Keys | Sort-Object { [int]$_ } | ForEach-Object {
    $total = $gradeCount[$_].Count
    if ($total -ge 300) {
        Write-Host "  Grado " $_ ": " $total " preguntas -> ✅ SI, para " [math]::Floor($total/60) " simulacros" -ForegroundColor Green
    } else {
        Write-Host "  Grado " $_ ": " $total " preguntas -> ❌ NO, faltan " (300-$total) -ForegroundColor Red
    }
}

# ===== D) GRADO 6 =====
Write-Host "`n=== D) GRADO 6 - DETALLE ===" -ForegroundColor Yellow
$g6Packs = Get-ChildItem -Path $packsDir -Filter "*.json" | Where-Object { $_.Name -match 'grade[_-]6' -and $_.Name -notmatch '^(metadata|current)' }
foreach ($p in $g6Packs) {
    $json = Get-Content $p.FullName -Raw | ConvertFrom-Json
    $subj = if ($p.Name -match 'subject[_-](.+?)\.json$') { $matches[1] } else { '?' }
    Write-Host "  " $subj ": " $json.questions.Count " preguntas"
    $ids = $json.questions.id
    Write-Host "    IDs: " ($ids[0]) " ... " ($ids[-1])
}

# ===== E) GRADO 11 POR MATERIA (único) =====
Write-Host "`n=== E) GRADO 11 - PREGUNTAS UNICAS POR MATERIA ===" -ForegroundColor Yellow
$g11Unique = @{}
$g11Packs = Get-ChildItem -Path $packsDir -Filter "*.json" | Where-Object { $_.Name -match 'grade[_-]11' -and $_.Name -notmatch '^(metadata|current)' }
foreach ($p in $g11Packs) {
    $json = Get-Content $p.FullName -Raw | ConvertFrom-Json
    $subj = if ($p.Name -match 'subject[_-](.+?)\.json$') { $matches[1] } else { '?' }
    if (-not $g11Unique.ContainsKey($subj)) { $g11Unique[$subj] = @{} }
    foreach ($q in $json.questions) { $g11Unique[$subj][$q.id] = $true }
}
$g11Unique.Keys | Sort-Object | ForEach-Object {
    $count = $g11Unique[$_].Count
    $sims = if ($count -ge 300) { "✅ " + [math]::Floor($count/60) + " simulacros" } else { "❌ faltan " + (300-$count) }
    Write-Host "  " $_ ": " $count " únicas -> " $sims
}

# ===== F) MIX DE MATERIAS SIMULACRO TIPO ICFES =====
Write-Host "`n=== F) SIMULACRO COMPLETO TIPO ICFES (5 materias x 12 preguntas = 60) ===" -ForegroundColor Yellow
$canMix = $true
$subjectsGrade11 = @("matematicas", "lectura_critica", "ciencias_naturales", "sociales_ciudadanas", "ingles")
foreach ($s in $subjectsGrade11) {
    $count = 0
    $g11Unique.Keys | Where-Object { $_ -like $s -or $_ -like "*" + $s + "*" -or $s -like "*" + $_ + "*" } | ForEach-Object { $count = $g11Unique[$_].Count }
    Write-Host "  " $s ": " $count " únicas -> " -nonewline
    if ($count -ge 12) { Write-Host "✅ 12/simulacro" } else { Write-Host "❌ solo " $count; $canMix = $false }
}
if ($canMix) { Write-Host "  `n  ✅ Puedes hacer simulacros mixtos ICFES (12 c/u) sin repetir preguntas!" -ForegroundColor Green }

# ===== G) SIMULACROS SOLO INGLES =====
Write-Host "`n=== G) SIMULACROS SOLO INGLES GRADO 11 ===" -ForegroundColor Yellow
$engCount = 0
$g11Unique.Keys | Where-Object { $_ -match 'ingles|ingles|Ingls|ingl' } | ForEach-Object { $engCount += $g11Unique[$_].Count }
Write-Host "  Total únicas inglés G11: " $engCount
Write-Host "  Simulacros posibles de 60 solo inglés: " [math]::Floor($engCount/60)
