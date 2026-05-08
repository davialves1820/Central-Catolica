"use client";

import { useState, useEffect } from "react";
import { type Theme, type FontSize, type ReadingMode, THEMES } from "@/types";

interface ReaderPreferences {
  isMounted: boolean;
  fontSize: FontSize;
  theme: Theme;
  readingMode: ReadingMode;
  setFontSize: (s: FontSize) => void;
  setTheme: (t: Theme) => void;
  setReadingMode: (m: ReadingMode) => void;
}

export function useReaderPreferences(): ReaderPreferences {
  const [isMounted, setIsMounted] = useState(false);
  const [fontSize, setFontSizeState] = useState<FontSize>(18);
  const [theme, setThemeState] = useState<Theme>("parchment");
  const [readingMode, setReadingModeState] = useState<ReadingMode>("paginated");

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setIsMounted(true);
    const sz = localStorage.getItem("bible-font-size");
    const th = localStorage.getItem("bible-theme") as Theme;
    const md = localStorage.getItem("bible-reading-mode") as ReadingMode;
    if (sz) {
      setFontSizeState(parseInt(sz) as FontSize);
    }
    if (th && THEMES[th]) {
      setThemeState(th);
    }
    if (md) {
      setReadingModeState(md);
    }
    /* eslint-enable react-hooks/set-state-in-effect */
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

  return { isMounted, fontSize, theme, readingMode, setFontSize, setTheme, setReadingMode };
}
