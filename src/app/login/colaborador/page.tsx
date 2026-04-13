"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ColaboradorLoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    setLoading(true);

    // Simulação de login (mock)
    setTimeout(() => {
      router.push("/perfil");
    }, 1200);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-md">
        
        {/* Logo */}
        <div className="mb-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-900 shadow-lg mb-6">
            <span className="font-serif text-3xl font-bold text-white">V</span>
          </div>

          <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground">
            Acesso do Colaborador
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Entre com sua conta Google para continuar
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
          
          <button
            onClick={handleLogin}
            disabled={loading}
            className="group flex w-full items-center justify-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3 font-medium text-zinc-700 transition-all hover:bg-zinc-50 hover:shadow-sm disabled:opacity-70 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-700"
          >
            {/* Ícone Google */}
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>

            {loading ? "Entrando..." : "Entrar com Google"}
          </button>

          {/* Loading bar fake */}
          {loading && (
            <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
              <div className="h-full w-1/2 animate-[loading_1s_infinite] bg-unicamp" />
            </div>
          )}
        </div>

        {/* Voltar */}
        <div className="mt-6 text-center">
          <a
            href="/login"
            className="text-sm text-zinc-500 hover:text-zinc-900 transition dark:hover:text-white"
          >
            ← Voltar
          </a>
        </div>
      </div>

      {/* animation */}
      <style jsx>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
}