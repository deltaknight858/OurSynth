import React from 'react';
import { motion } from 'framer-motion';

export interface HaloButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  loading?: boolean;
}

const variantClasses: Record<string, string> = {
  primary: 'bg-neon-primary text-white border border-neon-primary shadow-md hover:bg-neon-secondary',
  secondary: 'bg-white text-neon-primary border border-neon-primary shadow hover:bg-neon-primary/10',
  ghost: 'bg-transparent text-neon-primary border border-neon-primary hover:bg-white/10',
  danger: 'bg-red-600 text-white border border-red-500 shadow hover:bg-red-700',
};

const spinner = (
  <svg className="animate-spin h-5 w-5 mr-2 text-current" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
  </svg>
);

export const HaloButton = React.forwardRef<HTMLButtonElement, HaloButtonProps>(
  ({ label, icon, variant = 'primary', loading, disabled, className = '', children, ...props }, ref) => (
    <motion.button
      ref={ref}
      className={`inline-flex items-center justify-center px-4 py-2 rounded-lg font-bold transition focus:outline-none focus:ring-2 focus:ring-neon-primary ${
        variantClasses[variant] || variantClasses.primary
      } ${loading ? 'opacity-70 cursor-not-allowed' : ''} ${className}`}
      disabled={disabled || loading}
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.03 }}
      {...(props as any)}
    >
      {loading && spinner}
      {icon && <span className="mr-2">{icon}</span>}
      {label || children}
    </motion.button>
  )
);

HaloButton.displayName = 'HaloButton';

export default HaloButton;
