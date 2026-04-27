"use client";

import { useState, useEffect, useRef } from "react";
import {
  Search,
  ChevronRight,
  Loader2,
  ArrowLeft,
  BookOpen,
  X,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface SearchResult {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

const QUICK_TERMS = [
  "Amor", "Paz", "Justiça", "Fé",
  "Oração", "Salvação", "Luz", "Graça",
];

function highlight(text: string, query: string) {
  if (!query.trim()) return <>{text}</>;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-accent/30 text-foreground rounded px-0.5 not-italic">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export default function BibleSearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Debounced search
  useEffect(() => {
    if (query.length < 3) {
      setResults([]);
      setSearched(false);
      return;
    }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/biblia/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results || []);
        setSearched(true);
      } catch {
        console.error("Search failed");
      } finally {
        setLoading(false);
      }
    }, 420);
    return () => clearTimeout(timer);
  }, [query]);

  const clearQuery = () => {
    setQuery("");
    setResults([]);
    setSearched(false);
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-screen">
      {/* ── Header strip ──────────────────────────────────────── */}
      <div className="bg-primary border-b border-primary/80">
        <div className="container mx-auto px-4 py-10">
          <Link
            href="/biblia"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-body font-medium transition-colors mb-6 group"
          >
            <ArrowLeft
              size={15}
              className="group-hover:-translate-x-0.5 transition-transform"
            />
            Voltar
          </Link>

          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-2">
            Pesquisar
          </h1>
          <p className="text-white/50 font-body text-sm">
            Busque por palavras, frases ou temas em toda a Bíblia Ave Maria
          </p>

          {/* Search box */}
          <div className="mt-8 relative group max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              {loading ? (
                <Loader2 size={18} className="animate-spin text-accent" />
              ) : (
                <Search size={18} className="text-white/40 group-focus-within:text-accent transition-colors" />
              )}
            </div>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ex: &quot;No princípio&quot;, amor, salvação…"
              className="w-full bg-white/10 border border-white/15 focus:border-accent/60 focus:bg-white/15 rounded-2xl pl-12 pr-12 py-4 text-white placeholder-white/30 font-body text-base outline-none transition-all duration-200 backdrop-blur-sm"
            />
            {query && (
              <button
                onClick={clearQuery}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/40 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Character hint */}
          {query.length > 0 && query.length < 3 && (
            <p className="mt-2 text-white/40 text-xs font-body">
              Continue digitando para pesquisar ({3 - query.length} caractere{3 - query.length !== 1 ? "s" : ""} restante{3 - query.length !== 1 ? "s" : ""})
            </p>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 max-w-3xl">
        {/* ── Quick terms ───────────────────────────────────────── */}
        <AnimatePresence>
          {!searched && query.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground font-body">
                Temas populares
              </p>
              <div className="flex flex-wrap gap-2">
                {QUICK_TERMS.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-4 py-2 rounded-full border border-border bg-white hover:bg-primary hover:text-white hover:border-primary text-sm font-body font-medium text-foreground/70 transition-all duration-200 shadow-sm"
                  >
                    {term}
                  </button>
                ))}
              </div>

              {/* Tip */}
              <div className="mt-8 p-5 rounded-2xl bg-primary/5 border border-primary/10">
                <div className="flex items-start gap-3">
                  <BookOpen size={18} className="text-accent mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-primary font-heading mb-1">
                      Dica de pesquisa
                    </p>
                    <p className="text-sm font-body text-muted-foreground leading-relaxed">
                      Use palavras-chave simples para melhores resultados.
                      Por exemplo, &quot;alegria&quot; em vez de &quot;estou alegre&quot;.
                      A busca encontra a palavra em qualquer parte do versículo.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Results ───────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {searched && !loading && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {/* Count bar */}
              <div className="flex items-center justify-between py-2">
                <p className="text-sm font-body text-muted-foreground">
                  {results.length === 0
                    ? `Nenhum resultado para "${query}"`
                    : results.length >= 50
                    ? `Mostrando os primeiros 50 resultados`
                    : `${results.length} resultado${results.length !== 1 ? "s" : ""} para "${query}"`}
                </p>
                {results.length > 0 && (
                  <button
                    onClick={clearQuery}
                    className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors"
                  >
                    Limpar
                  </button>
                )}
              </div>

              {/* Empty state */}
              {results.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16 space-y-3"
                >
                  <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mx-auto">
                    <Search size={28} className="text-primary/20" />
                  </div>
                  <p className="font-heading text-lg font-bold text-foreground/50">
                    Nenhum versículo encontrado
                  </p>
                  <p className="text-sm text-muted-foreground font-body max-w-xs mx-auto">
                    Tente palavras diferentes ou verifique a ortografia.
                  </p>
                </motion.div>
              )}

              {/* Result cards */}
              {results.map((result, idx) => (
                <motion.div
                  key={`${result.book}-${result.chapter}-${result.verse}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(idx * 0.04, 0.4) }}
                >
                  <Link
                    href={`/biblia/${encodeURIComponent(result.book)}/${result.chapter}`}
                    className="group flex gap-4 bg-white border border-border hover:border-primary/25 rounded-2xl p-5 transition-all duration-200 hover:shadow-md hover:shadow-primary/5"
                  >
                    {/* Verse number badge */}
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/5 group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-all duration-200">
                      <span className="text-xs font-bold font-mono text-primary group-hover:text-white">
                        {result.verse}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-primary font-body uppercase tracking-wider">
                          {result.book} {result.chapter}:{result.verse}
                        </span>
                        <ChevronRight
                          size={15}
                          className="text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0"
                        />
                      </div>
                      <p className="text-sm font-body text-foreground/75 leading-relaxed line-clamp-3 italic">
                        &ldquo;{highlight(result.text, query)}&rdquo;
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}

              {/* Load more hint */}
              {results.length >= 50 && (
                <p className="text-center text-xs text-muted-foreground font-body py-4">
                  Exibindo apenas os primeiros 50 resultados.
                  Refine sua busca para resultados mais precisos.
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}