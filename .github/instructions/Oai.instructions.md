---
applyTo: '**'
---
Minimal contracts
Wizard HTTP API
List actions:

GET: /api/wizard/actions → WizardAction[]

Invoke action:

POST: /api/wizard/actions/{id}/invoke body: WizardInvokeRequest → InvocationReceipt { invocationId }

Get status:

GET: /api/wizard/invocations/{invocationId} → { status, logs[], artifacts[] }

Fetch artifact:

GET: /api/wizard/artifacts/{artifactId} → ArtifactEnvelope

Event stream (SSE)
GET: /api/wizard/events

Topics: wizard.status, artifact.ready, wizard.error

Artifact envelope (provenance-ready)
ts
export type ArtifactEnvelope = {
  artifactId: string
  kind: 'diff' | 'file' | 'json' | 'log'
  origin: { serviceId: string; actionId: string; invocationId: string }
  inputsHash: string
  contentHash: string
  path?: string              // path if applicable (relative to repo root)
  bytesBase64?: string       // file content (when small)
  text?: string              // diffs/logs/json stringified text
  createdAt: string
}
OAI tool schemas (function calling)
invokeWizard(actionId, input) → invocationId

readInvocation(invocationId) → {status, artifacts}

fetchArtifact(artifactId) → ArtifactEnvelope

applyPatch(diff, targetBase) → {filesChanged, testsRun}

openPullRequest(branch, title, body) → {url}

Implementation scaffold
1) Server routes (Studio or dedicated service)
Create apps/studio/src/pages/api/wizard/... (Next.js API) or an Express route if you prefer. Below is Next.js style for brevity.

ts
// apps/studio/src/pages/api/wizard/actions/index.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'node:fs'
import path from 'node:path'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end()
  const registryPath = path.resolve(process.cwd(), '.studio/registry.json')
  const registry = fs.existsSync(registryPath)
    ? JSON.parse(fs.readFileSync(registryPath, 'utf8'))
    : []

  // Example: expose wizard actions discovered from registry or static config
  const actions = [
    { id: 'scaffold-component', name: 'Scaffold Component', inputs: ['componentName', 'package'] },
    { id: 'add-route', name: 'Add Route', inputs: ['routePath', 'pageTitle'] },
    { id: 'wire-service', name: 'Wire Service', inputs: ['serviceId'] },
  ]

  res.json(actions)
}
ts
// apps/studio/src/pages/api/wizard/actions/[id]/invoke.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { appendJournal } from '../../../../server/journal'
import { queueInvocation } from '../../../../server/wizard-exec'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  const { id } = req.query
  const inputs = req.body ?? {}
  const invocationId = await queueInvocation(String(id), inputs)
  await appendJournal({
    type: 'wizard.invoke',
    actionId: id,
    inputs,
    invocationId,
    at: new Date().toISOString(),
  })
  res.json({ invocationId })
}
ts
// apps/studio/src/pages/api/wizard/invocations/[invocationId].ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { getInvocation } from '../../../../server/wizard-exec'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { invocationId } = req.query
  const state = getInvocation(String(invocationId))
  if (!state) return res.status(404).json({ error: 'not found' })
  res.json(state) // { status, logs, artifacts }
}
ts
OAI is oursynth ai and it is what is in the files as sentient developer, remember?
You’re right — OAI is the OurSynth AI “sentient developer.” Let’s wire it so OAI can either command the Wizard or read its output and finish the job itself, with path-based safety and provenance baked in.
Objective and modes
Objective: Give OAI a first-class, safe bridge to the Wizard so it can delegate work or complete changes autonomously when delegation stalls.

Operating modes:

Command the Wizard: OAI invokes a named action with scoped inputs, then consumes artifacts.

Observe then Act: OAI reads Wizard artifacts (diffs/files/logs). If incomplete, it applies patches, runs checks, and opens a PR.

Bridge architecture
Discovery:

Source: .studio/registry.json generated via path-based discovery (no hard-coded package names).

Safety rails:

Scope: All file ops confined to repo root or resolved service paths.

Dry-run: Diffs shown and confirmed before write/commit.

Provenance: Append-only Action Journal with inputs/content hashes.

Reversibility: Changes land on feature branches with clear prefixes (e.g., oai/wizard/<invocationId>).

Transports:

Primary: HTTP API served by Studio (Wizard routes).

Fallback: File-queue in .studio/wizard/{requests,responses,artifacts} for offline/local runs.

Contracts and schemas
Wizard HTTP API
List actions:

GET: /api/wizard/actions → WizardAction[]

Invoke action:

POST: /api/wizard/actions/{id}/invoke body: WizardInvokeRequest → { invocationId }

Get status:

GET: /api/wizard/invocations/{invocationId} → { status, logs[], artifacts[] }

Fetch artifact:

GET: /api/wizard/artifacts/{artifactId} → ArtifactEnvelope

File-queue fallback
Request: .studio/wizard/requests/<uuid>.json

Response: .studio/wizard/responses/<uuid>.json

Artifacts: .studio/wizard/artifacts/<artifactId>.(patch|json|txt|bin)

