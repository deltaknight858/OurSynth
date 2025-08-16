// apps/studio/deploy/components/DeployForm.tsx
import { motion } from "framer-motion";
import { useState } from "react";

import { HaloButton } from "./ui/HaloButton";
import { Input } from "./ui/input";
import { TabSwitcher } from "./ui/TabSwitcher";

export function DeployForm() {
  const [activeProvider, setActiveProvider] = useState("vercel");
  const [projectName, setProjectName] = useState("");
  const [environment, setEnvironment] = useState("production");
  const [region, setRegion] = useState("us-west");
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
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <TabSwitcher
        tabs={["vercel", "azure", "netlify"]}
        activeTab={activeProvider}
        onTabChange={setActiveProvider}
      />
      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Project Name
        </label>
        <Input
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="my-awesome-app"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Environment
          </label>
          <Input
            value={environment}
            onChange={(e) => setEnvironment(e.target.value)}
            placeholder="production"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Region
          </label>
          <Input
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            placeholder="Select region"
          />
        </div>
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
          onClick={() => console.log("Cancel clicked")}
          disabled={isDeploying}
        />
      </div>
    </motion.div>
  );
}
