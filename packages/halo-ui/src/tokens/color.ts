// ColorToken: color.ts
export const color = {
  neon: '#00fff0',
  glass: 'rgba(255,255,255,0.08)',
  success: '#00ff90',
  error: '#ff3b3b',
  info: '#00baff',
  // Optional theme variants
  theme: {
    dark: {
      bg: '#18181b',
      text: '#f4f4f5',
    },
    light: {
      bg: '#fff',
      text: '#18181b',
    },
  },
};

// Example usage in a component:
// <div style={{ background: color.glass, color: color.neon }}>Text</div>