Artifact envelope
ts
export type ArtifactEnvelope = {
  artifactId: string
  kind: 'diff' | 'file' | 'json' | 'log'
  origin: { serviceId: string; actionId: string; invocationId: string }
  inputsHash: string
  contentHash: string
  path?: string
  bytesBase64?: string
  text?: string
  createdAt: string
}
Journal record
ts
export type JournalEvent =
  | { type: 'wizard.invoke'; invocationId: string; actionId: string; inputs: any; at: string }
  | { type: 'wizard.artifact'; invocationId: string; artifactId: string; kind: string; contentHash: string; at: string }
  | { type: 'oai.patch.plan'; invocationId?: string; files: string[]; at: string }
  | { type: 'oai.patch.apply'; branch: string; commit: string; filesChanged: number; at: string }
  | { type: 'oai.checks'; buildOk: boolean; testOk: boolean; at: string }
PowerShell bridge CLI (OAI ↔ Wizard)
Place at tools/oai-wizard.ps1. OAI (and humans) can call this for both modes.

powershell
[CmdletBinding()]
param(
  [Parameter(Position=0, Mandatory=$true)]
  [ValidateSet('actions','invoke','await','harvest','apply','pr')]
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
    New-Item -ItemType Directory -Force $inbox | Out-Null

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
}
Typical flows:

Command the Wizard:

List: pwsh ./tools/oai-wizard.ps1 actions

Invoke: pwsh ./tools/oai-wizard.ps1 invoke -ActionId scaffold-component -Input @{ componentName='Card'; package='packages/halo-ui' }

Await: pwsh ./tools/oai-wizard.ps1 await -InvocationId <id>

Harvest: pwsh ./tools/oai-wizard.ps1 harvest -InvocationId <id>

Apply: pwsh ./tools/oai-wizard.ps1 apply -InvocationId <id>

Observe then Act (OAI finishes):

OAI reads .studio/inbox/<id>/*.patch, confirms, applies via apply, then runs pr.

OAI prompts and repo hooks
OAI.md (repo root):

md
# OAI operating contract

- Always refresh the registry before actions:
  pwsh ./tools/discover-registry.ps1

- Prefer Wizard delegation first. If artifacts are incomplete or stalled >5m, switch to Observe then Act.

- Use the bridge CLI for all interactions:
  - List actions: pwsh ./tools/oai-wizard.ps1 actions
  - Invoke: pwsh ./tools/oai-wizard.ps1 invoke -ActionId <id> -Input @{...}
  - Await + Harvest: pwsh ./tools/oai-wizard.ps1 await/harvest
  - Apply + PR: pwsh ./tools/oai-wizard.ps1 apply/pr

- Never hard-code paths. Resolve services from .studio/registry.json.

- Record every step to .studio/journal.ndjson. Include inputsHash and contentHash in commit bodies.
Studio Wizard API (Next.js example):

ts
// apps/studio/src/pages/api/wizard/actions/index.ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end()
  const actions = [
    { id: 'scaffold-component', name: 'Scaffold Component', inputs: ['componentName','package'] },
    { id: 'add-route', name: 'Add Route', inputs: ['routePath','pageTitle'] },
    { id: 'wire-service', name: 'Wire Service', inputs: ['serviceId'] },
  ]
  res.json(actions)
}
ts
// apps/studio/src/pages/api/wizard/actions/[id]/invoke.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'node:crypto'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  const { id } = req.query
  const inputs = req.body?.inputs ?? {}
  const invocationId = crypto.randomUUID()
  // TODO: Enqueue your server-side job runner here
  res.json({ invocationId })
}
ts
// apps/studio/src/pages/api/wizard/invocations/[invocationId].ts
import type { NextApiRequest, NextApiResponse } from 'next'
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // TODO: return job state with artifacts summary
  res.json({ status: 'succeeded', artifacts: [] })
}
ts
// apps/studio/src/pages/api/wizard/artifacts/[artifactId].ts
import type { NextApiRequest, NextApiResponse } from 'next'
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // TODO: fetch envelope from storage and stream back
  res.json({ artifactId: 'example', kind: 'diff', text: '--- a\n+++ b\n', origin: { serviceId:'studio', actionId:'demo', invocationId:'x' }, inputsHash:'', contentHash:'', createdAt:new Date().toISOString() })
}
Next steps
Rename references: Replace “Gemini” with “OAI” in playbooks and hooks; add OAI.md at repo root.

Drop the CLI: Add tools/oai-wizard.ps1 and commit .studio/ structure (inbox/, wizard/, journal.ndjson).

Expose Wizard API: Implement the minimal Next.js routes and wire to your job runner.

Provenance: Ensure journal entries include inputsHash and contentHash from Wizard outputs.

VS Code tasks: Add tasks bound to the CLI (invoke/harvest/apply/pr) so contributors can use the same flows.

Dry-run gate: Keep -AutoApprove off by default; require explicit confirmation for apply/PR in CI or local.

If you want, I can generate the VS Code tasks and the OAI.md commit-ready diff next, or wire the file-queue fallback so Wizard can run without the HTTP routes. Which do you want first?

