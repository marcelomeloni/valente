"use client";

import { useRouter } from "next/navigation";

export default function PerfilPage() {
  const router = useRouter();

  // 🔥 MOCK DATA DIRETO NA PAGE
  const user = {
    name: "Marcelo Meloni",
    email: "marcelo@acervo.com",
    image: "https://i.pravatar.cc/150?img=12",
  };

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Meu Perfil
          </h1>

          <button
            onClick={() => router.push("/login")}
            className="text-sm text-zinc-500 hover:text-red-500 transition"
          >
            Sair
          </button>
        </div>

        {/* Card usuário */}
        <div className="mb-10 flex items-center gap-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
          <img
            src={user.image}
            alt="avatar"
            className="h-20 w-20 rounded-full object-cover border border-zinc-200"
          />

          <div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              {user.name}
            </h2>
            <p className="text-sm text-zinc-500">
              {user.email}
            </p>
          </div>
        </div>

        {/* Ações */}
        <div className="grid gap-6 sm:grid-cols-2">

          {/* Criar submissão */}
<button
  onClick={() => router.push("/contribuir")}
  className="group flex flex-col items-start gap-3 rounded-2xl border border-zinc-200 bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-unicamp hover:shadow-lg active:scale-[0.98] cursor-pointer dark:bg-zinc-900 dark:border-zinc-800"
>
  <div className="rounded-xl bg-unicamp/10 p-3">
    ✍️
  </div>

  <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
    Criar nova submissão
  </h3>

  <p className="text-sm text-zinc-500">
    Envie uma nova obra para análise e curadoria
  </p>
</button>

          {/* Ver submissões */}
          <button
            onClick={() => router.push("/perfil/submissoes")}
            className="group flex flex-col items-start gap-3 rounded-2xl border border-zinc-200 bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-zinc-900 hover:shadow-lg dark:bg-zinc-900 dark:border-zinc-800"
          >
            <div className="rounded-xl bg-zinc-100 p-3 dark:bg-zinc-800">
              📚
            </div>

            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Ver submissões criadas
            </h3>

            <p className="text-sm text-zinc-500">
              Acompanhe o status das suas submissões
            </p>
          </button>

        </div>
      </div>
    </div>
  );
}