'use client';

import { CapsuleManifest } from '@oursynth/types/capsule';
import { useState } from 'react';

type Props = { manifest: CapsuleManifest };

export function TimeMachine({ manifest }: Props) {
  const [step, setStep] = useState(0);
  const events = manifest.attestations;

  return (
    <div className="glass-panel p-6 rounded-xl shadow-neon">
      <h2 className="text-neon font-bold mb-2">{manifest.name} Timeline</h2>
      <ol className="mb-4">
        {events.map((evt, i) => (
          <li key={evt.hash} className={i === step ? 'font-bold text-neon' : ''}>
            {evt.type} by {evt.by} at {evt.at}
            {evt.diff && <pre className="bg-black/60 p-2 rounded">{evt.diff}</pre>}
          </li>
        ))}
      </ol>
      <div className="flex gap-2">
        <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
          ←
        </button>
        <span>
          {step + 1} / {events.length}
        </span>
        <button
          onClick={() => setStep(Math.min(events.length - 1, step + 1))}
          disabled={step === events.length - 1}
        >
          →
        </button>
      </div>
      <div className="mt-4">
        <button className="neon-button" onClick={() => alert('Replay not implemented yet!')}>
          Replay This State
        </button>
        <button className="neon-button ml-2" onClick={() => alert('Export coming soon!')}>
          Export Capsule
        </button>
      </div>
    </div>
  );
}
