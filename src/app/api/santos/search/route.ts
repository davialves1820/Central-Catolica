import { NextResponse } from "next/server";
import { getSantos } from "@/lib/server/services/santos";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";

  if (q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    // Busca até 10 resultados para a query
    const { santos } = await getSantos({ busca: q, pagina: 1 });
    // Limita os resultados a 5 para o autocomplete
    const results = santos.slice(0, 5);
    return NextResponse.json({ results });
  } catch (error) {
    console.error("Erro na busca de santos:", error);
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}
