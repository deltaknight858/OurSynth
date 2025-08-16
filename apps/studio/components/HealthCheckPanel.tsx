'use client';

import React, { useState } from 'react';

// Assuming a simple button and pre-formatted text display for output
// You might want to use your project's UI components (e.g., Radix UI, Shadcn UI)
// if they are available and you know how to import them.
// For now, I'll use basic HTML elements.

export function HealthCheckPanel() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [output, setOutput] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false); // State for the toggle

  const runHealthCheck = async () => {
    setIsLoading(true);
    setError(null);
    setOutput(null);
    try {
      const response = await fetch('/api/health-check');
      const data = await response.json();
      if (response.ok) {
        setOutput(data.output);
      } else {
        setError(data.message || 'An unknown error occurred');
        setOutput(data.output); // Still show output even on error
      }
    } catch (err: any) {
      setError(err.message || 'Failed to connect to the API');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', margin: '16px 0' }}>
      <h2 style={{ marginBottom: '10px' }}>Health Check Panel</h2>
      <label>
        <input type="checkbox" checked={isVisible} onChange={() => setIsVisible(!isVisible)} /> Show
        Health Check Tools
      </label>

      {isVisible && (
        <div>
          <button
            onClick={runHealthCheck}
            disabled={isLoading}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              marginTop: '10px',
            }}
          >
            {isLoading ? 'Running...' : 'Run Health Check'}
          </button>

          {error && <p style={{ color: 'red', marginTop: '10px' }}>Error: {error}</p>}

          {output && (
            <div
              style={{
                backgroundColor: '#f0f0f0',
                padding: '10px',
                marginTop: '10px',
                whiteSpace: 'pre-wrap',
                fontFamily: 'monospace',
                maxHeight: '300px',
                overflowY: 'auto',
              }}
            >
              <h3>Output:</h3>
              <pre>{output}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
