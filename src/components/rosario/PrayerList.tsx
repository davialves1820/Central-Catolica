"use client";

import { useEffect, useMemo, useRef } from "react";
import type { PropsPrayerList } from "@/types/rosario";
import { agruparPorSecao } from "@/lib/rosario/sequencia";
import { PrayerListItem } from "./PrayerListItem";

/** Lista textual e navegável de todas as orações do terço, agrupada por seção. */
export function PrayerList({ sequencia, grupo, passoIndex, concluidos, onSelecionarPasso }: PropsPrayerList) {
  const secoes = useMemo(() => agruparPorSecao(sequencia, grupo), [sequencia, grupo]);
  const itemAtivoRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    itemAtivoRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [passoIndex]);

  return (
    <nav
      aria-label="Sequência de orações do terço"
      className="max-h-[32rem] space-y-5 overflow-y-auto pr-1"
    >
      {secoes.map((secao) => (
        <div key={secao.titulo}>
          <p className="sticky top-0 mb-1.5 bg-white py-1 font-label-sm text-on-surface-variant">
            {secao.titulo}
          </p>
          <ul className="space-y-0.5">
            {secao.itens.map(({ passo, indice }) => (
              <li key={passo.ordem} ref={indice === passoIndex ? itemAtivoRef : undefined}>
                <PrayerListItem
                  passo={passo}
                  ativo={indice === passoIndex}
                  concluido={concluidos.has(indice)}
                  onSelecionar={() => onSelecionarPasso(indice)}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
