"use client";

import { useState, useEffect } from "react";

export interface Progresso {
    nomeLivro: string;
    capitulo: number;
    dataHora: number;
}

export function useProgressoBiblia(): Progresso | null {
    const [progresso, setProgresso] = useState<Progresso | null>(null);

    useEffect(() => {
        const salvo = localStorage.getItem("progresso-biblia");
        if (!salvo) {
            return;
        }
        try {
            const analisado = JSON.parse(salvo);
            setProgresso(analisado);
        } catch {
            console.error("Falha ao analisar o progresso da bíblia");
        }
    }, []);

    return progresso;
}