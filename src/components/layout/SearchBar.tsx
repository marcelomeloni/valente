'use client';

import { useState, useRef, useEffect, useCallback, KeyboardEvent } from 'react';
import { filterResults, SearchBarResults, SearchResult } from './SearchBarResults';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const [focusedIdx, setFocusedIdx] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter on query change
  useEffect(() => {
    const filtered = filterResults(query);
    setResults(filtered);
    setFocusedIdx(-1);
    setOpen(query.trim().length > 0);
  }, [query]);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setFocusedIdx(-1);
  }, []);

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (!open) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIdx((i) => Math.max(i - 1, -1));
    } else if (e.key === 'Escape') {
      close();
    } else if (e.key === 'Enter' && focusedIdx >= 0) {
      e.preventDefault();
      window.location.href = results[focusedIdx].href;
      close();
    }
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-xs sm:max-w-sm">
      {/* Input */}
      <div className="relative">
        {/* Search icon */}
        <svg
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 6.75 6.75a7.5 7.5 0 0 0 10.6 10.6z" />
        </svg>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => { if (query.trim()) setOpen(true); }}
          onKeyDown={handleKeyDown}
          placeholder="Buscar obras, temas..."
          className="
            h-9 w-full rounded-lg border border-zinc-200 bg-zinc-50
            pl-9 pr-8 font-sans text-sm text-zinc-900 placeholder-zinc-400
            outline-none transition-all duration-150
            focus:border-unicamp focus:bg-white focus:ring-2 focus:ring-unicamp/10
          "
        />

        {/* Clear button */}
        {query && (
          <button
            onClick={() => { setQuery(''); setOpen(false); inputRef.current?.focus(); }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
            aria-label="Limpar busca"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Results dropdown */}
      {open && (
        <SearchBarResults results={results} query={query} onClose={close} />
      )}
    </div>
  );
}