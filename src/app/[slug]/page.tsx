// app/obras/[slug]/page.tsx (ou o caminho correspondente da sua ObraPage)
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { OBRAS_MOCK, ObraCategoria } from '../obras/types';
import { AiChatWidget } from '@/components/ui/AiChatWidget';

const CATEGORIA_LABEL: Record<ObraCategoria, string> = {
  livro: 'Livro',
  artigo: 'Artigo',
  capitulo: 'Capítulo de livro',
  tese: 'Tese / Dissertação',
  revista: 'Revista',
  relatorio: 'Relatório técnico',
};

const CATEGORIA_COLOR: Record<ObraCategoria, string> = {
  livro: 'text-blue-600 bg-blue-50 border-blue-100',
  artigo: 'text-emerald-600 bg-emerald-50 border-emerald-100',
  capitulo: 'text-violet-600 bg-violet-50 border-violet-100',
  tese: 'text-amber-600 bg-amber-50 border-amber-100',
  revista: 'text-pink-600 bg-pink-50 border-pink-100',
  relatorio: 'text-zinc-600 bg-zinc-100 border-zinc-200',
};

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return OBRAS_MOCK.map((obra) => ({ slug: obra.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const obra = OBRAS_MOCK.find((o) => o.slug === slug);
  
  if (!obra) return {};
  
  return {
    title: `${obra.titulo} — Acervo Valente`,
    description:
      obra.resumo ??
      `${CATEGORIA_LABEL[obra.categoria]} de José Armando Valente (${obra.ano}).`,
  };
}

export default async function ObraPage({ params }: Props) {
  const { slug } = await params;
  const obra = OBRAS_MOCK.find((o) => o.slug === slug);
  
  if (!obra) notFound();

  const relacionadas = OBRAS_MOCK.filter(
    (o) => o.slug !== obra.slug && o.temas.some((t) => obra.temas.includes(t))
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-[90rem] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
          <div className="lg:col-span-2">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span
                className={`inline-flex items-center rounded-md border px-2.5 py-1 font-sans text-[11px] font-semibold uppercase tracking-wider ${CATEGORIA_COLOR[obra.categoria]}`}
              >
                {CATEGORIA_LABEL[obra.categoria]}
              </span>
              <span className="font-sans text-sm tabular-nums text-zinc-400">{obra.ano}</span>
            </div>

            <h1 className="font-serif text-2xl font-bold leading-snug text-zinc-900 sm:text-3xl lg:text-4xl">
              {obra.titulo}
            </h1>

            <p className="mt-4 font-sans text-base text-zinc-600">
              {obra.autores.join(', ')}
            </p>

            {obra.publicacao && (
              <p className="mt-1 font-sans text-sm italic text-zinc-400">
                {obra.publicacao}
              </p>
            )}

            <div className="my-8 h-px bg-zinc-100" />

            {obra.resumo ? (
              <div className="flex flex-col gap-3">
                <p className="font-sans text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                  Resumo
                </p>
                <p className="font-sans text-base leading-relaxed text-zinc-700">
                  {obra.resumo}
                </p>
              </div>
            ) : (
              <p className="font-sans text-sm italic text-zinc-400">
                Resumo não disponível para esta publicação.
              </p>
            )}

            {obra.temas.length > 0 && (
              <div className="mt-8">
                <p className="mb-3 font-sans text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                  Temas
                </p>
                <div className="flex flex-wrap gap-2">
                  {obra.temas.map((tema) => (
                    <Link
                      key={tema}
                      href={`/obras?tema=${encodeURIComponent(tema)}`}
                      className="rounded-full border border-zinc-200 bg-white px-3 py-1 font-sans text-xs font-medium text-zinc-600 transition-colors hover:border-unicamp hover:text-unicamp"
                    >
                      {tema}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="my-12 h-px bg-zinc-100" />
            
            <AiChatWidget />
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-zinc-200 bg-offwhite p-6">
              <p className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                Acessar publicação
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-unicamp px-4 py-3 font-sans text-sm font-semibold text-white transition-all hover:brightness-110"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Acessar obra
                </a>
                <a
                  href="#"
                  download
                  className="flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-3 font-sans text-sm font-medium text-zinc-700 transition-all hover:border-zinc-300 hover:text-zinc-900"
                >
                  <svg className="h-4 w-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Baixar PDF
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-6">
              <p className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                Informações
              </p>
              <dl className="flex flex-col gap-3">
                <MetaRow label="Tipo" value={CATEGORIA_LABEL[obra.categoria]} />
                <MetaRow label="Ano" value={String(obra.ano)} />
                <MetaRow label="Autor(es)" value={obra.autores.join('; ')} />
                {obra.publicacao && (
                  <MetaRow label="Publicado em" value={obra.publicacao} />
                )}
              </dl>
            </div>

            <Link
              href="/obras"
              className="mt-2 flex items-center gap-2 font-sans text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Voltar ao acervo
            </Link>
          </div>
        </div>

        {relacionadas.length > 0 && (
          <div className="mt-16 border-t border-zinc-100 pt-12">
            <p className="mb-6 font-sans text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
              Publicações relacionadas
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relacionadas.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/${rel.slug}`}
                  className="group flex flex-col gap-2 rounded-xl border border-zinc-100 bg-white p-5 shadow-sm transition-all hover:border-zinc-200 hover:shadow-md"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center rounded-md border px-2 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-wider ${CATEGORIA_COLOR[rel.categoria]}`}
                    >
                      {CATEGORIA_LABEL[rel.categoria]}
                    </span>
                    <span className="font-sans text-xs tabular-nums text-zinc-400">{rel.ano}</span>
                  </div>
                  <h4 className="font-serif text-sm font-semibold leading-snug text-zinc-800 transition-colors group-hover:text-unicamp">
                    {rel.titulo}
                  </h4>
                  <p className="font-sans text-xs text-zinc-400">{rel.autores[0]}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="font-sans text-[11px] text-zinc-400">{label}</dt>
      <dd className="font-sans text-sm text-zinc-700">{value}</dd>
    </div>
  );
}