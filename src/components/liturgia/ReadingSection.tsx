"use client";

import { ReadingSectionProps } from "../../types/liturgia";

const ReadingSection = ({ title, leitura, Icon, isGospel }: ReadingSectionProps) => {
  return (
    <section className="space-y-5">
      {/* Label */}
      <div className="flex items-center gap-3 border-b border-border pb-3">
        <Icon
          size={20}
          aria-hidden="true"
          style={{ color: isGospel ? "hsl(var(--crimson-light))" : "hsl(var(--gold))" }}
        />
        <h2
          className="font-heading text-2xl font-semibold"
          style={{ color: isGospel ? "hsl(var(--crimson-light))" : "hsl(var(--foreground))" }}
        >
          {title}
        </h2>
      </div>

      {/* Card */}
      <div
        className="rounded-2xl border p-7 shadow-xl"
        style={{
          background: "hsl(var(--card))",
          borderColor: isGospel
            ? "hsl(var(--crimson)/0.25)"
            : "hsl(var(--gold)/0.15)",
          boxShadow: isGospel
            ? "0 8px 32px hsl(var(--crimson)/0.06)"
            : "0 8px 32px hsl(var(--gold)/0.06)",
        }}
      >
        {/* Reference */}
        <p
          className="text-xs font-bold font-body uppercase tracking-widest mb-1"
          style={{ color: isGospel ? "hsl(var(--crimson-light))" : "hsl(var(--gold))" }}
        >
          {leitura.referencia}
        </p>

        {/* Title */}
        <h3
          className="font-heading text-xl md:text-2xl font-semibold mb-5"
          style={{ color: isGospel ? "hsl(var(--crimson-light))" : "hsl(var(--foreground))" }}
        >
          {leitura.titulo}
        </h3>

        {/* Text */}
        <div
          className="text-foreground/85 leading-[1.95] whitespace-pre-line"
          style={{
            fontFamily: "var(--font-reading)",
            fontSize: "1.05rem",
          }}
        >
          {leitura.texto}
        </div>
      </div>
    </section>
  );
};

export default ReadingSection;