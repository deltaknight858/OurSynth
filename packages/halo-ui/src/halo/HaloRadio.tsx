// HaloRadio.tsx
// A Halo UI radio group with optional dynamic audio visualizer

import React from 'react';

import { cn } from '../lib/utils';

export interface HaloRadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface HaloRadioProps {
  name: string;
  options: HaloRadioOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  disabled?: boolean;
  showVisualizer?: boolean;
  visualizerLevel?: number; // 0-1, for dynamic effect
  className?: string;
}

export const HaloRadio: React.FC<HaloRadioProps> = ({
  name,
  options,
  value,
  onChange,
  label,
  disabled = false,
  showVisualizer = false,
  visualizerLevel = 0,
  className,
}) => {
  return (
    <fieldset className={cn('space-y-2', className)} disabled={disabled}>
      {label && (
        <legend className="block text-sm font-medium text-[rgb(var(--halo-fg))] mb-2">
          {label}
        </legend>
      )}
      <div className="flex flex-col gap-2">
        {options.map((opt) => (
          <label
            key={opt.value}
            className={cn(
              'flex items-center gap-3 cursor-pointer select-none p-2 rounded-halo transition-all',
              value === opt.value
                ? 'bg-[rgba(var(--halo-primary),0.08)]'
                : 'hover:bg-[rgba(var(--halo-fg),0.03)]',
              opt.disabled && 'opacity-50 cursor-not-allowed',
            )}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => !opt.disabled && onChange(opt.value)}
              disabled={disabled || opt.disabled}
              className="accent-[rgb(var(--halo-primary))] w-4 h-4"
            />
            <span className="text-[rgb(var(--halo-fg))] text-sm">{opt.label}</span>
            {showVisualizer && value === opt.value && (
              <span className="ml-2 flex items-center h-4">
                <span
                  className={cn(
                    'block w-6 h-2 rounded bg-[rgb(var(--halo-primary))] transition-all duration-200',
                    'halo-radio-visualizer',
                  )}
                  data-width={16 + 24 * visualizerLevel}
                  data-opacity={0.7 + 0.3 * visualizerLevel}
                  style={{
                    width: `${16 + 24 * visualizerLevel}px`,
                    opacity: 0.7 + 0.3 * visualizerLevel,
                  }}
                />
              </span>
            )}
          </label>
        ))}
      </div>
    </fieldset>
  );
};

export default HaloRadio;
