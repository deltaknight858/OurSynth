import React, { ReactNode } from 'react';
import { motion, type Variants, type Transition } from 'framer-motion';
import clsx from 'clsx';

const springFloatUp: Variants = {
  initial: { y: 16, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as Transition["type"],
      stiffness: 320,
      damping: 24,
    },
  },
};

const variantAccent = {
  sidebar: 'border-neon-primary text-neon-primary',
  topbar: 'border-neon-success text-neon-success',
};

export interface NavBeaconProps {
  label: string;
  active?: boolean;
  icon?: ReactNode;
  pulse?: boolean;
  variant?: 'sidebar' | 'topbar';
}

export const NavBeacon = ({
  label,
  active = false,
  icon,
  pulse = false,
  variant = 'sidebar',
}: NavBeaconProps) => {
  return (
    <motion.div
      className={clsx(
        'flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-glass-bg font-medium text-sm cursor-pointer select-none',
        variantAccent[variant],
        active ? 'shadow-[0_0_12px_0_theme(colors.neon.primary/0.3)]' : '',
        'transition-shadow duration-300',
      )}
      variants={springFloatUp}
      initial="initial"
      animate={active ? 'animate' : false}
    >
      {icon && (
        <motion.span
          className={clsx('text-lg', pulse && active ? 'animate-pulse' : '')}
        >
          {icon}
        </motion.span>
      )}
      <span>{label}</span>
      {active && variant === 'topbar' && (
        <span className="ml-2 h-1 w-6 rounded-full bg-neon-success animate-pulse" />
      )}
    </motion.div>
  );
};

// --- Slot Demos ---
// <NavBeacon label="Studio" active icon={<WandIcon />} />
// <NavBeacon label="Deploy" variant="topbar" active pulse icon={<RocketIcon />} />
// <NavBeacon label="Templates" />
