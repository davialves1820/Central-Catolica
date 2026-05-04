"use client";

import { useState } from "react";
import { type Book, THEMES } from "@/types";
import { useReaderPreferences } from "@/lib/client/hooks/bible/useReaderPreferences";
import { useChapterNavigation } from "@/lib/client/hooks/bible/useChapterNavigation";
import { useVerseHighlight } from "@/lib/client/hooks/bible/useVerseHighlight";
import { useReadingProgress } from "@/lib/client/hooks/bible/useReadingProgress";
import { ReaderProgressBar } from "@/components/bible/bible-reader/ReaderProgressBar";
import { ReaderToolbar } from "@/components/bible/bible-reader/ReaderToolbar";
import { TableOfContents } from "@/components/bible/bible-reader/TableOfContents";
import { SettingsPanel } from "@/components/bible/bible-reader/SettingsPanel";
import { ChapterContent } from "@/components/bible/bible-reader/ChapterContent";
import { NavFooter } from "@/components/bible/bible-reader/NavFooter";

interface BibleReaderProps {
  book: Book;
  initialChapterIndex: number;
  highlightVerse?: number;
}

export default function BibleReader({
  book,
  initialChapterIndex,
  highlightVerse,
}: BibleReaderProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [showTOC, setShowTOC] = useState(false);

  const { fontSize, theme, readingMode, setFontSize, setTheme, setReadingMode } =
    useReaderPreferences();

  const { chapterIndex, direction, hasNext, hasPrev, navigate, goTo, touchHandlers } =
    useChapterNavigation({
      initialIndex: initialChapterIndex,
      total: book.capitulos.length,
    });

  const { flashVerse, clearFlash, verseRefs } = useVerseHighlight(highlightVerse, chapterIndex);

  const currentChapter = book.capitulos[chapterIndex];

  useReadingProgress({
    bookName: book.nome,
    chapter: currentChapter.capitulo,
    flashVerse,
  });

  const t = THEMES[theme as keyof typeof THEMES];

  return (
    <div
      className={`relative rounded-2xl overflow-hidden border shadow-2xl transition-colors duration-300 ${t.border}`}
      style={{ background: t.bg }}
      {...touchHandlers}
    >
      <ReaderProgressBar current={chapterIndex} total={book.capitulos.length} />

      <ReaderToolbar
        t={t}
        bookName={book.nome}
        chapterNumber={currentChapter.capitulo}
        verseCount={currentChapter.versiculos.length}
        readingMode={readingMode}
        showTOC={showTOC}
        showSettings={showSettings}
        onToggleTOC={() => setShowTOC((v) => !v)}
        onToggleSettings={() => setShowSettings((v) => !v)}
        onToggleReadingMode={() =>
          setReadingMode(readingMode === "paginated" ? "continuous" : "paginated")
        }
      />

      <TableOfContents
        t={t}
        chapters={book.capitulos}
        currentIndex={chapterIndex}
        isOpen={showTOC}
        onClose={() => setShowTOC(false)}
        onSelect={(idx) => {
          goTo(idx);
          clearFlash();
          setShowTOC(false);
        }}
      />

      <SettingsPanel
        t={t}
        isOpen={showSettings}
        fontSize={fontSize}
        theme={theme}
        bg={t.bg}
        onFontSizeChange={setFontSize}
        onThemeChange={setTheme}
      />

      <div
        className="relative min-h-[70vh] px-5 py-12 sm:px-14 sm:py-16"
        style={{ fontSize: `${fontSize}px` }}
      >
        <ChapterContent
          book={book}
          chapterIndex={chapterIndex}
          direction={direction}
          fontSize={fontSize}
          t={t}
          readingMode={readingMode}
          flashVerse={flashVerse}
          verseRefs={verseRefs}
        />
      </div>

      {readingMode === "paginated" && (
        <NavFooter
          t={t}
          chapterIndex={chapterIndex}
          total={book.capitulos.length}
          hasNext={hasNext}
          hasPrev={hasPrev}
          onPrev={() => navigate(-1)}
          onNext={() => navigate(1)}
        />
      )}

      <p
        className="md:hidden text-center py-2 text-xs font-body select-none"
        style={{ color: "hsl(var(--gold)/0.3)" }}
        aria-hidden="true"
      >
        ← deslize para navegar →
      </p>
    </div>
  );
}
