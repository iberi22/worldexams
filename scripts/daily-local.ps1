<#
.SYNOPSIS
    Generador Local de Preguntas Diarias (Protocolo V2.0)
    Usa la lógica de rotación y genera archivos bundle.
.DESCRIPTION
    Este script determina qué país y categoría tocan hoy,
    construye el Prompt del Protocolo V2.0,
    y genera un archivo plantilla listo para ser llenado por la IA.
#>

$Date = Get-Date
$DayOfWeek = $Date.DayOfWeek.value__ # 1=Mon, 5=Fri

# 1. Lógica de Rotación
switch ($DayOfWeek) {
    1 { $Country="CO"; $Category="matematicas"; $Lang="es"; $Exam="Saber 11" }
    2 { $Country="MX"; $Category="ciencias"; $Lang="es"; $Exam="EXANI-II" }
    3 { $Country="BR"; $Category="historia"; $Lang="pt"; $Exam="ENEM" }
    4 { $Country="US"; $Category="geography"; $Lang="en"; $Exam="SAT" }
    5 { $Country="CO"; $Category="informatica"; $Lang="es"; $Exam="Saber 11" } # Viernes
    6 { $Country="MX"; $Category="conocimiento_general"; $Lang="es"; $Exam="EXANI-II" }
    7 { $Country="BR"; $Category="matematicas"; $Lang="pt"; $Exam="ENEM" }
    default { $Country="CO"; $Category="varios"; $Lang="es"; $Exam="Saber 11" }
}

Write-Host "📅 Hoy es: $Date" -ForegroundColor Cyan
Write-Host "🎯 Objetivo: $Country - $Category ($Exam)" -ForegroundColor Yellow

# 2. Configuración de Rutas
$BasePath = "saberparatodos/src/content/questions"
if ($Country -eq "MX") { $BasePath = "exani-mx/src/content/questions" }
if ($Country -eq "BR") { $BasePath = "enem-br/src/content/questions" }
if ($Country -eq "US") { $BasePath = "sat-us/src/content/questions" }

$TargetDir = Join-Path $BasePath "$Category/grado-11"
if (!(Test-Path $TargetDir)) {
    New-Item -ItemType Directory -Force -Path $TargetDir | Out-Null
}

# 3. Generar Prompt V2.0
$Prompt = @"
ACT AS: Expert Question Designer for $Exam ($Country).
PROTOCOL: V2.0 (7-Item Bundle).

TASK:
Create a question bundle file about '$Category' suitable for Grade 11.
Context: Use local currency, names, and cities for $Country.

OUTPUT FORMAT (Markdown):
File Name: ${Country}-${Category}-11-topic-001-bundle.md

CONTENT:
Generate 7 questions based on a single key concept (Seed):
1. [ORIG] Original (Diff 3): The core concept.
2. [EASY-A] (Diff 1): Simplified recall.
3. [EASY-B] (Diff 1): Simple application.
4. [MED-A] (Diff 3): Standard problem solving.
5. [MED-B] (Diff 3): Analysis/Comparison.
6. [HARD-A] (Diff 5): Complex scenario.
7. [HARD-B] (Diff 5): Multistep reasoning.

METADATA REQUIRED:
protocol_version: "2.0"
competencia: [Skill]
componente: [Area]
explanation: [Rich text with distractor analysis]
"@

Write-Host "`n📋 Prompt generado (Copiado al portapapeles... simulado):" -ForegroundColor Green
Write-Host $Prompt -ForegroundColor Gray

# 4. (Opcional) Llamar a gh copilot si está disponible para sugerir contenido
# gh copilot suggest "$Prompt"

Write-Host "`n✅ Archivo destino preparado en: $TargetDir"
