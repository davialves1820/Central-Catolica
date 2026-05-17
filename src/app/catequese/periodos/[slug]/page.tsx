import fs from 'fs';
import path from 'path';
import { MarkdownPage } from '@/components/catequese/MarkdownPage';
import { notFound } from 'next/navigation';
import { obterTituloPorSlug } from '@/lib/server/utils/utils';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = obterTituloPorSlug(slug);
  return {
    title: `${title} | Períodos Litúrgicos`,
  };
}

export default async function PeriodoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), 'data/conteudo', `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    notFound();
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
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
