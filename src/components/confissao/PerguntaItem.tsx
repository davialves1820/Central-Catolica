"use client";

import { Check } from "lucide-react";
import type { PropsPerguntaItem } from "@/types/confissao";

export function PerguntaItem({ texto, marcado, onAlternar }: PropsPerguntaItem) {
  return (
    <button
      type="button"
      onClick={onAlternar}
      aria-pressed={marcado}
      className="flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-secondary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cobalt"
    >
      <span
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
          marcado ? "border-primary bg-primary text-white" : "border-secondary/30"
        }`}
        aria-hidden="true"
      >
        {marcado && <Check size={13} strokeWidth={3} />}
      </span>
      <span className={`font-body-md leading-relaxed ${marcado ? "text-on-surface" : "text-on-surface-variant"}`}>
        {texto}
      </span>
    </button>
  );
}
