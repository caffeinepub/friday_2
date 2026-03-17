import React from 'react';
import { X, Trash2, LogOut, Info, User, Mic, Globe } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import LanguageSelector from './LanguageSelector';
import VoiceControls from './VoiceControls';
import UserNameInput from './UserNameInput';
import AboutSection from './AboutSection';
import PrincipalDisplay from './PrincipalDisplay';
import { Language, Translations } from '../i18n/translations';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { useClearHistory } from '../hooks/useQueries';

interface SettingsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  voiceEnabled: boolean;
  onToggleVoice: (enabled: boolean) => void;
  voiceSpeed: number;
  onSpeedChange: (speed: number) => void;
  voicePitch: number;
  onPitchChange: (pitch: number) => void;
  userName: string;
  onClearHistory: () => void;
  t: (key: keyof Translations) => string;
}

export default function SettingsSidebar({
  isOpen,
  onClose,
  language,
  onLanguageChange,
  voiceEnabled,
  onToggleVoice,
  voiceSpeed,
  onSpeedChange,
  voicePitch,
  onPitchChange,
  userName,
  onClearHistory,
  t,
}: SettingsSidebarProps) {
  const { identity, clear } = useInternetIdentity();
  const queryClient = useQueryClient();
  const clearHistoryMutation = useClearHistory();

  const principal = identity?.getPrincipal().toString() || '';

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  const handleClearHistory = async () => {
    if (window.confirm(t('clearHistoryConfirm'))) {
      await clearHistoryMutation.mutateAsync();
      onClearHistory();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sidebar panel */}
      <div
        className="fixed right-0 top-0 bottom-0 z-50 w-80 flex flex-col animate-slide-in-right"
        style={{
          background: 'oklch(0.10 0.007 260)',
          borderLeft: '1px solid oklch(0.72 0.18 65 / 0.2)',
          boxShadow: '-8px 0 32px oklch(0.72 0.18 65 / 0.1)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3 flex-shrink-0"
          style={{ borderBottom: '1px solid oklch(0.72 0.18 65 / 0.15)' }}
        >
          <span className="font-orbitron text-sm text-friday-gold tracking-widest">SETTINGS</span>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-muted-foreground hover:text-friday-gold transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-6">

            {/* User Profile */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <User size={14} className="text-friday-gold-dim" />
                <span className="text-xs font-mono-tech text-friday-gold-dim tracking-widest uppercase">Profile</span>
              </div>
              <div className="space-y-3">
                <UserNameInput
                  currentName={userName}
                  label={t('displayName')}
                  placeholder={t('displayNamePlaceholder')}
                  savingLabel={t('saving')}
                  savedLabel={t('saved')}
                  principalId={principal}
                />
                {principal && (
                  <PrincipalDisplay principal={principal} label={t('yourPrincipal')} />
                )}
              </div>
            </section>

            <Separator style={{ background: 'oklch(0.72 0.18 65 / 0.1)' }} />

            {/* Language */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <Globe size={14} className="text-friday-gold-dim" />
                <span className="text-xs font-mono-tech text-friday-gold-dim tracking-widest uppercase">{t('language')}</span>
              </div>
              <LanguageSelector language={language} onLanguageChange={onLanguageChange} />
            </section>

            <Separator style={{ background: 'oklch(0.72 0.18 65 / 0.1)' }} />

            {/* Voice Controls */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <Mic size={14} className="text-friday-gold-dim" />
                <span className="text-xs font-mono-tech text-friday-gold-dim tracking-widest uppercase">Voice</span>
              </div>
              <VoiceControls
                voiceEnabled={voiceEnabled}
                onToggleVoice={onToggleVoice}
                speed={voiceSpeed}
                onSpeedChange={onSpeedChange}
                pitch={voicePitch}
                onPitchChange={onPitchChange}
                voiceLabel={t('voiceOutput')}
                speedLabel={t('voiceSpeed')}
                pitchLabel={t('voicePitch')}
              />
            </section>

            <Separator style={{ background: 'oklch(0.72 0.18 65 / 0.1)' }} />

            {/* History */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <Trash2 size={14} className="text-friday-gold-dim" />
                <span className="text-xs font-mono-tech text-friday-gold-dim tracking-widest uppercase">History</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearHistory}
                disabled={clearHistoryMutation.isPending}
                className="w-full text-xs font-rajdhani"
                style={{
                  background: 'transparent',
                  border: '1px solid oklch(0.577 0.245 27.325 / 0.4)',
                  color: 'oklch(0.75 0.15 27)',
                }}
              >
                <Trash2 size={12} className="mr-2" />
                {clearHistoryMutation.isPending ? 'Clearing...' : t('clearHistory')}
              </Button>
            </section>

            <Separator style={{ background: 'oklch(0.72 0.18 65 / 0.1)' }} />

            {/* About */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <Info size={14} className="text-friday-gold-dim" />
                <span className="text-xs font-mono-tech text-friday-gold-dim tracking-widest uppercase">{t('about')}</span>
              </div>
              <AboutSection
                versionLabel={t('version')}
                capabilitiesLabel={t('capabilities')}
                supportedLanguages={t('supportedLanguages')}
              />
            </section>

          </div>
        </ScrollArea>

        {/* Footer - Logout */}
        <div
          className="p-4 flex-shrink-0"
          style={{ borderTop: '1px solid oklch(0.72 0.18 65 / 0.15)' }}
        >
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="w-full text-xs font-rajdhani"
            style={{
              background: 'transparent',
              border: '1px solid oklch(0.72 0.18 65 / 0.2)',
              color: 'oklch(0.72 0.18 65)',
            }}
          >
            <LogOut size={12} className="mr-2" />
            {t('logout')}
          </Button>
        </div>
      </div>
    </>
  );
}
