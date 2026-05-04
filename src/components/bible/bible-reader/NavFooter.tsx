import { ChevronLeft, ChevronRight } from "lucide-react";
import { type ThemeTokens } from "@/types";

interface NavFooterProps {
  t: ThemeTokens;
  chapterIndex: number;
  total: number;
  hasNext: boolean;
  hasPrev: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export function NavFooter({
  t,
  chapterIndex,
  total,
  hasNext,
  hasPrev,
  onPrev,
  onNext,
}: NavFooterProps) {
  return (
    <div
      className={`flex items-center justify-between p-4 border-t sticky bottom-0 backdrop-blur-sm ${t.toolbar}`}
    >
      <button
        onClick={onPrev}
        disabled={!hasPrev}
        aria-label={hasPrev ? "Capítulo anterior" : "Sem capítulo anterior"}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-body font-semibold text-sm transition-all border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${t.border} ${hasPrev ? t.muted : "opacity-20 cursor-not-allowed"
          }`}
      >
        <ChevronLeft size={18} aria-hidden="true" />
        <span className="hidden sm:inline">Anterior</span>
      </button>

      <div className="flex flex-col items-center gap-1">
        <p className={`text-xs font-bold font-body ${t.muted}`}>
          {chapterIndex + 1} / {total}
        </p>
        <div className="flex gap-0.5" aria-hidden="true">
          {Array.from({ length: Math.min(total, 20) }).map((_, i) => {
            const idx = Math.floor((i / 20) * total);
            return (
              <div
                key={i}
                className="w-1 h-1 rounded-full transition-colors"
                style={{
                  background:
                    idx <= chapterIndex ? "hsl(var(--gold))" : "hsl(var(--border))",
                }}
              />
            );
          })}
        </div>
      </div>

      <button
        onClick={onNext}
        disabled={!hasNext}
        aria-label={hasNext ? "Próximo capítulo" : "Sem próximo capítulo"}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-body font-semibold text-sm transition-all border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${t.border} ${hasNext ? t.muted : "opacity-20 cursor-not-allowed"
          }`}
      >
        <span className="hidden sm:inline">Próximo</span>
        <ChevronRight size={18} aria-hidden="true" />
      </button>
    </div>
  );
}
