Project-wide prompt reference
This file can serve as a living catalog of prompt blueprints, system contexts, and usage patterns across Pathways and other AI-powered flows. Here's a suggested structure:

1. Overview
Purpose of the file

How prompts are consumed (e.g., Pathways, VS Code, CLI)

2. System Contexts
Shared stack assumptions (Next.js, Supabase, Halo UI)

Design conventions (motion presets, styling, routing)

Example:

ts
const systemContext = {
  stack: ['Next.js', 'TypeScript', 'Supabase', 'Halo UI'],
  conventions: {
    routing: 'app router',
    styling: 'Tailwind via Halo plugin',
    motion: 'Framer Motion presets: quick, medium, float',
  },
}
3. Prompt Blueprints
App generation

Module injection

Component scaffolding (free vs premium)

Deployment flows

Domain setup

Each blueprint could follow this shape:

ts
type GenerationIntent =
  | { kind: 'app'; name: string; features: string[] }
  | { kind: 'module'; targetApp: 'deploy'|'domains'|'web'; feature: string }
  | { kind: 'component'; name: string; variant: 'free'|'premium' }
4. Prompting Patterns
File header intent comments

Inline TODOs with constraints

Example-first generalization

Multi-file context awareness