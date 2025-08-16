# Copilot Instructions for Halo-UI

## Project Overview
- **Framework:** Next.js (TypeScript)
- **Design System:** Custom "Halo UI" components (glassmorphism, neon, accessibility-first)
- **Styling:** Tailwind CSS (with custom Halo plugin), Framer Motion for animation
- **Key Demos:**
  - `/command-center-demo`: Command palette, keyboard navigation, command groups
  - `/chat-interface-demo`: Streaming chat UI, code highlighting, message actions

## Architecture & Patterns
- **Component Structure:**
  - All core UI in `src/components/halo/` (e.g., `HaloButton`, `HaloCard`, `CommandCenter`)
  - UI primitives in `src/components/ui/` (Radix-based, low-level)
  - Layouts in `src/components/layout/`
- **Command System:**
  - Central registry in `src/lib/commandRegistry.ts` (see `CommandDefinition` interface)
  - Commands grouped by `group` (Navigation, Actions, Help, System)
  - Register commands via `useRegisterCommands` (see `command-center-demo.tsx`)
- **Prompt Patterns:**
  - See `prompts.md` for prompt blueprints, system context, and usage patterns
  - Prompts are consumed by Pathways, VS Code, CLI, etc.

## Developer Workflows
- **Start Dev Server:** `npm run dev` (uses Next.js with Turbopack)
- **Build:** `npm run build`
- **Lint:** `npm run lint`
- **Process Manager:** `ecosystem.config.js` for PM2 (see `apps` config)
- **No custom test scripts defined** (add as needed)

## Project Conventions
- **Component Exports:** All Halo UI components are exported via `src/components/halo/index.ts`
- **Styling:**
  - Use Tailwind utility classes and custom CSS variables (see `globals.css`)
  - Framer Motion for all animation (see motion presets in `prompts.md`)
- **Keyboard Shortcuts:**
  - Command palette: `Ctrl+K`/`⌘K`
  - Custom shortcuts per command (see `shortcut` in command definitions)
- **Demo Patterns:**
  - Demos are in `src/pages/*-demo.tsx` and showcase component usage and integration
  - Use `HaloCard`, `HaloButton`, and other Halo primitives for all UI

## Integration Points
- **External:**
  - Lucide icons (`lucide-react`), Framer Motion, Radix UI, Stripe (optional)
- **Internal:**
  - All cross-component communication via props, hooks, or command registry
  - No global state except for theme/context providers

## Examples
- **Registering a Command:**
  ```tsx
  useRegisterCommands([
    {
      id: "toggle-theme",
      title: "Toggle Theme",
      group: "Actions",
      run: () => setTheme(theme === "dark" ? "light" : "dark"),
    },
  ]);
  ```
- **Using a Halo UI Component:**
  ```tsx
  <HaloButton variant="primary">Click Me</HaloButton>
  ```

## References
- `src/components/halo/` — main design system
- `src/lib/commandRegistry.ts` — command system
- `prompts.md` — prompt conventions
- `package.json` — scripts and dependencies

---
For new patterns or questions, check the latest demo files or `prompts.md`. Please update this file if you introduce new architectural conventions or workflows.

