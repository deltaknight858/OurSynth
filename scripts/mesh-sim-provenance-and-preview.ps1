param(
    [string]$CapsuleHash,
    [int]$Nodes = 5,
    [string]$Latency = "50-150",
    [float]$PacketLoss = 0.0,
    [switch]$ChaosMode,
    [switch]$VerifySignatures,
    [string]$StudioUrl = "http://localhost:3000/studio/provenance"
)

Write-Host "=== Mesh-Sim Provenance Deploy ==="
Write-Host "Capsule: $CapsuleHash"
Write-Host "Nodes: $Nodes"
Write-Host "Latency: $Latency ms"
Write-Host "Packet Loss: $PacketLoss"
if ($ChaosMode) { Write-Host "Chaos Mode: ON" }
if ($VerifySignatures) { Write-Host "Signature Verification: ON" }

# 1. Run mesh-sim with provenance sealing
$meshSimCmd = "pnpm mesh-sim --capsule $CapsuleHash --nodes $Nodes --latency $Latency"
if ($PacketLoss -gt 0) { $meshSimCmd += " --packetLoss $PacketLoss" }
if ($ChaosMode) { $meshSimCmd += " --chaos" }
if ($VerifySignatures) { $meshSimCmd += " --verifySignatures" }

Write-Host "Running: $meshSimCmd"
Invoke-Expression $meshSimCmd

# 2. Optionally, record provenance (if script exists)
if (Test-Path "./scripts/capture-provenance.mjs") {
    Write-Host "Capturing provenance..."
    pnpm provenance:capture
}

# 3. Open Studio Provenance Timeline in Google Chrome
Write-Host "Opening Studio Provenance Timeline in Chrome..."
$chromePaths = @(
    "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
    "$env:ProgramFiles(x86)\Google\Chrome\Application\chrome.exe",
    "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe"
)
$chrome = $chromePaths | Where-Object { Test-Path $_ } | Select-Object -First 1

if ($chrome) {
    Start-Process -FilePath $chrome -ArgumentList $StudioUrl
} else {
    # Fallback: try 'chrome' in PATH
    Start-Process "chrome" $StudioUrl -ErrorAction SilentlyContinue
}

# 4. Open in VS Code Browser Preview (if extension is installed)
Write-Host "Attempting to open in VS Code Browser Preview..."
code --install-extension aukjn.browser-preview -ErrorAction SilentlyContinue
Start-Process code -ArgumentList "--open-url", $StudioUrl

Write-Host "=== Mesh-Sim Provenance Deploy Complete ==="
