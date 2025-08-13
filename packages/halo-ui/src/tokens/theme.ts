// packages/halo-ui/src/tokens/theme.ts
export const neon = {
  primary: '#00fff0', // main accent
  success: '#00ff90',
  warning: '#ffb300',
  error: '#ff3b3b',
  info: '#00baff',
};

export const glass = {
  bg: 'bg-white/10 backdrop-blur-md',
  border: 'border-white/20',
  shadow: 'shadow-[0_4px_32px_0_rgba(0,255,240,0.08)]',
};

export const density = {
  compact: 'py-2 px-3',
  comfy: 'py-4 px-6',
};

export const rounding = {
  sm: 'rounded-lg',
  md: 'rounded-xl',
  lg: 'rounded-2xl',
  pill: 'rounded-full',
};

export const motion = {
  floatUp: {
    initial: { y: 24, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 320, damping: 24 } },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.4 } },
  },
  slideIn: {
    initial: { x: 32, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 260, damping: 22 } },
  },
  scaleIn: {
    initial: { scale: 0.92, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 220, damping: 22 } },
  },
  pulse: {
    animate: {
      scale: [1, 1.08, 1],
      transition: { duration: 1.2, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' },
    },
  },
};

export const shadow = {
  neon: 'shadow-[0_0_24px_0_theme(colors.neon.primary/0.25)]',
  glass: 'shadow-[0_4px_32px_0_rgba(0,255,240,0.08)]',
};

// Usage: import { neon, glass, motion, density, rounding, shadow } from "@halo-ui/tokens/theme";
