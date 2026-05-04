"use client";

import { useState, useEffect } from "react";
import { type Theme, type FontSize, type ReadingMode, THEMES } from "@/types";

interface ReaderPreferences {
  fontSize: FontSize;
  theme: Theme;
  readingMode: ReadingMode;
  setFontSize: (s: FontSize) => void;
  setTheme: (t: Theme) => void;
  setReadingMode: (m: ReadingMode) => void;
}

export function useReaderPreferences(): ReaderPreferences {
  const [fontSize, setFontSizeState] = useState<FontSize>(18);
  const [theme, setThemeState] = useState<Theme>("parchment");
  const [readingMode, setReadingModeState] = useState<ReadingMode>("paginated");

  useEffect(() => {
    window.requestAnimationFrame(() => {
      const sz = localStorage.getItem("bible-font-size");
      const th = localStorage.getItem("bible-theme") as Theme;
      const md = localStorage.getItem("bible-reading-mode") as ReadingMode;
      if (sz) setFontSizeState(parseInt(sz) as FontSize);
      if (th && THEMES[th]) setThemeState(th);
      if (md) setReadingModeState(md);
    });
  }, []);

  const setFontSize = (s: FontSize) => {
    setFontSizeState(s);
    localStorage.setItem("bible-font-size", String(s));
  };

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem("bible-theme", t);
  };

  const setReadingMode = (m: ReadingMode) => {
    setReadingModeState(m);
    localStorage.setItem("bible-reading-mode", m);
  };

  return { fontSize, theme, readingMode, setFontSize, setTheme, setReadingMode };
}
