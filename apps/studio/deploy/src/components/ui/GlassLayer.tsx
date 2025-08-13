import React from 'react';
import clsx from 'clsx';

export interface GlassLayerProps {
  children: React.ReactNode;
  className?: string;
  blur?: 'sm' | 'md' | 'lg';
  opacity?: 'light' | 'medium' | 'dark';
  border?: boolean;
  shadow?: boolean;
  neonBorder?: boolean;
}

export const GlassLayer: React.FC<GlassLayerProps> = ({
  children,
  className,
  blur = 'md',
  opacity = 'medium',
  border = false,
  shadow = false,
  neonBorder = false,
}) => {
  const opacityClass = {
    light: 'bg-opacity-60',
    medium: 'bg-opacity-75',
    dark: 'bg-opacity-90',
  };

  return (
    <div
      className={clsx(
        'bg-glass-bg',
        `backdrop-blur-${blur}`,
        opacityClass[opacity],
        'rounded-xl',
        border && 'border border-glass-border',
        shadow && 'shadow-glass',
        neonBorder && 'border border-neon shadow-neon',
        className
      )}
    >
      {children}
    </div>
  );
};