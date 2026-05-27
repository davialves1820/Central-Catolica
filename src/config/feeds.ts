export const FEEDS = {
    vaticannews: {
        url: "https://www.vaticannews.va/pt.rss.xml",
        label: "Vatican News",
    },
    // Para adicionar uma nova fonte: basta acrescentar aqui.
    // O tipo FonteNoticia é derivado automaticamente via keyof typeof FEEDS.
    //
    // cnbb: {
    //   url: "https://www.cnbb.org.br/feed/",
    //   label: "CNBB",
    // },
    // fides: {
    //   url: "https://www.fides.org/pt/rss",
    //   label: "Agência Fides",
    // },
} as const;

export type FonteNoticia = keyof typeof FEEDS;