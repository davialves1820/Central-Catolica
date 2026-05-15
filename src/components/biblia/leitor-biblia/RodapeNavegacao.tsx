import { ChevronLeft, ChevronRight } from "lucide-react";
import { PropsRodapeNavegacao } from "@/types/biblia";

export default function RodapeNavegacao({
  t,
  indexCapitulo,
  total,
  temProximo,
  temAnterior,
  aoAnterior,
  aoProximo,
}: PropsRodapeNavegacao) {
  return (
    <div
      className={`flex items-center justify-between px-6 py-4 border-t sticky bottom-0 backdrop-blur-md z-30 ${t.barraFerramentas}`}
    >
      <button
        onClick={aoAnterior}
        disabled={!temAnterior}
        aria-label={temAnterior ? "Capítulo anterior" : "Sem capítulo anterior"}
        className={`group flex items-center gap-3 px-6 py-3 rounded-xl font-body font-bold text-xs uppercase tracking-widest transition-all border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${t.borda} ${temAnterior ? t.muted + " hover:border-primary/50" : "opacity-10 cursor-not-allowed"
          }`}
      >
        <ChevronLeft size={16} aria-hidden="true" className="group-hover:-translate-x-1 transition-transform" />
        <span className="hidden sm:inline">Anterior</span>
      </button>

      <div className="flex flex-col items-center gap-1.5">
        <p className={`text-[10px] font-bold font-body uppercase tracking-[0.2em] ${t.muted} opacity-60`}>
          Capítulo {indexCapitulo + 1} de {total}
        </p>
        <div className="flex gap-1" aria-hidden="true">
          {Array.from({ length: Math.min(total, 12) }).map((_, i) => {
            const idx = Math.floor((i / 12) * total);
            return (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full transition-all"
                style={{
                  background:
                    idx <= indexCapitulo ? "hsl(var(--primary))" : "hsl(var(--border))",
                  transform: idx === indexCapitulo ? "scale(1.2)" : "scale(1)"
                }}
              />
            );
          })}
        </div>
      </div>

      <button
        onClick={aoProximo}
        disabled={!temProximo}
        aria-label={temProximo ? "Próximo capítulo" : "Sem próximo capítulo"}
        className={`group flex items-center gap-3 px-6 py-3 rounded-xl font-body font-bold text-xs uppercase tracking-widest transition-all border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${t.borda} ${temProximo ? t.muted + " hover:border-primary/50" : "opacity-10 cursor-not-allowed"
          }`}
      >
        <span className="hidden sm:inline">Próximo</span>
        <ChevronRight size={16} aria-hidden="true" className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
