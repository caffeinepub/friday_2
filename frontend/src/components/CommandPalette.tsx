import React, { useEffect, useRef } from 'react';
import {
  Search, Mail, Code, Monitor, Globe, Bell, Smile, Cloud,
  AppWindow, Presentation, X
} from 'lucide-react';
import { commandTemplates } from '../utils/commandTemplates';

const iconMap: Record<string, React.ReactNode> = {
  Search: <Search size={18} />,
  Mail: <Mail size={18} />,
  Code: <Code size={18} />,
  Monitor: <Monitor size={18} />,
  Globe: <Globe size={18} />,
  Bell: <Bell size={18} />,
  Smile: <Smile size={18} />,
  Cloud: <Cloud size={18} />,
  AppWindow: <AppWindow size={18} />,
  Presentation: <Presentation size={18} />,
};

interface CommandPaletteProps {
  onSelect: (template: string) => void;
  onClose: () => void;
}

export default function CommandPalette({ onSelect, onClose }: CommandPaletteProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('mousedown', handleClick);
    };
  }, [onClose]);

  return (
    <div className="absolute bottom-full left-0 right-0 mb-2 z-50 animate-fade-in-up">
      <div
        ref={ref}
        className="rounded-xl overflow-hidden"
        style={{
          background: 'oklch(0.11 0.008 260)',
          border: '1px solid oklch(0.72 0.18 65 / 0.3)',
          boxShadow: '0 -8px 32px oklch(0.72 0.18 65 / 0.15), 0 0 0 1px oklch(0.72 0.18 65 / 0.05)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-2.5"
          style={{ borderBottom: '1px solid oklch(0.72 0.18 65 / 0.15)' }}
        >
          <span className="text-xs font-orbitron text-friday-gold tracking-widest">COMMAND PALETTE</span>
          <button onClick={onClose} className="text-muted-foreground hover:text-friday-gold transition-colors">
            <X size={14} />
          </button>
        </div>

        {/* Commands grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 p-2">
          {commandTemplates.map(cmd => (
            <button
              key={cmd.id}
              onClick={() => { onSelect(cmd.template); onClose(); }}
              className="flex flex-col items-center gap-1.5 p-3 rounded-lg transition-all duration-150 group"
              style={{ background: 'transparent' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = 'oklch(0.72 0.18 65 / 0.1)';
                (e.currentTarget as HTMLButtonElement).style.border = '1px solid oklch(0.72 0.18 65 / 0.3)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                (e.currentTarget as HTMLButtonElement).style.border = '1px solid transparent';
              }}
            >
              <div className="text-friday-gold-dim group-hover:text-friday-gold transition-colors">
                {iconMap[cmd.icon] || <Search size={18} />}
              </div>
              <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors text-center leading-tight font-rajdhani">
                {cmd.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
