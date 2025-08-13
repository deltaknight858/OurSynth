import React, { ReactNode } from 'react';
import { motion, type Variants, type Transition, type Easing } from 'framer-motion';
import clsx from 'clsx';

const statusAccent = {
  online: 'bg-neon-success text-neon-success border-neon-success shadow-[0_0_8px_0_theme(colors.neon.success/0.4)]',
  offline: 'bg-glass-border text-muted-foreground border-glass-border',
  error: 'bg-neon-warning text-neon-warning border-neon-warning shadow-[0_0_8px_0_theme(colors.neon.warning/0.4)]',
  pending: 'bg-neon-primary text-neon-primary border-neon-primary shadow-[0_0_8px_0_theme(colors.neon.primary/0.3)]',
  custom: 'bg-glass-border text-foreground border-glass-border',
};

const springPulse: Variants = {
  animate: {
    scale: [1, 1.15, 1],
    transition: {
      duration: 1.1,
      repeat: Infinity,
      repeatType: "loop" as Transition["repeatType"],
      ease: "easeInOut" as Easing,
    },
  },
};
const springFadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
};

export interface StatusBadgeProps {
  label: string;
  status?: 'online' | 'offline' | 'error' | 'pending' | 'custom';
  accent?: 'neon' | 'soft' | 'critical'; // for future extension
  icon?: ReactNode;
}

export const StatusBadge = ({
  label,
  status = 'custom',
  icon,
}: StatusBadgeProps) => {
  return (
    <motion.span
      className={clsx(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-medium select-none',
        statusAccent[status],
        'transition-shadow duration-300',
      )}
      variants={springFadeIn}
      initial="initial"
      animate="animate"
    >
      {status === 'online' ? (
        <motion.span
          className="inline-block w-2.5 h-2.5 rounded-full bg-neon-success mr-1"
          variants={springPulse}
          animate="animate"
        />
      ) : icon ? (
        <span className="inline-block mr-1">{icon}</span>
      ) : null}
      {label}
    </motion.span>
  );
};

// --- Slot Demos ---
// <StatusBadge label="Online" status="online" />
// <StatusBadge label="Offline" status="offline" />
// <StatusBadge label="Error" status="error" />
// <StatusBadge label="Pending" status="pending" />
// <StatusBadge label="Custom" status="custom" icon={<StarIcon />} />
