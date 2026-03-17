import { useState, useCallback } from 'react';

const WAKE_PATTERNS = [
  /hey\s+friday/i,
  /hi\s+friday/i,
  /hello\s+friday/i,
  /ok\s+friday/i,
  /okay\s+friday/i,
  /friday\s+wake\s+up/i,
  /wake\s+up\s+friday/i,
];

export function useWakeWord() {
  const [isActive, setIsActive] = useState(false);

  const checkWakeWord = useCallback((text: string): boolean => {
    return WAKE_PATTERNS.some(pattern => pattern.test(text));
  }, []);

  const activate = useCallback(() => {
    setIsActive(true);
  }, []);

  const deactivate = useCallback(() => {
    setIsActive(false);
  }, []);

  return { isActive, activate, deactivate, checkWakeWord };
}
