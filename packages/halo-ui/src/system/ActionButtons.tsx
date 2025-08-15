// packages/halo-ui/src/system/ActionButtons.tsx
import actions from '../../../../.oursynth/actions.json';
import { HaloButton } from '../controls/HaloButton';
import { LucideCamera, LucidePackage } from 'lucide-react';

const iconMap = { LucideCamera, LucidePackage };

export function ActionButtons() {
  return (
    <div style={{ display: 'grid', gap: 8 }}>
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
