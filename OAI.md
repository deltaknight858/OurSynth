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
