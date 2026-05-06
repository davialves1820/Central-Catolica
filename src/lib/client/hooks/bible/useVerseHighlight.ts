"use client";

import { useState, useEffect, useRef } from "react";

interface UseVerseHighlightReturn {
  flashVerse: number | undefined;
  clearFlash: () => void;
  verseRefs: React.MutableRefObject<Map<number, HTMLElement>>;
}

export function useVerseHighlight(highlightVerse: number | undefined, chapterIndex: number): UseVerseHighlightReturn {
  const [flashVerse, setFlashVerse] = useState<number | undefined>(highlightVerse);
  const verseRefs = useRef<Map<number, HTMLElement>>(new Map());

  // Sincronizar quando a propriedade highlightVerse for alterada
  useEffect(() => {
    setFlashVerse(highlightVerse);
  }, [highlightVerse]);

  // Rola até o versículo destacado e limpa automaticamente
  useEffect(() => {
    if (!flashVerse) return;
    const el = verseRefs.current.get(flashVerse);
    if (!el) return;
    const scrollTimer = setTimeout(
      () => el.scrollIntoView({ behavior: "smooth", block: "center" }),
      400
    );
    const clearTimer = setTimeout(() => setFlashVerse(undefined), 3500);
    return () => {
      clearTimeout(scrollTimer);
      clearTimeout(clearTimer);
    };
  }, [flashVerse, chapterIndex]);

  return {
    flashVerse,
    clearFlash: () => setFlashVerse(undefined),
    verseRefs,
  };
}
