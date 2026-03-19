import Link from 'next/link';
import { OBRAS_MOCK } from '../obras/types';

const stats = [
  { 
    label: 'Total de obras', 
    value: OBRAS_MOCK.length,
    icon: (
      <svg className="h-5 w-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  },
  { 
    label: 'Livros', 
    value: OBRAS_MOCK.filter((o) => o.categoria === 'livro').length,
    icon: (
      <svg className="h-5 w-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  },
  { 
    label: 'Artigos', 
    value: OBRAS_MOCK.filter((o) => o.categoria === 'artigo').length,
    icon: (
      <svg className="h-5 w-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    )
  },
  { 
    label: 'Teses', 
    value: OBRAS_MOCK.filter((o) => o.categoria === 'tese').length,
    icon: (
      <svg className="h-5 w-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    )
  },
];

const recentes = [...OBRAS_MOCK].sort((a, b) => b.ano - a.ano).slice(0, 5);

export default function BackstageDashboard() {
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
            href="/backstage/obras/nova"
            className="flex items-center gap-2 rounded-xl bg-unicamp px-4 py-2 font-sans text-sm font-semibold text-white transition-all hover:brightness-110"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Nova obra
          </Link>
        </div>
      </div>

      <div className="mb-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <p className="font-sans text-xs font-semibold uppercase tracking-wider text-zinc-500">
                {s.label}
              </p>
              {s.icon}
            </div>
            <p className="font-serif text-3xl font-bold text-zinc-900">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-zinc-100 bg-zinc-50/50 px-6 py-4">
          <h2 className="font-sans text-sm font-semibold text-zinc-900">Adicionadas recentemente</h2>
          <Link 
            href="/backstage/obras" 
            className="font-sans text-xs font-medium text-zinc-500 transition-colors hover:text-unicamp"
          >
            Ver todas &rarr;
          </Link>
        </div>
        
        <div className="divide-y divide-zinc-100">
          {recentes.map((obra) => (
            <Link 
              href={`/backstage/obras/${obra.slug}/editar`}
              key={obra.slug} 
              className="group flex items-center justify-between px-6 py-4 transition-colors hover:bg-zinc-50"
            >
              <div className="min-w-0 flex-1 pr-6">
                <p className="truncate font-sans text-sm font-medium text-zinc-900 group-hover:text-unicamp transition-colors">
                  {obra.titulo}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="font-sans text-xs text-zinc-500">
                    {obra.autores[0]}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-zinc-300" />
                  <span className="font-sans text-xs text-zinc-500 tabular-nums">
                    {obra.ano}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-shrink-0 items-center gap-4">
                <span className="rounded-md border border-zinc-200 bg-white px-2 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-wider text-zinc-500 shadow-sm">
                  {obra.categoria}
                </span>
                <svg 
                  className="h-4 w-4 text-zinc-300 transition-transform group-hover:translate-x-1 group-hover:text-unicamp" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth={2}
                >
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