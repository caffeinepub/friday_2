import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Language } from '../i18n/translations';

interface LanguageSelectorProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const languages = [
  { code: 'en' as Language, label: 'English', flag: '🇺🇸', native: 'English' },
  { code: 'te' as Language, label: 'Telugu', flag: '🇮🇳', native: 'తెలుగు' },
  { code: 'hi' as Language, label: 'Hindi', flag: '🇮🇳', native: 'हिंदी' },
];

export default function LanguageSelector({ language, onLanguageChange }: LanguageSelectorProps) {
  return (
    <Select value={language} onValueChange={(v) => onLanguageChange(v as Language)}>
      <SelectTrigger
        className="w-full text-sm font-rajdhani"
        style={{
          background: 'oklch(0.14 0.01 260)',
          border: '1px solid oklch(0.72 0.18 65 / 0.2)',
          color: 'oklch(0.88 0.02 80)',
        }}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent
        style={{
          background: 'oklch(0.13 0.01 260)',
          border: '1px solid oklch(0.72 0.18 65 / 0.3)',
        }}
      >
        {languages.map(lang => (
          <SelectItem
            key={lang.code}
            value={lang.code}
            className="font-rajdhani cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
              <span className="text-muted-foreground text-xs">({lang.native})</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
