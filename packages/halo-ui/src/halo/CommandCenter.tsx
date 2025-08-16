'use client';

import React from 'react';

import { cn } from '../lib/utils';

export interface CommandCenterProps {
  commands: string[];
  onCommand: (cmd: string) => void;
  className?: string;
}

const CommandCenter: React.FC<CommandCenterProps> = ({ commands, onCommand, className }) => {
  const [input, setInput] = React.useState('');

  const handleCommand = () => {
    if (input.trim()) {
      onCommand(input);
      setInput('');
    }
  };

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <input
        className="rounded border px-3 py-2 text-[rgb(var(--halo-fg))] bg-transparent focus:outline-none"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleCommand()}
        placeholder="Type a command..."
      />
      <div className="flex flex-wrap gap-2">
        {commands.map((cmd) => (
          <button
            key={cmd}
            className="rounded px-3 py-1 bg-[rgb(var(--halo-primary))] text-white"
            onClick={() => onCommand(cmd)}
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CommandCenter;
