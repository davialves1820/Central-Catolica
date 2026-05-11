"use client";

import { useMemo } from "react";
import { Oracao } from "@/types";
import { obterPrimeiraLetra } from "@/lib/client/hooks/utils/primeiraLetra";
import oracoesData from "@/data/oracoes.json";

const todasOracoes = (oracoesData as { oracoes: Oracao[] }).oracoes;

export function useOracoes(nomeCategoria: string | undefined) {
    const oracoes = useMemo(() => {
        if (!nomeCategoria) {
            return [];
        }

        return todasOracoes
            .filter((o) => o.categoria === nomeCategoria)
            .sort((a, b) =>
                a.titulo.localeCompare(b.titulo, "pt-BR", { sensitivity: "base" })
            );
    }, [nomeCategoria]);

    const letras = useMemo(() => {
        const conjunto = new Set(oracoes.map((o) => obterPrimeiraLetra(o.titulo)));
        return Array.from(conjunto).sort((a, b) => a.localeCompare(b, "pt-BR"));
    }, [oracoes]);

    return { oracoes, letras };
}