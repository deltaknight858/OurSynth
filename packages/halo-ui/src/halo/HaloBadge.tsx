'use client';

import React from 'react';

import styles from './HaloBadge.module.css';
import { cn } from '../lib/utils';

export interface HaloBadgeProps {
  label: string;
  color?: string;
  className?: string;
}

const HaloBadge: React.FC<HaloBadgeProps> = ({ label, color = '#00fff0', className }) => (
  <span className={cn(styles.haloBadge, className)} style={{ backgroundColor: color }}>
    {label}
  </span>
);

export default HaloBadge;
