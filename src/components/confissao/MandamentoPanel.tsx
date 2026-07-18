"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { PropsMandamentoPanel } from "@/types/confissao";
import { PerguntaItem } from "./PerguntaItem";

export function MandamentoPanel({ mandamento, perguntas, marcados, onAlternar }: PropsMandamentoPanel) {
  return (
    <div className="rounded-2xl border border-[#c9a84c]/25 bg-white p-5">
      <p className="font-label-sm text-secondary">{mandamento.numero}º Mandamento</p>
      <h3 className="font-heading text-xl font-semibold mt-1 text-primary">{mandamento.titulo}</h3>
      <p className="mt-0.5 mb-4 font-body-sm italic text-on-surface-variant">{mandamento.resumo}</p>

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
