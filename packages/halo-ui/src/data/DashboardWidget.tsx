import React from 'react';

export interface DashboardWidgetProps {
  title?: string;
  value?: number | string;
  trend?: 'up' | 'down';
}

export const DashboardWidget = ({ title = 'Widget', value = 0, trend }: DashboardWidgetProps) => (
  <div className="p-4 border rounded-lg bg-glass-bg flex flex-col items-center">
    <div className="font-bold text-lg mb-1">{title}</div>
    <div className="text-2xl mb-1">{value}</div>
    {trend && <div className={trend === 'up' ? 'text-green-500' : 'text-red-500'}>{trend === 'up' ? '▲' : '▼'}</div>}
  </div>
);

export default DashboardWidget;
