import { HaloButton, HaloCard } from '@oursynth/halo-ui';
import React, { useState, useEffect } from 'react';

export function OAICommandCenter() {
  const [actions, setActions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [params, setParams] = useState({});
  const [invocationId, setInvocationId] = useState('');
  const [job, setJob] = useState(null);
  const [logs, setLogs] = useState('');

  useEffect(() => {
    fetch('/api/wizard/actions')
      .then((r) => r.json())
      .then(setActions);
  }, []);

  function handleSelect(action) {
    setSelected(action);
    setParams({});
    setInvocationId('');
    setJob(null);
    setLogs('');
  }

  function handleParamChange(key, value) {
    setParams((p) => ({ ...p, [key]: value }));
  }

  async function invoke() {
    const res = await fetch(`/api/wizard/actions/${selected.id}/invoke`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inputs: params }),
    });
    const { invocationId } = await res.json();
    setInvocationId(invocationId);
    pollJob(invocationId);
  }

  async function pollJob(id) {
    let done = false;
    while (!done) {
      const res = await fetch(`/api/wizard/invocations/${id}`);
      if (!res.ok) break;
      const job = await res.json();
      setJob(job);
      setLogs(job.artifacts?.map((a) => a.artifactId).join('\n') || '');
      if (job.status === 'completed' || job.status === 'failed') done = true;
      else await new Promise((r) => setTimeout(r, 1000));
    }
  }

  return (
    <div className="fixed bottom-8 right-8 z-50 w-96 max-w-full">
      <HaloCard className="shadow-2xl bg-black/90 border-cyan-400/40">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-cyan-300 font-bold text-lg">OAI Command Center</span>
        </div>
        <div className="mb-2">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {actions.map((a) => (
              <HaloButton
                key={a.id}
                label={a.id}
                onClick={() => handleSelect(a)}
                variant={selected?.id === a.id ? 'primary' : 'secondary'}
              />
            ))}
          </div>
        </div>
        {selected && (
          <div className="mb-2">
            <div className="font-bold text-cyan-200 mb-1">{selected.description}</div>
            {selected.params.map((p) => (
              <input
                key={p}
                className="w-full mb-1 px-2 py-1 rounded bg-cyan-950/40 text-cyan-100"
                placeholder={p}
                value={params[p] || ''}
                onChange={(e) => handleParamChange(p, e.target.value)}
              />
            ))}
            <HaloButton label="Invoke" onClick={invoke} className="w-full mt-2" />
          </div>
        )}
        {invocationId && (
          <div className="mb-2 text-xs text-cyan-400">Invocation: {invocationId}</div>
        )}
        {job && (
          <div className="mb-2 text-xs">
            <div>
              Status:{' '}
              <span
                className={
                  job.status === 'completed'
                    ? 'text-green-400'
                    : job.status === 'failed'
                      ? 'text-red-400'
                      : 'text-yellow-300'
                }
              >
                {job.status}
              </span>
            </div>
            <div>
              Artifacts:{' '}
              {job.artifacts?.map((a) => (
                <span key={a.artifactId} className="block text-cyan-200">
                  {a.artifactId}
                </span>
              ))}
            </div>
          </div>
        )}
        {logs && (
          <pre className="bg-black/60 rounded p-2 text-xs text-cyan-200 max-h-40 overflow-y-auto">
            {logs}
          </pre>
        )}
      </HaloCard>
    </div>
  );
}
