import { motion, AnimatePresence } from "framer-motion";
import { ChapterContentProps } from "@/types/bible";
import { ChapterHeading } from "./ChapterHeading";
import { VerseItem } from "./VerseItem";

export function ChapterContent({
  book,
  chapterIndex,
  direction,
  fontSize,
  t,
  readingMode,
  flashVerse,
  verseRefs,
}: ChapterContentProps) {
  const currentChapter = book.capitulos[chapterIndex];

  const makeVerseRef = (verseNumber: number) => (el: HTMLElement | null) => {
    if (el) verseRefs.current.set(verseNumber, el);
    else verseRefs.current.delete(verseNumber);
  };

  if (readingMode === "continuous") {
    return (
      <div className="max-w-2xl mx-auto">
        <p
          className="text-center text-xs font-body mb-10 uppercase tracking-widest"
          style={{ color: "hsl(var(--gold)/0.45)" }}
        >
          Leitura contínua
        </p>
        {book.capitulos.map((cap) => (
          <div key={cap.capitulo} className="mb-16">
            <ChapterHeading t={t} bookName={book.nome} chapterNumber={cap.capitulo} />
            <div className="space-y-0.5">
              {cap.versiculos.map((v, vi) => (
                <VerseItem
                  key={v.versiculo}
                  verse={v}
                  t={t}
                  fontSize={fontSize}
                  isFirst={vi === 0}
                  isHighlighted={v.versiculo === flashVerse}
                  verseRef={makeVerseRef(v.versiculo)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={`${book.nome}-${currentChapter.capitulo}`}
        custom={direction}
        variants={{
          enter: (d: number) => ({ x: d * 36, opacity: 0 }),
          center: { x: 0, opacity: 1 },
          exit: (d: number) => ({ x: d * -36, opacity: 0 }),
        }}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.26, ease: "easeInOut" }}
        className="max-w-2xl mx-auto"
      >
        <ChapterHeading t={t} bookName={book.nome} chapterNumber={currentChapter.capitulo} />
        <div className="space-y-0.5">
          {currentChapter.versiculos.map((v, idx) => (
            <VerseItem
              key={v.versiculo}
              verse={v}
              t={t}
              fontSize={fontSize}
              isFirst={idx === 0}
              isHighlighted={v.versiculo === flashVerse}
              verseRef={makeVerseRef(v.versiculo)}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
