'use client';

import { useRouter } from 'next/navigation';
import { obrasService } from '@/services/obrasService';

interface Props {
  id: number;
  slug: string;
  titulo: string;
}

export function DeleteObraButton({ id, slug, titulo }: Props) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`Excluir "${titulo}"? Esta ação não pode ser desfeita.`)) return;

    try {
      await obrasService.delete(id);
      router.refresh(); 
    } catch (err) {
      
      alert('Erro ao excluir a obra. Verifique o console.');
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-600"
      title="Excluir"
    >
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>
  );
}