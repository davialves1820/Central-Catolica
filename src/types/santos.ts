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

export interface OpcoesBuscaSantos {
  tipo?: string;
  busca?: string;
  pagina?: number;
  porPagina?: number;
  inicial?: string;
}

export interface PropsPaginaSantos {
  searchParams: Promise<{ tipo?: string; busca?: string; pagina?: string; inicial?: string }>;
}

export interface PropsPaginacao {
  pagina: number;
  totalPaginas: number;
  tipo: string;
  busca: string;
  inicial: string;
}

export interface PropsPaginaDetalheSanto {
  params: Promise<{ slug: string }>;
}

export interface PropsGradeSantos {
  santos: Santo[];
}

export interface PropsCartaoSanto {
  santo: Santo;
}

export interface PropsLinkExternoSanto {
  href: string;
  cor: string;
  borda: string;
}

export interface PropsAlfabetoSantos {
  inicialAtiva: string;
}

export interface PropsFiltrosSantos {
  tipos: string[];
  tipoAtivo: string;
}

export interface PropsBuscaSantos {
  valorInicial: string;
}
