"use client";

import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function SucessoPage() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <div className="space-y-6">
        <div className="flex justify-center">
          <CheckCircle2 className="h-16 w-16 text-green-500 animate-in zoom-in duration-500" />
        </div>
        
        <header className="space-y-2">
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Submissão Enviada!
          </h1>
          <p className="mx-auto max-w-xs text-zinc-500 dark:text-zinc-400">
            Sua obra foi enviada com sucesso e agora está na fila de curadoria.
          </p>
        </header>

        <div className="flex flex-col items-center gap-4 pt-4">
          <Link
            href="/perfil/submissoes"
            className="group flex items-center gap-2 rounded-full bg-unicamp px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-red-700 active:scale-95"
          >
            Acompanhar submissões
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          
          <Link
            href="/"
            className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </main>
  );
}