// PerformanceMonitor: Simple render count and FPS tracker
import React, { useRef, useEffect, useState } from 'react';

export const PerformanceMonitor = () => {
  const [fps, setFps] = useState(0);
  const renders = useRef(0);
  useEffect(() => {
    let last = performance.now();
    let frames = 0;
    let running = true;
    function loop(now: number) {
      if (!running) return;
      frames++;
      if (now - last > 1000) {
        setFps(frames);
        frames = 0;
        last = now;
      }
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
    return () => {
      running = false;
    };
  }, []);
  renders.current++;
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 80,
        right: 16,
        zIndex: 9999,
        background: 'rgba(24,24,32,0.85)',
        color: '#00fff0',
        padding: 12,
        borderRadius: 10,
        fontSize: 13,
        boxShadow: '0 2px 16px 0 #00fff088',
      }}
    >
      <div>Performance</div>
      <div>FPS: {fps}</div>
      <div>Renders: {renders.current}</div>
    </div>
  );
};

// Usage: <PerformanceMonitor />
