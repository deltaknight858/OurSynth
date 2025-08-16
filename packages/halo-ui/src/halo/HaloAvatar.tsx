'use client';

import React from 'react';

import styles from './HaloAvatar.module.css';
import { cn } from '../lib/utils';

export interface HaloAvatarProps {
  src: string;
  alt?: string;
  size?: number;
  className?: string;
}

const HaloAvatar: React.FC<HaloAvatarProps> = ({ src, alt = 'Avatar', size = 40, className }) => (
  <img
    src={src}
    alt={alt}
    width={size}
    height={size}
    className={cn(styles.haloAvatar, className)}
  />
);

export default HaloAvatar;
