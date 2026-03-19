'use client';

import { useState } from 'react';
import { ObraCategoria, CATEGORIAS, TEMAS_DISPONIVEIS } from './types';

export interface FiltersState {
  categoria: ObraCategoria | 'todas';
  temas: string[];
  anoMin: string;
  anoMax: string;
}

export const FILTERS_INICIAL: FiltersState = {
  categoria: 'todas',
  temas: [],
  anoMin: '',
  anoMax: '',
};

const ANOS = Array.from(
  { length: new Date().getFullYear() - 1974 },
  (_, i) => new Date().getFullYear() - i
);

const TEMAS_VISIBLE_DEFAULT = 5;

interface ObraFiltersProps {
  filters: FiltersState;
  onChange: (f: FiltersState) => void;
  totalResultados: number;
}

export function ObraFilters({ filters, onChange, totalResultados }: ObraFiltersProps) {
  const [temasExpanded, setTemasExpanded] = useState(false);

  function setCategoria(v: ObraCategoria | 'todas') {
    onChange({ ...filters, categoria: v });
  }

  function toggleTema(tema: string) {
    const already = filters.temas.includes(tema);
    onChange({
      ...filters,
      temas: already ? filters.temas.filter((t) => t !== tema) : [...filters.temas, tema],
    });
  }

  function clearAll() {
    onChange(FILTERS_INICIAL);
  }

  const activeCount =
    (filters.categoria !== 'todas' ? 1 : 0) +
    filters.temas.length +
    (filters.anoMin ? 1 : 0) +
    (filters.anoMax ? 1 : 0);

  // Always show selected temas + up to TEMAS_VISIBLE_DEFAULT
  const visibleTemas = temasExpanded
    ? TEMAS_DISPONIVEIS
    : TEMAS_DISPONIVEIS.slice(0, TEMAS_VISIBLE_DEFAULT).concat(
        // make sure selected temas not in first 5 are still shown
        TEMAS_DISPONIVEIS.slice(TEMAS_VISIBLE_DEFAULT).filter((t) =>
          filters.temas.includes(t)
        )
      );

  const hiddenCount =
    TEMAS_DISPONIVEIS.length -
    TEMAS_VISIBLE_DEFAULT -
    TEMAS_DISPONIVEIS.slice(TEMAS_VISIBLE_DEFAULT).filter((t) =>
      filters.temas.includes(t)
    ).length;

  const selectCls =
    'w-full appearance-none rounded-lg border border-zinc-200 bg-white px-3 py-2 pr-8 font-sans text-sm text-zinc-700 outline-none transition-colors focus:border-unicamp focus:ring-2 focus:ring-unicamp/10 cursor-pointer';

  return (
    <aside className="flex flex-col gap-5">

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg className="h-3.5 w-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 8h10M11 12h4" />
          </svg>
          <span className="font-sans text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
            Filtros
          </span>
          {activeCount > 0 && (
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-unicamp font-sans text-[10px] font-bold text-white leading-none">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button
            onClick={clearAll}
            className="font-sans text-xs font-medium text-unicamp transition-opacity hover:opacity-70"
          >
            Limpar
          </button>
        )}
      </div>

      {/* ── Result count ── */}
      <div className="rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3">
        <p className="font-sans text-sm text-zinc-500">
          <span className="font-serif text-xl font-bold text-zinc-900">{totalResultados}</span>
          {'  '}
          {totalResultados === 1 ? 'obra encontrada' : 'obras encontradas'}
        </p>
      </div>

      {/* ── Categoria ── */}
      <FilterSection title="Categoria">
        <div className="flex flex-col gap-0.5">
          {CATEGORIAS.map((cat) => {
            const active = filters.categoria === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setCategoria(cat.value as ObraCategoria | 'todas')}
                className={`flex items-center justify-between rounded-lg px-3 py-2 text-left font-sans text-sm transition-all duration-100 ${
                  active
                    ? 'bg-unicamp/[0.07] font-semibold text-unicamp'
                    : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
                }`}
              >
                <span>{cat.label}</span>
                {active && (
                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-unicamp" />
                )}
              </button>
            );
          })}
        </div>
      </FilterSection>

      <div className="h-px bg-zinc-100" />

      {/* ── Temas ── */}
      <FilterSection title="Temas">
        <div className="flex flex-col gap-0.5">
          {visibleTemas.map((tema) => {
            const active = filters.temas.includes(tema);
            return (
              <button
                key={tema}
                onClick={() => toggleTema(tema)}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-left font-sans text-sm transition-all duration-100 ${
                  active
                    ? 'bg-unicamp/[0.07] font-semibold text-unicamp'
                    : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
                }`}
              >
                {/* Checkbox */}
                <span
                  className={`flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded border transition-colors duration-100 ${
                    active ? 'border-unicamp bg-unicamp' : 'border-zinc-300 bg-white'
                  }`}
                >
                  {active && (
                    <svg className="h-2 w-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>
                <span className="leading-tight">{tema}</span>
              </button>
            );
          })}
        </div>

        {/* Ver mais / menos */}
        {!temasExpanded && hiddenCount > 0 && (
          <button
            onClick={() => setTemasExpanded(true)}
            className="mt-1 flex items-center gap-1.5 px-3 font-sans text-xs font-medium text-zinc-500 transition-colors hover:text-zinc-900"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Ver mais {hiddenCount} {hiddenCount === 1 ? 'tema' : 'temas'}
          </button>
        )}
        {temasExpanded && (
          <button
            onClick={() => setTemasExpanded(false)}
            className="mt-1 flex items-center gap-1.5 px-3 font-sans text-xs font-medium text-zinc-500 transition-colors hover:text-zinc-900"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
            </svg>
            Ver menos
          </button>
        )}
      </FilterSection>

      <div className="h-px bg-zinc-100" />

      {/* ── Período ── */}
      <FilterSection title="Período">
        <div className="flex flex-col gap-2">
          <div>
            <label className="mb-1 block font-sans text-[11px] text-zinc-400">De</label>
            <div className="relative">
              <select
                value={filters.anoMin}
                onChange={(e) => onChange({ ...filters, anoMin: e.target.value })}
                className={selectCls}
              >
                <option value="">Qualquer ano</option>
                {ANOS.map((ano) => (
                  <option key={ano} value={ano}>{ano}</option>
                ))}
              </select>
              <Chevron />
            </div>
          </div>
          <div>
            <label className="mb-1 block font-sans text-[11px] text-zinc-400">Até</label>
            <div className="relative">
              <select
                value={filters.anoMax}
                onChange={(e) => onChange({ ...filters, anoMax: e.target.value })}
                className={selectCls}
              >
                <option value="">Qualquer ano</option>
                {ANOS.map((ano) => (
                  <option key={ano} value={ano}>{ano}</option>
                ))}
              </select>
              <Chevron />
            </div>
          </div>
        </div>
      </FilterSection>

    </aside>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="px-1 font-sans text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
        {title}
      </p>
      {children}
    </div>
  );
}

function Chevron() {
  return (
    <svg
      className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400"
      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}