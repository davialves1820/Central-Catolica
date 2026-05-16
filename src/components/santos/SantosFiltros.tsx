"use client";

import { PropsFiltrosSantos } from "@/types/santos";
import { useRouter, useSearchParams } from "next/navigation";

export default function FiltrosSantos({ tipoAtivo }: PropsFiltrosSantos) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTipo = (tipo: string) => {
    const q = new URLSearchParams(searchParams.toString());
    if (tipo !== "Todos") q.set("tipo", tipo);
    else q.delete("tipo");
    
    // Reset page when filter changes
    q.delete("pagina");
    
    router.push(`/santos?${q.toString()}`, { scroll: false });
  };

  const options = [
    { label: "Todos", value: "Todos" },
    { label: "Doutores", value: "Doutor" },
    { label: "Apóstolos", value: "Apostolo" },
  ];

  return (
    <div className="flex items-center justify-center gap-4">
      {options.map((opt) => {
        const isActive = opt.value === "Todos" ? tipoAtivo === "Todos" : tipoAtivo === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => handleTipo(opt.value)}
            className={`px-8 py-2 text-[10px] font-bold uppercase tracking-widest transition-all border ${isActive
                ? "bg-primary text-on-primary border-primary shadow-sm"
                : "bg-transparent text-on-surface-variant border-outline-variant hover:border-primary hover:text-primary"
              }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
