'use client';

import { motion } from 'framer-motion';
import React from 'react';

import { cn } from '../lib/utils';

export interface HaloAlertProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  message: string;
  className?: string;
}

const typeClasses = {
  info: 'bg-blue-100 text-blue-800 border-blue-200',
  success: 'bg-green-100 text-green-800 border-green-200',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  error: 'bg-red-100 text-red-800 border-red-200',
};

const HaloAlert: React.FC<HaloAlertProps> = ({ type = 'info', message, className }) => (
  <motion.div
    className={cn('border-l-4 p-4 rounded flex items-center', typeClasses[type], className)}
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
    role="alert"
  >
    <span>{message}</span>
  </motion.div>
);

export default HaloAlert;
