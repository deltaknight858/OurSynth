// Centralized motion presets for Halo UI
import { Transition, Variants } from 'framer-motion';

export const motionPresets: Record<string, { variants: Variants; transition: Transition }> = {
  fadeIn: {
    variants: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    transition: { type: 'spring', duration: 0.25, bounce: 0.2 },
  },
  floatUp: {
    variants: {
      hidden: { opacity: 0, y: 24 },
      visible: { opacity: 1, y: 0 },
    },
    transition: { type: 'spring', duration: 0.3, bounce: 0.28 },
  },
  floatDown: {
    variants: {
      hidden: { opacity: 0, y: -24 },
      visible: { opacity: 1, y: 0 },
    },
    transition: { type: 'spring', duration: 0.3, bounce: 0.28 },
  },
  scaleIn: {
    variants: {
      hidden: { opacity: 0, scale: 0.92 },
      visible: { opacity: 1, scale: 1 },
    },
    transition: { type: 'spring', duration: 0.22, bounce: 0.18 },
  },
};
