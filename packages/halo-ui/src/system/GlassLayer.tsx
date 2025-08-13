import React from 'react';
import styles from './GlassLayer.module.css';

export interface GlassLayerProps {
  className?: string;
  children?: React.ReactNode;
  border?: boolean;
  shadow?: boolean;
}

export const GlassLayer = ({
  className = '',
  children,
  border = true,
  shadow = true,
}: GlassLayerProps) => {
  return (
    <div
      className={[
        styles['glass-layer'],
        !border && styles['glass-layer--no-border'],
        !shadow && styles['glass-layer--no-shadow'],
        className
      ].filter(Boolean).join(' ')}
    >
      {children}
    </div>
  );
};

export default GlassLayer;
