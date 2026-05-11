export interface Oracao {
    titulo: string;
    slug: string;
    url: string;
    categoria: string;
    texto: string;
}

export interface ConfiguracaoCategoria {
    emoji: string;
    descricao: string;
    cor: string;
    borda: string;
    brilho: string;
    slug: string;
}

export const CONFIG_CAT: Record<string, ConfiguracaoCategoria> = {
    "Orações comuns": {
        slug: "oracoes-comuns",
        emoji: "✝️",
        descricao: "As orações fundamentais da vida cristã",
        cor: "hsl(42,89%,42%)",
        borda: "hsl(42,89%,42%,0.35)",
        brilho: "hsl(42,89%,42%,0.08)",
    },
    "Orações diversas": {
        slug: "oracoes-diversas",
        emoji: "🕊️",
        descricao: "Súplicas e preces para diversas intenções",
        cor: "hsl(214,52%,58%)",
        borda: "hsl(214,58%,41%,0.3)",
        brilho: "hsl(214,58%,41%,0.06)",
    },
    "Comunhão": {
        slug: "comunhao",
        emoji: "🧎",
        descricao: "Orações antes e depois da Sagrada Comunhão",
        cor: "hsl(0,60%,44%)",
        borda: "hsl(0,68%,32%,0.3)",
        brilho: "hsl(0,68%,32%,0.06)",
    },
    "Jaculatórias": {
        slug: "jaculatorias",
        emoji: "⭐",
        descricao: "Breves invocações e aspirações do coração",
        cor: "hsl(40,70%,60%)",
        borda: "hsl(40,70%,60%,0.35)",
        brilho: "hsl(40,70%,60%,0.08)",
    },
};

export const SLUG_PARA_CAT: Record<string, string> = Object.fromEntries(
    Object.entries(CONFIG_CAT).map(([cat, v]) => [v.slug, cat]),
);

export interface PropsPaginaCategoriaOracoes {
    slug: string;
}

export interface PropsDestaqueCategoria {
    nomeCat: string;
    config: ConfiguracaoCategoria;
    quantidadeOracoes: number;
}

export interface PropsFiltroLetra {
    letras: string[];
    letraAtiva: string | null;
    setLetraAtiva: (letter: string | null) => void;
    config: ConfiguracaoCategoria;
    visiveis: Oracao[];
}

export interface PropsGruposOracoes {
    visiveis: Oracao[];
    setIndiceSelecionado: (idx: number | ((prev: number | null) => number | null)) => void;
    config: ConfiguracaoCategoria;
}

export interface PropsDetalheOracao {
    oracao: Oracao;
    config: ConfiguracaoCategoria;
    aoFechar: () => void;
    aoAnterior: () => void;
    aoProximo: () => void;
    temAnterior: boolean;
    temProximo: boolean;
}

export interface PropsPaginaOracao {
    params: Promise<{ slug: string }>;
}