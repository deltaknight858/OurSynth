import React, { ReactNode } from 'react';
import { motion, type Variants, type Transition } from 'framer-motion';
import clsx from 'clsx';

const springFloatUp: Variants = {
  initial: { y: 16, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as Transition["type"],
      stiffness: 320,
      damping: 24,
    },
  },
};

export interface InputFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  error?: string;
  icon?: ReactNode;
}

export const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  error,
  icon,
}: InputFieldProps) => {
  return (
    <div className={clsx('relative w-full max-w-md')}> 
      <motion.label
        className={clsx(
          'absolute left-3 top-2 text-sm pointer-events-none transition-all duration-200',
          value ? 'text-neon-primary -top-3 text-xs bg-glass-bg px-1 rounded' : 'text-muted-foreground',
        )}
        variants={springFloatUp}
        initial="initial"
        animate={value ? 'animate' : 'initial'}
      >
        {icon && <span className="mr-1 text-base align-middle">{icon}</span>}
        {label}
      </motion.label>
      <input
        className={clsx(
          'w-full py-3 px-3 rounded-lg border glass-bg glass-border backdrop-blur-md shadow focus:outline-none',
          'focus:border-neon-primary focus:ring-2 focus:ring-neon-primary',
          error ? 'border-neon-warning' : '',
        )}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${label}-error` : undefined}
      />
      {error && (
        <div id={`${label}-error`} className="text-neon-warning text-xs mt-1">
          {error}
        </div>
      )}
    </div>
  );
};

// --- Slot Demos ---
// <InputField label="Domain" value={domain} onChange={setDomain} placeholder="yourdomain.com" />
// <InputField label="Email" value={email} onChange={setEmail} icon={<MailIcon />} error="Invalid email" />
