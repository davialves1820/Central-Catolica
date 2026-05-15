"use client";

import { ChevronLeft, ChevronRight, LayoutGrid, List } from "lucide-react";
import { PropsCabecalhoCalendario } from "@/types/calendario";

export default function CalendarioHeader({
  rotuloMes,
  modoVisualizacao,
  aoMudarModo,
  aoAnterior,
  aoProximo,
  aoHoje,
}: PropsCabecalhoCalendario) {
  return (
    <div className="flex items-center justify-between mb-8 flex-wrap gap-4 px-2">
      <h2 className="font-display-md text-display-sm sm:text-display-md text-on-surface uppercase tracking-tighter leading-none">
        {rotuloMes}
      </h2>
      
      <div className="flex items-center gap-4">
        {/* Today Button */}
        <button 
          onClick={aoHoje}
          className="px-4 py-2 border border-secondary/30 hover:bg-secondary/5 transition-colors font-label-sm text-label-sm text-secondary uppercase tracking-widest"
        >
          Hoje
        </button>

        {/* View Mode Toggle */}
        <div className="flex items-center ghost-border overflow-hidden">
          <button
            onClick={() => aoMudarModo("grade")}
            className={`p-2 transition-colors ${modoVisualizacao === "grade" ? "bg-primary text-background" : "hover:bg-surface-container-low text-on-surface-variant"}`}
            title="Visualização em Grade"
          >
            <LayoutGrid size={18} />
          </button>
          <button
            onClick={() => aoMudarModo("lista")}
            className={`p-2 transition-colors border-l border-outline-variant/20 ${modoVisualizacao === "lista" ? "bg-primary text-background" : "hover:bg-surface-container-low text-on-surface-variant"}`}
            title="Visualização em Lista"
          >
            <List size={18} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex gap-2">
          <button 
            onClick={aoAnterior}
            className="w-10 h-10 flex items-center justify-center ghost-border hover:bg-surface-container-low transition-colors"
          >
            <ChevronLeft size={20} className="text-on-surface-variant" />
          </button>
          <button 
            onClick={aoProximo}
            className="w-10 h-10 flex items-center justify-center ghost-border hover:bg-surface-container-low transition-colors"
          >
            <ChevronRight size={20} className="text-on-surface-variant" />
          </button>
        </div>
      </div>
    </div>
  );
}

