
"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface HaloCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "glass" | "elevated" | "minimal";
  glow?: "primary" | "secondary" | "tertiary" | "none";
  children: React.ReactNode;
}

export default function HaloCard({
  variant = "glass",
  glow = "none",
  children,
  className,
  ...props
}: HaloCardProps) {
  const baseClasses = "relative rounded-halo transition-all duration-[var(--halo-duration)] ease-[var(--halo-ease)]";
  
  const variantClasses = {
    glass: "halo-glass shadow-[var(--halo-shadow)]",
    elevated: "bg-[rgb(var(--halo-bg-elev))] shadow-[var(--halo-shadow)] border border-[rgba(var(--halo-fg),0.1)]",
    minimal: "bg-transparent border border-[rgba(var(--halo-fg),0.1)]"
  };

  const glowClasses = {
    primary: "hover:shadow-[0_0_40px_rgba(var(--halo-primary),0.2),var(--halo-shadow)]",
    secondary: "hover:shadow-[0_0_40px_rgba(var(--halo-secondary),0.2),var(--halo-shadow)]",
    tertiary: "hover:shadow-[0_0_40px_rgba(var(--halo-tertiary),0.2),var(--halo-shadow)]",
    none: ""
  };

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        glowClasses[glow],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}