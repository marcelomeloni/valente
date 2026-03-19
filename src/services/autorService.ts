import { api } from './api';

export interface AutorResponse {
  id: number;
  nome: string;
}

export const autorService = {
  getAll: async (): Promise<AutorResponse[]> => {
    return api.get<AutorResponse[]>('/autores');
  },
  getById: async (id: number): Promise<AutorResponse> => {
    return api.get<AutorResponse>(`/autores/${id}`);
  },
  create: async (data: { nome: string }): Promise<AutorResponse> => {
    return api.post<AutorResponse>('/autores', data);
  },
  update: async (id: number, data: { nome: string }): Promise<AutorResponse> => {
    return api.put<AutorResponse>(`/autores/${id}`, data);
  },
  delete: async (id: number) => {
    return api.delete<any>(`/autores/${id}`);
  }
};
