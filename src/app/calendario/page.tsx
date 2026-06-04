import React from "react";
import path from "path";
import fs from "fs/promises";
import CalendarioView from "@/components/calendario/CalendarioView";
import { type EntradaDiaJson, type DadosDiaLiturgico } from "@/types/calendario";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calendário Litúrgico",
  description: "Acompanhe o calendário litúrgico da Igreja Católica",
};

// Cache em memória do JSON completo para evitar leitura de disco a cada request
let cachedJson: Record<string, EntradaDiaJson[]> | null = null;

async function getCalendario(): Promise<Record<string, EntradaDiaJson[]>> {
  if (cachedJson) {
    return cachedJson;
  }
  const jsonPath = path.join(process.cwd(), "data", "calendario2026.json");
  const raw = await fs.readFile(jsonPath, "utf8");
  cachedJson = JSON.parse(raw);
  return cachedJson!;
}

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
  const dados = await getCalendario();

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
