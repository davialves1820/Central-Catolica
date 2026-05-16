"use client";

import { PropsBuscaSantos } from "@/types/santos";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition, useEffect, useState } from "react";
import { Search, Loader2 } from "lucide-react";

export default function BuscaSantos({ valorInicial }: PropsBuscaSantos) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(valorInicial);
  const [prevValorInicial, setPrevValorInicial] = useState(valorInicial);

  // Sync internal state with URL when it changes externally (e.g., back button)
  if (valorInicial !== prevValorInicial) {
    setPrevValorInicial(valorInicial);
    setValue(valorInicial);
  }
  // Debounce the URL update
  useEffect(() => {
    const timer = setTimeout(() => {
      if (value === valorInicial) return;
      
      const q = new URLSearchParams(searchParams.toString());
      if (value) q.set("busca", value);
      else q.delete("busca");
      q.delete("pagina");
      
      startTransition(() => {
        router.push(`/santos?${q.toString()}`, { scroll: false });
      });
    }, 300); // Reduced to 300ms for better responsiveness

    return () => clearTimeout(timer);
  }, [value, router, searchParams, valorInicial]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
        {isPending
          ? <Loader2 size={16} className="animate-spin text-outline" aria-hidden="true" />
          : <Search size={16} className="text-outline group-focus-within:text-primary transition-colors" aria-hidden="true" />
        }
      </div>
      <input
        type="search"
        value={value}
        onChange={handleChange}
        placeholder="Buscar por nome..."
        aria-label="Buscar santos"
        className="w-full bg-transparent border-b border-outline py-2 pl-8 pr-4 text-sm font-body-md outline-none transition-all focus:border-secondary focus:ring-0 placeholder:text-outline-variant"
      />
    </div>
  );
}