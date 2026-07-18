"use client";

import { ChevronLeft, ChevronRight, ClipboardList } from "lucide-react";
import type { PropsControls } from "@/types/confissao";

export function Controls({ temAnterior, temProxima, onAnterior, onProxima, onVerResumo }: PropsControls) {
  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Navegação entre mandamentos">
      <button
        type="button"
        onClick={onAnterior}
        disabled={!temAnterior}
        aria-label="Mandamento anterior"
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-secondary/20 text-on-surface transition-colors hover:bg-secondary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={18} aria-hidden="true" />
      </button>

      {temProxima ? (
        <button
          type="button"
          onClick={onProxima}
          className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-4 font-body-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt"
        >
          Próximo mandamento
          <ChevronRight size={16} aria-hidden="true" />
        </button>
      ) : (
        <button
          type="button"
          onClick={onVerResumo}
          className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-4 font-body-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt"
        >
          <ClipboardList size={16} aria-hidden="true" />
          Ver resumo
        </button>
      )}
    </div>
  );
}
