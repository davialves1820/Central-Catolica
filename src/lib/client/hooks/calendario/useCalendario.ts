"use client";

import { useState, useMemo, useEffect } from "react";
import { DateTime } from "luxon";
import { type EstadoCalendario, type ModoVisualizacao, type DadosDiaLiturgico } from "@/types/calendario";

export function useCalendario(calendarioInicial: Record<string, DadosDiaLiturgico[]>): EstadoCalendario {
  const [estaMontado, setEstaMontado] = useState(false);
  const [dataAtual, setDataAtual] = useState(() => DateTime.now().startOf("month"));
  const [diaSelecionado, setDiaSelecionado] = useState<string | null>(null);
  const [modoVisualizacao, setModoVisualizacao] = useState<ModoVisualizacao>("lista");

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const sincronizarModo = () => setModoVisualizacao(media.matches ? "grade" : "lista");

    const handle = requestAnimationFrame(() => {
      setEstaMontado(true);
      setDataAtual(DateTime.now());
      sincronizarModo();
    });

    media.addEventListener("change", sincronizarModo);
    return () => {
      cancelAnimationFrame(handle);
      media.removeEventListener("change", sincronizarModo);
    };
  }, []);

  const rotuloMes = dataAtual.toFormat("MMMM yyyy", { locale: "pt-BR" });

  const diasNoMes = useMemo(() => {
    const inicio = dataAtual.startOf("month");
    const preenchimentoInicio = inicio.weekday === 7 ? 0 : inicio.weekday;
    const dias: { data: DateTime; ehMesAtual: boolean }[] = [];

    for (let i = preenchimentoInicio - 1; i >= 0; i--) {
      dias.push({ data: inicio.minus({ days: i + 1 }), ehMesAtual: false });
    }
    for (let i = 0; i < inicio.daysInMonth!; i++) {
      dias.push({ data: inicio.plus({ days: i }), ehMesAtual: true });
    }

    return dias;
  }, [dataAtual]);

  const listaDias = useMemo(() => {
    const inicio = dataAtual.startOf("month");
    return Array.from({ length: inicio.daysInMonth! }, (_, i) =>
      inicio.plus({ days: i }),
    );
  }, [dataAtual]);

  const dadosSelecionados = diaSelecionado ? (calendarioInicial[diaSelecionado] ?? null) : null;

  const irAnterior = () => setDataAtual((d) => d.minus({ months: 1 }));
  const irProximo = () => setDataAtual((d) => d.plus({ months: 1 }));
  const irHoje = () => {
    const hoje = DateTime.now();
    setDataAtual(hoje);
    setDiaSelecionado(hoje.toISODate());
  };
  const selecionarDia = (dateStr: string) => {
    if (calendarioInicial[dateStr]) {
      setDiaSelecionado(dateStr);
    }
  };
  const limparDia = () => setDiaSelecionado(null);

  return {
    dataAtual,
    diaSelecionado,
    modoVisualizacao,
    estaMontado,
    rotuloMes,
    diasNoMes,
    listaDias,
    dadosSelecionados,
    irAnterior,
    irProximo,
    irHoje,
    selecionarDia,
    limparDia,
    setModoVisualizacao,
  };
}