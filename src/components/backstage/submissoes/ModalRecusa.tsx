import { Loader2 } from 'lucide-react';

interface Props {
  motivo: string;
  salvando: boolean;
  onChange: (v: string) => void;
  onConfirmar: () => void;
  onCancelar: () => void;
}

export function ModalRecusa({ motivo, salvando, onChange, onConfirmar, onCancelar }: Props) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl">

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
            onChange={(e) => onChange(e.target.value)}
            rows={4}
            placeholder="Ex: faltam informações sobre os autores, o PDF não está acessível..."
            className="w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 font-sans text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-colors focus:border-zinc-400 focus:bg-white"
          />
        </div>

        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            onClick={onCancelar}
            disabled={salvando}
            className="rounded-lg border border-zinc-200 bg-white px-4 py-2 font-sans text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirmar}
            disabled={salvando || !motivo.trim()}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-sans text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50"
          >
            {salvando && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            {salvando ? 'Recusando...' : 'Confirmar recusa'}
          </button>
        </div>
      </div>
    </div>
  );
}