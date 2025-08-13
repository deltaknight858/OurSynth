import React from 'react';
import { ThemeProvider } from './system/SystemUtilities';
import { DevtoolsOverlay } from './system/DevtoolsOverlay';
import { PerformanceMonitor } from './system/PerformanceMonitor';
import { AccessibilityHelper } from './system/AccessibilityHelper';
import HaloUIShowcase from './HaloUIShowcase';

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
