// src/app/backstage/obras/[slug]/editar/page.tsx
'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { OBRAS_MOCK } from '@/app/obras/types';
import { ObraForm, type ObraFormData } from '@/components/backstage/ObraForm';

interface Props {
  params: Promise<{ slug: string }>;
}

export default function EditarObraPage({ params }: Props) {
  const router = useRouter();
  
  const { slug } = use(params);
  const obraOriginal = OBRAS_MOCK.find((o) => o.slug === slug);

  if (!obraOriginal) {
    return (
      <div className="mx-auto max-w-5xl p-6 lg:p-8">
        <h1 className="font-serif text-2xl font-bold text-zinc-900">Obra não encontrada</h1>
      </div>
    );
  }

  const initialData: Partial<ObraFormData> = {
    titulo: obraOriginal.titulo,
    categoria: obraOriginal.categoria,
    autores: obraOriginal.autores,
    ano: String(obraOriginal.ano),
    publicacao: obraOriginal.publicacao ?? '',
    resumo: obraOriginal.resumo ?? '',
    temas: obraOriginal.temas,
    url: '', 
    arquivo: null,
  };

  const handleUpdate = async (data: ObraFormData) => {
    // TODO: Integrar com PUT/PATCH /api/obras/[id]
    console.log('Atualizar obra:', slug, data);
    alert('Obra atualizada com sucesso! (mock)');
    router.push('/backstage/obras');
  };

  return (
    <div className="mx-auto max-w-5xl p-6 lg:p-8">
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="mb-4 flex items-center gap-1.5 font-sans text-xs font-medium text-zinc-400 transition-colors hover:text-zinc-700"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Voltar
        </button>
        <h1 className="font-serif text-2xl font-bold text-zinc-900">Editar obra</h1>
        <p className="mt-1 font-sans text-sm text-zinc-500">
          Atualize as informações de "{obraOriginal.titulo}".
        </p>
      </div>

      <ObraForm 
        initialData={initialData} 
        onSubmit={handleUpdate} 
        submitLabel="Salvar alterações" 
      />
    </div>
  );
}