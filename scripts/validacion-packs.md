# 🛠️ Comandos de Validación para Packs de Preguntas

> Scripts y comandos útiles para validar packs generados según Protocolo v2.0

---

## ✅ Validación de Sintaxis JSON

### Validar un solo pack

```powershell
# Validar JSON y formatear bonito
Get-Content "api/v1/CO/icfes/9/matematicas/2.json" | ConvertFrom-Json | ConvertTo-Json -Depth 10 | Out-Null
Write-Host "✅ JSON válido" -ForegroundColor Green
```

### Validar todos los packs de una asignatura

```powershell
Get-ChildItem "api/v1/CO/icfes/9/matematicas/*.json" -Exclude "index.json" | ForEach-Object {
    try {
        Get-Content $_.FullName | ConvertFrom-Json | Out-Null
        Write-Host "✅ $($_.Name) - JSON válido" -ForegroundColor Green
    } catch {
        Write-Host "❌ $($_.Name) - JSON inválido" -ForegroundColor Red
        Write-Host $_.Exception.Message
    }
}
```

### Validar todos los packs de Grado 9

```powershell
Get-ChildItem "api/v1/CO/icfes/9/**/*.json" -Recurse -Exclude "index.json" | ForEach-Object {
    try {
        Get-Content $_.FullName | ConvertFrom-Json | Out-Null
        Write-Host "✅ $($_.Name)" -ForegroundColor Green
    } catch {
        Write-Host "❌ $($_.Name)" -ForegroundColor Red
    }
}
```

---

## 📊 Estadísticas de Packs

### Contar preguntas en un pack

```powershell
$pack = Get-Content "api/v1/CO/icfes/9/matematicas/2.json" | ConvertFrom-Json
$count = $pack.questions.Count
Write-Host "Total de preguntas: $count"

if ($count -eq 7) {
    Write-Host "✅ Correcto (7 preguntas)" -ForegroundColor Green
} else {
    Write-Host "❌ Incorrecto (debe ser 7, no $count)" -ForegroundColor Red
}
```

### Listar IDs de preguntas

```powershell
$pack = Get-Content "api/v1/CO/icfes/9/matematicas/2.json" | ConvertFrom-Json
Write-Host "IDs de preguntas:" -ForegroundColor Cyan
$pack.questions | ForEach-Object {
    Write-Host "  - $($_.id)" -ForegroundColor Yellow
}
```

### Verificar dificultades

```powershell
$pack = Get-Content "api/v1/CO/icfes/9/matematicas/2.json" | ConvertFrom-Json
Write-Host "Distribución de dificultades:" -ForegroundColor Cyan
$pack.questions | ForEach-Object {
    Write-Host "  - Pregunta $($_.number): Dificultad $($_.difficulty)" -ForegroundColor Yellow
}

# Validar distribución esperada: 1, 2, 3, 3, 3, 4, 5
$diffs = $pack.questions | ForEach-Object { $_.difficulty }
$expected = @(1, 2, 3, 3, 3, 4, 5)

if (Compare-Object $diffs $expected -SyncWindow 0) {
    Write-Host "❌ Distribución incorrecta" -ForegroundColor Red
} else {
    Write-Host "✅ Distribución correcta (1-2-3-3-3-4-5)" -ForegroundColor Green
}
```

### Verificar protocolo v2.0

```powershell
$pack = Get-Content "api/v1/CO/icfes/9/matematicas/2.json" | ConvertFrom-Json

Write-Host "Validación de Protocolo v2.0:" -ForegroundColor Cyan

# Verificar protocol_version
if ($pack.protocol_version -eq "2.0") {
    Write-Host "  ✅ protocol_version: 2.0" -ForegroundColor Green
} else {
    Write-Host "  ❌ protocol_version: $($pack.protocol_version) (debe ser 2.0)" -ForegroundColor Red
}

# Verificar total_questions
if ($pack.total_questions -eq 7) {
    Write-Host "  ✅ total_questions: 7" -ForegroundColor Green
} else {
    Write-Host "  ❌ total_questions: $($pack.total_questions) (debe ser 7)" -ForegroundColor Red
}

# Verificar creador
Write-Host "  📝 creador: $($pack.creador)"

# Verificar fecha
Write-Host "  📅 generation_date: $($pack.generation_date)"
```

