import { useState, useCallback } from 'react';
import { Language, translations, Translations } from '../i18n/translations';

const LANGUAGE_KEY = 'friday_language';

function loadLanguage(): Language {
  try {
    const stored = localStorage.getItem(LANGUAGE_KEY);
    if (stored === 'en' || stored === 'te' || stored === 'hi') return stored;
  } catch {}
  return 'en';
}

export function useLanguage() {
  const [language, setLanguageState] = useState<Language>(loadLanguage);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANGUAGE_KEY, lang);
    } catch {}
  }, []);

  const t = useCallback((key: keyof Translations): string => {
    return translations[language][key] || translations['en'][key] || key;
  }, [language]);

  return { language, setLanguage, t };
}
