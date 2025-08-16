'use client';

import React from 'react';

import { cn } from '../lib/utils';
export interface HaloInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'glass' | 'elevated' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  error?: boolean;
  label?: string;
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

const variantClasses = {
  glass:
    'halo-glass border-[rgba(var(--halo-fg),0.1)] focus:border-[rgba(var(--halo-primary),0.3)] focus:shadow-[0_0_20px_rgba(var(--halo-primary),0.1)]',
  elevated:
    'bg-[rgb(var(--halo-bg-elev))] border-[rgba(var(--halo-fg),0.2)] focus:border-[rgba(var(--halo-primary),0.5)] shadow-sm',
  minimal:
    'border-[rgba(var(--halo-fg),0.2)] focus:border-[rgba(var(--halo-primary),0.5)] hover:border-[rgba(var(--halo-fg),0.3)]',
};

/**
 * `HaloInput` is a customizable input component built with React and Tailwind CSS.
 * It supports different visual variants, sizes, error states, and optional labeling.
 *
 * @param {Object} props - The properties for the HaloInput component.
 * @param {'glass' | string} [props.variant='glass'] - Visual style variant of the input.
 * @param {'md' | string} [props.size='md'] - Size of the input.
 * @param {boolean} [props.error=false] - If true, displays the input in an error state.
 * @param {string} [props.label] - Optional label displayed above the input.
 * @param {string} [props.className] - Additional CSS classes for the container.
 * @param {React.Ref<HTMLInputElement>} ref - Ref forwarded to the underlying input element.
 * @returns {JSX.Element} The rendered HaloInput component.
 *
 * @example
 * ```tsx
 * <HaloInput label="Username" error={hasError} variant="glass" size="md" />
 * ```
 */
const HaloInput = React.forwardRef<HTMLInputElement, HaloInputProps>(function HaloInput(
  { variant = 'glass', size = 'md', error = false, label, className, ...props },
  ref,
) {
  const baseClasses =
    'w-full rounded-halo border bg-transparent text-[rgb(var(--halo-fg))] placeholder:text-[rgb(var(--halo-muted))] transition-all duration-[var(--halo-duration)] ease-[var(--halo-ease)] focus:outline-none halo-focus-ring';
  const errorClasses = error
    ? 'border-[rgb(var(--halo-secondary))] focus:border-[rgb(var(--halo-secondary))] focus:shadow-[0_0_20px_rgba(var(--halo-secondary),0.2)]'
    : '';
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {label && <label className="font-medium text-sm text-[rgb(var(--halo-fg))]">{label}</label>}
      <input
        ref={ref}
        className={cn(baseClasses, sizeClasses[size], variantClasses[variant], errorClasses)}
        {...props}
      />
      {/* ...existing code... */}
    </div>
  );
});

HaloInput.displayName = 'HaloInput';

export default HaloInput;
