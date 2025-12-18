# Script para revisar bundles al azar
# Uso: .\review-bundles.ps1 -Count 10

param(
    [int]$Count = 10,
    [string]$BasePath = "E:\scripts-python\worldexams\saberparatodos\src\content\questions\colombia"
)

Write-Host "`n🔍 REVISIÓN DE BUNDLES AL AZAR" -ForegroundColor Cyan
Write-Host "=" * 80 -ForegroundColor Gray

# Obtener todos los bundles
$allBundles = Get-ChildItem -Path $BasePath -Recurse -Filter "*-bundle.md" | Sort-Object {Get-Random}

if ($allBundles.Count -eq 0) {
    Write-Host "❌ No se encontraron bundles en: $BasePath" -ForegroundColor Red
    exit 1
}

Write-Host "📊 Total bundles encontrados: $($allBundles.Count)" -ForegroundColor Yellow
Write-Host "📋 Seleccionando $Count bundles al azar...`n" -ForegroundColor Yellow

# Seleccionar N bundles al azar
$selectedBundles = $allBundles | Select-Object -First $Count

$bundleNumber = 1

foreach ($bundle in $selectedBundles) {
    Write-Host "`n" + ("=" * 80) -ForegroundColor Cyan
    Write-Host "📦 BUNDLE $bundleNumber de $Count" -ForegroundColor Green
    Write-Host ("=" * 80) -ForegroundColor Cyan

    Write-Host "📁 Archivo: $($bundle.Name)" -ForegroundColor White
    Write-Host "📍 Ruta: $($bundle.DirectoryName.Replace($BasePath, '...'))" -ForegroundColor Gray
    Write-Host "`n" + ("-" * 80) -ForegroundColor Gray

    # Leer contenido
    $content = Get-Content -Path $bundle.FullName -Raw -Encoding UTF8

    # Extraer metadata del frontmatter
    if ($content -match '---\s*(.*?)\s*---' -and $Matches[1]) {
        $frontmatter = $Matches[1]
        Write-Host "📋 METADATA:" -ForegroundColor Yellow

        # Extraer campos clave
        if ($frontmatter -match 'id:\s*"([^"]+)"') { Write-Host "  ID: $($Matches[1])" -ForegroundColor White }
        if ($frontmatter -match 'asignatura:\s*"([^"]+)"') { Write-Host "  Asignatura: $($Matches[1])" -ForegroundColor White }
        if ($frontmatter -match 'tema:\s*"([^"]+)"') { Write-Host "  Tema: $($Matches[1])" -ForegroundColor White }
        if ($frontmatter -match 'total_questions:\s*(\d+)') { Write-Host "  Total Preguntas: $($Matches[1])" -ForegroundColor White }
        if ($frontmatter -match 'protocol_version:\s*"([^"]+)"') { Write-Host "  Protocolo: $($Matches[1])" -ForegroundColor White }
        if ($frontmatter -match 'estado:\s*"([^"]+)"') { Write-Host "  Estado: $($Matches[1])" -ForegroundColor White }
    }

    Write-Host "`n" + ("-" * 80) -ForegroundColor Gray

    # Contar preguntas
    $preguntasCount = ([regex]::Matches($content, '## Pregunta \d+')).Count
    Write-Host "📊 ANÁLISIS:" -ForegroundColor Yellow
    Write-Host "  Preguntas encontradas: $preguntasCount" -ForegroundColor White

    # Verificar placeholders
    $hasPlaceholder = $content -match '\[Pregunta pendiente'
    if ($hasPlaceholder) {
        Write-Host "  ⚠️  PLACEHOLDER DETECTADO!" -ForegroundColor Red
    } else {
        Write-Host "  ✅ Sin placeholders" -ForegroundColor Green
    }

    # Verificar IDs de preguntas
    $questionIDs = [regex]::Matches($content, '\*\*ID:\*\*\s*"([^"]+)"')
    if ($questionIDs.Count -gt 0) {
        Write-Host "  IDs de preguntas:" -ForegroundColor White
        foreach ($match in $questionIDs) {
            Write-Host "    - $($match.Groups[1].Value)" -ForegroundColor Gray
        }
    }

    # Verificar dificultades
    $dificultades = [regex]::Matches($content, '\(.*?Dificultad (\d+)\)')
    if ($dificultades.Count -gt 0) {
        $difArray = $dificultades | ForEach-Object { $_.Groups[1].Value }
        Write-Host "  Dificultades: $($difArray -join ', ')" -ForegroundColor White
    }

    # Verificar contexto colombiano
    $colombianContext = @()
    if ($content -match 'Bogotá') { $colombianContext += 'Bogotá' }
    if ($content -match 'Medellín') { $colombianContext += 'Medellín' }
    if ($content -match 'Cali') { $colombianContext += 'Cali' }
    if ($content -match 'Cartagena') { $colombianContext += 'Cartagena' }
    if ($content -match '\$\d+\.?\d*') { $colombianContext += 'COP' }

    if ($colombianContext.Count -gt 0) {
        Write-Host "  🇨🇴 Contexto colombiano: $($colombianContext -join ', ')" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️  Sin contexto colombiano explícito" -ForegroundColor Yellow
    }

    Write-Host "`n" + ("-" * 80) -ForegroundColor Gray
    Write-Host "📄 MUESTRA DE PREGUNTAS (primeras 3):" -ForegroundColor Yellow

    # Extraer y mostrar primeras 3 preguntas
    $preguntas = [regex]::Matches($content, '## Pregunta \d+.*?(?=## Pregunta \d+|$)', [System.Text.RegularExpressions.RegexOptions]::Singleline)
    $maxShow = [Math]::Min(3, $preguntas.Count)

    for ($i = 0; $i -lt $maxShow; $i++) {
        $pregunta = $preguntas[$i].Value

        # Extraer enunciado
        if ($pregunta -match '### Enunciado\s*(.*?)(?=###|$)' -and $Matches[1]) {
            $enunciado = $Matches[1].Trim()
            # Limitar a primeras 200 caracteres
            if ($enunciado.Length -gt 200) {
                $enunciado = $enunciado.Substring(0, 200) + "..."
            }
            Write-Host "`n  Pregunta $($i+1):" -ForegroundColor Cyan
            Write-Host "  $enunciado" -ForegroundColor White
        }
    }

    $bundleNumber++
}

Write-Host "`n" + ("=" * 80) -ForegroundColor Cyan
Write-Host "✅ REVISIÓN COMPLETADA" -ForegroundColor Green
Write-Host ("=" * 80) -ForegroundColor Cyan

# Resumen final
Write-Host "`n📊 RESUMEN:" -ForegroundColor Yellow
Write-Host "  Bundles revisados: $Count" -ForegroundColor White
Write-Host "  Ruta base: $BasePath" -ForegroundColor Gray
