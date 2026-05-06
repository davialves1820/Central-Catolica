"use client";

import { SantosSearchProps } from "@/types/santos";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import { Search, Loader2 } from "lucide-react";

export default function SantosSearch({ valorInicial }: SantosSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const valor = e.target.value;
      const q = new URLSearchParams(searchParams.toString());
      if (valor) q.set("busca", valor); else q.delete("busca");
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
        defaultValue={valorInicial}
        onChange={handleChange}
        placeholder="Buscar por nome"
        aria-label="Buscar santos"
        className="w-full rounded-xl border py-3 pl-10 pr-4 text-sm font-body outline-none transition-all focus-visible:ring-2 focus-visible:ring-primary"
        style={{
          background: "hsl(var(--card))",
          borderColor: "hsl(var(--border))",
          color: "hsl(var(--foreground))",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "hsl(var(--gold)/0.5)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "hsl(var(--border))";
        }}
      />
    </div>
  );
}
