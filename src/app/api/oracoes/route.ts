import { NextRequest, NextResponse } from "next/server";
import oracoesData from "@/data/oracoes.json";
import { Oracao } from "@/types/oracao";

const todas = (oracoesData as { oracoes: Oracao[] }).oracoes;

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;
    const categoria = searchParams.get("categoria");

    if (!categoria) {
        return NextResponse.json({ error: "categoria é obrigatória" }, { status: 400 });
    }

    const oracoes = todas
        .filter((o) => o.categoria === categoria)
        .sort((a, b) => a.titulo.localeCompare(b.titulo, "pt-BR", { sensitivity: "base" }));

    return NextResponse.json(
        { oracoes },
        {
            headers: {
                // Dados estáticos — pode cachear bastante
                "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
            },
        }
    );
}