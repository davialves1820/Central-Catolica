import { type LucideIcon } from "lucide-react";

export type Theme = "parchment" | "dark" | "white";
export type FontSize = 14 | 16 | 18 | 20 | 22 | 24;
export type ReadingMode = "paginated" | "continuous";

export interface Verse {
  versiculo: number;
  texto: string;
}

export interface Chapter {
  capitulo: number;
  versiculos: Verse[];
}

export interface Book {
  nome: string;
  capitulos: Chapter[];
}

export interface ThemeTokens {
  bg: string;
  container: string;
  text: string;
  muted: string;
  border: string;
  toolbar: string;
  verse: string;
  highlight: string;
}

export const THEMES: Record<Theme, ThemeTokens> = {
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

export const THEME_LABELS: Record<Theme, string> = {
  parchment: "Pergaminho",
  dark: "Velino",
  white: "Branco",
};

export const FONT_SIZE_MIN: FontSize = 14;
export const FONT_SIZE_MAX: FontSize = 24;
export const FONT_SIZE_STEP = 2;

export interface BibleData {
  antigoTestamento: Book[];
  novoTestamento: Book[];
}

export interface ProgressInfoProps {
    timestamp: number;
}

export interface GoldIconBadgeProps {
    icon: LucideIcon;
    "aria-hidden"?: boolean;
}

export interface ContinueReadingLinkProps {
    bookName: string;
    chapter: number;
}

export interface VerseItemProps {
  verse: Verse;
  t: ThemeTokens;
  fontSize: number;
  isFirst: boolean;
  isHighlighted: boolean;
  verseRef: (el: HTMLElement | null) => void;
}

export interface ToolbarButtonProps {
    onClick: () => void;
    active?: boolean;
    label: string;
    children: React.ReactNode;
}

export interface TableOfContentsProps {
  t: ThemeTokens;
  chapters: Chapter[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (index: number) => void;
}

export interface SettingsPanelProps {
  t: ThemeTokens;
  isOpen: boolean;
  fontSize: FontSize;
  theme: Theme;
  bg: string;
  onFontSizeChange: (s: FontSize) => void;
  onThemeChange: (th: Theme) => void;
}

export interface ReaderToolbarProps {
  t: ThemeTokens;
  bookName: string;
  chapterNumber: number;
  verseCount: number;
  readingMode: ReadingMode;
  showTOC: boolean;
  showSettings: boolean;
  onToggleTOC: () => void;
  onToggleSettings: () => void;
  onToggleReadingMode: () => void;
}

export interface ReaderProgressBarProps {
  current: number;
  total: number;
}

export interface NavFooterProps {
  t: ThemeTokens;
  chapterIndex: number;
  total: number;
  hasNext: boolean;
  hasPrev: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export interface ChapterHeadingProps {
  t: ThemeTokens;
  bookName: string;
  chapterNumber: number;
}

export interface ChapterContentProps {
  book: Book;
  chapterIndex: number;
  direction: 1 | -1;
  fontSize: FontSize;
  t: ThemeTokens;
  readingMode: ReadingMode;
  flashVerse: number | undefined;
  verseRefs: React.MutableRefObject<Map<number, HTMLElement>>;
}

export interface BibleReaderProps {
  book: Book;
  initialChapterIndex: number;
  highlightVerse?: number;
}

export interface ChapterPageProps {
  params: Promise<{ book: string; chapter: string }>;
  searchParams: Promise<{ v?: string }>;
}