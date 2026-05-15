"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export function BibleSearchBar() {
  const router = useRouter();

  const handleFocus = () => {
    router.push("/biblia/pesquisa");
  };

  return (
    <div className="w-full max-w-4xl">
      <div
        onClick={handleFocus}
        className="relative group cursor-text"
      >
        <input
          type="text"
          readOnly
          onFocus={handleFocus}
          className="w-full bg-card border border-border/40 rounded-2xl shadow-sm group-hover:border-primary transition-all py-6 pl-16 pr-8 text-lg md:text-xl outline-none placeholder:text-muted-foreground/40 font-body cursor-text"
          placeholder="Pesquisar versículos, temas, livros ou capítulos..."
        />
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-primary w-8 h-8 opacity-70 group-hover:scale-110 transition-transform" />
      </div>
    </div>
  );
}
