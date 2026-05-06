"use client";

import { SantosAlfabetoProps } from "@/types/santos";
import { useRouter } from "next/navigation";

const LETRAS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function SantosAlfabeto({ inicialAtiva, tipo, busca }: SantosAlfabetoProps) {
  const router = useRouter();

  function handleInicial(letra: string) {
    const q = new URLSearchParams();
    if (tipo && tipo !== "Todos") q.set("tipo", tipo);
    if (busca) q.set("busca", busca);
    // Toggle: clicando na mesma letra, remove o filtro
    if (letra !== inicialAtiva) q.set("inicial", letra);
    router.push(`/santos?${q.toString()}`);
  }

  return (
    <div
      className="py-3 overflow-x-auto"
      role="group"
      aria-label="Filtrar por inicial do nome"
    >
      <div className="flex items-center gap-0.5 min-w-max mx-auto w-fit">
        {/* Botão Todos */}
        <button
          onClick={() => handleInicial("")}
          aria-pressed={!inicialAtiva}
          aria-label="Mostrar todos"
          className="h-8 px-3 rounded-lg text-xs font-body font-bold uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          style={
            !inicialAtiva
              ? {
                  color: "hsl(var(--gold))",
                  background: "hsl(var(--gold)/0.12)",
                }
              : {
                  color: "hsl(var(--muted-foreground))",
                  background: "transparent",
                }
          }
        >
          Todos
        </button>

        <div
          className="mx-2 h-5 w-px"
          style={{ background: "hsl(var(--border))" }}
          aria-hidden="true"
        />

        {/* Letras */}
        {LETRAS.map((letra) => {
          const isActive = inicialAtiva === letra;
          return (
            <button
              key={letra}
              onClick={() => handleInicial(letra)}
              aria-pressed={isActive}
              aria-label={`Santos com inicial ${letra}`}
              className="h-8 w-8 rounded-lg text-sm font-body font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:scale-110"
              style={
                isActive
                  ? {
                      color: "hsl(var(--gold))",
                      background: "hsl(var(--gold)/0.12)",
                    }
                  : {
                      color: "hsl(var(--muted-foreground))",
                      background: "transparent",
                    }
              }
            >
              {letra}
            </button>
          );
        })}
      </div>
    </div>
  );
}
