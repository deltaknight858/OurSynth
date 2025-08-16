# PowerShell version of test-with-dev.sh

# Start Next.js dev server as a background job
$devProcess = Start-Process yarn -ArgumentList 'next','dev','-p','4321' -PassThru
$NEXT_PID = $devProcess.Id

# Wait for server to be ready

# Wait for server to be ready
while ($true) {
    try {
        Invoke-WebRequest -Uri http://localhost:4321 -UseBasicParsing -ErrorAction Stop | Out-Null
        break
    } catch {
        Start-Sleep -Seconds 1
    }
}


# Run Playwright tests
npx playwright test tests/mesh-sim-provenance.spec.ts --update-snapshots


# Kill dev server
Stop-Process -Id $NEXT_PID
