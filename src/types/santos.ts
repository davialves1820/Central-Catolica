export interface Santo {
  nome: string;
  slug: string;
  url: string;
  tipo: string;
  resumo: string;
  imagem_url: string;
  imagem_nome: string;
  data_festa: string;
  nascimento: string;
  morte: string;
  padroeiro_de: string;
  venerado_em: string;
  canonizado_por: string;
  categorias: string[];
}

export interface GetSantosOptions {
  tipo?: string;
  busca?: string;
  pagina?: number;
  porPagina?: number;
  inicial?: string;
}

export interface SantosPageProps {
  searchParams: Promise<{ tipo?: string; busca?: string; pagina?: string; inicial?: string }>;
}

export interface PaginacaoProps {
  pagina: number;
  totalPaginas: number;
  tipo: string;
  busca: string;
  inicial: string;
}

export interface SantoSlugPageProps {
  params: Promise<{ slug: string }>;
}

export interface SantosGridProps {
  santos: Santo[];
}

export interface SantoCardProps {
  santo: Santo;
}

export interface SantoExternalLinkProps {
  href: string;
  color: string;
  border: string;
}

export interface SantosAlfabetoProps {
  inicialAtiva: string;
  tipo: string;
  busca: string;
}

export interface SantosFiltrosProps {
  tipos: string[];
  tipoAtivo: string;
  busca: string;
  inicial: string;
}

export interface SantosSearchProps {
  valorInicial: string;
}
