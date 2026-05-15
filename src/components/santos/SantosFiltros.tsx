"use client";

import { PropsFiltrosSantos } from "@/types/santos";
import { useRouter } from "next/navigation";

export default function FiltrosSantos({ tipoAtivo, busca, inicial }: PropsFiltrosSantos) {
  const router = useRouter();

  const handleTipo = (tipo: string) => {
    const q = new URLSearchParams();
    if (tipo !== "Todos") q.set("tipo", tipo);
    if (busca) q.set("busca", busca);
    if (inicial) q.set("inicial", inicial);
    router.push(`/santos?${q.toString()}`);
  };

  const options = [
    { label: "Todos", value: "Todos" },
    { label: "Doutores", value: "Doutor" },
  ];

  return (
    <div className="flex items-center justify-center gap-4">
      {options.map((opt) => {
        const isActive = opt.value === "Todos" ? tipoAtivo === "Todos" : tipoAtivo === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => handleTipo(opt.value)}
            className={`px-8 py-2 text-[10px] font-bold uppercase tracking-widest transition-all border ${
              isActive
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
