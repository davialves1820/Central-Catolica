import { type ThemeTokens, type Verse } from "@/types";

interface VerseItemProps {
  verse: Verse;
  t: ThemeTokens;
  fontSize: number;
  isFirst: boolean;
  isHighlighted: boolean;
  verseRef: (el: HTMLElement | null) => void;
}

export function VerseItem({
  verse,
  t,
  fontSize,
  isFirst,
  isHighlighted,
  verseRef,
}: VerseItemProps) {
  return (
    <p
      id={`v-${verse.versiculo}`}
      ref={verseRef}
      className={`group flex gap-4 rounded-lg px-3 py-2 transition-all duration-500 ${t.verse} ${isHighlighted ? t.highlight : ""
        }`}
      style={{ fontFamily: "var(--font-reading)", lineHeight: 1.9 }}
      aria-label={`Versículo ${verse.versiculo}`}
    >
      <span
        className={`mt-1 shrink-0 text-xs font-mono select-none w-6 text-right ${t.muted} opacity-50`}
      >
        {verse.versiculo}
      </span>
      <span className={t.text}>
        {isFirst ? (
          <>
            <span
              className="float-left font-heading font-bold mr-2 leading-none"
              style={{
                fontSize: `${fontSize * 2.8}px`,
                lineHeight: 0.85,
                color: "hsl(var(--gold))",
              }}
            >
              {verse.texto.charAt(0)}
            </span>
            {verse.texto.slice(1)}
          </>
        ) : (
          verse.texto
        )}
      </span>
    </p>
  );
}
