import { api } from './api';

export interface SubmissaoCreatePayload {
  slug: string;
  titulo: string;
  categoria: string;
  pdf?: string | null;
  resumo?: string | null;
  link_externo?: string | null;
  ano?: number | string;
  publicacao?: string | null;
  id_usuario: number | string;
  autores?: string[];
  temas?: string[];
}

export interface AvaliacaoPayload {
  status: 'aprovada' | 'recusada';
  observacao?: string;
  id_catalogador: number | string;
}

// Shape leve — vem da listagem GET /submissoes
export interface SubmissaoListItem {
  id: number;
  status: 'pendente' | 'aprovada' | 'recusada';
  data_submissao: string;
  obra?: {
    id: number;
    titulo: string;
    categoria: string;
  };
  usuario?: {
    id: number;
    nome: string;
    email: string;
  };
}

// Shape completo — vem do detalhe GET /submissoes/:id
export interface SubmissaoDetalhe extends SubmissaoListItem {
  id_obra: number;
  id_usuario: number;
  id_catalogador?: number;
  data_revisao?: string;
  observacao?: string;
  obra?: {
    id: number;
    titulo: string;
    categoria: string;
    slug: string;
    pdf?: string | null;
    resumo?: string | null;
    link_externo?: string | null;
    ano?: number | null;
    publicacao?: string | null;
    status: string;
    obra_autor?: { autor: { id: number; nome: string } }[];
    obra_tema?:  { tema:  { id: number; nome: string } }[];
  };
  usuario?: {
    id: number;
    nome: string;
    email: string;
  };
  catalogador?: {
    id: number;
    nome: string;
  };
}

// Mantido para compatibilidade com pages que ainda usam o tipo genérico
export type SubmissaoResponse = SubmissaoDetalhe;

export interface SubmissaoActionResponse {
  message: string;
  submissao: SubmissaoDetalhe;
}

export const submissaoService = {
  // ── Escrita ────────────────────────────────────────────────────

  create: (data: SubmissaoCreatePayload) =>
    api.post<SubmissaoActionResponse>('/submissoes', data),

  aceitar: (id_submissao: number | string, id_catalogador: number | string) =>
    api.put<SubmissaoActionResponse>(`/submissoes/${id_submissao}/avaliar`, {
      status: 'aprovada',
      id_catalogador,
    }),

  recusar: (id_submissao: number | string, id_catalogador: number | string, observacao: string) =>
    api.put<SubmissaoActionResponse>(`/submissoes/${id_submissao}/avaliar`, {
      status: 'recusada',
      id_catalogador,
      observacao,
    }),

  evaluate: (id_submissao: number | string, data: AvaliacaoPayload) =>
    api.put<SubmissaoActionResponse>(`/submissoes/${id_submissao}/avaliar`, data),

  // ── Leitura ────────────────────────────────────────────────────

  // Lista leve — todas as submissões (backstage)
  getAll: () =>
    api.get<SubmissaoListItem[]>('/submissoes'),

  // Lista leve — só pendentes
  getPending: () =>
    api.get<SubmissaoListItem[]>('/submissoes/pendentes'),

  // Lista leve — por usuário (página "minhas submissões")
  getByUserId: (id_usuario: number | string) =>
    api.get<SubmissaoListItem[]>(`/submissoes/usuario/${id_usuario}`),

  // Detalhe completo — chamado só ao abrir o modal
  getById: (id: number | string) =>
    api.get<SubmissaoDetalhe>(`/submissoes/${id}`),
};