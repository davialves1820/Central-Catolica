"use client";

import { PropsSecaoSalmo } from "../../types/liturgia";
import { Music } from "lucide-react";

const PsalmSection = ({ salmo }: PropsSecaoSalmo) => {
  return (
    <section
      className="space-y-6 rounded-2xl border p-7"
      style={{
        background: "hsl(var(--secondary))",
        borderColor: "hsl(var(--gold)/0.15)",
      }}
      aria-labelledby="psalm-heading"
    >
      <div className="flex items-center gap-3 border-b border-border pb-3">
        <Music size={20} aria-hidden="true" style={{ color: "hsl(var(--gold))" }} />
        <h2
          id="psalm-heading"
          className="font-heading text-2xl font-semibold text-foreground"
        >
          Salmo Responsorial
        </h2>
      </div>

      <div className="space-y-6 text-center">
        {/* Reference */}
        <p
          className="text-xs font-bold font-body uppercase tracking-widest"
          style={{ color: "hsl(var(--gold))" }}
        >
          {salmo.referencia}
        </p>

        {/* Refrain */}
        <div
          className="rounded-xl border p-5"
          style={{
            background: "hsl(var(--card))",
            borderColor: "hsl(var(--gold)/0.2)",
          }}
        >
          <p
            className="text-xl font-heading font-semibold text-foreground italic"
          >
            R. {salmo.refrao}
          </p>
        </div>

        {/* Psalm text */}
        <div
          className="text-foreground/80 leading-[1.95] whitespace-pre-line text-left"
          style={{
            fontFamily: "var(--font-reading)",
            fontSize: "1.05rem",
          }}
        >
          {salmo.texto}
        </div>
      </div>
    </section>
  );
};

export default PsalmSection;