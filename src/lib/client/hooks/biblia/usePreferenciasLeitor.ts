"use client";

import { useState, useEffect } from "react";
import { type Tema, type TamanhoFonte, type ModoLeitura, TEMAS } from "@/types";

interface PreferenciasLeitor {
  isMounted: boolean;
  tamanhoFonte: TamanhoFonte;
  tema: Tema;
  modoLeitura: ModoLeitura;
  setTamanhoFonte: (s: TamanhoFonte) => void;
  setTema: (t: Tema) => void;
  setModoLeitura: (m: ModoLeitura) => void;
}

export function usePreferenciasLeitor(): PreferenciasLeitor {
  const [isMounted, setIsMounted] = useState(false);
  const [tamanhoFonte, setTamanhoFonteState] = useState<TamanhoFonte>(18);
  const [tema, setTemaState] = useState<Tema>("pergaminho");
  const [modoLeitura, setModoLeituraState] = useState<ModoLeitura>("paginado");

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setIsMounted(true);
    const sz = localStorage.getItem("biblia-tamanho-fonte");
    const th = localStorage.getItem("biblia-tema") as Tema;
    const md = localStorage.getItem("biblia-modo-leitura") as ModoLeitura;
    if (sz) {
      setTamanhoFonteState(parseInt(sz) as TamanhoFonte);
    }
    if (th && TEMAS[th]) {
      setTemaState(th);
    }
    if (md) {
      setModoLeituraState(md);
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const setTamanhoFonte = (s: TamanhoFonte) => {
    setTamanhoFonteState(s);
    localStorage.setItem("biblia-tamanho-fonte", String(s));
  };

  const setTema = (t: Tema) => {
    setTemaState(t);
    localStorage.setItem("biblia-tema", t);
  };

  const setModoLeitura = (m: ModoLeitura) => {
    setModoLeituraState(m);
    localStorage.setItem("biblia-modo-leitura", m);
  };

  return { isMounted, tamanhoFonte, tema, modoLeitura, setTamanhoFonte, setTema, setModoLeitura };
}
