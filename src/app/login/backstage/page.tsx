'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
    <div className="flex min-h-screen flex-col justify-center bg-zinc-50 dark:bg-zinc-950 py-12 sm:px-6 lg:px-8 transition-colors">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center items-center gap-3 mb-6">
          <div className="h-8 w-2 rounded-full bg-unicamp" />
          <h1 className="font-serif text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Acervo <span className="text-unicamp">Valente</span>
          </h1>
        </div>
        <h2 className="mt-2 text-center font-serif text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Acesso Restrito
        </h2>
        <p className="mt-2 text-center text-sm text-zinc-600 dark:text-zinc-400">
          Bem-vindo catalogador. Insira suas credenciais.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-zinc-900 px-4 py-8 shadow-xl sm:rounded-2xl sm:px-10 border border-zinc-200 dark:border-zinc-800 transition-colors">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {errorMsg && (
              <div className="rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-500/10 p-4 transition-colors">
                <div className="flex items-center gap-3">
                  <svg className="h-5 w-5 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p className="text-sm font-medium text-red-600 dark:text-red-400">{errorMsg}</p>
                </div>
              </div>
            )}
            
            <div>
              <label htmlFor="username" className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-400 mb-2 transition-colors">
                Login da conta
              </label>
              <input
                id="username" 
                name="username" 
                type="text" 
                required 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full appearance-none rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-3 placeholder-zinc-400 dark:placeholder-zinc-600 text-zinc-900 dark:text-zinc-100 focus:border-unicamp focus:outline-none focus:ring-1 focus:ring-unicamp transition-colors sm:text-sm"
                placeholder="Seu usuário"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-400 mb-2 transition-colors">
                Senha
              </label>
              <input
                id="password" 
                name="password" 
                type="password" 
                autoComplete="current-password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full appearance-none rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-3 placeholder-zinc-400 dark:placeholder-zinc-600 text-zinc-900 dark:text-zinc-100 focus:border-unicamp focus:outline-none focus:ring-1 focus:ring-unicamp transition-colors sm:text-sm"
                placeholder="Sua senha"
              />
            </div>
            
            <button
              type="submit" 
              disabled={isSubmitting}
              className="flex w-full justify-center items-center rounded-xl border border-transparent bg-zinc-900 dark:bg-zinc-100 py-3.5 px-4 text-sm font-semibold text-white dark:text-zinc-900 shadow-sm transition-all hover:bg-zinc-800 dark:hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Acessando sistema...' : 'Entrar'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link 
              href="/login"
              className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-unicamp dark:text-zinc-400 dark:hover:text-unicamp transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Voltar à seleção de login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}