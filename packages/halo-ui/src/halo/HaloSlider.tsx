// HaloSlider.tsx
// A Halo UI styled slider (multi-thumb ready, but single value for now)

import React from 'react';

import styles from './HaloSlider.module.css';
import { cn } from '../lib/utils';

export interface HaloSliderProps {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onValueChange?: (value: number) => void;
  disabled?: boolean;
  className?: string;
}

export const HaloSlider: React.FC<HaloSliderProps> = ({
  label,
  min = 0,
  max = 100,
  step = 1,
  value,
  onValueChange,
  disabled = false,
  className,
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <label className="block text-sm font-medium text-[rgb(var(--halo-fg))] mb-1">{label}</label>
      )}
      <div className="relative w-full h-6 flex items-center">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onValueChange?.(Number(e.target.value))}
          disabled={disabled}
          className={cn(
            'w-full h-2 bg-[rgba(var(--halo-muted),0.2)] rounded-halo appearance-none focus:outline-none halo-focus-ring',
            disabled && 'opacity-50 cursor-not-allowed',
          )}
          aria-label={label || 'Slider'}
          title={label || 'Slider'}
        />
        <span
          className={styles['halo-slider-thumb']}
          style={{
            ['--halo-slider-thumb-left' as any]: `calc(${((value - min) / (max - min)) * 100}% - 6px)`,
          }}
          aria-hidden="true"
        />
      </div>
      <div className="flex justify-between text-xs text-[rgb(var(--halo-muted))]">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

export default HaloSlider;
