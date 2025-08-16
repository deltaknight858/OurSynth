# build-and-verify.ps1

# Exit immediately if a command exits with a non-zero status.
$ErrorActionPreference = "Stop"

# Function to print a message in a consistent format
function Write-Step {
    param(
        [string]$Message
    )
    Write-Host "----------------------------------------"
    Write-Host $Message
    Write-Host "----------------------------------------"
}

try {
    # Step 1: Bootstrap the project (install dependencies)
    Write-Step "Step 1: Bootstrapping project and installing dependencies..."
    pnpm install
    Write-Host "Bootstrap complete."

    # Step 2: Lint the codebase
    Write-Step "Step 2: Linting codebase..."
    pnpm lint
    Write-Host "Linting complete. No issues found."

    # Step 3: Run tests
    Write-Step "Step 3: Running tests..."
    pnpm test
    Write-Host "Tests passed."

    # Step 4: Build the monorepo
    Write-Step "Step 4: Building all packages and apps..."
    pnpm run clean-build
    Write-Host "Build complete."

    # Success!
    Write-Host ""
    Write-Host "✅ Monorepo build and verification successful!" -ForegroundColor Green
}
catch {
    Write-Host ""
    Write-Host "❌ A step failed. Please check the output above for errors." -ForegroundColor Red
    # Exit with a non-zero status code to indicate failure
    exit 1
}
