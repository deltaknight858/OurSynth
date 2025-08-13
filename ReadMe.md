# OurSynth-Eco Monorepo

Welcome to the **OurSynth-Eco** platform!  
This monorepo powers the modular, local-first, and peer-to-peer app ecosystem for OurSynth, including Pathways, Deploy, Domains, Studio, and the OAI Orchestrator.

---

## 🗂️ Monorepo Structure

```
apps/
  web/        # Main Next.js web app (marketing, store, account, docs)
  deploy/     # Deploy app (deploy to Azure/Vercel, status)
  domains/    # Domains app (custom domain mapping, DNS verification)
  studio/     # Studio/IDE app (optional)
  halo-ui/    # UI kit demo or playground
  oai/        # OAI Orchestrator (agent/event bus, tools, Calm bridge)
packages/
  halo-ui/    # Halo UI kit (glass, neon, motion, primitives)
  types/      # Shared TypeScript types (Capsule, integrations, etc.)
  integrations/ # API clients for Pathways, Deploy, Domains, etc.
  oai/        # OAI orchestrator logic (tools, bus, capsule builder)
infra/
  supabase/   # Supabase SQL, migrations, and policies
  ...
```

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