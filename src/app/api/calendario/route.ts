import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { type EntradaDiaJson, type DadosDiaLiturgico } from "@/types/calendario";

// Cache em memória do JSON completo para evitar leitura de disco a cada request
let cachedJson: Record<string, EntradaDiaJson[]> | null = null;

async function getCalendario(): Promise<Record<string, EntradaDiaJson[]>> {
  if (cachedJson) {
    return cachedJson;
  }
  const jsonPath = path.join(process.cwd(), "data", "Calendario", "calendario-2026.json");
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

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  // Formato esperado: ?mes=2026-05
  const mes = searchParams.get("mes");

  try {
    const dados = await getCalendario();

    if (mes) {
      // Filtra apenas os dias do mês solicitado
      const resultado: Record<string, DadosDiaLiturgico[]> = {};
      for (const [dateStr, entries] of Object.entries(dados)) {
        if (dateStr.startsWith(mes)) {
          resultado[dateStr] = mapearEntrada(entries);
        }
      }
      return NextResponse.json(resultado, {
        headers: {
          "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
        },
      });
    }

    // Sem filtro: retorna o ano inteiro (para compatibilidade)
    const resultado: Record<string, DadosDiaLiturgico[]> = {};
    for (const [dateStr, entries] of Object.entries(dados)) {
      resultado[dateStr] = mapearEntrada(entries);
    }
    return NextResponse.json(resultado, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  } catch (error) {
    console.error("[/api/calendario]", error);
    return NextResponse.json({ error: "Falha ao carregar calendário" }, { status: 500 });
  }
}
