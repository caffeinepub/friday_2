import React from 'react';
import { Cpu, Globe, Mic, Zap, Shield, Brain } from 'lucide-react';

interface AboutSectionProps {
  versionLabel: string;
  capabilitiesLabel: string;
  supportedLanguages: string;
}

const capabilities = [
  { icon: <Mic size={14} />, label: 'Voice Interaction' },
  { icon: <Globe size={14} />, label: 'Multilingual Support' },
  { icon: <Zap size={14} />, label: 'Task Automation' },
  { icon: <Brain size={14} />, label: 'Memory System' },
  { icon: <Cpu size={14} />, label: 'System Control' },
  { icon: <Shield size={14} />, label: 'Secure & Private' },
];

export default function AboutSection({ versionLabel, capabilitiesLabel, supportedLanguages }: AboutSectionProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono-tech text-muted-foreground">{versionLabel}</span>
        <span className="text-xs font-mono-tech text-friday-gold">v1.0.0</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono-tech text-muted-foreground">Languages</span>
        <span className="text-xs font-rajdhani text-foreground/70">{supportedLanguages}</span>
      </div>
      <div>
        <p className="text-xs font-mono-tech text-muted-foreground mb-2">{capabilitiesLabel}</p>
        <div className="grid grid-cols-2 gap-1.5">
          {capabilities.map(cap => (
            <div
              key={cap.label}
              className="flex items-center gap-1.5 px-2 py-1.5 rounded"
              style={{ background: 'oklch(0.14 0.01 260)', border: '1px solid oklch(0.72 0.18 65 / 0.1)' }}
            >
              <span className="text-friday-gold-dim">{cap.icon}</span>
              <span className="text-xs font-rajdhani text-foreground/70">{cap.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
