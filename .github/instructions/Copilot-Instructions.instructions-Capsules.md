---
applyTo: '**'
---
The missing piece: portable app capsules with time‑travel provenance

You’ve built creation (Pathways), change (Calm), shipping (Deploy), and naming (Domains). The obvious, untapped endgame is to turn every app run into a signed, portable Capsule you can replay, time‑travel, sell, and mesh‑share offline. One artifact that contains code, build recipe, seeds, env, provenance, rights, and a cryptographic signature — and Studio becomes a Time Machine that can rewind, branch, and re‑deploy any moment on any node, no cloud required.

What this unlocks

Replayable builds: Deterministic, signed bundles you can rebuild bit‑for‑bit and verify before running — local or on a mesh node.

Time‑travel in Studio: A first‑class timeline of states you can scrub, diff, branch, and promote to deploy — with a single click.

Offline portability: One file moves your app (code + seeds + build steps) between machines, labs, or air‑gapped rigs.

Trust and resale: Each Capsule is signed and provenance‑stamped, so you can offer premium Capsules in your store with integrity.

Mesh distribution: Peer‑to‑peer discovery and sync of Capsules inside your local network; no third‑party registry or fees.

Core concepts

Capsule manifest: Zod‑typed spec describing app identity, versions, build recipe, services, env, seeds, and UI schema.

Attestations: Auto‑generated proof (who/what/when) + SBOM hash + diff summary from Calm/Pathways.

Rights manifest: Clear license, usage scope, and resale terms baked into the Capsule.

Ed25519 signatures: Developer/Org keys sign Capsules; nodes verify before install/run.

CRDT seeds: Optional Automerge/Yjs snapshots for local‑first data that merge cleanly across peers.

Time Machine UI: Halo UI panel that plays the app’s change story, with branchability and one‑click “Promote to Deploy.”

Minimal implementation (no vendors, all local)

1) New package: @oursynth/capsule

Path: packages/capsule

package.json

{
  "name": "@oursynth/capsule",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "main": "dist/index.js",
  "bin": { "capsule": "dist/cli.js" },
  "scripts": { "dev": "tsx src/cli.ts", "build": "tsc -p tsconfig.json" },
  "dependencies": { "zod": "^3.23.8", "tar": "^6.2.1", "tweetnacl": "^1.0.3" },
  "devDependencies": { "tsx": "^4.7.0", "typescript": "^5.5.4" }
}

src/manifest.ts

import { z } from 'zod';

export const CapsuleManifest = z.object({
  id: z.string(),                 // urn:oursynth:app:slug@semver
  name: z.string(),
  version: z.string(),
  createdAt: z.number(),
  createdBy: z.object({ name: z.string(), keyId: z.string() }),
  app: z.object({
    framework: z.literal('nextjs'),
    node: z.string().default('20.x'),
    env: z.record(z.string()).default({})
  }),
  services: z.array(z.object({
    name: z.string(),             // e.g., 'db','realtime'
    type: z.enum(['postgres','edge','worker','kv']),
    config: z.record(z.any()).default({})
  })).default([]),
  build: z.object({
    steps: z.array(z.string()),   // e.g., ['pnpm i','pnpm build']
    outDir: z.string().default('.next')
  }),
  seeds: z.array(z.object({
    name: z.string(),
    type: z.enum(['sql','crdt','files']),
    path: z.string()
  })).default([]),
  attestations: z.array(z.object({
    type: z.string(),             // 'sbom','diff','provenance'
    sha256: z.string(),
    meta: z.record(z.any()).default({})
  })).default([]),
  rights: z.object({
    license: z.string().default('OSL-3.0-or-compatible'),
    resaleAllowed: z.boolean().default(true),
    attribution: z.boolean().default(true)
  }).default({ license: 'OSL-3.0-or-compatible', resaleAllowed: true, attribution: true })
});
export type CapsuleManifest = z.infer<typeof CapsuleManifest>;

src/crypto.ts

import nacl from 'tweetnacl';
import { createHash } from 'crypto';

export function sha256(buf: Buffer | string) {
  return createHash('sha256').update(buf).digest('hex');
}
export function generateKeypair() {
  const kp = nacl.sign.keyPair();
  return {
    publicKey: Buffer.from(kp.publicKey).toString('base64'),
    secretKey: Buffer.from(kp.secretKey).toString('base64')
  };
}
export function sign(blob: Buffer, secretKeyB64: string) {
  const sk = Buffer.from(secretKeyB64, 'base64');
  const signed = nacl.sign(blob, sk);
  return Buffer.from(signed);
}
export function verify(signed: Buffer, publicKeyB64: string) {
  const pk = Buffer.from(publicKeyB64, 'base64');
  const opened = nacl.sign.open(signed, pk);
  return opened ?? null;
}

