"use client";

import type { PropsMysterySelector } from "@/types/rosario";

export function MysterySelector({
  grupos,
  misterioSlug,
  slugRecomendadoHoje,
  onSelecionar,
}: PropsMysterySelector) {
  return (
    <div
      className="grid grid-cols-2 gap-2 sm:gap-3"
      role="tablist"
      aria-label="Escolha dos mistérios do terço"
    >
      {grupos.map((grupo) => {
        const ativo = grupo.slug === misterioSlug;
        const recomendadoHoje = grupo.slug === slugRecomendadoHoje;
        return (
          <button
            key={grupo.slug}
            type="button"
            role="tab"
            aria-selected={ativo}
            onClick={() => onSelecionar(grupo.slug)}
            className={`relative flex flex-col items-center gap-1 rounded-xl border px-3 py-3 text-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cobalt ${ativo
              ? "border-transparent text-white shadow-md scale-[1.02]"
              : "border-secondary/15 text-on-surface hover:scale-[1.01] hover:shadow-sm"
              }`}
            style={ativo ? { backgroundColor: grupo.cor } : undefined}
          >
            {recomendadoHoje && (
              <span
                className="absolute -top-2 -right-2 rounded-full bg-primary px-1.5 py-0.5 font-label-sm text-[9px] text-white shadow-sm"
                aria-label="Recomendado para hoje"
              >
                hoje
              </span>
            )}
            <span aria-hidden="true" className="text-lg leading-none">
              {grupo.emoji}
            </span>
            <span className="font-body-sm font-semibold leading-tight">{grupo.nome.replace("Mistérios ", "")}</span>
          </button>
        );
      })}
    </div>
  );
}
