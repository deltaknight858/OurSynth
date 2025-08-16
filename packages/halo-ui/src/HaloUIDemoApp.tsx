import React from 'react';

import HaloUIShowcase from './HaloUIShowcase';
import { AccessibilityHelper } from './system/AccessibilityHelper';
import { DevtoolsOverlay } from './system/DevtoolsOverlay';
import { PerformanceMonitor } from './system/PerformanceMonitor';
import { ThemeProvider } from './system/SystemUtilities';

export default function HaloUIDemoApp() {
  return (
    <ThemeProvider>
      <HaloUIShowcase />
      <DevtoolsOverlay />
      <PerformanceMonitor />
      <AccessibilityHelper />
    </ThemeProvider>
  );
}
