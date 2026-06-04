"use client";

import { PropsBuscaSantos, Santo } from "@/types/santos";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useReducer, useRef } from "react";
import { Search, Loader2 } from "lucide-react";
import Link from "next/link";

interface Estado {
  value: string;
  results: Santo[];
  isPending: boolean;
  isOpen: boolean;
}

type Acao =
  | { type: "SET_VALUE"; payload: string }
  | { type: "SET_RESULTS"; payload: Santo[] }
  | { type: "SET_PENDING"; payload: boolean }
  | { type: "OPEN" }
  | { type: "CLOSE" }
  | { type: "RESET" };

function reducer(state: Estado, action: Acao): Estado {
  switch (action.type) {
    case "SET_VALUE":
      return { ...state, value: action.payload, isOpen: false };
    case "SET_RESULTS":
      return { ...state, results: action.payload };
    case "SET_PENDING":
      return { ...state, isPending: action.payload };
    case "OPEN":
      return { ...state, isOpen: true };
    case "CLOSE":
      return { ...state, isOpen: false };
    case "RESET":
      return { value: "", results: [], isPending: false, isOpen: false };
    default:
      return state;
  }
}

export default function BuscaSantos({ valorInicial }: PropsBuscaSantos) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [state, dispatch] = useReducer(reducer, {
    value: valorInicial,
    results: [],
    isPending: false,
    isOpen: false,
  });

  // Sincroniza com URL quando o valorInicial muda (ex: botão voltar)
  const prevValorInicialRef = useRef(valorInicial);
  useEffect(() => {
    if (valorInicial !== prevValorInicialRef.current) {
      prevValorInicialRef.current = valorInicial;
      dispatch({ type: "SET_VALUE", payload: valorInicial });
    }
  }, [valorInicial]);

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        dispatch({ type: "CLOSE" });
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounce: atualiza URL + busca autocomplete
  useEffect(() => {
    const q = new URLSearchParams(searchParams.toString());
    const currentBusca = q.get("busca") ?? "";

    // Atualiza URL se o valor mudou
    if (state.value !== currentBusca) {
      if (state.value) {
        q.set("busca", state.value);
      } else {
        q.delete("busca");
      }
      q.delete("pagina");
      router.push(`/santos?${q.toString()}`, { scroll: false });
    }

    if (state.value.length < 2) {
      dispatch({ type: "CLOSE" });
      return;
    }

    dispatch({ type: "SET_PENDING", payload: true });
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/santos/search?q=${encodeURIComponent(state.value)}`);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();
        dispatch({ type: "SET_RESULTS", payload: data.results });
        dispatch({ type: "OPEN" });
      } catch (err) {
        console.error("[BuscaSantos]", err);
      } finally {
        dispatch({ type: "SET_PENDING", payload: false });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [state.value, router, searchParams]);

  return (
    <div className="relative group w-full" ref={wrapperRef}>
      <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
        {state.isPending
          ? <Loader2 size={16} className="animate-spin text-outline" aria-hidden="true" />
          : <Search size={16} className="text-outline group-focus-within:text-primary transition-colors" aria-hidden="true" />
        }
      </div>
      <input
        type="search"
        role="combobox"
        value={state.value}
        onChange={(e) => dispatch({ type: "SET_VALUE", payload: e.target.value })}
        onFocus={() => state.value.length >= 2 && dispatch({ type: "OPEN" })}
        placeholder="Buscar por nome..."
        aria-label="Buscar santos"
        aria-autocomplete="list"
        aria-expanded={state.isOpen}
        aria-controls={state.isOpen ? "santos-listbox" : undefined}
        className="w-full bg-transparent border-b border-outline py-2 pl-8 pr-4 text-sm font-body-md outline-none transition-all focus:border-secondary focus:ring-0 placeholder:text-outline-variant"
      />

      {state.isOpen && state.results.length > 0 && (
        <ul
          id="santos-listbox"
          role="listbox"
          aria-label="Sugestões de santos"
          className="absolute top-full left-0 right-0 mt-2 bg-surface-container-high border border-outline-variant rounded-xl shadow-lg overflow-hidden z-50 max-h-64 overflow-y-auto py-2"
        >
          {state.results.map((santo) => (
            <li key={santo.slug} role="option" aria-selected={false}>
              <Link
                href={`/santos/${santo.slug}`}
                onClick={() => dispatch({ type: "CLOSE" })}
                className="flex items-center gap-3 px-4 py-3 hover:bg-surface-container-highest transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-heading text-sm text-on-surface truncate">{santo.nome}</p>
                  <p className="font-body-sm text-xs text-on-surface-variant truncate">{santo.data_festa}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
