"use client";

import type { PropsSeletorEstadoVida } from "@/types/confissao";

export function SeletorEstadoVida({ opcoes, estadoSelecionado, onSelecionar }: PropsSeletorEstadoVida) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3" role="tablist" aria-label="Escolha do estado de vida">
      {opcoes.map((opcao) => {
        const ativo = opcao.slug === estadoSelecionado;
        return (
          <button
            key={opcao.slug}
            type="button"
            role="tab"
            aria-selected={ativo}
            onClick={() => onSelecionar(opcao.slug)}
            className={`flex flex-col items-center gap-1.5 rounded-xl border px-4 py-5 text-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cobalt ${
              ativo
                ? "border-transparent bg-primary text-white shadow-md scale-[1.02]"
                : "border-secondary/15 text-on-surface hover:scale-[1.01] hover:shadow-sm"
            }`}
          >
            <span aria-hidden="true" className="text-2xl leading-none">
              {opcao.emoji}
            </span>
            <span className="font-body-sm font-semibold leading-tight">{opcao.nome}</span>
            <span className={`font-label-sm ${ativo ? "text-white/85" : "text-on-surface-variant"}`}>
              {opcao.descricao}
            </span>
          </button>
        );
      })}
    </div>
  );
}
