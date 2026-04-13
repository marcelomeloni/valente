"use client";

import { useRouter } from "next/navigation";

export default function SubmissoesPage() {
  const router = useRouter();

  // 🔥 MOCK baseado no teu schema REAL
  const submissoes = [
    {
      id: 1,
      titulo: "Educação e Tecnologia no Brasil",
      status: "aprovado",
      data_submissao: "12/03/2026",
      data_revisao: "15/03/2026",
      observacao: null,
    },
    {
      id: 2,
      titulo: "Ambientes Virtuais de Aprendizagem",
      status: "em_analise",
      data_submissao: "02/04/2026",
      data_revisao: null,
      observacao: null,
    },
    {
      id: 3,
      titulo: "Metodologias Ativas no Ensino Superior",
      status: "rejeitado",
      data_submissao: "18/02/2026",
      data_revisao: "20/02/2026",
      observacao:
        "O trabalho não apresenta referências suficientes e carece de fundamentação teórica consistente.",
    },
  ];

  const getStatusUI = (status: string) => {
    switch (status) {
      case "aprovado":
        return {
          label: "Aprovado",
          style: "bg-green-100 text-green-700",
        };
      case "em_analise":
        return {
          label: "Em análise",
          style: "bg-yellow-100 text-yellow-700",
        };
      case "rejeitado":
        return {
          label: "Rejeitado",
          style: "bg-red-100 text-red-700",
        };
      default:
        return {
          label: status,
          style: "bg-zinc-100 text-zinc-700",
        };
    }
  };

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold">
              Minhas Submissões
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              Acompanhe o status e feedback das suas obras enviadas
            </p>
          </div>

          <button
            onClick={() => router.push("/perfil")}
            className="text-sm text-zinc-500 hover:text-zinc-900"
          >
            ← Voltar
          </button>
        </div>

        {/* Lista */}
        <div className="space-y-6">

          {submissoes.map((item) => {
            const status = getStatusUI(item.status);

            return (
              <div
                key={item.id}
                className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:bg-zinc-900 dark:border-zinc-800"
              >
                {/* Top */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                      {item.titulo}
                    </h3>

                    <div className="mt-2 flex flex-wrap gap-4 text-xs text-zinc-500">
                      <span>📅 Submetido em {item.data_submissao}</span>

                      {item.data_revisao && (
                        <span>🧾 Revisado em {item.data_revisao}</span>
                      )}
                    </div>
                  </div>

                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ${status.style}`}
                  >
                    {status.label}
                  </span>
                </div>

                {/* Feedback de rejeição */}
                {item.status === "rejeitado" && item.observacao && (
                  <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4">
                    <p className="text-xs font-semibold text-red-600 mb-1">
                      Motivo da rejeição
                    </p>
                    <p className="text-sm text-red-700 leading-relaxed">
                      {item.observacao}
                    </p>
                  </div>
                )}

                {/* Ação futura (UX já preparada) */}
                {item.status === "rejeitado" && (
                  <div className="mt-4">
                    <button className="text-xs font-medium text-unicamp hover:underline">
                      Editar e reenviar
                    </button>
                  </div>
                )}
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}