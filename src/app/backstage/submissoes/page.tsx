// app/backstage/submissoes/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { submissaoService } from '@/services/submissaoService';

type StatusFiltro = 'pendente' | 'aceita' | 'recusada';

const STATUS_STYLE: Record<string, string> = {
  pendente: 'bg-amber-100 text-amber-700 border-amber-200',
  aceita: 'bg-green-100 text-green-700 border-green-200',
  recusada: 'bg-red-100 text-red-700 border-red-200',
};

const STATUS_LABEL: Record<string, string> = {
  pendente: 'Pendente',
  aceita: 'Aceita',
  recusada: 'Recusada',
};

export default function SubmissoesPage() {
  const { user } = useAuth();
  const [submissoes, setSubmissoes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState<StatusFiltro>('pendente');

  // Modal de recusa
  const [recusandoId, setRecusandoId] = useState<number | null>(null);
  const [motivo, setMotivo] = useState('');
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const data = await submissaoService.getAll();
      setSubmissoes(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleAceitar(id: number) {
    setSalvando(true);
    try {
      await submissaoService.aceitar(id, user?.id);
      await load();
    } catch (err) {
      console.error(err);
      alert('Erro ao aceitar submissão.');
    } finally {
      setSalvando(false);
    }
  }

  async function handleRecusar() {
    if (!recusandoId) return;
    if (!motivo.trim()) {
      alert('Informe o motivo da recusa.');
      return;
    }
    setSalvando(true);
    try {
      await submissaoService.recusar(recusandoId, user?.id, motivo.trim());
      setRecusandoId(null);
      setMotivo('');
      await load();
    } catch (err) {
      console.error(err);
      alert('Erro ao recusar submissão.');
    } finally {
      setSalvando(false);
    }
  }

  const filtradas = submissoes.filter((s) => s.status === filtro);

  const contagens = {
    pendente: submissoes.filter((s) => s.status === 'pendente').length,
    aceita: submissoes.filter((s) => s.status === 'aceita').length,
    recusada: submissoes.filter((s) => s.status === 'recusada').length,
  };

  const filtros: { label: string; value: StatusFiltro }[] = [
    { label: 'Pendentes', value: 'pendente' },
    { label: 'Aceitas', value: 'aceita' },
    { label: 'Recusadas', value: 'recusada' },
  ];

  return (
    <div className="mx-auto max-w-5xl p-6 lg:p-8">

      <div className="mb-8">
        <h1 className="font-serif text-2xl font-bold text-zinc-900">Submissões</h1>
        <p className="mt-1 font-sans text-sm text-zinc-500">
          Revise e aprove as obras enviadas por usuários.
        </p>
      </div>

      {/* Filtros */}
      <div className="mb-4 flex items-center gap-2">
        {filtros.map((f) => (
          <button
            key={f.value}
            onClick={() => setFiltro(f.value)}
            className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 font-sans text-xs font-semibold transition-colors ${
              filtro === f.value
                ? 'border-zinc-900 bg-zinc-900 text-white'
                : 'border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50'
            }`}
          >
            {f.label}
            <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums ${
              filtro === f.value ? 'bg-white/20 text-white' : 'bg-zinc-100 text-zinc-500'
            }`}>
              {contagens[f.value]}
            </span>
          </button>
        ))}
      </div>

      {/* Tabela */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        {loading ? (
          <div className="px-6 py-12 text-center font-sans text-sm text-zinc-400 animate-pulse">
            Carregando submissões...
          </div>
        ) : filtradas.length === 0 ? (
          <div className="px-6 py-12 text-center font-sans text-sm text-zinc-400">
            Nenhuma submissão {STATUS_LABEL[filtro].toLowerCase()} no momento.
          </div>
        ) : (
          <div className="divide-y divide-zinc-100">
            {filtradas.map((sub: any) => (
              <div key={sub.id} className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-start sm:justify-between">
                {/* Info da obra */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-sans text-sm font-semibold text-zinc-900">
                      {sub.obra?.titulo}
                    </p>
                    <span className={`flex-shrink-0 rounded-md border px-2 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-wider ${
                      STATUS_STYLE[sub.status]
                    }`}>
                      {STATUS_LABEL[sub.status]}
                    </span>
                  </div>

                  <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="inline-flex items-center gap-1 font-sans text-xs text-zinc-500">
                      <svg className="h-3.5 w-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {sub.usuario?.nome}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-zinc-300" />
                    <span className="font-sans text-xs text-zinc-400">
                      {sub.usuario?.email}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-zinc-300" />
                    <span className="font-sans text-xs text-zinc-400 tabular-nums">
                      {new Date(sub.data_submissao).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  {/* Motivo de recusa (se houver) */}
                  {sub.status === 'recusada' && sub.motivo && (
                    <div className="mt-2 rounded-lg border border-red-100 bg-red-50 px-3 py-2">
                      <p className="font-sans text-xs font-semibold text-red-600">Motivo da recusa:</p>
                      <p className="mt-0.5 font-sans text-xs text-red-500">{sub.motivo}</p>
                    </div>
                  )}

                  {/* Info revisão (se aceita/recusada) */}
                  {sub.status !== 'pendente' && sub.catalogador && (
                    <p className="mt-1.5 font-sans text-[11px] text-zinc-400">
                      Revisado por <span className="font-medium">{sub.catalogador?.nome}</span> em{' '}
                      {new Date(sub.data_revisao).toLocaleDateString('pt-BR')}
                    </p>
                  )}
                </div>

                {/* Ações (só para pendentes) */}
                {sub.status === 'pendente' && (
                  <div className="flex flex-shrink-0 items-center gap-2">
                    <button
                      onClick={() => handleAceitar(sub.id)}
                      disabled={salvando}
                      className="flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-2 font-sans text-xs font-semibold text-white transition-colors hover:bg-green-700 disabled:opacity-50"
                    >
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Aceitar
                    </button>
                    <button
                      onClick={() => { setRecusandoId(sub.id); setMotivo(''); }}
                      disabled={salvando}
                      className="flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 font-sans text-xs font-semibold text-red-600 transition-colors hover:bg-red-100 disabled:opacity-50"
                    >
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Recusar
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de recusa */}
      {recusandoId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl">
            <h2 className="font-serif text-lg font-bold text-zinc-900">Recusar submissão</h2>
            <p className="mt-1 font-sans text-sm text-zinc-500">
              Informe o motivo para que o autor possa corrigir e reenviar.
            </p>

            <div className="mt-4">
              <label className="mb-1.5 block font-sans text-xs font-semibold uppercase tracking-wider text-zinc-600">
                Motivo *
              </label>
              <textarea
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                rows={4}
                placeholder="Ex: faltam informações sobre os autores, o PDF não está acessível..."
                className="w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 font-sans text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-colors focus:border-zinc-400 focus:bg-white"
              />
            </div>

            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                onClick={() => { setRecusandoId(null); setMotivo(''); }}
                disabled={salvando}
                className="rounded-lg border border-zinc-200 bg-white px-4 py-2 font-sans text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleRecusar}
                disabled={salvando || !motivo.trim()}
                className="rounded-lg bg-red-600 px-4 py-2 font-sans text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50"
              >
                {salvando ? 'Recusando...' : 'Confirmar recusa'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}