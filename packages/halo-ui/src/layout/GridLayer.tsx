// GridLayer: Responsive grid scaffold
import React from 'react';

export const GridLayer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">{children}</div>
);

export default GridLayer;
