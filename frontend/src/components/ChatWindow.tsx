import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import ThinkingAnimation from './ThinkingAnimation';
import AudioVisualizer from './AudioVisualizer';
import { ChatMessage as ChatMessageType } from '../hooks/useChat';
import { Skeleton } from '@/components/ui/skeleton';

interface ChatWindowProps {
  messages: ChatMessageType[];
  isThinking: boolean;
  isSpeaking: boolean;
  isLoadingHistory: boolean;
  userName?: string;
}

export default function ChatWindow({ messages, isThinking, isSpeaking, isLoadingHistory, userName }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
      {isLoadingHistory && (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className={`flex ${i % 2 === 0 ? 'justify-end' : 'items-start gap-3'}`}>
              {i % 2 !== 0 && <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />}
              <Skeleton className={`h-12 rounded-2xl ${i % 2 === 0 ? 'w-48' : 'w-64'}`} />
            </div>
          ))}
        </div>
      )}

      {!isLoadingHistory && messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full min-h-[200px] gap-4 text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{
              background: 'radial-gradient(circle, oklch(0.30 0.08 65), oklch(0.14 0.01 260))',
              border: '1px solid oklch(0.72 0.18 65 / 0.2)',
            }}
          >
            <span className="text-2xl font-orbitron text-friday-gold">F</span>
          </div>
          <div>
            <p className="text-friday-gold font-orbitron text-sm tracking-widest">FRIDAY ONLINE</p>
            <p className="text-muted-foreground text-sm mt-1 font-rajdhani">
              Type a message or say "Hey Friday" to begin
            </p>
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
            {['Search the web', 'Write code', 'Send email', 'Tell a joke'].map(hint => (
              <span
                key={hint}
                className="text-xs px-2 py-1 rounded-full font-mono-tech"
                style={{ border: '1px solid oklch(0.72 0.18 65 / 0.2)', color: 'oklch(0.55 0.14 65)' }}
              >
                {hint}
              </span>
            ))}
          </div>
        </div>
      )}

      {messages.map(msg => (
        <ChatMessage key={msg.id} message={msg} userName={userName} />
      ))}

      {isThinking && <ThinkingAnimation />}

      {isSpeaking && (
        <div className="flex items-center gap-2 px-4">
          <span className="text-xs text-friday-gold-dim font-mono-tech">FRIDAY SPEAKING</span>
          <AudioVisualizer isActive={isSpeaking} barCount={8} />
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
