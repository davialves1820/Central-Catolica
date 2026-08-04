"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, X } from "lucide-react";
import { PropsBuscaVersiculo } from "@/types/biblia";
import { parsearReferencia, urlDaReferencia } from "@/lib/server/utils/parsearReferencia";

function normalizar(texto: string) {
  return texto.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export default function BuscaVersiculo({
  t,
  livro,
  indexCapituloAtual,
  estaAberto,
  aoFechar,
  aoIrPara,
}: PropsBuscaVersiculo) {
  const [valor, setValor] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (estaAberto) inputRef.current?.focus();
  }, [estaAberto]);

  const irParaNoLivro = (capitulo: number, versiculo?: number) => {
    const indexCap = capitulo - 1;
    const cap = livro.capitulos[indexCap];
    if (!cap) {
      setErro(`${livro.nome} só tem ${livro.capitulos.length} capítulos.`);
      return;
    }
    if (versiculo !== undefined && !cap.versiculos.some((v) => v.versiculo === versiculo)) {
      setErro(`O capítulo ${capitulo} só tem ${cap.versiculos.length} versículos.`);
      return;
    }
    setErro(null);
    setValor("");
    aoIrPara(indexCap, versiculo);
  };

  const buscar = () => {
    const texto = valor.trim();
    if (!texto) return;

    // Apenas um número: versículo dentro do capítulo atual
    const soNumero = texto.match(/^\d+$/);
    if (soNumero) {
      irParaNoLivro(livro.capitulos[indexCapituloAtual].capitulo, parseInt(texto, 10));
      return;
    }

    // "capítulo,versículo" (aceita , ; : ou espaço como separador)
    const capVers = texto.match(/^(\d+)[\s,;:]+(\d+)$/);
    if (capVers) {
      irParaNoLivro(parseInt(capVers[1], 10), parseInt(capVers[2], 10));
      return;
    }

    // Referência completa, ex.: "Jo 3,16"
    const ref = parsearReferencia(texto);
    if (ref) {
      if (normalizar(ref.livro) === normalizar(livro.nome)) {
        irParaNoLivro(ref.capitulo, ref.versiculo);
      } else {
        setErro(null);
        router.push(urlDaReferencia(ref));
      }
      return;
    }

    setErro("Não entendi essa referência. Tente 16, 3,16 ou Jo 3,16.");
  };

  return (
    <AnimatePresence>
      {estaAberto && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className={`overflow-hidden border-b shadow-inner ${t.borda}`}
        >
          <div className="p-6 sm:p-8" style={{ background: t.bg }}>
            <div className="flex items-center justify-between mb-4">
              <p className={`text-[10px] font-bold font-body uppercase tracking-[0.2em] opacity-60 ${t.muted}`}>
                Ir para um versículo
              </p>
              <button
                onClick={aoFechar}
                aria-label="Fechar busca de versículo"
                className={`p-1.5 rounded-lg transition-all hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${t.muted}`}
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search
                  size={16}
                  className={`absolute left-4 top-1/2 -translate-y-1/2 opacity-50 ${t.muted}`}
                  aria-hidden="true"
                />
                <input
                  ref={inputRef}
                  type="text"
                  value={valor}
                  onChange={(e) => {
                    setValor(e.target.value);
                    setErro(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") buscar();
                  }}
                  placeholder="Ex.: 16 · 3,16 · Jo 3,16"
                  aria-label="Buscar versículo"
                  className={`w-full rounded-xl border bg-transparent pl-10 pr-4 py-3 text-sm font-body outline-none focus-visible:ring-2 focus-visible:ring-primary ${t.texto} ${t.borda}`}
                />
              </div>
              <button
                onClick={buscar}
                aria-label="Ir para o versículo"
                className={`shrink-0 rounded-xl border p-3 transition-all hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${t.muted} ${t.borda}`}
              >
                <ArrowRight size={16} />
              </button>
            </div>
            {erro ? (
              <p className="mt-3 text-xs font-body font-semibold" style={{ color: "hsl(var(--crimson-light))" }}>
                {erro}
              </p>
            ) : (
              <p className={`mt-3 text-xs font-body opacity-60 ${t.muted}`}>
                Digite apenas o número do versículo, &quot;capítulo,versículo&quot; ou uma referência completa.
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
