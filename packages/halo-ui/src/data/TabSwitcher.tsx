import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { neon, motion as motionTokens } from '../tokens/theme';

export interface TabSwitcherProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const TabSwitcher = ({ tabs, activeTab, onTabChange }: TabSwitcherProps) => (
  <div className="flex gap-2 border-b border-glass-border">
    {tabs.map(tab => (
      <motion.button
        key={tab}
        className={clsx(
          'px-4 py-2 font-medium text-sm focus:outline-none',
          activeTab === tab ? 'border-b-2 border-neon-primary text-neon-primary' : 'text-muted-foreground',
        )}
        onClick={() => onTabChange(tab)}
        variants={motionTokens.fadeIn}
        initial="initial"
        animate="animate"
      >
        {tab}
      </motion.button>
    ))}
  </div>
);

// Slot Demo:
// <TabSwitcher tabs={["Overview", "Details"]} activeTab={tab} onTabChange={setTab} />
