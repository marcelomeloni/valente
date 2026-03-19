'use client';

import { useState } from 'react';

type User = {
  id: string;
  nome: string;
  username: string;
};

const MOCK_USERS: User[] = [
  { id: '1', nome: 'Administrador Principal', username: 'admin' },
  { id: '2', nome: 'Pesquisador Valente', username: 'pesquisador' },
];

export default function AdminUsuariosPage() {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  
  const [formData, setFormData] = useState({
    nome: '',
    username: '',
    password: '',
  });

  const handleOpenModal = (user?: User) => {
    if (user) {
      setEditingUser(user);
      setFormData({ nome: user.nome, username: user.username, password: '' });
    } else {
      setEditingUser(null);
      setFormData({ nome: '', username: '', password: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Integrar com endpoint POST/PUT de usuários e hash de senha no backend
    if (editingUser) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingUser.id
            ? { ...u, nome: formData.nome, username: formData.username }
            : u
        )
      );
    } else {
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        nome: formData.nome,
        username: formData.username,
      };
      setUsers((prev) => [...prev, newUser]);
    }
    
    handleCloseModal();
  };

  const handleDelete = (id: string, nome: string) => {
    if (id === '1') {
      alert('Não é possível excluir o administrador principal.');
      return;
    }
    if (confirm(`Tem certeza que deseja remover o acesso de "${nome}"?`)) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  const inputCls = 'w-full rounded-lg border border-zinc-200 bg-white px-3.5 py-2.5 font-sans text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-colors focus:border-unicamp focus:ring-2 focus:ring-unicamp/10';
  const labelCls = 'block font-sans text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1.5';

  return (
    <div className="mx-auto max-w-5xl p-6 lg:p-8">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-serif text-2xl font-bold text-zinc-900">Usuários do Sistema</h1>
          <p className="mt-1 font-sans text-sm text-zinc-500">
            Gerencie quem tem acesso ao painel de controle do acervo.
          </p>
        </div>
        
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 rounded-xl bg-unicamp px-4 py-2.5 font-sans text-sm font-semibold text-white transition-all hover:brightness-110"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Adicionar usuário
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <table className="w-full text-left font-sans">
          <thead>
            <tr className="border-b border-zinc-100 bg-zinc-50/50">
              <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
                Nome
              </th>
              <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
                Usuário (Login)
              </th>
              <th className="px-6 py-4 text-right text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {users.map((user) => (
              <tr key={user.id} className="group transition-colors hover:bg-zinc-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-xs font-bold text-zinc-600">
                      {user.nome.charAt(0).toUpperCase()}
                    </div>
                    <p className="font-medium text-zinc-900">{user.nome}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-600">
                    @{user.username}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleOpenModal(user)}
                      className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
                      title="Editar usuário"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(user.id, user.nome)}
                      className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-600"
                      title="Remover acesso"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-xl ring-1 ring-zinc-200">
            <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-4">
              <h3 className="font-serif text-lg font-bold text-zinc-900">
                {editingUser ? 'Editar usuário' : 'Novo usuário'}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-zinc-400 transition-colors hover:text-zinc-600"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6">
              <div className="flex flex-col gap-5">
                <div>
                  <label className={labelCls}>Nome Completo</label>
                  <input
                    type="text"
                    required
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    placeholder="Ex: Maria Silva"
                    className={inputCls}
                  />
                </div>
                
                <div>
                  <label className={labelCls}>Nome de Usuário</label>
                  <input
                    type="text"
                    required
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value.toLowerCase().replace(/\s+/g, '') })}
                    placeholder="Ex: mariasilva"
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className={labelCls}>
                    {editingUser ? 'Nova Senha' : 'Senha'}
                  </label>
                  <input
                    type="password"
                    required={!editingUser}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder={editingUser ? 'Deixe em branco para manter a atual' : '••••••••'}
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="rounded-xl px-5 py-2.5 font-sans text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-zinc-900 px-6 py-2.5 font-sans text-sm font-semibold text-white transition-all hover:bg-zinc-800"
                >
                  {editingUser ? 'Salvar alterações' : 'Cadastrar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}