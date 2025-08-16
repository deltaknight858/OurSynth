// FuturisticWizard: Multi-step wizard using Zustand store and dynamic steps
import React from 'react';

import { PathwaysOrchestrator } from './PathwaysOrchestrator';
import { useWizardStore, shallow } from './useWizardStore';
import { WizardStep } from './WizardStep';
import type { WizardStepType } from './WizardStep';

const steps: WizardStepType[] = [
  {
    key: 'step1',
    title: 'Step 1',
    run: async (context) => ({ ...context, step1: true }),
  },
  {
    key: 'step2',
    title: 'Step 2',
    run: async (context) => ({ ...context, step2: true }),
  },
  {
    key: 'step3',
    title: 'Step 3',
    run: async (context) => ({ ...context, step3: true }),
  },
];

const orchestrator = new PathwaysOrchestrator(steps);

const { currentStep, setStep, formData, setFormData } = useWizardStore((s) => ({
  currentStep: s.currentStep,
  setStep: s.setStep,
  formData: s.formData,
  setFormData: s.setFormData,
}));

const handleNext = async () => {
  await orchestrator.next();
  if (currentStep < steps.length - 1) setStep(currentStep + 1);
  // else: finish logic here
};

export function FuturisticWizard() {
  const { currentStep, setStep, formData, setFormData } = useWizardStore((s) => ({
    currentStep: s.currentStep,
    setStep: s.setStep,
    formData: s.formData,
    setFormData: s.setFormData,
  }));

  const handleNext = async () => {
    await orchestrator.next();
    if (currentStep < steps.length - 1) setStep(currentStep + 1);
    // else: finish logic here
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2 mb-4">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all ${
              i === currentStep
                ? 'bg-cyan-400 text-white shadow-[0_0_8px_2px_#00fff7]' // neon glow
                : 'bg-white/20 text-gray-400'
            }`}
          >
            {i + 1}
          </div>
        ))}
      </div>
      <h3 className="text-lg font-bold mb-2">{steps[currentStep].title}</h3>
      <WizardStep data={formData} onChange={setFormData} onNext={handleNext} />
    </div>
  );
}
