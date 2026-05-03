import { notFound } from "next/navigation";
import { Metadata } from "next";
import { SLUG_TO_CAT, CAT_CONFIG } from "@/app/oracoes/constants";

import OracoesCategoryPage from "@/components/oracao/OracoesCategoryPage";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return Object.values(CAT_CONFIG).map((c) => ({
        slug: c.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
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

export default async function Page({ params }: Props) {
    const { slug } = await params;

    if (!SLUG_TO_CAT[slug]) {
        notFound();
    }

    return <OracoesCategoryPage slug={slug} />;
}