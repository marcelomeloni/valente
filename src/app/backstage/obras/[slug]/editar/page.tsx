// src/app/backstage/obras/[slug]/editar/page.tsx
'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ObraForm, type ObraFormData } from '@/components/backstage/ObraForm';
import { obrasService } from '@/services/obrasService';
import { autorService } from '@/services/autorService';
import { temaService } from '@/services/temaService';

interface Props {
  params: Promise<{ slug: string }>;
}

function generateSlug(titulo: string): string {
  return titulo
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 80);
}

export default function EditarObraPage({ params }: Props) {
  const router = useRouter();
  const { user } = useAuth();
  const { slug } = use(params);
  
  const [obraOriginal, setObraOriginal] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const list = await obrasService.getAll();
        const found = list.find((o) => o.slug === slug);
        setObraOriginal(found);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  if (loading) {
     return <div className="p-8 text-zinc-400 animate-pulse">Carregando editor...</div>;
  }

  if (!obraOriginal) {
    return (
      <div className="mx-auto max-w-5xl p-6 lg:p-8">
        <h1 className="font-serif text-2xl font-bold text-zinc-900">Obra não encontrada</h1>
      </div>
    );
  }

  const initialData: Partial<ObraFormData> = {
    titulo: obraOriginal.titulo,
    categoria: obraOriginal.categoria,
    autores: obraOriginal.autores,
    ano: String(obraOriginal.ano),
    publicacao: obraOriginal.publicacao ?? '',
    resumo: obraOriginal.resumo ?? '',
    temas: obraOriginal.temas,
    url: obraOriginal.link_externo ?? '',
    arquivo: null,
  };

  const handleUpdate = async (data: ObraFormData) => {
    setIsSaving(true);

    try {
      // ── 1. Upload do PDF (se anexou um novo) ──────────────────
      let pdfUrl: string | null = obraOriginal.pdf || null;
      if (data.arquivo) {
        const uploadResult = await obrasService.uploadPdf(data.arquivo);
        pdfUrl = uploadResult.publicUrl;
      }

      // ── 2. Resolver Autores ───────────────────────────────────
      const allAutores = await autorService.getAll();
      const autorIds: number[] = [];
      for (const nomeAutor of data.autores) {
        const trimmed = nomeAutor.trim();
        if (!trimmed) continue;
        const existing = allAutores.find(
          (a) => a.nome.toLowerCase() === trimmed.toLowerCase()
        );
        if (existing) {
          autorIds.push(existing.id);
        } else {
          const created = await autorService.create({ nome: trimmed });
          autorIds.push(created.id);
        }
      }

      // ── 3. Resolver Temas ─────────────────────────────────────
      const allTemas = await temaService.getAll();
      const temaIds: number[] = [];
      for (const nomeTema of data.temas) {
        const trimmed = nomeTema.trim();
        if (!trimmed) continue;
        const existing = allTemas.find(
          (t) => t.nome.toLowerCase() === trimmed.toLowerCase()
        );
        if (existing) {
          temaIds.push(existing.id);
        } else {
          const created = await temaService.create({ nome: trimmed });
          temaIds.push(created.id);
        }
      }

      // ── 4. Atualizar obra ─────────────────────────────────────
      const newSlug = generateSlug(data.titulo);

      await obrasService.update(obraOriginal.id, {
        slug: newSlug,
        titulo: data.titulo,
        categoria: data.categoria,
        pdf: pdfUrl,
        resumo: data.resumo || null,
        link_externo: data.url || null,
        ano: Number(data.ano),
        publicacao: data.publicacao || null,
      });

      // TODO: Atualizar relações autores/temas (requer endpoint backend dedicado)

      alert('Obra atualizada com sucesso!');
      router.push('/backstage/obras');
    } catch (err: any) {
      console.error('Erro ao atualizar obra:', err);
      alert('Erro ao atualizar. Verifique o console.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl p-6 lg:p-8">
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="mb-4 flex items-center gap-1.5 font-sans text-xs font-medium text-zinc-400 transition-colors hover:text-zinc-700"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Voltar
        </button>
        <h1 className="font-serif text-2xl font-bold text-zinc-900">Editar obra</h1>
        <p className="mt-1 font-sans text-sm text-zinc-500">
          Atualize as informações de &quot;{obraOriginal.titulo}&quot;.
        </p>
      </div>

      <ObraForm 
        initialData={initialData} 
        onSubmit={handleUpdate} 
        submitLabel={isSaving ? 'Salvando...' : 'Salvar alterações'} 
      />
    </div>
  );
}