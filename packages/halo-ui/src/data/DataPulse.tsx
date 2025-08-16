import clsx from 'clsx';
import { motion, easeInOut } from 'framer-motion';
import React, { ReactNode } from 'react';

// Shared motion tokens
const springPulse = {
  animate: {
    scale: [1, 1.08, 1],
    transition: { duration: 1.2, repeat: Infinity, repeatType: 'loop' as const, ease: easeInOut },
  },
};
const springFadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } },
};

const accentColors = {
  neon: 'border-neon-primary text-neon-primary shadow-[0_0_12px_0_theme(colors.neon.primary/0.3)]',
  soft: 'border-glass-border text-muted-foreground',
  critical:
    'border-neon-warning text-neon-warning shadow-[0_0_12px_0_theme(colors.neon.warning/0.3)]',
};

export interface DataPulseProps {
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  icon?: ReactNode;
  accent?: 'neon' | 'soft' | 'critical';
}

export const DataPulse = ({
  label,
  value,
  trend = 'neutral',
  icon,
  accent = 'neon',
}: DataPulseProps) => {
  return (
    <motion.div
      className={clsx(
        'flex items-center gap-3 rounded-lg border glass-bg glass-border py-3 px-4 min-w-[180px] max-w-xs',
        accentColors[accent],
        'backdrop-blur-md shadow',
      )}
      variants={springFadeIn}
      initial="initial"
      animate="animate"
    >
      {icon && (
        <motion.div className="text-2xl" variants={springPulse} animate="animate">
          {icon}
        </motion.div>
      )}
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-lg tabular-nums flex items-center gap-1">
          {value}
          {trend === 'up' && <span className="text-neon-success">▲</span>}
          {trend === 'down' && <span className="text-neon-warning">▼</span>}
        </div>
        <div className="text-xs text-muted-foreground mt-0.5 truncate">{label}</div>
      </div>
    </motion.div>
  );
};

// --- Slot Demos ---
// 1. Live deployment status
// <DataPulse
//   label="Active Deployments"
//   value={3}
//   trend="up"
//   icon={<RocketIcon />}
//   accent="neon"
// />
//
// 2. User engagement
// <DataPulse
//   label="Active Users"
//   value={128}
//   trend="neutral"
//   icon={<UserIcon />}
//   accent="soft"
// />
//
// 3. Error rate
// <DataPulse
//   label="Error Rate"
//   value="0.2%"
//   trend="down"
//   icon={<AlertTriangleIcon />}
//   accent="critical"
// />
