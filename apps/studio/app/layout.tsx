import { HaloScrollbarProvider } from '@oursynth/halo-ui';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <HaloScrollbarProvider>{children}</HaloScrollbarProvider>;
}
