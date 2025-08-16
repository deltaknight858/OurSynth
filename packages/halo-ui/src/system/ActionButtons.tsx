import './ActionButtons.css';
// packages/halo-ui/src/system/ActionButtons.tsx
import { LucideCamera, LucidePackage, LucideNetwork, LucideRefreshCw } from 'lucide-react';

import { HaloButton } from './HaloButton';
import actions from '../../../../.oursynth/actions.json';

const iconMap: Record<string, any> = {
  LucideCamera,
  LucidePackage,
  LucideNetwork,
  LucideRefreshCw,
};

export function ActionButtons() {
  return (
    <div className="action-buttons-grid">
      {actions.map(({ id, label, icon, run }) => {
        const Icon = iconMap[icon] || null;
        return (
          <HaloButton
            key={id}
            label={label}
            icon={Icon ? <Icon /> : undefined}
            onClick={() => {
              fetch(`/api/jobs/run/${id}`, { method: 'POST' });
            }}
          />
        );
      })}
    </div>
  );
}
