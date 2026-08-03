import React from "react";
import CalendarioView from "@/components/calendario/CalendarioView";
import { type EntradaDiaJson, type DadosDiaLiturgico } from "@/types/calendario";
import { getCalendarioLiturgico } from "@/lib/server/services/calendarioLiturgico";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calendário Litúrgico",
  description: "Acompanhe o calendário litúrgico da Igreja Católica",
};

function mapearEntrada(entries: EntradaDiaJson[]): DadosDiaLiturgico[] {
  return entries.map((entry) => ({
    chave: entry.nome.toLowerCase().replace(/[^a-z0-9]/g, "_"),
    nome: entry.nome,
    rank: entry.rank,
    nomeRank: entry.rank,
    cores: [entry.cor],
    nomesCores: [entry.cor],
    temporadas: [entry.temporada],
    nomesTemporadas: [entry.temporada],
  }));
}

export default async function CalendarioPage() {
  const dados = await getCalendarioLiturgico();

  const resultado: Record<string, DadosDiaLiturgico[]> = {};
  for (const [dateStr, entries] of Object.entries(dados)) {
    resultado[dateStr] = mapearEntrada(entries);
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <CalendarioView calendarioInicial={resultado} />
    </div>
  );
}
