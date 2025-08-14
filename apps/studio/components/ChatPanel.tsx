// ChatPanel: Orchestrates OAI actions, one-click flows, progress streaming
'use client';
import { useState } from 'react';
import { useOAIEvents } from '../lib/useOAIEvents';
import { HaloScrollArea } from '@oursynth/halo-ui';
import PromptForm from './wizard/PromptForm';
import WizardStream from './wizard/WizardStream';
import DiffViewer from './wizard/DiffViewer';

export default function ChatPanel() {
  const events = useOAIEvents();
  const [runId, setRunId] = useState<string | null>(null);
  const [phase, setPhase] = useState<'idle'|'running'|'diff'|'done'>('idle');
  const [err, setErr] = useState<string | null>(null);

  function handleStart(run: string) {
    setRunId(run);
    setPhase('running');
    setErr(null);
  }
  function handleDiff() {
    setPhase('diff');
  }
  function handleDone() {
    setPhase('done');
  }

  return (
    <div className="h-full flex flex-col gap-4 p-4">
      <PromptForm onStart={handleStart} />
      {phase === 'running' && runId && (
        <WizardStream runId={runId} onDiff={handleDiff} onDone={handleDone} />
      )}
      {phase === 'diff' && runId && (
        <DiffViewer runId={runId} onDone={handleDone} />
      )}
      {err && <div className="text-red-400">{err}</div>}
      {/* Timeline of events (optional):
      <HaloScrollArea className="max-h-40 bg-black/30 rounded p-2 text-xs text-cyan-300">
        <pre className="m-0">{JSON.stringify(events, null, 2)}</pre>
      </HaloScrollArea> */}
    </div>
  );
}
