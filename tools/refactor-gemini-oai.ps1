# Gemini→Oai Refactor Dry-Run Script
# This script scans for all Gemini/Oai mentions and systemPrompt definitions, outputs a change plan, and can optionally rewrite IDs and display names.
# Usage:
#   pwsh ./tools/refactor-gemini-oai.ps1 -DryRun   # Preview changes
#   pwsh ./tools/refactor-gemini-oai.ps1           # Apply changes

param(
  [switch]$DryRun = $true
)

$RepoRoot = Resolve-Path "."
$patterns = @('(?i)gemini','(?i)oai','systemPrompt')
$files = Get-ChildItem $RepoRoot -Recurse -File -Include *.ts,*.tsx,*.json,*.yml,*.yaml,*.md

$hits = @()
foreach ($file in $files) {
  foreach ($pat in $patterns) {
    $matches = Select-String -Path $file.FullName -Pattern $pat -AllMatches -SimpleMatch -ErrorAction SilentlyContinue
    foreach ($m in $matches) {
      $hits += [PSCustomObject]@{
        Path = $file.FullName
        LineNumber = $m.LineNumber
        Line = $m.Line.Trim()
        Pattern = $pat
      }
    }
  }
}

# Output audit file
$refactorDir = Join-Path $RepoRoot ".oursynth/refactor"
New-Item -ItemType Directory -Force $refactorDir | Out-Null
$auditPath = Join-Path $refactorDir "gemini-oai-hits.csv"
$hits | Export-Csv $auditPath -NoTypeInformation
Write-Host "[DRY RUN] Audit written to $auditPath" -ForegroundColor Cyan

# Change plan: what would be replaced
$changePlan = @()
foreach ($hit in $hits) {
  $newLine = $hit.Line -replace '(?i)gemini','Oai'
  $changePlan += [PSCustomObject]@{
    Path = $hit.Path
    LineNumber = $hit.LineNumber
    OldLine = $hit.Line
    NewLine = $newLine
    Pattern = $hit.Pattern
  }
}
$planPath = Join-Path $refactorDir "gemini-oai-change-plan.csv"
$changePlan | Export-Csv $planPath -NoTypeInformation
Write-Host "[DRY RUN] Change plan written to $planPath" -ForegroundColor Cyan

if ($DryRun) {
  Write-Host "[DRY RUN] No files modified. Review the change plan above." -ForegroundColor Yellow
  exit 0
}

# Apply changes (if not dry run)
foreach ($hit in $hits) {
  $lines = Get-Content $hit.Path
  $idx = $hit.LineNumber - 1
  $lines[$idx] = $lines[$idx] -replace '(?i)gemini','Oai'
  Set-Content $hit.Path $lines
}
Write-Host "[APPLY] All Gemini→Oai replacements applied." -ForegroundColor Green

# Write a map for rollback
$mapPath = Join-Path $refactorDir "gemini-to-oai-map.json"
$changePlan | ConvertTo-Json -Depth 6 | Set-Content $mapPath -Encoding UTF8
Write-Host "[APPLY] Rollback map written to $mapPath" -ForegroundColor Green
