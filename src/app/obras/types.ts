export type ObraCategoria =
  | 'artigo_periodico'
  | 'artigo_evento'
  | 'editorial'
  | 'livro'
  | 'capitulo_livro'
  | 'tese_doutorado'
  | 'dissertacao_mestrado'
  | 'tcc'
  | 'anais_evento'
  | 'relato_experiencia'
  | 'resumo_expandido'
  | 'manual'
  | 'cartilha'
  | 'relatorio_tecnico'
  | 'outro';

export interface Obra {
  slug: string;
  titulo: string;
  categoria: ObraCategoria;
  temas: string[];
  ano: number;
  autores: string[];
  publicacao?: string;
  resumo?: string;
  link_externo?: string;
  pdf?: string;
  id?: number;
}

export const CATEGORIAS: { value: ObraCategoria | 'todas'; label: string }[] = [
  { value: 'todas', label: 'Todas as Categorias' },
  { value: 'artigo_periodico', label: 'Artigo de Periódico' },
  { value: 'artigo_evento', label: 'Artigo de Evento' },
  { value: 'editorial', label: 'Editorial' },
  { value: 'livro', label: 'Livro' },
  { value: 'capitulo_livro', label: 'Capítulo de Livro' },
  { value: 'tese_doutorado', label: 'Tese de Doutorado' },
  { value: 'dissertacao_mestrado', label: 'Dissertação de Mestrado' },
  { value: 'tcc', label: 'Trabalho de Conclusão de Curso' },
  { value: 'anais_evento', label: 'Anais de Evento' },
  { value: 'relato_experiencia', label: 'Relato de Experiência' },
  { value: 'resumo_expandido', label: 'Resumo Expandido' },
  { value: 'manual', label: 'Manual' },
  { value: 'cartilha', label: 'Cartilha' },
  { value: 'relatorio_tecnico', label: 'Relatório Técnico' },
  { value: 'outro', label: 'Outro' },
];

export const CATEGORIA_LABEL: Record<string, string> = Object.fromEntries(
  CATEGORIAS.filter(c => c.value !== 'todas').map(c => [c.value, c.label])
);

export const CATEGORIA_COLOR: Record<string, string> = {
  artigo_periodico: 'text-emerald-600 bg-emerald-50 border-emerald-100',
  artigo_evento: 'text-teal-600 bg-teal-50 border-teal-100',
  editorial: 'text-orange-600 bg-orange-50 border-orange-100',
  livro: 'text-blue-600 bg-blue-50 border-blue-100',
  capitulo_livro: 'text-violet-600 bg-violet-50 border-violet-100',
  tese_doutorado: 'text-amber-600 bg-amber-50 border-amber-100',
  dissertacao_mestrado: 'text-yellow-600 bg-yellow-50 border-yellow-100',
  tcc: 'text-lime-600 bg-lime-50 border-lime-100',
  anais_evento: 'text-cyan-600 bg-cyan-50 border-cyan-100',
  relato_experiencia: 'text-pink-600 bg-pink-50 border-pink-100',
  resumo_expandido: 'text-rose-600 bg-rose-50 border-rose-100',
  manual: 'text-indigo-600 bg-indigo-50 border-indigo-100',
  cartilha: 'text-fuchsia-600 bg-fuchsia-50 border-fuchsia-100',
  relatorio_tecnico: 'text-zinc-600 bg-zinc-100 border-zinc-200',
  outro: 'text-stone-600 bg-stone-100 border-stone-200',
};