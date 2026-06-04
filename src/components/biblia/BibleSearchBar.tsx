"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export function BibleSearchBar() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const irParaPesquisa = () => {
    router.push("/biblia/pesquisa");
  };

  return (
    <div className="w-full max-w-4xl">
      <div
        onClick={irParaPesquisa}
        className="relative group cursor-text"
        role="none"
      >
        <input
          ref={inputRef}
          type="search"
          readOnly
          // onFocus removido: redirecionar no foco impede usuários de teclado
          // de navegar pela Tab sem ser jogados para outra página
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              irParaPesquisa();
            }
          }}
          aria-label="Pesquisar na Bíblia — pressione Enter para abrir a busca"
          className="w-full bg-card border border-border/40 rounded-2xl shadow-sm group-hover:border-primary transition-all py-6 pl-16 pr-8 text-lg md:text-xl outline-none placeholder:text-muted-foreground/40 font-body cursor-pointer"
          placeholder="Pesquisar versículos, temas, livros ou capítulos..."
        />
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-primary w-8 h-8 opacity-70 group-hover:scale-110 transition-transform pointer-events-none" aria-hidden="true" />
      </div>
    </div>
  );
}
