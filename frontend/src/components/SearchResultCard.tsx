import React from 'react';
import { Search, ExternalLink } from 'lucide-react';

interface SearchResult {
  title: string;
  snippet: string;
  source: string;
}

interface SearchResultCardProps {
  query: string;
  results: SearchResult[];
}

export default function SearchResultCard({ query, results }: SearchResultCardProps) {
  return (
    <div
      className="mt-2 rounded-lg overflow-hidden"
      style={{ border: '1px solid oklch(0.65 0.18 240 / 0.3)', background: 'oklch(0.10 0.007 260)' }}
    >
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ background: 'oklch(0.65 0.18 240 / 0.1)', borderBottom: '1px solid oklch(0.65 0.18 240 / 0.2)' }}
      >
        <Search size={14} style={{ color: 'oklch(0.65 0.18 240)' }} />
        <span className="text-xs font-mono-tech tracking-widest" style={{ color: 'oklch(0.65 0.18 240)' }}>
          WEB SEARCH: "{query}"
        </span>
      </div>
      <div className="divide-y" style={{ borderColor: 'oklch(0.65 0.18 240 / 0.1)' }}>
        {results.map((result, i) => (
          <div key={i} className="p-3 hover:bg-white/5 transition-colors">
            <div className="flex items-start justify-between gap-2">
              <h4 className="text-sm font-medium text-friday-gold leading-tight">{result.title}</h4>
              <ExternalLink size={12} className="text-muted-foreground flex-shrink-0 mt-0.5" />
            </div>
            <p className="text-xs text-foreground/70 mt-1 leading-relaxed">{result.snippet}</p>
            <span className="text-xs text-friday-gold-dim/60 mt-1 block font-mono-tech">{result.source}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
