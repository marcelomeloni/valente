import { SubmissaoListItem } from '@/services/submissaoService';

export const STATUS_STYLE: Record<string, string> = {
  pendente: 'bg-amber-100 text-amber-700 border-amber-200',
  aprovada: 'bg-green-100 text-green-700 border-green-200',
  recusada: 'bg-red-100 text-red-700 border-red-200',
};

export const STATUS_LABEL: Record<string, string> = {
  pendente: 'Pendente',
  aprovada: 'Aprovada',
  recusada: 'Recusada',
};

interface Props {
  sub: SubmissaoListItem;
  onClick: () => void;
}

export function SubmissaoRow({ sub, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer flex-col gap-4 px-6 py-5 transition-colors hover:bg-zinc-50 sm:flex-row sm:items-start sm:justify-between"
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate font-sans text-sm font-semibold text-zinc-900">
            {sub.obra?.titulo}
          </p>
          <span className={`flex-shrink-0 rounded-md border px-2 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-wider ${STATUS_STYLE[sub.status]}`}>
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
          <span className="font-sans text-xs text-zinc-400">{sub.usuario?.email}</span>
          <span className="h-1 w-1 rounded-full bg-zinc-300" />
          <span className="font-sans text-xs tabular-nums text-zinc-400">
            {new Date(sub.data_submissao).toLocaleDateString('pt-BR', {
              day: '2-digit', month: 'short', year: 'numeric',
            })}
          </span>
        </div>
      </div>

      <span className="self-center font-sans text-xs text-zinc-400">Ver detalhes →</span>
    </div>
  );
}