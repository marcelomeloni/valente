'use client';

import Link from 'next/link';

export interface SearchResult {
  title: string;
  subtitle?: string;
  href: string;
}

const MOCK_RESULTS: SearchResult[] = [
  { title: 'A Espiral da Espiral de Aprendizagem', subtitle: 'Tese de Livre Docência · 2005', href: '/obras/espiral' },
  { title: 'Liberando a Mente', subtitle: 'Livro · 1991', href: '/obras/liberando-a-mente' },
  { title: 'Computadores e Conhecimento', subtitle: 'Livro · 1993', href: '/obras/computadores-conhecimento' },
  { title: 'Construcionismo', subtitle: 'Tema de pesquisa', href: '/#construcionismo' },
  { title: 'Espiral de Aprendizagem', subtitle: 'Conceito central', href: '/#espiral' },
  { title: 'Linguagem Logo', subtitle: 'Ferramenta pedagógica', href: '/#logo' },
  { title: 'Sistemas Sócio-Enativos', subtitle: 'Projeto Fapesp · 2017', href: '/#socio-enativos' },
  { title: 'Prêmios e Reconhecimentos', subtitle: 'Legado institucional', href: '/#premios' },
  { title: 'Formação Acadêmica', subtitle: 'MIT · UNICAMP', href: '/#formacao' },
];

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

export function filterResults(query: string): SearchResult[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return MOCK_RESULTS.filter(
    (r) =>
      r.title.toLowerCase().includes(q) ||
      r.subtitle?.toLowerCase().includes(q)
  ).slice(0, 6);
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
                {/* Text */}
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

                {/* Arrow */}
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