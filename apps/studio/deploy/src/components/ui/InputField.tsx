import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export interface TabSwitcherProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

export const TabSwitcher: React.FC<TabSwitcherProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className,
}) => {
  return (
    <div className={clsx('flex rounded-lg bg-glass-bg backdrop-blur-sm p-1', className)}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={clsx(
            'flex-1 px-3 py-2 text-sm font-medium rounded-md relative',
            'transition-colors duration-200',
            activeTab === tab ? 'text-neon' : 'text-gray-400 hover:text-white'
          )}
        >
          {activeTab === tab && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 rounded-md bg-black border border-neon shadow-neon"
              initial={false}
              transition={{ type: 'spring', duration: 0.5 }}
            />
          )}
          <span className="relative z-10">{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
        </button>
      ))}
    </div>
  );
};