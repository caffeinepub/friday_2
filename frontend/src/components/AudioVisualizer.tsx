import React from 'react';

interface AudioVisualizerProps {
  isActive: boolean;
  barCount?: number;
}

export default function AudioVisualizer({ isActive, barCount = 12 }: AudioVisualizerProps) {
  if (!isActive) return null;

  return (
    <div className="flex items-center justify-center gap-0.5 h-6">
      {Array.from({ length: barCount }).map((_, i) => (
        <div
          key={i}
          className="w-0.5 rounded-full bg-friday-gold"
          style={{
            animation: `bar-wave ${0.4 + Math.random() * 0.4}s ease-in-out infinite`,
            animationDelay: `${(i / barCount) * 0.5}s`,
            minHeight: '3px',
            maxHeight: '20px',
          }}
        />
      ))}
    </div>
  );
}
