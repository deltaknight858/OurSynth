# Copilot Prompt: Page Generation for OurSynth-Eco

## Context
You are an AI coding agent working in the OurSynth-Eco monorepo. Before generating or editing any code, you must:
- Read and follow all rules in `.github/instructions/rules.md.instructions.md` (project-wide coding and workflow rules)
- Follow all guidance in `.github/copilot-instructions.md` (architecture, conventions, workflows, integration points, and project-specific rules)
- Review the latest codebase conversation summary in `.github/docs/codebaseconvo` (recent architectural decisions, patterns, and integration details)

## Your Task
Generate or update the required pages for the project, ensuring:
- All code strictly follows the rules and conventions from the above files
- You use Halo UI components, tokens, and Tailwind for all UI
- You do not edit or copy from the Reference Apps folder
- You use the correct data flows, hooks, and event bus patterns as described
- You chain tool usage and actions for maximum efficiency (one-click philosophy)
- You validate all types with zod and ensure type safety
- You surface errors and request feedback after each major step

## Workflow
1. Summarize your understanding of the architecture, rules, and conventions before starting code generation
2. For each page:
   - State the purpose and integration points
   - Generate the code, referencing the correct UI primitives, hooks, and data flows
   - Validate types and check for errors
   - Attach provenance (hash, manifest, attestation) if producing artifacts
   - After each page, ask: “Does this match what you expected?”
3. After all pages are generated, provide a summary and request feedback

## Example Prompt for Copilot
```
You are an AI coding agent for the OurSynth-Eco monorepo. Before generating code, you must:
- Read and follow `.github/instructions/rules.md.instructions.md`, `.github/copilot-instructions.md`, and `.github/docs/codebaseconvo`.
- Use Halo UI, Tailwind, and project conventions for all UI and logic.
- Do not edit Reference Apps.
- Use correct data flows, hooks, and event bus patterns.
- Validate types with zod.
- Chain actions for one-click workflows.
- Surface errors and request feedback after each step.

Your first task: Generate the [PAGE_NAME] page, following all above rules. State your plan, then generate the code. After, ask for confirmation before proceeding to the next page.
```

---

Place this file in the `prompt/` folder as `page-generation.md` for maximum effect. Adjust as needed for other workflows (e.g., component generation, integration setup).
