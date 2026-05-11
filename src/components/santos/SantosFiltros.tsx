"use client";

import { PropsFiltrosSantos } from "@/types/santos";
import { useRouter } from "next/navigation";

const COR_TIPO: Record<string, { cor: string; borda: string; fundo: string }> = {
  "Santo Mártir": {
    cor:  "hsl(var(--crimson-light))",
    borda: "hsl(var(--crimson)/0.35)",
    fundo:     "hsl(var(--crimson)/0.08)",
  },
};
const COR_PADRAO = {
  cor:  "hsl(var(--gold))",
  borda: "hsl(var(--gold)/0.35)",
  fundo:     "hsl(var(--gold)/0.08)",
};

export default function FiltrosSantos({ tipos, tipoAtivo, busca, inicial }: PropsFiltrosSantos) {
  const router = useRouter();

  function handleTipo(tipo: string) {
    const q = new URLSearchParams();
    if (tipo !== "Todos") q.set("tipo", tipo);
    if (busca) q.set("busca", busca);
    if (inicial) q.set("inicial", inicial);
    router.push(`/santos?${q.toString()}`);
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Filtrar por tipo">
      {tipos.map((tipo) => {
        const isActive = tipoAtivo === tipo;
        const s = COR_TIPO[tipo] ?? COR_PADRAO;
        return (
          <button
            key={tipo}
            onClick={() => handleTipo(tipo)}
            aria-pressed={isActive}
            aria-label={`Filtrar por ${tipo}`}
            className="rounded-full px-4 py-1.5 text-sm font-body font-semibold border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:-translate-y-px"
            style={
              isActive
                ? { color: s.cor, borderColor: s.borda, background: s.fundo }
                : { color: "hsl(var(--muted-foreground))", borderColor: "hsl(var(--border))", background: "hsl(var(--card))" }
            }
          >
            {tipo}
          </button>
        );
      })}
    </div>
  );
}
