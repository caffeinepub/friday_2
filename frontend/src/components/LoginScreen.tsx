import React from 'react';
import { Loader2, Shield, Zap, Globe, Mic } from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';

export default function LoginScreen() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isLoggingIn = loginStatus === 'logging-in';
  const isAuthenticated = !!identity;

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: unknown) {
        const err = error as Error;
        if (err?.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  const features = [
    { icon: <Mic size={16} />, label: 'Voice Interaction' },
    { icon: <Globe size={16} />, label: 'Multilingual' },
    { icon: <Zap size={16} />, label: 'Task Automation' },
    { icon: <Shield size={16} />, label: 'Secure & Private' },
  ];

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: 'oklch(0.08 0.005 260)',
      }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: 'url(/assets/generated/friday-bg.dim_1920x1080.png)' }}
      />

      {/* Animated grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(oklch(0.72 0.18 65 / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, oklch(0.72 0.18 65 / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 60% at 50% 50%, oklch(0.72 0.18 65 / 0.08) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-6 max-w-md w-full">

        {/* Logo + Orb */}
        <div className="flex flex-col items-center gap-4 animate-login-float">
          {/* Logo */}
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center relative"
            style={{
              background: 'radial-gradient(circle at 35% 35%, oklch(0.82 0.20 65), oklch(0.55 0.14 65), oklch(0.25 0.06 65))',
              boxShadow: '0 0 40px oklch(0.72 0.18 65 / 0.5), 0 0 80px oklch(0.72 0.18 65 / 0.25)',
              border: '2px solid oklch(0.72 0.18 65 / 0.4)',
            }}
          >
            <img
              src="/assets/generated/friday-logo.dim_256x256.png"
              alt="FRIDAY"
              className="w-16 h-16 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                const parent = (e.target as HTMLImageElement).parentElement;
                if (parent) {
                  const span = document.createElement('span');
                  span.className = 'text-3xl font-orbitron font-bold';
                  span.style.color = 'oklch(0.08 0.005 260)';
                  span.textContent = 'F';
                  parent.appendChild(span);
                }
              }}
            />
          </div>

          {/* Decorative rings */}
          <div className="absolute">
            <div
              className="w-36 h-36 rounded-full border animate-ring-rotate"
              style={{ borderColor: 'oklch(0.72 0.18 65 / 0.2)', borderStyle: 'dashed', borderWidth: 1 }}
            />
          </div>
        </div>

        {/* Title */}
        <div className="text-center">
          <h1
            className="text-5xl font-orbitron font-bold tracking-widest text-glow"
            style={{ color: 'oklch(0.72 0.18 65)' }}
          >
            FRIDAY
          </h1>
          <p className="text-sm font-rajdhani mt-2 tracking-wider" style={{ color: 'oklch(0.65 0.02 80)' }}>
            Your Advanced AI Personal Assistant
          </p>
          <p className="text-xs font-mono-tech mt-1" style={{ color: 'oklch(0.45 0.02 80)' }}>
            English · తెలుగు · हिंदी
          </p>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-2 justify-center">
          {features.map(f => (
            <div
              key={f.label}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-rajdhani"
              style={{
                border: '1px solid oklch(0.72 0.18 65 / 0.2)',
                color: 'oklch(0.65 0.14 65)',
                background: 'oklch(0.72 0.18 65 / 0.05)',
              }}
            >
              {f.icon}
              {f.label}
            </div>
          ))}
        </div>

        {/* Auth button */}
        <button
          onClick={handleAuth}
          disabled={isLoggingIn}
          className="w-full py-3.5 px-6 rounded-xl font-orbitron text-sm tracking-widest transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-3"
          style={{
            background: isLoggingIn
              ? 'oklch(0.45 0.12 65)'
              : 'linear-gradient(135deg, oklch(0.72 0.18 65), oklch(0.60 0.16 65))',
            color: 'oklch(0.08 0.005 260)',
            boxShadow: isLoggingIn ? 'none' : '0 0 20px oklch(0.72 0.18 65 / 0.4), 0 4px 16px oklch(0.72 0.18 65 / 0.3)',
          }}
        >
          {isLoggingIn ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              AUTHENTICATING...
            </>
          ) : (
            <>
              <Shield size={16} />
              AUTHENTICATE
            </>
          )}
        </button>

        {/* Status line */}
        <div className="flex items-center gap-2">
          <div
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: 'oklch(0.65 0.18 150)' }}
          />
          <span className="text-xs font-mono-tech" style={{ color: 'oklch(0.45 0.02 80)' }}>
            SYSTEM READY · SECURE CONNECTION
          </span>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 left-0 right-0 text-center">
        <p className="text-xs font-mono-tech" style={{ color: 'oklch(0.35 0.02 80)' }}>
          Built with{' '}
          <span style={{ color: 'oklch(0.72 0.18 65)' }}>♥</span>
          {' '}using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname || 'friday-ai')}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'oklch(0.72 0.18 65)' }}
            className="hover:underline"
          >
            caffeine.ai
          </a>
          {' '}· © {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
