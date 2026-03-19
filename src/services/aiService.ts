import { api } from './api';

export interface AiAskPayload {
  question: string;
  pdfUrl?: string;
  context?: {
    titulo?: string;
    autores?: string;
    ano?: number;
    categoria?: string;
    resumo?: string;
    publicacao?: string;
  };
}

export const aiService = {
  ask: async (payload: AiAskPayload): Promise<{ answer: string }> => {
    return api.post<{ answer: string }>('/ai/ask', payload);
  }
};
