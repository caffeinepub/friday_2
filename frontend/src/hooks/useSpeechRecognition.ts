import { useState, useRef, useCallback } from 'react';

interface SpeechRecognitionHook {
  transcript: string;
  isListening: boolean;
  error: string | null;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
  isSupported: boolean;
}

// Local type definitions for Web Speech API (not in all TS DOM libs)
interface ISpeechRecognitionResult {
  isFinal: boolean;
  [index: number]: { transcript: string };
}

interface ISpeechRecognitionResultList {
  length: number;
  resultIndex: number;
  results: ISpeechRecognitionResult[];
  [index: number]: ISpeechRecognitionResult;
}

interface ISpeechRecognitionEvent {
  resultIndex: number;
  results: ISpeechRecognitionResultList & { length: number; [index: number]: ISpeechRecognitionResult };
}

interface ISpeechRecognitionErrorEvent {
  error: string;
}

interface ISpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: (() => void) | null;
  onresult: ((event: ISpeechRecognitionEvent) => void) | null;
  onerror: ((event: ISpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

type SpeechRecognitionConstructor = new () => ISpeechRecognition;

interface SpeechRecognitionWindow {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
}

export function useSpeechRecognition(language: string = 'en-US'): SpeechRecognitionHook {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<ISpeechRecognition | null>(null);

  const langMap: Record<string, string> = {
    en: 'en-US',
    te: 'te-IN',
    hi: 'hi-IN',
  };

  const isSupported = typeof window !== 'undefined' &&
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

  const startListening = useCallback(() => {
    if (!isSupported) {
      setError('Speech recognition is not supported in this browser.');
      return;
    }

    setError(null);
    const win = window as Window & SpeechRecognitionWindow;
    const SpeechRecognitionAPI = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) return;

    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = langMap[language] || 'en-US';

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event: ISpeechRecognitionEvent) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      if (finalTranscript) setTranscript(finalTranscript);
    };

    recognition.onerror = (event: ISpeechRecognitionErrorEvent) => {
      if (event.error === 'not-allowed') {
        setError('Microphone access denied. Please allow microphone permissions.');
      } else if (event.error === 'no-speech') {
        setError('No speech detected. Please try again.');
      } else {
        setError(`Speech recognition error: ${event.error}`);
      }
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
  }, [isSupported, language, langMap]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsListening(false);
  }, []);

  const resetTranscript = useCallback(() => setTranscript(''), []);

  return { transcript, isListening, error, startListening, stopListening, resetTranscript, isSupported };
}
