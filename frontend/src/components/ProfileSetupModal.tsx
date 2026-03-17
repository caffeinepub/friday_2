import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useSaveCallerUserProfile } from '../hooks/useQueries';

interface ProfileSetupModalProps {
  onComplete: (name: string) => void;
}

export default function ProfileSetupModal({ onComplete }: ProfileSetupModalProps) {
  const [name, setName] = useState('');
  const { identity } = useInternetIdentity();
  const saveProfile = useSaveCallerUserProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const principal = identity?.getPrincipal().toString() || '';
    await saveProfile.mutateAsync({ name: name.trim(), principalId: principal });
    onComplete(name.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div
        className="w-full max-w-sm mx-4 rounded-2xl p-6 animate-fade-in-up"
        style={{
          background: 'oklch(0.11 0.008 260)',
          border: '1px solid oklch(0.72 0.18 65 / 0.3)',
          boxShadow: '0 0 40px oklch(0.72 0.18 65 / 0.15)',
        }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{
              background: 'radial-gradient(circle, oklch(0.55 0.14 65), oklch(0.25 0.06 65))',
              boxShadow: '0 0 20px oklch(0.72 0.18 65 / 0.3)',
            }}
          >
            <span className="text-xl font-orbitron font-bold" style={{ color: 'oklch(0.08 0.005 260)' }}>F</span>
          </div>
        </div>

        <h2 className="text-center font-orbitron text-friday-gold tracking-widest text-sm mb-1">
          WELCOME TO FRIDAY
        </h2>
        <p className="text-center text-sm font-rajdhani text-muted-foreground mb-6">
          I'm your personal AI assistant. What should I call you?
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter your name"
            autoFocus
            className="w-full px-4 py-2.5 rounded-lg text-sm font-rajdhani outline-none transition-all"
            style={{
              background: 'oklch(0.14 0.01 260)',
              border: '1px solid oklch(0.72 0.18 65 / 0.3)',
              color: 'oklch(0.88 0.02 80)',
            }}
            onFocus={e => { e.target.style.borderColor = 'oklch(0.72 0.18 65 / 0.7)'; }}
            onBlur={e => { e.target.style.borderColor = 'oklch(0.72 0.18 65 / 0.3)'; }}
          />
          <button
            type="submit"
            disabled={!name.trim() || saveProfile.isPending}
            className="w-full py-2.5 rounded-lg font-orbitron text-xs tracking-widest transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            style={{
              background: 'linear-gradient(135deg, oklch(0.72 0.18 65), oklch(0.60 0.16 65))',
              color: 'oklch(0.08 0.005 260)',
              boxShadow: '0 0 15px oklch(0.72 0.18 65 / 0.3)',
            }}
          >
            {saveProfile.isPending ? (
              <><Loader2 size={14} className="animate-spin" /> SAVING...</>
            ) : (
              'GET STARTED'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
