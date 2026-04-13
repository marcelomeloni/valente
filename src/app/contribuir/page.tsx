"use client";

import { useRouter } from "next/navigation";
import { ObraForm, ObraFormData } from "@/components/backstage/ObraForm";

export default function ContribuirPage() {
  const router = useRouter();

  const handleSubmit = async (data: ObraFormData) => {
    console.log("SUBMISSÃO MOCK:", data);

    // 🔥 simulação de envio
    await new Promise((resolve) => setTimeout(resolve, 1000));

    alert("Submissão enviada com sucesso! 🎉");

    router.push("/perfil/submissoes");
  };

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold">
              Nova Submissão
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              Envie uma obra para análise da equipe de curadoria
            </p>
          </div>
<button
  onClick={() => router.push("/perfil")}
  className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition flex items-center gap-1"
>
  ← Ir para meu perfil
</button>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
          <ObraForm
            onSubmit={handleSubmit}
            submitLabel="Enviar submissão"
          />
        </div>
      </div>
    </div>
  );
}