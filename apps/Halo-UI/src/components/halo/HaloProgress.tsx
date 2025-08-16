
"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface HaloProgressProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "tertiary";
  showValue?: boolean;
  animated?: boolean;
  className?: string;
}

export default function HaloProgress({
  value,
  max = 100,
  size = "md",
  variant = "primary",
  showValue = false,
  animated = true,
  className
}: HaloProgressProps) {
  const percentage = Math.min((value / max) * 100, 100);

  const sizeClasses = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4"
  };

  const variantClasses = {
    primary: "bg-[rgb(var(--halo-primary))] shadow-[0_0_10px_rgba(var(--halo-primary),0.3)]",
    secondary: "bg-[rgb(var(--halo-secondary))] shadow-[0_0_10px_rgba(var(--halo-secondary),0.3)]",
    tertiary: "bg-[rgb(var(--halo-tertiary))] shadow-[0_0_10px_rgba(var(--halo-tertiary),0.3)]"
  };

  return (
    <div className={cn("w-full", className)}>
      {showValue && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-[rgb(var(--halo-fg))]">Progress</span>
          <span className="text-sm text-[rgb(var(--halo-muted))]">{Math.round(percentage)}%</span>
        </div>
      )}
      
      <div 
        className={cn(
          "relative w-full bg-[rgba(var(--halo-muted),0.2)] rounded-full overflow-hidden",
          sizeClasses[size]
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemax={max}
        aria-valuemin={0}
      >
        <motion.div
          className={cn(
            "h-full rounded-full transition-all duration-[var(--halo-duration)] ease-[var(--halo-ease)]",
            variantClasses[variant]
          )}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{
            duration: animated ? 0.8 : 0,
            ease: "easeOut",
            delay: animated ? 0.1 : 0
          }}
        />
        
        {/* Animated shimmer effect */}
        {animated && percentage > 0 && (
          <motion.div
            className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{
              x: ["-100%", "100%"]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ width: `${percentage}%` }}
          />
        )}
      </div>
    </div>
  );
}
