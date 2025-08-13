import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { glass, motion as motionTokens, rounding } from '../tokens/theme';

export interface AccordionPanelProps {
  title: string;
  content: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

export const AccordionPanel = ({ title, content, isOpen, onToggle }: AccordionPanelProps) => (
  <div className={clsx('mb-2', glass.bg, glass.border, rounding.md, 'border shadow-sm')}> 
    <button
      className="w-full flex justify-between items-center px-4 py-3 font-medium text-left focus:outline-none"
      onClick={onToggle}
    >
      {title}
      <span>{isOpen ? '−' : '+'}</span>
    </button>
    <motion.div
      variants={motionTokens.fadeIn}
      initial="initial"
      animate={isOpen ? 'animate' : 'initial'}
      className={clsx('overflow-hidden transition-all', isOpen ? 'max-h-96' : 'max-h-0')}
    >
      <div className="px-4 pb-3">{content}</div>
    </motion.div>
  </div>
);

// Slot Demo:
// <AccordionPanel title="FAQ" content={<p>Answer</p>} isOpen={open} onToggle={toggle} />
