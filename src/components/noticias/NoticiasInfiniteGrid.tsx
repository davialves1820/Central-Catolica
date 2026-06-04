"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Noticia } from "@/types/noticias";
import NoticiaCard from "./NoticiaCard";
import { Loader2 } from "lucide-react";

interface Props {
  noticiasIniciais: Noticia[];
}

export default function NoticiasInfiniteGrid({ noticiasIniciais }: Props) {
  const [noticias, setNoticias] = useState<Noticia[]>(noticiasIniciais);
  const [pagina, setPagina] = useState(1);
  const [temMais, setTemMais] = useState(true);
  const [carregando, setCarregando] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const carregarMais = useCallback(async () => {
    if (carregando || !temMais) {
      return;
    }
    setCarregando(true);

    try {
      const proximaPagina = pagina + 1;
      const res = await fetch(`/api/noticias?pagina=${proximaPagina}`);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      setNoticias((prev) => {
        // Desduplicar pelo id para evitar chaves repetidas
        const ids = new Set(prev.map((n) => n.id));
        const novas = (data.noticias as Noticia[]).filter((n) => !ids.has(n.id));
        return [...prev, ...novas];
      });
      setTemMais(data.temMais);
      setPagina(proximaPagina);
    } catch (err) {
      console.error("[NoticiasInfiniteGrid]", err);
      setTemMais(false);
    } finally {
      setCarregando(false);
    }
  }, [carregando, temMais, pagina]);

  // Observa o elemento sentinela — quando entra na viewport, carrega mais
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          carregarMais();
        }
      },
      { rootMargin: "200px" } // começa a carregar 200px antes do fim
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [carregarMais]);

  return (
    <>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {noticias.map((n) => (
          <NoticiaCard key={n.id} noticia={n} />
        ))}
      </div>

      {/* Sentinela invisível que aciona o carregamento */}
      <div ref={sentinelRef} className="h-4 mt-8" aria-hidden="true" />

      {carregando && (
        <div className="flex justify-center py-8" aria-live="polite" aria-label="Carregando mais notícias">
          <Loader2 className="w-6 h-6 animate-spin text-secondary/40" />
        </div>
      )}

      {!temMais && noticias.length > 0 && (
        <p className="text-center text-sm text-on-surface-variant font-body py-8 opacity-60">
          Você chegou ao fim das notícias disponíveis.
        </p>
      )}
    </>
  );
}
