import React from 'react';
import { Mail, Copy } from 'lucide-react';

interface EmailDraftCardProps {
  to: string;
  subject: string;
  body: string;
}

export default function EmailDraftCard({ to, subject, body }: EmailDraftCardProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(`To: ${to}\nSubject: ${subject}\n\n${body}`);
  };

  return (
    <div
      className="mt-2 rounded-lg overflow-hidden"
      style={{ border: '1px solid oklch(0.65 0.18 280 / 0.3)', background: 'oklch(0.10 0.007 260)' }}
    >
      <div
        className="flex items-center justify-between px-3 py-2"
        style={{ background: 'oklch(0.65 0.18 280 / 0.1)', borderBottom: '1px solid oklch(0.65 0.18 280 / 0.2)' }}
      >
        <div className="flex items-center gap-2">
          <Mail size={14} style={{ color: 'oklch(0.65 0.18 280)' }} />
          <span className="text-xs font-mono-tech tracking-widest" style={{ color: 'oklch(0.65 0.18 280)' }}>EMAIL DRAFT</span>
        </div>
        <button onClick={handleCopy} className="text-muted-foreground hover:text-friday-gold transition-colors">
          <Copy size={12} />
        </button>
      </div>
      <div className="p-3 space-y-2">
        <div className="flex gap-2 text-sm">
          <span className="text-friday-gold-dim font-mono-tech text-xs w-14 flex-shrink-0 pt-0.5">TO:</span>
          <span className="text-foreground">{to}</span>
        </div>
        <div className="flex gap-2 text-sm">
          <span className="text-friday-gold-dim font-mono-tech text-xs w-14 flex-shrink-0 pt-0.5">SUBJECT:</span>
          <span className="text-foreground">{subject}</span>
        </div>
        <div
          className="mt-2 pt-2 text-sm text-foreground/80 whitespace-pre-wrap leading-relaxed"
          style={{ borderTop: '1px solid oklch(0.65 0.18 280 / 0.15)' }}
        >
          {body}
        </div>
      </div>
    </div>
  );
}
