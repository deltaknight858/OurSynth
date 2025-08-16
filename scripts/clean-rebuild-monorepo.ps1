# Clean and rebuild the entire monorepo for OurSynth
# Usage: pwsh ./scripts/clean-rebuild-monorepo.ps1

Write-Host "Cleaning all node_modules, lockfiles, and build outputs..." -ForegroundColor Cyan

# Remove root and app node_modules, lockfile, and shared-utils dist
$ErrorActionPreference = 'SilentlyContinue'
Remove-Item -Recurse -Force "../node_modules"
Remove-Item -Recurse -Force "../pnpm-lock.yaml"
Remove-Item -Recurse -Force "../packages/shared-utils/dist"
Remove-Item -Recurse -Force "../apps/studio/deploy/node_modules"
Remove-Item -Recurse -Force "../apps/Halo-UI/node_modules"
Remove-Item -Recurse -Force "../apps/studio/domains/node_modules"
$ErrorActionPreference = 'Continue'

Write-Host "Reinstalling all dependencies..." -ForegroundColor Cyan
cd ..
pnpm install

Write-Host "Building shared-utils..." -ForegroundColor Cyan
pnpm -F @oursynth/shared-utils build

Write-Host "Building halo-ui..." -ForegroundColor Cyan
pnpm -F @oursynth/halo-ui build

Write-Host "Building studio/deploy..." -ForegroundColor Cyan
pnpm -F softgen-starter build

Write-Host "Monorepo clean and rebuild complete!" -ForegroundColor Green
