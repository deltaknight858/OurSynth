# OurSynth-Eco Monorepo

Welcome to the **OurSynth-Eco** platform!  
This monorepo powers the modular, local-first, and peer-to-peer app ecosystem for OurSynth, including Pathways, Deploy, Domains, Studio, and the OAI Orchestrator.

---

## 🏛️ Architecture

OurSynth-Eco is a monorepo managed by [pnpm](https://pnpm.io/) that contains a suite of interconnected applications and services that form a comprehensive platform for developing, deploying, and managing applications in a decentralized and modular way.

### Monorepo Structure

The project is organized into three main directories:

- **`apps/`**: Contains the user-facing applications, including:
  - `web`: The main marketing and documentation website.
  - `deploy`: An application for deploying to Azure or Vercel.
  - `domains`: An application for managing custom domains.
  - `studio`: An IDE-like application for developers.
  - `pathways`: An application for code generation and scaffolding.
  - `Halo-UI`: A UI kit demo or playground.
- **`packages/`**: Contains shared code and libraries used across the different applications:
  - `halo-ui`: A shared UI component library.
  - `shared-types`: Shared TypeScript types used across the ecosystem.
  - `shared-utils`: Shared utility functions.
  - `oai`: The core logic for the OAI orchestrator, which manages agentic workflows.
- **`infra/`**: Contains infrastructure-as-code, with a `deploy` subdirectory, suggesting it manages the deployment configurations.

### Key Technologies

- **[Next.js](https://nextjs.org/)**: The frontend applications are built with Next.js.
- **[TypeScript](https://www.typescriptlang.org/)**: The entire codebase is written in TypeScript.
- **[Supabase](https://supabase.com/)**: Supabase is used for the database and backend services.
- **AI Integration**: The platform features an "OAI Orchestrator" and "agentic workflows," indicating a deep integration with AI technologies.

---

## 🚀 Getting Started

1. **Install dependencies**
   ```sh
   npm install
   # or
   pnpm install
   ```

2. **Set up environment variables**  
   Copy `.env.example` to `.env.local` and fill in Supabase, Stripe, and integration URLs.

3. **Run all apps**
   ```sh
   pnpm dev
   # or run a single app:
   pnpm dev --filter web
   ```

4. **Build all packages**
   ```sh
   pnpm build
   ```

---

## 🕰 Capsule System

Every app run can be exported as a signed Capsule:

- Contains code, build recipe, env, seeds, provenance, and rights
- Replayable, portable, and cryptographically signed
- Time Machine UI lets you scrub, diff, branch, and redeploy any state
- Peer-to-peer mesh sync and resale ready

See [`packages/types/capsule.ts`](packages/types/capsule.ts) for the manifest schema.

---

## 🧩 Integrations

- **Pathways**: Code generation and scaffolding
- **Deploy**: One-click deploy to Azure or Vercel
- **Domains**: Custom domain mapping and DNS verification
- **Calm**: Automated code edits and PRs
- **OAI**: Orchestrator/event bus for agentic workflows

---

## 🛡 Security & Best Practices

- All secrets in `.env.local` (never commit secrets)
- `node_modules/`, `.next/`, `.turbo/`, `dist/` are gitignored
- Supabase RLS and signed URLs for secure data access

---

## 📝 Contributing

1. Fork and clone the repo
2. Create a new branch (`git checkout -b feature/my-feature`)
3. Commit your changes
4. Push and open a pull request

---

## 📄 License

Apache-2.0

---

For more, see the docs in `apps/web/app/(docs)/` or

---

## 🛠️ Automation & Tooling

### Mesh Simulation

To run a mesh simulation with provenance tracking, use the `mesh-sim-provenance-and-preview.ps1` script. This is useful for testing capsule integrity and network conditions.

**Usage:**

```powershell
pwsh ./scripts/mesh-sim-provenance-and-preview.ps1 -CapsuleHash <yourCapsuleHash> -Nodes 5 -Latency "50-150" -PacketLoss 0.05 -ChaosMode -VerifySignatures
```

This script can also be triggered from the Studio Command Center as the "Simulate Mesh" action.
