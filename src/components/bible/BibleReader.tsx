"use client";

import { Book } from "@/types";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  ChevronLeft, ChevronRight, Settings, List,
  BookOpen, X, ScrollText, BookMarked,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface BibleReaderProps {
  book: Book;
  initialChapterIndex: number;
  highlightVerse?: number;
}

type Theme = "parchment" | "dark" | "white";
type FontSize = 14 | 16 | 18 | 20 | 22 | 24;
type ReadingMode = "paginated" | "continuous";

const THEMES: Record<Theme, {
  bg: string; container: string; text: string; muted: string;
  border: string; toolbar: string; verse: string; highlight: string;
}> = {
  parchment: {
  bg: "hsl(40,35%,88%)",
  container: "text-[#2a1d0b]",
  text: "text-[#2a1d0b]",
  muted: "text-[#5f5038]",
  border: "border-[#b8954a66]",
  toolbar: "bg-[#e6dcc2] border-[#b8954a88]",
  verse: "hover:bg-[#b8954a22]",
  highlight: "bg-[#c8960c33] border-l-4 border-[#a87400]",
},

dark: {
  bg: "hsl(30,14%,9%)",
  container: "text-[#f5efe4]",
  text: "text-[#f5efe4]",
  muted: "text-[#b0a48f]",
  border: "border-[#4a423280]",
  toolbar: "bg-[#1f1a15] border-[#4a4232]",
  verse: "hover:bg-[#3a332a80]",
  highlight: "bg-[#c8960c33] border-l-4 border-[#d4a017]",
},

white: {
  bg: "#ffffff",
  container: "text-slate-900",
  text: "text-slate-900",
  muted: "text-slate-500",
  border: "border-slate-300",
  toolbar: "bg-white border-slate-300",
  verse: "hover:bg-slate-100",
  highlight: "bg-amber-200 border-l-4 border-amber-600",
},
};

const THEME_LABELS: Record<Theme, string> = {
  parchment: "Pergaminho",
  dark: "Velino",
  white: "Branco",
};

