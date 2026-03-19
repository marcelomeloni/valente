// app/backstage/obras/page.tsx
import Link from 'next/link';
import { ObraCategoria } from '../../obras/types';
import { DeleteObraButton } from '@/components/ui/DeleteButton';
import { obrasService } from '@/services/obrasService';

const CATEGORIA_LABEL: Record<ObraCategoria, string> = {
  livro: 'Livro',
  artigo: 'Artigo',
  capitulo: 'Capítulo',
  tese: 'Tese',
  revista: 'Revista',
  relatorio: 'Relatório',
};

const ITEMS_PER_PAGE = 10;

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function BackstageObras({ searchParams }: Props) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  let backendObras = [];
  try { backendObras = await obrasService.getAll(); } catch {}

  const todasObras = [...backendObras].sort((a, b) => b.ano - a.ano);
  const totalItems = todasObras.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const obrasPaginadas = todasObras.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="mx-auto max-w-6xl p-6 lg:p-8">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-serif text-2xl font-bold text-zinc-900">Obras cadastradas</h1>
          <p className="mt-1 font-sans text-sm text-zinc-500">
            Gerencie as {totalItems} publicações do acervo
          </p>
        </div>
        <Link
          href="/backstage/obras/nova"
          className="flex items-center gap-2 rounded-xl bg-unicamp px-4 py-2.5 font-sans text-sm font-semibold text-white transition-all hover:brightness-110"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Nova obra
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50/50">
                <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-widest text-zinc-500">Título</th>
                <th className="hidden px-4 py-4 text-[11px] font-semibold uppercase tracking-widest text-zinc-500 sm:table-cell">Tipo</th>
                <th className="hidden px-4 py-4 text-[11px] font-semibold uppercase tracking-widest text-zinc-500 md:table-cell">Ano</th>
                <th className="px-6 py-4 text-right text-[11px] font-semibold uppercase tracking-widest text-zinc-500">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {obrasPaginadas.length > 0 ? (
                obrasPaginadas.map((obra) => (
                  <tr key={obra.slug} className="group transition-colors hover:bg-zinc-50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-zinc-900 line-clamp-1">{obra.titulo}</p>
                      <p className="mt-0.5 text-xs text-zinc-400">{obra.autores?.[0]}</p>
                    </td>
                    <td className="hidden px-4 py-4 sm:table-cell">
                      <span className="inline-flex items-center rounded-md bg-zinc-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
                        {CATEGORIA_LABEL[obra.categoria]}
                      </span>
                    </td>
                    <td className="hidden px-4 py-4 text-sm tabular-nums text-zinc-500 md:table-cell">
                      {obra.ano}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/${obra.slug}`} target="_blank" className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-900">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        </Link>
                        <Link href={`/backstage/obras/${obra.slug}/editar`} className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-900">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </Link>
                        <DeleteObraButton slug={obra.slug} titulo={obra.titulo} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-sm text-zinc-500">Nenhuma obra cadastrada até o momento.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-zinc-100 bg-white px-6 py-4">
            <span className="font-sans text-sm text-zinc-500">
              Mostrando <span className="font-semibold text-zinc-900">{startIndex + 1}</span> a{' '}
              <span className="font-semibold text-zinc-900">{Math.min(startIndex + ITEMS_PER_PAGE, totalItems)}</span>{' '}
              de <span className="font-semibold text-zinc-900">{totalItems}</span>
            </span>
            <div className="flex items-center gap-2">
              {currentPage > 1 ? (
                <Link href={`?page=${currentPage - 1}`} className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 font-sans text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50">Anterior</Link>
              ) : (
                <button disabled className="cursor-not-allowed rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 font-sans text-sm font-medium text-zinc-400">Anterior</button>
              )}
              {currentPage < totalPages ? (
                <Link href={`?page=${currentPage + 1}`} className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 font-sans text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50">Próximo</Link>
              ) : (
                <button disabled className="cursor-not-allowed rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 font-sans text-sm font-medium text-zinc-400">Próximo</button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}