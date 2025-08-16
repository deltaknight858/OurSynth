'use client';

import React from 'react';

import { cn } from '../lib/utils';

export interface HaloProgressProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'tertiary';
  showValue?: boolean;
  animated?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-4',
};
const variantClasses = {
  primary: 'bg-[rgb(var(--halo-primary))]',
  secondary: 'bg-[rgb(var(--halo-secondary))]',
  tertiary: 'bg-[rgb(var(--halo-fg))]',
};

export default function HaloProgress({
  value,
  max = 100,
  size = 'md',
  variant = 'primary',
  showValue = false,
  animated = false,
  className,
}: HaloProgressProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div
      className={cn(
        'w-full bg-[rgba(var(--halo-fg),0.08)] rounded-full',
        sizeClasses[size],
        className,
      )}
    >
      <div
        className={cn(
          'rounded-full transition-all duration-300',
          variantClasses[variant],
          animated && 'animate-pulse',
        )}
        style={{ width: `${percent}%` }}
      />
      {showValue && (
        <span className="ml-2 text-xs text-[rgb(var(--halo-muted))]">{Math.round(percent)}%</span>
      )}
    </div>
  );
}