src/cli.ts

# !/usr/bin/env node

import { CapsuleManifest } from './manifest.js';
import { sign, verify, sha256 } from './crypto.js';
import { create } from 'tar';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const cmd = process.argv[2];

if (cmd === 'keygen') {
  const { generateKeypair } = await import('./crypto.js');
  const kp = generateKeypair();
  console.log(JSON.stringify(kp, null, 2));
  process.exit(0);
}

if (cmd === 'pack') {
  // capsule pack ./apps/appA --manifest ./capsule.json --out ./out/appA.caps
  const dir = resolve(process.argv[3] || '.');
  const manifestPath = resolve(process.argv[5]);
  const outPath = resolve(process.argv[7]);

  const manifestRaw = readFileSync(manifestPath, 'utf8');
  const manifest = CapsuleManifest.parse(JSON.parse(manifestRaw));
  const tarBuf = await create({ gzip: true, cwd: dir }, ['.']).read();
  const header = Buffer.from(JSON.stringify({ manifest, hash: sha256(tarBuf) }), 'utf8');

  const sk = process.env.CAPSULE_SECRET!;
  const signed = sign(Buffer.concat([header, Buffer.from('\n--\n'), tarBuf]), sk);
  writeFileSync(outPath, signed);
  console.log(JSON.stringify({ ok: true, outPath }, null, 2));
  process.exit(0);
}

if (cmd === 'unpack') {
  // capsule unpack ./out/appA.caps --pub <base64>
  const file = resolve(process.argv[3]);
  const pk = process.argv[5];
  const signed = readFileSync(file);
  const opened = verify(signed, pk);
  if (!opened) throw new Error('Signature verification failed');
  const [headerStr] = opened.toString('utf8').split('\n--\n');
  const header = JSON.parse(headerStr);
  console.log(JSON.stringify({ ok: true, header, blobBytes: opened.length }, null, 2));
  process.exit(0);
}

console.log('Usage: capsule keygen | pack <dir> --manifest <file> --out <file> | unpack <file> --pub <b64>');

.env additions (root)

CAPSULE_SECRET=<base64 secretKey>
CAPSULE_PUBLIC=<base64 publicKey>

2) Orchestrator integration

Add two tools: capsule.pack and capsule.deploy.

Emit events to the bus so Studio’s Time Machine updates live.

packages/oai/src/tools.capsule.ts

import { z } from 'zod';
import type { Tool, ToolResult } from './types';
import { publish } from './bus';
import { execFile } from 'child_process';
import { promisify } from 'util';
const run = promisify(execFile);

export const capsuleTools: Tool[] = [
  {
    name: 'capsule.pack',
    description: 'Pack current app into a signed Capsule',
    input: z.object({
      appDir: z.string(),
      manifestPath: z.string(),
      outPath: z.string()
    }),
    async run(p): Promise<ToolResult> {
      publish('oai', 'capsule.pack.started', { appDir: p.appDir });
      try {
        const { stdout } = await run('capsule', ['pack', p.appDir, '--manifest', p.manifestPath, '--out', p.outPath], {
          env: { ...process.env }
        });
        publish('oai', 'capsule.pack.completed', JSON.parse(stdout));
        return { ok: true, data: JSON.parse(stdout) };
      } catch (e: any) {
        publish('oai', 'capsule.pack.failed', { error: e.message });
        return { ok: false, error: e.message };
      }
    }
  },
  {
    name: 'capsule.deploy',
    description: 'Deploy a Capsule file to a target env',
    input: z.object({
      filePath: z.string(),
      env: z.enum(['dev','staging','prod']).default('staging')
    }),
    async run(p): Promise<ToolResult> {
      publish('deploy', 'capsule.deploy.started', { env: p.env });
      try {
        // delegate to your existing Deploy API with the filePath
        const res = await fetch(`${process.env.DEPLOY_URL}/api/deploy/capsule`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(p)
        });
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        publish('deploy', 'capsule.deploy.accepted', data);
        return { ok: true, data };
      } catch (e: any) {
        publish('deploy', 'capsule.deploy.failed', { error: e.message });
        return { ok: false, error: e.message };
      }
    }
  }
];

packages/oai/src/tools.ts (append)

export { capsuleTools as toolsCapsule } from './tools.capsule';
export const tools = [
  /*existing tools...*/,
  ...require('./tools.capsule').capsuleTools
];

