// src/app/backstage/nova/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ObraForm, ObraFormData } from '@/components/backstage/ObraForm';
import { obrasService } from '@/services/obrasService';
import { autorService } from '@/services/autorService';
import { temaService } from '@/services/temaService';

function generateSlug(titulo: string): string {
  return titulo
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 80);
}

export default function NovaObraPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);

  const handleCreate = async (data: ObraFormData) => {
    setIsSaving(true);

    try {
      // ── 1. Upload do PDF (se houver) ──────────────────────────
      let pdfUrl: string | null = null;
      if (data.arquivo) {
        const uploadResult = await obrasService.uploadPdf(data.arquivo);
        pdfUrl = uploadResult.publicUrl;
      }

      // ── 2. Resolver Autores: buscar/criar IDs ─────────────────
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

      // ── 3. Resolver Temas: buscar/criar IDs ───────────────────
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

      // ── 4. Montar payload e enviar p/ backend ─────────────────
      const slug = generateSlug(data.titulo);

      const payload = {
        slug,
        titulo: data.titulo,
        categoria: data.categoria,
        pdf: pdfUrl,
        resumo: data.resumo || null,
        link_externo: data.url || null,
        ano: Number(data.ano),
        publicacao: data.publicacao || null,
        catalogador_id: user?.id || null,
        autores: autorIds,
        temas: temaIds,
      };

      await obrasService.create(payload);

      alert('Obra cadastrada com sucesso no banco de dados!');
      router.push('/backstage/obras');
    } catch (err: any) {
      console.error('Erro ao cadastrar obra:', err);
      alert('Erro ao cadastrar obra. Verifique o console para detalhes.');
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
        <h1 className="font-serif text-2xl font-bold text-zinc-900">Cadastrar nova obra</h1>
        <p className="mt-1 font-sans text-sm text-zinc-500">
          Preencha os dados da publicação para adicioná-la ao acervo.
        </p>
      </div>

      <ObraForm 
        onSubmit={handleCreate} 
        submitLabel={isSaving ? 'Salvando...' : 'Cadastrar obra'} 
      />
    </div>
  );
}