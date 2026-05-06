import { notFound } from "next/navigation";
import { Metadata } from "next";
import { SLUG_TO_CAT, CAT_CONFIG, type OracaoPageProps } from "@/types/oracao";
import OracoesCategoryPage from "@/components/oracao/OracoesCategoryPage";

export async function generateStaticParams() {
    return Object.values(CAT_CONFIG).map((c) => ({
        slug: c.slug,
    }));
}

export async function generateMetadata({ params }: OracaoPageProps): Promise<Metadata> {
    const { slug } = await params;

    const catName = SLUG_TO_CAT[slug];

    if (!catName) {
        return { title: "Categoria não encontrada" };
    }

    return {
        title: `${catName} | Livro de Orações`,
        description: `${CAT_CONFIG[catName].desc} — ${catName}`,
    };
}

export default async function Page({ params }: OracaoPageProps) {
    const { slug } = await params;

    if (!SLUG_TO_CAT[slug]) {
        notFound();
    }

    return <OracoesCategoryPage slug={slug} />;
}