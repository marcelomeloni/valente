'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { ObraForm, ObraFormData } from '@/components/backstage/ObraForm';
import { useAuth } from '@/contexts/AuthContext';
import { submissaoService } from '@/services/submissaoService';
import { obrasService } from '@/services/obrasService';

function generateSlug(titulo: string): string {
  return titulo
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 80);
}

export default function ContribuirPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reenviarId = searchParams.get('reenviar');

  const { user, isAuthenticated, isLoading } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [initialData, setInitialData] = useState<Partial<ObraFormData> | null>(null);
  const [loadingData, setLoadingData] = useState(!!reenviarId);

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }

    if (user?.role !== 'colaborador') {
      router.replace('/logout');
    }
  }, [isLoading, isAuthenticated, user, router]);

  useEffect(() => {
    if (!reenviarId) return;

    submissaoService.getById(reenviarId).then((sub) => {
      const obra = sub.obra;
      if (!obra) return;

      const temas = obra.obra_tema?.map((t: any) => t.tema?.nome).filter(Boolean) ?? [];
      const autores = obra.obra_autor?.map((a: any) => a.autor?.nome).filter(Boolean) ?? [];

      setInitialData({
        titulo: obra.titulo ?? '',
        categoria: obra.categoria ?? '',
        resumo: obra.resumo ?? '',
        url: obra.link_externo ?? '',
        ano: obra.ano ? String(obra.ano) : '',
        publicacao: obra.publicacao ?? '',
        autores,
        temas,
      });
      setLoadingData(false);
    }).catch((err) => {
      console.error('Falha ao carregar dados da submissão:', err);
      setLoadingData(false);
    });
  }, [reenviarId]);

  const handleSubmit = async (data: ObraFormData) => {
    setIsSaving(true);
    
    try {
      let pdfUrl: string | null = null;
      
      if (data.arquivo) {
        const uploadResult = await obrasService.uploadPdf(data.arquivo);
        pdfUrl = uploadResult.publicUrl;
      }

      const payload = {
        titulo: data.titulo,
        categoria: data.categoria,
        pdf: pdfUrl,
        resumo: data.resumo || null,
        link_externo: data.url || null,
        ano: Number(data.ano),
        publicacao: data.publicacao || null,
        autores: data.autores,
        temas: data.temas,
      };

      if (reenviarId) {
        await submissaoService.reenviar(reenviarId, payload);
      } else {
        await submissaoService.create({
          ...payload,
          slug: generateSlug(data.titulo),
          id_usuario: user!.id,
        });
      }

      router.push('/contribuir/sucesso');
    } catch (err: any) {
      console.error('Erro ao enviar submissão:', err);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || !isAuthenticated || loadingData || user?.role !== 'colaborador') {
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
              {reenviarId ? 'Editar Submissão' : 'Nova Submissão'}
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {reenviarId
                ? 'Corrija os dados e reenvie para análise.'
                : 'Envie uma obra para análise da equipe de curadoria do acervo.'}
            </p>
          </div>
          <button
            onClick={() => router.push('/perfil/submissoes')}
            className="group flex w-fit items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Voltar
          </button>
        </header>

        <section className="rounded-2xl border border-zinc-200 bg-white/50 p-6 shadow-sm backdrop-blur-sm sm:p-10 dark:border-zinc-800 dark:bg-zinc-900/50">
          <ObraForm
            onSubmit={handleSubmit}
            initialData={initialData ?? undefined}
            submitLabel={isSaving ? 'Enviando...' : reenviarId ? 'Reenviar submissão' : 'Enviar submissão'}
          />
        </section>
      </div>
    </main>
  );
}