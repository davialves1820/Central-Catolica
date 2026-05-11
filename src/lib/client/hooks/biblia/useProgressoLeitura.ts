"use client";

import { useEffect } from "react";

interface OpcoesProgressoLeitura {
  nomeLivro: string;
  capitulo: number;
  destaqueVersiculo?: number;
}

export function useProgressoLeitura({ nomeLivro, capitulo, destaqueVersiculo }: OpcoesProgressoLeitura) {
  useEffect(() => {
    localStorage.setItem(
      "progresso-biblia",
      JSON.stringify({ nomeLivro, capitulo, dataHora: Date.now() })
    );
    const hash = destaqueVersiculo ? `#v-${destaqueVersiculo}` : "";
    window.history.replaceState(
      {},
      "",
      `/biblia/${encodeURIComponent(nomeLivro)}/${capitulo}${hash}`
    );
  }, [nomeLivro, capitulo, destaqueVersiculo]);
}
