'use client';

import React from 'react';

import { CheckIcon, MinusIcon } from './icons';
import { cn } from '../lib/utils';

export interface HaloCheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  description?: string;
  indeterminate?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'tertiary';
  error?: boolean;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

const variantClasses = {
  primary: 'border-[rgb(var(--halo-primary))] focus:ring-[rgb(var(--halo-primary))]',
  secondary: 'border-[rgb(var(--halo-secondary))] focus:ring-[rgb(var(--halo-secondary))]',
  tertiary: 'border-[rgb(var(--halo-fg))] focus:ring-[rgb(var(--halo-fg))]',
};

const HaloCheckbox = React.forwardRef<HTMLInputElement, HaloCheckboxProps>(function HaloCheckbox(
  {
    label,
    description,
    indeterminate,
    size = 'md',
    variant = 'primary',
    error = false,
    className,
    ...props
  },
  ref,
) {
  return (
    <label className={cn('flex items-center gap-2 cursor-pointer select-none', className)}>
      <span className="relative flex items-center">
        <input
          ref={ref}
          type="checkbox"
          className={cn(
            'rounded border transition-all duration-150 focus:outline-none focus:ring-2',
            sizeClasses[size],
            variantClasses[variant],
            error && 'border-[rgb(var(--halo-secondary))] focus:ring-[rgb(var(--halo-secondary))]',
          )}
          {...props}
        />
        <span className="absolute left-0 top-0 flex items-center justify-center w-full h-full pointer-events-none">
          {indeterminate ? <MinusIcon /> : props.checked ? <CheckIcon /> : null}
        </span>
      </span>
      {label && <span className="text-sm font-medium text-[rgb(var(--halo-fg))]">{label}</span>}
      {description && (
        <span className="text-xs text-[rgb(var(--halo-muted))] ml-2">{description}</span>
      )}
    </label>
  );
});

HaloCheckbox.displayName = 'HaloCheckbox';

export default HaloCheckbox;
