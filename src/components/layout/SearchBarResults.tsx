'use client';

import Link from 'next/link';
import { CATEGORIA_LABEL } from '@/app/obras/types';

export interface SearchResult {
  title: string;
  subtitle?: string;
  href: string;
}

function highlight(text: string, query: string): React.ReactNode {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-transparent font-semibold text-unicamp">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

interface SearchBarResultsProps {
  results: SearchResult[];
  query: string;
  onClose: () => void;
}

export function SearchBarResults({ results, query, onClose }: SearchBarResultsProps) {
  if (!query.trim()) return null;

  return (
    <div className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl">
      {results.length === 0 ? (
        <div className="px-4 py-6 text-center">
          <p className="font-sans text-sm text-zinc-400">
            Nenhum resultado para{' '}
            <span className="font-medium text-zinc-700">"{query}"</span>
          </p>
        </div>
      ) : (
        <ul>
          {results.map((result, i) => (
            <li key={i}>
              <Link
                href={result.href}
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-zinc-50"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate font-sans text-sm font-medium text-zinc-900">
                    {highlight(result.title, query)}
                  </p>
                  {result.subtitle && (
                    <p className="truncate font-sans text-xs text-zinc-400">
                      {result.subtitle}
                    </p>
                  )}
                </div>
                <svg
                  className="h-3.5 w-3.5 flex-shrink-0 text-zinc-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}