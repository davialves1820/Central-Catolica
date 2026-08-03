"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { PropsMandamentoPanel } from "@/types/confissao";
import { PerguntaItem } from "./PerguntaItem";

export function MandamentoPanel({ mandamento, perguntas, marcados, onAlternar }: PropsMandamentoPanel) {
  return (
    <div className="rounded-2xl border border-[#c9a84c]/25 bg-white p-5">
      <p className="font-label-sm text-secondary">{mandamento.rotulo}</p>
      <h3 className="font-heading text-xl font-semibold mt-1 text-primary">{mandamento.titulo}</h3>
      <p className="mt-0.5 mb-4 font-body-sm italic text-on-surface-variant">{mandamento.resumo}</p>

      {mandamento.observacao && (
        <div className="mb-4 rounded-lg border border-[#c9a84c]/30 bg-[#c9a84c]/10 px-3.5 py-2.5">
          <p className="font-label-sm font-semibold text-secondary">Atenção</p>
          <p className="mt-0.5 font-body-sm leading-relaxed text-on-surface-variant">{mandamento.observacao}</p>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={mandamento.numero}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="space-y-0.5"
        >
          {perguntas.map((pergunta, indice) => {
            const id = `${mandamento.numero}:${indice}`;
            return (
              <PerguntaItem
                key={id}
                texto={pergunta}
                marcado={marcados.has(id)}
                onAlternar={() => onAlternar(id)}
              />
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
