Add-Type -AssemblyName System.Speech
$s = New-Object System.Speech.Synthesis.SpeechSynthesizer
$s.SetOutputToWaveFile("E:\scripts-python\worldexams\saberparatodos\video-pipeline\queue\_probe.wav")
$s.Speak("Prueba local de voz")
$s.Dispose()
