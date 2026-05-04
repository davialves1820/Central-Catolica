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

export const FONTE_STYLE = {
    vaticannews: {
        color: "hsl(var(--gold))",
        border: "hsl(var(--gold)/0.35)",
        bg: "hsl(var(--gold)/0.12)",
    },
    cnbb: {
        color: "hsl(var(--cobalt-light))",
        border: "hsl(var(--cobalt)/0.35)",
        bg: "hsl(var(--cobalt)/0.1)",
    },
    fides: {
        color: "hsl(var(--crimson-light))",
        border: "hsl(var(--crimson)/0.35)",
        bg: "hsl(var(--crimson)/0.1)",
    },
};