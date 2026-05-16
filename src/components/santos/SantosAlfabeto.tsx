"use client";

import { PropsAlfabetoSantos } from "@/types/santos";
import { useRouter, useSearchParams } from "next/navigation";

const LETRAS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function AlfabetoSantos({ inicialAtiva }: PropsAlfabetoSantos) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleInicial(letra: string) {
    const q = new URLSearchParams(searchParams.toString());
    
    if (letra !== inicialAtiva && letra !== "") {
      q.set("inicial", letra);
    } else {
      q.delete("inicial");
    }
    
    // Reset page when filter changes
    q.delete("pagina");
    
    router.push(`/santos?${q.toString()}`, { scroll: false });
  }

  return (
    <div className="py-2 overflow-x-auto" role="group" aria-label="Filtrar por inicial do nome">
      <div className="flex items-center gap-1 min-w-max mx-auto w-fit">
        <button
          onClick={() => handleInicial("")}
          className={`h-8 px-4 text-[10px] font-bold uppercase tracking-widest transition-all ${
            !inicialAtiva ? "bg-primary text-on-primary" : "text-on-surface-variant hover:text-primary"
          }`}
        >
          Todos
        </button>

        <div className="mx-2 h-4 w-px bg-outline-variant/30" aria-hidden="true" />

        {LETRAS.map((letra) => {
          const isActive = inicialAtiva === letra;
          return (
            <button
              key={letra}
              onClick={() => handleInicial(letra)}
              className={`h-8 w-8 flex items-center justify-center text-xs font-bold transition-all ${
                isActive ? "bg-primary text-on-primary" : "text-on-surface-variant hover:text-primary"
              }`}
            >
              {letra}
            </button>
          );
        })}
      </div>
    </div>
  );
}
