$packsDir = "E:\scripts-python\worldexams\saberparatodos\public\api\packs"
$packs = Get-ChildItem -Path $packsDir -Filter "*.json" | Where-Object { $_.Name -notin @('current.json','metadata.json') }

# Classify packs by effective country
$packsByCountry = @{}
$totalQuestions = 0
$grade11count = 0
$grade11questions = 0

foreach ($p in $packs) {
    try {
        $json = Get-Content $p.FullName -Raw | ConvertFrom-Json
        $qCount = if ($json.questions) { $json.questions.Count } else { 0 }
        $totalQuestions += $qCount
        
        $grade = if ($p.Name -match 'grade[_-](\d+)') { $matches[1] } else { '?' }
        if ($grade -eq '11') { $grade11count++; $grade11questions += $qCount }
        
        # Normalize country
        $country = if ($p.Name -match '^([a-z]+(?:[_-][a-z]+)*?)-week') { $matches[1] } elseif ($p.Name -match '^week') { 'colombia-core' } else { 'other' }
        
        # Normalize: co- and colombia- and no-prefix all Colombia
        if ($country -eq 'co' -or $country -eq 'colombia') { $country = 'colombia' }
        if ($country -match '^(cl|chile)$') { $country = 'chile' }
        if ($country -match '^(ec|ecuador)$') { $country = 'ecuador' }
        if ($country -match '^(pe|peru)$') { $country = 'peru' }
        
        if (-not $packsByCountry.ContainsKey($country)) { $packsByCountry[$country] = @{packs=0; questions=0} }
        $packsByCountry[$country].packs++
        $packsByCountry[$country].questions += $qCount
    } catch { }
}

Write-Host "=== REPORTE FINAL ==="
Write-Host "Total packs: $($packs.Count)"
Write-Host "Preguntas totales (incluyendo posible duplicados): $totalQuestions"
Write-Host ""
Write-Host "=== GRADO 11 ==="
Write-Host "$grade11count packs, $grade11questions preguntas"
Write-Host ""
Write-Host "=== POR PAIS (normalizado) ==="
$packsByCountry.Keys | Sort-Object | ForEach-Object {
    $c = $_
    $info = $packsByCountry[$c]
    Write-Host "$c`: $($info.packs) packs, $($info.questions) preguntas"
}
Write-Host ""
Write-Host "NOTA: Colombia tiene packs con prefijos 'co-', 'colombia-' y 'week-1-grade-11-' (sin prefijo)."
Write-Host "Son versiones generadas en distintas tandas - algunas pueden ser redundantes."
Write-Host "Para evitar doble conteo, revisar metadata de cada pack."
