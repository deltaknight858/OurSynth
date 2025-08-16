// DocumentationHelper: Simple doc generator for component props
import React from 'react';

export function generateDocTable(props: Record<string, string>) {
  return (
    <table
      style={{
        width: '100%',
        background: 'rgba(0,255,240,0.04)',
        color: '#00fff0',
        borderRadius: 8,
        fontSize: 13,
        margin: '8px 0',
      }}
    >
      <thead>
        <tr>
          <th style={{ textAlign: 'left', padding: 4 }}>Prop</th>
          <th style={{ textAlign: 'left', padding: 4 }}>Description</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(props).map(([key, desc]) => (
          <tr key={key}>
            <td style={{ padding: 4 }}>{key}</td>
            <td style={{ padding: 4 }}>{desc}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Usage:
// generateDocTable({ label: 'Button label', onClick: 'Click handler' })
