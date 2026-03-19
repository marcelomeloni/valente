const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

/**
 * Utilitário base de requisições nativas usando fetch.
 * Permite tipagem de retorno automática.
 */
export const api = {
  get: async <T>(path: string): Promise<T> => {
    const res = await fetch(`${API_URL}${path}`, {
      headers: { 'Accept': 'application/json' }
    });
    if (!res.ok) {
      throw new Error(`Erro na requisição GET ${path}. Status: ${res.status}`);
    }
    return res.json() as Promise<T>;
  },

  post: async <T>(path: string, body: any): Promise<T> => {
    const res = await fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      throw new Error(`Erro na requisição POST ${path}. Status: ${res.status}`);
    }
    return res.json() as Promise<T>;
  },

  put: async <T>(path: string, body: any): Promise<T> => {
    const res = await fetch(`${API_URL}${path}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      throw new Error(`Erro na requisição PUT ${path}. Status: ${res.status}`);
    }
    return res.json() as Promise<T>;
  },

  delete: async <T>(path: string): Promise<T> => {
    const res = await fetch(`${API_URL}${path}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error(`Erro na requisição DELETE ${path}. Status: ${res.status}`);
    }
    return res.json() as Promise<T>;
  }
};
