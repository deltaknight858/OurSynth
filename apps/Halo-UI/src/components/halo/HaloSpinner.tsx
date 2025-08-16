"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface HaloSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "primary" | "secondary" | "tertiary" | "muted";
  label?: string;
  className?: string;
}

export default function HaloSpinner({
  size = "md",
  variant = "primary",
  label,
  className
}: HaloSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12"
  };

  const variantClasses = {
    primary: "text-[rgb(var(--halo-primary))]",
    secondary: "text-[rgb(var(--halo-secondary))]",
    tertiary: "text-[rgb(var(--halo-tertiary))]",
    muted: "text-[rgb(var(--halo-muted))]"
  };

  return (
    <div className={cn("flex items-center justify-center gap-3", className)}>
      <motion.div
        className={cn(
          "border-2 border-transparent rounded-full",
          sizeClasses[size],
          variantClasses[variant]
        )}
        style={{
          borderTopColor: "currentColor",
          borderRightColor: "transparent",
          borderBottomColor: "transparent",
          borderLeftColor: "transparent"
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
        role="status"
        aria-label={label || "Loading"}
      />
      
      {label && (
        <span className={cn(
          "text-sm font-medium",
          variantClasses[variant]
        )}>
          {label}
        </span>
      )}
    </div>
  );
}