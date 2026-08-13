import type { Metadata } from "next";
import { siteConfig, absoluteUrl } from "@/config/site";

interface PageMetadataInput {
  /** Título curto da página (o template do layout raiz já adiciona " | Meu Canto Católico"). */
  title: string;
  description: string;
  /** Caminho relativo, ex: "/santos" ou "/santos/sao-bento". */
  path: string;
  /** Caminho ou URL absoluta de uma imagem específica (ex: foto do santo). */
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  keywords?: string[];
  noIndex?: boolean;
}

/**
 * Monta metadata consistente (canonical, Open Graph completo, Twitter Card)
 * para uma página. Cada página fica autossuficiente em vez de depender de
 * merge implícito de objetos aninhados do App Router.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  type = "website",
  keywords,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const fullTitle = `${title} | ${siteConfig.name}`;
  const url = absoluteUrl(path);
  const ogImage = image ? absoluteUrl(image) : absoluteUrl("/opengraph-image");

  const openGraphBase = {
    title: fullTitle,
    description,
    url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt ?? fullTitle }],
  };

  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph:
      type === "article"
        ? { ...openGraphBase, type: "article" }
        : { ...openGraphBase, type: "website" },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}
