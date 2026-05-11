import { pesquisarBiblia } from "@/lib/server/services/biblia";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");

  if (!query || query.length < 3) {
    return NextResponse.json({ results: [] });
  }

  try {
    const results = await pesquisarBiblia(query);
    return NextResponse.json({ results });
  } catch {
    return NextResponse.json({ error: "Falha ao pesquisar na Bíblia" }, { status: 500 });
  }
}
