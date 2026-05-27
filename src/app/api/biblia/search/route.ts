import { pesquisarBiblia } from "@/lib/server/services/biblia";
import { validarQueryBusca } from "@/lib/server/utils/validarQueryBusca";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { query, erro } = validarQueryBusca(request.nextUrl.searchParams, 3);
  if (erro) {
    return erro;
  }

  try {
    const results = await pesquisarBiblia(query);
    return NextResponse.json({ results });
  } catch {
    return NextResponse.json(
      { error: "Falha ao pesquisar na Bíblia" },
      { status: 500 }
    );
  }
}