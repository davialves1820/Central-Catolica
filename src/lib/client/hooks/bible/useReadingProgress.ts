"use client";

import { useEffect } from "react";

interface UseReadingProgressOptions {
  bookName: string;
  chapter: number;
  flashVerse?: number;
}

export function useReadingProgress({ bookName, chapter, flashVerse }: UseReadingProgressOptions) {
  useEffect(() => {
    localStorage.setItem(
      "bible-progress",
      JSON.stringify({ bookName, chapter, timestamp: Date.now() })
    );
    const hash = flashVerse ? `#v-${flashVerse}` : "";
    window.history.replaceState(
      {},
      "",
      `/biblia/${encodeURIComponent(bookName)}/${chapter}${hash}`
    );
  }, [bookName, chapter, flashVerse]);
}
