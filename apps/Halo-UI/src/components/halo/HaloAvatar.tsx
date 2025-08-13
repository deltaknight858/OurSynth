"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";

export interface HaloAvatarProps {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "circle" | "rounded" | "square";
  fallback?: string;
  status?: "online" | "offline" | "away" | "busy";
  className?: string;
}

export default function HaloAvatar({
  src,
  alt,
  size = "md",
  variant = "circle",
  fallback,
  status,
  className
}: HaloAvatarProps) {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-lg"
  };

  const variantClasses = {
    circle: "rounded-full",
    rounded: "rounded-halo",
    square: "rounded-halo-sm"
  };

  const statusConfig = {
    online: "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]",
    offline: "bg-gray-400",
    away: "bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.4)]",
    busy: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]"
  };

  const statusSizes = {
    sm: "w-2.5 h-2.5",
    md: "w-3 h-3",
    lg: "w-3.5 h-3.5",
    xl: "w-4 h-4"
  };

  return (
    <div className={cn("relative inline-flex", className)}>
      <div
        className={cn(
          "flex items-center justify-center halo-glass border border-[rgba(var(--halo-fg),0.1)] overflow-hidden transition-all duration-[var(--halo-duration)] ease-[var(--halo-ease)]",
          sizeClasses[size],
          variantClasses[variant]
        )}
      >
        <div className="relative w-full h-full">
          {src ? (
            <Image
              src={src}
              alt={alt || "Avatar"}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800">
              {fallback ? (
                <span className="text-sm font-semibold text-neutral-600 dark:text-neutral-300 select-none">
                  {fallback.slice(0, 2).toUpperCase()}
                </span>
              ) : (
                <User className="text-neutral-500 dark:text-neutral-400" size={size === "sm" ? 14 : size === "md" ? 16 : size === "lg" ? 20 : 24} />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Status Indicator */}
      {status && (
        <div
          className={cn(
            "absolute -bottom-0.5 -right-0.5 border-2 border-[rgb(var(--halo-bg))] rounded-full transition-all duration-[var(--halo-duration)] ease-[var(--halo-ease)]",
            statusSizes[size],
            statusConfig[status]
          )}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
}