
<#
.SYNOPSIS
    Generates a JSON API file containing all question bundles for public consumption.
.DESCRIPTION
    Scans all bundle markdown files and extracts questions to create a structured JSON API
    that can be consumed by external exam applications.
.OUTPUTS
    Creates api/questions.json with all questions organized by country, subject, grade, and topic.
#>

param(
    [string]$QuestionsPath = "e:\scripts-python\worldexams\src\content\questions",
    [string]$OutputPath = "e:\scripts-python\worldexams\api\questions.json"
)

# Ensure output directory exists
$outputDir = Split-Path $OutputPath -Parent
if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
}

$bundles = Get-ChildItem -Path $QuestionsPath -Recurse -Filter "*-bundle.md"

$questionsApi = @{
    version = "1.0"
    generated_at = (Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ")
    total_bundles = $bundles.Count
    total_questions = 0
    countries = @{}
}

foreach ($file in $bundles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8

    # Extract frontmatter
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

    $country = $frontmatter["country"] ?? "unknown"
    $asignatura = $frontmatter["asignatura"] ?? "unknown"
    $grado = $frontmatter["grado"] ?? "unknown"
    $tema = $frontmatter["tema"] ?? "unknown"
    $bundleId = $frontmatter["id"] ?? $file.BaseName

    # Initialize nested structure if needed
    if (-not $questionsApi.countries.ContainsKey($country)) {
        $questionsApi.countries[$country] = @{
            subjects = @{}
        }
    }
    if (-not $questionsApi.countries[$country].subjects.ContainsKey($asignatura)) {
        $questionsApi.countries[$country].subjects[$asignatura] = @{
            grades = @{}
        }
    }
    if (-not $questionsApi.countries[$country].subjects[$asignatura].grades.ContainsKey($grado)) {
        $questionsApi.countries[$country].subjects[$asignatura].grades[$grado] = @{
            topics = @{}
        }
    }
    if (-not $questionsApi.countries[$country].subjects[$asignatura].grades[$grado].topics.ContainsKey($tema)) {
        $questionsApi.countries[$country].subjects[$asignatura].grades[$grado].topics[$tema] = @{
            bundles = @()
        }
    }

    # Extract individual questions from bundle
    $questions = @()
    $questionMatches = [regex]::Matches($content, "(?ms)## Pregunta (\d+) \(([^)]+)\).*?(?=## Pregunta \d+|## Metadata|$)")

    foreach ($match in $questionMatches) {
        $questionNum = $match.Groups[1].Value
        $diffInfo = $match.Groups[2].Value
        $questionContent = $match.Value

        # Extract difficulty level
        $difficulty = "Medium"
        if ($diffInfo -match "Dificultad (Low|Medium|High)") {
            $difficulty = $matches[1]
        }

        # Extract statement
        $statement = ""
        if ($questionContent -match "(?ms)### Enunciado\s*\n(.*?)(?=### Opciones|$)") {
            $statement = $matches[1].Trim()
        }

        # Extract options
        $options = @()
        $correctAnswer = ""
        $optionMatches = [regex]::Matches($questionContent, "- \[([ x])\] ([A-D])\) (.+)")
        foreach ($opt in $optionMatches) {
            $isCorrect = $opt.Groups[1].Value -eq "x"
            $letter = $opt.Groups[2].Value
            $text = $opt.Groups[3].Value
            $options += @{
                letter = $letter
                text = $text
                is_correct = $isCorrect
            }
            if ($isCorrect) { $correctAnswer = $letter }
        }

        $questions += @{
            id = "$bundleId-v$questionNum"
            number = [int]$questionNum
            difficulty = $difficulty
            statement = $statement
            options = $options
            correct_answer = $correctAnswer
        }
    }

    $bundle = @{
        id = $bundleId
        file = $file.Name
        source_url = $frontmatter["source_url"]
        source_license = $frontmatter["source_license"]
        protocol_version = $frontmatter["protocol_version"]
        total_questions = $questions.Count
        questions = $questions
    }

    $questionsApi.countries[$country].subjects[$asignatura].grades[$grado].topics[$tema].bundles += $bundle
    $questionsApi.total_questions += $questions.Count
}

# Convert to JSON and save
$json = $questionsApi | ConvertTo-Json -Depth 20
$json | Set-Content -Path $OutputPath -Encoding UTF8

Write-Host "Generated: $OutputPath"
Write-Host "Total Bundles: $($questionsApi.total_bundles)"
Write-Host "Total Questions: $($questionsApi.total_questions)"
