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

export interface ReenviarPayload {
  titulo: string;
  categoria: string;
  pdf?: string | null;
  resumo?: string | null;
  link_externo?: string | null;
  ano?: number | string;
  publicacao?: string | null;
  autores?: string[];
  temas?: string[];
}

export interface AvaliacaoPayload {
  status: 'aprovada' | 'recusada';
  observacao?: string;
  id_catalogador: number | string;
}

export interface SubmissaoListItem {
  id: number;
  status: 'pendente' | 'aprovada' | 'recusada';
  data_submissao: string;
  id_obra: number;
  data_revisao?: string | null;
  observacao?: string | null;
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

export type SubmissaoResponse = SubmissaoDetalhe;

export interface SubmissaoActionResponse {
  message: string;
  submissao: SubmissaoDetalhe;
}

export const submissaoService = {
  // ── Escrita ────────────────────────────────────────────────────

  create: (data: SubmissaoCreatePayload) =>
    api.post<SubmissaoActionResponse>('/submissoes', data),

  reenviar: (id: number | string, data: ReenviarPayload) =>
    api.put<{ message: string }>(`/submissoes/${id}/reenviar`, data),

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

  getAll: () =>
    api.get<SubmissaoListItem[]>('/submissoes'),

  getPending: () =>
    api.get<SubmissaoListItem[]>('/submissoes/pendentes'),

  getByUserId: (id_usuario: number | string) =>
    api.get<SubmissaoListItem[]>(`/submissoes/usuario/${id_usuario}`),

  getById: (id: number | string) =>
    api.get<SubmissaoDetalhe>(`/submissoes/${id}`),
};