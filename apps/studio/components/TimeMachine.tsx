// TimeMachine: Event timeline, promote to deploy, Capsule pack/verify
'use client';
import { useMemo, useState } from 'react';
import { MeshSimEvidencePane } from '../src/features/provenance/MeshSimEvidencePane';
import { HaloScrollArea } from '@oursynth/halo-ui';
import { useOAIEvents } from '../lib/useOAIEvents';

export default function TimeMachine() {
  const events = useOAIEvents();
  const [selected, setSelected] = useState<string | null>(null);
  const [meshSimResult, setMeshSimResult] = useState<any | null>(null);

  const timeline = useMemo(() => {
    return events.filter(e => e.type !== 'connected').sort((a, b) => a.ts - b.ts);
  }, [events]);

  async function promoteToDeploy(evtId: string) {
    alert('Promote to Deploy: ' + evtId);
  }

  async function showMeshSimEvidence(simId: string) {
    const res = await fetch(`/api/mesh-sim/result/${simId}`);
    const { artifact } = await res.json();
    setMeshSimResult(artifact);
  }

  return (
    <div className="h-full flex flex-col gap-2 p-4 bg-black/20 rounded-xl">
      <h2 className="text-cyan-300 font-bold mb-2">Time Machine</h2>
      <HaloScrollArea className="flex-1 space-y-2">
        {timeline.map(evt => (
          <div key={evt.id} className={`p-2 rounded cursor-pointer ${selected===evt.id?'bg-cyan-900/40':'bg-cyan-800/10'}`} onClick={()=>setSelected(evt.id)}>
            <div className="text-xs text-cyan-200">[{new Date(evt.ts).toLocaleTimeString()}] {evt.type}</div>
            <div className="text-xs text-white/80">{JSON.stringify(evt.data)}</div>
            {evt.data && typeof evt.data === 'object' && 'meshSimResult' in evt.data &&
              typeof (evt.data as any).meshSimResult === 'object' &&
              (evt.data as any).meshSimResult.simId && (
                <button className="ml-2 px-2 py-1 rounded bg-cyan-700/40 text-cyan-100 text-xs font-bold" onClick={e => { e.stopPropagation(); showMeshSimEvidence((evt.data as any).meshSimResult.simId); }}>
                  Simulation Evidence
                </button>
            )}
            <button className="mt-1 text-xs text-green-400 underline" onClick={()=>promoteToDeploy(evt.id)}>Promote to Deploy</button>
          </div>
        ))}
      </HaloScrollArea>
      {meshSimResult && <MeshSimEvidencePane result={meshSimResult} onReplay={()=>{}} />}
    </div>
  );
}
