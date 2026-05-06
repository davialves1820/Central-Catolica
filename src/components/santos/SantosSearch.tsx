"use client";

import { SantosSearchProps } from "@/types/santos";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition, useEffect, useState } from "react";
import { Search, Loader2 } from "lucide-react";

export default function SantosSearch({ valorInicial }: SantosSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Controlled — stays in sync when user navigates back/forward
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
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        {isPending
          ? <Loader2 size={16} className="animate-spin text-muted-foreground" aria-hidden="true" />
          : <Search size={16} className="text-muted-foreground group-focus-within:text-primary transition-colors" aria-hidden="true" />
        }
      </div>
      <input
        type="search"
        value={value}
        onChange={handleChange}
        placeholder="Buscar por nome"
        aria-label="Buscar santos"
        className="w-full rounded-xl border py-3 pl-10 pr-4 text-sm font-body outline-none transition-all focus-visible:ring-2 focus-visible:ring-primary focus:border-[hsl(var(--gold)/0.5)]"
        style={{
          background: "hsl(var(--card))",
          borderColor: "hsl(var(--border))",
          color: "hsl(var(--foreground))",
        }}
      />
    </div>
  );
}