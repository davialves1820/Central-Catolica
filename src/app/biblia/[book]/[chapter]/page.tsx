import { getBook } from "@/lib/bible";
import BibleReader from "@/components/bible/BibleReader";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({ params }: ChapterPageProps): Promise<Metadata> {
  const { book: bookSlug, chapter: chapterStr } = await params;
  const bookName = decodeURIComponent(bookSlug);
  return {
    title: `${bookName}, Capítulo ${chapterStr} | Bíblia Sagrada`,
    description: `Leia o capítulo ${chapterStr} do livro de ${bookName} na tradução Ave Maria.`,
  };
}

interface ChapterPageProps {
  params: Promise<{
    book: string;
    chapter: string;
  }>;
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { book: bookSlug, chapter: chapterStr } = await params;
  const bookName = decodeURIComponent(bookSlug);
  const chapterNumber = parseInt(chapterStr, 10);

  const bookData = await getBook(bookName);
  
  if (!bookData) {
    notFound();
  }

  const chapterIndex = bookData.capitulos.findIndex(c => c.capitulo === chapterNumber);
  
  if (chapterIndex === -1) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <BibleReader 
        book={bookData} 
        initialChapterIndex={chapterIndex} 
      />
    </div>
  );
}
