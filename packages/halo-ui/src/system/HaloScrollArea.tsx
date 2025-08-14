import React, { PropsWithChildren, useRef } from "react";
import styles from "./HaloScrollArea.module.css";
import { useScrollPulse } from "./useScrollPulse";
import { useHaloScrollbarTheme } from "./HaloScrollbarProvider";

export type HaloScrollAreaProps = PropsWithChildren<{
  className?: string;
  theme?: "cyan" | "magenta" | "amber";
  width?: number;            // overrides --sb-width
  pulseMs?: number;          // pulse duration
  alwaysGlow?: boolean;      // keep glow-active on
  style?: React.CSSProperties;
}>;

const themeVars: Record<NonNullable<HaloScrollAreaProps["theme"]>, React.CSSProperties> = {
  cyan: {},
  magenta: {
    ["--sb-thumb-start" as any]: "rgba(255, 0, 200, 0.95)",
    ["--sb-thumb-end" as any]: "rgba(255, 90, 160, 0.95)",
    ["--sb-glow" as any]: "0 0 10px rgba(255, 0, 200, 0.55)",
    ["--sb-glow-active" as any]: "0 0 14px rgba(255, 0, 200, 0.95)",
  },
  amber: {
    ["--sb-thumb-start" as any]: "rgba(255, 190, 0, 0.95)",
    ["--sb-thumb-end" as any]: "rgba(255, 120, 0, 0.95)",
    ["--sb-glow" as any]: "0 0 10px rgba(255, 170, 0, 0.55)",
    ["--sb-glow-active" as any]: "0 0 14px rgba(255, 140, 0, 0.95)",
  },
};

export function HaloScrollArea({
  children,
  className,
  theme,
  width,
  pulseMs = 180,
  alwaysGlow = false,
  style,
}: HaloScrollAreaProps) {
  const ref = useRef<HTMLDivElement>(null);
  const providerVars = useHaloScrollbarTheme();

  useScrollPulse(ref, { pulseMs, alwaysGlow });

  const mergedStyle: React.CSSProperties = {
    ...providerVars,
    ...(theme ? themeVars[theme] : null),
    ...(width ? ({ ["--sb-width" as any]: `${width}px` } as any) : null),
    ...style,
  };

  return (
    <div
      ref={ref}
      className={[styles.root, className].filter(Boolean).join(" ")}
      style={mergedStyle}
      data-halo-scroll
    >
      {children}
    </div>
  );
}
