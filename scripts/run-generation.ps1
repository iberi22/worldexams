# WorldExams Generation Runner
# Runs direct-generate.py in a loop, 1 task at a time, with rate-limit delays
# Safe: each iteration is short-lived

$SCRIPT = "E:\scripts-python\worldexams\scripts\direct-generate.py"
$LOGFILE = "E:\scripts-python\worldexams\.worldexams\generation\runner.log"
$DELAY = 70  # seconds between tasks (rate limit buffer)
$MAX_RUNS = 300  # safety cap

function Log($msg) {
    $ts = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $line = "[$ts] $msg"
    Write-Host $line
    Add-Content -Path $LOGFILE -Value $line -Encoding UTF8
}

Log "=== WorldExams Generation Runner started ==="

# First reset any failed/running tasks
python $SCRIPT --reset

for ($i = 1; $i -le $MAX_RUNS; $i++) {
    # Check status
    $statusOut = python $SCRIPT --status 2>&1
    $pendingLine = $statusOut | Select-String "Pending:"
    if ($pendingLine) {
        $pending = [int]($pendingLine -replace ".*Pending:\s*", "" -replace "\s.*", "")
        Log "Run $i | Pending: $pending"
        
        if ($pending -eq 0) {
            Log "All tasks completed!"
            break
        }
    }
    
    # Run 1 task
    $out = python $SCRIPT --run --batch=1 2>&1
    $out | ForEach-Object { Log $_ }
    
    # Wait before next task (rate limit)
    if ($i -lt $MAX_RUNS) {
        Log "Waiting ${DELAY}s before next task..."
        Start-Sleep -Seconds $DELAY
    }
}

Log "=== Runner finished ==="
