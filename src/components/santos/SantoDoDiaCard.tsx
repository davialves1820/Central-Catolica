"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Santo } from "@/types/santos";

export default function SantoDoDiaCard({ santos }: { santos: Santo[] }) {
  const [indice, setIndice] = useState(0);
  const santo = santos[indice];
  const temMultiplos = santos.length > 1;

  const irParaAnterior = (e: React.MouseEvent) => {
    e.preventDefault();
    setIndice((i) => (i - 1 + santos.length) % santos.length);
  };

  const irParaProximo = (e: React.MouseEvent) => {
    e.preventDefault();
    setIndice((i) => (i + 1) % santos.length);
  };

  return (
    <div className="group relative flex flex-col md:flex-row gap-0 bg-card border border-primary/20 overflow-hidden transition-all duration-300 hover:border-primary/35 hover:bg-pearl hover:shadow-xl hover:shadow-primary/10">
      {/* Link que cobre todo o card (stretched link) */}
      <Link
        href={`/santos/${santo.slug}`}
        className="absolute inset-0 z-10"
        aria-label={`Ler hagiografia de ${santo.nome}`}
      />

      {/* Image */}
      <div className="relative w-full md:w-56 aspect-[3/2] md:aspect-auto shrink-0 overflow-hidden bg-[#f5f3ee]">
        {santo.imagem_url ? (
          <Image
            src={santo.imagem_url}
            alt={`Imagem de ${santo.nome}`}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 224px"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="font-heading text-6xl opacity-10 text-primary"
              aria-hidden="true"
            >
              ✝
            </span>
          </div>
        )}
        {/* Overlay gradient on mobile */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent md:hidden" />
      </div>

      {/* Content */}
      <div className="flex-1 p-8 md:p-10 flex flex-col justify-between">
        <div>
          {/* Badge + pager */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles size={13} className="text-primary/60" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60">
                {santo.tipo}
              </span>
            </div>

            {temMultiplos && (
              <div className="relative z-20 flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={irParaAnterior}
                  aria-label="Santo anterior"
                  className="p-1 text-primary/50 hover:text-primary transition-colors cursor-pointer"
                >
                  <ChevronLeft size={14} />
                </button>
                <span className="text-[10px] font-bold text-primary/50 tabular-nums w-10 text-center">
                  {indice + 1} / {santos.length}
                </span>
                <button
                  type="button"
                  onClick={irParaProximo}
                  aria-label="Próximo santo"
                  className="p-1 text-primary/50 hover:text-primary transition-colors cursor-pointer"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            )}
          </div>

          {/* Name */}
          <h3 className="font-heading text-3xl md:text-4xl text-[#1b1c19] group-hover:text-primary transition-colors duration-300 mb-3 leading-tight">
            {santo.nome}
          </h3>

          {/* Feast day */}
          {santo.data_festa && (
            <p className="text-[11px] font-bold uppercase tracking-widest text-primary/50 mb-5">
              {santo.data_festa}
            </p>
          )}

          {/* Summary */}
          {santo.resumo && (
            <p className="text-[#4d4540] font-reading italic text-base md:text-lg leading-relaxed line-clamp-3 md:line-clamp-4">
              {santo.resumo}
            </p>
          )}
        </div>

        {/* CTA */}
        <div className="mt-8 flex items-center gap-3">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary group-hover:gap-4 transition-all flex items-center gap-2">
            Ler hagiografia
            <ChevronRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </span>
        </div>
      </div>

      {/* Right accent bar */}
      <div className="hidden md:block w-1 bg-gradient-to-b from-primary/0 via-primary/30 to-primary/0 self-stretch shrink-0" />
    </div>
  );
}
