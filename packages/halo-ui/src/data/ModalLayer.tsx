import clsx from 'clsx';
import { motion, AnimatePresence, type Variants, type Transition } from 'framer-motion';
import React, { ReactNode } from 'react';

const springFadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};
const springScaleIn: Variants = {
  initial: { scale: 0.92, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring' as Transition['type'],
      stiffness: 220,
      damping: 22,
    },
  },
  exit: { scale: 0.92, opacity: 0, transition: { duration: 0.18 } },
};

export interface ModalLayerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  variant?: 'centered' | 'fullscreen';
}

export const ModalLayer = ({
  open,
  onClose,
  title,
  children,
  footer,
  variant = 'centered',
}: ModalLayerProps) => (
  <AnimatePresence>
    {open && (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        variants={springFadeIn}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={onClose}
      >
        <motion.div
          className={clsx(
            'relative bg-glass-bg glass-border border rounded-2xl shadow-2xl p-6',
            variant === 'fullscreen' ? 'w-full h-full max-w-none max-h-none' : 'max-w-lg w-full',
            'flex flex-col',
          )}
          variants={springScaleIn}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          {title && <div className="font-bold text-xl mb-3">{title}</div>}
          <div className="flex-1">{children}</div>
          {footer && <div className="mt-4">{footer}</div>}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// --- Slot Demos ---
// <ModalLayer open={open} onClose={closeModal} title="Onboarding" variant="centered">...</ModalLayer>
// <ModalLayer open={open} onClose={closeModal} variant="fullscreen">...</ModalLayer>
