"use client";

import { Book } from "@/lib/bible";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Bookmark, Settings, List } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface BibleReaderProps {
  book: Book;
  initialChapterIndex: number;
}

type Theme = "light" | "dark" | "sepia";

export default function BibleReader({ book, initialChapterIndex }: BibleReaderProps) {
  const [chapterIndex, setChapterIndex] = useState(initialChapterIndex);
  const [preferences, setPreferences] = useState<{ fontSize: number; theme: Theme }>({
    fontSize: 18,
    theme: "light"
  });
  const [showSettings, setShowSettings] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentChapter = book.capitulos[chapterIndex];
  const hasNext = chapterIndex < book.capitulos.length - 1;
  const hasPrev = chapterIndex > 0;

  // Save progress
  useEffect(() => {
    const progress = {
      bookName: book.nome,
      chapter: currentChapter.capitulo,
      timestamp: Date.now(),
    };
    localStorage.setItem("bible-progress", JSON.stringify(progress));

    // Update URL without full reload
    const url = `/biblia/${encodeURIComponent(book.nome)}/${currentChapter.capitulo}`;
    window.history.pushState({}, "", url);
  }, [chapterIndex, book.nome, currentChapter.capitulo]);

  // Load preferences
  useEffect(() => {
    const savedFontSize = localStorage.getItem("bible-font-size");
    const savedTheme = localStorage.getItem("bible-theme") as Theme;
    
    if (savedFontSize || savedTheme) {
      setPreferences({
        fontSize: savedFontSize ? parseInt(savedFontSize, 10) : 18,
        theme: savedTheme || "light"
      });
    }
  }, []);

  const handleNext = () => {
    if (hasNext) {
      setChapterIndex(chapterIndex + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (hasPrev) {
      setChapterIndex(chapterIndex - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const themeClasses = {
    light: "bg-white text-slate-900",
    dark: "bg-slate-950 text-slate-100",
    sepia: "bg-[#f4ecd8] text-[#5b4636]",
  };

  return (
    <div className={`rounded-xl shadow-xl overflow-hidden border transition-colors duration-300 ${themeClasses[preferences.theme]}`}>
      {/* Tool Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-opacity-50 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Link href="/biblia" className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors" title="Ver todos os livros">
            <List className="w-5 h-5" />
          </Link>
          <div className="h-4 w-px bg-border mx-1" />
          <h2 className="font-heading text-lg font-bold truncate max-w-[150px] sm:max-w-none">
            {book.nome} {currentChapter.capitulo}
          </h2>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
            <Bookmark className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-b overflow-hidden bg-muted/30"
          >
            <div className="p-4 grid sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider opacity-60">Tamanho da Fonte</label>
                <div className="flex items-center gap-4">
                  <button onClick={() => {
                    const newSize = Math.max(14, preferences.fontSize - 2);
                    setPreferences(prev => ({ ...prev, fontSize: newSize }));
                    localStorage.setItem("bible-font-size", newSize.toString());
                  }} className="px-3 py-1 border rounded hover:bg-background">A-</button>
                  <span className="font-mono">{preferences.fontSize}px</span>
                  <button onClick={() => {
                    const newSize = Math.min(32, preferences.fontSize + 2);
                    setPreferences(prev => ({ ...prev, fontSize: newSize }));
                    localStorage.setItem("bible-font-size", newSize.toString());
                  }} className="px-3 py-1 border rounded hover:bg-background">A+</button>
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider opacity-60">Tema</label>
                <div className="flex gap-2">
                  {(["light", "sepia", "dark"] as Theme[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setPreferences(prev => ({ ...prev, theme: t }));
                        localStorage.setItem("bible-theme", t);
                      }}
                      className={`flex-1 py-2 rounded border capitalize text-sm transition-all ${preferences.theme === t ? 'ring-2 ring-primary ring-offset-2' : ''} ${themeClasses[t]}`}
                    >
                      {t === 'light' ? 'Claro' : t === 'sepia' ? 'Sépia' : 'Escuro'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="relative min-h-[60vh] px-6 py-10 sm:px-12 sm:py-16" ref={scrollRef}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${book.nome}-${currentChapter.capitulo}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            style={{ fontSize: `${preferences.fontSize}px`, lineHeight: 1.7 }}
            className="font-body max-w-2xl mx-auto"
          >
            <div className="space-y-6">
              {currentChapter.versiculos.map((v) => (
                <p key={v.versiculo} className="group flex gap-4">
                  <span className="mt-1.5 shrink-0 text-xs font-bold font-mono opacity-40 select-none">
                    {v.versiculo}
                  </span>
                  <span>{v.texto}</span>
                </p>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between p-4 border-t bg-opacity-50 backdrop-blur-sm">
        <button
          onClick={handlePrev}
          disabled={!hasPrev}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${!hasPrev ? 'opacity-30 cursor-not-allowed' : 'hover:bg-primary/10 text-primary'}`}
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="hidden sm:inline font-medium">Anterior</span>
        </button>

        <div className="text-sm font-medium opacity-60">
          Capítulo {currentChapter.capitulo} de {book.capitulos.length}
        </div>

        <button
          onClick={handleNext}
          disabled={!hasNext}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${!hasNext ? 'opacity-30 cursor-not-allowed' : 'hover:bg-primary/10 text-primary'}`}
        >
          <span className="hidden sm:inline font-medium">Próximo</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
