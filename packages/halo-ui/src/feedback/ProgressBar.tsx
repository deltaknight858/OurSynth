import clsx from 'clsx';
import { motion, type Variants, type Transition } from 'framer-motion';
import React from 'react';

import { neon, motion as motionTokens } from '../tokens/theme';

export interface ProgressBarProps {
  progress: number;
  color?: string;
  label?: string;
}

const slideIn: Variants = {
  initial: { x: 32, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring' as Transition['type'],
      stiffness: 260,
      damping: 22,
    },
  },
};

export const ProgressBar = ({ progress, color, label }: ProgressBarProps) => (
  <div className="w-full">
    {label && <div className="mb-1 text-xs text-muted-foreground">{label}</div>}
    <div className="relative h-3 bg-glass-border rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ width: `${progress}%`, background: color || neon.primary }}
        variants={slideIn}
        initial="initial"
        animate="animate"
      />
    </div>
  </div>
);

// Slot Demo:
// <ProgressBar progress={60} label="Loading..." />
