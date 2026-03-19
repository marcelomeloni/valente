// src/components/backstage/steps/Step2Details.tsx
'use client';

import { useRef, useState, DragEvent, ChangeEvent } from 'react';
import { TagInput } from '@/components/ui/TagInput';
import type { ObraFormData } from '../ObraForm';

interface Step2Props {
  form: ObraFormData;
  updateForm: (updates: Partial<ObraFormData>) => void;
  onPrev: () => void;
  submitLabel: string;
}

export function Step2Details({ form, updateForm, onPrev, submitLabel }: Step2Props) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const inputCls =
    'w-full rounded-lg border border-zinc-200 bg-white px-3.5 py-2.5 font-sans text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-colors focus:border-unicamp focus:ring-2 focus:ring-unicamp/10';
  const labelCls =
    'block font-sans text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1.5';

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    handleFileValidation(file);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    handleFileValidation(file);
  };

  const handleFileValidation = (file?: File) => {
    if (!file) return;
    if (file.type !== 'application/pdf') {
      alert('Por favor, selecione apenas arquivos no formato PDF.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('O arquivo excede o limite de 10MB.');
      return;
    }
    updateForm({ arquivo: file });
  };

  const removeFile = () => {
    updateForm({ arquivo: null });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
      <h2 className="mb-6 font-sans text-lg font-semibold text-zinc-900">
        Detalhes, Temas e Arquivo
      </h2>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <div>
            <label className={labelCls}>Temas</label>
            <TagInput
              tags={form.temas}
              setTags={(tags) => updateForm({ temas: tags })}
              placeholder="Ex: Construcionismo, Logo, Educação (pressione vírgula)"
            />
          </div>

          <div>
            <label className={labelCls}>Publicado em (Veículo/Revista)</label>
            <input
              type="text"
              value={form.publicacao}
              onChange={(e) => updateForm({ publicacao: e.target.value })}
              placeholder="Ex: Revista Brasileira de Informática na Educação"
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>Link externo / DOI</label>
            <input
              type="url"
              value={form.url}
              onChange={(e) => updateForm({ url: e.target.value })}
              placeholder="https://doi.org/10..."
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>Resumo</label>
            <textarea
              rows={5}
              value={form.resumo}
              onChange={(e) => updateForm({ resumo: e.target.value })}
              placeholder="Breve descrição ou abstract da obra"
              className={`${inputCls} resize-none`}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className={labelCls}>Arquivo PDF (Opcional)</label>
          
          {!form.arquivo ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`group flex h-full min-h-[280px] w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 transition-all ${
                isDragging
                  ? 'border-unicamp bg-unicamp/5'
                  : 'border-zinc-300 bg-zinc-50 hover:border-unicamp hover:bg-unicamp/5'
              }`}
            >
              <div className={`mb-4 rounded-full bg-white p-3 shadow-sm ring-1 ring-zinc-200 transition-transform ${isDragging ? 'scale-110' : 'group-hover:scale-110'}`}>
                <svg className="h-6 w-6 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                </svg>
              </div>
              <p className="text-center font-sans text-sm font-medium text-zinc-700">
                <span className="text-unicamp">Clique para fazer upload</span> ou arraste o PDF aqui
              </p>
              <p className="mt-2 text-center font-sans text-xs text-zinc-500">
                Tamanho máximo: 10MB
              </p>
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>
          ) : (
            <div className="flex h-full min-h-[280px] w-full flex-col items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 px-6">
              <svg className="mb-3 h-12 w-12 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.267 14.68c-.184 0-.308.018-.372.036v1.178c.076.018.171.023.302.023.479 0 .774-.242.774-.651 0-.366-.254-.586-.704-.586zm3.487.012c-.2 0-.33.018-.407.036v2.61c.077.018.201.018.313.018.817.006 1.349-.444 1.349-1.396.006-.83-.479-1.268-1.255-1.268z" />
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM9.498 16.19c-.309.29-.765.42-1.296.42a2.23 2.23 0 0 1-.308-.018v1.426H7v-3.936A7.558 7.558 0 0 1 8.219 14c.557 0 .953.106 1.22.319.254.202.426.533.426.923-.001.392-.131.723-.367.948zm3.807 1.355c-.42.349-1.059.515-1.84.515-.468 0-.799-.03-1.024-.06v-3.917A7.947 7.947 0 0 1 11.66 14c.757 0 1.249.136 1.633.426.415.308.675.799.675 1.504 0 .763-.279 1.29-.663 1.615zM17 14.77h-1.532v.911H16.9v.734h-1.432v1.604h-.906V14.03H17v.74z" />
              </svg>
              <p className="text-center font-sans text-sm font-semibold text-zinc-900 line-clamp-1">
                {form.arquivo.name}
              </p>
              <p className="mt-1 text-center font-sans text-xs text-zinc-500">
                {(form.arquivo.size / 1024 / 1024).toFixed(2)} MB
              </p>
              
              <button
                type="button"
                onClick={removeFile}
                className="mt-6 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 font-sans text-xs font-semibold text-red-600 transition-colors hover:bg-red-100"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Remover e enviar outro
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-between border-t border-zinc-100 pt-6">
        <button
          type="button"
          onClick={onPrev}
          className="rounded-xl px-5 py-2.5 font-sans text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100"
        >
          Voltar
        </button>
        <button
          type="submit"
          className="rounded-xl bg-unicamp px-6 py-2.5 font-sans text-sm font-semibold text-white transition-all hover:brightness-110 shadow-sm"
        >
          {submitLabel}
        </button>
      </div>
    </div>
  );
}