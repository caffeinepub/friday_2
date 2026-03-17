import React from 'react';

interface AnimatedOrbProps {
  isActive: boolean;
  isSpeaking?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function AnimatedOrb({ isActive, isSpeaking = false, size = 'md' }: AnimatedOrbProps) {
  const sizes = {
    sm: { outer: 48, inner: 32, ring1: 56, ring2: 64 },
    md: { outer: 72, inner: 48, ring1: 84, ring2: 96 },
    lg: { outer: 96, inner: 64, ring1: 112, ring2: 128 },
  };

  const s = sizes[size];

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: s.ring2, height: s.ring2 }}
    >
      {/* Outer ring */}
      <div
        className={`absolute rounded-full border ${isActive ? 'border-friday-gold animate-ring-rotate' : 'border-friday-gold/20'}`}
        style={{
          width: s.ring2,
          height: s.ring2,
          borderStyle: 'dashed',
          borderWidth: 1,
        }}
      />

      {/* Middle ring */}
      <div
        className={`absolute rounded-full border ${isActive ? 'border-friday-gold/60 animate-ring-rotate-reverse' : 'border-friday-gold/10'}`}
        style={{
          width: s.ring1,
          height: s.ring1,
          borderWidth: 1,
        }}
      />

      {/* Core orb */}
      <div
        className={`relative rounded-full flex items-center justify-center overflow-hidden transition-all duration-500 ${
          isActive
            ? isSpeaking
              ? 'animate-orb-pulse animate-glow-pulse'
              : 'animate-orb-pulse animate-glow-pulse'
            : 'animate-orb-idle animate-glow-idle'
        }`}
        style={{
          width: s.outer,
          height: s.outer,
          background: isActive
            ? 'radial-gradient(circle at 35% 35%, oklch(0.82 0.20 65), oklch(0.55 0.14 65), oklch(0.30 0.08 65))'
            : 'radial-gradient(circle at 35% 35%, oklch(0.35 0.06 65), oklch(0.20 0.04 65), oklch(0.12 0.02 65))',
          boxShadow: isActive
            ? '0 0 20px oklch(0.72 0.18 65 / 0.6), 0 0 40px oklch(0.72 0.18 65 / 0.3), inset 0 0 20px oklch(0.82 0.20 65 / 0.2)'
            : '0 0 8px oklch(0.72 0.18 65 / 0.15), inset 0 0 10px oklch(0.30 0.08 65 / 0.1)',
        }}
      >
        {/* Inner glow */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: isActive
              ? 'radial-gradient(circle at 30% 30%, oklch(0.95 0.15 65 / 0.4), transparent 60%)'
              : 'radial-gradient(circle at 30% 30%, oklch(0.60 0.10 65 / 0.15), transparent 60%)',
          }}
        />

        {/* Avatar image */}
        <img
          src="/assets/generated/friday-avatar.dim_128x128.png"
          alt="FRIDAY"
          className="rounded-full object-cover"
          style={{
            width: s.inner,
            height: s.inner,
            opacity: isActive ? 1 : 0.4,
            filter: isActive ? 'brightness(1.2) saturate(1.3)' : 'brightness(0.5) saturate(0.5)',
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />

        {/* Speaking bars overlay */}
        {isSpeaking && isActive && (
          <div className="absolute inset-0 flex items-center justify-center gap-0.5">
            {[0, 1, 2, 3, 4].map(i => (
              <div
                key={i}
                className="w-0.5 rounded-full bg-friday-gold"
                style={{
                  animation: `bar-wave 0.6s ease-in-out infinite`,
                  animationDelay: `${i * 0.1}s`,
                  height: '4px',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
