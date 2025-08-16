// apps/studio/deploy/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassLayer } from "./src/components/ui/GlassLayer";
import { DeployForm } from "./src/components/DeployForm";
import { DeploymentStatus } from "./src/components/DeploymentStatus";

const sampleDeployments = [
  {
    id: "1",
    projectName: "oursynth-web",
    environment: "production",
    status: "completed" as const,
    progress: 100,
    timestamp: "10 minutes ago",
  },
  {
    id: "2",
    projectName: "studio-app",
    environment: "staging",
    status: "running" as const,
    progress: 65,
    timestamp: "Just now",
  },
];

export default function DeployPage() {
  const [deployments] = useState(sampleDeployments);

  return (
    <main className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "2rem" }}
        >
          <h1 className="text-4xl font-bold text-neon">Deploy</h1>
          <p className="text-gray-400 mt-2">
            Deploy your apps with ease and monitor their status.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-5 gap-6">
          <div className="md:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              style={{ maxWidth: "36rem", width: "100%" }}
            >
              <GlassLayer className="p-6">
                <motion.h2
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    color: "white",
                    marginBottom: "1rem",
                  }}
                >
                  Deploy Your App
                </motion.h2>
                <DeployForm />
              </GlassLayer>
            </motion.div>
          </div>
          <div className="md:col-span-2">
            <DeploymentStatus deployments={deployments} />
          </div>
        </div>
      </div>
    </main>
  );
}
