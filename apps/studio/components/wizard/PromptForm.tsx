// PromptForm: Start wizard run
'use client';
import { useState } from 'react';

export default function PromptForm({ onStart }: { onStart: (runId: string) => void }) {
  const [goal, setGoal] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      // Call OAI orchestrator to start a wizard run
      const res = await fetch('/oai/act', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'pathways.generate',
          params: { wizardConfig: { goal } },
        }),
      });
      const data = await res.json();
      if (!data.ok || !data.data?.runId) throw new Error(data.error || 'Failed to start run');
      onStart(data.data.runId);
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-2 items-center">
      <input
        className="flex-1 rounded bg-cyan-950/40 border border-cyan-700 px-3 py-2 text-white"
        placeholder="What do you want to build? (e.g. login page)"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        disabled={busy}
      />
      <button
        type="submit"
        className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded"
        disabled={busy || !goal}
      >
        {busy ? 'Starting...' : 'Start'}
      </button>
      {err && <span className="text-red-400 ml-2">{err}</span>}
    </form>
  );
}
