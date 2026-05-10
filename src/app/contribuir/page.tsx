"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { ObraForm, ObraFormData } from "@/components/backstage/ObraForm";
import { useAuth } from "@/contexts/AuthContext";
import { submissaoService } from "@/services/submissaoService";
import { obrasService } from "@/services/obrasService";

function generateSlug(titulo: string): string {
  return titulo
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 80);
}

export default function ContribuirPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login/colaborador?redirect=/contribuir");
    }
  }, [isLoading, isAuthenticated, router]);

  const handleSubmit = async (data: ObraFormData) => {
    setIsSaving(true);
    try {
      // 1. Upload do PDF (se houver)
      let pdfUrl: string | null = null;
      if (data.arquivo) {
        const uploadResult = await obrasService.uploadPdf(data.arquivo);
        pdfUrl = uploadResult.publicUrl;
      }

      // 2. Envia nomes direto — backend resolve/cria autores e temas
      await submissaoService.create({
        slug:          generateSlug(data.titulo),
        titulo:        data.titulo,
        categoria:     data.categoria,
        pdf:           pdfUrl,
        resumo:        data.resumo || null,
        link_externo:  data.url || null,
        ano:           Number(data.ano),
        publicacao:    data.publicacao || null,
        id_usuario:    user!.id,
        autores:       data.autores,  // string[]
        temas:         data.temas,    // string[]
      });

      alert("Submissão enviada com sucesso! Aguardando revisão.");
      router.push("/perfil/submissoes");
    } catch (err: any) {
      console.error("Erro ao enviar submissão:", err);
      alert("Erro ao enviar submissão. Verifique o console para detalhes.");
    } finally {
      setIsSaving(false);
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
      <div className="mx-auto max-w-4xl space-y-10">

        <header className="flex flex-col-reverse gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground">
              Nova Submissão
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Envie uma obra para análise da equipe de curadoria do acervo.
            </p>
          </div>

          <button
            onClick={() => router.push("/perfil")}
            className="group flex w-fit items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Voltar ao perfil
          </button>
        </header>

        <section className="rounded-2xl border border-zinc-200 bg-white/50 p-6 shadow-sm backdrop-blur-sm sm:p-10 dark:border-zinc-800 dark:bg-zinc-900/50">
          <ObraForm
            onSubmit={handleSubmit}
            submitLabel={isSaving ? "Enviando..." : "Enviar submissão"}
          />
        </section>

      </div>
    </main>
  );
}