export interface Noticia {
    id: string
    titulo: string
    resumo: string
    url: string
    imagem?: string
    categoria?: string
    publicadoEm: string
    fonte: 'vaticannews' | 'cnbb' | 'fides'
    fonteLabel: string
}

export interface PropsCartaoNoticia {
    noticia: Noticia;
}

export interface PropsDestaqueNoticia {
    noticia: Noticia;
}

export interface PropsCarrosselNoticias {
    noticias: Noticia[];
}

export const ESTILO_FONTE = {
    vaticannews: {
        cor: "hsl(var(--gold))",
        borda: "hsl(var(--gold)/0.35)",
        fundo: "hsl(var(--gold)/0.12)",
    },
    cnbb: {
        cor: "hsl(var(--cobalt-light))",
        borda: "hsl(var(--cobalt)/0.35)",
        fundo: "hsl(var(--cobalt)/0.1)",
    },
    fides: {
        cor: "hsl(var(--crimson-light))",
        borda: "hsl(var(--crimson)/0.35)",
        fundo: "hsl(var(--crimson)/0.1)",
    },
};