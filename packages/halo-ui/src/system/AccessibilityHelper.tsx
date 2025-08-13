// AccessibilityHelper: Simple a11y checker for missing aria-labels
import React, { useEffect, useState } from 'react';

export const AccessibilityHelper = () => {
  const [missingLabels, setMissingLabels] = useState(0);
  useEffect(() => {
    const all = document.querySelectorAll('button, input, a, [role="button"]');
    let count = 0;
    all.forEach(el => {
      if (!el.getAttribute('aria-label') && !el.textContent?.trim()) count++;
    });
    setMissingLabels(count);
  }, []);
  return (
    <div style={{ position: 'fixed', bottom: 140, right: 16, zIndex: 9999, background: 'rgba(24,24,32,0.85)', color: '#00fff0', padding: 12, borderRadius: 10, fontSize: 13, boxShadow: '0 2px 16px 0 #00fff088' }}>
      <div>Accessibility</div>
      <div>Missing aria-labels: {missingLabels}</div>
    </div>
  );
};

// Usage: <AccessibilityHelper />
