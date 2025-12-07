
param(
    [Parameter(Mandatory=$true)]
    [string]$InputPath,
    [string]$SourceUrl = "https://www.icfes.gov.co"
)

function Convert-LegacyToBundle {
    param($LegacyFile)

    $content = Get-Content $LegacyFile.FullName -Raw

    # Extract Frontmatter
    $frontmatter = @{}
    if ($content -match "(?ms)^---\s*(.*?)\s*---") {
        $yaml = $matches[1]
        $yaml -split "`n" | ForEach-Object {
            if ($_ -match "^([^:]+):\s*(.*)$") {
                $key = $matches[1].Trim()
                $value = $matches[2].Trim().Trim('"').Trim("'")
                $frontmatter[$key] = $value
            }
        }
    }

    # Extract Body (Question/Answer/Explanation)
    # This is rough parsing, assuming standard legacy format
    $body = $content -replace "(?ms)^---\s*.*?\s*---", ""

    # Basic cleanup of body
    $body = $body.Trim()

    # Generate New ID
    $oldId = $frontmatter["id"]
    if (-not $oldId) { $oldId = $LegacyFile.BaseName }
    $newIdBase = $oldId -replace "-v\d+$", "" # Strip version if exists

    # Generate Output Filename
    $outputName = "${newIdBase}-bundle.md"
    $outputDir = $LegacyFile.DirectoryName
    $outputPath = Join-Path $outputDir $outputName

    # Build New Frontmatter
    $sb = [System.Text.StringBuilder]::new()
    $sb.AppendLine("---")
    $sb.AppendLine("# === METADATA GLOBAL ===")
    $sb.AppendLine("id: `"$newIdBase`"")
    $sb.AppendLine("country: `"$($frontmatter['country'])`"")
    $sb.AppendLine("grado: $($frontmatter['grado'])")
    $sb.AppendLine("asignatura: `"$($frontmatter['asignatura'])`"")
    $sb.AppendLine("tema: `"$($frontmatter['tema'])`"")
    $sb.AppendLine("protocol_version: `"2.0`"")
    $sb.AppendLine("total_questions: 7")
    $sb.AppendLine("difficulty_distribution: `"1 original (Medium) + 2 Low + 2 Medium + 2 High`"")
    $sb.AppendLine("estado: `"draft`"")
    $sb.AppendLine("creador: `"Migrator-Script`"")
    $sb.AppendLine("generation_date: `"$(Get-Date -Format 'yyyy-MM-dd')`"")
    $sb.AppendLine("")
    $sb.AppendLine("# === SOURCE ATTRIBUTION ===")
    $sb.AppendLine("source_url: `"$SourceUrl`"")
    $sb.AppendLine("source_license: `"CC BY-SA 4.0`"")
    $sb.AppendLine("---")
    $sb.AppendLine("")
    $sb.AppendLine("# Pregunta Base: Adaptado de Legacy")
    $sb.AppendLine("")
    $sb.AppendLine("> **Nota:** Migrado automáticamente de v1.0")
    $sb.AppendLine("")
    $sb.AppendLine("---")
    $sb.AppendLine("")

    # Q1: The Original (Legacy)
    $sb.AppendLine("## Pregunta 1 (Original - Dificultad Medium)")
    $sb.AppendLine("")
    $sb.AppendLine("**ID:** `"${newIdBase}-v1`"")
    $sb.AppendLine("")
    $sb.AppendLine("### Enunciado")
    $sb.AppendLine("")
    $sb.AppendLine($body)
    $sb.AppendLine("")
    $sb.AppendLine("### Explicación Pedagógica")
    $sb.AppendLine("")
    $sb.AppendLine("*(Contenido migrado, favor revisar)*")
    $sb.AppendLine("")
    $sb.AppendLine("---")
    $sb.AppendLine("")

    # Generate placeholders for Q2-Q7
    2..7 | ForEach-Object {
        $i = $_
        $diff = if ($i -le 3) { "Low" } elseif ($i -le 5) { "Medium" } else { "High" }
        $type = if ($i -eq 2) { "Low A" } elseif ($i -eq 3) { "Low B" } elseif ($i -eq 4) { "Medium A" } elseif ($i -eq 5) { "Medium B" } elseif ($i -eq 6) { "High A" } else { "High B" }

        $sb.AppendLine("## Pregunta $i ($type - Dificultad $diff)")
        $sb.AppendLine("")
        $sb.AppendLine("**ID:** `"${newIdBase}-v$i`"")
        $sb.AppendLine("")
        $sb.AppendLine("### Enunciado")
        $sb.AppendLine("")
        $sb.AppendLine("TODO: Generar variación de tipo $type")
        $sb.AppendLine("")
        $sb.AppendLine("### Opciones")
        $sb.AppendLine("")
        $sb.AppendLine("- [ ] A) Opción 1")
        $sb.AppendLine("- [ ] B) Opción 2")
        $sb.AppendLine("- [ ] C) Opción 3")
        $sb.AppendLine("- [ ] D) Opción 4")
        $sb.AppendLine("")
        $sb.AppendLine("### Explicación Pedagógica")
        $sb.AppendLine("")
        $sb.AppendLine("TODO: Explicación pendiente")
        $sb.AppendLine("")
        $sb.AppendLine("---")
        $sb.AppendLine("")
    }

    # Validation Table
    $sb.AppendLine("## Metadata de Validacion")
    $sb.AppendLine("")
    $sb.AppendLine("| Pregunta | ID | Dificultad | Validado |")
    $sb.AppendLine("|----------|-----|------------|----------|")
    1..7 | ForEach-Object {
        $diff = if ($_ -le 1) { "Medium" } elseif ($_ -le 3) { "Low" } elseif ($_ -le 5) { "Medium" } else { "High" } # Q1 is orig(Mid), Q2(Low), Q3(Low), etc... simplified
        $sb.AppendLine("| $_ | ${newIdBase}-v$_ | $diff | ⬜ |")
    }

    $sb.ToString() | Set-Content -Path $outputPath -Encoding UTF8
    Write-Host "Created Bundle: $outputName" -ForegroundColor Green

    # Optional: Rename original to avoid confusion? Or user cleans up later?
    # Plan says "Cleanup: Remove legacy files after migration", so we leave them for now.
}

if (Test-Path $InputPath -PathType Container) {
    Write-Host "Processing directory: $InputPath"
    $files = Get-ChildItem -Path "$InputPath\*.md" | Where-Object { $_.Name -notlike "*-bundle.md" }

    # Force array
    if ($files -isnot [array]) { $files = @($files) }

    Write-Host "Found $($files.Count) files."
    foreach ($f in $files) {
        if ($f) {
            Write-Host "Processing file: $($f.Name)"
            Convert-LegacyToBundle -LegacyFile $f
        }
    }
} elseif (Test-Path $InputPath -PathType Leaf) {
    Write-Host "Processing single file: $InputPath"
    Convert-LegacyToBundle -LegacyFile (Get-Item $InputPath)
} else {
    Write-Error "Invalid path: $InputPath"
}
