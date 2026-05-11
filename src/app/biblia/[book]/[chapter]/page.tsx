import { getLivro } from "@/lib/server/services/biblia";
import LeitorBiblia from "@/components/biblia/leitor-biblia/LeitorBiblia";
import { BibleChapterSkeleton } from "@/components/ui/skeletons";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Suspense } from "react";
import { type PropsPaginaCapitulo } from "@/types/biblia";

export async function generateMetadata({ params }: PropsPaginaCapitulo): Promise<Metadata> {
  const { book: bookSlug, chapter: chapterStr } = await params;
  const bookName = decodeURIComponent(bookSlug);
  return {
    title: `${bookName}, Capítulo ${chapterStr} | Bíblia Sagrada`,
    description: `Leia o capítulo ${chapterStr} do livro de ${bookName} na tradução Ave Maria.`,
  };
}

async function ConteudoCapitulo({ bookSlug, chapterStr, highlightVerse, }: { bookSlug: string; chapterStr: string; highlightVerse?: number }) {
  const bookName = decodeURIComponent(bookSlug);
  const chapterNumber = parseInt(chapterStr, 10);
  const bookData = await getLivro(bookName);

  if (!bookData) {
    notFound();
  }

  const chapterIndex = bookData.capitulos.findIndex((c) => c.capitulo === chapterNumber);
  if (chapterIndex === -1) {
    notFound();
  }

  return (
    <LeitorBiblia
      livro={bookData}
      indexCapituloInicial={chapterIndex}
      versiculoDestaque={highlightVerse}
    />
  );
}

export default async function PaginaCapitulo({ params, searchParams }: PropsPaginaCapitulo) {
  const { book: bookSlug, chapter: chapterStr } = await params;
  const { v } = await searchParams;
  const highlightVerse = v ? parseInt(v, 10) : undefined;

  return (
    <div className="space-y-6">
      <Suspense fallback={<BibleChapterSkeleton />}>
        <ConteudoCapitulo
          bookSlug={bookSlug}
          chapterStr={chapterStr}
          highlightVerse={highlightVerse}
        />
      </Suspense>
    </div>
  );
}