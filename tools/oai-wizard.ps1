[CmdletBinding()]
param(
  [Parameter(Position=0, Mandatory=$true)]
  [ValidateSet('actions','invoke','await','harvest','apply','pr','health')]
  [string]$Cmd,

  [string]$ActionId,
  [hashtable]$Input,
  [string]$InvocationId,
  [switch]$AutoApprove,
  [string]$WizardUrl = $env:WIZARD_URL ?? "http://localhost:3000"
)

$ErrorActionPreference = 'Stop'

function Resolve-RepoRoot {
  $here = Resolve-Path "."
  while ($here -and -not (Test-Path (Join-Path $here ".git"))) {
    $parent = Split-Path $here -Parent
    if ($parent -eq $here) { throw "Repo root not found" }
    $here = $parent
  }
  return $here
}

function Write-Journal([hashtable]$evt) {
  $root = Resolve-RepoRoot
  $journal = Join-Path $root ".studio/journal.ndjson"
  New-Item -ItemType Directory -Force (Split-Path $journal) | Out-Null
  ($evt | ConvertTo-Json -Depth 6) + "`n" | Out-File -FilePath $journal -Append -Encoding utf8
}

function Get-Registry {
  $root = Resolve-RepoRoot
  $p = Join-Path $root ".studio/registry.json"
  if (Test-Path $p) { return Get-Content $p -Raw | ConvertFrom-Json }
  else { return @() }
}

function Http-Get($url) {
  return Invoke-RestMethod -Method GET -Uri $url -TimeoutSec 60
}
function Http-Post($url, $body) {
  return Invoke-RestMethod -Method POST -Uri $url -Body ($body | ConvertTo-Json -Depth 10) -ContentType "application/json" -TimeoutSec 60
}

switch ($Cmd) {

  'actions' {
    $out = Http-Get "$WizardUrl/api/wizard/actions"
    $out | ConvertTo-Json -Depth 6
    break
  }

  'invoke' {
    if (-not $ActionId) { throw "ActionId required" }
    $payload = @{ inputs = $Input }
    $res = Http-Post "$WizardUrl/api/wizard/actions/$ActionId/invoke" $payload
    Write-Journal @{ type='wizard.invoke'; actionId=$ActionId; inputs=$Input; invocationId=$res.invocationId; at=(Get-Date).ToString("o") }
    $res | ConvertTo-Json -Depth 6
    break
  }

  'await' {
    if (-not $InvocationId) { throw "InvocationId required" }
    while ($true) {
      $state = Http-Get "$WizardUrl/api/wizard/invocations/$InvocationId"
      if ($state.status -in @('succeeded','failed','error')) { $state | ConvertTo-Json -Depth 10; break }
      Start-Sleep -Seconds 2
    }
    break
  }

  'harvest' {
    if (-not $InvocationId) { throw "InvocationId required" }
    $root = Resolve-RepoRoot
    $inbox = Join-Path $root ".studio/inbox/$InvocationId"
    New-Item -ItemType Directory -Force (Split-Path $inbox) | Out-Null

    $state = Http-Get "$WizardUrl/api/wizard/invocations/$InvocationId"
    foreach ($a in $state.artifacts) {
      $art = Invoke-RestMethod -Method GET -Uri "$WizardUrl/api/wizard/artifacts/$($a.artifactId)"
      $dest = if ($art.kind -eq 'diff') { Join-Path $inbox "$($art.artifactId).patch" } elseif ($art.path) { Join-Path $inbox $art.path } else { Join-Path $inbox "$($art.artifactId).txt" }
      New-Item -ItemType Directory -Force (Split-Path $dest) | Out-Null
      if ($art.bytesBase64) { [IO.File]::WriteAllBytes($dest, [Convert]::FromBase64String($art.bytesBase64)) }
      elseif ($art.text) { $art.text | Out-File -FilePath $dest -Encoding utf8 }
      Write-Journal @{ type='wizard.artifact'; invocationId=$InvocationId; artifactId=$art.artifactId; kind=$art.kind; contentHash=$art.contentHash; at=(Get-Date).ToString("o") }
    }
    Write-Host "Artifacts saved to $inbox"
    break
  }

  'apply' {
    $root = Resolve-RepoRoot
    $inbox = Join-Path $root ".studio/inbox/$InvocationId"
    if (-not (Test-Path $inbox)) { throw "Inbox not found: $inbox" }
    $patches = Get-ChildItem $inbox -Recurse -Filter *.patch
    if (-not $patches) { throw "No .patch artifacts in $inbox" }

    $branch = "oai/wizard/$InvocationId"
    git rev-parse --verify $branch 2>$null | Out-Null
    if ($LASTEXITCODE -ne 0) { git checkout -b $branch | Out-Null } else { git checkout $branch | Out-Null }

    foreach ($p in $patches) {
      git apply --index --reject --whitespace=fix $p.FullName
    }

    $changed = git status --porcelain | Measure-Object | Select-Object -ExpandProperty Count
    Write-Journal @{ type='oai.patch.plan'; invocationId=$InvocationId; files=@(git diff --name-only); at=(Get-Date).ToString("o") }

    git commit -m "[OAI] Apply Wizard $InvocationId artifacts" | Out-Null
    Write-Journal @{ type='oai.patch.apply'; branch=$branch; commit=(git rev-parse HEAD); filesChanged=$changed; at=(Get-Date).ToString("o") }

    if (-not $AutoApprove) {
      Write-Host "Applied to branch $branch. Review with 'git show' or 'git diff main...$branch'." -ForegroundColor Yellow
    }
    break
  }

  'pr' {
    $branch = git rev-parse --abbrev-ref HEAD
    pnpm -w -s build
    $buildOk = $LASTEXITCODE -eq 0
    pnpm -w -s test
    $testOk = $LASTEXITCODE -eq 0
    Write-Journal @{ type='oai.checks'; buildOk=$buildOk; testOk=$testOk; at=(Get-Date).ToString("o") }

    if (-not ($buildOk -and $testOk)) { throw "Checks failed. Fix before opening PR." }
    $title = "[OAI] $branch"
    $body = "Automated changes via OAI bridge. See .studio/journal.ndjson for provenance."
    try {
      gh pr create --fill --title $title --body $body
    } catch {
      Write-Host "PR not opened automatically. Use your VCS provider to open a PR for $branch." -ForegroundColor Yellow
    }
    break
  }

  'health' {
    Write-Host "Running health checks..."
    $root = Resolve-RepoRoot
    
    # Execute the command and capture its output
    $process = Start-Process -FilePath "pnpm" -ArgumentList "health-check" -WorkingDirectory $root -NoNewWindow -PassThru -RedirectStandardOutput $true -RedirectStandardError $true
    $process.WaitForExit()

    $stdout = $process.StandardOutput.ReadToEnd()
    $stderr = $process.StandardError.ReadToEnd()

    if ($stdout) { Write-Host $stdout }
    if ($stderr) { Write-Error $stderr }

    if ($process.ExitCode -ne 0) {
      throw "Health checks failed with exit code $($process.ExitCode)."
    }
    Write-Host "Health checks completed successfully."
    break
  }
}