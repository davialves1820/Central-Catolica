import fs from "fs/promises";
import path from "path";
import { MarkdownPage } from "@/components/catequese/MarkdownPage";
import { notFound } from "next/navigation";
import { obterTituloPorSlug, CATEQUESE } from "@/config/catequese";

export async function generateStaticParams() {
  const secao = CATEQUESE.find((s) => s.id === "sacramentos");
  return (secao?.itens ?? []).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = obterTituloPorSlug(slug);
  return { title: `${title} | Sacramentos` };
}

export default async function SacramentoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), "data/conteudo", `${slug}.md`);

  try {
    await fs.access(filePath);
  } catch {
    notFound();
  }

  const content = await fs.readFile(filePath, "utf8");
  const title = obterTituloPorSlug(slug);

  return (
    <MarkdownPage
      content={content}
      title={title}
      backHref="/catequese"
      backLabel="Voltar para Catequese"
    />
  );
}
