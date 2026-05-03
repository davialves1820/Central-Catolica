"use client";

import { useMemo } from "react";
import { Oracao } from "@/types";
import { firstLetter } from "@/lib/client/hooks/utils/firstLetter";
import oracoesData from "@/data/oracoes.json";

const allPrayers = (oracoesData as { oracoes: Oracao[] }).oracoes;

export function usePrayers(catName: string | undefined) {
    const prayers = useMemo(() => {
        if (!catName) return [];

        return allPrayers
            .filter((o) => o.categoria === catName)
            .sort((a, b) =>
                a.titulo.localeCompare(b.titulo, "pt-BR", { sensitivity: "base" })
            );
    }, [catName]);

    const letters = useMemo(() => {
        const set = new Set(prayers.map((p) => firstLetter(p.titulo)));
        return Array.from(set).sort((a, b) => a.localeCompare(b, "pt-BR"));
    }, [prayers]);

    return { prayers, letters };
}