"use client";

import { useEffect, useRef } from "react";

interface OpcoesProgressoLeitura {
  nomeLivro: string;
  capitulo: number;
  destaqueVersiculo?: number;
}

export function useProgressoLeitura({ nomeLivro, capitulo, destaqueVersiculo }: OpcoesProgressoLeitura) {
  // Refs para comparar com o render anterior e evitar escritas desnecessárias
  const ultimoLivroRef = useRef<string | null>(null);
  const ultimoCapituloRef = useRef<number | null>(null);

  // Grava progresso só quando livro ou capítulo muda de facto
  useEffect(() => {
    if (
      ultimoLivroRef.current === nomeLivro &&
      ultimoCapituloRef.current === capitulo
    ) {
      return;
    }

    ultimoLivroRef.current = nomeLivro;
    ultimoCapituloRef.current = capitulo;

    localStorage.setItem(
      "progresso-biblia",
      JSON.stringify({ nomeLivro, capitulo, dataHora: Date.now() })
    );
  }, [nomeLivro, capitulo]);

  // Atualiza a URL (history) separadamente — inclui o versículo destacado
  useEffect(() => {
    const hash = destaqueVersiculo ? `#v-${destaqueVersiculo}` : "";
    window.history.replaceState(
      {},
      "",
      `/biblia/${encodeURIComponent(nomeLivro)}/${capitulo}${hash}`
    );
  }, [nomeLivro, capitulo, destaqueVersiculo]);
}