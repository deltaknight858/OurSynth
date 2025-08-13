// HaloUIDemoGallery: Preview all core UI primitives and flows
import React from 'react';
import { PromptCard } from './data/PromptCard';
import { EmptyState } from './data/EmptyState';
import { OnboardingStep } from './data/OnboardingStep';


import { DashboardWidget } from './data/DashboardWidget';
import { FeedbackToast } from './feedback/FeedbackToast';
import { ThemeProvider } from './system/SystemUtilities';
import { generateDocTable } from './system/DocumentationHelper';
import GridLayer from './layout/GridLayer';
import FlexLayer from './layout/FlexLayer';

export const HaloUIDemoGallery = () => (
  <ThemeProvider>
    <div className="flex flex-col gap-10 p-8 max-w-5xl mx-auto">
      <GridLayer>
        {/* Empty State Demo */}
        <section>
          <h2 className="font-bold text-xl mb-4">Empty State</h2>
          <EmptyState
            icon={<span role="img" aria-label="empty">📭</span>}
            title="No Data Yet"
            description="Start by adding your first item."
            action={<button className="btn btn-primary">Add Item</button>}
          />
          {/* DocumentationHelper usage replaced with generateDocTable or remove if not needed */}
        </section>
        {/* Onboarding Flow Demo */}
        <section>
          <h2 className="font-bold text-xl mb-4">Onboarding Step</h2>
          <OnboardingStep
            stepNumber={1}
            title="Welcome to OurSynth!"
            description="Let's get you set up in a few quick steps."
          />
          {/* DocumentationHelper usage replaced with generateDocTable or remove if not needed */}
        </section>
      </GridLayer>
      <FlexLayer>
        {/* Dashboard Widget Demo */}
        <section>
          <h2 className="font-bold text-xl mb-4">Dashboard Widget</h2>
          <DashboardWidget
            title="Active Users"
            value={128}
            trend="up"
          />
          {/* DocumentationHelper usage replaced with generateDocTable or remove if not needed */}
        </section>
        {/* Feedback Toast Demo */}
        <section>
          <h2 className="font-bold text-xl mb-4">Feedback Toast</h2>
          <FeedbackToast
            type="success"
            message="Your changes have been saved!"
          />
          {/* DocumentationHelper usage replaced with generateDocTable or remove if not needed */}
        </section>
      </FlexLayer>
    </div>
  </ThemeProvider>
);

export default HaloUIDemoGallery;
