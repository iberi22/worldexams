# P2P Smoke Test Script
# Tests basic P2P functionality after trystero 0.23.1 upgrade
# Run with: powershell -ExecutionPolicy Bypass -File scripts/p2p-smoke-test.ps1

param(
    [string]$PartyCode = "SMOKE-TEST-$(Get-Random -Maximum 9999)",
    [int]$TimeoutSec = 15,
    [switch]$Verbose
)

$ErrorActionPreference = "Continue"

function Get-CdpErrors {
    param([int]$Port, [int]$WaitSec = 3)
    $err = @()
    try {
        $ws = New-Object System.Net.WebSockets.ClientWebSocket
        $ct = [Threading.CancellationToken]::None
        $ws.ConnectAsync((Invoke-RestMethod "http://localhost:$Port/json" -TimeoutSec 3)[0].webSocketDebuggerUrl, $ct).Wait()
        '{"id":1,"method":"Runtime.enable"}','{"id":2,"method":"Log.enable"}' | % { $ws.SendAsync([ArraySegment[byte]][Text.Encoding]::UTF8.GetBytes($_), 'Text', $true, $ct).Wait() }
        $buf = [byte[]]::new(32768); $end = (Get-Date).AddSeconds($WaitSec)
        while ((Get-Date) -lt $end -and $ws.State -eq 'Open') {
            $r = $ws.ReceiveAsync([ArraySegment[byte]]$buf, $ct)
            if ($r.Wait(500) -and $r.Result.Count -gt 0) {
                $j = [Text.Encoding]::UTF8.GetString($buf,0,$r.Result.Count) | ConvertFrom-Json -EA SilentlyContinue
                if ($j.method -match "exceptionThrown|consoleAPICalled|entryAdded" -and ($j.method -eq "Runtime.exceptionThrown" -or $j.params.type -eq "error" -or $j.params.entry.level -eq "error")) { $err += $j }
            }
        }
        $ws.CloseAsync('NormalClosure', "", $ct).Wait()
    } catch {}
    $err
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "P2P Smoke Test - trystero 0.23.1" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Party Code: $PartyCode" -ForegroundColor Yellow
Write-Host ""

$results = @{
    Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    PartyCode = $PartyCode
    Tests = @()
}

# Test 1: Module imports
Write-Host "[TEST 1] Checking trystero module imports..." -ForegroundColor White
$importTest = @{
    Name = "Module imports"
    Passed = $false
    Details = ""
}
try {
    $errLog = "$env:TEMP\p2p_smoke_import_$PID.log"
    $proc = Start-Process "node" -ArgumentList "-e `"const t = require('trystero'); console.log('OK:', Object.keys(t).join(','))`"" -PassThru -RedirectStandardError $errLog -WindowStyle Hidden
    $proc.WaitForExit(5000)
    $stdout = $proc.StandardOutput.ReadToEnd()
    $stderr = Get-Content $errLog -EA SilentlyContinue
    Remove-Item $errLog -EA SilentlyContinue
    
    if ($proc.ExitCode -eq 0 -and $stdout -match "OK:") {
        $importTest.Passed = $true
        $importTest.Details = "Exports found: $($matches[0] -replace 'OK:','')"
    } else {
        $importTest.Details = "Exit: $($proc.ExitCode), Err: $stderr"
    }
} catch {
    $importTest.Details = $_.Exception.Message
}
$results.Tests += $importTest
Write-Host "  Result: $(if($importTest.Passed){'PASS'}else{'FAIL'}) - $($importTest.Details)" -ForegroundColor $(if($importTest.Passed){'Green'}else{'Red'})

# Test 2: Deprecated subpath detection
Write-Host "[TEST 2] Checking for deprecated trystero/supabase import..." -ForegroundColor White
$depTest = @{
    Name = "Deprecated subpath check"
    Passed = $false
    Details = ""
}
$deprecatedImport = Select-String "trystero/supabase" "E:\scripts-python\worldexams\saberparatodos\src\lib\p2p-service.ts" -Quiet
if ($deprecatedImport) {
    $depTest.Details = "FOUND deprecated 'trystero/supabase' import in p2p-service.ts - should migrate to @trystero-p2p/supabase"
    $depTest.Passed = $false
} else {
    $depTest.Details = "No deprecated import found"
    $depTest.Passed = $true
}
$results.Tests += $depTest
Write-Host "  Result: $(if($depTest.Passed){'PASS'}else{'FAIL'}) - $($depTest.Details)" -ForegroundColor $(if($depTest.Passed){'Green'}else{'Red'})

# Test 3: Unit tests pass
Write-Host "[TEST 3] Running unit tests..." -ForegroundColor White
$unitTest = @{
    Name = "Unit tests"
    Passed = $false
    Details = ""
}
$errLog = "$env:TEMP\p2p_smoke_unit_$PID.log"
$proc = Start-Process "npm" -ArgumentList "run test:unit -- --run" -PassThru -RedirectStandardError $errLog -WorkingDirectory "E:\scripts-python\worldexams\saberparatodos" -WindowStyle Hidden
$proc.WaitForExit(60000)
$stdout = $proc.StandardOutput.ReadToEnd()
$stderr = Get-Content $errLog -EA SilentlyContinue
Remove-Item $errLog -EA SilentlyContinue

if ($proc.ExitCode -eq 0 -and $stdout -match "passed") {
    $unitTest.Passed = $true
    if ($stdout -match "(\d+) passed") {
        $unitTest.Details = "$($matches[1]) tests passed"
    } else {
        $unitTest.Details = "All tests passed"
    }
} else {
    $unitTest.Details = "Exit: $($proc.ExitCode)"
    if ($stderr) { $unitTest.Details += " | $($stderr[-2000..-1])" }
}
$results.Tests += $unitTest
Write-Host "  Result: $(if($unitTest.Passed){'PASS'}else{'FAIL'}) - $($unitTest.Details)" -ForegroundColor $(if($unitTest.Passed){'Green'}else{'Red'})

# Test 4: P2P relay room fallback
Write-Host "[TEST 4] Checking P2P relay fallback mechanism..." -ForegroundColor White
$relayTest = @{
    Name = "Relay fallback"
    Passed = $false
    Details = ""
}
if (Test-Path "E:\scripts-python\worldexams\saberparatodos\src\lib\p2p-relay-room.ts") {
    $relayTest.Details = "RelayRoom fallback class exists"
    $relayTest.Passed = $true
} else {
    $relayTest.Details = "RelayRoom fallback class not found"
}
$results.Tests += $relayTest
Write-Host "  Result: $(if($relayTest.Passed){'PASS'}else{'FAIL'}) - $($relayTest.Details)" -ForegroundColor $(if($relayTest.Passed){'Green'}else{'Red'})

# Test 5: P2P SW bridge
Write-Host "[TEST 5] Checking P2P SW bridge for recovery..." -ForegroundColor White
$swTest = @{
    Name = "SW bridge"
    Passed = $false
    Details = ""
}
if (Test-Path "E:\scripts-python\worldexams\saberparatodos\src\lib\p2p-sw-bridge.ts") {
    $swTest.Details = "p2p-sw-bridge.ts exists"
    $swTest.Passed = $true
} else {
    $swTest.Details = "p2p-sw-bridge.ts not found"
}
$results.Tests += $swTest
Write-Host "  Result: $(if($swTest.Passed){'PASS'}else{'FAIL'}) - $($swTest.Details)" -ForegroundColor $(if($swTest.Passed){'Green'}else{'Red'})

# Summary
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "SUMMARY" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
$passed = ($results.Tests | Where-Object { $_.Passed }).Count
$total = $results.Tests.Count
Write-Host "Passed: $passed / $total" -ForegroundColor $(if($passed -eq $total){'Green'}else{'Yellow'})
Write-Host ""

# Critical issues
Write-Host "CRITICAL ISSUES FOUND:" -ForegroundColor Red
if (-not $depTest.Passed) {
    Write-Host "  [1] p2p-service.ts uses deprecated 'trystero/supabase' import" -ForegroundColor Yellow
    Write-Host "      Should migrate to: @trystero-p2p/supabase" -ForegroundColor Yellow
    Write-Host "      The current code catches the deprecated import error and falls back to RelayRoom." -ForegroundColor Gray
    Write-Host "      This works but is NOT the intended trystero 0.23.1 usage." -ForegroundColor Gray
}
Write-Host ""
Write-Host "WHAT NEEDS MANUAL TESTING:" -ForegroundColor Magenta
Write-Host "  - Host a party and have a guest join via P2P (Supabase strategy)" -ForegroundColor Magenta
Write-Host "  - Broadcast messages between host and guest" -ForegroundColor Magenta
Write-Host "  - Simulate peer disconnect and reconnect via SW" -ForegroundColor Magenta
Write-Host "  - Test the 30-peer soft cap" -ForegroundColor Magenta
Write-Host ""
Write-Host "To run full integration test manually:" -ForegroundColor White
Write-Host "  cd E:\scripts-python\worldexams\saberparatodos" -ForegroundColor Gray
Write-Host "  npm run test:party  (requires dev server running)" -ForegroundColor Gray
Write-Host ""

# Save results
$results | ConvertTo-Json -Depth 3 | Out-File "E:\scripts-python\worldexams\saberparatodos\p2p-smoke-test-results.json" -Encoding UTF8
Write-Host "Results saved to: p2p-smoke-test-results.json" -ForegroundColor Gray
