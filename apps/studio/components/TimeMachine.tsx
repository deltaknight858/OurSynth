// TimeMachine: Event timeline, promote to deploy, Capsule pack/verify
'use client';
import { useMemo, useState } from 'react';
import { useOAIEvents } from '../lib/useOAIEvents';

export default function TimeMachine() {
  const events = useOAIEvents();
  const [selected, setSelected] = useState<string | null>(null);

  const timeline = useMemo(() => {
    return events.filter(e => e.type !== 'connected').sort((a, b) => a.ts - b.ts);
  }, [events]);

  async function promoteToDeploy(evtId: string) {
    // TODO: Capsule pack/verify, prompt for prod confirmation if needed
    alert('Promote to Deploy: ' + evtId);
  }

  return (
    <div className="h-full flex flex-col gap-2 p-4 bg-black/20 rounded-xl">
      <h2 className="text-cyan-300 font-bold mb-2">Time Machine</h2>
      <div className="flex-1 overflow-y-auto space-y-2">
        {timeline.map(evt => (
          <div key={evt.id} className={`p-2 rounded cursor-pointer ${selected===evt.id?'bg-cyan-900/40':'bg-cyan-800/10'}`} onClick={()=>setSelected(evt.id)}>
            <div className="text-xs text-cyan-200">[{new Date(evt.ts).toLocaleTimeString()}] {evt.type}</div>
            <div className="text-xs text-white/80">{JSON.stringify(evt.data)}</div>
            <button className="mt-1 text-xs text-green-400 underline" onClick={()=>promoteToDeploy(evt.id)}>Promote to Deploy</button>
          </div>
        ))}
      </div>
    </div>
  );
}
