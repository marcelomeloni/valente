import { api } from './api';

export interface TemaResponse {
  id: number;
  nome: string;
}

export const temaService = {
  getAll: async (): Promise<TemaResponse[]> => {
    return api.get<TemaResponse[]>('/temas');
  },
  getById: async (id: number): Promise<TemaResponse> => {
    return api.get<TemaResponse>(`/temas/${id}`);
  },
  create: async (data: { nome: string }): Promise<TemaResponse> => {
    return api.post<TemaResponse>('/temas', data);
  },
  update: async (id: number, data: { nome: string }): Promise<TemaResponse> => {
    return api.put<TemaResponse>(`/temas/${id}`, data);
  },
  delete: async (id: number) => {
    return api.delete<any>(`/temas/${id}`);
  }
};
