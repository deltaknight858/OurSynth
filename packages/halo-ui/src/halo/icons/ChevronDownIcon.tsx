import React from 'react';

import styles from './icon.module.css';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
  neon?: boolean;
}

export const ChevronDownIcon: React.FC<IconProps> = ({ color, neon, className, ...props }) => (
  <svg
    width={props.width || 20}
    height={props.height || 20}
    viewBox="0 0 20 20"
    fill="none"
    stroke={color || 'currentColor'}
    strokeWidth={2.2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={[className, neon ? styles['halo-icon-neon'] : undefined].filter(Boolean).join(' ')}
    {...props}
  >
    <path d="M6 8l4 4 4-4" />
  </svg>
);

export default ChevronDownIcon;
