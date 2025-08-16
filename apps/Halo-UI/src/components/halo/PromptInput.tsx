"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCommandCenter } from "@/hooks/useCommandCenter";

export interface PromptInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  disabled?: boolean;
  maxTokens?: number;
  variant?: "glass" | "elevated" | "minimal";
  placeholder?: string;
  placeholderHints?: string[];
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
  className?: string;
  autoFocus?: boolean;
  minRows?: number;
  maxRows?: number;
}

// Simple token estimation (roughly 4 chars per token)
const estimateTokens = (text: string): number => {
  return Math.ceil(text.length / 4);
};

const PromptInput = React.forwardRef<HTMLTextAreaElement, PromptInputProps>(
  ({
    value = "",
    onChange,
    onSubmit,
    disabled = false,
    maxTokens = 4000,
    variant = "glass",
    placeholder,
    placeholderHints = [
      "Ask me anything...",
      "What can I help you with?",
      "Type your message here...",
      "Share your thoughts...",
    ],
    leftAddon,
    rightAddon,
    className,
    autoFocus = false,
    minRows = 1,
    maxRows = 8,
    ...props
  }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholder || placeholderHints[0]);
    const [isFocused, setIsFocused] = useState(false);
    const { openCommandCenter } = useCommandCenter();
    
    // Auto-resize functionality
    const adjustHeight = useCallback(() => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      // Reset height to measure scrollHeight
      textarea.style.height = 'auto';
      
      // Calculate min and max heights
      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight) || 24;
      const minHeight = lineHeight * minRows;
      const maxHeight = lineHeight * maxRows;
      
      // Set new height within bounds
      const newHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);
      textarea.style.height = `${newHeight}px`;
    }, [minRows, maxRows]);

    // Auto-resize on value change
    useEffect(() => {
      adjustHeight();
    }, [value, adjustHeight]);

    // Cycling placeholder hints
    useEffect(() => {
      if (!placeholder && placeholderHints.length > 1 && !isFocused && !value) {
        const interval = setInterval(() => {
          setCurrentPlaceholder(prev => {
            const currentIndex = placeholderHints.indexOf(prev);
            const nextIndex = (currentIndex + 1) % placeholderHints.length;
            return placeholderHints[nextIndex];
          });
        }, 3000);
        return () => clearInterval(interval);
      }
    }, [placeholder, placeholderHints, isFocused, value]);

    // Keyboard shortcuts
    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      // Cmd/Ctrl + K to open command center
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        e.stopPropagation();
        openCommandCenter();
        return;
      }

      // Enter to submit, Shift+Enter for new line
      if (e.key === 'Enter') {
        if (e.shiftKey) {
          // Allow default behavior (new line)
          return;
        } else {
          e.preventDefault();
          if (value.trim() && onSubmit && !disabled) {
            onSubmit(value.trim());
          }
        }
      }
    }, [value, onSubmit, disabled, openCommandCenter]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      
      // Check token limit
      if (maxTokens && estimateTokens(newValue) > maxTokens) {
        return; // Prevent exceeding token limit
      }
      
      onChange?.(newValue);
    }, [onChange, maxTokens]);

    const handleFocus = useCallback(() => {
      setIsFocused(true);
      if (!placeholder) {
        setCurrentPlaceholder(placeholderHints[0]);
      }
    }, [placeholder, placeholderHints]);

    const handleBlur = useCallback(() => {
      setIsFocused(false);
    }, []);

    // Token counting
    const tokenCount = estimateTokens(value);
    const tokenProgress = maxTokens ? (tokenCount / maxTokens) * 100 : 0;
    const isNearLimit = tokenProgress > 80;
    const isAtLimit = tokenProgress >= 100;

    // Styling
    const baseClasses = "w-full resize-none transition-all duration-[var(--halo-duration)] ease-[var(--halo-ease)] focus:outline-none scrollbar-thin scrollbar-thumb-[rgba(var(--halo-fg),0.2)] scrollbar-track-transparent";
    
    const variantClasses = {
      glass: "halo-glass border-[rgba(var(--halo-fg),0.1)] focus:border-[rgba(var(--halo-primary),0.3)] focus:shadow-[0_0_20px_rgba(var(--halo-primary),0.1)]",
      elevated: "bg-[rgb(var(--halo-bg-elev))] border-[rgba(var(--halo-fg),0.2)] focus:border-[rgba(var(--halo-primary),0.5)] shadow-sm",
      minimal: "bg-transparent border-[rgba(var(--halo-fg),0.2)] focus:border-[rgba(var(--halo-primary),0.5)] hover:border-[rgba(var(--halo-fg),0.3)]"
    };

    // Container styling based on focus and content
    const containerClasses = cn(
      "relative group transition-all duration-300",
      isFocused && "halo-focus-ring",
      disabled && "opacity-50 cursor-not-allowed"
    );

    const inputClasses = cn(
      baseClasses,
      "rounded-halo border bg-transparent text-[rgb(var(--halo-fg))] placeholder:text-[rgb(var(--halo-muted))]",
      variantClasses[variant],
      leftAddon ? "pl-12" : "pl-4",
      rightAddon ? "pr-12" : "pr-4",
      "py-3 text-sm leading-6",
      isAtLimit && "border-[rgb(var(--halo-secondary))] focus:border-[rgb(var(--halo-secondary))]"
    );

    return (
      <div className={cn(containerClasses, className)}>
        <div className="relative">
          {/* Left Addon */}
          {leftAddon && (
            <div className="absolute left-3 top-3 z-10 flex items-start">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {leftAddon}
              </motion.div>
            </div>
          )}

          {/* Textarea */}
          <textarea
            ref={(node) => {
              textareaRef.current = node;
              if (typeof ref === 'function') {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
            }}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={currentPlaceholder}
            disabled={disabled}
            autoFocus={autoFocus}
            className={inputClasses}
            rows={minRows}
            {...props}
          />

          {/* Right Addon */}
          {rightAddon && (
            <div className="absolute right-3 top-3 z-10 flex items-start">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {rightAddon}
              </motion.div>
            </div>
          )}
        </div>

        {/* Token Counter & Shortcuts */}
        <AnimatePresence>
          {(isFocused || value || tokenCount > 0) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between mt-2 px-1"
            >
              {/* Shortcuts */}
              <div className="flex items-center gap-3 text-xs text-[rgb(var(--halo-muted))]">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded text-xs bg-[rgba(var(--halo-fg),0.1)] border border-[rgba(var(--halo-fg),0.2)]">
                    {navigator.platform.includes('Mac') ? '⌘' : 'Ctrl'}+K
                  </kbd>
                  <span>Commands</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded text-xs bg-[rgba(var(--halo-fg),0.1)] border border-[rgba(var(--halo-fg),0.2)]">
                    ⏎
                  </kbd>
                  <span>Send</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded text-xs bg-[rgba(var(--halo-fg),0.1)] border border-[rgba(var(--halo-fg),0.2)]">
                    ⇧⏎
                  </kbd>
                  <span>New line</span>
                </span>
              </div>

              {/* Token Counter */}
              {maxTokens && (
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "text-xs font-medium transition-colors",
                    isAtLimit ? "text-[rgb(var(--halo-secondary))]" : 
                    isNearLimit ? "text-[rgb(var(--halo-primary))]" : 
                    "text-[rgb(var(--halo-muted))]"
                  )}>
                    {tokenCount.toLocaleString()}/{maxTokens.toLocaleString()}
                  </span>
                  
                  {/* Progress bar */}
                  <div className="w-12 h-1 bg-[rgba(var(--halo-fg),0.1)] rounded-full overflow-hidden">
                    <motion.div
                      className={cn(
                        "h-full rounded-full transition-colors duration-300",
                        isAtLimit ? "bg-[rgb(var(--halo-secondary))]" : 
                        isNearLimit ? "bg-[rgb(var(--halo-primary))]" : 
                        "bg-[rgba(var(--halo-primary),0.6)]"
                      )}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(tokenProgress, 100)}%` }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

PromptInput.displayName = "PromptInput";

export default PromptInput;