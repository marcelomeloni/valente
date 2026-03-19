import { api } from './api';

export interface CatalogadorResponse {
  id: number;
  admin_id: number | null;
  nome: string;
  username: string;
  created_at: string;
}

export const catalogadorService = {
  getAll: async (): Promise<CatalogadorResponse[]> => {
    return api.get<CatalogadorResponse[]>('/catalogadores');
  },
  getById: async (id: number): Promise<CatalogadorResponse> => {
    return api.get<CatalogadorResponse>(`/catalogadores/${id}`);
  },
  create: async (data: any): Promise<CatalogadorResponse> => {
    return api.post<CatalogadorResponse>('/catalogadores', data);
  },
  update: async (id: number, data: any): Promise<CatalogadorResponse> => {
    return api.put<CatalogadorResponse>(`/catalogadores/${id}`, data);
  },
  delete: async (id: number) => {
    return api.delete<any>(`/catalogadores/${id}`);
  }
};
