"use client";

import Image from "next/image";
import { Noticia, ESTILO_FONTE } from "@/types";
import { formatarData } from "@/lib/server/services/noticias";
import { ExternalLink } from "lucide-react";

export default function NoticiaDestaque({ noticia }: { noticia: Noticia }) {
  if (!noticia) return null;

  const estiloFonte = ESTILO_FONTE[noticia.fonte] ?? ESTILO_FONTE.vaticannews;

  return (
    <a
      href={noticia.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Ler notícia em destaque: ${noticia.titulo}`}
      className="noticia-destaque group relative flex min-h-[360px] md:min-h-[440px] overflow-hidden rounded-2xl border border-border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      style={{
        "--hover-border": estiloFonte.borda,
      } as React.CSSProperties}
    >

      {/* Background image */}
      {noticia.imagem ? (
        <Image
          src={noticia.imagem}
          alt={noticia.titulo}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          unoptimized
          priority
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{ background: "hsl(var(--secondary))" }}
          aria-hidden="true"
        />
      )}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, hsl(var(--ink)/0.95) 0%, hsl(var(--ink)/0.6) 50%, hsl(var(--ink)/0.15) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Top ornamental line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${estiloFonte.cor}60, transparent)`,
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative mt-auto p-7 md:p-10">
        <div className="mb-4 flex items-center gap-3 flex-wrap">
          <span
            className="rounded-full px-3 py-1 text-xs font-bold font-body uppercase tracking-wider border"
            style={{
              color: estiloFonte.cor,
              borderColor: estiloFonte.borda,
            }}
          >
            {noticia.fonteLabel}
          </span>
          {noticia.categoria && (
            <span className="text-xs text-white/50 font-body">{noticia.categoria}</span>
          )}
        </div>

        <h2
          className="font-heading text-2xl md:text-3xl font-bold leading-snug text-white"
          style={{ textShadow: "0 2px 12px hsl(var(--ink)/0.6)" }}
        >
          {noticia.titulo}
        </h2>

        {noticia.resumo && (
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65 font-body">
            {noticia.resumo}
          </p>
        )}

        <div className="mt-6 flex items-center gap-3">
          <p
            className="flex items-center gap-1.5 text-sm font-body font-bold"
            style={{ color: estiloFonte.cor }}
          >
            Ler na íntegra
            <ExternalLink
              size={14}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              aria-hidden="true"
            />
          </p>
          <span className="text-white/20" aria-hidden="true">•</span>
          <span className="text-xs text-white/50 font-body">
            {formatarData(noticia.publicadoEm)}
          </span>
        </div>
      </div>
    </a>
  );
}