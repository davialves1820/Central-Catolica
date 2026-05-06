import { Settings, List, BookOpen, ScrollText, BookMarked } from "lucide-react";
import Link from "next/link";
import { type ReaderToolbarProps } from "@/types/bible";
import { ToolbarButton } from "@/components/bible/bible-reader/ToolbarButton";

export function ReaderToolbar({
  t,
  bookName,
  chapterNumber,
  verseCount,
  readingMode,
  showTOC,
  showSettings,
  onToggleTOC,
  onToggleSettings,
  onToggleReadingMode,
}: ReaderToolbarProps) {
  return (
    <div
      className={`flex items-center justify-between px-4 py-3 border-b sticky top-0 z-20 backdrop-blur-sm ${t.toolbar}`}
    >
      <div className="flex items-center gap-2">
        <ToolbarButton
          onClick={onToggleTOC}
          active={showTOC}
          label={showTOC ? "Fechar índice" : "Abrir índice de capítulos"}
        >
          <List size={18} aria-hidden="true" />
        </ToolbarButton>

        <Link
          href="/biblia"
          aria-label="Voltar para a Bíblia"
          className={`p-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${t.muted}`}
        >
          <BookOpen size={18} aria-hidden="true" />
        </Link>

        <div className="w-px h-5 mx-1 opacity-20" style={{ background: "currentColor" }} aria-hidden="true" />

        <div>
          <p className={`font-heading font-semibold text-base leading-tight ${t.text}`}>{bookName}</p>
          <p className={`text-xs font-body ${t.muted}`}>
            Cap. {chapterNumber} · {verseCount} versículos
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <ToolbarButton
          onClick={onToggleReadingMode}
          active={readingMode === "continuous"}
          label={readingMode === "paginated" ? "Leitura contínua" : "Leitura paginada"}
        >
          {readingMode === "paginated"
            ? <ScrollText size={18} aria-hidden="true" />
            : <BookMarked size={18} aria-hidden="true" />}
        </ToolbarButton>

        <ToolbarButton
          onClick={onToggleSettings}
          active={showSettings}
          label={showSettings ? "Fechar configurações" : "Configurações de leitura"}
        >
          <Settings size={18} aria-hidden="true" />
        </ToolbarButton>
      </div>
    </div>
  );
}
