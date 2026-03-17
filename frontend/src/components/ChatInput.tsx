import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Send, Mic, MicOff, Command, Volume2, VolumeX } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useWakeWord } from '../hooks/useWakeWord';
import CommandPalette from './CommandPalette';
import { Language } from '../i18n/translations';

interface ChatInputProps {
  onSend: (text: string, isWakeWord?: boolean) => void;
  isThinking: boolean;
  language: Language;
  placeholder: string;
  voiceEnabled: boolean;
  onToggleVoice: () => void;
  onActivate: () => void;
}

export default function ChatInput({
  onSend,
  isThinking,
  language,
  placeholder,
  voiceEnabled,
  onToggleVoice,
  onActivate,
}: ChatInputProps) {
  const [input, setInput] = useState('');
  const [showPalette, setShowPalette] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { transcript, isListening, error: micError, startListening, stopListening, resetTranscript, isSupported } = useSpeechRecognition(language);
  const { checkWakeWord, activate } = useWakeWord();

  // Sync transcript to input
  useEffect(() => {
    if (transcript) {
      setInput(transcript);
      resetTranscript();
    }
  }, [transcript, resetTranscript]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleSend = () => {
    const text = input.trim();
    if (!text || isThinking) return;

    const isWake = checkWakeWord(text);
    if (isWake) {
      activate();
      onActivate();
      onSend(text, true);
    } else {
      onSend(text, false);
    }
    setInput('');
    setShowPalette(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInput(val);
    if (val === '/') {
      setShowPalette(true);
    } else if (!val.startsWith('/')) {
      setShowPalette(false);
    }
  };

  const handleMicToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleCommandSelect = (template: string) => {
    setInput(template);
    setShowPalette(false);
    textareaRef.current?.focus();
  };

  return (
    <div className="relative">
      {showPalette && (
        <CommandPalette
          onSelect={handleCommandSelect}
          onClose={() => setShowPalette(false)}
        />
      )}

      {micError && (
        <div
          className="mb-2 px-3 py-1.5 rounded-lg text-xs"
          style={{ background: 'oklch(0.577 0.245 27.325 / 0.15)', border: '1px solid oklch(0.577 0.245 27.325 / 0.3)', color: 'oklch(0.80 0.15 27)' }}
        >
          {micError}
        </div>
      )}

      <div
        className="flex items-end gap-2 p-2 rounded-xl"
        style={{
          background: 'oklch(0.13 0.01 260)',
          border: `1px solid ${isListening ? 'oklch(0.72 0.18 65 / 0.6)' : 'oklch(0.72 0.18 65 / 0.2)'}`,
          boxShadow: isListening ? '0 0 15px oklch(0.72 0.18 65 / 0.2)' : 'none',
          transition: 'border-color 0.2s, box-shadow 0.2s',
        }}
      >
        {/* Command palette button */}
        <button
          onClick={() => setShowPalette(p => !p)}
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-150"
          style={{
            color: showPalette ? 'oklch(0.72 0.18 65)' : 'oklch(0.55 0.02 80)',
            background: showPalette ? 'oklch(0.72 0.18 65 / 0.1)' : 'transparent',
          }}
          title="Command Palette (/)"
        >
          <Command size={16} />
        </button>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={isListening ? '🎤 Listening...' : placeholder}
          rows={1}
          className="flex-1 bg-transparent resize-none outline-none text-sm text-foreground placeholder:text-muted-foreground/50 font-rajdhani leading-relaxed"
          style={{ minHeight: '32px', maxHeight: '120px' }}
          disabled={isThinking}
        />

        {/* Voice toggle */}
        <button
          onClick={onToggleVoice}
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-150"
          style={{ color: voiceEnabled ? 'oklch(0.72 0.18 65)' : 'oklch(0.40 0.02 80)' }}
          title={voiceEnabled ? 'Disable voice output' : 'Enable voice output'}
        >
          {voiceEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>

        {/* Mic button */}
        {isSupported && (
          <button
            onClick={handleMicToggle}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-150"
            style={{
              color: isListening ? 'oklch(0.08 0.005 260)' : 'oklch(0.55 0.02 80)',
              background: isListening ? 'oklch(0.72 0.18 65)' : 'transparent',
              boxShadow: isListening ? '0 0 10px oklch(0.72 0.18 65 / 0.4)' : 'none',
            }}
            title={isListening ? 'Stop listening' : 'Start voice input'}
          >
            {isListening ? <MicOff size={16} /> : <Mic size={16} />}
          </button>
        )}

        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={!input.trim() || isThinking}
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-150 disabled:opacity-30"
          style={{
            background: input.trim() && !isThinking ? 'oklch(0.72 0.18 65)' : 'oklch(0.22 0.015 260)',
            color: input.trim() && !isThinking ? 'oklch(0.08 0.005 260)' : 'oklch(0.40 0.02 80)',
            boxShadow: input.trim() && !isThinking ? '0 0 10px oklch(0.72 0.18 65 / 0.3)' : 'none',
          }}
          title="Send message"
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  );
}
