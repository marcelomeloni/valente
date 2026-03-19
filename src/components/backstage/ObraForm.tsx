// src/components/backstage/ObraForm.tsx
'use client';

import { useState } from 'react';
import { Step1Info } from './steps/Step1Info';
import { Step2Details } from './steps/Step2Details';

export interface ObraFormData {
  titulo: string;
  categoria: string;
  autores: string[];
  ano: string;
  publicacao: string;
  resumo: string;
  temas: string[];
  url: string;
  arquivo: File | null;
}

interface ObraFormProps {
  initialData?: Partial<ObraFormData>;
  onSubmit: (data: ObraFormData) => void | Promise<void>;
  submitLabel?: string;
}

export function ObraForm({ initialData, onSubmit, submitLabel = 'Salvar obra' }: ObraFormProps) {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState<ObraFormData>({
    titulo: initialData?.titulo ?? '',
    categoria: initialData?.categoria ?? '',
    autores: initialData?.autores ?? ['José Armando Valente'],
    ano: initialData?.ano ?? '',
    publicacao: initialData?.publicacao ?? '',
    resumo: initialData?.resumo ?? '',
    temas: initialData?.temas ?? [],
    url: initialData?.url ?? '',
    arquivo: initialData?.arquivo ?? null,
  });

  const updateForm = (updates: Partial<ObraFormData>) => {
    setForm((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (!form.titulo || !form.categoria || !form.ano || form.autores.length === 0) {
      alert('Preencha os campos obrigatórios (*) antes de avançar.');
      return;
    }
    setStep(2);
  };

  const handlePrev = () => setStep(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full font-sans text-sm font-bold transition-colors ${
              step >= 1 ? 'bg-unicamp text-white' : 'bg-zinc-100 text-zinc-400'
            }`}
          >
            1
          </div>
          <span className={`font-sans text-sm font-semibold ${step >= 1 ? 'text-zinc-900' : 'text-zinc-400'}`}>
            Informações
          </span>
        </div>
        <div className="h-px w-12 bg-zinc-200" />
        <div className="flex items-center gap-3">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full font-sans text-sm font-bold transition-colors ${
              step >= 2 ? 'bg-unicamp text-white' : 'bg-zinc-100 text-zinc-400'
            }`}
          >
            2
          </div>
          <span className={`font-sans text-sm font-semibold ${step >= 2 ? 'text-zinc-900' : 'text-zinc-400'}`}>
            Detalhes e Arquivo
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {step === 1 && (
          <Step1Info 
            form={form} 
            updateForm={updateForm} 
            onNext={handleNext} 
          />
        )}
        
        {step === 2 && (
          <Step2Details 
            form={form} 
            updateForm={updateForm} 
            onPrev={handlePrev} 
            submitLabel={submitLabel} 
          />
        )}
      </form>
    </div>
  );
}