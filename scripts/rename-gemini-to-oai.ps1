# scripts/rename-gemini-to-oai.ps1
param([switch]$DryRun,[switch]$Strict)

$patterns = @('(?i)\bgemini\b')
$replacements = @(
  @{ from='(?i)\bgemini\b'; to='Oai' },
  @{ from='gemini-'; to='oai-' }
)

# Function to resolve repository root
function Resolve-RepoRoot {
  $here = Resolve-Path "."
  while ($here -and -not (Test-Path (Join-Path $here ".git"))) {
    $parent = Split-Path $here -Parent
    if ($parent -eq $here) { throw "Repo root not found" }
    $here = $parent
  }
  return $here
}

$repoRoot = Resolve-RepoRoot
$refactorMapDir = Join-Path $repoRoot ".oursynth/refactor"
$refactorMapPath = Join-Path $refactorMapDir "gemini-to-oai-map.json"

# Ensure refactor map directory exists
if (-not (Test-Path $refactorMapDir)) {
    New-Item -ItemType Directory -Force $refactorMapDir | Out-Null
}

$hitList = @()

# Files to scan
$filesToScan = @(
    (Join-Path $repoRoot "packages/halo-ui/src/system/CopilotInstructions.tsx"),
    (Join-Path $repoRoot ".oursynth/agents/*"), # This will need globbing
    (Join-Path $repoRoot "apps/studio/*"), # This will need globbing
    (Join-Path $repoRoot "**/*.json"), # General JSON files
    (Join-Path $repoRoot "**/*.yml")  # General YAML files
)

# Helper to get files from glob patterns
function Get-FilesFromGlob($pattern) {
    Get-ChildItem -Path $pattern -Recurse -File | Select-Object -ExpandProperty FullName
}

$allFiles = @()
foreach ($pattern in $filesToScan) {
    if ($pattern.Contains("*")) {
        $allFiles += (Get-FilesFromGlob $pattern)
    } else {
        if (Test-Path $pattern) {
            $allFiles += $pattern
        }
    }
}
$allFiles = $allFiles | Select-Object -Unique

Write-Host "Scanning files for patterns..."
foreach ($file in $allFiles) {
    $content = Get-Content $file -Raw -Encoding UTF8
    foreach ($pattern in $patterns) {
        if ($content -match $pattern) {
            $hitList += @{ File = $file; Content = $content }
            break # Only add file once if multiple patterns match
        }
    }
}

if ($DryRun) {
    Write-Host "--- Dry Run: Hits Found ---"
    $hitList | ForEach-Object { Write-Host $_.File }
    $hitList | ConvertTo-Json -Depth 10 | Out-File $refactorMapPath -Encoding UTF8
    Write-Host "Hit list written to $refactorMapPath"
    return
}

Write-Host "--- Applying Refactor ---"
$refactorMap = @{}

foreach ($item in $hitList) {
    $originalFile = $item.File
    $newFile = $originalFile # Default to no rename

    # Check for file renames (e.g., if file name contains 'gemini')
    if ($originalFile -match 'gemini') {
        $renamed = $originalFile
        foreach ($r in $replacements) {
            $renamed = $renamed -replace $r.from, $r.to
        }
        if ($renamed -ne $originalFile) {
            Write-Host "Renaming file: $originalFile -> $renamed"
            if (-not $Strict) {
                # Use git mv if available to preserve history
                if ((Get-Command git -ErrorAction SilentlyContinue)) {
                    git mv "$originalFile" "$renamed"
                } else {
                    Move-Item -Path "$originalFile" -Destination "$renamed" -Force
                }
                $newFile = $renamed
            } else {
                Write-Warning "Strict mode: Skipping file rename for $originalFile"
            }
        }
    }

    # Rewrite content
    $newContent = $item.Content
    foreach ($r in $replacements) {
        $newContent = $newContent -replace $r.from, $r.to
    }

    if ($newContent -ne $item.Content) {
        Write-Host "Rewriting content in: $newFile"
        if (-not $Strict) {
            $newContent | Out-File $newFile -Encoding UTF8 -Force
        } else {
            Write-Warning "Strict mode: Skipping content rewrite for $newFile"
        }
    }

    $refactorMap[$originalFile] = $newFile # Store original to new mapping
}

$refactorMap | ConvertTo-Json -Depth 10 | Out-File $refactorMapPath -Encoding UTF8
Write-Host "Refactor map written to $refactorMapPath"

Write-Host "Refactor complete. Please review changes and commit."
