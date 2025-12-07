
$colombiaPath = "e:\scripts-python\worldexams\src\content\questions\colombia"
$files = Get-ChildItem -Path $colombiaPath -Recurse -Filter "*.md"

$report = @()
$totalFiles = 0
$readyFiles = 0
$legacyFiles = 0
$errorFiles = 0

foreach ($file in $files) {
    $totalFiles++
    $content = Get-Content $file.FullName -Raw
    $isBundle = $file.Name.EndsWith("-bundle.md")

    $status = "UNKNOWN"
    $issues = @()

    if (-not $isBundle) {
        $status = "LEGACY"
        $legacyFiles++
        $issues += "Not a bundle file (legacy name)"
    } else {
        # Check Frontmatter
        if ($content -match "protocol_version:\s*[`"']?2.0[`"']?") {
            # Check for source_url
            if ($content -notmatch "source_url:") {
                $status = "INCOMPLETE"
                $issues += "Missing source_url"
            }

            # Check question count (rough count of "## Pregunta")
            $questionCount = ([regex]::Matches($content, "## Pregunta")).Count
            if ($questionCount -ne 7) {
                $status = "INCOMPLETE"
                $issues += "Has $questionCount questions (expected 7)"
            }

             # Check cultural context (simple keyword check)
             if ($content -notmatch "COP" -and $content -notmatch "Pesos" -and $content -notmatch "Bogotá" -and $content -notmatch "Medellín" -and $content -notmatch "Cali" -and $content -notmatch "Colombia") {
                $issues += "Potential missing cultural context (keywords not found)"
             }

            if ($issues.Count -eq 0) {
                $status = "READY"
                $readyFiles++
            } else {
                $status = "NEEDS_FIX"
                $errorFiles++
            }
        } else {
            $status = "LEGACY_CONTENT"
            $issues += "Old protocol version or missing frontmatter"
            $errorFiles++
        }
    }

    $report += [PSCustomObject]@{
        File = $file.Name
        Path = $file.Directory.Name # Subfolder (subject)
        Status = $status
        Issues = $issues -join "; "
    }
}

$report | Group-Object Status | Select-Object Name, Count | Format-Table -AutoSize
$report | Where-Object { $_.Status -ne "READY" } | Format-Table -AutoSize

Write-Host "Total Files: $totalFiles"
Write-Host "Ready Files: $readyFiles"
Write-Host "Legacy Files: $legacyFiles"
Write-Host "Error/Fix Files: $errorFiles"
