// src/app/backstage/obras/nova/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { ObraForm, ObraFormData } from '@/components/backstage/ObraForm';

export default function NovaObraPage() {
  const router = useRouter();

  const handleCreate = async (data: ObraFormData) => {
    // TODO: Integrar com POST /api/obras
    console.log('Criar obra:', data);
    alert('Obra cadastrada! (mock)');
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
        <h1 className="font-serif text-2xl font-bold text-zinc-900">Cadastrar nova obra</h1>
        <p className="mt-1 font-sans text-sm text-zinc-500">
          Preencha os dados da publicação para adicioná-la ao acervo.
        </p>
      </div>

      <ObraForm onSubmit={handleCreate} submitLabel="Cadastrar obra" />
    </div>
  );
}