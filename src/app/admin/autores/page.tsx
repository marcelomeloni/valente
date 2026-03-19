'use client';

import { useState, useEffect } from 'react';
import { autorService, AutorResponse } from '@/services/autorService';

export default function AdminAutoresPage() {
  const [autores, setAutores] = useState<AutorResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [novoNome, setNovoNome] = useState('');
  const [editando, setEditando] = useState<number | null>(null);
  const [editNome, setEditNome] = useState('');
  const [salvando, setSalvando] = useState(false);

  async function carregar() {
    try {
      const data = await autorService.getAll();
      setAutores(data.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR')));
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }

  useEffect(() => { carregar(); }, []);

  async function handleCreate() {
    if (!novoNome.trim() || salvando) return;
    setSalvando(true);
    try {
      await autorService.create({ nome: novoNome.trim() });
      setNovoNome('');
      await carregar();
    } catch (err) { alert('Erro ao criar autor.'); }
    finally { setSalvando(false); }
  }

  async function handleUpdate(id: number) {
    if (!editNome.trim() || salvando) return;
    setSalvando(true);
    try {
      await autorService.update(id, { nome: editNome.trim() });
      setEditando(null);
      await carregar();
    } catch (err) { alert('Erro ao atualizar autor.'); }
    finally { setSalvando(false); }
  }

  async function handleDelete(id: number, nome: string) {
    if (!confirm(`Tem certeza que deseja excluir "${nome}"? Se estiver vinculado a obras, a exclusão pode falhar.`)) return;
    try {
      await autorService.delete(id);
      await carregar();
    } catch (err) { alert('Erro ao excluir. O autor pode estar vinculado a obras.'); }
  }

  return (
    <div className="mx-auto max-w-5xl p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-bold text-zinc-900">Autores</h1>
        <p className="mt-1 font-sans text-sm text-zinc-500">
          Gerencie os {autores.length} autores cadastrados no acervo.
        </p>
      </div>

      {/* Criar novo */}
      <div className="mb-6 flex gap-3">
        <input
          value={novoNome}
          onChange={(e) => setNovoNome(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
          placeholder="Nome do novo autor..."
          className="flex-1 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 font-sans text-sm text-zinc-900 placeholder-zinc-400 outline-none focus:border-unicamp focus:ring-2 focus:ring-unicamp/10"
        />
        <button
          onClick={handleCreate}
          disabled={!novoNome.trim() || salvando}
          className="flex items-center gap-2 rounded-xl bg-unicamp px-5 py-2.5 font-sans text-sm font-semibold text-white transition-all hover:brightness-110 disabled:opacity-50"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Adicionar
        </button>
      </div>

      {/* Tabela */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        {loading ? (
          <div className="p-8 text-center text-zinc-400 animate-pulse">Carregando autores...</div>
        ) : autores.length === 0 ? (
          <div className="p-8 text-center text-zinc-500">Nenhum autor cadastrado.</div>
        ) : (
          <table className="w-full text-left font-sans">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50/50">
                <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-widest text-zinc-500">ID</th>
                <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-widest text-zinc-500">Nome</th>
                <th className="px-6 py-4 text-right text-[11px] font-semibold uppercase tracking-widest text-zinc-500">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {autores.map((autor) => (
                <tr key={autor.id} className="group transition-colors hover:bg-zinc-50">
                  <td className="px-6 py-3 text-sm tabular-nums text-zinc-400 w-16">{autor.id}</td>
                  <td className="px-6 py-3">
                    {editando === autor.id ? (
                      <div className="flex gap-2">
                        <input
                          value={editNome}
                          onChange={(e) => setEditNome(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleUpdate(autor.id)}
                          className="flex-1 rounded-lg border border-zinc-200 px-3 py-1.5 text-sm outline-none focus:border-unicamp"
                          autoFocus
                        />
                        <button onClick={() => handleUpdate(autor.id)} className="rounded-lg bg-unicamp px-3 py-1.5 text-xs font-semibold text-white hover:brightness-110">Salvar</button>
                        <button onClick={() => setEditando(null)} className="rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-100">Cancelar</button>
                      </div>
                    ) : (
                      <span className="text-sm font-medium text-zinc-900">{autor.nome}</span>
                    )}
                  </td>
                  <td className="px-6 py-3 text-right">
                    {editando !== autor.id && (
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => { setEditando(autor.id); setEditNome(autor.nome); }}
                          className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
                          title="Editar"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </button>
                        <button
                          onClick={() => handleDelete(autor.id, autor.nome)}
                          className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-600"
                          title="Excluir"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
