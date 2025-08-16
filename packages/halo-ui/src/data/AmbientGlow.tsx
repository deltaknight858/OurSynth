import clsx from 'clsx';
import { motion, type Variants, type Transition } from 'framer-motion';
import React from 'react';

const intensityBlur = {
  low: 'blur-sm',
  medium: 'blur-md',
  high: 'blur-xl',
};
const intensityGlow = {
  low: 'shadow-[0_0_24px_0_var(--glow-color,theme(colors.neon.primary/0.15))]',
  medium: 'shadow-[0_0_48px_0_var(--glow-color,theme(colors.neon.primary/0.25))]',
  high: 'shadow-[0_0_96px_0_var(--glow-color,theme(colors.neon.primary/0.4))]',
};

const springGlow: Variants = {
  animate: {
    opacity: [0.7, 1, 0.7],
    scale: [1, 1.04, 1],
    transition: {
      duration: 2.2,
      repeat: Infinity,
      repeatType: 'loop' as Transition['repeatType'],
      ease: [0.42, 0, 0.58, 1],
    },
  },
};

export interface AmbientGlowProps {
  intensity?: 'low' | 'medium' | 'high';
  color?: string;
  motion?: boolean;
  position?: 'top' | 'bottom' | 'full';
}

export const AmbientGlow = ({
  intensity = 'medium',
  color = 'var(--glow-color, theme(colors.neon.primary))',
  motion: animate = true,
  position = 'full',
}: AmbientGlowProps) => {
  const baseStyle = clsx(
    'pointer-events-none absolute left-0 w-full',
    position === 'top' && 'top-0 h-1/3',
    position === 'bottom' && 'bottom-0 h-1/3',
    position === 'full' && 'top-0 h-full',
    intensityBlur[intensity],
    intensityGlow[intensity],
  );
  return (
    <motion.div
      className={baseStyle}
      style={{ background: `radial-gradient(ellipse at center, ${color} 0%, transparent 80%)` }}
      animate={animate ? 'animate' : false}
      variants={springGlow}
    />
  );
};

// --- Slot Demos ---
// <div className="relative">
//   <AmbientGlow intensity="high" position="top" />
//   <Card>...</Card>
// </div>
// <AmbientGlow intensity="medium" color="#00fff0" position="bottom" />
