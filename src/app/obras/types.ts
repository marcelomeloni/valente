export type ObraCategoria =
  | 'livro'
  | 'artigo'
  | 'capitulo'
  | 'tese'
  | 'revista'
  | 'relatorio';

export interface Obra {
  slug: string;
  titulo: string;
  categoria: ObraCategoria;
  temas: string[];
  ano: number;
  autores: string[];
  publicacao?: string; // journal, editora, etc.
  resumo?: string;
}

export const CATEGORIAS: { value: ObraCategoria | 'todas'; label: string }[] = [
  { value: 'todas', label: 'Todas' },
  { value: 'livro', label: 'Livro' },
  { value: 'artigo', label: 'Artigo' },
  { value: 'capitulo', label: 'Capítulo de livro' },
  { value: 'tese', label: 'Tese / Dissertação' },
  { value: 'revista', label: 'Revista' },
  { value: 'relatorio', label: 'Relatório técnico' },
];

export const TEMAS_DISPONIVEIS = [
  'Construcionismo',
  'Espiral de Aprendizagem',
  'Linguagem Logo',
  'Formação de Professores',
  'Educação Especial',
  'Educação a Distância',
  'Sistemas Sócio-Enativos',
  'Pensamento Computacional',
  'Robótica Pedagógica',
  'Informática na Educação',
];

// Mock — replace with DB/CMS fetch
export const OBRAS_MOCK: Obra[] = [
  {
    slug: 'espiral-da-espiral-de-aprendizagem',
    titulo: 'A Espiral da Espiral de Aprendizagem: o processo de compreensão do papel das tecnologias de informação e comunicação na educação',
    categoria: 'tese',
    temas: ['Espiral de Aprendizagem', 'Informática na Educação', 'Construcionismo'],
    ano: 2005,
    autores: ['José Armando Valente'],
    publicacao: 'Tese de Livre Docência · UNICAMP · Instituto de Artes',
    resumo: 'Análise e discussão do processo de compreensão do papel das TIC na educação, articulando o ciclo descrição-execução-reflexão-depuração e a espiral de aprendizagem.',
  },
  {
    slug: 'liberando-a-mente',
    titulo: 'Liberando a Mente: computadores na educação especial',
    categoria: 'livro',
    temas: ['Educação Especial', 'Linguagem Logo', 'Construcionismo'],
    ano: 1991,
    autores: ['José Armando Valente'],
    publicacao: 'UNICAMP/NIED',
  },
  {
    slug: 'computadores-e-conhecimento',
    titulo: 'Computadores e Conhecimento: repensando a educação',
    categoria: 'livro',
    temas: ['Informática na Educação', 'Construcionismo', 'Formação de Professores'],
    ano: 1993,
    autores: ['José Armando Valente (org.)'],
    publicacao: 'UNICAMP/NIED',
  },
  {
    slug: 'o-computador-na-sociedade-do-conhecimento',
    titulo: 'O Computador na Sociedade do Conhecimento',
    categoria: 'livro',
    temas: ['Informática na Educação', 'Formação de Professores'],
    ano: 1999,
    autores: ['José Armando Valente (org.)'],
    publicacao: 'UNICAMP/NIED · Coleção Informática para a Mudança na Educação',
  },
  {
    slug: 'a-espiral-da-aprendizagem-e-as-tic',
    titulo: 'A espiral da aprendizagem e as tecnologias da informação e comunicação: repensando conceitos',
    categoria: 'capitulo',
    temas: ['Espiral de Aprendizagem', 'Informática na Educação'],
    ano: 2002,
    autores: ['José Armando Valente'],
    publicacao: 'In: Joly, M. C. R. A. (org.). A Tecnologia no Ensino',
  },
  {
    slug: 'usos-do-computador-na-educacao',
    titulo: 'Usos do computador na educação',
    categoria: 'capitulo',
    temas: ['Informática na Educação', 'Linguagem Logo'],
    ano: 1991,
    autores: ['José Armando Valente'],
    publicacao: 'In: Valente, J. A. (org.). Liberando a Mente',
  },
  {
    slug: 'logo-mais-do-que-uma-linguagem-de-programacao',
    titulo: 'Logo: mais do que uma linguagem de programação',
    categoria: 'capitulo',
    temas: ['Linguagem Logo', 'Construcionismo', 'Pensamento Computacional'],
    ano: 1991,
    autores: ['José Armando Valente'],
    publicacao: 'In: Valente, J. A. (org.). Liberando a Mente',
  },
  {
    slug: 'formar-para-inovar',
    titulo: 'Formar para Inovar com as Tecnologias de Informação e Comunicação',
    categoria: 'artigo',
    temas: ['Formação de Professores', 'Informática na Educação'],
    ano: 2003,
    autores: ['José Armando Valente', 'Roseli de Deus Lopes'],
    publicacao: 'Revista Brasileira de Educação',
  },
  {
    slug: 'o-estar-junto-virtual',
    titulo: 'O "Estar Junto Virtual" como uma abordagem de educação a distância',
    categoria: 'artigo',
    temas: ['Educação a Distância', 'Formação de Professores'],
    ano: 2000,
    autores: ['José Armando Valente'],
    publicacao: 'Boletim do Programa Salto para o Futuro',
  },
  {
    slug: 'analise-dos-diferentes-tipos-de-software',
    titulo: 'Análise dos diferentes tipos de software usados na educação',
    categoria: 'capitulo',
    temas: ['Informática na Educação', 'Espiral de Aprendizagem'],
    ano: 1999,
    autores: ['José Armando Valente'],
    publicacao: 'In: Valente, J. A. (org.). O Computador na Sociedade do Conhecimento',
  },
  {
    slug: 'nied-memo-1',
    titulo: 'NIED Memo Nº 1: Proposta do Projeto EDUCOM na UNICAMP',
    categoria: 'relatorio',
    temas: ['Informática na Educação', 'Construcionismo'],
    ano: 1983,
    autores: ['José Armando Valente', 'Ann Berger Valente'],
    publicacao: 'NIED · UNICAMP',
  },
  {
    slug: 'sistemas-socio-enativos',
    titulo: 'Sistemas Sócio-Enativos: investigando novas dimensões da interação humano-computador',
    categoria: 'artigo',
    temas: ['Sistemas Sócio-Enativos', 'Informática na Educação'],
    ano: 2017,
    autores: ['José Armando Valente', 'M. C. C. Baranauskas'],
    publicacao: 'Projeto Temático FAPESP',
  },
  {
    slug: 'robotica-pedagogica',
    titulo: 'Robótica Pedagógica: a informática na educação pelo avesso',
    categoria: 'artigo',
    temas: ['Robótica Pedagógica', 'Construcionismo', 'Pensamento Computacional'],
    ano: 1993,
    autores: ['José Armando Valente'],
    publicacao: 'NIED Informativo · UNICAMP',
  },
];