'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { adminService } from '@/services/adminService';
import { catalogadorService } from '@/services/catalogadorService';

type User = {
  id: string;
  nome: string;
  username: string;
  role: 'admin' | 'catalogador';
};

export default function AdminUsuariosPage() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  
  const [formData, setFormData] = useState({
    nome: '',
    username: '',
    password: '',
    role: 'catalogador' as 'admin' | 'catalogador'
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [adminsData, catsData] = await Promise.all([
        adminService.getAll().catch(() => []),
        catalogadorService.getAll().catch(() => [])
      ]);
      
      const merged = [
        ...adminsData.map((a: any) => ({ ...a, id: String(a.id), role: 'admin' })),
        ...catsData.map((c: any) => ({ ...c, id: String(c.id), role: 'catalogador' }))
      ];
      setUsers(merged as User[]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenModal = (user?: User) => {
    if (user) {
      setEditingUser(user);
      setFormData({ nome: user.nome, username: user.username, password: '', role: user.role });
    } else {
      setEditingUser(null);
      setFormData({ nome: '', username: '', password: '', role: 'catalogador' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingUser) {
        // Update logic (Omitted complex role switching for safety; assume name/pass updates)
        if (editingUser.role === 'admin') {
          await adminService.update(Number(editingUser.id), { nome: formData.nome, username: formData.username, senha: formData.password });
        } else {
          await catalogadorService.update(Number(editingUser.id), { nome: formData.nome, username: formData.username, senha: formData.password });
        }
        alert('Usuário atualizado com sucesso no banco de dados!');
      } else {
        // Create logic
        if (formData.role === 'admin') {
          await adminService.create({ nome: formData.nome, username: formData.username, senha: formData.password });
        } else {
          await catalogadorService.create({ admin_id: Number(currentUser?.id) || null, nome: formData.nome, username: formData.username, senha: formData.password });
        }
        alert('Usuário cadastrado com sucesso!');
      }
      
      await loadData();
      handleCloseModal();
    } catch (err) {
      console.error('Erro ao salvar usuário:', err);
      alert('Ocorreu um erro ao salvar (Verifique duplicidades no username).');
    }
  };

  const handleDelete = async (user: User) => {
    if (user.role === 'admin' && users.filter((u) => u.role === 'admin').length === 1) {
      alert('Não é possível excluir o único administrador do banco de dados.');
      return;
    }
    
    if (confirm(`Tem certeza que deseja remover permanentemente o acesso de "${user.nome}"?`)) {
      try {
        if (user.role === 'admin') {
          await adminService.delete(Number(user.id));
        } else {
          await catalogadorService.delete(Number(user.id));
        }
        await loadData();
      } catch (err) {
        alert('Erro ao excluir usuário.');
      }
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
            Gerencie autenticação de administradores e catalogadores da Base de Dados.
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
              <th className="px-6 py-4 text-center text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
                Cargo
              </th>
              <th className="px-6 py-4 text-right text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {loading ? (
              <tr><td colSpan={4} className="px-6 py-8 text-center text-sm text-zinc-500 animate-pulse">Consultando APIs...</td></tr>
            ) : users.length === 0 ? (
               <tr><td colSpan={4} className="px-6 py-8 text-center text-sm text-zinc-500">Nenhum registro encontrado.</td></tr>
            ) : users.map((user) => (
              <tr key={user.username} className="group transition-colors hover:bg-zinc-50">
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
                <td className="px-6 py-4 text-center">
                  <span className={`inline-flex rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${user.role === 'admin' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 'bg-zinc-100 text-zinc-500 border border-zinc-200'}`}>
                    {user.role}
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
                      onClick={() => handleDelete(user)}
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
                {editingUser ? 'Editar credenciais' : 'Cadastrar na Base'}
              </h3>
              <button onClick={handleCloseModal} className="text-zinc-400 transition-colors hover:text-zinc-600">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6">
              <div className="flex flex-col gap-5">
                <div>
                  <label className={labelCls}>Nome Completo</label>
                  <input type="text" required value={formData.nome} onChange={(e) => setFormData({ ...formData, nome: e.target.value })} placeholder="Ex: Maria Silva" className={inputCls} />
                </div>
                
                <div>
                  <label className={labelCls}>Login de Autorização (Username)</label>
                  <input type="text" required value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value.toLowerCase().replace(/\s+/g, '') })} placeholder="mariasilva" className={inputCls} />
                </div>
                
                {!editingUser && (
                  <div>
                    <label className={labelCls}>Privilégios da Tabela</label>
                    <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value as 'admin' | 'catalogador' })} className={inputCls}>
                      <option value="catalogador">Catalogador Secundário</option>
                      <option value="admin">Administrador Geral</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className={labelCls}>
                    {editingUser ? 'Sobrescrever Criptografia da Senha (Opcional)' : 'Senha de Criptografia'}
                  </label>
                  <input type="password" required={!editingUser} value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} placeholder={editingUser ? 'Deixe vazio para não trocar o Hash' : '••••••••'} className={inputCls} />
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button type="button" onClick={handleCloseModal} className="rounded-xl px-5 py-2.5 font-sans text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100">
                  Voltar
                </button>
                <button type="submit" className="rounded-xl bg-zinc-900 px-6 py-2.5 font-sans text-sm font-semibold text-white transition-all hover:bg-zinc-800">
                  {editingUser ? 'Registrar Modificações' : 'Aprovar Privilégios'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
