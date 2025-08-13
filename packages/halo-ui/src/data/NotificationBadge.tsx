import React from 'react';
import clsx from 'clsx';
import { neon } from '../tokens/theme';

export interface NotificationBadgeProps {
  count: number;
  color?: string;
}

export const NotificationBadge = ({ count, color }: NotificationBadgeProps) => (
  <span
    className={clsx(
      'inline-flex items-center justify-center min-w-[1.5em] h-6 px-2 text-xs font-bold rounded-full border border-neon-primary bg-glass-bg text-neon-primary',
    )}
    style={{ background: 'rgba(0,255,240,0.08)', color: color || neon.primary }}
  >
    {count}
  </span>
);

// Slot Demo:
// <NotificationBadge count={5} />
