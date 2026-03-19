'use client';

import { useState, useMemo, useEffect } from 'react';
import { Obra, ObraCategoria } from './types';
import { ObraFilters, FiltersState, FILTERS_INICIAL } from './ObraFilters';
import { ObraRow } from './ObraRow';
import { Paginacao } from './Paginacao';
import { Search } from 'lucide-react';

import { obrasService } from '../../services/obrasService';
import { temaService, TemaResponse } from '../../services/temaService';
import { autorService, AutorResponse } from '../../services/autorService';

const POR_PAGINA = 8;
type SortOption = 'recente' | 'antigo' | 'titulo';

export default function ObrasPage() {
  const [obras, setObras] = useState<Obra[]>([]);
  const [temasDisponiveis, setTemasDisponiveis] = useState<string[]>([]);
  const [autoresDisponiveis, setAutoresDisponiveis] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<FiltersState>(FILTERS_INICIAL);
  const [busca, setBusca] = useState('');
  const [sort, setSort] = useState<SortOption>('recente');
  const [pagina, setPagina] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // --- Fetch API Data via Services ---
  useEffect(() => {
    async function carregarDados() {
      try {
        const [obrasList, temasList, autoresList] = await Promise.all([
          obrasService.getAll(),
          temaService.getAll(),
          autorService.getAll()
        ]);

        setObras(obrasList);

        // Contar frequência dos temas no acervo e ordenar por mais usados
        const temaFreq: Record<string, number> = {};
        obrasList.forEach((o) => o.temas?.forEach((t: string) => { temaFreq[t] = (temaFreq[t] || 0) + 1; }));
        const temasOrdenados = temasList
          .map((t: TemaResponse) => t.nome)
          .sort((a: string, b: string) => (temaFreq[b] || 0) - (temaFreq[a] || 0));
        setTemasDisponiveis(temasOrdenados);

        // Contar frequência dos autores e ordenar
        const autorFreq: Record<string, number> = {};
        obrasList.forEach((o) => o.autores?.forEach((a: string) => { autorFreq[a] = (autorFreq[a] || 0) + 1; }));
        const autoresOrdenados = autoresList
          .map((a: AutorResponse) => a.nome)
          .sort((a: string, b: string) => (autorFreq[b] || 0) - (autorFreq[a] || 0));
        setAutoresDisponiveis(autoresOrdenados);

      } catch (err) {
        console.error('Erro ao buscar dados do acervo:', err);
      } finally {
        setLoading(false);
      }
    }
    carregarDados();
  }, []);

  function handleFiltersChange(f: FiltersState) {
    setFilters(f);
    setPagina(1);
  }

  function handleBusca(v: string) {
    setBusca(v);
    setPagina(1);
  }

  const filtradas = useMemo(() => {
    const result = obras.filter((obra) => {
      if (filters.categoria !== 'todas' && obra.categoria !== filters.categoria) return false;
      if (filters.temas.length > 0 && !filters.temas.every((t: string) => obra.temas.includes(t))) return false;
      if (filters.autores.length > 0 && !filters.autores.every((a: string) => obra.autores.includes(a))) return false;
      if (filters.anoMin && obra.ano < parseInt(filters.anoMin)) return false;
      if (filters.anoMax && obra.ano > parseInt(filters.anoMax)) return false;
      if (busca.trim()) {
        const q = busca.toLowerCase();
        const match =
          obra.titulo.toLowerCase().includes(q) ||
          obra.autores.some((a: string) => a.toLowerCase().includes(q)) ||
          obra.temas.some((t: string) => t.toLowerCase().includes(q)) ||
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
  }, [obras, filters, busca, sort]);

  const totalPaginas = Math.ceil(filtradas.length / POR_PAGINA);
  const paginadas = filtradas.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA);

  const activeFilterCount =
    (filters.categoria !== 'todas' ? 1 : 0) +
    filters.temas.length +
    filters.autores.length +
    (filters.anoMin ? 1 : 0) +
    (filters.anoMax ? 1 : 0);

  return (
    <div className="min-h-[calc(100vh-100px)] bg-zinc-50 pb-20">



      {/* ── Body ─────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-10 py-8 lg:gap-12">

          {/* Sidebar — desktop */}
          <div className="hidden w-64 flex-shrink-0 lg:block">
            <div className="sticky top-[140px] max-h-[calc(100vh-160px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-200">
              <ObraFilters
                filters={filters}
                onChange={handleFiltersChange}
                totalResultados={filtradas.length}
                temasDisponiveis={temasDisponiveis}
                autoresDisponiveis={autoresDisponiveis}
                obras={obras}
              />
            </div>
          </div>

          {/* Main List */}
          <div className="min-w-0 flex-1">

            {/* Toolbar Mobile/Sort */}
            <div className="mb-6 flex items-center justify-between gap-3 lg:justify-end">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="relative flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3.5 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 lg:hidden"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 8h10M11 12h4" />
                </svg>
                Filtros
                {activeFilterCount > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-unicamp font-sans text-[10px] font-bold text-white">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => { setSort(e.target.value as SortOption); setPagina(1); }}
                  className="appearance-none rounded-lg border border-zinc-200 bg-white py-2 pl-3 pr-8 focus:ring-2 focus:ring-unicamp/20 focus:border-unicamp text-sm text-zinc-700 outline-none"
                >
                  <option value="recente">Mais recentes</option>
                  <option value="antigo">Mais antigas</option>
                  <option value="titulo">Ordem Alfabética</option>
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
                  <Chip label={filters.categoria} onRemove={() => handleFiltersChange({ ...filters, categoria: 'todas' })} />
                )}
                {filters.temas.map((t: string) => (
                  <Chip key={t} label={t} onRemove={() => handleFiltersChange({ ...filters, temas: filters.temas.filter((x: string) => x !== t) })} />
                ))}
                {filters.autores.map((a: string) => (
                  <Chip key={a} label={a} onRemove={() => handleFiltersChange({ ...filters, autores: filters.autores.filter((x: string) => x !== a) })} />
                ))}
                {filters.anoMin && <Chip label={`De ${filters.anoMin}`} onRemove={() => handleFiltersChange({ ...filters, anoMin: '' })} />}
                {filters.anoMax && <Chip label={`Até ${filters.anoMax}`} onRemove={() => handleFiltersChange({ ...filters, anoMax: '' })} />}
              </div>
            )}

            {/* Loading State */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-200 border-t-unicamp" />
                <p className="mt-4 text-sm text-zinc-500 font-medium animate-pulse">Carregando acervo do banco de dados...</p>
              </div>
            ) : (
              <>
                {/* Results */}
                {paginadas.length === 0 ? (
                  <div className="flex flex-col items-center gap-4 py-24 text-center bg-white rounded-2xl border border-zinc-100 shadow-sm">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-50">
                      <Search className="h-8 w-8 text-zinc-300" />
                    </div>
                    <div>
                      <p className="font-sans text-base font-semibold text-zinc-700">Nenhuma obra encontrada</p>
                      <p className="mt-1 font-sans text-sm text-zinc-400">Tente ajustar os filtros ou os termos busca</p>
                    </div>
                    <button
                      onClick={() => { setFilters(FILTERS_INICIAL); setBusca(''); }}
                      className="rounded-lg border border-zinc-200 px-4 py-2 font-sans text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-300 hover:bg-zinc-50 mt-2"
                    >
                      Limpar todos os filtros
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {paginadas.map((obra) => <ObraRow key={obra.slug} obra={obra} />)}
                  </div>
                )}

                {/* Pagination */}
                {totalPaginas > 1 && (
                  <div className="mt-8">
                    <Paginacao
                      paginaAtual={pagina}
                      totalPaginas={totalPaginas}
                      onMudar={(p) => {
                        setPagina(p);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    />
                  </div>
                )}
              </>
            )}

          </div>
        </div>
      </div>

      {/* ── Mobile filter drawer ──────────────────────────────────────── */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[100] flex lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)} />
          <div className="relative ml-auto flex h-full w-[85vw] max-w-sm flex-col overflow-y-auto bg-white shadow-2xl">
            <div className="flex flex-shrink-0 items-center justify-between border-b border-zinc-100 px-5 py-4">
              <span className="font-sans text-sm font-semibold text-zinc-900">Filtros Avançados</span>
              <button onClick={() => setMobileFiltersOpen(false)} className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-colors">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-5">
              <ObraFilters filters={filters} onChange={handleFiltersChange} totalResultados={filtradas.length} temasDisponiveis={temasDisponiveis} autoresDisponiveis={autoresDisponiveis} obras={obras} />
            </div>
            <div className="flex-shrink-0 border-t border-zinc-100 px-5 py-4 bg-zinc-50">
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full rounded-xl bg-unicamp py-3 font-sans text-sm font-semibold text-white transition-all hover:bg-red-700 shadow-sm"
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
    <span className="flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1 font-sans text-xs font-medium text-zinc-700 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
      <span className="max-w-[150px] truncate">{label}</span>
      <button
        onClick={onRemove}
        className="text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-full p-0.5 transition-colors"
        aria-label={`Remover filtro ${label}`}
      >
        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </span>
  );
}