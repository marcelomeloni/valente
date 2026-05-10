"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  FileCheck,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  PencilLine,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { submissaoService, SubmissaoResponse } from "@/services/submissaoService";

const getStatusConfig = (status: string) => {
  const configs: Record<string, { label: string; style: string; Icon: React.ElementType }> = {
    aprovada: {
      label: "Aprovado",
      style: "bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/20",
      Icon: CheckCircle2,
    },
    pendente: {
      label: "Em análise",
      style: "bg-yellow-50 text-yellow-800 ring-yellow-600/20 dark:bg-yellow-500/10 dark:text-yellow-400 dark:ring-yellow-500/20",
      Icon: Clock,
    },
    recusada: {
      label: "Rejeitado",
      style: "bg-red-50 text-red-700 ring-red-600/10 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-500/20",
      Icon: XCircle,
    },
  };

  return configs[status] ?? {
    label: status,
    style: "bg-zinc-50 text-zinc-700 ring-zinc-500/10 dark:bg-zinc-800 dark:text-zinc-400",
    Icon: Clock,
  };
};

function formatDate(dateStr?: string | null): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("pt-BR");
}

export default function SubmissoesPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();

  const [submissoes, setSubmissoes] = useState<SubmissaoResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading || !user?.id) return;

    submissaoService
      .getByUserId(user.id)
      .then(setSubmissoes)
      .catch((err) => setError(err.message ?? "Erro ao carregar submissões."))
      .finally(() => setIsLoading(false));
  }, [user?.id, authLoading]);

  return (
    <main className="min-h-screen bg-background px-6 py-10 md:py-16">
      <div className="mx-auto max-w-4xl space-y-10">

        <header className="flex flex-col-reverse gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground">
              Minhas Submissões
            </h1>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Acompanhe o status e feedback das suas obras enviadas.
            </p>
          </div>

          <button
            onClick={() => router.push("/perfil")}
            className="group flex w-fit items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Voltar
          </button>
        </header>

        <section className="space-y-4">

          {/* Loading */}
          {isLoading && (
            <div className="flex justify-center py-16">
              <Loader2 className="h-7 w-7 animate-spin text-zinc-400" />
            </div>
          )}

          {/* Erro */}
          {!isLoading && error && (
            <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-400">
              <AlertCircle className="h-5 w-5 shrink-0" />
              {error}
            </div>
          )}

          {/* Lista vazia */}
          {!isLoading && !error && submissoes.length === 0 && (
            <div className="flex flex-col items-center gap-3 py-16 text-center text-zinc-400">
              <FileCheck className="h-10 w-10 opacity-40" />
              <p className="text-sm">Você ainda não enviou nenhuma submissão.</p>
            </div>
          )}

          {/* Lista */}
          {!isLoading && !error && submissoes.map((item) => {
            const { label, style, Icon: StatusIcon } = getStatusConfig(item.status);
            const titulo = item.obra?.titulo ?? `Obra #${item.id_obra}`;

            return (
              <article
                key={item.id}
                className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/50"
              >
                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                      {titulo}
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-zinc-500 dark:text-zinc-400">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        <span>Submetido em {formatDate(item.data_submissao)}</span>
                      </div>

                      {item.data_revisao && (
                        <div className="flex items-center gap-1.5">
                          <FileCheck className="h-4 w-4" />
                          <span>Revisado em {formatDate(item.data_revisao)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${style}`}>
                    <StatusIcon className="h-3.5 w-3.5" />
                    {label}
                  </span>
                </div>

                {item.status === "recusada" && item.observacao && (
                  <div className="mt-2 flex gap-3 rounded-xl bg-red-50 p-4 dark:bg-red-950/30">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600 dark:text-red-400" />
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium text-red-800 dark:text-red-300">
                        Motivo da rejeição
                      </h4>
                      <p className="text-sm leading-relaxed text-red-700/90 dark:text-red-400/90">
                        {item.observacao}
                      </p>
                    </div>
                  </div>
                )}

                {item.status === "recusada" && (
                  <div className="mt-2 flex">
                    <button className="group flex items-center gap-2 rounded-lg text-sm font-medium text-unicamp transition-colors hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-unicamp focus-visible:ring-offset-2 dark:hover:text-red-400">
                      <PencilLine className="h-4 w-4" />
                      <span className="underline-offset-4 group-hover:underline">
                        Editar e reenviar
                      </span>
                    </button>
                  </div>
                )}
              </article>
            );
          })}

        </section>
      </div>
    </main>
  );
}