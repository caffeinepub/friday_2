import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface PrincipalDisplayProps {
  principal: string;
  label: string;
}

function truncatePrincipal(p: string): string {
  if (p.length <= 20) return p;
  return `${p.slice(0, 8)}...${p.slice(-6)}`;
}

export default function PrincipalDisplay({ principal, label }: PrincipalDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(principal).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-1">
      <p className="text-xs font-mono-tech text-muted-foreground">{label}</p>
      <div
        className="flex items-center justify-between gap-2 px-2 py-1.5 rounded"
        style={{ background: 'oklch(0.14 0.01 260)', border: '1px solid oklch(0.72 0.18 65 / 0.1)' }}
      >
        <span className="text-xs font-mono-tech text-friday-gold-dim truncate">{truncatePrincipal(principal)}</span>
        <button onClick={handleCopy} className="text-muted-foreground hover:text-friday-gold transition-colors flex-shrink-0">
          {copied ? <Check size={12} /> : <Copy size={12} />}
        </button>
      </div>
    </div>
  );
}
