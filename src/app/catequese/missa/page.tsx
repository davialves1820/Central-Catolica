import fs from 'fs';
import path from 'path';
import { MarkdownPage } from '@/components/catequese/MarkdownPage';
import { pageMetadata } from '@/lib/shared/pageMetadata';

const DESCRICAO = 'O sacrifício eucarístico, fonte e ápice de toda a vida cristã: entenda cada parte da Santa Missa.';

export const metadata = pageMetadata({
  title: 'Santa Missa | Catequese',
  description: DESCRICAO,
  path: '/catequese/missa',
  type: 'article',
  keywords: ['santa missa', 'partes da missa', 'catequese católica'],
});

export default async function MissaPage() {
  const filePath = path.join(process.cwd(), 'data/conteudo', 'missa.md');
  let content = '';
  try {
    content = fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    content = 'Conteúdo não encontrado.';
    console.error(e);
  }

  return (
    <MarkdownPage
      content={content}
      title="Santa Missa"
      backHref="/catequese"
      backLabel="Voltar para Catequese"
      description={DESCRICAO}
      path="/catequese/missa"
      breadcrumbItems={[{ label: "Catequese", href: "/catequese" }, { label: "Santa Missa" }]}
    />
  );
}