---

## 🔍 Validación de Contenido

### Verificar longitud de explicaciones

```powershell
$pack = Get-Content "api/v1/CO/icfes/9/matematicas/2.json" | ConvertFrom-Json
Write-Host "Longitud de explicaciones (mínimo 50 palabras):" -ForegroundColor Cyan

$pack.questions | ForEach-Object {
    $words = ($_.explanation -split '\s+').Count
    $status = if ($words -ge 50) { "✅" } else { "❌" }
    Write-Host "  $status Pregunta $($_.number): $words palabras" -ForegroundColor $(if ($words -ge 50) { "Green" } else { "Red" })
}
```

### Verificar contexto colombiano (palabras clave)

```powershell
$pack = Get-Content "api/v1/CO/icfes/9/matematicas/2.json" | ConvertFrom-Json
$keywords = @("Bogotá", "Medellín", "Cali", "Cartagena", "COP", "pesos", "Colombia")

Write-Host "Búsqueda de contexto cultural colombiano:" -ForegroundColor Cyan
$content = $pack | ConvertTo-Json -Depth 10

foreach ($keyword in $keywords) {
    if ($content -match $keyword) {
        Write-Host "  ✅ Encontrado: $keyword" -ForegroundColor Green
    }
}
```

### Verificar IDs únicos (sin duplicados)

```powershell
$pack = Get-Content "api/v1/CO/icfes/9/matematicas/2.json" | ConvertFrom-Json
$ids = $pack.questions | ForEach-Object { $_.id }
$unique = $ids | Select-Object -Unique

if ($ids.Count -eq $unique.Count) {
    Write-Host "✅ Todos los IDs son únicos ($($ids.Count) preguntas)" -ForegroundColor Green
} else {
    Write-Host "❌ Hay IDs duplicados" -ForegroundColor Red
    $ids | Group-Object | Where-Object { $_.Count -gt 1 } | ForEach-Object {
        Write-Host "  - $($_.Name) (aparece $($_.Count) veces)" -ForegroundColor Yellow
    }
}
```

---

## 📈 Reportes de Asignatura

### Reporte completo de una asignatura

```powershell
$asignatura = "matematicas"
$packs = Get-ChildItem "api/v1/CO/icfes/9/$asignatura/*.json" -Exclude "index.json"

Write-Host "📊 Reporte de $asignatura (Grado 9)" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan

$totalQuestions = 0

foreach ($file in $packs) {
    $pack = Get-Content $file.FullName | ConvertFrom-Json
    $count = $pack.questions.Count
    $totalQuestions += $count

    Write-Host "`n📦 Pack: $($file.Name)" -ForegroundColor Yellow
    Write-Host "  ID: $($pack.id)"
    Write-Host "  Tema: $($pack.tema)"
    Write-Host "  Preguntas: $count"
    Write-Host "  Creador: $($pack.creador)"
    Write-Host "  Fecha: $($pack.generation_date)"
}

Write-Host "`n═══════════════════════════════════════" -ForegroundColor Cyan
Write-Host "Total de packs: $($packs.Count)" -ForegroundColor Green
Write-Host "Total de preguntas: $totalQuestions" -ForegroundColor Green
```

### Reporte de todo el Grado 9

```powershell
Write-Host "📊 Reporte Completo - Grado 9 Colombia" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════" -ForegroundColor Cyan

$asignaturas = Get-ChildItem "api/v1/CO/icfes/9" -Directory

$totalPacks = 0
$totalQuestions = 0

