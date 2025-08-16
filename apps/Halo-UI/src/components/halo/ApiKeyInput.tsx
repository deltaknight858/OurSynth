"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Copy, X, Check, AlertCircle, Key } from "lucide-react";
import { cn } from "@/lib/utils";
import HaloButton from "./HaloButton";
import HaloTooltip from "./HaloTooltip";

export interface ApiKeyInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  providerId: string;
  variant?: "glass" | "elevated" | "minimal";
  size?: "sm" | "md" | "lg";
  placeholder?: string;
  helperText?: string;
  validationState?: "valid" | "invalid" | "loading" | null;
  validationMessage?: string;
  disabled?: boolean;
  required?: boolean;
  onValidate?: (value: string) => Promise<boolean> | boolean;
  onPersist?: (providerId: string, value: string) => Promise<void>;
  className?: string;
}

// Stub function for Supabase persistence
const persistApiKey = async (providerId: string, encryptedKey: string): Promise<void> => {
  // TODO: Implement Supabase persistence when connected
  console.log(`[STUB] Persisting API key for provider: ${providerId}`);
  // In real implementation:
  // await supabase.from('api_keys').upsert({ provider_id: providerId, encrypted_key: encryptedKey })
};

const ApiKeyInput = React.forwardRef<HTMLInputElement, ApiKeyInputProps>(
  ({
    label,
    value,
    onChange,
    providerId,
    variant = "glass",
    size = "md",
    placeholder = "Enter your API key...",
    helperText,
    validationState,
    validationMessage,
    disabled = false,
    required = false,
    onValidate,
    onPersist,
    className
  }, ref) => {
    const [isRevealed, setIsRevealed] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [pasteDetected, setPasteDetected] = useState(false);
    const [internalValidationState, setInternalValidationState] = useState<"valid" | "invalid" | "loading" | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const pasteTimeoutRef = useRef<NodeJS.Timeout>();

    // Use provided validation state or internal state
    const currentValidationState = validationState || internalValidationState;

    const baseClasses = "w-full rounded-halo border bg-transparent text-[rgb(var(--halo-fg))] placeholder:text-[rgb(var(--halo-muted))] transition-all duration-[var(--halo-duration)] ease-[var(--halo-ease)] focus:outline-none halo-focus-ring pr-24";
    
    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm h-9",
      md: "px-4 py-2 text-sm h-10",
      lg: "px-6 py-3 text-base h-12"
    };

    const variantClasses = {
      glass: "halo-glass border-[rgba(var(--halo-fg),0.1)] focus:border-[rgba(var(--halo-primary),0.3)] focus:shadow-[0_0_20px_rgba(var(--halo-primary),0.1)]",
      elevated: "bg-[rgb(var(--halo-bg-elev))] border-[rgba(var(--halo-fg),0.2)] focus:border-[rgba(var(--halo-primary),0.5)] shadow-sm",
      minimal: "border-[rgba(var(--halo-fg),0.2)] focus:border-[rgba(var(--halo-primary),0.5)] hover:border-[rgba(var(--halo-fg),0.3)]"
    };

    const getValidationClasses = () => {
      switch (currentValidationState) {
        case "valid":
          return "border-emerald-400 focus:border-emerald-400 focus:shadow-[0_0_20px_rgba(16,185,129,0.2)]";
        case "invalid":
          return "border-[rgb(var(--halo-secondary))] focus:border-[rgb(var(--halo-secondary))] focus:shadow-[0_0_20px_rgba(var(--halo-secondary),0.2)]";
        case "loading":
          return "border-amber-400 focus:border-amber-400 focus:shadow-[0_0_20px_rgba(245,158,11,0.2)]";
        default:
          return "";
      }
    };

    // Mask the API key for display
    const getMaskedValue = useCallback(() => {
      if (!value || isRevealed) return value;
      if (value.length <= 8) return "•".repeat(value.length);
      return value.slice(0, 4) + "•".repeat(Math.max(value.length - 8, 4)) + value.slice(-4);
    }, [value, isRevealed]);

    // Handle paste detection
    const handlePaste = useCallback((e: React.ClipboardEvent) => {
      setPasteDetected(true);
      if (pasteTimeoutRef.current) {
        clearTimeout(pasteTimeoutRef.current);
      }
      pasteTimeoutRef.current = setTimeout(() => {
        setPasteDetected(false);
      }, 3000);

      // Get pasted content and trigger onChange
      const pastedText = e.clipboardData.getData("text");
      if (pastedText) {
        onChange(pastedText);
        // Auto-validate on paste if validator provided
        if (onValidate) {
          handleValidation(pastedText);
        }
      }
    }, [onChange, onValidate]);

    // Handle validation
    const handleValidation = useCallback(async (valueToValidate: string) => {
      if (!onValidate || !valueToValidate) return;
      
      setInternalValidationState("loading");
      try {
        const isValid = await Promise.resolve(onValidate(valueToValidate));
        setInternalValidationState(isValid ? "valid" : "invalid");
      } catch (error) {
        setInternalValidationState("invalid");
      }
    }, [onValidate]);

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      onChange(newValue);
      
      // Reset validation state when user starts typing
      if (internalValidationState && newValue !== value) {
        setInternalValidationState(null);
      }
    };

    // Handle blur validation
    const handleBlur = () => {
      if (onValidate && value) {
        handleValidation(value);
      }
    };

    // Copy to clipboard
    const handleCopy = async () => {
      if (!value) return;
      
      try {
        await navigator.clipboard.writeText(value);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy to clipboard:", err);
      }
    };

    // Clear input
    const handleClear = () => {
      onChange("");
      setInternalValidationState(null);
      inputRef.current?.focus();
    };

    // Persist to storage
    const handlePersist = async () => {
      if (!value) return;
      
      try {
        if (onPersist) {
          await onPersist(providerId, value);
        } else {
          await persistApiKey(providerId, value);
        }
      } catch (error) {
        console.error("Failed to persist API key:", error);
      }
    };

    // Auto-persist on valid state
    useEffect(() => {
      if (currentValidationState === "valid" && value) {
        handlePersist();
      }
    }, [currentValidationState, value]);

    // Cleanup timeout on unmount
    useEffect(() => {
      return () => {
        if (pasteTimeoutRef.current) {
          clearTimeout(pasteTimeoutRef.current);
        }
      };
    }, []);

    const getValidationIcon = () => {
      switch (currentValidationState) {
        case "valid":
          return <Check className="w-4 h-4 text-emerald-500" />;
        case "invalid":
          return <AlertCircle className="w-4 h-4 text-[rgb(var(--halo-secondary))]" />;
        case "loading":
          return <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />;
        default:
          return null;
      }
    };

    return (
      <div className={cn("space-y-2 relative", className)}>
        {label && (
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <label className="block text-sm font-medium text-[rgb(var(--halo-fg))]">
              <span className="flex items-center gap-2">
                <Key className="w-4 h-4" />
                {label}
                {required && <span className="text-[rgb(var(--halo-secondary))]">*</span>}
              </span>
            </label>
            <AnimatePresence>
              {pasteDetected && (
                <motion.div
                  className="text-xs text-[rgb(var(--halo-primary))] flex items-center gap-1"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Check className="w-3 h-3" />
                  Pasted
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        <div className="relative">
          <input
            ref={ref || inputRef}
            type="text"
            value={getMaskedValue()}
            onChange={handleChange}
            onBlur={handleBlur}
            onPaste={handlePaste}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              baseClasses,
              sizeClasses[size],
              variantClasses[variant],
              getValidationClasses(),
              disabled && "opacity-50 cursor-not-allowed",
              "font-mono tracking-wide"
            )}
          />

          {/* Action buttons */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {/* Validation indicator */}
            <AnimatePresence>
              {currentValidationState && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center"
                >
                  {getValidationIcon()}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Clear button */}
            {value && !disabled && (
              <HaloTooltip content="Clear">
                <HaloButton
                  variant="ghost"
                  size="sm"
                  onClick={handleClear}
                  className="h-6 w-6 p-0 hover:bg-[rgba(var(--halo-secondary),0.1)]"
                >
                  <X className="w-3 h-3" />
                </HaloButton>
              </HaloTooltip>
            )}

            {/* Copy button */}
            {value && (
              <HaloTooltip content={isCopied ? "Copied!" : "Copy"}>
                <HaloButton
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="h-6 w-6 p-0 hover:bg-[rgba(var(--halo-primary),0.1)]"
                >
                  <AnimatePresence mode="wait">
                    {isCopied ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Check className="w-3 h-3 text-emerald-500" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Copy className="w-3 h-3" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </HaloButton>
              </HaloTooltip>
            )}

            {/* Reveal/Hide toggle */}
            {value && (
              <HaloTooltip content={isRevealed ? "Hide" : "Reveal"}>
                <HaloButton
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsRevealed(!isRevealed)}
                  className="h-6 w-6 p-0 hover:bg-[rgba(var(--halo-primary),0.1)]"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isRevealed ? "hide" : "show"}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isRevealed ? (
                        <EyeOff className="w-3 h-3" />
                      ) : (
                        <Eye className="w-3 h-3" />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </HaloButton>
              </HaloTooltip>
            )}
          </div>
        </div>

        {/* Helper text and validation message */}
        <AnimatePresence>
          {(helperText || validationMessage) && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="space-y-1"
            >
              {validationMessage && (
                <p className={cn(
                  "text-xs flex items-center gap-2",
                  currentValidationState === "valid" && "text-emerald-500",
                  currentValidationState === "invalid" && "text-[rgb(var(--halo-secondary))]",
                  currentValidationState === "loading" && "text-amber-500"
                )}>
                  {getValidationIcon()}
                  {validationMessage}
                </p>
              )}
              {helperText && !validationMessage && (
                <p className="text-xs text-[rgb(var(--halo-muted))]">
                  {helperText}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

ApiKeyInput.displayName = "ApiKeyInput";

export default ApiKeyInput;