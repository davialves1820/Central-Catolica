/**
 * Manifesto central do conteúdo de catequese.
 * Adicionar uma nova página aqui propaga automaticamente para:
 * - generateStaticParams em cada [slug]/page.tsx
 * - CategoryGrid (links)
 * - obterTituloPorSlug (títulos)
 */

export interface ItemCatequese {
    slug: string;
    titulo: string;
}

export interface SecaoCatequese {
    id: string;
    secao: string;
    itens: ItemCatequese[];
}

export const CATEQUESE: SecaoCatequese[] = [
    {
        id: "sacramentos",
        secao: "Sacramentos",
        itens: [
            { slug: "sacramentos", titulo: "O que são os Sacramentos?" },
            { slug: "batismo", titulo: "Batismo" },
            { slug: "crisma", titulo: "Crisma" },
            { slug: "eucaristia", titulo: "Eucaristia" },
            { slug: "confissao", titulo: "Confissão" },
            { slug: "uncao", titulo: "Unção dos Enfermos" },
            { slug: "ordem", titulo: "Ordem" },
            { slug: "matrimonio", titulo: "Matrimônio" },
        ],
    },
    {
        id: "missa",
        secao: "Santa Missa",
        itens: [{ slug: "missa", titulo: "A Santa Missa" }],
    },
    {
        id: "festas",
        secao: "Festas Litúrgicas",
        itens: [
            { slug: "pascoa", titulo: "Páscoa" },
            { slug: "natal", titulo: "Natal do Senhor" },
            { slug: "pentecoste", titulo: "Pentecostes" },
        ],
    },
    {
        id: "periodos",
        secao: "Períodos Litúrgicos",
        itens: [{ slug: "quaresma", titulo: "Quaresma" }],
    },
    {
        id: "dias-preceito",
        secao: "Dias de Preceito",
        itens: [{ slug: "dias-de-preceito", titulo: "Dias de Preceito" }],
    },
];

/** Lookup rápido de slug → título (substitui o map hardcoded em utils.ts) */
export const SLUG_PARA_TITULO: Record<string, string> = Object.fromEntries(
    CATEQUESE.flatMap((s) => s.itens.map((i) => [i.slug, i.titulo]))
);

/** Retorna o título de um slug, com fallback para capitalização automática */
export function obterTituloPorSlug(slug: string): string {
    return (
        SLUG_PARA_TITULO[slug] ??
        slug
            .split("-")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ")
    );
}