foreach ($asig in $asignaturas) {
    $packs = Get-ChildItem $asig.FullName -Filter "*.json" -Exclude "index.json"
    $questions = 0

    foreach ($file in $packs) {
        $pack = Get-Content $file.FullName | ConvertFrom-Json
        $questions += $pack.questions.Count
    }

    $totalPacks += $packs.Count
    $totalQuestions += $questions

    Write-Host "`n📚 $($asig.Name)" -ForegroundColor Yellow
    Write-Host "  Packs: $($packs.Count)"
    Write-Host "  Preguntas: $questions"
}

Write-Host "`n═══════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "🎯 Totales:" -ForegroundColor Green
Write-Host "  Asignaturas: $($asignaturas.Count)" -ForegroundColor Green
Write-Host "  Packs: $totalPacks" -ForegroundColor Green
Write-Host "  Preguntas: $totalQuestions" -ForegroundColor Green
```

---

## 🔄 Actualizar Index.json

### Regenerar index.json de una asignatura

```powershell
$asignatura = "matematicas"
$dir = "api/v1/CO/icfes/9/$asignatura"

$packs = Get-ChildItem "$dir/*.json" -Exclude "index.json" | ForEach-Object {
    $pack = Get-Content $_.FullName | ConvertFrom-Json
    @{
        id = [int]($_.BaseName)
        tema = $pack.tema
        total_questions = $pack.questions.Count
        file = $_.Name
    }
}

$index = @{
    asignatura = ($asignatura -replace "_", " " | ForEach-Object { (Get-Culture).TextInfo.ToTitleCase($_) })
    grado = 9
    packs = $packs
}

$index | ConvertTo-Json -Depth 3 | Out-File "$dir/index.json" -Encoding UTF8
Write-Host "✅ Index actualizado: $dir/index.json" -ForegroundColor Green
```

---

## 🧪 Tests de Calidad Automatizados

### Script completo de validación

```powershell
# Guardar como: scripts/validate-pack.ps1

param(
    [Parameter(Mandatory=$true)]
    [string]$PackPath
)

Write-Host "🔍 Validando: $PackPath" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan

$errors = 0

# 1. Validar sintaxis JSON
try {
    $pack = Get-Content $PackPath | ConvertFrom-Json
    Write-Host "✅ Sintaxis JSON válida" -ForegroundColor Green
} catch {
    Write-Host "❌ JSON inválido" -ForegroundColor Red
    exit 1
}

# 2. Validar protocolo v2.0
if ($pack.protocol_version -ne "2.0") {
    Write-Host "❌ protocol_version debe ser 2.0" -ForegroundColor Red
    $errors++
}

# 3. Validar 7 preguntas
if ($pack.questions.Count -ne 7) {
    Write-Host "❌ Debe tener 7 preguntas (tiene $($pack.questions.Count))" -ForegroundColor Red
    $errors++
}

# 4. Validar IDs únicos
$ids = $pack.questions | ForEach-Object { $_.id }
$unique = $ids | Select-Object -Unique
if ($ids.Count -ne $unique.Count) {
    Write-Host "❌ IDs duplicados" -ForegroundColor Red
    $errors++
}

# 5. Validar dificultades
$expectedDiffs = @(1, 2, 3, 3, 3, 4, 5)
$actualDiffs = $pack.questions | Sort-Object number | ForEach-Object { $_.difficulty }
$diffsMatch = $true
for ($i = 0; $i -lt 7; $i++) {
    if ($actualDiffs[$i] -ne $expectedDiffs[$i]) {
        $diffsMatch = $false
        break
    }
}
if (-not $diffsMatch) {
    Write-Host "❌ Distribución de dificultades incorrecta" -ForegroundColor Red
    Write-Host "   Esperado: 1, 2, 3, 3, 3, 4, 5" -ForegroundColor Yellow
    Write-Host "   Real: $($actualDiffs -join ', ')" -ForegroundColor Yellow
    $errors++
}

