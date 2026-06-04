"use client";

import { useEffect, useRef } from "react";

const SELETORES_FOCO = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function useFocusTrap<T extends HTMLElement>(ativo: boolean) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    if (!ativo || !containerRef.current) {
      return;
    }

    const container = containerRef.current;
    const focaveis = Array.from(
      container.querySelectorAll<HTMLElement>(SELETORES_FOCO)
    ).filter((el) => !el.closest("[inert]"));

    if (focaveis.length === 0) {
      return;
    }

    const primeiro = focaveis[0];
    const ultimo = focaveis[focaveis.length - 1];

    // Foca o primeiro elemento ao abrir
    primeiro.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== "Tab") {
        return;
      }

      if (e.shiftKey) {
        // Shift+Tab: se estiver no primeiro, vai para o último
        if (document.activeElement === primeiro) {
          e.preventDefault();
          ultimo.focus();
        }
      } else {
        // Tab: se estiver no último, vai para o primeiro
        if (document.activeElement === ultimo) {
          e.preventDefault();
          primeiro.focus();
        }
      }
    }

    container.addEventListener("keydown", handleKeyDown);
    return () => container.removeEventListener("keydown", handleKeyDown);
  }, [ativo]);

  return containerRef;
}
