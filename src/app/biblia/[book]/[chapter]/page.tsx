import { getBook } from "@/lib/bible";
import BibleReader from "@/components/bible/bible-reader/BibleReader";
import { BibleChapterSkeleton } from "@/components/ui/skeletons";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Suspense } from "react";
import { type ChapterPageProps } from "@/types/bible";

export async function generateMetadata({ params }: ChapterPageProps): Promise<Metadata> {
  const { book: bookSlug, chapter: chapterStr } = await params;
  const bookName = decodeURIComponent(bookSlug);
  return {
    title: `${bookName}, Capítulo ${chapterStr} | Bíblia Sagrada`,
    description: `Leia o capítulo ${chapterStr} do livro de ${bookName} na tradução Ave Maria.`,
  };
}

async function ChapterContent({ bookSlug, chapterStr, highlightVerse, }: { bookSlug: string; chapterStr: string; highlightVerse?: number }) {
  const bookName = decodeURIComponent(bookSlug);
  const chapterNumber = parseInt(chapterStr, 10);
  const bookData = await getBook(bookName);

  if (!bookData) {
    notFound();
  }

  const chapterIndex = bookData.capitulos.findIndex((c) => c.capitulo === chapterNumber);
  if (chapterIndex === -1) {
    notFound();
  }

  return (
    <BibleReader
      book={bookData}
      initialChapterIndex={chapterIndex}
      highlightVerse={highlightVerse}
    />
  );
}

export default async function ChapterPage({ params, searchParams }: ChapterPageProps) {
  const { book: bookSlug, chapter: chapterStr } = await params;
  const { v } = await searchParams;
  const highlightVerse = v ? parseInt(v, 10) : undefined;

  return (
    <div className="space-y-6">
      <Suspense fallback={<BibleChapterSkeleton />}>
        <ChapterContent
          bookSlug={bookSlug}
          chapterStr={chapterStr}
          highlightVerse={highlightVerse}
        />
      </Suspense>
    </div>
  );
}