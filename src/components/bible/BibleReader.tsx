"use client";

import { Book } from "@/types";
import { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Settings,
  List,
  BookOpen,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface BibleReaderProps {
  book: Book;
  initialChapterIndex: number;
}

type Theme = "light" | "dark" | "sepia";
type FontSize = 14 | 16 | 18 | 20 | 22 | 24;

const THEME_STYLES: Record<Theme, { container: string; text: string; muted: string; border: string; toolbar: string; verse: string }> = {
  light: {
    container: "bg-white text-slate-900",
    text: "text-slate-900",
    muted: "text-slate-400",
    border: "border-slate-100",
    toolbar: "bg-white/95 border-slate-100",
    verse: "hover:bg-slate-50",
  },
  sepia: {
    container: "bg-[#f8f1e4] text-[#4a3728]",
    text: "text-[#4a3728]",
    muted: "text-[#9a8070]",
    border: "border-[#e0d0b8]",
    toolbar: "bg-[#f8f1e4]/95 border-[#e0d0b8]",
    verse: "hover:bg-[#f0e6d0]",
  },
  dark: {
    container: "bg-slate-950 text-slate-100",
    text: "text-slate-100",
    muted: "text-slate-500",
    border: "border-slate-800",
    toolbar: "bg-slate-950/95 border-slate-800",
    verse: "hover:bg-slate-900",
  },
};

const THEME_LABELS: Record<Theme, string> = {
  light: "Claro",
  sepia: "Sépia",
  dark: "Escuro",
};

export default function BibleReader({ book, initialChapterIndex }: BibleReaderProps) {
  const [chapterIndex, setChapterIndex] = useState(initialChapterIndex);
  const [fontSize, setFontSize] = useState<FontSize>(18);
  const [theme, setTheme] = useState<Theme>("light");
  const [showSettings, setShowSettings] = useState(false);
  const [showTOC, setShowTOC] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const contentRef = useRef<HTMLDivElement>(null);

  const currentChapter = book.capitulos[chapterIndex];
  const hasNext = chapterIndex < book.capitulos.length - 1;
  const hasPrev = chapterIndex > 0;
  const t = THEME_STYLES[theme];

  // Persist preferences
  useEffect(() => {
    const savedSize = localStorage.getItem("bible-font-size");
    const savedTheme = localStorage.getItem("bible-theme") as Theme;
    
    // Defer state updates to avoid synchronous setState in effect warning
    if (savedSize || savedTheme) {
      window.requestAnimationFrame(() => {
        if (savedSize) setFontSize(parseInt(savedSize) as FontSize);
        if (savedTheme && THEME_STYLES[savedTheme]) setTheme(savedTheme);
      });
    }
  }, []);

  // Save progress & sync URL
  useEffect(() => {
    localStorage.setItem(
      "bible-progress",
      JSON.stringify({
        bookName: book.nome,
        chapter: currentChapter.capitulo,
        timestamp: Date.now(),
      })
    );
    window.history.replaceState(
      {},
      "",
      `/biblia/${encodeURIComponent(book.nome)}/${currentChapter.capitulo}`
    );
  }, [chapterIndex, book.nome, currentChapter.capitulo]);

  const navigate = (delta: 1 | -1) => {
    const next = chapterIndex + delta;
    if (next < 0 || next >= book.capitulos.length) return;
    setDirection(delta);
    setChapterIndex(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const setAndPersistFontSize = (s: FontSize) => {
    setFontSize(s);
    localStorage.setItem("bible-font-size", String(s));
  };

  const setAndPersistTheme = (th: Theme) => {
    setTheme(th);
    localStorage.setItem("bible-theme", th);
  };

  const progress = ((chapterIndex + 1) / book.capitulos.length) * 100;

  return (
    <div className={`relative rounded-2xl overflow-hidden border shadow-xl transition-colors duration-300 ${t.container} ${t.border}`}>

      {/* ── Progress bar ──────────────────────────────────────── */}
      <div className={`h-0.5 w-full ${theme === "dark" ? "bg-slate-800" : "bg-slate-100"}`}>
        <motion.div
          className="h-full bg-accent"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* ── Toolbar ───────────────────────────────────────────── */}
      <div className={`flex items-center justify-between px-4 py-3 border-b sticky top-0 z-20 backdrop-blur-sm ${t.toolbar}`}>
        <div className="flex items-center gap-2">
          {/* Table of contents toggle */}
          <button
            onClick={() => setShowTOC(!showTOC)}
            title="Capítulos"
            className={`p-2 rounded-lg transition-colors ${showTOC ? "bg-primary text-white" : `${t.verse} ${t.muted} hover:${t.text}`}`}
          >
            <List size={18} />
          </button>

          <Link
            href="/biblia"
            title="Voltar à Bíblia"
            className={`p-2 rounded-lg transition-colors ${t.verse} ${t.muted}`}
          >
            <BookOpen size={18} />
          </Link>

          <div className={`w-px h-5 mx-1 ${theme === "dark" ? "bg-slate-700" : "bg-slate-200"}`} />

          <div>
            <p className={`font-heading font-bold text-base leading-tight ${t.text}`}>
              {book.nome}
            </p>
            <p className={`text-xs ${t.muted} font-body`}>
              Capítulo {currentChapter.capitulo} · {currentChapter.versiculos.length} versículos
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowSettings(!showSettings)}
          title="Configurações"
          className={`p-2 rounded-lg transition-colors ${showSettings ? "bg-primary text-white" : `${t.verse} ${t.muted}`}`}
        >
          <Settings size={18} />
        </button>
      </div>

      {/* ── Table of Contents panel ───────────────────────────── */}
      <AnimatePresence>
        {showTOC && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`absolute top-0 left-0 h-full w-64 z-30 border-r shadow-xl overflow-y-auto ${t.container} ${t.border}`}
          >
            <div className={`flex items-center justify-between p-4 border-b sticky top-0 ${t.toolbar}`}>
              <p className={`font-heading font-bold text-sm ${t.text}`}>
                Capítulos
              </p>
              <button
                onClick={() => setShowTOC(false)}
                className={`p-1.5 rounded-lg ${t.verse} ${t.muted}`}
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-3 grid grid-cols-4 gap-1.5">
              {book.capitulos.map((ch, idx) => (
                <button
                  key={ch.capitulo}
                  onClick={() => {
                    setDirection(idx > chapterIndex ? 1 : -1);
                    setChapterIndex(idx);
                    setShowTOC(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`aspect-square rounded-xl text-sm font-bold font-body transition-all ${idx === chapterIndex
                      ? "bg-primary text-white shadow-md shadow-primary/30"
                      : `${t.verse} ${t.muted} hover:${t.text}`
                    }`}
                >
                  {ch.capitulo}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Settings panel ────────────────────────────────────── */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`overflow-hidden border-b ${t.border}`}
          >
            <div className={`p-5 grid sm:grid-cols-2 gap-6 ${t.container}`}>
              {/* Font size */}
              <div className="space-y-3">
                <p className={`text-xs font-bold uppercase tracking-wider ${t.muted}`}>
                  Tamanho da Fonte
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setAndPersistFontSize(Math.max(14, fontSize - 2) as FontSize)}
                    className={`w-9 h-9 rounded-xl border flex items-center justify-center font-bold ${t.verse} ${t.border} ${t.muted}`}
                  >
                    A−
                  </button>
                  <span className={`flex-1 text-center font-mono text-sm font-bold ${t.text}`}>
                    {fontSize}px
                  </span>
                  <button
                    onClick={() => setAndPersistFontSize(Math.min(24, fontSize + 2) as FontSize)}
                    className={`w-9 h-9 rounded-xl border flex items-center justify-center font-bold ${t.verse} ${t.border} ${t.muted}`}
                  >
                    A+
                  </button>
                </div>
              </div>

              {/* Theme */}
              <div className="space-y-3">
                <p className={`text-xs font-bold uppercase tracking-wider ${t.muted}`}>
                  Tema de Leitura
                </p>
                <div className="flex gap-2">
                  {(["light", "sepia", "dark"] as Theme[]).map((th) => (
                    <button
                      key={th}
                      onClick={() => setAndPersistTheme(th)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold font-body border transition-all ${THEME_STYLES[th].container
                        } ${THEME_STYLES[th].border} ${theme === th
                          ? "ring-2 ring-primary ring-offset-2"
                          : "opacity-70"
                        }`}
                    >
                      {THEME_LABELS[th]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Content ───────────────────────────────────────────── */}
      <div
        ref={contentRef}
        className="relative min-h-[70vh] px-5 py-12 sm:px-14 sm:py-16"
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={`${book.nome}-${currentChapter.capitulo}`}
            custom={direction}
            variants={{
              enter: (d: number) => ({ x: d * 40, opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (d: number) => ({ x: d * -40, opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: "easeInOut" }}
            style={{ fontSize: `${fontSize}px`, lineHeight: 1.85 }}
            className="font-body max-w-2xl mx-auto"
          >
            {/* Chapter heading */}
            <div className="text-center mb-10">
              <p className={`text-xs font-bold uppercase tracking-[0.25em] mb-2 text-accent`}>
                {book.nome}
              </p>
              <h2 className={`font-heading text-3xl font-bold ${t.text}`}>
                Capítulo {currentChapter.capitulo}
              </h2>
              <div className="mt-3 mx-auto w-16 h-px bg-accent/40" />
            </div>

            {/* Verses */}
            <div className="space-y-1">
              {currentChapter.versiculos.map((v, idx) => (
                <p
                  key={v.versiculo}
                  className={`group flex gap-4 rounded-xl px-3 py-2 transition-colors duration-150 ${t.verse}`}
                >
                  <span
                    className={`mt-1 shrink-0 text-xs font-bold font-mono select-none w-6 text-right ${t.muted} opacity-60`}
                  >
                    {v.versiculo}
                  </span>
                  <span className={t.text}>
                    {/* Drop cap on first verse */}
                    {idx === 0 ? (
                      <>
                        <span
                          className="float-left font-heading font-bold text-accent mr-2 leading-none"
                          style={{ fontSize: `${fontSize * 2.8}px`, lineHeight: 0.85 }}
                        >
                          {v.texto.charAt(0)}
                        </span>
                        {v.texto.slice(1)}
                      </>
                    ) : (
                      v.texto
                    )}
                  </span>
                </p>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Navigation footer ─────────────────────────────────── */}
      <div className={`flex items-center justify-between p-4 border-t sticky bottom-0 backdrop-blur-sm ${t.toolbar}`}>
        <button
          onClick={() => navigate(-1)}
          disabled={!hasPrev}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-body font-semibold text-sm transition-all ${hasPrev
              ? `${t.verse} ${t.text} hover:text-primary border ${t.border}`
              : "opacity-25 cursor-not-allowed"
            }`}
        >
          <ChevronLeft size={18} />
          <span className="hidden sm:inline">Anterior</span>
        </button>

        <div className="flex flex-col items-center gap-1">
          <p className={`text-xs font-bold font-body ${t.muted}`}>
            {chapterIndex + 1} / {book.capitulos.length}
          </p>
          {/* Mini progress dots */}
          <div className="flex gap-0.5">
            {Array.from({ length: Math.min(book.capitulos.length, 20) }).map((_, i) => {
              const idx = Math.floor((i / 20) * book.capitulos.length);
              return (
                <div
                  key={i}
                  className={`w-1 h-1 rounded-full transition-colors ${idx <= chapterIndex ? "bg-accent" : theme === "dark" ? "bg-slate-700" : "bg-slate-200"
                    }`}
                />
              );
            })}
          </div>
        </div>

        <button
          onClick={() => navigate(1)}
          disabled={!hasNext}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-body font-semibold text-sm transition-all ${hasNext
              ? `${t.verse} ${t.text} hover:text-primary border ${t.border}`
              : "opacity-25 cursor-not-allowed"
            }`}
        >
          <span className="hidden sm:inline">Próximo</span>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}