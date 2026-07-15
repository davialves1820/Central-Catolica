"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { PropsPrayerCard } from "@/types/rosario";

/** Card com o texto completo de uma oração, com opção de expandir/recolher. */
export function PrayerCard({ oracao, tamanhoFonte }: PropsPrayerCard) {
  const [expandido, setExpandido] = useState(true);

  return (
    <div className="rounded-xl border border-[#c9a84c]/25 bg-surface-container-lowest overflow-hidden">
      <button
        type="button"
        onClick={() => setExpandido((v) => !v)}
        aria-expanded={expandido}
        className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left font-heading text-base font-semibold text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cobalt"
      >
        {oracao.titulo}
        <motion.span animate={{ rotate: expandido ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={18} aria-hidden="true" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {expandido && (
          <motion.div
            key="conteudo"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p
              className="whitespace-pre-line px-4 pb-4 font-reading leading-relaxed text-on-surface"
              style={{ fontSize: `${tamanhoFonte}px` }}
            >
              {oracao.texto}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
