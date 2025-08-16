// DomainForm: Add domain, show instructions
"use client";
import { useState } from "react";

export default function DomainForm({ appId }: { appId: string }) {
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    try {
      const res = await fetch("/api/domains", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appId, domain }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error);
      setResult(data);
    } catch (e: any) {
      setErr(e.message);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-2 items-center">
      <input
        className="flex-1 rounded bg-cyan-950/40 border border-cyan-700 px-3 py-2 text-white"
        placeholder="yourdomain.com"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
      />
      <button
        type="submit"
        className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded"
        disabled={!domain}
      >
        Add Domain
      </button>
      {err && <span className="text-red-400 ml-2">{err}</span>}
      {result && (
        <div className="mt-2 text-xs text-cyan-300">
          Status: {result.status}
          <br />
          DNS Records:
          <ul>
            {result.records?.map((r: any, i: number) => (
              <li key={i}>
                {r.type}: {r.value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
}
