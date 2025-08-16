"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface HaloSliderProps {
  value: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "tertiary";
  label?: string;
  showValue?: boolean;
  className?: string;
}

export default function HaloSlider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  size = "md",
  variant = "primary",
  label,
  showValue = false,
  className
}: HaloSliderProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const sliderRef = React.useRef<HTMLDivElement>(null);

  const percentage = ((value - min) / (max - min)) * 100;

  const sizeClasses = {
    sm: { track: "h-1", thumb: "w-4 h-4" },
    md: { track: "h-2", thumb: "w-5 h-5" },
    lg: { track: "h-3", thumb: "w-6 h-6" }
  };

  const variantClasses = {
    primary: {
      fill: "bg-[rgb(var(--halo-primary))] shadow-[0_0_10px_rgba(var(--halo-primary),0.3)]",
      thumb: "bg-[rgb(var(--halo-primary))] shadow-[0_0_15px_rgba(var(--halo-primary),0.4)]"
    },
    secondary: {
      fill: "bg-[rgb(var(--halo-secondary))] shadow-[0_0_10px_rgba(var(--halo-secondary),0.3)]",
      thumb: "bg-[rgb(var(--halo-secondary))] shadow-[0_0_15px_rgba(var(--halo-secondary),0.4)]"
    },
    tertiary: {
      fill: "bg-[rgb(var(--halo-tertiary))] shadow-[0_0_10px_rgba(var(--halo-tertiary),0.3)]",
      thumb: "bg-[rgb(var(--halo-tertiary))] shadow-[0_0_15px_rgba(var(--halo-tertiary),0.4)]"
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (disabled) return;
    
    setIsDragging(true);
    updateValue(e);
    
    const handlePointerMove = (e: PointerEvent) => updateValue(e);
    const handlePointerUp = () => {
      setIsDragging(false);
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
    };

    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", handlePointerUp);
  };

  const updateValue = (e: React.PointerEvent | PointerEvent) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newValue = Math.round((min + percent * (max - min)) / step) * step;
    
    onChange?.(Math.max(min, Math.min(max, newValue)));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    let newValue = value;
    switch (e.key) {
      case "ArrowRight":
      case "ArrowUp":
        e.preventDefault();
        newValue = Math.min(max, value + step);
        break;
      case "ArrowLeft":
      case "ArrowDown":
        e.preventDefault();
        newValue = Math.max(min, value - step);
        break;
      case "Home":
        e.preventDefault();
        newValue = min;
        break;
      case "End":
        e.preventDefault();
        newValue = max;
        break;
    }
    
    if (newValue !== value) {
      onChange?.(newValue);
    }
  };

  return (
    <div className={cn("w-full", className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-3">
          {label && (
            <span className="text-sm font-medium text-[rgb(var(--halo-fg))]">
              {label}
            </span>
          )}
          {showValue && (
            <span className="text-sm text-[rgb(var(--halo-muted))]">
              {value}
            </span>
          )}
        </div>
      )}

      <div
        ref={sliderRef}
        className={cn(
          "relative w-full bg-[rgba(var(--halo-muted),0.2)] rounded-full cursor-pointer",
          sizeClasses[size].track,
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onPointerDown={handlePointerDown}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="slider"
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-disabled={disabled}
        aria-label={label}
      >
        {/* Filled track */}
        <motion.div
          className={cn(
            "absolute left-0 top-0 h-full rounded-full transition-all duration-[var(--halo-duration)] ease-[var(--halo-ease)]",
            variantClasses[variant].fill
          )}
          style={{ width: `${percentage}%` }}
        />

        {/* Thumb */}
        <motion.div
          className={cn(
            "absolute top-1/2 -translate-y-1/2 rounded-full border-2 border-white transition-all duration-[var(--halo-duration)] ease-[var(--halo-ease)] halo-focus-ring",
            sizeClasses[size].thumb,
            variantClasses[variant].thumb,
            isDragging && "scale-110"
          )}
          style={{ 
            left: `${percentage}%`,
            transform: `translate(-50%, -50%) ${isDragging ? 'scale(1.1)' : 'scale(1)'}`
          }}
          animate={{ 
            scale: isDragging ? 1.1 : 1 
          }}
          transition={{ duration: 0.15 }}
        />
      </div>
    </div>
  );
}