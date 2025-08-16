// DevtoolsOverlay: Simple overlay for inspecting theme and tokens
import React from 'react';

import { useTheme } from './SystemUtilities';
import { getToken } from './TokenManager';

export const DevtoolsOverlay = () => {
  const { theme, setTheme } = useTheme();
  const neonColor = getToken('color.neon') as unknown as string | undefined;
  const spacingMd = getToken('spacing.md') as unknown as string | undefined;
  const radiusLg = getToken('radius.lg') as unknown as string | undefined;
  return (
    <div className="fixed bottom-4 right-4 z-[9999] bg-[#181820d9] text-[#00fff0] p-4 rounded-xl text-sm shadow-[0_2px_16px_0_#00fff088]">
      <div className="mb-2 font-bold">Halo UI Devtools</div>
      <div>
        Theme: <b>{theme}</b>
      </div>
      <div className="my-2 flex gap-2">
        <button
          onClick={() => setTheme('light')}
          className="px-2 py-1 rounded bg-white/10 hover:bg-white/20"
        >
          Light
        </button>
        <button
          onClick={() => setTheme('dark')}
          className="px-2 py-1 rounded bg-white/10 hover:bg-white/20"
        >
          Dark
        </button>
        <button
          onClick={() => setTheme('neon')}
          className="px-2 py-1 rounded bg-white/10 hover:bg-white/20"
        >
          Neon
        </button>
      </div>
      <div className="mt-2 space-y-1">
        <div>
          Primary Neon: <span style={{ color: neonColor }}>{neonColor ? '■' : '?'}</span>{' '}
          {neonColor || 'N/A'}
        </div>
        <div>Spacing md: {spacingMd || 'N/A'}</div>
        <div>Radius lg: {radiusLg || 'N/A'}</div>
      </div>
    </div>
  );
};

// Usage: Place <DevtoolsOverlay /> inside your app root (within ThemeProvider)
