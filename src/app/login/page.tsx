import Link from 'next/link';

export default function LoginHubPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 py-12 px-6 font-sans">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-900 shadow-xl shadow-zinc-900/20 mb-8">
          <span className="font-serif text-3xl font-bold text-white">V</span>
        </div>
        <h1 className="font-serif text-3xl font-bold tracking-tight text-zinc-900 mb-3">Portal de Acesso Livre</h1>
        <p className="text-zinc-500 mb-10 text-sm">Selecione o seu núcleo de operação para realizar o login.</p>

        <div className="grid gap-5">
          <Link 
            href="/login/admin" 
            className="group relative flex flex-col items-center gap-2 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-zinc-950 hover:shadow-xl hover:shadow-zinc-900/20 hover:border-zinc-950"
          >
            <div className="rounded-full bg-zinc-100 p-3 group-hover:bg-zinc-800 transition-colors mb-2">
              <svg className="h-6 w-6 text-zinc-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-bold text-zinc-900 group-hover:text-white transition-colors">Núcleo Administrativo</h3>
            <p className="text-xs text-zinc-500 group-hover:text-zinc-400">Acesso root global para gestão sistêmica</p>
          </Link>
          
          <Link 
            href="/login/backstage" 
            className="group relative flex flex-col items-center gap-2 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-unicamp hover:shadow-xl hover:shadow-unicamp/20 hover:border-unicamp"
          >
            <div className="rounded-full bg-zinc-100 p-3 group-hover:bg-red-800 transition-colors mb-2">
              <svg className="h-6 w-6 text-zinc-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="font-bold text-zinc-900 group-hover:text-white transition-colors">Ambiente Catalogador</h3>
            <p className="text-xs text-zinc-500 group-hover:text-red-100">Painel Backstage exclusivo para listagem de Obras</p>
          </Link>
        </div>
      </div>
    </div>
  );
}