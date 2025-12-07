
$bundles = Get-ChildItem -Path "e:\scripts-python\worldexams\src\content\questions\colombia" -Recurse -Filter "*-bundle.md"

foreach ($file in $bundles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8

    # 1. Add difficulty_distribution if missing
    if ($content -notmatch "difficulty_distribution:") {
        $content = $content -replace "(total_questions: 7)", "`$1`r`ndifficulty_distribution: `"1 original (Medium) + 2 Low + 2 Medium + 2 High`""
    }

    # 2. Update Frontmatter global difficulty (3 -> Medium)
    $content = $content -replace "dificultad: 3", "dificultad: `"Medium`""

    # 3. Update Headers - handle both properly encoded and corrupted encoding
    $content = $content -replace "\(Original - Dificultad 3\)", "(Original - Dificultad Medium)"
    $content = $content -replace "\(Fácil ([AB]) - Dificultad [12]\)", "(Low `$1 - Dificultad Low)"
    $content = $content -replace "\(FÃ¡cil ([AB]) - Dificultad [12]\)", "(Low `$1 - Dificultad Low)"
    $content = $content -replace "\(Media ([AB]) - Dificultad 3\)", "(Medium `$1 - Dificultad Medium)"
    $content = $content -replace "\(Difícil ([AB]) - Dificultad [45]\)", "(High `$1 - Dificultad High)"
    $content = $content -replace "\(DifÃ­cil ([AB]) - Dificultad [45]\)", "(High `$1 - Dificultad High)"

    # 4. Update Validation Table
    $content = $content -replace "\| 1 \| (.*?) \| 3 \|", "| 1 | `$1 | Medium |"
    $content = $content -replace "\| ([23]) \| (.*?) \| [12] \|", "| `$1 | `$2 | Low |"
    $content = $content -replace "\| ([45]) \| (.*?) \| 3 \|", "| `$1 | `$2 | Medium |"
    $content = $content -replace "\| ([67]) \| (.*?) \| [45] \|", "| `$1 | `$2 | High |"

    $content | Set-Content -Path $file.FullName -Encoding UTF8 -NoNewline
    Write-Host "Updated: $($file.Name)"
}
