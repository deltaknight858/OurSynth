import clsx from 'clsx';
import { motion } from 'framer-motion';
import React, { ReactNode } from 'react';

import { glass, motion as motionTokens, rounding } from '../tokens/theme';

export interface ImageCardProps {
  image: string;
  caption?: string;
  action?: ReactNode;
}

export const ImageCard = ({ image, caption, action }: ImageCardProps) => (
  <motion.div
    className={clsx(
      'relative flex flex-col items-center',
      glass.bg,
      glass.border,
      rounding.lg,
      'border shadow-md p-3',
    )}
    variants={motionTokens.fadeIn}
    initial="initial"
    animate="animate"
  >
    <img src={image} alt={caption || 'Image'} className="rounded-lg w-full object-cover mb-2" />
    {caption && <div className="text-sm text-center mb-2">{caption}</div>}
    {action && <div>{action}</div>}
  </motion.div>
);

// Slot Demo:
// <ImageCard image="/img/hero.png" caption="Hero Banner" action={<HaloButton>View</HaloButton>} />
