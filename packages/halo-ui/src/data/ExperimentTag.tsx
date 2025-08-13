import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const variantAccent = {
  beta: 'border-neon-primary text-neon-primary',
  experimental: 'border-neon-warning text-neon-warning',
  dev: 'border-glass-border text-muted-foreground',
};

const springFadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
};

export interface ExperimentTagProps {
  label: string;
  variant?: 'beta' | 'experimental' | 'dev';
  icon?: ReactNode;
  tooltip?: string;
}

export const ExperimentTag = ({
  label,
  variant = 'beta',
  icon,
  tooltip,
}: ExperimentTagProps) => {
  return (
    <motion.span
      className={clsx(
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border glass-bg glass-border text-xs font-semibold select-none',
        variantAccent[variant],
        'backdrop-blur-md shadow-sm',
      )}
      variants={springFadeIn}
      initial="initial"
      animate="animate"
      title={tooltip}
    >
      {icon && <span className="text-base mr-1">{icon}</span>}
      {label}
      {tooltip && <span className="ml-1 text-muted-foreground">ℹ️</span>}
    </motion.span>
  );
};

// --- Slot Demos ---
// <ExperimentTag label="Beta" variant="beta" />
// <ExperimentTag label="Experimental" variant="experimental" tooltip="This feature is experimental." />
// <ExperimentTag label="Dev Only" variant="dev" icon={<CodeIcon />} />
