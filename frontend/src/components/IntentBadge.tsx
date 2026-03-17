import React from 'react';
import { IntentCategory } from '../utils/intentParser';

interface IntentBadgeProps {
  intent: IntentCategory;
}

const intentConfig: Record<IntentCategory, { label: string; color: string }> = {
  SYSTEM_CONTROL: { label: 'SYSTEM', color: 'oklch(0.65 0.18 200)' },
  FILE_MANAGEMENT: { label: 'FILES', color: 'oklch(0.65 0.15 150)' },
  WEB_SEARCH: { label: 'WEB SEARCH', color: 'oklch(0.65 0.18 240)' },
  COMMUNICATION: { label: 'COMMS', color: 'oklch(0.65 0.18 280)' },
  CONTENT_CREATION: { label: 'CREATIVE', color: 'oklch(0.72 0.18 65)' },
  GENERAL_CONVERSATION: { label: 'CHAT', color: 'oklch(0.55 0.02 80)' },
  WEATHER: { label: 'WEATHER', color: 'oklch(0.65 0.15 220)' },
  REMINDER: { label: 'REMINDER', color: 'oklch(0.65 0.18 30)' },
  TRANSLATION: { label: 'TRANSLATE', color: 'oklch(0.65 0.15 170)' },
  JOKE: { label: 'HUMOR', color: 'oklch(0.72 0.18 65)' },
};

export default function IntentBadge({ intent }: IntentBadgeProps) {
  const config = intentConfig[intent] || intentConfig.GENERAL_CONVERSATION;

  return (
    <span
      className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-mono-tech font-medium tracking-wider"
      style={{
        color: config.color,
        border: `1px solid ${config.color}40`,
        background: `${config.color}15`,
        fontSize: '0.6rem',
      }}
    >
      {config.label}
    </span>
  );
}
