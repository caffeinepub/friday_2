import React, { useState, useEffect, useCallback } from 'react';
import { Settings } from 'lucide-react';
import AnimatedOrb from './AnimatedOrb';
import LanguageBadge from './LanguageBadge';
import SettingsSidebar from './SettingsSidebar';
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';
import { useLanguage } from '../hooks/useLanguage';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { useWakeWord } from '../hooks/useWakeWord';
import { useChat } from '../hooks/useChat';
import { useGetConversationHistory, useGetPreferences, useSavePreferences } from '../hooks/useQueries';
import { Translations } from '../i18n/translations';

interface LayoutProps {
  userName: string;
}

export default function Layout({ userName }: LayoutProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [voiceSpeed, setVoiceSpeed] = useState(1.0);
  const [voicePitch, setVoicePitch] = useState(1.0);

  const { language, setLanguage, t } = useLanguage();
  const { isActive, activate } = useWakeWord();
  const { speak, isSpeaking } = useSpeechSynthesis(language, voiceSpeed, voicePitch);

  const handleNewFridayMessage = useCallback((text: string) => {
    if (voiceEnabled) {
      speak(text);
    }
  }, [voiceEnabled, speak]);

  const { messages, isThinking, sendMessage, addHistoryMessages, clearMessages } = useChat(handleNewFridayMessage);

  // Load conversation history
  const { data: historyData, isLoading: isLoadingHistory } = useGetConversationHistory(0, 50);
  const { data: prefsData } = useGetPreferences();
  const savePrefs = useSavePreferences();

  // Load history into chat on mount
  useEffect(() => {
    if (historyData && historyData.length > 0 && messages.length === 0) {
      addHistoryMessages(historyData);
    }
  }, [historyData, addHistoryMessages, messages.length]);

  // Load preferences
  useEffect(() => {
    if (prefsData) {
      if (prefsData.language === 'en' || prefsData.language === 'te' || prefsData.language === 'hi') {
        setLanguage(prefsData.language);
      }
      try {
        const vs = JSON.parse(prefsData.voiceSettings);
        if (vs.enabled !== undefined) setVoiceEnabled(vs.enabled);
        if (vs.speed !== undefined) setVoiceSpeed(vs.speed);
        if (vs.pitch !== undefined) setVoicePitch(vs.pitch);
      } catch {
        // ignore parse errors
      }
    }
  }, [prefsData, setLanguage]);

  const handleLanguageChange = (lang: typeof language) => {
    setLanguage(lang);
    savePrefs.mutate({
      language: lang,
      voiceSettings: JSON.stringify({ enabled: voiceEnabled, speed: voiceSpeed, pitch: voicePitch }),
      name: userName,
    });
  };

  const handleVoiceToggle = (enabled: boolean) => {
    setVoiceEnabled(enabled);
    savePrefs.mutate({
      language,
      voiceSettings: JSON.stringify({ enabled, speed: voiceSpeed, pitch: voicePitch }),
      name: userName,
    });
  };

  const handleSpeedChange = (speed: number) => {
    setVoiceSpeed(speed);
    savePrefs.mutate({
      language,
      voiceSettings: JSON.stringify({ enabled: voiceEnabled, speed, pitch: voicePitch }),
      name: userName,
    });
  };

  const handlePitchChange = (pitch: number) => {
    setVoicePitch(pitch);
    savePrefs.mutate({
      language,
      voiceSettings: JSON.stringify({ enabled: voiceEnabled, speed: voiceSpeed, pitch }),
      name: userName,
    });
  };

  const handleClearHistory = () => {
    clearMessages();
  };

  const handleActivate = () => {
    activate();
  };

  return (
    <div
      className="h-screen flex flex-col overflow-hidden"
      style={{ background: 'oklch(0.08 0.005 260)' }}
    >
      {/* Header */}
      <header
        className="flex items-center justify-between px-4 py-2.5 flex-shrink-0 animate-hud-flicker"
        style={{
          background: 'oklch(0.10 0.007 260)',
          borderBottom: '1px solid oklch(0.72 0.18 65 / 0.2)',
          boxShadow: '0 2px 20px oklch(0.72 0.18 65 / 0.08)',
        }}
      >
        {/* Left: Logo + Title */}
        <div className="flex items-center gap-3">
          <AnimatedOrb isActive={isActive} isSpeaking={isSpeaking} size="sm" />
          <div>
            <h1 className="font-orbitron text-friday-gold text-sm tracking-widest text-glow-sm leading-none">
              FRIDAY
            </h1>
            <p className="text-xs font-mono-tech mt-0.5" style={{ color: 'oklch(0.45 0.02 80)' }}>
              {isActive ? (isSpeaking ? 'SPEAKING' : 'ACTIVE') : 'STANDBY'}
            </p>
          </div>
        </div>

        {/* Center: Status indicators */}
        <div className="hidden sm:flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: isActive ? 'oklch(0.65 0.18 150)' : 'oklch(0.45 0.02 80)',
                boxShadow: isActive ? '0 0 6px oklch(0.65 0.18 150)' : 'none',
              }}
            />
            <span className="text-xs font-mono-tech" style={{ color: 'oklch(0.45 0.02 80)' }}>
              {isActive ? 'ONLINE' : 'IDLE'}
            </span>
          </div>
          {userName && (
            <span className="text-xs font-rajdhani" style={{ color: 'oklch(0.55 0.02 80)' }}>
              Hello, <span className="text-friday-gold">{userName}</span>
            </span>
          )}
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-2">
          <LanguageBadge language={language} />
          <button
            onClick={() => setSettingsOpen(true)}
            className="w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-150"
            style={{ color: 'oklch(0.55 0.02 80)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'oklch(0.72 0.18 65)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'oklch(0.55 0.02 80)'; }}
            title={t('settings')}
          >
            <Settings size={16} />
          </button>
        </div>
      </header>

      {/* Chat area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <ChatWindow
          messages={messages}
          isThinking={isThinking}
          isSpeaking={isSpeaking}
          isLoadingHistory={isLoadingHistory}
          userName={userName}
        />

        {/* Input area */}
        <div
          className="px-4 pb-4 pt-2 flex-shrink-0"
          style={{ borderTop: '1px solid oklch(0.72 0.18 65 / 0.1)' }}
        >
          <ChatInput
            onSend={sendMessage}
            isThinking={isThinking}
            language={language}
            placeholder={t('inputPlaceholder')}
            voiceEnabled={voiceEnabled}
            onToggleVoice={() => handleVoiceToggle(!voiceEnabled)}
            onActivate={handleActivate}
          />
          <p className="text-center text-xs font-mono-tech mt-2" style={{ color: 'oklch(0.30 0.02 80)' }}>
            Type <span style={{ color: 'oklch(0.55 0.14 65)' }}>/</span> for commands · Say{' '}
            <span style={{ color: 'oklch(0.55 0.14 65)' }}>"Hey Friday"</span> to activate
          </p>
        </div>
      </main>

      {/* Settings Sidebar */}
      <SettingsSidebar
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        language={language}
        onLanguageChange={handleLanguageChange}
        voiceEnabled={voiceEnabled}
        onToggleVoice={handleVoiceToggle}
        voiceSpeed={voiceSpeed}
        onSpeedChange={handleSpeedChange}
        voicePitch={voicePitch}
        onPitchChange={handlePitchChange}
        userName={userName}
        onClearHistory={handleClearHistory}
        t={t as (key: keyof Translations) => string}
      />

      {/* Footer */}
      <footer
        className="px-4 py-1.5 flex-shrink-0 flex items-center justify-center"
        style={{ borderTop: '1px solid oklch(0.72 0.18 65 / 0.08)' }}
      >
        <p className="text-xs font-mono-tech" style={{ color: 'oklch(0.28 0.02 80)' }}>
          Built with{' '}
          <span style={{ color: 'oklch(0.72 0.18 65)' }}>♥</span>
          {' '}using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname || 'friday-ai')}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'oklch(0.72 0.18 65)' }}
            className="hover:underline"
          >
            caffeine.ai
          </a>
          {' '}· © {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
