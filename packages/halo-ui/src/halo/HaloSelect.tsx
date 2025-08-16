'use client';

import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

import { ChevronDownIcon, CheckIcon } from './icons';
import { cn } from './lib/utils';

export interface HaloSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

// Remove 'size' from SelectHTMLAttributes to avoid type conflict
export interface HaloSelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  options: HaloSelectOption[];
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'glass' | 'elevated' | 'minimal';
}

export const HaloSelect: React.FC<HaloSelectProps> = ({ label, options, error, ...props }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [focusedIndex, setFocusedIndex] = React.useState(-1);
  const selectRef = React.useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === props.value);

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const variantClasses = {
    glass:
      'halo-glass border-[rgba(var(--halo-fg),0.1)] focus:border-[rgba(var(--halo-primary),0.3)] focus:shadow-[0_0_20px_rgba(var(--halo-primary),0.1)]',
    elevated:
      'bg-[rgb(var(--halo-bg-elev))] border-[rgba(var(--halo-fg),0.2)] focus:border-[rgba(var(--halo-primary),0.5)] shadow-sm',
    minimal:
      'border-[rgba(var(--halo-fg),0.2)] focus:border-[rgba(var(--halo-primary),0.5)] hover:border-[rgba(var(--halo-fg),0.3)]',
  };

  const handleToggle = () => {
    if (!props.disabled) {
      setIsOpen(!isOpen);
      setFocusedIndex(-1);
    }
  };

  const handleSelect = (optionValue: string) => {
    if (props.onChange) {
      // Create a synthetic event to match React's expected signature
      const event = {
        ...new Event('change'),
        target: { value: optionValue },
      } as unknown as React.ChangeEvent<HTMLSelectElement>;
      props.onChange(event);
    }
    setIsOpen(false);
    selectRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (props.disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (isOpen && focusedIndex >= 0) {
          handleSelect(options[focusedIndex].value);
        } else {
          handleToggle();
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (isOpen) {
          setFocusedIndex((prev) => Math.min(prev + 1, options.length - 1));
        } else {
          setIsOpen(true);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          setFocusedIndex((prev) => Math.max(prev - 1, 0));
        }
        break;
    }
  };

  const errorClasses = error
    ? 'border-[rgb(var(--halo-secondary))] focus:border-[rgb(var(--halo-secondary))] focus:shadow-[0_0_20px_rgba(var(--halo-secondary),0.2)]'
    : '';

  return (
    <div className={cn('relative', props.className)}>
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

      <div
        ref={selectRef}
        tabIndex={0}
        role="combobox"
        aria-controls="halo-select-listbox"
        aria-expanded={isOpen ? 'true' : 'false'}
        aria-haspopup="listbox"
        aria-label={label}
        className={cn(
          'relative w-full flex items-center justify-between rounded-halo border bg-transparent text-left transition-all duration-[var(--halo-duration)] ease-[var(--halo-ease)] focus:outline-none halo-focus-ring cursor-pointer',
          sizeClasses[(props.size as 'sm' | 'md' | 'lg') || 'md'],
          variantClasses[(props.variant as 'glass' | 'elevated' | 'minimal') || 'glass'],
          errorClasses,
          props.disabled && 'opacity-50 cursor-not-allowed',
        )}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        aria-disabled={props.disabled ? 'true' : 'false'}
      >
        <span
          className={cn(
            selectedOption ? 'text-[rgb(var(--halo-fg))]' : 'text-[rgb(var(--halo-muted))]',
          )}
        >
          {selectedOption?.label || 'Select an option'}
        </span>
        <ChevronDownIcon
          width={16}
          height={16}
          className={cn(
            'text-[rgb(var(--halo-muted))] transition-transform duration-200',
            isOpen && 'rotate-180',
          )}
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            id="halo-select-listbox"
            className="absolute top-full left-0 right-0 mt-2 halo-glass-strong rounded-halo shadow-[var(--halo-shadow)] border border-[rgba(var(--halo-fg),0.1)] z-50 max-h-60 overflow-y-auto"
            initial={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
            transition={{ duration: 0.15 }}
            role="listbox"
            aria-activedescendant={options[focusedIndex]?.value}
          >
            {options.map((option, index) => (
              <li
                key={option.value}
                id={option.value}
                className={cn(
                  'w-full flex items-center justify-between px-4 py-2 text-sm text-left transition-colors cursor-pointer',
                  'hover:bg-[rgba(var(--halo-primary),0.1)] focus:bg-[rgba(var(--halo-primary),0.1)]',
                  focusedIndex === index && 'bg-[rgba(var(--halo-primary),0.1)]',
                  option.disabled && 'opacity-50 cursor-not-allowed',
                  index === 0 && 'rounded-t-halo',
                  index === options.length - 1 && 'rounded-b-halo',
                )}
                onClick={() => !option.disabled && handleSelect(option.value)}
                aria-selected={option.value === props.value ? 'true' : 'false'}
                role="option"
                aria-disabled={option.disabled ? 'true' : 'false'}
                tabIndex={-1}
              >
                <span className="text-[rgb(var(--halo-fg))]">{option.label}</span>
                {option.value === props.value && (
                  <CheckIcon width={16} height={16} className="text-[rgb(var(--halo-primary))]" />
                )}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
    </div>
  );
};

export default HaloSelect;