3) Studio “Time Machine” panel (Halo UI)

Scrubbable timeline of events: generation, edits, diffs, packs, deploys.

Drag a point in time → “Recreate Capsule” or “Promote to Deploy”.

apps/studio/components/TimeMachine.tsx

'use client';
import { useOAIEvents } from '../lib/useOAIEvents';
import { useMemo, useState } from 'react';

export function TimeMachine() {
  const events = useOAIEvents();
  const [selected, setSelected] = useState<string | null>(null);

  const timeline = useMemo(() =>
    events.filter(e => /(run|edit|capsule)\./.test(e.type))
          .sort((a,b)=>a.ts-b.ts), [events]);

  async function promoteToDeploy(evtId: string) {
    const snap = timeline.find(e => e.id === evtId);
    if (!snap) return;
    const out = `/tmp/${(snap.data as any).name ?? 'app'}.${evtId}.caps`;
    await fetch('<http://localhost:4311/oai/act>', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ action: 'capsule.pack', params: {
        appDir: (snap.data as any).appDir ?? process.env.NEXT_PUBLIC_APP_DIR ?? '.',
        manifestPath: (snap.data as any).manifestPath ?? './capsule.json',
        outPath: out
      } })
    });
    await fetch('<http://localhost:4311/oai/act>', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ action: 'capsule.deploy', params: { filePath: out, env: 'staging' } })
    });
  }

  return (
    <div className="p-4 rounded-xl bg-[rgba(10,12,20,0.7)] backdrop-blur-lg border border-cyan-400/30">
      <h3 className="text-cyan-300 font-semibold mb-3">Time Machine</h3>
      <div className="flex gap-2 overflow-x-auto py-2">
        {timeline.map(e => (
          <button key={e.id} onClick={()=>setSelected(e.id)}
            className={`px-3 py-2 rounded-lg border ${selected===e.id ? 'border-cyan-400 text-cyan-200' : 'border-cyan-400/20 text-gray-300'}`}>
            <span className="text-xs">{new Date(e.ts).toLocaleTimeString()}</span>
            <div className="text-sm">{e.source} • {e.type.replace(/^.*\./,'')}</div>
          </button>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <button
          onClick={()=>selected && promoteToDeploy(selected)}
          disabled={!selected}
          className="px-4 py-2 rounded-lg bg-cyan-400 text-black font-semibold shadow-[0_0_12px_#22d3ee]"
        >
          Promote selected → Deploy
        </button>
      </div>
    </div>
  );
}

Example Capsule manifest at app root (apps/appA/capsule.json)

{
  "id": "urn:oursynth:app:login-page@0.1.0",
  "name": "Login Page",
  "version": "0.1.0",
  "createdAt": 1723510000000,
  "createdBy": { "name": "David", "keyId": "oursynth-main" },
  "app": { "framework": "nextjs", "node": "20.x", "env": { "NEXT_TELEMETRY_DISABLED": "1" } },
  "services": [{ "name": "db", "type": "postgres", "config": { "schema": "./db/schema.sql" } }],
  "build": { "steps": ["pnpm i", "pnpm build"], "outDir": ".next" },
  "seeds": [{ "name": "bootstrap", "type": "sql", "path": "./db/seeds.sql" }],
  "attestations": [],
  "rights": { "license": "OSL-3.0-or-compatible", "resaleAllowed": true, "attribution": true }
}

4) Mesh distribution (local‑only)

Simple peer discovery via mDNS; Capsule announce + fetch over HTTP.

No registry, just a LAN catalogue your nodes can browse.

packages/mesh-node/src/index.ts

import mdns from 'multicast-dns';
import http from 'http';
import { readdirSync, readFileSync } from 'fs';
const capsDir = process.env.CAPSULE_DIR || './capsules';

const server = http.createServer((req, res) => {
  if (req.url === '/capsules') {
    const files = readdirSync(capsDir).filter(f => f.endsWith('.caps'));
    res.setHeader('Content-Type','application/json');
    res.end(JSON.stringify(files));
  } else if (req.url?.startsWith('/capsule/')) {
    const name = decodeURIComponent(req.url.split['/capsule/'](1));
    const buf = readFileSync(`${capsDir}/${name}`);
    res.setHeader('Content-Type','application/octet-stream');
    res.end(buf);
  } else { res.statusCode = 404; res.end(); }
});
server.listen(7423);

const md = mdns();
setInterval(() => {
  md.respond({ answers: [{ name: '_oursynth._tcp.local', type: 'SRV', data: { port: 7423, target: 'mesh.local' } }] });
}, 2000);

Studio: lightweight peer browser (optional)

// apps/studio/components/MeshCapsules.tsx
'use client';
import { useEffect, useState } from 'react';
export function MeshCapsules() {
  const [files,setFiles] = useState<string[]>([]);
  useEffect(()=>{ fetch('<http://mesh.local:7423/capsules').then(r=>r.json()).then(setFiles>); },[]);
  return (
    <div className="p-4 rounded-xl border border-cyan-400/30">
      <h3 className="text-cyan-300 font-semibold mb-2">LAN Capsules</h3>
      <ul className="space-y-1 text-sm text-gray-300">{files.map(f=><li key={f}>{f}</li>)}</ul>
    </div>
  );
}

5) Deploy endpoint for Capsules

