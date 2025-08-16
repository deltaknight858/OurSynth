// PathwaysMain.tsx: Pathways AI Tool up to the wizard, with Domains and Deploy left for later
import React, { useState } from 'react';

import { PromptCard } from './data/PromptCard';
import { FuturisticWizard } from './pathways/FuturisticWizard';
import { ThemeProvider, useTheme } from './system/SystemUtilities';

const pathwaysResults = [
  {
    key: 'studio',
    title: 'Studio Project',
    description: 'A new project workspace for building apps.',
    icon: (
      <span role="img" aria-label="studio">
        🛠️
      </span>
    ),
  },
  {
    key: 'pathways',
    title: 'Pathways Wizard',
    description: 'AI-powered scaffolding for your app.',
    icon: (
      <span role="img" aria-label="pathways">
        ✨
      </span>
    ),
  },
  // Domains and Deploy intentionally omitted for now
];

export const PathwaysMain = () => {
  const [prompt, setPrompt] = useState('');
  const [results, setResults] = useState<typeof pathwaysResults | null>(null);
  const [wizardStarted, setWizardStarted] = useState(false);

  const handlePrompt = () => {
    setResults(pathwaysResults);
  };

  const handleAddToStudio = (key: string) => {
    if (key === 'pathways') setWizardStarted(true);
  };

  return (
    <ThemeProvider>
      <div className="max-w-3xl mx-auto p-8 flex flex-col gap-8">
        <h1 className="text-2xl font-bold mb-2">Pathways AI Tool</h1>
        <div className="flex gap-2">
          <input
            className="flex-1 px-4 py-2 rounded border border-gray-300 bg-white/10 backdrop-blur-md"
            placeholder="Describe what you want to build..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handlePrompt} disabled={!prompt.trim()}>
            Generate
          </button>
        </div>
        {results && !wizardStarted && (
          <div className="grid gap-6 mt-4">
            {results.map((r, i) => (
              <PromptCard
                key={r.key}
                icon={r.icon}
                title={r.title}
                description={r.description}
                action={
                  <button className="btn btn-secondary" onClick={() => handleAddToStudio(r.key)}>
                    Add to Studio
                  </button>
                }
              />
            ))}
          </div>
        )}
        {wizardStarted && (
          <div className="mt-8 p-6 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md max-w-2xl mx-auto">
            <FuturisticWizard />
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default PathwaysMain;
