"use client";

import { Check } from "lucide-react";
import type { PropsPrayerListItem } from "@/types/rosario";

/** Uma linha de texto clicável representando uma oração da sequência do terço. */
export function PrayerListItem({ passo, ativo, concluido, onSelecionar }: PropsPrayerListItem) {
  return (
    <button
      type="button"
      onClick={onSelecionar}
      aria-current={ativo ? "step" : undefined}
      aria-label={`${passo.rotulo}${concluido ? " — concluída" : ""}`}
      className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left font-body-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cobalt ${ativo ? "bg-cobalt text-white" : `hover:bg-secondary/5 ${concluido ? "text-primary" : "text-on-surface"}`
        }`}
    >
      <span
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${ativo ? "border-white/70" : concluido ? "border-current" : "border-secondary/25"
          }`}
        aria-hidden="true"
      >
        {concluido && <Check size={11} strokeWidth={3} />}
      </span>
      <span className={ativo ? "font-semibold" : undefined}>{passo.rotulo}</span>
    </button>
  );
}
