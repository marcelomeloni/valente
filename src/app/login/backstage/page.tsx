'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { authService } from '@/services/authService';

export default function CatalogadorLoginPage() {
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
      const response = await authService.loginCatalogador({ username, password });
      login(response.token, response.user);
      router.push('/backstage');
    } catch (err: any) {
      setErrorMsg(err.response?.data?.error || 'Acesso restrito bloqueado.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-zinc-50 py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center font-serif text-3xl font-bold tracking-tight text-zinc-900">
          Acesso Restrito
        </h2>
        <p className="mt-2 text-center text-sm text-zinc-500">
          Bem-vindo catalogador. Insira suas credenciais.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow-xl shadow-zinc-200/40 sm:rounded-2xl sm:px-10 border border-zinc-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {errorMsg && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                <div className="flex items-center gap-3">
                  <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p className="text-sm font-medium text-red-800">{errorMsg}</p>
                </div>
              </div>
            )}
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-zinc-700">Login da conta</label>
              <div className="mt-2">
                <input
                  id="username" name="username" type="text" required value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full appearance-none rounded-xl border border-zinc-200 px-4 py-3 placeholder-zinc-400 focus:border-unicamp focus:outline-none focus:ring-1 focus:ring-unicamp transition-colors sm:text-sm"
                  placeholder="Seu usuário"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-zinc-700">Senha criptografada</label>
              <div className="mt-2">
                <input
                  id="password" name="password" type="password" autoComplete="current-password" required value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full appearance-none rounded-xl border border-zinc-200 px-4 py-3 placeholder-zinc-400 focus:border-unicamp focus:outline-none focus:ring-1 focus:ring-unicamp transition-colors sm:text-sm"
                  placeholder="Sua senha secreta"
                />
              </div>
            </div>
            <div>
              <button
                type="submit" disabled={isSubmitting}
                className="flex w-full justify-center rounded-xl border border-transparent bg-zinc-900 py-3.5 px-4 text-sm font-bold text-white shadow-sm hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Acessando sistema...' : 'Ligar Backstage'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