# 6. Validar explicaciones (50+ palabras)
$pack.questions | ForEach-Object {
    $words = ($_.explanation -split '\s+').Count
    if ($words -lt 50) {
        Write-Host "❌ Pregunta $($_.number): Explicación muy corta ($words palabras, mínimo 50)" -ForegroundColor Red
        $errors++
    }
}

# 7. Validar contexto colombiano
$content = $pack | ConvertTo-Json -Depth 10
$hasContext = $false
$keywords = @("Bogotá", "Medellín", "Cali", "Cartagena", "Bucaramanga", "COP", "pesos colombianos", "Colombia")
foreach ($keyword in $keywords) {
    if ($content -match $keyword) {
        $hasContext = $true
        break
    }
}
if (-not $hasContext) {
    Write-Host "⚠️ No se encontró contexto cultural colombiano" -ForegroundColor Yellow
}

# Resultado final
Write-Host "`n═══════════════════════════════════════" -ForegroundColor Cyan
if ($errors -eq 0) {
    Write-Host "✅ VALIDACIÓN EXITOSA" -ForegroundColor Green
    exit 0
} else {
    Write-Host "❌ FALLÓ LA VALIDACIÓN ($errors errores)" -ForegroundColor Red
    exit 1
}
```

### Usar el script

```powershell
# Validar un pack
.\scripts\validate-pack.ps1 -PackPath "api/v1/CO/icfes/9/matematicas/2.json"

# Validar todos los packs de Grado 9
Get-ChildItem "api/v1/CO/icfes/9/**/*.json" -Recurse -Exclude "index.json" | ForEach-Object {
    .\scripts\validate-pack.ps1 -PackPath $_.FullName
}
```

---

## 📝 Exportar Reporte

### Generar reporte en Markdown

```powershell
$output = "docs/reports/pack-validation-report.md"

$report = @"
# 📊 Reporte de Validación de Packs
> Generado: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

## Grado 9° - Colombia

"@

Get-ChildItem "api/v1/CO/icfes/9" -Directory | ForEach-Object {
    $asig = $_
    $packs = Get-ChildItem $asig.FullName -Filter "*.json" -Exclude "index.json"

    $report += "`n### $($asig.Name)`n`n"
    $report += "| Pack | Preguntas | Creador | Fecha |`n"
    $report += "|------|-----------|---------|-------|`n"

    foreach ($file in $packs) {
        $pack = Get-Content $file.FullName | ConvertFrom-Json
        $report += "| $($file.BaseName) | $($pack.questions.Count) | $($pack.creador) | $($pack.generation_date) |`n"
    }
}

$report | Out-File $output -Encoding UTF8
Write-Host "✅ Reporte generado: $output" -ForegroundColor Green
```

---

## 🎯 Quick Commands (Copia y Pega)

```powershell
# Validar todos los packs de Grado 9
Get-ChildItem "api/v1/CO/icfes/9/**/*.json" -Recurse -Exclude "index.json" | ForEach-Object { Get-Content $_.FullName | ConvertFrom-Json | Out-Null; Write-Host "✅ $($_.Name)" }

# Contar preguntas totales en Grado 9
(Get-ChildItem "api/v1/CO/icfes/9/**/*.json" -Recurse -Exclude "index.json" | ForEach-Object { (Get-Content $_.FullName | ConvertFrom-Json).questions.Count } | Measure-Object -Sum).Sum

# Listar todos los packs con IDs
Get-ChildItem "api/v1/CO/icfes/9/**/*.json" -Recurse -Exclude "index.json" | ForEach-Object { $p = Get-Content $_.FullName | ConvertFrom-Json; Write-Host "$($p.id) - $($p.tema)" }

# Verificar si hay IDs duplicados en todos los packs
$allIds = Get-ChildItem "api/v1/CO/icfes/9/**/*.json" -Recurse -Exclude "index.json" | ForEach-Object { (Get-Content $_.FullName | ConvertFrom-Json).questions.id }; $allIds | Group-Object | Where-Object { $_.Count -gt 1 } | Select-Object Name, Count
```

---

*Comandos actualizados: 9 de diciembre de 2025*
