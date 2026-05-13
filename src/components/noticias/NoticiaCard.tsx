"use client";

import Image from "next/image";
import { Noticia, ESTILO_FONTE } from "@/types";
import { formatarData } from "@/lib/server/services/noticias";
import { ExternalLink } from "lucide-react";

export default function NoticiaCard({ noticia }: { noticia: Noticia }) {
  const estiloFonte = ESTILO_FONTE[noticia.fonte] ?? ESTILO_FONTE.vaticannews;

  return (
    <a
      href={noticia.url}
      target="_blank"
      rel="noopener noreferrer"
      className="noticia-card group flex flex-col overflow-hidden rounded-xl border border-border transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      style={{
        background: "hsl(var(--card))",
        "--hover-border": estiloFonte.borda,
        "--hover-shadow": estiloFonte.cor,
      } as React.CSSProperties}
    >
      {/* Image */}
      {noticia.imagem && (
        <div
          className="relative h-44 overflow-hidden"
          style={{ background: "hsl(var(--secondary))" }}
        >
          <Image
            src={noticia.imagem}
            alt={noticia.titulo}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
            aria-hidden="true"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Source + category badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="rounded-full px-2.5 py-0.5 text-[10px] font-bold font-body uppercase tracking-wider border"
            style={{
              color: estiloFonte.cor,
              borderColor: estiloFonte.borda,
            }}
          >
            {noticia.fonteLabel}
          </span>
          {noticia.categoria && (
            <span className="text-[10px] text-muted-foreground font-body">
              {noticia.categoria}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-heading text-base font-semibold leading-snug text-foreground/90 group-hover:text-foreground transition-colors">
          {noticia.titulo}
        </h3>

        {/* Summary */}
        {noticia.resumo && (
          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground font-body">
            {noticia.resumo}
          </p>
        )}

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between pt-2 border-t border-border/40">
          <p className="text-xs text-muted-foreground font-body">
            {formatarData(noticia.publicadoEm)}
          </p>
          <span
            className="flex items-center gap-1 text-xs font-body font-bold transition-colors opacity-0 group-hover:opacity-100"
            style={{ color: estiloFonte.cor }}
          >
            Ler íntegra
            <ExternalLink size={11} aria-hidden="true" />
          </span>
        </div>
      </div>
    </a>
  );
}