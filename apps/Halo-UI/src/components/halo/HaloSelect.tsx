
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronDown, Check } from "lucide-react";

export interface HaloSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface HaloSelectProps {
  options: HaloSelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  variant?: "glass" | "elevated" | "minimal";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  error?: boolean;
  label?: string;
  className?: string;
}

export default function HaloSelect({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  variant = "glass",
  size = "md",
  disabled = false,
  error = false,
  label,
  className
}: HaloSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [focusedIndex, setFocusedIndex] = React.useState(-1);
  const selectRef = React.useRef<HTMLButtonElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm", 
    lg: "px-6 py-3 text-base"
  };

  const variantClasses = {
    glass: "halo-glass border-[rgba(var(--halo-fg),0.1)] focus:border-[rgba(var(--halo-primary),0.3)] focus:shadow-[0_0_20px_rgba(var(--halo-primary),0.1)]",
    elevated: "bg-[rgb(var(--halo-bg-elev))] border-[rgba(var(--halo-fg),0.2)] focus:border-[rgba(var(--halo-primary),0.5)] shadow-sm",
    minimal: "border-[rgba(var(--halo-fg),0.2)] focus:border-[rgba(var(--halo-primary),0.5)] hover:border-[rgba(var(--halo-fg),0.3)]"
  };

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setFocusedIndex(-1);
    }
  };

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
    selectRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        if (isOpen && focusedIndex >= 0) {
          handleSelect(options[focusedIndex].value);
        } else {
          handleToggle();
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
      case "ArrowDown":
        e.preventDefault();
        if (isOpen) {
          setFocusedIndex(prev => Math.min(prev + 1, options.length - 1));
        } else {
          setIsOpen(true);
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (isOpen) {
          setFocusedIndex(prev => Math.max(prev - 1, 0));
        }
        break;
    }
  };

  const errorClasses = error 
    ? "border-[rgb(var(--halo-secondary))] focus:border-[rgb(var(--halo-secondary))] focus:shadow-[0_0_20px_rgba(var(--halo-secondary),0.2)]"
    : "";

  return (
    <div className={cn("relative", className)}>
      {label && (
        <motion.label
          className="block text-sm font-medium text-[rgb(var(--halo-fg))] mb-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.label>
      )}

      <button
        ref={selectRef}
        className={cn(
          "relative w-full flex items-center justify-between rounded-halo border bg-transparent text-left transition-all duration-[var(--halo-duration)] ease-[var(--halo-ease)] focus:outline-none halo-focus-ring",
          sizeClasses[size],
          variantClasses[variant],
          errorClasses,
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={label}
      >
        <span className={cn(
          selectedOption ? "text-[rgb(var(--halo-fg))]" : "text-[rgb(var(--halo-muted))]"
        )}>
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDown 
          size={16} 
          className={cn(
            "text-[rgb(var(--halo-muted))] transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 mt-2 halo-glass-strong rounded-halo shadow-[var(--halo-shadow)] border border-[rgba(var(--halo-fg),0.1)] z-50 max-h-60 overflow-y-auto"
            initial={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.15 }}
            role="listbox"
          >
            {options.map((option, index) => (
              <button
                key={option.value}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-2 text-sm text-left transition-colors",
                  "hover:bg-[rgba(var(--halo-primary),0.1)] focus:bg-[rgba(var(--halo-primary),0.1)]",
                  focusedIndex === index && "bg-[rgba(var(--halo-primary),0.1)]",
                  option.disabled && "opacity-50 cursor-not-allowed",
                  index === 0 && "rounded-t-halo",
                  index === options.length - 1 && "rounded-b-halo"
                )}
                onClick={() => !option.disabled && handleSelect(option.value)}
                disabled={option.disabled}
                role="option"
                aria-selected={option.value === value}
              >
                <span className="text-[rgb(var(--halo-fg))]">{option.label}</span>
                {option.value === value && (
                  <Check size={16} className="text-[rgb(var(--halo-primary))]" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
