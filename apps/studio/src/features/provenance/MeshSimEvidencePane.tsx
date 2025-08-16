import { HaloButton } from '@oursynth/halo-ui';
import React from 'react';

export function MeshSimEvidencePane({ result, onReplay }: { result: any; onReplay: () => void }) {
  return (
    <div className="p-6 rounded-xl bg-black/80 border border-cyan-400/30 text-white max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-block w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
        <span className="font-bold text-cyan-300 text-lg">Simulation Evidence</span>
        <span
          className={`ml-2 px-2 py-1 rounded text-xs ${result.outcome === 'pass' ? 'bg-green-700/60 text-green-200' : 'bg-red-700/60 text-red-200'}`}
        >
          {result.outcome.toUpperCase()}
        </span>
      </div>
      <div className="mb-2 text-sm">
        <b>Sim ID:</b> {result.simId}
        <br />
        <b>Capsule Hash:</b> <span className="font-mono text-cyan-200">{result.capsuleHash}</span>
        <br />
        <b>Nodes:</b> {result.params.nodes} | <b>Latency:</b> {result.params.latencyMs[0]}–
        {result.params.latencyMs[1]}ms | <b>Packet Loss:</b> {result.params.packetLoss}%<br />
        {result.params.chaosMode && <span className="text-amber-400">Chaos Mode: ON</span>}
      </div>
      <div className="mb-4">
        <b>Node Reports:</b>
        <ul className="pl-4 mt-1 space-y-1">
          {result.nodeReports.map((n: any) => (
            <li key={n.nodeId} className="border-l-4 pl-2 border-cyan-600">
              <span className="font-mono text-cyan-200">{n.nodeId}</span> –{' '}
              {n.signatureVerified ? '✅' : '❌'}
              <ul className="pl-4 text-xs">
                {n.phases.map((p: any, i: number) => (
                  <li key={i} className={p.status === 'ok' ? 'text-green-300' : 'text-red-300'}>
                    {p.name}: {p.status} ({p.start} → {p.end}){' '}
                    {p.details && <span className="text-gray-400">{p.details}</span>}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <b>Latency Matrix:</b>
        <pre className="bg-black/40 rounded p-2 text-xs overflow-x-auto">
          {result.latencyMatrix.map((row: number[], i: number) => row.join(' ')).join('\n')}
        </pre>
      </div>
      <div className="mb-4 text-xs text-gray-400">
        <b>Started:</b> {result.startedAt} | <b>Ended:</b> {result.endedAt}
        <br />
        <b>Signed By:</b> <span className="font-mono text-cyan-200">{result.signedBy}</span>
      </div>
      <div className="flex gap-4 mt-4">
        <HaloButton label="Replay Simulation" onClick={onReplay} />
        <a
          href={`/api/mesh-sim/result/${result.simId}`}
          download
          className="text-cyan-300 underline text-sm"
        >
          Export Evidence (.capsim)
        </a>
      </div>
    </div>
  );
}
