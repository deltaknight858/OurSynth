
"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface HaloBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "tertiary" | "ghost" | "glass";
  size?: "sm" | "md" | "lg";
  pulse?: boolean;
  children: React.ReactNode;
}

export default function HaloBadge({
  variant = "primary",
  size = "md",
  pulse = false,
  children,
  className,
  ...props
}: HaloBadgeProps) {
  const baseClasses = "inline-flex items-center justify-center rounded-halo-sm font-medium transition-all duration-[var(--halo-duration)] ease-[var(--halo-ease)]";
  
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
    lg: "px-3 py-1.5 text-sm"
  };

  const variantClasses = {
    primary: "bg-[rgba(var(--halo-primary),0.15)] text-[rgb(var(--halo-primary))] border border-[rgba(var(--halo-primary),0.3)]",
    secondary: "bg-[rgba(var(--halo-secondary),0.15)] text-[rgb(var(--halo-secondary))] border border-[rgba(var(--halo-secondary),0.3)]",
    tertiary: "bg-[rgba(var(--halo-tertiary),0.15)] text-[rgb(var(--halo-tertiary))] border border-[rgba(var(--halo-tertiary),0.3)]",
    ghost: "bg-transparent text-[rgb(var(--halo-fg))] border border-[rgba(var(--halo-fg),0.2)]",
    glass: "halo-glass text-[rgb(var(--halo-fg))]"
  };

  return (
    <span
      className={cn(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        pulse && "animate-pulse",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}