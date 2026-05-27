import { NextResponse } from "next/server";

interface ValidacaoBusca {
    query: string;
    erro: NextResponse | null;
}

/**
 * Valida e extrai o parâmetro de busca "q" de uma URL de request.
 * Retorna { query, erro: null } em caso de sucesso,
 * ou { query: "", erro: NextResponse } em caso de falha.
 */
export function validarQueryBusca(searchParams: URLSearchParams, minLen = 2): ValidacaoBusca {
    const query = searchParams.get("q") ?? "";

    if (query.length < minLen) {
        return {
            query: "",
            erro: NextResponse.json(
                { results: [] },
                { status: 200 }
            ),
        };
    }

    // Limita o tamanho máximo para evitar abuso
    if (query.length > 200) {
        return {
            query: "",
            erro: NextResponse.json(
                { error: "Query muito longa" },
                { status: 400 }
            ),
        };
    }

    return { query, erro: null };
}