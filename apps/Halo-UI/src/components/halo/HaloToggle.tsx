
"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface HaloToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "tertiary";
  label?: string;
  className?: string;
}

export default function HaloToggle({
  checked = false,
  onChange,
  disabled = false,
  size = "md",
  variant = "primary",
  label,
  className
}: HaloToggleProps) {
  const handleToggle = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === " " || e.key === "Enter") && !disabled) {
      e.preventDefault();
      handleToggle();
    }
  };

  const sizeClasses = {
    sm: { container: "w-8 h-4", thumb: "w-3 h-3" },
    md: { container: "w-11 h-6", thumb: "w-4 h-4" },
    lg: { container: "w-14 h-8", thumb: "w-6 h-6" }
  };

  const variantClasses = {
    primary: checked ? "bg-[rgb(var(--halo-primary))] shadow-[0_0_20px_rgba(var(--halo-primary),0.3)]" : "",
    secondary: checked ? "bg-[rgb(var(--halo-secondary))] shadow-[0_0_20px_rgba(var(--halo-secondary),0.3)]" : "",
    tertiary: checked ? "bg-[rgb(var(--halo-tertiary))] shadow-[0_0_20px_rgba(var(--halo-tertiary),0.3)]" : ""
  };

  const baseContainerClasses = "relative inline-flex items-center rounded-full transition-all duration-[var(--halo-duration)] ease-[var(--halo-ease)] cursor-pointer halo-focus-ring";
  const uncheckedBg = "bg-[rgba(var(--halo-muted),0.3)] border border-[rgba(var(--halo-fg),0.2)]";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <button
        role="switch"
        aria-checked={checked}
        aria-disabled={disabled}
        aria-label={label}
        className={cn(
          baseContainerClasses,
          sizeClasses[size].container,
          checked ? variantClasses[variant] : uncheckedBg,
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        tabIndex={0}
      >
        <motion.div
          className={cn(
            "bg-white rounded-full shadow-sm",
            sizeClasses[size].thumb
          )}
          animate={{
            x: checked ? (size === "sm" ? 16 : size === "md" ? 20 : 24) : 2,
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        />
      </button>
      {label && (
        <label 
          className={cn(
            "text-sm text-[rgb(var(--halo-fg))] cursor-pointer select-none",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          onClick={!disabled ? handleToggle : undefined}
        >
          {label}
        </label>
      )}
    </div>
  );
}
