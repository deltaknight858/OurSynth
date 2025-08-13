import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export interface ProgressBarProps {
  progress: number;
  color?: 'primary' | 'secondary' | 'success' | 'error';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = 'primary',
  className,
}) => {
  const colorClasses = {
    primary: 'bg-neon',
    secondary: 'bg-neon-secondary',
    success: 'bg-neon-success',
    error: 'bg-neon-error',
  };

  return (
    <div className={clsx('h-2 bg-glass-border rounded-full overflow-hidden', className)}>
      <motion.div
        className={clsx('h-full', colorClasses[color])}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
};