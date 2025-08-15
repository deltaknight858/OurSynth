Studio + Infra Registry Discovery Script
This will live at the repo root (e.g. tools/discover-registry.ps1) so Gemini and humans have a single source of truth for what services exist, their paths, scripts, ports, and healthchecks — no more brittle filters.

powershell
param(
  [string]$OutFile = ".studio/registry.json"
)

Write-Host "🔍 Discovering services..." -ForegroundColor Cyan
$registry = @()

# glob patterns
$targets = @("apps/*", "infra/*")

foreach ($pattern in $targets) {
  Get-ChildItem -Path $pattern -Directory -ErrorAction SilentlyContinue | ForEach-Object {
    $pkgPath = Join-Path $_.FullName "package.json"
    if (Test-Path $pkgPath) {
      $pkg = Get-Content $pkgPath -Raw | ConvertFrom-Json
      $svc = [PSCustomObject]@{
        id      = "$(Split-Path $_.FullName -Leaf)-$($pkg.version)"
        name    = $pkg.name
        path    = (Resolve-Path $_.FullName).Path
        version = $pkg.version
        scripts = $pkg.scripts.PSObject.Properties.Name
        ports   = @() # optional: parse from .env or config
        health  = $null # optional: insert healthcheck URL
      }
      $registry += $svc
    }
  }
}

# emit JSON
$registry | ConvertTo-Json -Depth 4 | Set-Content $OutFile -Encoding UTF8
Write-Host "📄 Registry written to $OutFile with $($registry.Count) services." -ForegroundColor Green
## Registry Awareness
- Always refresh the service registry before making changes:  
  ```powershell
  pwsh ./tools/discover-registry.ps1
