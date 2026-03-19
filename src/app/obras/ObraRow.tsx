import Link from 'next/link';
import { Obra, ObraCategoria } from './types';

const CATEGORIA_LABEL: Record<ObraCategoria, string> = {
  livro: 'Livro',
  artigo: 'Artigo',
  capitulo: 'Capítulo',
  tese: 'Tese',
  revista: 'Revista',
  relatorio: 'Relatório',
};

const CATEGORIA_COLOR: Record<ObraCategoria, string> = {
  livro: 'text-blue-600 bg-blue-50 border-blue-100',
  artigo: 'text-emerald-600 bg-emerald-50 border-emerald-100',
  capitulo: 'text-violet-600 bg-violet-50 border-violet-100',
  tese: 'text-amber-600 bg-amber-50 border-amber-100',
  revista: 'text-pink-600 bg-pink-50 border-pink-100',
  relatorio: 'text-zinc-600 bg-zinc-100 border-zinc-200',
};

interface ObraRowProps {
  obra: Obra;
}

export function ObraRow({ obra }: ObraRowProps) {
  return (
    <Link
      href={`/${obra.slug}`}
      className="group mb-2 flex items-start gap-5 rounded-xl border border-zinc-100 bg-white px-5 py-5 shadow-sm transition-all duration-150 hover:border-zinc-200 hover:shadow-md sm:gap-6 sm:px-6"
    >
      {/* Left: year */}
      <div className="hidden w-12 flex-shrink-0 pt-1 sm:block">
        <span className="font-sans text-sm tabular-nums text-zinc-400">
          {obra.ano}
        </span>
      </div>

      {/* Center: main content */}
      <div className="min-w-0 flex-1">

        {/* Badge + year mobile */}
        <div className="mb-2.5 flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center rounded-md border px-2 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-wider ${CATEGORIA_COLOR[obra.categoria]}`}
          >
            {CATEGORIA_LABEL[obra.categoria]}
          </span>
          <span className="font-sans text-xs tabular-nums text-zinc-400 sm:hidden">
            {obra.ano}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-base font-semibold leading-snug text-zinc-900 transition-colors duration-150 group-hover:text-unicamp sm:text-[1.0625rem]">
          {obra.titulo}
        </h3>

        {/* Authors */}
        <p className="mt-1.5 font-sans text-sm text-zinc-500">
          {obra.autores.join(', ')}
        </p>

        {/* Publication */}
        {obra.publicacao && (
          <p className="mt-0.5 font-sans text-xs italic text-zinc-400">
            {obra.publicacao}
          </p>
        )}

        {/* Resumo */}
        {obra.resumo && (
          <p className="mt-2.5 line-clamp-2 font-sans text-sm leading-relaxed text-zinc-500">
            {obra.resumo}
          </p>
        )}

        {/* Temas */}
        {obra.temas.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {obra.temas.map((tema) => (
              <span
                key={tema}
                className="rounded-full bg-zinc-100 px-2.5 py-0.5 font-sans text-[11px] font-medium text-zinc-500"
              >
                {tema}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Right: arrow */}
      <div className="flex-shrink-0 pt-1">
        <svg
          className="h-4 w-4 text-zinc-300 transition-all duration-150 group-hover:translate-x-0.5 group-hover:text-unicamp"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}