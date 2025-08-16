// WizardStream: Show wizard run progress
'use client';

import { useEffect, useRef, useState } from 'react';

import { useOAIEvents } from '../../lib/useOAIEvents';

export default function WizardStream({
  runId,
  onDiff,
  onDone,
}: {
  runId: string;
  onDiff: () => void;
  onDone: () => void;
}) {
  const events = useOAIEvents();
  const [status, setStatus] = useState<any>(null);
  const [done, setDone] = useState(false);
  const liveRef = useRef<HTMLDivElement>(null);

  // Listen for wizard run events from OAI event bus
  useEffect(() => {
    const relevant = events.filter((e) => e.data?.runId === runId);
    if (relevant.length) {
      const last = relevant[relevant.length - 1];
      setStatus({
        phase: last.data.phase || last.type,
        fileCount: last.data.fileCount ?? 0,
        elapsed: last.data.elapsed ?? 0,
      });
      if (last.data.phase === 'diff') onDiff();
      if (last.data.phase === 'done') {
        setDone(true);
        onDone();
      }
    }
  }, [events, runId, onDiff, onDone]);

  const phases: Record<string, string> = {
    analyze: 'Analyzing inputs',
    generate: 'Generating files',
    lint: 'Linting & formatting',
    diff: 'Preparing diff',
    done: 'Ready!',
  };

  return (
    <div className="rounded-2xl border border-cyan-400/30 bg-[rgba(20,20,30,0.85)] p-4 text-white backdrop-blur-xl">
      <div className="font-bold text-cyan-300 mb-2">Wizard Progress</div>
      <div className="space-y-2">
        <div>Status: {phases[status?.phase || 'analyze']}</div>
        <div>Files: {status?.fileCount ?? 0}</div>
        <div>Elapsed: {status?.elapsed ?? 0}s</div>
      </div>
    </div>
  );
}
