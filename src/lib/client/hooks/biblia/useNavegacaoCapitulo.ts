"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface OpcoesNavegacaoCapitulo {
  indexInicial: number;
  total: number;
  aoNavegar?: () => void;
}

interface RetornoNavegacaoCapitulo {
  indexCapitulo: number;
  direcao: 1 | -1;
  temProximo: boolean;
  temAnterior: boolean;
  navegar: (delta: 1 | -1) => void;
  irPara: (index: number) => void;
  manipuladoresToque: {
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchEnd: (e: React.TouchEvent) => void;
  };
}

export function useNavegacaoCapitulo({ indexInicial, total, aoNavegar }: OpcoesNavegacaoCapitulo): RetornoNavegacaoCapitulo {
  const [indexCapitulo, setIndexCapitulo] = useState(indexInicial);
  const [direcao, setDirecao] = useState<1 | -1>(1);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const temProximo = indexCapitulo < total - 1;
  const temAnterior = indexCapitulo > 0;

  const navegar = useCallback(
    (delta: 1 | -1) => {
      const proximo = indexCapitulo + delta;
      if (proximo < 0 || proximo >= total) {
        return;
      }
      setDirecao(delta);
      setIndexCapitulo(proximo);
      window.scrollTo({ top: 0, behavior: "smooth" });
      aoNavegar?.();
    },
    [indexCapitulo, total, aoNavegar]
  );

  const irPara = useCallback(
    (index: number) => {
      if (index < 0 || index >= total) return;
      setDirecao(index > indexCapitulo ? 1 : -1);
      setIndexCapitulo(index);
      window.scrollTo({ top: 0, behavior: "smooth" });
      aoNavegar?.();
    },
    [indexCapitulo, total, aoNavegar]
  );

  // Navegação por teclado
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) {
        return;
      }
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        navegar(1);
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        navegar(-1);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [navegar]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) {
      return;
    }
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      navegar(dx < 0 ? 1 : -1);
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return {
    indexCapitulo,
    direcao,
    temProximo,
    temAnterior,
    navegar,
    irPara,
    manipuladoresToque: { onTouchStart, onTouchEnd },
  };
}