export default function BibleReader({ book, initialChapterIndex, highlightVerse }: BibleReaderProps) {
  const [chapterIndex, setChapterIndex] = useState(initialChapterIndex);
  const [fontSize, setFontSize] = useState<FontSize>(18);
  const [theme, setTheme] = useState<Theme>("parchment");
  const [readingMode, setReadingMode] = useState<ReadingMode>("paginated");
  const [showSettings, setShowSettings] = useState(false);
  const [showTOC, setShowTOC] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [flashVerse, setFlashVerse] = useState<number | undefined>(highlightVerse);
  const verseRefs = useRef<Map<number, HTMLElement>>(new Map());
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const currentChapter = book.capitulos[chapterIndex];
  const hasNext = chapterIndex < book.capitulos.length - 1;
  const hasPrev = chapterIndex > 0;
  const t = THEMES[theme];

  useEffect(() => {
    const sz = localStorage.getItem("bible-font-size");
    const th = localStorage.getItem("bible-theme") as Theme;
    const md = localStorage.getItem("bible-reading-mode") as ReadingMode;
    window.requestAnimationFrame(() => {
      if (sz) setFontSize(parseInt(sz) as FontSize);
      if (th && THEMES[th]) setTheme(th);
      if (md) setReadingMode(md);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("bible-progress", JSON.stringify({
      bookName: book.nome, chapter: currentChapter.capitulo, timestamp: Date.now(),
    }));
    const hash = flashVerse ? `#v-${flashVerse}` : "";
    window.history.replaceState({}, "", `/biblia/${encodeURIComponent(book.nome)}/${currentChapter.capitulo}${hash}`);
  }, [chapterIndex, book.nome, currentChapter.capitulo, flashVerse]);

  useEffect(() => {
    if (!flashVerse) return;
    const el = verseRefs.current.get(flashVerse);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 400);
      const tid = setTimeout(() => setFlashVerse(undefined), 3500);
      return () => clearTimeout(tid);
    }
  }, [flashVerse, chapterIndex]);

  useEffect(() => { setFlashVerse(highlightVerse); }, [highlightVerse]);

  const navigate = useCallback((delta: 1 | -1) => {
    const next = chapterIndex + delta;
    if (next < 0 || next >= book.capitulos.length) return;
    setDirection(delta);
    setFlashVerse(undefined);
    setChapterIndex(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [chapterIndex, book.capitulos.length]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) navigate(dx < 0 ? 1 : -1);
    touchStartX.current = null;
    touchStartY.current = null;
  };

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") navigate(1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") navigate(-1);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [navigate]);

  const persistFontSize = (s: FontSize) => { setFontSize(s); localStorage.setItem("bible-font-size", String(s)); };
  const persistTheme = (th: Theme) => { setTheme(th); localStorage.setItem("bible-theme", th); };
  const persistMode = (m: ReadingMode) => { setReadingMode(m); localStorage.setItem("bible-reading-mode", m); };

  const progress = ((chapterIndex + 1) / book.capitulos.length) * 100;

  const renderVerse = (v: { versiculo: number; texto: string }, idx: number, isFirst: boolean) => {
    const isHighlighted = v.versiculo === flashVerse;
    return (
      <p key={v.versiculo} id={`v-${v.versiculo}`}
        ref={(el) => { if (el) verseRefs.current.set(v.versiculo, el); else verseRefs.current.delete(v.versiculo); }}
        className={`group flex gap-4 rounded-lg px-3 py-2 transition-all duration-500 ${t.verse} ${isHighlighted ? t.highlight : ""}`}
        style={{ fontFamily: "var(--font-reading)", lineHeight: 1.9 }}
        aria-label={`Versículo ${v.versiculo}`}
      >
        <span className={`mt-1 shrink-0 text-xs font-mono select-none w-6 text-right ${t.muted} opacity-50`}>
          {v.versiculo}
        </span>
        <span className={t.text}>
          {isFirst ? (
            <>
              <span className="float-left font-heading font-bold mr-2 leading-none"
                style={{ fontSize: `${fontSize * 2.8}px`, lineHeight: 0.85, color: "hsl(var(--gold))" }}>
                {v.texto.charAt(0)}
              </span>
              {v.texto.slice(1)}
            </>
          ) : v.texto}
        </span>
      </p>
    );
  };

  const ChapterHeading = ({ cap }: { cap: typeof currentChapter }) => (
    <div className="text-center mb-10">
      <p className="text-xs font-bold font-body uppercase tracking-[0.3em] mb-2"
        style={{ color: "hsl(var(--gold))" }}>{book.nome}</p>
      <h2 className={`font-heading text-3xl font-semibold ${t.text}`}>Capítulo {cap.capitulo}</h2>
      <div className="mt-3 mx-auto w-14 h-px" style={{ background: "hsl(var(--gold)/0.4)" }} aria-hidden="true" />
    </div>
  );

  const TBtn = ({ onClick, active, label, children }: {
    onClick: () => void; active?: boolean; label: string; children: React.ReactNode;
  }) => (
    <button onClick={onClick} aria-label={label} aria-pressed={active}
      className="p-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      style={active ? { background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" } : undefined}
    >
      {children}
    </button>
  );

  return (
    <div className={`relative rounded-2xl overflow-hidden border shadow-2xl transition-colors duration-300 ${t.border}`}
      style={{ background: t.bg }}
      onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
    >
      {/* Progress bar */}
      <div className="h-0.5 w-full" style={{ background: "hsl(var(--border))" }}
        role="progressbar" aria-valuenow={chapterIndex + 1} aria-valuemin={1}
        aria-valuemax={book.capitulos.length} aria-label={`Capítulo ${chapterIndex + 1} de ${book.capitulos.length}`}
      >
        <motion.div className="h-full" style={{ background: "hsl(var(--gold))" }}
          animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
      </div>

      {/* Toolbar */}
      <div className={`flex items-center justify-between px-4 py-3 border-b sticky top-0 z-20 backdrop-blur-sm ${t.toolbar}`}>
        <div className="flex items-center gap-2">
          <TBtn onClick={() => setShowTOC(!showTOC)} active={showTOC}
            label={showTOC ? "Fechar índice" : "Abrir índice de capítulos"}>
            <List size={18} aria-hidden="true" />
          </TBtn>
          <Link href="/biblia" aria-label="Voltar para a Bíblia"
            className={`p-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${t.muted}`}>
            <BookOpen size={18} aria-hidden="true" />
          </Link>
          <div className="w-px h-5 mx-1 opacity-20" style={{ background: "currentColor" }} aria-hidden="true" />
          <div>
            <p className={`font-heading font-semibold text-base leading-tight ${t.text}`}>{book.nome}</p>
            <p className={`text-xs font-body ${t.muted}`}>
              Cap. {currentChapter.capitulo} · {currentChapter.versiculos.length} versículos
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <TBtn onClick={() => persistMode(readingMode === "paginated" ? "continuous" : "paginated")}
            active={readingMode === "continuous"}
            label={readingMode === "paginated" ? "Leitura contínua" : "Leitura paginada"}>
            {readingMode === "paginated"
              ? <ScrollText size={18} aria-hidden="true" />
              : <BookMarked size={18} aria-hidden="true" />}
          </TBtn>
          <TBtn onClick={() => setShowSettings(!showSettings)} active={showSettings}
            label={showSettings ? "Fechar configurações" : "Configurações de leitura"}>
            <Settings size={18} aria-hidden="true" />
          </TBtn>
        </div>
      </div>

      {/* TOC */}
      <AnimatePresence>
        {showTOC && (
          <motion.div initial={{ x: -280, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
            exit={{ x: -280, opacity: 0 }} transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className={`absolute top-0 left-0 h-full w-60 z-30 border-r overflow-y-auto ${t.border}`}
            style={{ background: t.bg }} role="dialog" aria-label="Índice de capítulos"
          >
            <div className={`flex items-center justify-between p-4 border-b sticky top-0 ${t.toolbar}`}>
              <p className={`font-heading font-semibold text-sm ${t.text}`}>Capítulos</p>
              <button onClick={() => setShowTOC(false)} aria-label="Fechar índice"
                className={`p-1.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${t.muted}`}>
                <X size={15} aria-hidden="true" />
              </button>
            </div>
            <div className="p-3 grid grid-cols-4 gap-1.5">
              {book.capitulos.map((ch, idx) => (
                <button key={ch.capitulo}
                  onClick={() => { setDirection(idx > chapterIndex ? 1 : -1); setChapterIndex(idx); setFlashVerse(undefined); setShowTOC(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  aria-label={`Capítulo ${ch.capitulo}`} aria-current={idx === chapterIndex ? "true" : undefined}
                  className={`aspect-square rounded-lg text-sm font-bold font-body transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
                  style={idx === chapterIndex
                    ? { background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }
                    : { color: t.muted.replace("text-[", "").replace("]", "") }}
                >
                  {ch.capitulo}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings */}
      <AnimatePresence>
        {showSettings && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.18 }}
            className={`overflow-hidden border-b ${t.border}`}
          >
            <div className="p-5 grid sm:grid-cols-2 gap-6" style={{ background: t.bg }}>
              {/* Font */}
              <div className="space-y-3">
                <p className={`text-xs font-bold font-body uppercase tracking-wider ${t.muted}`}>Tamanho</p>
                <div className="flex items-center gap-3" role="group" aria-label="Tamanho da fonte">
                  <button onClick={() => persistFontSize(Math.max(14, fontSize - 2) as FontSize)} aria-label="Diminuir fonte"
                    className={`w-9 h-9 rounded-lg border flex items-center justify-center font-bold text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${t.muted} ${t.border}`}>A−</button>
                  <span className={`flex-1 text-center font-mono text-sm font-bold ${t.text}`} aria-live="polite">{fontSize}px</span>
                  <button onClick={() => persistFontSize(Math.min(24, fontSize + 2) as FontSize)} aria-label="Aumentar fonte"
                    className={`w-9 h-9 rounded-lg border flex items-center justify-center font-bold text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${t.muted} ${t.border}`}>A+</button>
                </div>
              </div>
              {/* Theme */}
              <div className="space-y-3">
                <p className={`text-xs font-bold font-body uppercase tracking-wider ${t.muted}`}>Tema</p>
                <div className="flex gap-2" role="group" aria-label="Tema de leitura">
                  {(["parchment", "dark", "white"] as Theme[]).map((th) => (
                    <button key={th} onClick={() => persistTheme(th)}
                      aria-label={`Tema ${THEME_LABELS[th]}`} aria-pressed={theme === th}
                      className="flex-1 py-2 rounded-lg text-xs font-bold font-body border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      style={{
                        background: THEMES[th].bg,
                        color: th === "dark" ? "#f0ebe0" : "#2c1f0e",
                        borderColor: theme === th ? "hsl(var(--gold))" : "transparent",
                        boxShadow: theme === th ? "0 0 0 2px hsl(var(--gold)/0.4)" : "none",
                      }}
                    >{THEME_LABELS[th]}</button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="relative min-h-[70vh] px-5 py-12 sm:px-14 sm:py-16"
        style={{ fontSize: `${fontSize}px` }}>
        {readingMode === "paginated" ? (
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={`${book.nome}-${currentChapter.capitulo}`} custom={direction}
              variants={{ enter: (d: number) => ({ x: d * 36, opacity: 0 }), center: { x: 0, opacity: 1 }, exit: (d: number) => ({ x: d * -36, opacity: 0 }) }}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.26, ease: "easeInOut" }} className="max-w-2xl mx-auto"
            >
              <ChapterHeading cap={currentChapter} />
              <div className="space-y-0.5">
                {currentChapter.versiculos.map((v, idx) => renderVerse(v, idx, idx === 0))}
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="max-w-2xl mx-auto">
            <p className="text-center text-xs font-body mb-10 uppercase tracking-widest"
              style={{ color: "hsl(var(--gold)/0.45)" }}>Leitura contínua</p>
            {book.capitulos.map((cap) => (
              <div key={cap.capitulo} className="mb-16">
                <ChapterHeading cap={cap} />
                <div className="space-y-0.5">
                  {cap.versiculos.map((v, vi) => renderVerse(v, vi, vi === 0))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Nav footer */}
      {readingMode === "paginated" && (
        <div className={`flex items-center justify-between p-4 border-t sticky bottom-0 backdrop-blur-sm ${t.toolbar}`}>
          <button onClick={() => navigate(-1)} disabled={!hasPrev}
            aria-label={hasPrev ? `Capítulo anterior` : "Sem capítulo anterior"}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-body font-semibold text-sm transition-all border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${t.border} ${hasPrev ? `${t.muted}` : "opacity-20 cursor-not-allowed"}`}
          >
            <ChevronLeft size={18} aria-hidden="true" />
            <span className="hidden sm:inline">Anterior</span>
          </button>

          <div className="flex flex-col items-center gap-1">
            <p className={`text-xs font-bold font-body ${t.muted}`}>{chapterIndex + 1} / {book.capitulos.length}</p>
            <div className="flex gap-0.5" aria-hidden="true">
              {Array.from({ length: Math.min(book.capitulos.length, 20) }).map((_, i) => {
                const idx = Math.floor((i / 20) * book.capitulos.length);
                return <div key={i} className="w-1 h-1 rounded-full transition-colors"
                  style={{ background: idx <= chapterIndex ? "hsl(var(--gold))" : "hsl(var(--border))" }} />;
              })}
            </div>
          </div>

          <button onClick={() => navigate(1)} disabled={!hasNext}
            aria-label={hasNext ? `Próximo capítulo` : "Sem próximo capítulo"}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-body font-semibold text-sm transition-all border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${t.border} ${hasNext ? `${t.muted}` : "opacity-20 cursor-not-allowed"}`}
          >
            <span className="hidden sm:inline">Próximo</span>
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      )}

      <p className="md:hidden text-center py-2 text-xs font-body select-none"
        style={{ color: "hsl(var(--gold)/0.3)" }} aria-hidden="true">← deslize para navegar →</p>
    </div>
  );
}
