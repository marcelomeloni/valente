'use client';

import { useState, useMemo } from 'react';
import { OBRAS_MOCK, ObraCategoria } from './types';
import { ObraFilters, FiltersState, FILTERS_INICIAL } from './ObraFilters';
import { ObraRow } from './ObraRow';
import { Paginacao } from './Paginacao';

const POR_PAGINA = 8;

type SortOption = 'recente' | 'antigo' | 'titulo';

export default function ObrasPage() {
  const [filters, setFilters] = useState<FiltersState>(FILTERS_INICIAL);
  const [busca, setBusca] = useState('');
  const [sort, setSort] = useState<SortOption>('recente');
  const [pagina, setPagina] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  function handleFiltersChange(f: FiltersState) {
    setFilters(f);
    setPagina(1);
  }

  function handleBusca(v: string) {
    setBusca(v);
    setPagina(1);
  }

  const filtradas = useMemo(() => {
    const result = OBRAS_MOCK.filter((obra) => {
      if (filters.categoria !== 'todas' && obra.categoria !== filters.categoria) return false;
      if (filters.temas.length > 0 && !filters.temas.every((t) => obra.temas.includes(t))) return false;
      if (filters.anoMin && obra.ano < parseInt(filters.anoMin)) return false;
      if (filters.anoMax && obra.ano > parseInt(filters.anoMax)) return false;
      if (busca.trim()) {
        const q = busca.toLowerCase();
        const match =
          obra.titulo.toLowerCase().includes(q) ||
          obra.autores.some((a) => a.toLowerCase().includes(q)) ||
          obra.temas.some((t) => t.toLowerCase().includes(q)) ||
          obra.publicacao?.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });

    return result.sort((a, b) => {
      if (sort === 'recente') return b.ano - a.ano;
      if (sort === 'antigo') return a.ano - b.ano;
      return a.titulo.localeCompare(b.titulo, 'pt-BR');
    });
  }, [filters, busca, sort]);

  const totalPaginas = Math.ceil(filtradas.length / POR_PAGINA);
  const paginadas = filtradas.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA);

  const activeFilterCount =
    (filters.categoria !== 'todas' ? 1 : 0) +
    filters.temas.length +
    (filters.anoMin ? 1 : 0) +
    (filters.anoMax ? 1 : 0);

  return (
    <div className="min-h-screen bg-white">

  

      {/* ── Body ─────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-10 py-8 lg:gap-14">

          {/* Sidebar — desktop */}
          <div className="hidden w-52 flex-shrink-0 lg:block xl:w-60">
            <div
              className="filters-scrollbar sticky overflow-y-auto pr-1"
              style={{ top: '3.5rem', maxHeight: 'calc(100vh - 3.5rem - 2rem)' }}
            >
              <ObraFilters
                filters={filters}
                onChange={handleFiltersChange}
                totalResultados={filtradas.length}
              />
              <div className="h-6" />
            </div>
          </div>

          {/* Main */}
          <div className="min-w-0 flex-1">

            {/* Toolbar */}
            <div className="mb-6 flex items-center gap-3">

              {/* Mobile filter button */}
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="relative flex flex-shrink-0 items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3.5 py-2.5 font-sans text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-300 hover:text-zinc-900 lg:hidden"
              >
                <svg className="h-4 w-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 8h10M11 12h4" />
                </svg>
                Filtros
                {activeFilterCount > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-unicamp font-sans text-[10px] font-bold text-white">
                    {activeFilterCount}
                  </span>
                )}
              </button>

        

              {/* Sort mobile */}
              <div className="relative sm:hidden">
                <select
                  value={sort}
                  onChange={(e) => { setSort(e.target.value as SortOption); setPagina(1); }}
                  className="appearance-none rounded-lg border border-zinc-200 bg-white py-2.5 pl-3 pr-8 font-sans text-sm text-zinc-700 outline-none"
                >
                  <option value="recente">Recente</option>
                  <option value="antigo">Antigo</option>
                  <option value="titulo">A–Z</option>
                </select>
                <svg className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Active filter chips */}
            {activeFilterCount > 0 && (
              <div className="mb-5 flex flex-wrap gap-2">
                {filters.categoria !== 'todas' && (
                  <Chip
                    label={filters.categoria}
                    onRemove={() => handleFiltersChange({ ...filters, categoria: 'todas' })}
                  />
                )}
                {filters.temas.map((t) => (
                  <Chip
                    key={t}
                    label={t}
                    onRemove={() =>
                      handleFiltersChange({ ...filters, temas: filters.temas.filter((x) => x !== t) })
                    }
                  />
                ))}
                {filters.anoMin && (
                  <Chip label={`De ${filters.anoMin}`} onRemove={() => handleFiltersChange({ ...filters, anoMin: '' })} />
                )}
                {filters.anoMax && (
                  <Chip label={`Até ${filters.anoMax}`} onRemove={() => handleFiltersChange({ ...filters, anoMax: '' })} />
                )}
              </div>
            )}

            {/* Results */}
            {paginadas.length === 0 ? (
              <div className="flex flex-col items-center gap-4 py-24 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100">
                  <svg className="h-8 w-8 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                </div>
                <div>
                  <p className="font-sans text-base font-semibold text-zinc-700">Nenhuma obra encontrada</p>
                  <p className="mt-1 font-sans text-sm text-zinc-400">Tente ajustar os filtros ou a busca</p>
                </div>
                <button
                  onClick={() => { setFilters(FILTERS_INICIAL); setBusca(''); }}
                  className="rounded-lg border border-zinc-200 px-4 py-2 font-sans text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-300"
                >
                  Limpar filtros
                </button>
              </div>
            ) : (
              <div>
                {paginadas.map((obra) => <ObraRow key={obra.slug} obra={obra} />)}
              </div>
            )}

            {/* Pagination */}
            <Paginacao
              paginaAtual={pagina}
              totalPaginas={totalPaginas}
              onMudar={(p) => {
                setPagina(p);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Mobile filter drawer ──────────────────────────────────────── */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="relative ml-auto flex h-full w-80 max-w-[90vw] flex-col overflow-y-auto bg-white shadow-2xl">
            {/* Drawer header */}
            <div className="flex flex-shrink-0 items-center justify-between border-b border-zinc-100 px-5 py-4">
              <span className="font-sans text-sm font-semibold text-zinc-900">Filtros</span>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              <ObraFilters
                filters={filters}
                onChange={handleFiltersChange}
                totalResultados={filtradas.length}
              />
            </div>

            {/* Drawer CTA */}
            <div className="flex-shrink-0 border-t border-zinc-100 px-5 py-4">
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full rounded-xl bg-unicamp py-3 font-sans text-sm font-semibold text-white transition-all hover:brightness-110"
              >
                Ver {filtradas.length} {filtradas.length === 1 ? 'obra' : 'obras'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Chip helper ───────────────────────────────────────────────────────────────
function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1 font-sans text-xs font-medium text-zinc-700">
      {label}
      <button
        onClick={onRemove}
        className="text-zinc-400 hover:text-unicamp"
        aria-label={`Remover filtro ${label}`}
      >
        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </span>
  );
}