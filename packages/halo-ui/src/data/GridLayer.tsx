// GridLayer: GridLayer.tsx

import clsx from 'clsx';
import React, { ReactNode } from 'react';

import { spacing } from '../system/tokens';

export interface GridLayerProps {
  columns?: number;
  gap?: keyof typeof spacing;
  responsive?: boolean;
  children: ReactNode;
}

export const GridLayer = ({
  columns = 3,
  gap = 'md',
  responsive = true,
  children,
}: GridLayerProps) => (
  <div
    className={clsx(
      'grid',
      responsive ? 'sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-' + columns : 'grid-cols-' + columns,
    )}
    style={{ gap: spacing[gap] }}
  >
    {children}
  </div>
);

// Example usage:
// <GridLayer columns={4} gap="lg">{...}</GridLayer>
