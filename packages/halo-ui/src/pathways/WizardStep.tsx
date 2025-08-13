// WizardStep: A single step in the wizard
import React from 'react';

export interface WizardStepProps {
  data: any;
  onChange: (data: any) => void;
  onNext: () => void;
}


// Wizard step type for orchestrator and wizard
export type WizardStepType = {
  key: string;
  title: string;
  run: (context: any) => Promise<any>;
};

export const WizardStep: React.FC<WizardStepProps> = ({ data, onChange, onNext }) => {

  // Example: simple text input with validation
  const [value, setValue] = React.useState(data.value || '');
  const [error, setError] = React.useState<string | null>(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setError(null);
  };

  const handleNext = () => {
    if (!value.trim()) {
      setError('This field is required.');
      return;
    }
    onChange({ value });
    onNext();
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl max-w-4xl p-6 flex flex-col gap-4">
      <label className="font-medium">Enter a value for this step:</label>
      <input
        className="px-4 py-2 rounded border border-gray-300 bg-white/20"
        value={value}
        onChange={handleInput}
        title="Enter a value for this step"
        placeholder="Enter a value"
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button className="btn btn-primary self-end mt-2" onClick={handleNext}>Next</button>
    </div>
  );
};
