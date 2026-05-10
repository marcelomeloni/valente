"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function ColaboradorLoginPage() {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const { loginGoogle } = useAuth();

  // Pega a intenção de redirecionamento da URL ou manda pro perfil por padrão
  const redirect = searchParams.get("redirect") || "/perfil";

  const handleLogin = async () => {
    try {
      setLoading(true);
      await loginGoogle(redirect);
    } catch (error) {
      console.error("Erro na autenticação:", error);
      setLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      
      <section className="flex flex-col justify-center bg-background px-6 py-12 sm:px-12 md:px-16 lg:px-24 xl:px-32">
        <div className="mx-auto w-full max-w-sm space-y-12">
          
          <header className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="h-8 w-1.5 rounded-full bg-unicamp" />
              <span className="font-serif text-2xl font-bold tracking-tight text-foreground">
                Acervo <span className="text-unicamp">Valente</span>
              </span>
            </div>
            
            <div className="space-y-3">
              <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Contribua com o Acervo
              </h1>
              <p className="text-base text-zinc-500 dark:text-zinc-400">
                Faça login para submeter obras, documentos e pesquisas para nossa curadoria digital.
              </p>
            </div>
          </header>

          <div className="space-y-6">
            <button
              onClick={handleLogin}
              disabled={loading}
              className="group relative flex w-full items-center justify-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-4 text-sm font-semibold text-zinc-700 shadow-sm transition-all hover:border-unicamp/30 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-unicamp disabled:cursor-not-allowed disabled:opacity-70 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-unicamp/50 dark:hover:bg-zinc-800"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin text-unicamp" />
              ) : (
                <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
              )}
              {loading ? "Preparando seu espaço..." : "Entrar como Colaborador"}
            </button>
          </div>
          
        </div>
      </section>

      <section className="relative hidden flex-col justify-between overflow-hidden bg-zinc-950 p-12 text-white lg:flex xl:p-20 dark:bg-black">
        
        <div className="absolute -left-1/4 top-0 h-[800px] w-[800px] rounded-full bg-unicamp/15 blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
        
        <div className="relative z-10 flex flex-1 flex-col justify-end max-w-xl space-y-8">
          <div className="space-y-4">
            <blockquote className="font-serif text-3xl leading-snug text-zinc-100 antialiased">
              &ldquo;A democratização do conhecimento começa com a colaboração ativa da comunidade acadêmica.&rdquo;
            </blockquote>
          </div>
          
          <div className="flex items-center gap-4 border-t border-white/10 pt-6">
            <p className="text-sm font-medium tracking-wide text-zinc-400 uppercase">
              Plataforma de Submissão <span className="mx-2 text-zinc-700">|</span> Colaboradores
            </p>
          </div>
        </div>

      </section>
      
    </main>
  );
}