---
mode: agent
---
# Gemini Spot‑Check + Playmaker Brief — OurSynth‑Eco / Deploy

## Project Context
- **Workspace scope:** apps/*, packages/*, infra/*
- **Discovery:** Path‑based only; no brittle name filters.
- **Bootstrap flow:** `pnpm install` → `pnpm approve-builds --yes` → `pnpm -r --if-present build` → `pnpm -C infra/deploy dev`
- **Deploy layer:** Handles release & routing for Capsules with full provenance.
- **DX principles:** Deterministic builds, idempotent scripts, immutable artifacts.

## Mission
Same as `apps/studio`, applied to infra code, with extra focus on:
- Release gating
- Hash drift detection
- Rollback automation
- Environment hardening

## Operating Rules
- Approve native builds before deploy (`approve-builds --yes`).
- Validate signing keys and env vars before pack.
- Halt deploy if provenance hash mismatches.
- Emit signed provenance JSON for every artifact.
- Mesh‑simulate N‑node deploys in dev mode for performance and fault testing.

## Output Contract
Identical to `apps/studio`.

## First Pass Checklist
- Detect + quarantine blocking modules
- Ensure all deploy commands are idempotent
- Harden rollback scripts (fast undo)
- Verify env validation
- Ensure signature checks on all artifacts
## Registry Awareness
- Always refresh the service registry before making changes:  
  ```powershell
  pwsh ./tools/discover-registry.ps1
