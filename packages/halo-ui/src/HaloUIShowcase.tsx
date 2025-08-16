import React from 'react';

import { AccordionPanel } from './data/AccordionPanel';
import { BreadcrumbNav } from './data/BreadcrumbNav';
import { ChartContainer } from './data/ChartContainer';
import { ImageCard } from './data/ImageCard';
import { NotificationBadge } from './data/NotificationBadge';
import { TabSwitcher } from './data/TabSwitcher';
import { FeedbackToast } from './feedback/FeedbackToast';
import { ProgressBar } from './feedback/ProgressBar';

export default function HaloUIShowcase() {
  const [tab, setTab] = React.useState('Overview');
  const [accordionOpen, setAccordionOpen] = React.useState(false);
  return (
    <div className="space-y-8 p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Halo UI Component Showcase</h1>
      <FeedbackToast message="Saved!" type="success" />
      <ImageCard
        image="/img/hero.png"
        caption="Hero Banner"
        action={<button className="halo-btn">View</button>}
      />
      <ChartContainer title="Active Users">
        {/* Chart goes here */}
        <div className="h-24 bg-glass-border rounded" />
      </ChartContainer>
      <TabSwitcher tabs={['Overview', 'Details']} activeTab={tab} onTabChange={setTab} />
      <ProgressBar progress={60} label="Loading..." />
      <AccordionPanel
        title="FAQ"
        content={<p>Answer to the most common question.</p>}
        isOpen={accordionOpen}
        onToggle={() => setAccordionOpen((o) => !o)}
      />
      <BreadcrumbNav
        items={['Home', 'Studio', 'Project']}
        onNavigate={(item: string) => alert(item)}
      />
      <NotificationBadge count={5} />
      <div className="text-xs text-muted-foreground mt-8">
        All components use shared tokens for color, glass, motion, and rounding. See{' '}
        <code>src/tokens/theme.ts</code>.
      </div>
    </div>
  );
}
