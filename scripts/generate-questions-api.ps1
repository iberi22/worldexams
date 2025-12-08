<#
.SYNOPSIS
    Generates a Granular JSON API directory structure for exam questions (v1).
.DESCRIPTION
    Scans all bundle markdown files, organizes questions by Country > Exam > Grade > Subject,
    and generates paginated JSON files (max 100 questions per file) plus an index.json summary.
.OUTPUTS
    Creates structure: api/v1/{country}/{exam}/{grade}/{subject}/{page}.json
#>

param(
    [string]$QuestionsPath = "e:\scripts-python\worldexams\src\content\questions",
    [string]$OutputPath = "e:\scripts-python\worldexams\api",
    [string]$ApiVersion = "v1"
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

$VersionedOutputPath = Join-Path $OutputPath $ApiVersion

# Clear existing API output for this version
if (Test-Path $VersionedOutputPath) {
    Get-ChildItem -Path $VersionedOutputPath -Recurse | Remove-Item -Recurse -Force
} else {
    New-Item -ItemType Directory -Path $VersionedOutputPath -Force | Out-Null
}

$bundles = Get-ChildItem -Path $QuestionsPath -Recurse -Filter "*-bundle.md"

# Hashtable to hold questions grouped by the hierarchy
# Structure: $groupedQuestions["country|exam|grade|sanitizedSubject"] = @(questions list)
$groupedQuestions = @{}
# Metadata store to keep track of real subject names and other aggregate data
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
    $timeLimit = if ($frontmatter["time_limit"]) { [int]$frontmatter["time_limit"] } else { 0 }

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
            total_time_limit = 0
            topics = @()
        }
    }

    # Aggregate time limit (simple sum for now, or max? usually sum for a bank makes no sense, but for a subject yes)
    # Let's assume time_limit is per bundle, we might want to just track unique ones or max.
    # For now, let's just keep track of it.

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
        $explanationLines = @()
        $correctAnswer = ""
        $parseState = "NONE"

        # Temporary vars for options parsing
        $optLetter = ""
        $optText = ""
        $isCorrect = $false

        # Tags/Topics parsing (look for tags: [A, B] in metadata lines inside chunk?)
        # Current format doesn't fully standardize question-level tags in markdown body easily without a specific marker.
        # We will assume tags might come from bundle metadata for now, OR valid markdown metadata block if it existed.
        # Implementation Plan said "Questions contain tags if present".
        # Let's try to find "Dimensions" or "Topics" if they exist in the text or just use bundle level.
        # For this iteration, we'll extract images from statement.

        $images = @()

        foreach ($line in $lines | Select-Object -Skip 1) {
            $trimmed = $line.Trim()
            if ([string]::IsNullOrWhiteSpace($trimmed)) { continue }

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
                $parseState = "EXPLICACION"
                continue
            }

            # Capture Content based on State
            if ($parseState -eq "ENUNCIADO") {
                $statementLines += $line
                # Basic Image Extraction: ![alt](url)
                if ($line -match "!\[(.*?)\]\((.*?)\)") {
                   $images += @{
                       alt = $matches[1]
                       url = $matches[2]
                   }
                }
            }
            elseif ($parseState -eq "EXPLICACION") {
                $explanationLines += $line
            }
            elseif ($parseState -eq "OPCIONES") {
                # Format: - [ ] A) Text
                # Regex: ^-\s*\[([ xX])\]\s*([A-Z])\)\s*(.*)$
                if ($trimmed -match "^-\s*\[([ xX])\]\s*([A-Z])\)\s*(.*)$") {
                    $mMark = $matches[1]
                    $mLetter = $matches[2]
                    $mText = $matches[3]

                    $isCorrect = ($mMark -match "[xX]")
                    $optLetter = $mLetter
                    $optText = $mText

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
        $explanation = $explanationLines -join "`n"

        # Add to group
        if (-not $groupedQuestions.ContainsKey($groupKey)) {
            $groupedQuestions[$groupKey] = @()
        }

        # Collect unique topics/tags from bundle to subject metadata (simple approach)
        # If we had question level tags we would add them here.

        $questionObj = @{
            id = "$bundleId-v$questionNum"
            bundle_id = $bundleId
            number = [int]$questionNum
            difficulty = $difficulty
            statement = $statement
            options = $options
            correct_answer = $correctAnswer
            source_url = $sourceUrl
            explanation = $explanation
            images = $images
            tags = @() # Placeholder for future granular extraction
        }

        $groupedQuestions[$groupKey] += $questionObj
    }
}

# Generate Output Files
Write-Host "Generating API ($ApiVersion) files..."
foreach ($key in $groupedQuestions.Keys) {
    $parts = $key -split "\|"
    $country = $parts[0]
    $exam = $parts[1]
    $grade = $parts[2]
    $subj = $parts[3]

    $targetDir = Join-Path $VersionedOutputPath "$country\$exam\$grade\$subj"
    if (-not (Test-Path $targetDir)) {
        New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
    }

    $allQuestions = $groupedQuestions[$key]
    $totalQuestions = $allQuestions.Count
    $pageSize = 100
    $totalPages = [Math]::Ceiling($totalQuestions / $pageSize)

    Write-Host "  -> $country/$exam/$grade/$subj : $totalQuestions questions ($totalPages pages)"

    # Generate Pages
    $pagesMeta = @()
    for ($i = 0; $i -lt $totalPages; $i++) {
        $skip = $i * $pageSize
        $chunk = $allQuestions | Select-Object -Skip $skip -First $pageSize
        $pageFileName = "$($i + 1).json"

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

        $jsonFile = Join-Path $targetDir $pageFileName
        $jsonContent = $pageData | ConvertTo-Json -Depth 10
        $jsonContent | Set-Content -Path $jsonFile -Encoding UTF8

        $pagesMeta += @{
            page = $i + 1
            url = $pageFileName
        }
    }

    # Generate index.json
    $indexData = @{
        subject = $categoryMetadata[$key].subject
        total_questions = $totalQuestions
        total_pages = $totalPages
        time_limit_minutes = 120 # Default or aggregated
        topics = $categoryMetadata[$key].topics
        pages = $pagesMeta
        generated_at = (Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ")
    }

    $indexFile = Join-Path $targetDir "index.json"
    $indexData | ConvertTo-Json -Depth 5 | Set-Content -Path $indexFile -Encoding UTF8
}

Write-Host "Done."
