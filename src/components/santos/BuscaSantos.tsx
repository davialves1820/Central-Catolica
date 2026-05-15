"use client";

import { PropsBuscaSantos } from "@/types/santos";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition, useEffect, useState } from "react";
import { Search, Loader2 } from "lucide-react";

export default function BuscaSantos({ valorInicial }: PropsBuscaSantos) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(valorInicial);

  useEffect(() => {
    setValue(valorInicial);
  }, [valorInicial]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setValue(val);
      const q = new URLSearchParams(searchParams.toString());
      if (val) q.set("busca", val);
      else q.delete("busca");
      q.delete("pagina");
      startTransition(() => router.push(`/santos?${q.toString()}`));
    },
    [router, searchParams],
  );

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