"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check, Minus } from "lucide-react";

export interface HaloCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  description?: string;
  indeterminate?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "tertiary";
  error?: boolean;
}

const HaloCheckbox = React.forwardRef<HTMLInputElement, HaloCheckboxProps>(
  ({ 
    label, 
    description, 
    indeterminate = false, 
    size = "md", 
    variant = "primary", 
    error = false,
    checked,
    className,
    ...props 
  }, ref) => {
    const sizeClasses = {
      sm: { box: "w-4 h-4", icon: 12, text: "text-sm" },
      md: { box: "w-5 h-5", icon: 14, text: "text-sm" },
      lg: { box: "w-6 h-6", icon: 16, text: "text-base" }
    };

    const variantClasses = {
      primary: checked || indeterminate 
        ? "bg-[rgb(var(--halo-primary))] border-[rgb(var(--halo-primary))] shadow-[0_0_10px_rgba(var(--halo-primary),0.3)]" 
        : "",
      secondary: checked || indeterminate
        ? "bg-[rgb(var(--halo-secondary))] border-[rgb(var(--halo-secondary))] shadow-[0_0_10px_rgba(var(--halo-secondary),0.3)]"
        : "",
      tertiary: checked || indeterminate
        ? "bg-[rgb(var(--halo-tertiary))] border-[rgb(var(--halo-tertiary))] shadow-[0_0_10px_rgba(var(--halo-tertiary),0.3)]"
        : ""
    };

    const baseBoxClasses = "relative rounded-halo-sm border-2 transition-all duration-[var(--halo-duration)] ease-[var(--halo-ease)] halo-focus-ring cursor-pointer";
    const uncheckedClasses = "border-[rgba(var(--halo-fg),0.3)] hover:border-[rgba(var(--halo-fg),0.5)] halo-glass";
    const errorClasses = error ? "border-[rgb(var(--halo-secondary))] shadow-[0_0_10px_rgba(var(--halo-secondary),0.2)]" : "";

    return (
      <div className={cn("flex items-start gap-3", className)}>
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            checked={checked}
            className="sr-only"
            {...props}
          />
          
          <div
            className={cn(
              baseBoxClasses,
              sizeClasses[size].box,
              (checked || indeterminate) ? variantClasses[variant] : uncheckedClasses,
              errorClasses,
              props.disabled && "opacity-50 cursor-not-allowed"
            )}
            onClick={() => !props.disabled && props.onChange?.({ target: { checked: !checked } } as React.ChangeEvent<HTMLInputElement>)}
          >
            {(checked || indeterminate) && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center text-white"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                {indeterminate ? (
                  <Minus size={sizeClasses[size].icon} />
                ) : (
                  <Check size={sizeClasses[size].icon} />
                )}
              </motion.div>
            )}
          </div>
        </div>

        {(label || description) && (
          <div className="flex-1">
            {label && (
              <label 
                className={cn(
                  "block font-medium text-[rgb(var(--halo-fg))] cursor-pointer select-none",
                  sizeClasses[size].text,
                  props.disabled && "opacity-50 cursor-not-allowed"
                )}
                onClick={() => !props.disabled && props.onChange?.({ target: { checked: !checked } } as React.ChangeEvent<HTMLInputElement>)}
              >
                {label}
              </label>
            )}
            {description && (
              <p className={cn(
                "text-[rgb(var(--halo-muted))] mt-1",
                size === "sm" ? "text-xs" : "text-sm",
                props.disabled && "opacity-50"
              )}>
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

HaloCheckbox.displayName = "HaloCheckbox";

export default HaloCheckbox;