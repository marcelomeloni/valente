// src/components/backstage/steps/Step1Info.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CATEGORIAS } from '@/app/obras/types';
import { TagInput } from '@/components/ui/TagInput';
import type { ObraFormData } from '../ObraForm';

interface Step1Props {
  form: ObraFormData;
  updateForm: (updates: Partial<ObraFormData>) => void;
  onNext: () => void;
}

export function Step1Info({ form, updateForm, onNext }: Step1Props) {
  const router = useRouter();
  const [showErrors, setShowErrors] = useState(false);

  const inputCls = 'w-full rounded-lg border bg-white px-3.5 py-2.5 font-sans text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-colors focus:ring-2 focus:ring-unicamp/10';
  const labelCls = 'block font-sans text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1.5';

  const handleNextClick = () => {
    if (!form.titulo || !form.categoria || !form.ano || form.autores.length === 0) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    onNext();
  };

  const hasError = (field: keyof ObraFormData | 'autores_array') => {
    if (!showErrors) return false;
    if (field === 'autores_array') return form.autores.length === 0;
    return !form[field as keyof ObraFormData];
  };

  const getBorderCls = (isError: boolean) => 
    isError ? 'border-red-300 focus:border-red-500' : 'border-zinc-200 focus:border-unicamp';

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6 flex flex-col gap-1">
        <h2 className="font-sans text-lg font-semibold text-zinc-900">
          Informações da Publicação
        </h2>
        <p className="font-sans text-sm text-zinc-500">
          Preencha os dados principais para identificar a obra no acervo.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className={labelCls}>
            Título <span className="text-unicamp">*</span>
          </label>
          <textarea
            required
            rows={2}
            value={form.titulo}
            onChange={(e) => {
              updateForm({ titulo: e.target.value });
              if (showErrors) setShowErrors(false);
            }}
            placeholder="Título completo da obra"
            className={`${inputCls} resize-none ${getBorderCls(hasError('titulo'))}`}
          />
          {hasError('titulo') && (
            <p className="mt-1.5 font-sans text-xs text-red-500">O título é obrigatório.</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className={labelCls}>
              Categoria <span className="text-unicamp">*</span>
            </label>
            <div className="relative">
              <select
                required
                value={form.categoria}
                onChange={(e) => {
                  updateForm({ categoria: e.target.value });
                  if (showErrors) setShowErrors(false);
                }}
                className={`${inputCls} appearance-none pr-8 ${getBorderCls(hasError('categoria'))}`}
              >
                <option value="">Selecione uma categoria</option>
                {CATEGORIAS.filter((c) => c.value !== 'todas').map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
              <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {hasError('categoria') && (
              <p className="mt-1.5 font-sans text-xs text-red-500">Selecione uma categoria.</p>
            )}
          </div>

          <div>
            <label className={labelCls}>
              Ano <span className="text-unicamp">*</span>
            </label>
            <input
              type="number"
              required
              min={1970}
              max={new Date().getFullYear() + 1}
              value={form.ano}
              onChange={(e) => {
                updateForm({ ano: e.target.value });
                if (showErrors) setShowErrors(false);
              }}
              placeholder="Ex: 2005"
              className={`${inputCls} ${getBorderCls(hasError('ano'))}`}
            />
            {hasError('ano') && (
              <p className="mt-1.5 font-sans text-xs text-red-500">O ano de publicação é obrigatório.</p>
            )}
          </div>
        </div>

        <div>
          <label className={labelCls}>
            Autores <span className="text-unicamp">*</span>
          </label>
          <div className={hasError('autores_array') ? 'rounded-lg border border-red-300' : ''}>
             <TagInput
              tags={form.autores}
              setTags={(tags) => {
                updateForm({ autores: tags });
                if (showErrors) setShowErrors(false);
              }}
              placeholder="Digite o nome e pressione vírgula ou Enter"
            />
          </div>
          {hasError('autores_array') && (
            <p className="mt-1.5 font-sans text-xs text-red-500">Adicione pelo menos um autor.</p>
          )}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-zinc-100 pt-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-xl px-5 py-2.5 font-sans text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={handleNextClick}
          className="flex items-center gap-2 rounded-xl bg-zinc-900 px-6 py-2.5 font-sans text-sm font-semibold text-white transition-all hover:bg-zinc-800"
        >
          Próximo passo
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}