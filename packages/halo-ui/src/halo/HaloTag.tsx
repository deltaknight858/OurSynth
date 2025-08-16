// HaloTag.tsx
// A Halo UI styled tag/chip component

import React from "react";
import { cn } from "../lib/utils";

export interface HaloTagProps {
  children: React.ReactNode;
  color?: "primary" | "secondary" | "tertiary" | "muted";
  onRemove?: () => void;
  removable?: boolean;
  className?: string;
}

export const HaloTag: React.FC<HaloTagProps> = ({
  children,
  color = "primary",
  onRemove,
  removable = false,
  className
}) => {
  const colorClasses = {
    primary: "bg-[rgba(var(--halo-primary),0.12)] text-[rgb(var(--halo-primary))]",
    secondary: "bg-[rgba(var(--halo-secondary),0.12)] text-[rgb(var(--halo-secondary))]",
    tertiary: "bg-[rgba(var(--halo-tertiary),0.12)] text-[rgb(var(--halo-tertiary))]",
    muted: "bg-[rgba(var(--halo-muted),0.12)] text-[rgb(var(--halo-muted))]"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium select-none",
        colorClasses[color],
        className
      )}
    >
      {children}
      {removable && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-1 rounded-full p-1 hover:bg-[rgba(var(--halo-fg),0.08)] focus:outline-none"
          aria-label="Remove tag"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      )}
    </span>
  );
};

export default HaloTag;
