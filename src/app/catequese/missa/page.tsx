import fs from 'fs';
import path from 'path';
import { MarkdownPage } from '@/components/catequese/MarkdownPage';

export const metadata = {
  title: 'Santa Missa | Catequese',
  description: 'O sacrifício eucarístico, fonte e ápice de toda a vida cristã e espiritualidade.',
};

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
    />
  );
}
