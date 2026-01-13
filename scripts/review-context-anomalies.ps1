# Script para revisar anomalías de contexto en preguntas de Inglés
# Uso: .\review-context-anomalies.ps1 -Count 5

param(
    [int]$Count = 5,
    [string]$BasePath = "E:\scripts-python\worldexams\saberparatodos\src\content\questions\ingles"
)

Write-Host "`n🔍 REVISIÓN DE CONTEXTOS Y ANOMALÍAS (INGLÉS)" -ForegroundColor Cyan
Write-Host "=" * 80 -ForegroundColor Gray
Write-Host "Buscando bundles en: $BasePath" -ForegroundColor Gray

# Obtener todos los bundles de inglés
if (Test-Path $BasePath) {
    $allBundles = Get-ChildItem -Path $BasePath -Recurse -Filter "*-bundle.md" | Sort-Object {Get-Random}

    if ($allBundles.Count -eq 0) {
        Write-Host "❌ No se encontraron bundles en: $BasePath" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "❌ La ruta base no existe: $BasePath" -ForegroundColor Red
    exit 1
}

Write-Host "📊 Total bundles encontrados: $($allBundles.Count)" -ForegroundColor Yellow
Write-Host "📋 Seleccionando $Count bundles al azar para revisión profunda...`n" -ForegroundColor Yellow

$selectedBundles = $allBundles | Select-Object -First $Count
$bundleNumber = 1

foreach ($bundle in $selectedBundles) {
    Write-Host "`n" + ("=" * 80) -ForegroundColor Cyan
    Write-Host "📦 BUNDLE $bundleNumber de $Count" -ForegroundColor Green
    Write-Host ("=" * 80) -ForegroundColor Cyan

    Write-Host "📁 Archivo: $($bundle.Name)" -ForegroundColor White
    Write-Host "📍 Ruta: $($bundle.DirectoryName)" -ForegroundColor Gray

    # Leer contenido
    $content = Get-Content -Path $bundle.FullName -Raw -Encoding UTF8

    # 1. Extraer FOCUS / TOPIC
    Write-Host "`n🎯 CONTEXTO GENERAL:" -ForegroundColor Yellow

    if ($content -match '(?ms)^# Topic: (.*?)$') {
        Write-Host "  TOPIC: $($Matches[1].Trim())" -ForegroundColor White
    }

    # Buscar bloque de Focus o Contexto global
    if ($content -match '(?ms)^> \*\*Focus:\*\*\s*(.*?)$') {
        Write-Host "  FOCUS: $($Matches[1].Trim())" -ForegroundColor Cyan
    } elseif ($content -match '(?ms)^> \*\*Contexto:\*\*\s*(.*?)$') {
        Write-Host "  CONTEXTO: $($Matches[1].Trim())" -ForegroundColor Cyan
    } else {
        Write-Host "  ⚠️  No se detectó bloque de Focus explícito." -ForegroundColor DarkGray
    }

    Write-Host "`n" + ("-" * 80) -ForegroundColor Gray
    Write-Host "❓ REVISIÓN DE PREGUNTAS:" -ForegroundColor Yellow

    # Extraer todas las preguntas (Soporte para 'Pregunta', 'Question', 'Q')
    $preguntas = [regex]::Matches($content, '## (Pregunta|Question|Q) ?\d+.*?(?=## (Pregunta|Question|Q) ?\d+|$)', [System.Text.RegularExpressions.RegexOptions]::Singleline)

    if ($preguntas.Count -eq 0) {
        Write-Host "  ❌ No se encontraron preguntas con el formato '## Pregunta N'" -ForegroundColor Red
    }

    foreach ($match in $preguntas) {
        $pContent = $match.Value

        # Extraer ID
        $id = "Desconocido"
        if ($pContent -match '(?i)ID:\s*([^\s]+)') { $id = $Matches[1] }

        # Extraer Contexto Específico (si existe)
        $contextoEsp = $null
        if ($pContent -match '(?is)### Contexto\s*(.*?)(?=###|$)') {
            $contextContent = $Matches[1].Trim()
            if ($contextContent.Length -gt 0) {
                $contextoEsp = $contextContent
            }
        }

        # Extraer Enunciado
        $enunciado = "Sin enunciado"
        if ($pContent -match '(?is)### Enunciado\s*(.*?)(?=###|$)') {
            $enunciado = $Matches[1].Trim()
        }

        # Mostrar bloque de pregunta
        Write-Host "`n  🔹 [$id]" -ForegroundColor White

        if ($contextoEsp) {
            Write-Host "     [Contexto Local]: $contextoEsp" -ForegroundColor DarkCyan
        }

        Write-Host "     [Pregunta]: $enunciado" -ForegroundColor White

        # Extraer Opción Correcta (para verificar sentido)
        if ($pContent -match '(?m)-\s*\[x\]\s*(.*?)$') {
            Write-Host "     [Respuesta]: $($Matches[1])" -ForegroundColor Green
        }
    }

    $bundleNumber++
}

Write-Host "`n" + ("=" * 80) -ForegroundColor Cyan
Write-Host "✅ REVISIÓN COMPLETADA" -ForegroundColor Green
Write-Host "💡 Sugerencia: Busca discrepancias entre el 'FOCUS' y las '[Preguntas]'" -ForegroundColor Gray
Write-Host ("=" * 80) -ForegroundColor Cyan
