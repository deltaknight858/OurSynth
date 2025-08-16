// HaloRange.tsx
// A Halo UI styled range input (slider)

import React from "react";
import { cn } from "../lib/utils";

export interface HaloRangeProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onValueChange?: (value: number) => void;
  disabled?: boolean;
  className?: string;
}

export const HaloRange: React.FC<HaloRangeProps> = ({
  label,
  min = 0,
  max = 100,
  step = 1,
  value,
  onValueChange,
  disabled = false,
  className,
  onChange,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    onValueChange?.(Number(e.target.value));
  };
  return (
    <div className={cn("space-y-2", className)}>
      {label && <label className="block text-sm font-medium text-[rgb(var(--halo-fg))] mb-1">{label}</label>}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={cn(
          "w-full h-2 bg-[rgba(var(--halo-muted),0.2)] rounded-halo appearance-none focus:outline-none halo-focus-ring",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        {...props}
      />
      <div className="flex justify-between text-xs text-[rgb(var(--halo-muted))]">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

export default HaloRange;
