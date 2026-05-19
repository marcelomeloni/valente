'use client';

import Link from 'next/link';

export default function LoginHubPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 py-12 px-6 transition-colors">
      <div className="w-full max-w-md text-center">
        
        <Link 
          href="/" 
          className="inline-flex justify-center items-center gap-3 mb-8 transition-opacity hover:opacity-80 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-unicamp focus-visible:ring-offset-4 dark:focus-visible:ring-offset-zinc-950"
        >
          <div className="h-8 w-2 rounded-full bg-unicamp" />
          <h1 className="font-serif text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Acervo <span className="text-unicamp">Valente</span>
          </h1>
        </Link>

        <h2 className="font-serif text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-3">
          Portal de Acesso
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-10">
          Selecione o seu perfil de operação para realizar o login.
        </p>

        <div className="mb-8">
          <Link 
            href="/login/colaborador" 
            className="group relative flex flex-col items-center gap-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 dark:hover:border-blue-900/50 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 hover:shadow-xl hover:shadow-blue-900/5 dark:hover:shadow-blue-900/20"
          >
            <div className="rounded-full bg-white dark:bg-zinc-950 p-3 shadow-sm border border-zinc-100 dark:border-zinc-800 transition-transform duration-300 group-hover:scale-110 mb-1">
              <svg className="h-6 w-6" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            </div>
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 transition-colors">Entrar como Colaborador</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Acesso livre via Google para submeter e acompanhar obras</p>
          </Link>
        </div>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-zinc-200 dark:border-zinc-800 transition-colors" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-zinc-50 dark:bg-zinc-950 px-3 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 transition-colors">
              Acesso Restrito Interno
            </span>
          </div>
        </div>

        <div className="grid gap-5">
          <Link 
            href="/login/admin" 
            className="group relative flex flex-col items-center gap-2 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-zinc-950 dark:hover:bg-zinc-100 hover:border-zinc-950 dark:hover:border-zinc-100 hover:shadow-xl hover:shadow-zinc-900/20 dark:hover:shadow-white/10"
          >
            <div className="rounded-full bg-zinc-100 dark:bg-zinc-800 p-3 group-hover:bg-zinc-800 dark:group-hover:bg-zinc-200 transition-colors mb-2">
              <svg className="h-6 w-6 text-zinc-600 dark:text-zinc-300 group-hover:text-white dark:group-hover:text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-white dark:group-hover:text-zinc-900 transition-colors">Núcleo Administrativo</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-400 dark:group-hover:text-zinc-600 transition-colors">Acesso root global para gestão sistêmica</p>
          </Link>
          
          <Link 
            href="/login/backstage" 
            className="group relative flex flex-col items-center gap-2 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-unicamp hover:border-unicamp hover:shadow-xl hover:shadow-unicamp/20"
          >
            <div className="rounded-full bg-zinc-100 dark:bg-zinc-800 p-3 group-hover:bg-red-800 transition-colors mb-2">
              <svg className="h-6 w-6 text-zinc-600 dark:text-zinc-300 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-white transition-colors">Equipe de Curadoria</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 group-hover:text-red-100 transition-colors">Painel exclusivo para revisão e aprovação de obras</p>
          </Link>
        </div>

      </div>
    </div>
  );
}
