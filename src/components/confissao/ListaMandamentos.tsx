"use client";

import { Check } from "lucide-react";
import type { PropsListaMandamentos } from "@/types/confissao";

/** Lista lateral navegável dos Dez Mandamentos. */
export function ListaMandamentos({
  mandamentos,
  mandamentoIndex,
  marcadosPorMandamento,
  onSelecionar,
}: PropsListaMandamentos) {
  return (
    <nav aria-label="Sequência dos Dez Mandamentos" className="max-h-[32rem] space-y-0.5 overflow-y-auto pr-1">
      {mandamentos.map((mandamento, indice) => {
        const ativo = indice === mandamentoIndex;
        const count = marcadosPorMandamento(mandamento);
        return (
          <button
            key={mandamento.numero}
            type="button"
            onClick={() => onSelecionar(indice)}
            aria-current={ativo ? "step" : undefined}
            className={`flex w-full items-start gap-2.5 rounded-lg px-3 py-2.5 text-left font-body-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cobalt ${
              ativo ? "bg-cobalt text-white" : "hover:bg-secondary/5 text-on-surface"
            }`}
          >
            <span
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border font-label-sm ${
                ativo ? "border-white/70" : "border-secondary/25"
              }`}
              aria-hidden="true"
            >
              {mandamento.numero}
            </span>
            <span className="flex-1">
              <span className={ativo ? "font-semibold" : undefined}>{mandamento.titulo}</span>
              {count > 0 && (
                <span
                  className={`ml-2 inline-flex items-center gap-1 font-label-sm ${
                    ativo ? "text-white/85" : "text-primary"
                  }`}
                >
                  <Check size={11} strokeWidth={3} aria-hidden="true" />
                  {count}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
