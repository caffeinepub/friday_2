import React from 'react';
import IntentBadge from './IntentBadge';
import CodeBlock from './CodeBlock';
import EmailDraftCard from './EmailDraftCard';
import SearchResultCard from './SearchResultCard';
import { ChatMessage as ChatMessageType } from '../hooks/useChat';

interface ChatMessageProps {
  message: ChatMessageType;
  userName?: string;
}

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function ChatMessage({ message, userName }: ChatMessageProps) {
  const isUser = message.sender === 'user';

  if (isUser) {
    return (
      <div className="flex justify-end animate-fade-in-up">
        <div className="max-w-[75%] flex flex-col items-end gap-1">
          <div
            className="px-4 py-2.5 rounded-2xl rounded-tr-sm text-sm leading-relaxed"
            style={{
              background: 'linear-gradient(135deg, oklch(0.55 0.14 65), oklch(0.45 0.12 65))',
              color: 'oklch(0.08 0.005 260)',
              boxShadow: '0 2px 12px oklch(0.72 0.18 65 / 0.25)',
            }}
          >
            {message.content}
          </div>
          <span className="text-xs text-muted-foreground/50 font-mono-tech px-1">
            {userName || 'You'} · {formatTime(message.timestamp)}
          </span>
        </div>
      </div>
    );
  }

  const response = message.response;

  return (
    <div className="flex items-start gap-3 animate-fade-in-up">
      {/* FRIDAY Avatar */}
      <div
        className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden"
        style={{
          background: 'radial-gradient(circle, oklch(0.55 0.14 65), oklch(0.30 0.08 65))',
          boxShadow: '0 0 10px oklch(0.72 0.18 65 / 0.3)',
          border: '1px solid oklch(0.72 0.18 65 / 0.4)',
        }}
      >
        <img
          src="/assets/generated/friday-avatar.dim_128x128.png"
          alt="FRIDAY"
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
            const parent = (e.target as HTMLImageElement).parentElement;
            if (parent) {
              parent.innerHTML = '<span class="text-xs font-orbitron font-bold" style="color: oklch(0.72 0.18 65)">F</span>';
            }
          }}
        />
      </div>

      <div className="max-w-[80%] flex flex-col gap-1">
        {/* Header */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-orbitron text-friday-gold tracking-wider">FRIDAY</span>
          {message.intent && message.intent !== 'GENERAL_CONVERSATION' && (
            <IntentBadge intent={message.intent} />
          )}
        </div>

        {/* Message bubble */}
        <div
          className="px-4 py-3 rounded-2xl rounded-tl-sm text-sm leading-relaxed"
          style={{
            background: 'oklch(0.14 0.01 260)',
            border: '1px solid oklch(0.72 0.18 65 / 0.15)',
            color: 'oklch(0.88 0.02 80)',
          }}
        >
          {/* Main text */}
          <p className="whitespace-pre-wrap">{message.content}</p>

          {/* Specialized response components */}
          {response?.type === 'code' && response.data && (
            <CodeBlock
              code={response.data.code as string}
              language={response.data.language as string}
            />
          )}
          {response?.type === 'email' && response.data && (
            <EmailDraftCard
              to={response.data.to as string}
              subject={response.data.subject as string}
              body={response.data.body as string}
            />
          )}
          {response?.type === 'search' && response.data && (
            <SearchResultCard
              query={response.data.query as string}
              results={response.data.results as Array<{ title: string; snippet: string; source: string }>}
            />
          )}
        </div>

        <span className="text-xs text-muted-foreground/50 font-mono-tech px-1">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
}
