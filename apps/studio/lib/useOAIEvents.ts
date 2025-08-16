// useOAIEvents: Subscribe to OAI event bus via Socket.IO
'use client';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

type OAIEvent = {
  id: string;
  ts: number;
  source: 'oai' | 'pathways' | 'deploy' | 'domains' | 'calm';
  type: string;
  data: Record<string, unknown>;
};

export function useOAIEvents() {
  const [events, setEvents] = useState<OAIEvent[]>([]);
  useEffect(() => {
    const s: Socket = io(process.env.NEXT_PUBLIC_OAI_WS ?? 'http://localhost:4311', {
      path: '/socket.io',
    });
    s.on('oai:event', (evt: OAIEvent) => setEvents((prev) => [...prev, evt]));
    s.on('connect', () =>
      setEvents((prev) => [
        ...prev,
        { id: 'hello', ts: Date.now(), source: 'oai', type: 'connected', data: {} },
      ]),
    );
    return () => s.disconnect();
  }, []);
  return events;
}
