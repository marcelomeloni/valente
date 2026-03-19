// components/ui/DeleteObraButton.tsx
'use client';

interface Props {
  slug: string;
  titulo: string;
}

export function DeleteObraButton({ slug, titulo }: Props) {
  const handleDelete = async () => {
    if (confirm(`Excluir "${titulo}"?`)) {
      // TODO: Integrar com a API de exclusão (ex: DELETE /api/obras/[slug]) e disparar revalidação do cache
      console.log('delete', slug);
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