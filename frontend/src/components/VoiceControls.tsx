import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

interface VoiceControlsProps {
  voiceEnabled: boolean;
  onToggleVoice: (enabled: boolean) => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  pitch: number;
  onPitchChange: (pitch: number) => void;
  voiceLabel: string;
  speedLabel: string;
  pitchLabel: string;
}

export default function VoiceControls({
  voiceEnabled, onToggleVoice, speed, onSpeedChange, pitch, onPitchChange,
  voiceLabel, speedLabel, pitchLabel,
}: VoiceControlsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-rajdhani text-foreground/80">{voiceLabel}</Label>
        <Switch
          checked={voiceEnabled}
          onCheckedChange={onToggleVoice}
          className="data-[state=checked]:bg-friday-gold"
        />
      </div>

      {voiceEnabled && (
        <>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-mono-tech text-muted-foreground">{speedLabel}</Label>
              <span className="text-xs font-mono-tech text-friday-gold">{speed.toFixed(1)}x</span>
            </div>
            <Slider
              value={[speed]}
              onValueChange={([v]) => onSpeedChange(v)}
              min={0.5}
              max={2.0}
              step={0.1}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-mono-tech text-muted-foreground">{pitchLabel}</Label>
              <span className="text-xs font-mono-tech text-friday-gold">{pitch.toFixed(1)}</span>
            </div>
            <Slider
              value={[pitch]}
              onValueChange={([v]) => onPitchChange(v)}
              min={0.5}
              max={2.0}
              step={0.1}
              className="w-full"
            />
          </div>
        </>
      )}
    </div>
  );
}
