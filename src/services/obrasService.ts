import { api } from './api';
import { Obra, ObraCategoria } from '../app/obras/types';

export const obrasService = {
  getAll: async (): Promise<Obra[]> => {
    const rawData = await api.get<any[]>('/obras');
    
    return rawData.map((o) => ({
      slug: o.slug,
      titulo: o.titulo,
      categoria: o.categoria as ObraCategoria,
      ano: o.ano,
      publicacao: o.publicacao,
      resumo: o.resumo,
      link_externo: o.link_externo,
      pdf: o.pdf,
      autores: o.obra_autor?.map((oa: any) => oa.autor?.nome).filter(Boolean) || [],
      temas: o.obra_tema?.map((ot: any) => ot.tema?.nome).filter(Boolean) || []
    }));
  },

  getAprovadas: async (): Promise<Obra[]> => {
    const rawData = await api.get<any[]>('/obras/aprovadas');

    return rawData.map((o) => ({
      slug: o.slug,
      titulo: o.titulo,
      categoria: o.categoria as ObraCategoria,
      ano: o.ano,
      publicacao: o.publicacao,
      resumo: o.resumo,
      link_externo: o.link_externo,
      pdf: o.pdf,
      autores: o.obra_autor?.map((oa: any) => oa.autor?.nome).filter(Boolean) || [],
      temas: o.obra_tema?.map((ot: any) => ot.tema?.nome).filter(Boolean) || []
    }));
  },

  getDashboard: async () => {
    return api.get<any>('/obras/dashboard');
  },

  getById: async (id: number) => {
    return api.get<any>(`/obras/${id}`);
  },

  create: async (data: any) => {
    return api.post<any>('/obras', data);
  },

  update: async (id: number, data: any) => {
    return api.put<any>(`/obras/${id}`, data);
  },

  delete: async (id: number) => {
    return api.delete<any>(`/obras/${id}`);
  },

  uploadPdf: async (file: File): Promise<{ publicUrl: string; path: string }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        try {
          const resultString = reader.result as string;
          const base64String = resultString.split(',')[1];
          const response = await api.post<any>('/upload/pdf', {
            filename: file.name,
            mimeType: file.type,
            fileBase64: base64String
          });
          resolve(response);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = (error) => reject(error);
    });
  }
};