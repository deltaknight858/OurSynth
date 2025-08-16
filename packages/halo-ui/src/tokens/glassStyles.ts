// Centralized glass morphism styles for Halo UI
export const glassStyles = {
  base: 'bg-white/10 backdrop-blur-md border border-white/20 shadow-glass',
  elevated: 'bg-white/15 backdrop-blur-lg border border-white/25 shadow-glass-lg',
  neon: 'bg-gradient-to-br from-[rgba(0,255,255,0.08)] to-[rgba(0,0,0,0.12)] backdrop-blur-xl border border-cyan-400/20 shadow-neon',
  rounded: 'rounded-2xl',
  pill: 'rounded-full',
  padding: 'p-4 md:p-6',
  maxWidth: 'max-w-4xl',
};

// Example usage: <div className={`${glassStyles.base} ${glassStyles.rounded} ${glassStyles.padding}`}>...</div>
