
"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface HaloInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: "glass" | "elevated" | "minimal";
  size?: "sm" | "md" | "lg";
  error?: boolean;
  label?: string;
}

const HaloInput = React.forwardRef<HTMLInputElement, HaloInputProps>(
  ({ variant = "glass", size = "md", error = false, label, className, ...props }, ref) => {
    const baseClasses = "w-full rounded-halo border bg-transparent text-[rgb(var(--halo-fg))] placeholder:text-[rgb(var(--halo-muted))] transition-all duration-[var(--halo-duration)] ease-[var(--halo-ease)] focus:outline-none halo-focus-ring";
    
    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base"
    };

    const variantClasses = {
      glass: "halo-glass border-[rgba(var(--halo-fg),0.1)] focus:border-[rgba(var(--halo-primary),0.3)] focus:shadow-[0_0_20px_rgba(var(--halo-primary),0.1)]",
      elevated: "bg-[rgb(var(--halo-bg-elev))] border-[rgba(var(--halo-fg),0.2)] focus:border-[rgba(var(--halo-primary),0.5)] shadow-sm",
      minimal: "border-[rgba(var(--halo-fg),0.2)] focus:border-[rgba(var(--halo-primary),0.5)] hover:border-[rgba(var(--halo-fg),0.3)]"
    };

    const errorClasses = error 
      ? "border-[rgb(var(--halo-secondary))] focus:border-[rgb(var(--halo-secondary))] focus:shadow-[0_0_20px_rgba(var(--halo-secondary),0.2)]"
      : "";

    return (
      <div className="space-y-2">
        {label && (
          <motion.label
            className="block text-sm font-medium text-[rgb(var(--halo-fg))]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {label}
          </motion.label>
        )}
        <input
          ref={ref}
          className={cn(
            baseClasses,
            sizeClasses[size],
            variantClasses[variant],
            errorClasses,
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

HaloInput.displayName = "HaloInput";

export default HaloInput;