param(
    [Parameter(Mandatory=$true)]
    [string]$Text,
    [Parameter(Mandatory=$true)]
    [string]$OutputFile
)

Add-Type -AssemblyName System.Speech

$speech = New-Object System.Speech.Synthesis.SpeechSynthesizer

# Select Spanish voice if available
$spanishVoice = $speech.GetInstalledVoices() | Where-Object {
    $_.VoiceInfo.Culture.Name -like "es-*"
} | Select-Object -First 1

if ($spanishVoice) {
    $speech.SelectVoice($spanishVoice.VoiceInfo.Name)
} else {
    Write-Warning "No Spanish voice found, using default"
}

$speech.SetOutputToWaveFile($OutputFile)
$speech.Speak($Text)
$speech.Dispose()

Write-Output "TTS generated: $OutputFile"
