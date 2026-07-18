"use client";

import { ClipboardList } from "lucide-react";
import type { Mandamento, IdPergunta } from "@/types/confissao";
import { AvisoPrivacidade } from "./AvisoPrivacidade";

interface PropsResumo {
  mandamentos: Mandamento[];
  perguntasPorMandamento: (mandamento: Mandamento) => string[];
  marcados: Set<IdPergunta>;
}

/** Resumo discreto, montado só em tela, com os pontos marcados para levar ao confessionário. */
export function Resumo({ mandamentos, perguntasPorMandamento, marcados }: PropsResumo) {
  const itens = mandamentos
    .map((mandamento) => {
      const perguntas = perguntasPorMandamento(mandamento);
      const marcadas = perguntas.filter((_, indice) => marcados.has(`${mandamento.numero}:${indice}`));
      return { mandamento, marcadas };
    })
    .filter((item) => item.marcadas.length > 0);

  return (
    <div className="space-y-5">
      <AvisoPrivacidade />

      {itens.length === 0 ? (
        <div className="rounded-2xl border border-[#c9a84c]/25 bg-white p-8 text-center">
          <ClipboardList className="mx-auto mb-3 text-secondary" size={28} aria-hidden="true" />
          <p className="font-body-md text-on-surface-variant">
            Nenhum ponto marcado ainda. Volte para o exame e marque o que fizer sentido para você.
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border border-[#c9a84c]/25 bg-white p-5 md:p-6 space-y-5">
          <h3 className="font-heading text-xl font-semibold text-primary">Seu resumo para a confissão</h3>
          {itens.map(({ mandamento, marcadas }) => (
            <div key={mandamento.numero}>
              <p className="font-label-sm text-secondary">
                {mandamento.numero}º Mandamento — {mandamento.titulo}
              </p>
              <ul className="mt-1.5 space-y-1 list-disc pl-5">
                {marcadas.map((texto) => (
                  <li key={texto} className="font-body-sm leading-relaxed text-on-surface">
                    {texto}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
