import { useState, useCallback, useRef } from 'react';

interface SpeechSynthesisHook {
  speak: (text: string) => void;
  stop: () => void;
  isSpeaking: boolean;
  isSupported: boolean;
}

export function useSpeechSynthesis(language: string = 'en', speed: number = 1, pitch: number = 1): SpeechSynthesisHook {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const langMap: Record<string, string> = {
    en: 'en-US',
    te: 'te-IN',
    hi: 'hi-IN',
  };

  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  const speak = useCallback((text: string) => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langMap[language] || 'en-US';
    utterance.rate = speed;
    utterance.pitch = pitch;

    const voices = window.speechSynthesis.getVoices();
    const targetLang = langMap[language] || 'en-US';
    const matchingVoice = voices.find(v => v.lang.startsWith(targetLang.split('-')[0]));
    if (matchingVoice) utterance.voice = matchingVoice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [isSupported, language, speed, pitch, langMap]);

  const stop = useCallback(() => {
    if (isSupported) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [isSupported]);

  return { speak, stop, isSpeaking, isSupported };
}
