"use client";

import { useState, useEffect, useRef } from "react";
import { Search, ChevronRight, Loader2, ArrowLeft, BookOpen, X, AlertCircle } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface ResultadoBusca { book: string; chapter: number; verse: number; text: string; }

const TERMOS_RAPIDOS = ["Amor", "Paz", "Justiça", "Oração", "Salvação", "Luz", "Graça"];

function destacar(text: string, query: string) {
  if (!query.trim()) return <>{text}</>;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part)
          ? <mark key={i} className="rounded px-0.5 not-italic font-bold" style={{ background: "hsl(var(--gold)/0.25)", color: "hsl(var(--foreground))" }}>{part}</mark>
          : <span key={i}>{part}</span>
      )}
    </>
  );
}

export default function PaginaBuscaBiblia() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ResultadoBusca[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  useEffect(() => {
    if (query.length < 3) {
      setResults([]);
      setSearched(false);
      setError(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch(`/api/biblia/search?q=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setResults(data.results || []);
        setSearched(true);
      } catch {
        setError(true);
        setResults([]);
        setSearched(false);
      } finally {
        setLoading(false);
      }
    }, 420);

    return () => clearTimeout(timer);
  }, [query]);

  const limparPesquisa = () => {
    setQuery("");
    setResults([]);
    setSearched(false);
    setError(false);
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-screen">
      {/* Header strip */}
      <div className="border-b border-border" style={{ background: "hsl(var(--secondary))" }}>
        <div className="container mx-auto px-4 py-10">
          <Link
            href="/biblia"
            aria-label="Voltar para a Bíblia"
            className="inline-flex items-center gap-2 text-sm font-body font-semibold transition-colors mb-6 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" aria-hidden="true" />
            Voltar
          </Link>

          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-2">
            Pesquisar
          </h1>
          <p className="font-body text-sm text-muted-foreground mb-8">
            Busque por palavras, frases ou temas em toda a Bíblia Ave Maria
          </p>

          {/* Search box */}
          <div className="relative group max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              {loading
                ? <Loader2 size={17} className="animate-spin" style={{ color: "hsl(var(--gold))" }} aria-hidden="true" />
                : <Search size={17} className="text-muted-foreground group-focus-within:text-primary transition-colors" aria-hidden="true" />
              }
            </div>
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Ex: "No princípio", amor, salvação…'
              aria-label="Pesquisar versículos"
              aria-busy={loading}
              className="w-full rounded-xl pl-12 pr-12 py-4 font-body text-base outline-none transition-all duration-200 border focus-visible:ring-2 focus-visible:ring-primary"
              style={{
                background: "hsl(var(--card))",
                borderColor: "hsl(var(--border))",
                color: "hsl(var(--foreground))",
              }}
            />
            {query && (
              <button
                onClick={limparPesquisa}
                aria-label="Limpar pesquisa"
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-r-xl"
              >
                <X size={17} aria-hidden="true" />
              </button>
            )}
          </div>

          {query.length > 0 && query.length < 3 && (
            <p className="mt-2 text-xs font-body text-muted-foreground" aria-live="polite">
              Continue digitando ({3 - query.length} caractere{3 - query.length !== 1 ? "s" : ""} restante{3 - query.length !== 1 ? "s" : ""})
            </p>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 max-w-3xl">

        {/* Error state */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex items-center gap-3 rounded-xl border border-border p-4 mb-6"
              style={{ background: "hsl(var(--card))" }}
              role="alert"
            >
              <AlertCircle size={18} className="shrink-0" style={{ color: "hsl(var(--crimson-light))" }} aria-hidden="true" />
              <p className="text-sm font-body text-muted-foreground">
                Não foi possível realizar a pesquisa. Verifique sua conexão e tente novamente.
              </p>
              <button
                onClick={() => setQuery((q) => q + " ")}
                className="ml-auto text-xs font-bold font-body shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                style={{ color: "hsl(var(--gold))" }}
              >
                Tentar novamente
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick terms */}
        <AnimatePresence>
          {!searched && !error && query.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <p className="text-xs font-bold font-body uppercase tracking-widest text-muted-foreground">
                Temas populares
              </p>
              <div className="flex flex-wrap gap-2" role="list" aria-label="Temas populares">
                {TERMOS_RAPIDOS.map((term) => (
                  <button
                    key={term}
                    role="listitem"
                    onClick={() => setQuery(term)}
                    aria-label={`Pesquisar por ${term}`}
                    className="px-4 py-2 rounded-full text-sm font-body font-semibold border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    style={{
                      background: "hsl(var(--card))",
                      borderColor: "hsl(var(--border))",
                      color: "hsl(var(--foreground)/0.7)",
                    }}
                  >
                    {term}
                  </button>
                ))}
              </div>

              <div
                className="mt-8 p-5 rounded-xl border"
                style={{ background: "hsl(var(--card))", borderColor: "hsl(var(--gold)/0.15)" }}
              >
                <div className="flex items-start gap-3">
                  <BookOpen size={17} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--gold))" }} aria-hidden="true" />
                  <div>
                    <p className="text-sm font-bold font-heading text-foreground mb-1">Dica de pesquisa</p>
                    <p className="text-sm font-body text-muted-foreground leading-relaxed">
                      Use palavras-chave simples para melhores resultados. Por exemplo, &quot;alegria&quot; em vez de &quot;estou alegre&quot;.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence mode="wait">
          {searched && !loading && !error && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
              role="region"
              aria-label="Resultados da pesquisa"
              aria-live="polite"
            >
              <div className="flex items-center justify-between py-2">
                <p className="text-sm font-body text-muted-foreground">
                  {results.length === 0
                    ? `Nenhum resultado para "${query}"`
                    : results.length >= 50
                      ? `Primeiros 50 resultados`
                      : `${results.length} resultado${results.length !== 1 ? "s" : ""} para "${query}"`}
                </p>
                {results.length > 0 && (
                  <button
                    onClick={limparPesquisa}
                    aria-label="Limpar resultados"
                    className="text-xs font-bold font-body text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                  >
                    Limpar
                  </button>
                )}
              </div>

              {results.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16 space-y-3"
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto"
                    style={{ background: "hsl(var(--secondary))" }}
                  >
                    <Search size={26} className="text-muted-foreground/40" aria-hidden="true" />
                  </div>
                  <p className="font-heading text-lg font-semibold text-foreground/40">Nenhum versículo encontrado</p>
                  <p className="text-sm text-muted-foreground font-body max-w-xs mx-auto">
                    Tente palavras diferentes ou verifique a ortografia.
                  </p>
                </motion.div>
              )}

              {results.map((result, idx) => (
                <motion.div
                  key={`${result.book}-${result.chapter}-${result.verse}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(idx * 0.04, 0.4) }}
                >
                  <Link
                    href={`/biblia/${encodeURIComponent(result.book)}/${result.chapter}?v=${result.verse}`}
                    aria-label={`Ir para ${result.book} ${result.chapter}:${result.verse}`}
                    className="group flex gap-4 rounded-xl p-5 transition-all duration-200 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:shadow-lg"
                    style={{ background: "hsl(var(--card))", borderColor: "hsl(var(--border))" }}
                  >
                    <div
                      className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: "hsl(var(--secondary))" }}
                      aria-hidden="true"
                    >
                      <span className="text-xs font-bold font-mono" style={{ color: "hsl(var(--gold))" }}>
                        {result.verse}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className="text-xs font-bold font-body uppercase tracking-wider"
                          style={{ color: "hsl(var(--gold))" }}
                        >
                          {result.book} {result.chapter}:{result.verse}
                        </span>
                        <ChevronRight
                          size={14}
                          className="text-muted-foreground/30 group-hover:translate-x-0.5 transition-all shrink-0"
                          aria-hidden="true"
                        />
                      </div>
                      <p
                        className="text-sm text-foreground/70 leading-relaxed line-clamp-3"
                        style={{ fontFamily: "var(--font-reading)", fontStyle: "italic" }}
                      >
                        &quot;{destacar(result.text, query)}&quot;
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}

              {results.length >= 50 && (
                <p className="text-center text-xs text-muted-foreground font-body py-4">
                  Exibindo apenas os primeiros 50 resultados. Refine sua busca para resultados mais precisos.
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}