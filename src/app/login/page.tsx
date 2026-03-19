'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const username = formData.get('username');
    const password = formData.get('password');

    // FIXME: Substituir por chamada real de autenticação (NextAuth/IronSession)
    setTimeout(() => {
      if (username === 'admin' && password === 'admin') {
        router.push('/backstage');
      } else {
        setError('Credenciais inválidas. Utilize admin / admin para testar.');
        setIsLoading(false);
      }
    }, 800);
  };

  const inputCls =
    'w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 font-sans text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-all focus:border-unicamp focus:bg-white focus:ring-4 focus:ring-unicamp/10';
  const labelCls =
    'mb-2 block font-sans text-xs font-semibold uppercase tracking-wider text-zinc-500';

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-4 sm:p-8">
      <Link 
        href="/"
        className="mb-8 flex items-center gap-3 transition-opacity hover:opacity-80"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-unicamp shadow-sm">
          <span className="font-serif text-xl font-bold text-white">V</span>
        </div>
        <span className="font-sans text-xl font-bold tracking-tight text-zinc-900">
          Acervo Valente
        </span>
      </Link>

      <div className="w-full max-w-[400px] rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm sm:p-10">
        <div className="mb-8 text-center">
          <h1 className="font-serif text-2xl font-bold text-zinc-900">
            Acesso Restrito
          </h1>
          <p className="mt-2 font-sans text-sm text-zinc-500">
            Faça login para gerenciar o acervo digital.
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
            <label htmlFor="username" className={labelCls}>
              Usuário
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              autoComplete="username"
              placeholder="Digite seu usuário"
              className={inputCls}
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="password" className={labelCls}>
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className={inputCls}
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-center">
              <p className="font-sans text-sm font-medium text-red-600">
                {error}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 flex w-full items-center justify-center rounded-xl bg-zinc-900 py-3.5 font-sans text-sm font-semibold text-white transition-all hover:bg-zinc-800 focus:outline-none focus:ring-4 focus:ring-zinc-900/10 disabled:opacity-70"
          >
            {isLoading ? (
              <svg className="h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              'Entrar no sistema'
            )}
          </button>
        </form>
      </div>

      <p className="mt-8 font-sans text-xs text-zinc-400">
        &copy; {new Date().getFullYear()} NIED - Unicamp.
      </p>
    </div>
  );
}