# test-tts.ps1
param([string[]]$Text)
$ErrorActionPreference = "Continue"
$PROJECT_ROOT = "E:/scripts-python/worldexams/saberparatodos"
$OUTPUT_DIR   = Join-Path $PROJECT_ROOT "tutorial-video"
$OUT_FILE     = Join-Path $OUTPUT_DIR "narration-test.mp3"

if ($Text) { $WORKING_TEXT = $Text -join " " }
else { $WORKING_TEXT = "Resolvamos este problema de numeros irracionales en tres pasos simples" }

Write-Host "=== WorldExams TTS Test ===" -ForegroundColor Cyan
Write-Host ("Text  : " + $WORKING_TEXT)
Write-Host ("Output: " + $OUT_FILE)
Write-Host ""

# === Edge TTS ===
Write-Host "[1/4] Edge TTS" -ForegroundColor Magenta
$edgeCmd = $null
try { $edgeCmd = (Get-Command edge-tts -ErrorAction SilentlyContinue).Source } catch {}
if (-not $edgeCmd) {
    $pyRoot = Split-Path (Get-Command python -ErrorAction SilentlyContinue).Source -Parent
    $edgeExe = Join-Path $pyRoot "edge-tts.exe"
    if (Test-Path $edgeExe) { $edgeCmd = $edgeExe }
}
if ($edgeCmd) {
    $qq = [char]34
    $a  = @("-v","es-CO-SalomeNeural","-t",$WORKING_TEXT,"--write-media",$OUT_FILE)
    $p  = Start-Process -FilePath $edgeCmd -ArgumentList $a -Wait -PassThru -NoNewWindow
    if ($p.ExitCode -eq 0 -and (Test-Path $OUT_FILE)) {
        $sz = [math]::Round((Get-Item $OUT_FILE).Length / 1KB, 1)
        Write-Host ("  [OK] Edge TTS -- " + $OUT_FILE + " (" + $sz + " KB)") -ForegroundColor Green
        exit 0
    }
} else {
    Write-Host "  [SKIP] edge-tts not found" -ForegroundColor Yellow
}

# === XTTS v2 ===
Write-Host "[2/4] XTTS v2" -ForegroundColor Magenta
$python   = "E:\voice-cloning\xtts-venv\Scripts\python.exe"
$refAudio = "E:/voice-cloning/bela-voice/processed/file_4---aa5f27d8-5cea-4912-987a-ae8785d3afc4.wav"
if (Test-Path $python) {
    if (Test-Path $refAudio) {
        $pyLines = @(
            "import os,scipy.io.wavfile as wavfile,numpy as np",
            "os.environ[" + [char]39 + "TTS_ACCEPT_LICENSE" + [char]39 + "]=" + [char]39 + "yes" + [char]39 + "",
            "from TTS.api import TTS",
            "tts=TTS(" + [char]34 + "xtts_v2" + [char]34 + ")",
            "wav=tts.tts(text=" + [char]34 + $WORKING_TEXT + [char]34 + ",speaker_wav=r" + [char]34 + $refAudio + [char]34 + ",language=" + [char]34 + "es" + [char]34 + ")",
            "if isinstance(wav,list): wav=numpy.array(wav[0],dtype=numpy.float32)",
            "else: wav=numpy.array(wav,dtype=numpy.float32)",
            "scipy.io.wavfile.write(" + [char]34 + $OUT_FILE + [char]34 + ",24000,wav)",
            "print(" + [char]34 + "XTTS OK" + [char]34 + ")"
        )
        $pyCode = $pyLines -join "
"
        $tmp = Join-Path $env:TEMP ("xtts_t_" + (Get-Random) + ".py")
        [System.IO.File]::WriteAllText($tmp, $pyCode, [System.Text.Encoding]::UTF8) | Out-Null
        $p = Start-Process -FilePath $python -ArgumentList $tmp -Wait -PassThru -NoNewWindow
        Remove-Item $tmp -ErrorAction SilentlyContinue
        if ($p.ExitCode -eq 0 -and (Test-Path $OUT_FILE)) {
            $sz = [math]::Round((Get-Item $OUT_FILE).Length / 1KB, 1)
            Write-Host ("  [OK] XTTS v2 -- " + $OUT_FILE + " (" + $sz + " KB)") -ForegroundColor Green
            exit 0
        } else {
            Write-Host "  [SKIP] XTTS v2 failed (Python 3.14 compat)" -ForegroundColor Yellow
        }
    } else {
        Write-Host "  [SKIP] Reference audio not found" -ForegroundColor Yellow
    }
} else {
    Write-Host "  [SKIP] xtts-venv not found" -ForegroundColor Yellow
}

