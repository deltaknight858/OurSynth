// HaloSwitch.tsx
// A Halo UI styled switch (toggle)

import React from 'react';

import { cn } from '../lib/utils';

export interface HaloSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
}

export const HaloSwitch: React.FC<HaloSwitchProps> = ({
  checked,
  onChange,
  disabled = false,
  label,
  className,
}) => {
  const handleToggle = () => {
    if (!disabled) onChange(!checked);
  };

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <button
        type="button"
        role="switch"
        aria-checked={checked ? 'true' : 'false'}
        aria-label={label || 'Switch'}
        disabled={disabled}
        tabIndex={0}
        className={cn(
          'relative inline-flex items-center w-11 h-6 rounded-full transition-all duration-[var(--halo-duration)] ease-[var(--halo-ease)] focus:outline-none halo-focus-ring',
          checked
            ? 'bg-[rgb(var(--halo-primary))] shadow-[0_0_20px_rgba(var(--halo-primary),0.3)]'
            : 'bg-[rgba(var(--halo-muted),0.3)] border border-[rgba(var(--halo-fg),0.2)]',
          disabled && 'opacity-50 cursor-not-allowed',
        )}
        onClick={handleToggle}
        onKeyDown={(e) => {
          if ((e.key === ' ' || e.key === 'Enter') && !disabled) {
            e.preventDefault();
            handleToggle();
          }
        }}
      >
        <span
          className={cn(
            'inline-block w-4 h-4 rounded-full bg-white shadow transform transition-transform duration-200',
            checked ? 'translate-x-5' : 'translate-x-1',
          )}
        />
      </button>
      {label && <span className="text-sm text-[rgb(var(--halo-fg))]">{label}</span>}
    </div>
  );
};

export default HaloSwitch;
