"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut, PenLine, BookOpen, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function PerfilPage() {
  const router = useRouter();
  const { user, logout, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login/colaborador");
    }
  }, [isLoading, isAuthenticated, router]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Erro ao realizar logout:", error);
    }
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-unicamp dark:text-red-500" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background px-6 py-10 md:py-16">
      <div className="mx-auto max-w-3xl space-y-10">
        
        <header className="flex items-center justify-between">
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Meu Perfil
          </h1>

          <button
            onClick={handleLogout}
            aria-label="Sair da conta"
            className="group flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-zinc-500 transition-colors hover:bg-red-50 hover:text-unicamp focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-unicamp dark:hover:bg-red-950/30 dark:hover:text-red-400"
          >
            Sair
            <LogOut className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </header>

        <section className="flex items-center gap-6 rounded-2xl border border-zinc-200 bg-white/50 p-6 shadow-sm backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/50">
          <img
            src={user?.avatar_url || "https://ui-avatars.com/api/?name=" + user?.nome + "&background=random"}
            alt={`Avatar de ${user?.nome}`}
            loading="lazy"
            className="h-20 w-20 rounded-full border border-zinc-200 object-cover shadow-sm dark:border-zinc-700"
          />

          <div className="flex flex-col">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              {user?.nome}
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {user?.email || "Email não informado"}
            </p>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          <button
            onClick={() => router.push("/contribuir")}
            className="group flex flex-col items-start gap-4 rounded-2xl border border-zinc-200 bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-unicamp hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-unicamp dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-unicamp"
          >
            <div className="rounded-xl bg-unicamp/10 p-3 text-unicamp transition-colors group-hover:bg-unicamp group-hover:text-white dark:bg-unicamp/20">
              <PenLine className="h-6 w-6" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                Criar nova submissão
              </h3>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                Envie uma nova obra para análise e curadoria.
              </p>
            </div>
          </button>

          <button
            onClick={() => router.push("/perfil/submissoes")}
            className="group flex flex-col items-start gap-4 rounded-2xl border border-zinc-200 bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-zinc-400 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600"
          >
            <div className="rounded-xl bg-zinc-100 p-3 text-zinc-600 transition-colors group-hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:group-hover:bg-zinc-700">
              <BookOpen className="h-6 w-6" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                Ver submissões criadas
              </h3>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                Acompanhe o status das suas submissões.
              </p>
            </div>
          </button>
        </section>

      </div>
    </main>
  );
}