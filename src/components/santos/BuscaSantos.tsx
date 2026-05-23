"use client";

import { PropsBuscaSantos, Santo } from "@/types/santos";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { Search, Loader2 } from "lucide-react";
import Link from "next/link";

export default function BuscaSantos({ valorInicial }: PropsBuscaSantos) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(valorInicial);
  const [results, setResults] = useState<Santo[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [prevValorInicial, setPrevValorInicial] = useState(valorInicial);
  const [prevValue, setPrevValue] = useState(valorInicial);

  // Sync internal state with URL when it changes externally (e.g., back button)
  if (valorInicial !== prevValorInicial) {
    setPrevValorInicial(valorInicial);
    setValue(valorInicial);
    setPrevValue(valorInicial);
  }

  // Fecha o dropdown se clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update URL for the full page grid filter, and fetch API for instant dropdown
  useEffect(() => {
    if (value === prevValue) return;

    const timer = setTimeout(async () => {
      setPrevValue(value);

      // 1. Atualiza a URL para manter o estado (a GradeSantos principal ainda será filtrada)
      const q = new URLSearchParams(searchParams.toString());
      const currentBusca = q.get("busca") || "";
      
      // Só faz o push se o valor digitado for diferente do que está na URL
      if (value !== currentBusca) {
        if (value) q.set("busca", value);
        else q.delete("busca");
        q.delete("pagina");
        router.push(`/santos?${q.toString()}`, { scroll: false });
      }

      // 2. Busca os dados via API para feedback instantâneo (dropdown)
      if (value.length < 2) {
        setResults([]);
        setIsOpen(false);
        setIsPending(false);
        return;
      }

      setIsPending(true);
      try {
        const res = await fetch(`/api/santos/search?q=${encodeURIComponent(value)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.results);
          setIsOpen(true);
        }
      } catch (err) {
        console.error("Erro na busca", err);
      } finally {
        setIsPending(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [value, router, searchParams, prevValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="relative group w-full" ref={wrapperRef}>
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
        onFocus={() => value.length >= 2 && setIsOpen(true)}
        placeholder="Buscar por nome..."
        aria-label="Buscar santos"
        className="w-full bg-transparent border-b border-outline py-2 pl-8 pr-4 text-sm font-body-md outline-none transition-all focus:border-secondary focus:ring-0 placeholder:text-outline-variant"
      />

      {/* Dropdown de resultados instantâneos */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface-container-high border border-outline-variant rounded-xl shadow-lg overflow-hidden z-50">
          <ul className="max-h-64 overflow-y-auto py-2">
            {results.map((santo) => (
              <li key={santo.slug}>
                <Link
                  href={`/santos/${santo.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-surface-container-highest transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-heading text-sm text-on-surface truncate">{santo.nome}</p>
                    <p className="font-body-sm text-xs text-on-surface-variant truncate">
                      {santo.data_festa}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}