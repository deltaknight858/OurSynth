import clsx from 'clsx';
import { motion } from 'framer-motion';
import React, { ReactNode } from 'react';

import { GlassLayer } from '../system/GlassLayer';
import { HaloButton } from '../system/HaloButton';
import { glassStyles } from '../tokens/glassStyles';
import { motionPresets } from '../tokens/motionPresets';
import { neonPalette } from '../tokens/neonPalette';

const variantAccent = {
  default:
    `border-[2px] border-[${neonPalette.plasma}]` + ' shadow-[0_0_16px_0_rgba(162,89,255,0.4)]',
  highlight:
    `border-[2px] border-[${neonPalette.neonGreen}]` + ' shadow-[0_0_16px_0_rgba(0,255,133,0.4)]',
  subtle:
    `border-[2px] border-[${neonPalette.neonYellow}]` + ' shadow-[0_0_16px_0_rgba(255,230,0,0.3)]',
};

const layoutSpacing = {
  vertical: 'flex-col gap-3 py-6 px-6',
  horizontal: 'flex-row items-center gap-6 py-4 px-6',
};

export interface PromptCardProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  variant?: 'default' | 'highlight' | 'subtle';
  layout?: 'vertical' | 'horizontal';
}

export const PromptCard = ({
  icon,
  title,
  description,
  action,
  variant = 'default',
  layout = 'vertical',
}: PromptCardProps) => {
  return (
    <GlassLayer
      className={clsx(
        'relative',
        glassStyles.base,
        glassStyles.rounded,
        glassStyles.padding,
        glassStyles.maxWidth,
        'transition-shadow duration-300',
        variantAccent[variant],
        'overflow-hidden flex',
        layoutSpacing[layout],
      )}
    >
      {icon && (
        <motion.div
          className="text-4xl"
          style={{ boxShadow: neonPalette.glow.cyan }}
          variants={motionPresets.floatUp.variants}
          initial="hidden"
          animate="visible"
          transition={{
            ...motionPresets.floatUp.transition,
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 2,
          }}
        >
          {icon}
        </motion.div>
      )}
      <div className={clsx('flex-1', layout === 'horizontal' ? 'min-w-0' : '')}>
        <motion.h3
          className="font-bold text-lg md:text-xl mb-1"
          variants={motionPresets.fadeIn.variants}
          initial="hidden"
          animate="visible"
        >
          {title}
        </motion.h3>
        {description && (
          <motion.p
            className="text-muted-foreground text-base mb-2"
            variants={motionPresets.fadeIn.variants}
            initial="hidden"
            animate="visible"
            transition={{ ...motionPresets.fadeIn.transition, delay: 0.1 }}
          >
            {description}
          </motion.p>
        )}
      </div>
      {action && (
        <motion.div
          variants={motionPresets.floatDown?.variants || {}}
          initial="hidden"
          animate="visible"
        >
          {action}
        </motion.div>
      )}
    </GlassLayer>
  );
};

// --- Slot Demos ---
// 1. Connect your domain onboarding step
// <PromptCard
//   icon={<GlobeIcon />}
//   title="Connect your domain"
//   description="Point your custom domain to your new app."
//   action={<HaloButton variant="primary">Connect</HaloButton>}
//   variant="highlight"
// />
//
// 2. Deploy your app prompt
// <PromptCard
//   icon={<RocketIcon />}
//   title="Deploy your app"
//   description="Push your changes live in one click."
//   action={<HaloButton variant="success">Deploy</HaloButton>}
//   variant="default"
// />
//
// 3. Add your first component nudge
// <PromptCard
//   icon={<PlusCircleIcon />}
//   title="Add your first component"
//   description="Start building by adding a UI block."
//   action={<HaloButton variant="primary">Add Component</HaloButton>}
//   variant="subtle"
// />
//
// 4. Explore templates suggestion
// <PromptCard
//   icon={<WandIcon />}
//   title="Explore templates"
//   description="Browse ready-made templates to jumpstart your project."
//   action={<HaloButton variant="primary">Explore</HaloButton>}
//   variant="default"
// />
