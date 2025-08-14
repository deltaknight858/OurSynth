import React from 'react';
import { HaloScrollbarProvider } from '@oursynth/halo-ui';

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <HaloScrollbarProvider>{children}</HaloScrollbarProvider>;
}
