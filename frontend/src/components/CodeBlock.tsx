import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language: string;
}

function highlightCode(code: string, _lang: string): string {
  return code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/(#[^\n]*)/g, '<span class="comment">$1</span>')
    .replace(/\/\/[^\n]*/g, '<span class="comment">$&</span>')
    .replace(/\b(def|class|import|from|return|if|else|elif|for|while|in|not|and|or|True|False|None|async|await|function|const|let|var|export|default|interface|type|extends|implements|new|this|super|try|catch|finally|throw|async|await|yield|lambda|pass|break|continue|with|as|is|del|global|nonlocal|raise|assert|print)\b/g, '<span class="keyword">$1</span>')
    .replace(/(["'`])((?:\\.|(?!\1)[^\\])*)\1/g, '<span class="string">$1$2$1</span>')
    .replace(/\b(\d+\.?\d*)\b/g, '<span class="number">$1</span>');
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="mt-2 rounded-lg overflow-hidden" style={{ border: '1px solid oklch(0.72 0.18 65 / 0.2)' }}>
      <div
        className="flex items-center justify-between px-3 py-1.5"
        style={{ background: 'oklch(0.10 0.007 260)', borderBottom: '1px solid oklch(0.72 0.18 65 / 0.15)' }}
      >
        <span className="text-xs font-mono-tech text-friday-gold-dim uppercase tracking-widest">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-friday-gold transition-colors"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <pre
        className="code-block m-0 rounded-none"
        dangerouslySetInnerHTML={{ __html: highlightCode(code, language) }}
      />
    </div>
  );
}
