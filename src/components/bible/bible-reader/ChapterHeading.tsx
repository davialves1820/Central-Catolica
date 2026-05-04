import { type ThemeTokens } from "@/types";

interface ChapterHeadingProps {
  t: ThemeTokens;
  bookName: string;
  chapterNumber: number;
}

export function ChapterHeading({ t, bookName, chapterNumber }: ChapterHeadingProps) {
  return (
    <div className="text-center mb-10">
      <p
        className="text-xs font-bold font-body uppercase tracking-[0.3em] mb-2"
        style={{ color: "hsl(var(--gold))" }}
      >
        {bookName}
      </p>
      <h2 className={`font-heading text-3xl font-semibold ${t.text}`}>
        Capítulo {chapterNumber}
      </h2>
      <div
        className="mt-3 mx-auto w-14 h-px"
        style={{ background: "hsl(var(--gold)/0.4)" }}
        aria-hidden="true"
      />
    </div>
  );
}
