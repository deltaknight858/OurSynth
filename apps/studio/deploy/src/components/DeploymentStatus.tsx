import { motion } from "framer-motion";

import { GlassLayer } from "./ui/GlassLayer";
import { ProgressBar } from "./ui/ProgressBar";

interface Deployment {
  id: string;
  projectName: string;
  environment: string;
  status: "running" | "completed" | "failed";
  progress: number;
  timestamp: string;
}

interface DeploymentStatusProps {
  deployments: Deployment[];
}

export function DeploymentStatus({ deployments }: DeploymentStatusProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      style={{ marginTop: "2rem" }}
    >
      <h2 className="text-xl font-semibold text-neon mb-4">
        Recent Deployments
      </h2>
      <div className="space-y-4">
        {deployments.length === 0 ? (
          <GlassLayer className="p-4 text-center text-gray-400">
            No deployments yet. Start by deploying your first project!
          </GlassLayer>
        ) : (
          deployments.map((deployment) => (
            <GlassLayer
              key={deployment.id}
              className="p-4"
              neonBorder={deployment.status === "running"}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-white">
                  {deployment.projectName}
                </h3>
                <StatusBadge status={deployment.status} />
              </div>
              <div className="text-sm text-gray-400 mb-3">
                <span>{deployment.environment}</span>
                <span className="mx-2">•</span>
                <span>{deployment.timestamp}</span>
              </div>
              {deployment.status === "running" && (
                <ProgressBar progress={deployment.progress} />
              )}
            </GlassLayer>
          ))
        )}
      </div>
    </motion.div>
  );
}

function StatusBadge({
  status,
}: {
  status: "running" | "completed" | "failed";
}) {
  const statusConfig = {
    running: { color: "bg-neon-tertiary", text: "Running" },
    completed: { color: "bg-neon-success", text: "Completed" },
    failed: { color: "bg-neon-error", text: "Failed" },
  };
  const config = statusConfig[status];
  return (
    <span
      className={`${config.color} bg-opacity-20 text-xs font-medium px-2.5 py-0.5 rounded-full border border-current`}
    >
      {config.text}
    </span>
  );
}
