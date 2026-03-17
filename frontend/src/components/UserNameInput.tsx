import React, { useState, useEffect } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useSaveCallerUserProfile } from '../hooks/useQueries';

interface UserNameInputProps {
  currentName: string;
  label: string;
  placeholder: string;
  savingLabel: string;
  savedLabel: string;
  principalId?: string;
}

export default function UserNameInput({ currentName, label, placeholder, savingLabel, savedLabel, principalId }: UserNameInputProps) {
  const [name, setName] = useState(currentName);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const { identity } = useInternetIdentity();
  const saveProfile = useSaveCallerUserProfile();

  useEffect(() => {
    setName(currentName);
  }, [currentName]);

  const handleSave = async () => {
    if (!name.trim() || name === currentName) return;
    setSaveStatus('saving');
    try {
      await saveProfile.mutateAsync({
        name: name.trim(),
        principalId: principalId || identity?.getPrincipal().toString() || '',
      });
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch {
      setSaveStatus('idle');
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-rajdhani text-foreground/80">{label}</Label>
      <div className="relative">
        <Input
          value={name}
          onChange={e => setName(e.target.value)}
          onBlur={handleSave}
          onKeyDown={e => e.key === 'Enter' && handleSave()}
          placeholder={placeholder}
          className="pr-8 text-sm font-rajdhani"
          style={{
            background: 'oklch(0.14 0.01 260)',
            border: '1px solid oklch(0.72 0.18 65 / 0.2)',
            color: 'oklch(0.88 0.02 80)',
          }}
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          {saveStatus === 'saving' && <Loader2 size={14} className="animate-spin text-friday-gold" />}
          {saveStatus === 'saved' && <Check size={14} className="text-friday-gold" />}
        </div>
      </div>
    </div>
  );
}
