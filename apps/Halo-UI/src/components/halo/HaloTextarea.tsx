
"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface HaloTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: "glass" | "elevated" | "minimal";
  error?: boolean;
  label?: string;
  helperText?: string;
}

const HaloTextarea = React.forwardRef<HTMLTextAreaElement, HaloTextareaProps>(
  ({ variant = "glass", error = false, label, helperText, className, ...props }, ref) => {
    const baseClasses = "w-full rounded-halo border bg-transparent text-[rgb(var(--halo-fg))] placeholder:text-[rgb(var(--halo-muted))] transition-all duration-[var(--halo-duration)] ease-[var(--halo-ease)] focus:outline-none halo-focus-ring resize-y min-h-[100px]";
    
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
        <textarea
          ref={ref}
          className={cn(
            baseClasses,
            "px-4 py-3 text-sm",
            variantClasses[variant],
            errorClasses,
            className
          )}
          {...props}
        />
        {(helperText || error) && (
          <motion.p
            className={cn(
              "text-xs",
              error ? "text-[rgb(var(--halo-secondary))]" : "text-[rgb(var(--halo-muted))]"
            )}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {helperText}
          </motion.p>
        )}
      </div>
    );
  }
);

HaloTextarea.displayName = "HaloTextarea";

export default HaloTextarea;