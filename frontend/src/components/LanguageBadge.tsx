import React from 'react';
import { Language } from '../i18n/translations';

interface LanguageBadgeProps {
  language: Language;
}

const langConfig: Record<Language, { code: string; flag: string }> = {
  en: { code: 'EN', flag: '🇺🇸' },
  te: { code: 'TE', flag: '🇮🇳' },
  hi: { code: 'HI', flag: '🇮🇳' },
};

export default function LanguageBadge({ language }: LanguageBadgeProps) {
  const config = langConfig[language];
  return (
    <div
      className="flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono-tech"
      style={{
        border: '1px solid oklch(0.72 0.18 65 / 0.25)',
        color: 'oklch(0.72 0.18 65)',
        background: 'oklch(0.72 0.18 65 / 0.08)',
      }}
    >
      <span>{config.flag}</span>
      <span>{config.code}</span>
    </div>
  );
}
