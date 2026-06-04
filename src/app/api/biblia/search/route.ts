import { pesquisarBiblia } from "@/lib/server/services/biblia";
import { validarQueryBusca } from "@/lib/server/utils/validarQueryBusca";
import { verificarRateLimit } from "@/lib/server/utils/rateLimit";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // 20 buscas por minuto por IP — a busca faz scan em 31k versos
  const bloqueado = verificarRateLimit(request, { limite: 20, janela: 60_000 });
  if (bloqueado) {
    return bloqueado;
  }

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
