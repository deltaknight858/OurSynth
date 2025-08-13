import React, { ReactNode } from 'react';
import { motion, type Variants, type Transition } from 'framer-motion';
import { GlassLayer } from '../system/GlassLayer';
import clsx from 'clsx';

// Shared motion tokens
const springSlideIn: Variants = {
  initial: { x: 32, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 260, damping: 22 } },
};

const statusAccent = {
  pending: 'border-glass-border text-muted-foreground',
  active: 'border-neon-primary text-neon-primary shadow-[0_0_12px_0_theme(colors.neon.primary/0.3)]',
  complete: 'border-neon-success text-neon-success shadow-[0_0_12px_0_theme(colors.neon.success/0.3)]',
};

export interface OnboardingStepProps {
  stepNumber?: number;
  title: string;
  description?: string;
  action?: ReactNode;
  status?: 'pending' | 'complete' | 'active';
}

export const OnboardingStep = ({
  stepNumber,
  title,
  description,
  action,
  status = 'pending',
}: OnboardingStepProps) => {
  return (
    <GlassLayer
      className={clsx(
        'flex items-start gap-4 rounded-xl border glass-bg glass-border py-5 px-6 w-full max-w-2xl',
        'transition-shadow duration-300',
        statusAccent[status],
        'backdrop-blur-md shadow-md',
      )}
    >
      <motion.div
        className={clsx(
          'flex items-center justify-center rounded-full border-2 font-mono text-base w-10 h-10 shrink-0',
          status === 'active' ? 'animate-pulse' : '',
          statusAccent[status],
        )}
        variants={springSlideIn}
        initial="initial"
        animate="animate"
      >
        {stepNumber !== undefined ? stepNumber : status === 'complete' ? '✓' : '•'}
      </motion.div>
      <div className="flex-1 min-w-0">
        <motion.h4
          className="font-semibold text-lg mb-1"
          variants={springSlideIn}
          initial="initial"
          animate="animate"
        >
          {title}
        </motion.h4>
        {description && (
          <motion.p
            className="text-muted-foreground text-base mb-2"
            variants={springSlideIn}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.08 }}
          >
            {description}
          </motion.p>
        )}
        {action && <div className="mt-2">{action}</div>}
      </div>
    </GlassLayer>
  );
};

// --- Slot Demos ---
// 1. Initial setup step
// <OnboardingStep
//   stepNumber={1}
//   title="Connect your domain"
//   description="Point your custom domain to your new app."
//   action={<HaloButton variant="primary">Connect</HaloButton>}
//   status="active"
// />
//
// 2. Complete step
// <OnboardingStep
//   stepNumber={2}
//   title="Deploy your app"
//   description="Push your changes live in one click."
//   status="complete"
// />
//
// 3. Pending step
// <OnboardingStep
//   stepNumber={3}
//   title="Add your first component"
//   status="pending"
// />
