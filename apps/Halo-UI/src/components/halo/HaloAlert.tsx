"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle, Info, X, AlertTriangle } from "lucide-react";

export interface HaloAlertProps {
  variant?: "info" | "success" | "warning" | "error";
  title?: string;
  description?: string;
  children?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export default function HaloAlert({
  variant = "info",
  title,
  description,
  children,
  dismissible = false,
  onDismiss,
  icon,
  className
}: HaloAlertProps) {
  const [isVisible, setIsVisible] = React.useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => onDismiss?.(), 200);
  };

  const variantConfig = {
    info: {
      icon: <Info size={20} />,
      bgColor: "bg-[rgba(var(--halo-primary),0.1)]",
      borderColor: "border-[rgba(var(--halo-primary),0.3)]",
      textColor: "text-[rgb(var(--halo-primary))]",
      titleColor: "text-[rgb(var(--halo-fg))]"
    },
    success: {
      icon: <CheckCircle size={20} />,
      bgColor: "bg-green-50 dark:bg-green-950",
      borderColor: "border-green-200 dark:border-green-800",
      textColor: "text-green-700 dark:text-green-300",
      titleColor: "text-green-900 dark:text-green-100"
    },
    warning: {
      icon: <AlertTriangle size={20} />,
      bgColor: "bg-[rgba(var(--halo-tertiary),0.1)]",
      borderColor: "border-[rgba(var(--halo-tertiary),0.3)]",
      textColor: "text-[rgb(var(--halo-tertiary))]",
      titleColor: "text-[rgb(var(--halo-fg))]"
    },
    error: {
      icon: <AlertCircle size={20} />,
      bgColor: "bg-[rgba(var(--halo-secondary),0.1)]",
      borderColor: "border-[rgba(var(--halo-secondary),0.3)]",
      textColor: "text-[rgb(var(--halo-secondary))]",
      titleColor: "text-[rgb(var(--halo-fg))]"
    }
  };

  const config = variantConfig[variant];

  if (!isVisible) return null;

  return (
    <motion.div
      className={cn(
        "relative rounded-halo border p-4 halo-glass-strong shadow-sm",
        config.bgColor,
        config.borderColor,
        className
      )}
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      role="alert"
      aria-live="polite"
    >
      <div className="flex gap-3">
        {/* Icon */}
        <div className={cn("flex-shrink-0 mt-0.5", config.textColor)}>
          {icon || config.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className={cn("text-sm font-semibold mb-1", config.titleColor)}>
              {title}
            </h4>
          )}
          
          {description && (
            <p className={cn("text-sm", config.textColor)}>
              {description}
            </p>
          )}

          {children && (
            <div className={cn("text-sm mt-2", config.textColor)}>
              {children}
            </div>
          )}
        </div>

        {/* Dismiss Button */}
        {dismissible && (
          <button
            onClick={handleDismiss}
            className={cn(
              "flex-shrink-0 p-1 rounded-halo-sm transition-colors hover:bg-black/5 dark:hover:bg-white/5 halo-focus-ring",
              config.textColor
            )}
            aria-label="Dismiss alert"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </motion.div>
  );
}