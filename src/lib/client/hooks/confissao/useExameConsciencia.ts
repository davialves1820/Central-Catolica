"use client";

import { useCallback, useEffect, useState } from "react";
import type { AbaConfissao, IdPergunta } from "@/types/confissao";

/**
 * Estado do exame de consciência interativo — inteiramente em memória.
 * Nada aqui é gravado em localStorage/sessionStorage nem enviado a servidor:
 * é descartado ao desmontar o componente ou ao esconder a aba (troca de app,
 * bloqueio de tela), para não deixar rastro em aparelhos compartilhados.
 */
export function useExameConsciencia() {
  const [iniciado, setIniciado] = useState(false);
  const [mandamentoIndex, setMandamentoIndex] = useState(0);
  const [marcados, setMarcados] = useState<Set<IdPergunta>>(new Set());
  const [abaAtiva, setAbaAtiva] = useState<AbaConfissao>("exame");

  const limparTudo = useCallback(() => {
    setIniciado(false);
    setMandamentoIndex(0);
    setMarcados(new Set());
    setAbaAtiva("exame");
  }, []);

  // Limpeza automática ao sair: aba escondida (troca de app, bloqueio de tela)
  // ou desmontagem do componente (saiu da página) apagam tudo da memória.
  useEffect(() => {
    const aoEsconder = () => {
      if (document.visibilityState === "hidden") limparTudo();
    };
    document.addEventListener("visibilitychange", aoEsconder);
    return () => {
      document.removeEventListener("visibilitychange", aoEsconder);
      limparTudo();
    };
  }, [limparTudo]);

  const iniciarExame = useCallback(() => {
    setIniciado(true);
    setMandamentoIndex(0);
  }, []);

  const irParaMandamento = useCallback((indice: number) => {
    setMandamentoIndex(indice);
  }, []);

  const avancarMandamento = useCallback((total: number) => {
    setMandamentoIndex((atual) => Math.min(atual + 1, total - 1));
  }, []);

  const voltarMandamento = useCallback(() => {
    setMandamentoIndex((atual) => Math.max(atual - 1, 0));
  }, []);

  const alternarPergunta = useCallback((id: IdPergunta) => {
    setMarcados((atual) => {
      const novo = new Set(atual);
      if (novo.has(id)) novo.delete(id);
      else novo.add(id);
      return novo;
    });
  }, []);

  const irParaAba = useCallback((aba: AbaConfissao) => {
    setAbaAtiva(aba);
  }, []);

  return {
    iniciado,
    mandamentoIndex,
    marcados,
    abaAtiva,
    iniciarExame,
    irParaMandamento,
    avancarMandamento,
    voltarMandamento,
    alternarPergunta,
    irParaAba,
    limparTudo,
  };
}
