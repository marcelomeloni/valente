'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  submissaoService,
  SubmissaoListItem,
  SubmissaoDetalhe,
} from '@/services/submissaoService';
import { SubmissaoRow, STATUS_LABEL } from '@/components/backstage/submissoes/SubmissaoRow';
import { ModalDetalhe } from '@/components/backstage/submissoes/ModalDetalhe';
import { ModalRecusa } from '@/components/backstage/submissoes/ModalRecusa';

type StatusFiltro = 'pendente' | 'aprovada' | 'recusada';

const FILTROS: { label: string; value: StatusFiltro }[] = [
  { label: 'Pendentes', value: 'pendente' },
  { label: 'Aprovadas', value: 'aprovada' },
  { label: 'Recusadas', value: 'recusada' },
];

export default function SubmissoesPage() {
  const { user } = useAuth();

  // Lista leve
  const [submissoes, setSubmissoes] = useState<SubmissaoListItem[]>([]);
  const [loading, setLoading]       = useState(true);
  const [filtro, setFiltro]         = useState<StatusFiltro>('pendente');

  // Modal de detalhe
  const [detalheLeve, setDetalheLeve]         = useState<SubmissaoListItem | null>(null);
  const [detalheCompleto, setDetalheCompleto] = useState<SubmissaoDetalhe | null>(null);
  const [loadingDetalhe, setLoadingDetalhe]   = useState(false);

  // Modal de recusa
  const [recusandoId, setRecusandoId] = useState<number | null>(null);
  const [motivo, setMotivo]           = useState('');
  const [salvando, setSalvando]       = useState(false);

  useEffect(() => { loadLista(); }, []);

  async function loadLista() {
    setLoading(true);
    try {
      setSubmissoes(await submissaoService.getAll());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function abrirDetalhe(sub: SubmissaoListItem) {
    setDetalheLeve(sub);
    setDetalheCompleto(null);
    setLoadingDetalhe(true);
    try {
      setDetalheCompleto(await submissaoService.getById(sub.id));
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingDetalhe(false);
    }
  }

  function fecharDetalhe() {
    setDetalheLeve(null);
    setDetalheCompleto(null);
  }

  async function handleAceitar(id: number) {
    setSalvando(true);
    try {
      await submissaoService.aceitar(id, user?.id);
      fecharDetalhe();
      await loadLista();
    } catch (err) {
      console.error(err);
      alert('Erro ao aceitar submissão.');
    } finally {
      setSalvando(false);
    }
  }

  async function handleRecusar() {
    if (!recusandoId || !motivo.trim()) return;
    setSalvando(true);
    try {
      await submissaoService.recusar(recusandoId, user?.id, motivo.trim());
      setRecusandoId(null);
      setMotivo('');
      fecharDetalhe();
      await loadLista();
    } catch (err) {
      console.error(err);
      alert('Erro ao recusar submissão.');
    } finally {
      setSalvando(false);
    }
  }

  const filtradas  = submissoes.filter(s => s.status === filtro);
  const contagens  = {
    pendente: submissoes.filter(s => s.status === 'pendente').length,
    aprovada: submissoes.filter(s => s.status === 'aprovada').length,
    recusada: submissoes.filter(s => s.status === 'recusada').length,
  };

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
        {FILTROS.map(f => (
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

      {/* Lista */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        {loading ? (
          <div className="animate-pulse px-6 py-12 text-center font-sans text-sm text-zinc-400">
            Carregando submissões...
          </div>
        ) : filtradas.length === 0 ? (
          <div className="px-6 py-12 text-center font-sans text-sm text-zinc-400">
            Nenhuma submissão {STATUS_LABEL[filtro].toLowerCase()} no momento.
          </div>
        ) : (
          <div className="divide-y divide-zinc-100">
            {filtradas.map(sub => (
              <SubmissaoRow key={sub.id} sub={sub} onClick={() => abrirDetalhe(sub)} />
            ))}
          </div>
        )}
      </div>

      {/* Modais */}
      {detalheLeve && (
        <ModalDetalhe
          leve={detalheLeve}
          completo={detalheCompleto}
          loadingDetalhe={loadingDetalhe}
          salvando={salvando}
          onClose={fecharDetalhe}
          onAceitar={handleAceitar}
          onAbrirRecusa={(id) => { setRecusandoId(id); setMotivo(''); }}
        />
      )}

      {recusandoId !== null && (
        <ModalRecusa
          motivo={motivo}
          salvando={salvando}
          onChange={setMotivo}
          onConfirmar={handleRecusar}
          onCancelar={() => { setRecusandoId(null); setMotivo(''); }}
        />
      )}

    </div>
  );
}