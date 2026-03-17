import React from 'react';

export default function ThinkingAnimation() {
  return (
    <div className="flex items-start gap-3 animate-fade-in-up">
      <div
        className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
        style={{
          background: 'radial-gradient(circle, oklch(0.55 0.14 65), oklch(0.30 0.08 65))',
          boxShadow: '0 0 10px oklch(0.72 0.18 65 / 0.3)',
        }}
      >
        <span className="text-xs font-orbitron font-bold text-friday-gold">F</span>
      </div>
      <div
        className="px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5"
        style={{
          background: 'oklch(0.14 0.01 260)',
          border: '1px solid oklch(0.72 0.18 65 / 0.2)',
        }}
      >
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-friday-gold"
            style={{
              animation: 'thinking-dot 1.4s ease-in-out infinite',
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
