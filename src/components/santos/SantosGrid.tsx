"use client";

import Image from "next/image";
import Link from "next/link";
import { SantosGridProps, SantoCardProps } from "@/types/santos";
import { Calendar } from "lucide-react";

const TIPO_COLOR: Record<string, { color: string; border: string; bg: string }> = {
  "Santo Mártir": {
    color: "hsl(var(--crimson-light))",
    border: "hsl(var(--crimson)/0.35)",
    bg: "hsl(var(--crimson)/0.12)",
  },
};
const DEFAULT_COLOR = {
  color: "hsl(var(--gold))",
  border: "hsl(var(--gold)/0.35)",
  bg: "hsl(var(--gold)/0.12)",
};

export default function SantosGrid({ santos }: SantosGridProps) {
  if (santos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <p
          className="font-heading text-7xl mb-6"
          style={{ color: "hsl(var(--gold)/0.12)" }}
          aria-hidden="true"
        >
          ✝
        </p>
        <p className="text-muted-foreground font-body text-base mb-1">Nenhum santo encontrado.</p>
        <p className="text-muted-foreground/60 font-body text-sm mb-6">Tente ajustar os filtros ou a busca.</p>
        <Link
          href="/santos"
          className="text-sm font-body font-bold rounded-xl px-5 py-2.5 border transition-all hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          style={{ color: "hsl(var(--gold))", borderColor: "hsl(var(--gold)/0.3)", background: "hsl(var(--gold)/0.06)" }}
        >
          Limpar filtros
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {santos.map((santo) => <SantoCard key={santo.slug} santo={santo} />)}
    </div>
  );
}

function SantoCard({ santo }: SantoCardProps) {
  const s = TIPO_COLOR[santo.tipo] ?? DEFAULT_COLOR;

  return (
    <Link
      href={`/santos/${santo.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      style={{
        background: "hsl(var(--card))",
        borderColor: "hsl(var(--border))",
        boxShadow: "0 2px 8px hsl(var(--ink)/0.06)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.borderColor = s.border;
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 12px 32px hsl(var(--ink)/0.22), 0 0 0 1px ${s.border}`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.borderColor = "hsl(var(--border))";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 2px 8px hsl(var(--ink)/0.06)";
      }}
      aria-label={santo.nome}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden" style={{ background: "hsl(var(--secondary))" }}>
        {santo.imagem_url ? (
          <Image
            src={santo.imagem_url}
            alt={santo.nome}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.06]"
            unoptimized
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-heading text-5xl" style={{ color: "hsl(var(--gold)/0.1)" }} aria-hidden="true">✝</span>
          </div>
        )}

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: "linear-gradient(to top, hsl(var(--ink)/0.92) 0%, hsl(var(--ink)/0.35) 50%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/* Shine on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: "linear-gradient(135deg, hsl(var(--gold)/0.12) 0%, transparent 60%)",
          }}
          aria-hidden="true"
        />

        {/* Type badge */}
        <div className="absolute left-2.5 top-2.5">
          <span
            className="rounded-full px-2.5 py-0.5 text-[10px] font-bold font-body uppercase tracking-wider border backdrop-blur-sm"
            style={{ color: s.color, borderColor: s.border, background: s.bg }}
          >
            {santo.tipo}
          </span>
        </div>

        {/* Name + date overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3.5">
          <h2 className="font-heading text-sm font-semibold leading-snug text-white group-hover:text-white/90 transition-colors">
            {santo.nome}
          </h2>
          {santo.data_festa && (
            <p
              className="mt-1 flex items-center gap-1 text-[11px] font-body"
              style={{ color: "hsl(var(--gold)/0.7)" }}
            >
              <Calendar size={9} aria-hidden="true" />
              {santo.data_festa}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
