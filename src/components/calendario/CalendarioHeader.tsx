"use client";

import { ChevronLeft, ChevronRight, LayoutGrid, List } from "lucide-react";

import { PropsCabecalhoCalendario } from "@/types/calendario";

export default function CalendarioHeader({ rotuloMes, modoVisualizacao, aoMudarModo, aoAnterior, aoProximo, aoHoje, }: PropsCabecalhoCalendario) {
  return (
    <div
      className="px-4 py-4 sm:p-6 border-b border-border flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap"
      style={{ background: "hsl(var(--secondary)/0.3)" }}
    >
      {/* Month title */}
      <div className="min-w-0 flex-1">
        <h2 className="font-heading text-lg sm:text-2xl font-bold text-foreground capitalize truncate leading-tight">
          {rotuloMes}
        </h2>
        <p className="font-body text-[10px] text-muted-foreground mt-0.5 hidden sm:block uppercase tracking-widest font-bold">
          Calendário Litúrgico
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-1 sm:gap-2 shrink-0 flex-wrap justify-end">

        {/* Grid / List toggle — desktop only */}
        <div
          className="hidden md:flex rounded-lg border border-border overflow-hidden"
          role="group"
          aria-label="Modo de visualização"
        >
          {([
            ["grade", <LayoutGrid key="grade" size={15} aria-hidden="true" />, "Grade"],
            ["lista", <List key="lista" size={15} aria-hidden="true" />, "Lista"],
          ] as const).map(([mode, icon, label]) => (
            <button
              key={mode}
              onClick={() => aoMudarModo(mode)}
              type="button"
              aria-label={label}
              aria-pressed={modoVisualizacao === mode}
              className="p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              style={
                modoVisualizacao === mode
                  ? { background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }
                  : { background: "hsl(var(--card))", color: "hsl(var(--muted-foreground))" }
              }
            >
              {icon}
            </button>
          ))}
        </div>

        {/* Today button */}
        <button
          onClick={aoHoje}
          aria-label="Ir para hoje"
          className="px-3 py-1.5 text-xs font-body font-bold rounded-xl border border-border/50 transition-all active:scale-95 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-sm"
          style={{ background: "hsl(var(--card))", color: "hsl(var(--foreground))" }}
        >
          Hoje
        </button>

        {/* Prev / Next */}
        <div className="flex rounded-xl border border-border/50 overflow-hidden shadow-sm">
          <button
            onClick={aoAnterior}
            aria-label="Mês anterior"
            className="p-2 transition-colors active:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary border-r border-border/50"
            style={{ background: "hsl(var(--card))", color: "hsl(var(--muted-foreground))" }}
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            onClick={aoProximo}
            aria-label="Próximo mês"
            className="p-2 transition-colors active:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            style={{ background: "hsl(var(--card))", color: "hsl(var(--muted-foreground))" }}
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
