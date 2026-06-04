import { NextRequest, NextResponse } from "next/server";
import { buscarNoticias } from "@/lib/server/services/noticias";

const LIMITE_POR_PAGINA = 9;
const LIMITE_MAXIMO = 60;

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const pagina = Math.max(1, parseInt(searchParams.get("pagina") ?? "1", 10));
  const limite = Math.min(pagina * LIMITE_POR_PAGINA, LIMITE_MAXIMO);

  try {
    const todas = await buscarNoticias(["vaticannews"], limite);
    const inicio = (pagina - 1) * LIMITE_POR_PAGINA;
    const noticias = todas.slice(inicio, inicio + LIMITE_POR_PAGINA);
    const temMais = todas.length === limite; // se trouxe o máximo, pode ter mais

    return NextResponse.json(
      { noticias, temMais, pagina },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch {
    return NextResponse.json({ error: "Falha ao buscar notícias" }, { status: 500 });
  }
}
