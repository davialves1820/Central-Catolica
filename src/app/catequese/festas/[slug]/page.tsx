import fs from 'fs';
import path from 'path';
import { MarkdownPage } from '@/components/catequese/MarkdownPage';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', ' ');
  return {
    title: `${title} | Festas Litúrgicas`,
  };
}

export default async function FestaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), 'data/conteudo', `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const content = fs.readFileSync(filePath, 'utf8');
  let title = slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', ' ');
  if (title == "Pascoa") {
    title = "Páscoa";
  }

  return (
    <MarkdownPage
      content={content}
      title={title}
      backHref="/catequese"
      backLabel="Voltar para Catequese"
    />
  );
}
