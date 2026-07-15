"use client";

import { useState, useEffect } from "react";
import { TAMANHO_FONTE_MAX, TAMANHO_FONTE_MIN, TAMANHO_FONTE_PASSO } from "@/types/rosario";

const CHAVE_PREFERENCIAS = "rosario-preferencias";

interface PreferenciasRosario {
  tamanhoFonte: number;
  modoFoco: boolean;
  aumentarFonte: () => void;
  diminuirFonte: () => void;
  alternarModoFoco: () => void;
}

export function useRosarioPreferencias(): PreferenciasRosario {
  const [tamanhoFonte, setTamanhoFonteState] = useState(18);
  const [modoFoco, setModoFocoState] = useState(false);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    try {
      const bruto = localStorage.getItem(CHAVE_PREFERENCIAS);
      if (!bruto) return;
      const salvo = JSON.parse(bruto) as Partial<PreferenciasRosario>;
      if (typeof salvo.tamanhoFonte === "number") setTamanhoFonteState(salvo.tamanhoFonte);
      if (typeof salvo.modoFoco === "boolean") setModoFocoState(salvo.modoFoco);
    } catch {
      // ignora preferências corrompidas/indisponíveis
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const persistir = (parcial: Partial<{ tamanhoFonte: number; modoFoco: boolean }>) => {
    try {
      const atual = { tamanhoFonte, modoFoco, ...parcial };
      localStorage.setItem(CHAVE_PREFERENCIAS, JSON.stringify(atual));
    } catch {
      // ignora — preferências seguem válidas apenas na sessão atual
    }
  };

  const aumentarFonte = () => {
    const novo = Math.min(tamanhoFonte + TAMANHO_FONTE_PASSO, TAMANHO_FONTE_MAX);
    setTamanhoFonteState(novo);
    persistir({ tamanhoFonte: novo });
  };

  const diminuirFonte = () => {
    const novo = Math.max(tamanhoFonte - TAMANHO_FONTE_PASSO, TAMANHO_FONTE_MIN);
    setTamanhoFonteState(novo);
    persistir({ tamanhoFonte: novo });
  };

  const alternarModoFoco = () => {
    const novo = !modoFoco;
    setModoFocoState(novo);
    persistir({ modoFoco: novo });
  };

  return { tamanhoFonte, modoFoco, aumentarFonte, diminuirFonte, alternarModoFoco };
}
