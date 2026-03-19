'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { obrasService } from '@/services/obrasService';
import { CATEGORIA_LABEL } from '@/app/obras/types';
import type { Obra } from '@/app/obras/types';

export default function AdminObrasPage() {
  const [obras, setObras] = useState<Obra[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState('');

  async function carregar() {
    try {
      const data = await obrasService.getAll();
      setObras(data.sort((a, b) => b.ano - a.ano));
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }

  useEffect(() => { carregar(); }, []);

  async function handleDelete(slug: string, titulo: string) {
    if (!confirm(`Tem certeza que deseja excluir "${titulo}"? Esta ação não pode ser desfeita.`)) return;
    try {
      // Find obra ID by slug
      const obra = obras.find(o => o.slug === slug);
      if (obra?.id) {
        await obrasService.delete(obra.id);
      }
      await carregar();
    } catch (err) { alert('Erro ao excluir obra.'); }
  }

  const filtradas = busca.trim()
    ? obras.filter(o =>
      o.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      o.autores.some(a => a.toLowerCase().includes(busca.toLowerCase())) ||
      (CATEGORIA_LABEL[o.categoria] || '').toLowerCase().includes(busca.toLowerCase())
    )
    : obras;

  return (
    <div className="mx-auto max-w-6xl p-6 lg:p-8">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-serif text-2xl font-bold text-zinc-900">Obras do Acervo</h1>
          <p className="mt-1 font-sans text-sm text-zinc-500">
            Gerencie as {obras.length} publicações cadastradas no sistema.
          </p>
        </div>
        <Link
          href="/backstage/nova"
          className="flex items-center gap-2 rounded-xl bg-unicamp px-4 py-2.5 font-sans text-sm font-semibold text-white transition-all hover:brightness-110"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Nova obra
        </Link>
      </div>

      {/* Busca */}
      <div className="mb-6 relative">
        <svg className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 6.75 6.75a7.5 7.5 0 0 0 10.6 10.6z" />
        </svg>
        <input
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar por título, autor ou categoria..."
          className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-10 pr-4 font-sans text-sm text-zinc-900 placeholder-zinc-400 outline-none focus:border-unicamp focus:ring-2 focus:ring-unicamp/10"
        />
      </div>

      {/* Tabela */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        {loading ? (
          <div className="p-8 text-center text-zinc-400 animate-pulse">Carregando obras...</div>
        ) : filtradas.length === 0 ? (
          <div className="p-8 text-center text-zinc-500">
            {busca ? `Nenhuma obra encontrada para "${busca}".` : 'Nenhuma obra cadastrada.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans">
              <thead>
                <tr className="border-b border-zinc-100 bg-zinc-50/50">
                  <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-widest text-zinc-500">Título</th>
                  <th className="hidden px-4 py-4 text-[11px] font-semibold uppercase tracking-widest text-zinc-500 sm:table-cell">Categoria</th>
                  <th className="hidden px-4 py-4 text-[11px] font-semibold uppercase tracking-widest text-zinc-500 md:table-cell">Ano</th>
                  <th className="hidden px-4 py-4 text-[11px] font-semibold uppercase tracking-widest text-zinc-500 lg:table-cell">Autores</th>
                  <th className="px-6 py-4 text-right text-[11px] font-semibold uppercase tracking-widest text-zinc-500">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {filtradas.map((obra) => (
                  <tr key={obra.slug} className="group transition-colors hover:bg-zinc-50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-zinc-900 line-clamp-1">{obra.titulo}</p>
                    </td>
                    <td className="hidden px-4 py-4 sm:table-cell">
                      <span className="inline-flex items-center rounded-md bg-zinc-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
                        {CATEGORIA_LABEL[obra.categoria] || obra.categoria}
                      </span>
                    </td>
                    <td className="hidden px-4 py-4 text-sm tabular-nums text-zinc-500 md:table-cell">
                      {obra.ano}
                    </td>
                    <td className="hidden px-4 py-4 lg:table-cell">
                      <p className="text-sm text-zinc-500 line-clamp-1">{obra.autores?.join(', ')}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/${obra.slug}`} target="_blank" className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-900" title="Ver">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        </Link>

                        <button
                          onClick={() => handleDelete(obra.slug, obra.titulo)}
                          className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-600"
                          title="Excluir"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
