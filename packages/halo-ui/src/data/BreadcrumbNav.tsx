import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { neon, motion as motionTokens } from '../tokens/theme';

export interface BreadcrumbNavProps {
  items: string[];
  onNavigate: (item: string) => void;
}

export const BreadcrumbNav = ({ items, onNavigate }: BreadcrumbNavProps) => (
  <nav className="flex items-center gap-2 text-sm">
    {items.map((item, idx) => (
      <span key={item} className="flex items-center">
        <motion.button
          className="focus:outline-none hover:underline text-neon-primary"
          onClick={() => onNavigate(item)}
          variants={motionTokens.fadeIn}
          initial="initial"
          animate="animate"
        >
          {item}
        </motion.button>
        {idx < items.length - 1 && <span className="mx-1 text-muted-foreground">/</span>}
      </span>
    ))}
  </nav>
);

// Slot Demo:
// <BreadcrumbNav items={["Home", "Studio", "Project"]} onNavigate={fn} />
