import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export interface HaloButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  icon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export const HaloButton: React.FC<HaloButtonProps> = ({
  label,
  onClick,
  variant = 'primary',
  icon,
  loading = false,
  disabled = false,
  className,
}) => {
  const baseStyles = 'rounded-lg px-4 py-2 font-medium transition-all duration-200 flex items-center justify-center gap-2';
  const variantStyles = {
    primary: 'bg-black border border-neon text-neon hover:shadow-neon hover:brightness-110',
    secondary: 'bg-black border border-neon-secondary text-neon-secondary hover:shadow-neon hover:brightness-110',
    ghost: 'bg-transparent text-white hover:bg-glass-bg hover:backdrop-blur-sm',
    danger: 'bg-black border border-neon-error text-neon-error hover:shadow-neon hover:brightness-110',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={clsx(
        baseStyles,
        variantStyles[variant],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        '--neon-color': variant === 'primary' ? '#00ffff' :
          variant === 'secondary' ? '#ff00ff' :
            variant === 'danger' ? '#ff0000' : '#00ffff'
      } as React.CSSProperties}
    >
      {loading ? (
        <span className="animate-pulse">Loading...</span>
      ) : (
        <>
          {icon && <span>{icon}</span>}
          <span>{label}</span>
        </>
      )}
    </motion.button>
  );
};