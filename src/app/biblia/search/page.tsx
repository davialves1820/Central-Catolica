"use client";

import { useState, useEffect } from "react";
import { Search, ChevronRight, Loader2, Book, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface SearchResult {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

export default function BibleSearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery.length >= 3) {
      const performSearch = async () => {
        setLoading(true);
        try {
          const res = await fetch(`/api/biblia/search?q=${encodeURIComponent(debouncedQuery)}`);
          const data = await res.json();
          setResults(data.results || []);
        } catch (error) {
          console.error("Search failed:", error);
        } finally {
          setLoading(false);
        }
      };
      performSearch();
    } else {
      setResults([]);
    }
  }, [debouncedQuery]);

  return (
    <div className="space-y-8">
      <Link 
        href="/biblia" 
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Voltar para a Bíblia
      </Link>

      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-primary">Pesquisar na Bíblia</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Digite palavras-chave, passagens ou temas para encontrar versículos relacionados.
        </p>
      </header>

      <div className="max-w-2xl mx-auto">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Ex: 'amor', 'justiça', 'No princípio'..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl border bg-card/50 focus:bg-card focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          {loading && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
            </div>
          )}
        </div>
        
        {debouncedQuery.length > 0 && debouncedQuery.length < 3 && (
          <p className="text-xs text-center mt-2 text-muted-foreground">Continue digitando para pesquisar...</p>
        )}
      </div>

      <div className="space-y-4">
        {results.length > 0 ? (
          <div className="grid gap-4">
            <p className="text-sm font-medium opacity-60 px-2">{results.length} resultados encontrados</p>
            {results.map((result, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={`${result.book}-${result.chapter}-${result.verse}`}
                className="bg-card border rounded-xl p-4 hover:border-primary/30 transition-colors shadow-sm group"
              >
                <Link 
                  href={`/biblia/${encodeURIComponent(result.book)}/${result.chapter}`}
                  className="block space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-primary flex items-center gap-2">
                       <Book className="w-4 h-4" />
                       {result.book} {result.chapter}:{result.verse}
                    </span>
                    <ChevronRight className="w-4 h-4 opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-muted-foreground italic line-clamp-2">
                    &quot;{result.text}&quot;
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : debouncedQuery.length >= 3 && !loading ? (
          <div className="text-center py-12 space-y-2">
            <p className="text-lg font-medium">Nenhum resultado encontrado para &quot;{debouncedQuery}&quot;</p>
            <p className="text-muted-foreground">Tente palavras diferentes ou verifique a ortografia.</p>
          </div>
        ) : !loading && query.length === 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-8">
              {["Amor", "Paz", "Justiça", "Fé", "Oração", "Salvação"].map(term => (
                  <button 
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-4 py-3 rounded-xl border bg-muted/20 hover:bg-muted transition-colors text-sm font-medium"
                  >
                    🚀 {term}
                  </button>
              ))}
            </div>
        )}
      </div>
    </div>
  );
}
