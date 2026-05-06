"use client";

import { SantosFiltrosProps } from "@/types/santos";
import { useRouter } from "next/navigation";

const TIPO_COLOR: Record<string, { color: string; border: string; bg: string }> = {
  "Santo Mártir": {
    color:  "hsl(var(--crimson-light))",
    border: "hsl(var(--crimson)/0.35)",
    bg:     "hsl(var(--crimson)/0.08)",
  },
};
const DEFAULT_COLOR = {
  color:  "hsl(var(--gold))",
  border: "hsl(var(--gold)/0.35)",
  bg:     "hsl(var(--gold)/0.08)",
};

export default function SantosFiltros({ tipos, tipoAtivo, busca, inicial }: SantosFiltrosProps) {
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
        const s = TIPO_COLOR[tipo] ?? DEFAULT_COLOR;
        return (
          <button
            key={tipo}
            onClick={() => handleTipo(tipo)}
            aria-pressed={isActive}
            aria-label={`Filtrar por ${tipo}`}
            className="rounded-full px-4 py-1.5 text-sm font-body font-semibold border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:-translate-y-px"
            style={
              isActive
                ? { color: s.color, borderColor: s.border, background: s.bg }
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
