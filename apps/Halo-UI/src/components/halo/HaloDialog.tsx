
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export interface HaloDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export default function HaloDialog({
  open,
  onOpenChange,
  children,
  title,
  description,
  className
}: HaloDialogProps) {
  const handleEscape = React.useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onOpenChange(false);
    }
  }, [onOpenChange]);

  React.useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [open, handleEscape]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => onOpenChange(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className={cn(
                "relative w-full max-w-lg halo-glass-strong rounded-halo-lg shadow-[var(--halo-shadow)] border border-[rgba(var(--halo-fg),0.1)]",
                className
              )}
              initial={{ 
                opacity: 0, 
                scale: 0.95, 
                y: 20,
                filter: "blur(4px)"
              }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: 0,
                filter: "blur(0px)"
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.95, 
                y: 20,
                filter: "blur(4px)"
              }}
              transition={{ 
                duration: 0.25, 
                ease: [0.22, 1, 0.36, 1]
              }}
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? "dialog-title" : undefined}
              aria-describedby={description ? "dialog-description" : undefined}
            >
              <button
                onClick={() => onOpenChange(false)}
                className="absolute top-4 right-4 p-1 rounded-halo-sm text-[rgb(var(--halo-muted))] hover:text-[rgb(var(--halo-fg))] hover:bg-[rgba(var(--halo-fg),0.1)] transition-colors halo-focus-ring"
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>

              <div className="p-6">
                {title && (
                  <motion.h2
                    id="dialog-title"
                    className="text-xl font-semibold text-[rgb(var(--halo-fg))] mb-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.2 }}
                  >
                    {title}
                  </motion.h2>
                )}

                {description && (
                  <motion.p
                    id="dialog-description"
                    className="text-[rgb(var(--halo-muted))] mb-4"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.2 }}
                  >
                    {description}
                  </motion.p>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.2 }}
                >
                  {children}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