# === ElevenLabs API ===
Write-Host "[3/4] ElevenLabs API" -ForegroundColor Magenta
$apiKey = $env:ELEVENLABS_API_KEY
if (-not $apiKey) {
    foreach ($ef in @("E:\voice-cloning\.env","E:\scripts-python\worldexams\saberparatodos\.env.swal.local","E:\scripts-python\worldexams\saberparatodos\.env.local")) {
        if (Test-Path $ef) {
            $c = Get-Content $ef -Raw
            if ($c -match "ELEVENLABS_API_KEY\s*=\s*(.+)") { $apiKey = $matches[1].Trim(); break }
        }
    }
}
if ($apiKey) {
    $body = @{text=$WORKING_TEXT;model_id="eleven_multilingual_v2";voice_settings=@{stability=0.5;similarity_boost=0.8;style=0.0;use_speaker_boost=$true}} | ConvertTo-Json -Compress
    $hdrs = @{"xi-api-key"=$apiKey;"Content-Type"="application/json";"Accept"="audio/mpeg"}
    try {
        Invoke-WebRequest -Uri "https://api.elevenlabs.io/v1/text-to-speech/pFZIDoTGsMf2q9K3lG7e" -Method POST -Headers $hdrs -Body $body -TimeoutSec 60 -OutFile $OUT_FILE | Out-Null
        if ((Test-Path $OUT_FILE) -and (Get-Item $OUT_FILE).Length -gt 5000) {
            $sz = [math]::Round((Get-Item $OUT_FILE).Length / 1KB, 1)
            Write-Host ("  [OK] ElevenLabs -- " + $OUT_FILE + " (" + $sz + " KB)") -ForegroundColor Green
            exit 0
        }
    } catch {
        Write-Host ("  [SKIP] ElevenLabs error: " + $_.Exception.Message) -ForegroundColor Yellow
    }
} else {
    Write-Host "  [SKIP] No API key found" -ForegroundColor Yellow
}

# === System.Speech fallback ===
Write-Host "[4/4] System.Speech" -ForegroundColor Magenta
try {
    Add-Type -AssemblyName System.Speech
    $syn = New-Object System.Speech.Synthesis.SpeechSynthesizer
    $wavOut = $OUT_FILE -replace "\.mp3$",".wav"
    $syn.SetOutputToWaveFile($wavOut)
    $syn.Speak($WORKING_TEXT) | Out-Null
    $syn.Dispose()
    if (Test-Path $wavOut) {
        $ffmpeg = Get-Command ffmpeg -ErrorAction SilentlyContinue
        if ($ffmpeg) {
            Start-Process -FilePath $ffmpeg.Source -ArgumentList @("-y","-i",$wavOut,"-b:a","128k",$OUT_FILE) -Wait -NoNewWindow | Out-Null
            Remove-Item $wavOut -ErrorAction SilentlyContinue
        } else {
            $OUT_FILE = $wavOut
        }
        $sz = [math]::Round((Get-Item $OUT_FILE).Length / 1KB, 1)
        Write-Host ("  [OK] System.Speech -- " + $OUT_FILE + " (" + $sz + " KB)") -ForegroundColor Green
        exit 0
    }
} catch {
    Write-Host ("  [FAIL] System.Speech: " + $_) -ForegroundColor Red
}

Write-Host ""
Write-Host "=== ALL ENGINES FAILED ===" -ForegroundColor Red
exit 1