# Script: Separar Preguntas Públicas (v1) de Premium (v2-v7)
# Propósito: Preparar contenido para arquitectura dual repo
# Ejecutar desde: raíz del proyecto (worldexams/)

$ErrorActionPreference = "Stop"

Write-Host "🚀 Iniciando separación de preguntas..." -ForegroundColor Cyan

# Crear carpeta temporal para premium
$premiumRoot = "temp/premium-questions"
if (Test-Path $premiumRoot) {
    Remove-Item -Recurse -Force $premiumRoot
}
New-Item -ItemType Directory -Path $premiumRoot | Out-Null

# Contadores
$totalBundles = 0
$publicCreated = 0
$premiumCreated = 0
$errors = 0

# Buscar todos los archivos bundle
$bundleFiles = Get-ChildItem -Path "src/content/questions" -Filter "*-bundle.md" -Recurse

Write-Host "📦 Encontrados $($bundleFiles.Count) archivos bundle" -ForegroundColor Yellow

foreach ($file in $bundleFiles) {
    $totalBundles++

    try {
        $content = Get-Content $file.FullName -Raw -Encoding UTF8

        # Detectar inicio de Pregunta 2 (donde termina v1)
        if ($content -match "(?s)(.*?)(\#\# Pregunta 2.*)") {
            $v1Content = $matches[1]
            $premiumContent = $matches[2]
        } else {
            Write-Host "⚠️  Archivo sin formato v2.0: $($file.Name)" -ForegroundColor Yellow
            continue
        }

        # === ARCHIVO PÚBLICO (solo v1) ===
        $publicFile = $file.FullName -replace "-bundle\.md", "-PUBLIC.md"

        # Agregar disclaimer al final de v1
        $publicContent = @"
$v1Content

---

## 🔒 Preguntas Premium (v2-v7)

**Estado:** Contenido comercial (disponible solo para instituciones)

Este bundle contiene **6 preguntas adicionales** con:
- ✅ Contexto cultural local (ciudades, moneda, nombres)
- ✅ Progresión de dificultad (2 fácil + 2 media + 2 difícil)
- ✅ Explicaciones pedagógicas detalladas
- ✅ Distractores basados en errores comunes reales

**Acceso:**
- 🎓 Plan School: \$49/mes (10 parties/hora, 50 estudiantes)
- 🏫 Plan District: \$199/mes (ilimitado, 200 estudiantes)
- 🏢 Plan Enterprise: Custom (1000+ estudiantes)

> Más información: https://saberparatodos.pages.dev/instituciones

---

*Licencia v1: CC BY-SA 4.0 | Licencia v2-v7: Propietaria World Exams Inc.*
"@

        $publicContent | Out-File -FilePath $publicFile -Encoding UTF8 -NoNewline
        $publicCreated++

        # === ARCHIVO PREMIUM (v2-v7) ===
        $relativePath = $file.DirectoryName -replace [regex]::Escape("$PWD\src\content\questions"), ""
        $premiumDir = Join-Path $premiumRoot $relativePath

        if (-not (Test-Path $premiumDir)) {
            New-Item -ItemType Directory -Path $premiumDir -Force | Out-Null
        }

        $premiumFile = Join-Path $premiumDir ($file.BaseName -replace "-bundle", "-PREMIUM" + $file.Extension)

        # Crear frontmatter para archivo premium
        $premiumFrontmatter = @"
---
# === PREMIUM CONTENT ===
id: "$($file.BaseName -replace '-bundle', '')"
protocol_version: "2.0"
total_questions: 6  # v2-v7
license: "Proprietary - World Exams Inc."
commercial_use: true
access_level: "institutional"
requires_subscription: true

# Original metadata from bundle
# (Se hereda del archivo -PUBLIC.md)
---

# Bundle Premium

> ⚠️ **Contenido Comercial:** Estas preguntas solo están disponibles para instituciones con suscripción activa.

$premiumContent
"@

        $premiumFrontmatter | Out-File -FilePath $premiumFile -Encoding UTF8 -NoNewline
        $premiumCreated++

        Write-Host "✅ $($file.Name)" -ForegroundColor Green

    } catch {
        Write-Host "❌ Error procesando $($file.Name): $_" -ForegroundColor Red
        $errors++
    }
}

Write-Host ""
Write-Host "📊 Resumen:" -ForegroundColor Cyan
Write-Host "   Total bundles procesados: $totalBundles"
Write-Host "   Archivos PUBLIC creados:  $publicCreated" -ForegroundColor Green
Write-Host "   Archivos PREMIUM creados: $premiumCreated" -ForegroundColor Green
Write-Host "   Errores:                  $errors" -ForegroundColor $(if ($errors -gt 0) { "Red" } else { "Green" })

Write-Host ""
Write-Host "📁 Siguiente paso:" -ForegroundColor Yellow
Write-Host "   1. Revisar archivos en temp/premium-questions/"
Write-Host "   2. Crear repo privado: gh repo create iberi22/worldexams-premium --private"
Write-Host "   3. Mover contenido premium al nuevo repo"
Write-Host "   4. Actualizar .gitignore para ignorar *-bundle.md y *-PREMIUM.md"
Write-Host ""
