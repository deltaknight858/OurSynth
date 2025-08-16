import clsx from 'clsx';
import React, { ReactNode } from 'react';

import { glass, rounding } from '../tokens/theme';

export interface ChartContainerProps {
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export const ChartContainer = ({ title, children, footer }: ChartContainerProps) => (
  <div
    className={clsx('flex flex-col', glass.bg, glass.border, rounding.lg, 'border shadow-md p-4')}
  >
    {title && <div className="font-semibold text-base mb-2">{title}</div>}
    <div className="flex-1">{children}</div>
    {footer && <div className="mt-2">{footer}</div>}
  </div>
);

// Slot Demo:
// <ChartContainer title="Active Users">{<Chart />}</ChartContainer>
