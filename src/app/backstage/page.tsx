import Link from 'next/link';
import { obrasService } from '@/services/obrasService';

export default async function BackstageDashboard() {
  // Estrutura inicial padrão
  let dashboardData = {
    stats: { total: 0, livros: 0, artigos: 0, pendentes: 0 },
    submissoesPendentes: []
  };

  try { 
    // Uma única chamada que traz tudo o que o dashboard precisa!
    dashboardData = await obrasService.getDashboard(); 
  } catch (error) {
    console.error("Erro ao carregar dados do dashboard:", error);
  }

  const { stats, submissoesPendentes } = dashboardData;

  const statsCards = [
    {
      label: 'Total de obras',
      value: stats.total,
      icon: (
        <svg className="h-5 w-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      label: 'Livros',
      value: stats.livros,
      icon: (
        <svg className="h-5 w-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      label: 'Artigos',
      value: stats.artigos,
      icon: (
        <svg className="h-5 w-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
    },
    {
      label: 'Aguardando revisão',
      value: stats.pendentes,
      highlight: stats.pendentes > 0,
      icon: (
        <svg className="h-5 w-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  const recentesPendentes = submissoesPendentes.slice(0, 5);

  return (
    <div className="mx-auto max-w-5xl p-6 lg:p-8">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-serif text-2xl font-bold text-zinc-900">Dashboard</h1>
          <p className="mt-1 font-sans text-sm text-zinc-500">
            Visão geral do acervo digital do Prof. José Armando Valente.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/backstage/obras"
            className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 font-sans text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-zinc-900"
          >
            Ver acervo
          </Link>
          <Link
            href="/backstage/nova"
            className="flex items-center gap-2 rounded-xl bg-unicamp px-4 py-2 font-sans text-sm font-semibold text-white transition-all hover:brightness-110"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Nova obra
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        {statsCards.map((s) => (
          <div
            key={s.label}
            className={`flex flex-col gap-3 rounded-2xl border bg-white p-5 shadow-sm transition-shadow hover:shadow-md ${
              s.highlight ? 'border-amber-300 bg-amber-50/50' : 'border-zinc-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <p className={`font-sans text-xs font-semibold uppercase tracking-wider ${
                s.highlight ? 'text-amber-600' : 'text-zinc-500'
              }`}>
                {s.label}
              </p>
              {s.icon}
            </div>
            <p className={`font-serif text-3xl font-bold ${
              s.highlight ? 'text-amber-700' : 'text-zinc-900'
            }`}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Submissões pendentes */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-zinc-100 bg-zinc-50/50 px-6 py-4">
          <div className="flex items-center gap-2">
            <h2 className="font-sans text-sm font-semibold text-zinc-900">Submissões pendentes</h2>
            {stats.pendentes > 0 && (
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-amber-100 px-1.5 font-sans text-[10px] font-bold text-amber-700">
                {stats.pendentes}
              </span>
            )}
          </div>
          <Link
            href="/backstage/submissoes"
            className="font-sans text-xs font-medium text-zinc-500 transition-colors hover:text-unicamp"
          >
            Ver todas &rarr;
          </Link>
        </div>

        <div className="divide-y divide-zinc-100">
          {recentesPendentes.length === 0 && (
            <div className="px-6 py-8 text-center text-sm text-zinc-400">
              Nenhuma submissão aguardando revisão.
            </div>
          )}
          {recentesPendentes.map((sub) => (
            <Link
              href={`/backstage/submissoes/${sub.id}`}
              key={sub.id}
              className="group flex items-center justify-between px-6 py-4 transition-colors hover:bg-zinc-50"
            >
              <div className="min-w-0 flex-1 pr-6">
                <p className="truncate font-sans text-sm font-medium text-zinc-900 group-hover:text-unicamp transition-colors">
                  {sub.obra?.titulo}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="font-sans text-xs text-zinc-500">
                    {sub.usuario?.nome}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-zinc-300" />
                  <span className="font-sans text-xs text-zinc-400">
                    {new Date(sub.data_submissao).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>

              <div className="flex flex-shrink-0 items-center gap-4">
                <span className="rounded-md border border-amber-200 bg-amber-50 px-2 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-wider text-amber-600 shadow-sm">
                  pendente
                </span>
                <svg className="h-4 w-4 text-zinc-300 transition-transform group-hover:translate-x-1 group-hover:text-unicamp" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}