// FlexLayer: Responsive flex scaffold
import React from 'react';

export const FlexLayer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col md:flex-row gap-6 w-full">{children}</div>
);

export default FlexLayer;
