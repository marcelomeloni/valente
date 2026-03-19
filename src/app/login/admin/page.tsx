'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { authService } from '@/services/authService';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const response = await authService.loginAdmin({ username, password });
      login(response.token, response.user);
      router.push('/admin');
    } catch (err: any) {
      setErrorMsg(err.response?.data?.error || 'Acesso negado para o núcleo Administrativo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-zinc-950 py-12 sm:px-6 lg:px-8 font-sans transition-colors">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
           <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 shadow-lg shadow-indigo-600/30">
              <span className="font-serif text-2xl font-bold text-white">V</span>
           </div>
        </div>
        <h2 className="mt-2 text-center font-serif text-3xl font-bold tracking-tight text-white">
          Administração Central
        </h2>
        <p className="mt-2 text-center text-sm text-zinc-400">
          Credenciais restritas ao núcleo gerencial.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-zinc-900 px-4 py-8 shadow-2xl sm:rounded-2xl sm:px-10 border border-zinc-800">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {errorMsg && (
              <div className="rounded-xl border border-red-900/50 bg-red-500/10 p-4">
                <div className="flex items-center gap-3">
                  <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p className="text-sm font-medium text-red-400">{errorMsg}</p>
                </div>
              </div>
            )}
            <div>
              <label htmlFor="username" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">Login Master</label>
              <input
                id="username" name="username" type="text" required value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full appearance-none rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 placeholder-zinc-600 text-zinc-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors sm:text-sm"
                placeholder="@username"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">Chave de Acesso</label>
              <input
                id="password" name="password" type="password" required value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full appearance-none rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 placeholder-zinc-600 text-zinc-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors sm:text-sm"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit" disabled={isSubmitting}
              className="flex w-full justify-center rounded-xl border border-transparent bg-indigo-600 py-3.5 px-4 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Validando...' : 'Liberar Painel Mestre'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
