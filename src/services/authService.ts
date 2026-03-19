import { api } from './api';

export const authService = {
  loginAdmin: async (credentials: any) => {
    return api.post<any>('/auth/login/admin', credentials);
  },
  loginCatalogador: async (credentials: any) => {
    return api.post<any>('/auth/login/catalogador', credentials);
  }
};
