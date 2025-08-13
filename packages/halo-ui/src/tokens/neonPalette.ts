// Centralized neon accent palette and glow variants for Halo UI
export const neonPalette = {
  plasma: '#a259ff', // purple
  neonCyan: '#00fff7',
  neonGreen: '#00ff85',
  neonBlue: '#00baff',
  neonPink: '#ff4ecd',
  neonYellow: '#ffe600',
  neutralGlass: '#181a20cc',
  // Glow shadow utilities
  glow: {
    cyan: '0 0 8px 2px #00fff7, 0 0 24px 4px #00fff755',
    purple: '0 0 8px 2px #a259ff, 0 0 24px 4px #a259ff55',
    green: '0 0 8px 2px #00ff85, 0 0 24px 4px #00ff8555',
    blue: '0 0 8px 2px #00baff, 0 0 24px 4px #00baff55',
    pink: '0 0 8px 2px #ff4ecd, 0 0 24px 4px #ff4ecd55',
    yellow: '0 0 8px 2px #ffe600, 0 0 24px 4px #ffe60055',
  },
};

// Example: style={{ boxShadow: neonPalette.glow.cyan }}
