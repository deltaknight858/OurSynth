// Zustand store for wizard state
import { StateCreator, create } from 'zustand';
import { shallow } from 'zustand/shallow';

type WizardFormData = Record<string, any>;

interface WizardState {
  currentStep: number;
  formData: WizardFormData;
  preview: boolean;
  setStep: (step: number) => void;
  setFormData: (data: Partial<WizardFormData>) => void;
  togglePreview: () => void;
}

export const useWizardStore = create<WizardState>((set, get) => ({
  currentStep: 0,
  formData: {},
  preview: false,
  setStep: (step: number) => set({ currentStep: step }),
  setFormData: (data: Partial<WizardFormData>) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
  togglePreview: () => set((state) => ({ preview: !state.preview })),
}));

export { shallow };
