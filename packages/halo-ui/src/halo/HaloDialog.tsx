"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";
import { CloseIcon } from "./icons";

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
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-3 text-[rgb(var(--halo-muted))] hover:text-[rgb(var(--halo-fg))]"
                onClick={() => onOpenChange(false)}
                aria-label="Close dialog"
              >
                <CloseIcon />
              </button>
              {title && <h2 className="text-xl font-semibold mb-2">{title}</h2>}
              {description && <p className="text-[rgb(var(--halo-muted))] mb-4">{description}</p>}
              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
