'use client';

interface PaginacaoProps {
  paginaAtual: number;
  totalPaginas: number;
  onMudar: (p: number) => void;
}

export function Paginacao({ paginaAtual, totalPaginas, onMudar }: PaginacaoProps) {
  if (totalPaginas <= 1) return null;

  // Build page number array with ellipsis
  function getPages(): (number | '…')[] {
    if (totalPaginas <= 7) {
      return Array.from({ length: totalPaginas }, (_, i) => i + 1);
    }
    const pages: (number | '…')[] = [1];
    if (paginaAtual > 3) pages.push('…');
    for (let i = Math.max(2, paginaAtual - 1); i <= Math.min(totalPaginas - 1, paginaAtual + 1); i++) {
      pages.push(i);
    }
    if (paginaAtual < totalPaginas - 2) pages.push('…');
    pages.push(totalPaginas);
    return pages;
  }

  return (
    <div className="flex items-center justify-center gap-1 pt-10">
      {/* Prev */}
      <button
        onClick={() => onMudar(paginaAtual - 1)}
        disabled={paginaAtual === 1}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 font-sans text-sm text-zinc-500 transition-colors hover:border-zinc-300 hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-30"
        aria-label="Página anterior"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Pages */}
      {getPages().map((page, i) =>
        page === '…' ? (
          <span key={`ellipsis-${i}`} className="flex h-9 w-9 items-center justify-center font-sans text-sm text-zinc-400">
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onMudar(page as number)}
            className={`flex h-9 w-9 items-center justify-center rounded-lg font-sans text-sm transition-colors ${
              page === paginaAtual
                ? 'bg-unicamp font-semibold text-white'
                : 'border border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:text-zinc-900'
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => onMudar(paginaAtual + 1)}
        disabled={paginaAtual === totalPaginas}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 font-sans text-sm text-zinc-500 transition-colors hover:border-zinc-300 hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-30"
        aria-label="Próxima página"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}