// FlexLayer: FlexLayer.tsx
import clsx from 'clsx';
import React, { ReactNode } from 'react';

import { spacing } from '../tokens/spacing';

export interface FlexLayerProps {
  direction?: 'row' | 'column';
  align?: 'start' | 'center' | 'end';
  justify?: 'start' | 'center' | 'between' | 'end';
  gap?: keyof typeof spacing;
  children: ReactNode;
}

const alignMap = { start: 'items-start', center: 'items-center', end: 'items-end' };
const justifyMap = {
  start: 'justify-start',
  center: 'justify-center',
  between: 'justify-between',
  end: 'justify-end',
};

export const FlexLayer = ({
  direction = 'row',
  align = 'center',
  justify = 'start',
  gap = 'md',
  children,
}: FlexLayerProps) => (
  <div
    className={clsx(
      'flex',
      direction === 'column' ? 'flex-col' : 'flex-row',
      alignMap[align],
      justifyMap[justify],
    )}
    style={{ gap: spacing[gap] }}
  >
    {children}
  </div>
);

// Example usage:
// <FlexLayer direction="row" gap="lg">{...}</FlexLayer>
