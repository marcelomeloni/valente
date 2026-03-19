export default function AdminAuthorsPage() {
  return (
    <div className="mx-auto max-w-5xl p-6 lg:p-8">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-serif text-2xl font-bold text-zinc-900">Autores</h1>
          <p className="mt-1 font-sans text-sm text-zinc-500">
            Gerencie os autores das obras cadastradas no acervo.
          </p>
        </div>
        
        <button
          className="flex items-center gap-2 rounded-xl bg-unicamp px-4 py-2.5 font-sans text-sm font-semibold text-white transition-all hover:brightness-110"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Adicionar Autor
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white p-8 text-center text-zinc-500 shadow-sm">
        <p>A tabela consolidada de Autores aparecerá aqui.</p>
      </div>
    </div>
  );
}
