// DiffViewer: Show diff for wizard run
'use client';
import { useEffect, useState } from 'react';
import { HaloScrollArea } from '@oursynth/halo-ui';

export default function DiffViewer({ runId, onDone }: { runId: string, onDone: () => void }) {
  const [diff, setDiff] = useState<string>('');
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    // TODO: Fetch diff for runId
    setTimeout(() => {
      setDiff('// Example diff for ' + runId + '\n+ New file\n- Old file');
      onDone();
    }, 1200);
  }, [runId, onDone]);

  return (
    <div className="rounded-2xl border border-cyan-400/30 bg-[rgba(20,20,30,0.85)] p-4 text-white backdrop-blur-xl">
      <div className="font-bold text-cyan-300 mb-2">Diff Viewer</div>
      {err && <div className="text-red-400">{err}</div>}
      <HaloScrollArea className="bg-black/30 rounded p-2 text-xs max-w-full overflow-x-auto">
        <pre className="m-0">{diff}</pre>
      </HaloScrollArea>
    </div>
  );
}
