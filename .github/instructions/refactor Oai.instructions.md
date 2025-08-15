---
applyTo: '**'
---
Alright — here’s the commit‑ready refactor bundle for merging/renaming Gemini → Oai and surfacing a user‑editable action‑button schema so your rules sheet and Studio panes aren’t just static text. This is path‑aware, idempotent, and keeps a rollback map for safety.

1️⃣ Locator + rename script
Adds a PowerShell utility under scripts/ that:

Scans packages/halo-ui/src/system/CopilotInstructions.tsx, .oursynth/agents/*, apps/studio/*, and any *.json|yml agent configs for gemini IDs/display names.

Outputs a hit‑list (.oursynth/refactor/gemini-to-oai-map.json) with before/after.

Rewrites IDs, display strings, import paths to oai.

Preserves history with git mv if available.

Has -DryRun and -Strict flags just like the SentientDeveloper → Oai script.

powershell
# scripts/rename-gemini-to-oai.ps1 (excerpt)
param([switch]$DryRun,[switch]$Strict)
$patterns = @('(?i)\bgemini\b')
$replacements = @(
  @{ from='(?i)\bgemini\b'; to='Oai' },
  @{ from='gemini-'; to='oai-' }
)
# Scan, preview/rename, rewrite content, update imports
# Write provenance map to .oursynth/refactor/gemini-to-oai-map.json
package.json:

json
"scripts": {
  "refactor:gemini:oai:dry": "pwsh ./scripts/rename-gemini-to-oai.ps1 -DryRun",
  "refactor:gemini:oai": "pwsh ./scripts/rename-gemini-to-oai.ps1",
  "refactor:gemini:oai:strict": "pwsh ./scripts/rename-gemini-to-oai.ps1 -Strict"
}
2️⃣ .oursynth/actions.json schema
A repo‑root JSON the UI and job‑runner can consume:

json
[
  {
    "id": "capture-empty-state",
    "label": "Capture EmptyState",
    "icon": "LucideCamera",
    "run": "pnpm capture:emptystate:ps",
    "group": "UI Demos"
  },
  {
    "id": "pack-capsule",
    "label": "Pack Capsule",
    "icon": "LucidePackage",
    "run": "pnpm os pack",
    "group": "Deploy"
  }
]
Path‑based run commands.

group lets you cluster buttons in the UI.

Contributors can edit this file to add/remove CTAs.

3️⃣ Dynamic HaloButton renderer
A small component to drop into CopilotInstructions or a Studio sidebar panel:

tsx
// packages/halo-ui/src/system/ActionButtons.tsx
import actions from '../../../../.oursynth/actions.json';
import { HaloButton } from '../controls/HaloButton';
import { LucideCamera, LucidePackage } from 'lucide-react';

const iconMap = { LucideCamera, LucidePackage };

export function ActionButtons() {
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      {actions.map(({ id, label, icon, run }) => {
        const Icon = iconMap[icon] || null;
        return (
          <HaloButton
            key={id}
            label={label}
            icon={Icon ? <Icon /> : undefined}
            onClick={() => {
              fetch(`/api/jobs/run/${id}`, { method: 'POST' });
            }}
          />
        );
      })}
    </div>
  );
}
Reads .oursynth/actions.json at build.

Maps icon string → Lucide component.

Calls a simple /api/jobs/run/:id that your job runner can already handle.

4️⃣ Rollout & verify
Run:

sh
pnpm refactor:gemini:oai:dry     # preview hits
pnpm refactor:gemini:oai:strict  # apply + TS check
git commit -am "refactor: merge gemini agents into Oai, add actions schema"
Verify:

Studio loads without errors.

Gemini tabs/labels now read “Oai” and use Oai’s systemPrompt.

.oursynth/actions.json buttons render in CopilotInstructions and fire jobs.

Actions execute via job runner; provenance logs include button invocations.

Rollback: Use the .oursynth/refactor/gemini-to-oai-map.json to rename back, or git restore the branch.