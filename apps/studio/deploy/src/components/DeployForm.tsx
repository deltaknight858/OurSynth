// apps/studio/deploy/components/DeployForm.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { InputField } from './ui/InputField';
import { TabSwitcher } from './ui/TabSwitcher';
import { HaloButton } from './ui/HaloButton';

export function DeployForm() {
  const [activeProvider, setActiveProvider] = useState('vercel');
  const [projectName, setProjectName] = useState('');
  const [environment, setEnvironment] = useState('production');
  const [region, setRegion] = useState('us-west');
  const [isDeploying, setIsDeploying] = useState(false);

  const handleDeploy = () => {
    setIsDeploying(true);
    // Simulate deployment
    setTimeout(() => {
      setIsDeploying(false);
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <TabSwitcher
        tabs={['vercel', 'azure', 'netlify']}
        activeTab={activeProvider}
        onTabChange={setActiveProvider}
      />
      <InputField
        label="Project Name"
        value={projectName}
        onChange={setProjectName}
        placeholder="my-awesome-app"
      />
      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="Environment"
          value={environment}
          onChange={setEnvironment}
          placeholder="production"
        />
        <InputField
          label="Region"
          value={region}
          onChange={setRegion}
          placeholder="Select region"
        />
      </div>
      <div className="mt-6 flex gap-4">
        <HaloButton
          label="Deploy Now"
          variant="primary"
          loading={isDeploying}
          onClick={handleDeploy}
        />
        <HaloButton
          label="Cancel"
          variant="ghost"
          onClick={() => console.log('Cancel clicked')}
          disabled={isDeploying}
        />
      </div>
    </motion.div>
  );
}