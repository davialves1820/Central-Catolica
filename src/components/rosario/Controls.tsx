"use client";

import { ChevronLeft, ChevronRight, RotateCcw, History } from "lucide-react";
import type { PropsControls } from "@/types/rosario";

function BotaoIcone({
  aoClicar,
  rotulo,
  desabilitado,
  children,
}: {
  aoClicar: () => void;
  rotulo: string;
  desabilitado?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={aoClicar}
      disabled={desabilitado}
      aria-label={rotulo}
      title={rotulo}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-secondary/20 text-on-surface transition-colors hover:bg-secondary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt disabled:opacity-30 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}

export function Controls({
  temAnterior,
  temProxima,
  iniciado,
  podeContinuar,
  onProxima,
  onAnterior,
  onReiniciar,
  onContinuar,
}: PropsControls) {
  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Navegação entre orações">
      <BotaoIcone aoClicar={onAnterior} rotulo="Oração anterior" desabilitado={!temAnterior}>
        <ChevronLeft size={18} aria-hidden="true" />
      </BotaoIcone>

      <button
        type="button"
        onClick={onProxima}
        disabled={!temProxima}
        className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-4 font-body-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt disabled:opacity-30 disabled:cursor-not-allowed"
      >
        {iniciado ? "Próxima oração" : "Começar"}
        <ChevronRight size={16} aria-hidden="true" />
      </button>

      <BotaoIcone aoClicar={onReiniciar} rotulo="Reiniciar terço">
        <RotateCcw size={16} aria-hidden="true" />
      </BotaoIcone>

      {podeContinuar && (
        <BotaoIcone aoClicar={onContinuar} rotulo="Continuar de onde parei">
          <History size={16} aria-hidden="true" />
        </BotaoIcone>
      )}
    </div>
  );
}
