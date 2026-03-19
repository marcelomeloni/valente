import { api } from './api';

export interface AdminResponse {
  id: number;
  nome: string;
  username: string;
  created_at: string;
}

export const adminService = {
  getAll: async (): Promise<AdminResponse[]> => {
    return api.get<AdminResponse[]>('/admin');
  },
  getById: async (id: number): Promise<AdminResponse> => {
    return api.get<AdminResponse>(`/admin/${id}`);
  },
  create: async (data: any): Promise<AdminResponse> => {
    return api.post<AdminResponse>('/admin', data);
  },
  update: async (id: number, data: any): Promise<AdminResponse> => {
    return api.put<AdminResponse>(`/admin/${id}`, data);
  },
  delete: async (id: number) => {
    return api.delete<any>(`/admin/${id}`);
  }
};
