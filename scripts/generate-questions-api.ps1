<#
.SYNOPSIS
    Generates a Granular JSON API directory structure for exam questions.
.DESCRIPTION
    Scans all bundle markdown files, organizes questions by Country > Exam > Grade > Subject,
    and generates paginated JSON files (max 100 questions per file).
.OUTPUTS
    Creates structure: api/{country}/{exam}/{grade}/{subject}/{page}.json
#>

param(
    [string]$QuestionsPath = "e:\scripts-python\worldexams\src\content\questions",
    [string]$OutputPath = "e:\scripts-python\worldexams\api"
)

# Function to sanitize filenames (remove accents, spaces to underscores, lowercase)
function Get-SanitizedName {
    param ([string]$InputString)
    $normalized = $InputString.Normalize([System.Text.NormalizationForm]::FormD)
    $builder = New-Object System.Text.StringBuilder
    foreach ($c in $normalized.ToCharArray()) {
        if ([System.Globalization.CharUnicodeInfo]::GetUnicodeCategory($c) -ne [System.Globalization.UnicodeCategory]::NonSpacingMark) {
            [void]$builder.Append($c)
        }
    }
    $ascii = $builder.ToString()
    # Replace spaces with underscores, remove non-alphanumeric (except underscore/dash), to lowercase
    return ($ascii -replace '\s+', '_' -replace '[^a-zA-Z0-9_\-]', '').ToLower()
}

# Clear existing API output (except if it's the root folder itself, just content)
if (Test-Path $OutputPath) {
    Get-ChildItem -Path $OutputPath -Exclude ".gitkeep" | Remove-Item -Recurse -Force
} else {
    New-Item -ItemType Directory -Path $OutputPath -Force | Out-Null
}

$bundles = Get-ChildItem -Path $QuestionsPath -Recurse -Filter "*-bundle.md"

# Hashtable to hold questions grouped by the hierarchy
# Structure: $groupedQuestions["country|exam|grade|sanitizedSubject"] = @(questions list)
$groupedQuestions = @{}
# Metadata store to keep track of real subject names
$categoryMetadata = @{}

Write-Host "Scanning $($bundles.Count) bundles..."

foreach ($file in $bundles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8

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

    $country = if ($frontmatter["country"]) { $frontmatter["country"] } else { "unknown" }
    $grade = if ($frontmatter["grado"]) { $frontmatter["grado"] } else { "unknown" }
    $subject = if ($frontmatter["asignatura"]) { $frontmatter["asignatura"] } else { "unknown" }
    $bundleId = if ($frontmatter["id"]) { $frontmatter["id"] } else { $file.BaseName }
    $sourceUrl = $frontmatter["source_url"]

    # Determine Exam Type
    $exam = "standard"
    if ($country -eq "co") { $exam = "icfes" }

    $sanitizedSubject = Get-SanitizedName -InputString $subject
    $groupKey = "$country|$exam|$grade|$sanitizedSubject"

    # Store clean name for metadata if needed later
    if (-not $categoryMetadata.ContainsKey($groupKey)) {
        $categoryMetadata[$groupKey] = @{
            country = $country
            exam = $exam
            grade = $grade
            subject = $subject
        }
    }

    # Extract Questions using Split - Robust against multiline regex issues
    # Matches '## Pregunta' at start of line
    $chunks = $content -split "(?m)^##\s+Pregunta\s+"

    # Skip the first chunk (frontmatter + intro)
    for ($i = 1; $i -lt $chunks.Count; $i++) {
        $chunk = $chunks[$i]

        # Stops at Metadata or next section if any
        if ($chunk -match "(?m)^##\s+Metadata") {
            $chunk = ($chunk -split "(?m)^##\s+Metadata")[0]
        }

        # Parse First Line: "1 (Original - Dificultad Medium)"
        $lines = $chunk -split "\r?\n"
        $firstLine = $lines[0].Trim()

        $questionNum = "0"
        $difficulty = "Medium"

        if ($firstLine -match "^(\d+)\s*\(([^)]+)\)") {
            $questionNum = $matches[1]
            $diffInfo = $matches[2]
            if ($diffInfo -match "Dificultad (Low|Medium|High)") {
                $difficulty = $matches[1]
            }
        }

        # State Machine parsing for body
        $statementLines = @()
        $options = @()
        $correctAnswer = ""
        $parseState = "NONE"

        foreach ($line in $lines | Select-Object -Skip 1) {
            $trimmed = $line.Trim()

            # Detect Section Headers
            if ($trimmed -match "^#+\s*Enunciado") {
                $parseState = "ENUNCIADO"
                continue
            }
            if ($trimmed -match "^#+\s*Opciones") {
                $parseState = "OPCIONES"
                continue
            }
            if ($trimmed -match "^#+\s*Explicación") {
                $parseState = "NONE"
                continue
            }

            # Capture Content based on State
            if ($parseState -eq "ENUNCIADO") {
                    $options += @{
                        letter = $optLetter
                        text = $optText
                        is_correct = $isCorrect
                    }
                    if ($isCorrect) { $correctAnswer = $optLetter }
                }
            }
        }

        $statement = $statementLines -join "`n"

        # Add to group
        if (-not $groupedQuestions.ContainsKey($groupKey)) {
            $groupedQuestions[$groupKey] = @()
        }

        $groupedQuestions[$groupKey] += @{
            id = "$bundleId-v$questionNum"
            bundle_id = $bundleId
            number = [int]$questionNum
            difficulty = $difficulty
            statement = $statement
            options = $options
            correct_answer = $correctAnswer
            source_url = $sourceUrl
        }
    }
}

# Generate Output Files
Write-Host "Generating API files..."
foreach ($key in $groupedQuestions.Keys) {
    $parts = $key -split "\|"
    $country = $parts[0]
    $exam = $parts[1]
    $grade = $parts[2]
    $subj = $parts[3]

    $targetDir = Join-Path $OutputPath "$country\$exam\$grade\$subj"
    if (-not (Test-Path $targetDir)) {
        New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
    }

    $allQuestions = $groupedQuestions[$key]
    $totalQuestions = $allQuestions.Count
    $pageSize = 100
    $totalPages = [Math]::Ceiling($totalQuestions / $pageSize)

    Write-Host "  -> $country/$exam/$grade/$subj : $totalQuestions questions ($totalPages pages)"

    for ($i = 0; $i -lt $totalPages; $i++) {
        $skip = $i * $pageSize
        $chunk = $allQuestions | Select-Object -Skip $skip -First $pageSize

        $pageData = @{
            metadata = @{
                country = $country
                exam = $exam
                grade = $grade
                subject = $categoryMetadata[$key].subject
                total_questions = $totalQuestions
                page = $i + 1
                total_pages = $totalPages
                generated_at = (Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ")
            }
            questions = $chunk
        }

        $jsonFile = Join-Path $targetDir "$($i + 1).json"

        $jsonContent = $pageData | ConvertTo-Json -Depth 10
        $jsonContent | Set-Content -Path $jsonFile -Encoding UTF8
    }
}

Write-Host "Done."
