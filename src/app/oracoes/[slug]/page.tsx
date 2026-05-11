import { notFound } from "next/navigation";
import { Metadata } from "next";
import { SLUG_PARA_CAT, CONFIG_CAT, type PropsPaginaCategoriaOracoes } from "@/types/oracao";
import OracoesCategoriaPage from "@/components/oracao/OracoesCategoriaPage";

export async function generateStaticParams() {
    return Object.values(CONFIG_CAT).map((c) => ({
        slug: c.slug,
    }));
}

export async function generateMetadata({ slug }: PropsPaginaCategoriaOracoes): Promise<Metadata> {

    const catName = SLUG_PARA_CAT[slug];

    if (!catName) {
        return { title: "Categoria não encontrada" };
    }

    return {
        title: `${catName} | Livro de Orações`,
        description: `${CONFIG_CAT[catName].descricao} — ${catName}`,
    };
}

export default async function Page({ slug }: PropsPaginaCategoriaOracoes) {

    if (!SLUG_PARA_CAT[slug]) {
        notFound();
    }

    return <OracoesCategoriaPage slug={slug} />;
}