import { X, ExternalLink, FileText, User, Tag, Calendar, FileCheck, Loader2 } from 'lucide-react';
import { SubmissaoListItem, SubmissaoDetalhe } from '@/services/submissaoService';
import { STATUS_STYLE, STATUS_LABEL } from './SubmissaoRow';

interface Props {
  leve: SubmissaoListItem;               // dados imediatos da lista
  completo: SubmissaoDetalhe | null;     // dados completos (chegam depois)
  loadingDetalhe: boolean;
  salvando: boolean;
  onClose: () => void;
  onAceitar: (id: number) => void;
  onAbrirRecusa: (id: number) => void;
}

function Skeleton() {
  return (
    <div className="space-y-3 animate-pulse px-4 py-3">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-3.5 rounded bg-zinc-100" style={{ width: `${75 - i * 10}%` }} />
      ))}
    </div>
  );
}

function Campo({ icon: Icon, label, children }: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 px-4 py-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" />
      <span className="w-24 shrink-0 font-sans text-xs text-zinc-500">{label}</span>
      <div className="font-sans text-xs text-zinc-800">{children}</div>
    </div>
  );
}

export function ModalDetalhe({
  leve, completo, loadingDetalhe, salvando, onClose, onAceitar, onAbrirRecusa,
}: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="flex w-full max-w-lg flex-col gap-5 rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl">

        {/* Header — disponível imediatamente via dados leves */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h2 className="font-serif text-lg font-bold leading-tight text-zinc-900">
              {leve.obra?.titulo}
            </h2>
            <span className={`inline-flex rounded-md border px-2 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-wider ${STATUS_STYLE[leve.status]}`}>
              {STATUS_LABEL[leve.status]}
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Campos — skeleton enquanto o fetch completo não chegou */}
        <div className="divide-y divide-zinc-100 overflow-hidden rounded-xl border border-zinc-100">

          {/* Sempre visível (vem da lista leve) */}
          <Campo icon={User} label="Enviado por">
            <span className="font-medium">{leve.usuario?.nome}</span>
            <span className="ml-1.5 font-normal text-zinc-400">({leve.usuario?.email})</span>
          </Campo>

          <Campo icon={Tag} label="Categoria">
            <span className="capitalize">{leve.obra?.categoria?.replace(/_/g, ' ')}</span>
          </Campo>

          <Campo icon={Calendar} label="Submetido em">
            <span className="tabular-nums">
              {new Date(leve.data_submissao).toLocaleDateString('pt-BR', {
                day: '2-digit', month: 'long', year: 'numeric',
              })}
            </span>
          </Campo>

          {/* Campos pesados — aparecem ao resolver o fetch de detalhe */}
          {loadingDetalhe ? (
            <Skeleton />
          ) : completo && (
            <>
              {(completo.obra?.ano || completo.obra?.publicacao) && (
                <Campo icon={Calendar} label="Ano / Publicação">
                  {[completo.obra?.ano, completo.obra?.publicacao].filter(Boolean).join(' · ')}
                </Campo>
              )}

              {(completo.obra?.obra_autor?.length ?? 0) > 0 && (
                <Campo icon={User} label="Autores">
                  {completo.obra!.obra_autor!.map(a => a.autor?.nome).filter(Boolean).join(', ')}
                </Campo>
              )}

              {(completo.obra?.obra_tema?.length ?? 0) > 0 && (
                <Campo icon={Tag} label="Temas">
                  <div className="flex flex-wrap gap-1">
                    {completo.obra!.obra_tema!.map(t => (
                      <span key={t.tema?.id} className="rounded-md bg-zinc-100 px-2 py-0.5 text-[11px] text-zinc-600">
                        {t.tema?.nome}
                      </span>
                    ))}
                  </div>
                </Campo>
              )}

              {completo.data_revisao && (
                <Campo icon={FileCheck} label="Revisado em">
                  <span className="tabular-nums">
                    {new Date(completo.data_revisao).toLocaleDateString('pt-BR', {
                      day: '2-digit', month: 'long', year: 'numeric',
                    })}
                    {completo.catalogador?.nome && (
                      <span className="ml-1.5 text-zinc-400">por {completo.catalogador.nome}</span>
                    )}
                  </span>
                </Campo>
              )}

              {completo.obra?.resumo && (
                <Campo icon={FileText} label="Resumo">
                  <p className="leading-relaxed text-zinc-700">{completo.obra.resumo}</p>
                </Campo>
              )}

              {(completo.obra?.pdf || completo.obra?.link_externo) && (
                <Campo icon={ExternalLink} label="Links">
                  <div className="flex flex-wrap gap-3">
                    {completo.obra.pdf && (
                      <a href={completo.obra.pdf} target="_blank" rel="noopener noreferrer"
                        className="font-medium text-blue-600 underline underline-offset-2 hover:text-blue-800">
                        Ver PDF
                      </a>
                    )}
                    {completo.obra.link_externo && (
                      <a href={completo.obra.link_externo} target="_blank" rel="noopener noreferrer"
                        className="font-medium text-blue-600 underline underline-offset-2 hover:text-blue-800">
                        Link externo
                      </a>
                    )}
                  </div>
                </Campo>
              )}

              {completo.status === 'recusada' && completo.observacao && (
                <div className="flex items-start gap-3 bg-red-50 px-4 py-3">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                  <span className="w-24 shrink-0 font-sans text-xs font-medium text-red-500">Motivo</span>
                  <p className="font-sans text-xs leading-relaxed text-red-700">{completo.observacao}</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Ações — só para pendentes */}
        {leve.status === 'pendente' && (
          <div className="flex items-center justify-end gap-2 border-t border-zinc-100 pt-4">
            <button
              onClick={() => onAbrirRecusa(leve.id)}
              disabled={salvando}
              className="flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 font-sans text-xs font-semibold text-red-600 transition-colors hover:bg-red-100 disabled:opacity-50"
            >
              Recusar
            </button>
            <button
              onClick={() => onAceitar(leve.id)}
              disabled={salvando || loadingDetalhe}
              className="flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-2 font-sans text-xs font-semibold text-white transition-colors hover:bg-green-700 disabled:opacity-50"
            >
              {salvando ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : 'Aceitar'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}