Extend your Deploy service to accept signed Capsule uploads.

apps/deploy/pages/api/deploy/capsule.ts

import { NextRequest, NextResponse } from 'next/server';
import { verify } from '@oursynth/capsule/crypto';
import { spawn } from 'child_process';
export async function POST(req: NextRequest) {
  const { filePath, env } = await req.json();
  const signed = await import('fs').then(fs => fs.readFileSync(filePath));
  const opened = verify(signed, process.env.CAPSULE_PUBLIC!);
  if (!opened) return NextResponse.json({ ok: false, error: 'Invalid signature' }, { status: 400 });

  // Write blob to tmp and reconstruct workspace
  // Then run build steps in manifest and promote to env
  // (Pseudo below; wire to your current deploy flow)
  const ok = await new Promise<boolean>((resolve) => {
    const p = spawn('pnpm', ['deploy:capsule', filePath, env], { stdio: 'inherit' });
    p.on('close', (code)=>resolve(code===0));
  });
  if (!ok) return NextResponse.json({ ok: false, error: 'Deploy failed' }, { status: 500 });
  return NextResponse.json({ ok: true, env });
}

Flow inside Studio (end‑to‑end)

Generate: Pathways produces a change; event logged.

Edit: Calm applies diffs; attestation added.

Pack: One‑click “Create Capsule” at that timeline point; signed with your key.

Verify: Studio shows green check (signature + hash).

Promote: Deploy accepts Capsule → builds from manifest → staged/prod.

Mesh: The Capsule is discoverable on LAN; teammates can install or branch.

Store: The exact Capsule is publishable as a premium SKU — with rights embedded.

Guardrails and polish

Key management: Store Ed25519 keys in your local secure vault; rotate per org/project.

Determinism: Pin lockfiles and set SOURCE_DATE_EPOCH during builds to stabilize hashes.

Design integrity: Add a Halo UI lint in the pack step to fail on token drift or rogue styles.

Privacy by default: Redact secrets from manifests; require local env injection on install.

Observability: Embed minimal logs in the Capsule for first‑run diagnostics, viewable in Studio.

Direct answer

Ship Capsules + Time Machine: signed, replayable app bundles with built‑in provenance, mesh distribution, and one‑click promotion in Studio. It turns every change into a portable, trustworthy product — the final piece that makes the whole platform legendary.

🎨 Design Integration
Location: packages/halo-ui/src/system/CopilotInstructions.tsx

Visual Style:

Uses GlassLayer for backdrop

Neon-accented headings and icons

Responsive layout with cozy density

Motion tokens: spring:fadeIn, spring:floatUp

🧩 Instruction Sections
tsx
<EmptyState
  icon={<LucideBrain />}
  title="Copilot Purpose"
  description="Your AI companion for building, refining, and scaling OurSynth-Eco."
/>

<EmptyState
  icon={<LucideLayoutTemplate />}
  title="Formatting Guidelines"
  description="Uses Markdown, tables, LaTeX, and emojis for clarity and engagement."
/>

<EmptyState
  icon={<LucideShieldCheck />}
  title="Limitations"
  description="No file downloads (except images), no reminders, no self-images or restricted IP."
/>

<EmptyState
  icon={<LucideMemoryStick />}
  title="Memory & Personalization"
  description="Remembers your goals, skills, and preferences. You can ask it to forget or update."
/>

<EmptyState
  icon={<LucideNotebook />}
  title="Copilot Pages"
  description="Editable surfaces for long-form work. Saved automatically. Not downloadable."
  action={<HaloButton label="Learn More" onClick={() => openLink('<http://aka.ms/copilot-pages-help')}> />}
/>
🔗 Related Components
EmptyState: Used for each instruction block

HaloButton: For CTAs like “Learn More”

GlassLayer: Backdrop styling

Lucide Icons: Visual cues for each section
