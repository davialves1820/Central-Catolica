"use client";

import { useMemo, useState, useEffect } from "react";
import { Oracao } from "@/types/oracao";
import { obterPrimeiraLetra } from "@/lib/client/hooks/utils/primeiraLetra";

interface UseOracoesReturn {
    oracoes: Oracao[];
    letras: string[];
    loading: boolean;
}

// Cache local para evitar re-fetch ao navegar entre categorias na mesma sessão
const fetchCache = new Map<string, Oracao[]>();

export function useOracoes(nomeCategoria: string | undefined): UseOracoesReturn {
    const [oracoes, setOracoes] = useState<Oracao[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!nomeCategoria) {
            queueMicrotask(() => setOracoes([]));
            return;
        }

        if (fetchCache.has(nomeCategoria)) {
            queueMicrotask(() => setOracoes(fetchCache.get(nomeCategoria)!));
            return;
        }

        let cancelled = false;
        queueMicrotask(() => setLoading(true));

        fetch(`/api/oracoes?categoria=${encodeURIComponent(nomeCategoria)}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP ${res.status}`);
                }
                return res.json();
            })
            .then(({ oracoes: data }: { oracoes: Oracao[] }) => {
                if (cancelled) {
                    return;
                }
                fetchCache.set(nomeCategoria, data);
                setOracoes(data);
            })
            .catch((err) => {
                if (!cancelled) {
                    console.error("[useOracoes]", err);
                }
            })
            .finally(() => {
                if (!cancelled) {
                    setLoading(false);
                }
            });

        return () => {
            cancelled = true;
        };
    }, [nomeCategoria]);

    const letras = useMemo(() => {
        const conjunto = new Set(oracoes.map((o) => obterPrimeiraLetra(o.titulo)));
        return Array.from(conjunto).sort((a, b) => a.localeCompare(b, "pt-BR"));
    }, [oracoes]);

    return { oracoes, letras, loading };
}