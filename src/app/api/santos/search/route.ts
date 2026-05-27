import { NextRequest, NextResponse } from "next/server";
import { getSantos } from "@/lib/server/services/santos";
import { validarQueryBusca } from "@/lib/server/utils/validarQueryBusca";

export async function GET(request: NextRequest) {
  const { query, erro } = validarQueryBusca(request.nextUrl.searchParams, 2);
  if (erro) return erro;

  try {
    const { santos } = await getSantos({ busca: query, pagina: 1 });
    const results = santos.slice(0, 5);
    return NextResponse.json({ results });
  } catch (error) {
    console.error("Erro na busca de santos:", error);
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}