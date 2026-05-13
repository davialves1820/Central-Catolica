"use client";

import { useState, useMemo } from "react";
import Header from "@/components/shared/Header";
import { SLUG_PARA_CAT, CONFIG_CAT, OracoesCategoriaPageProps } from "@/types/oracao";

import { useOracoes } from "@/lib/client/hooks/oracoes/useOracoes";
import { obterPrimeiraLetra } from "@/lib/client/hooks/utils/primeiraLetra";

import HeroCategoria from "./HeroCategoria";
import FiltroLetra from "./FiltroLetra";
import GruposOracoes from "./GrupoOracoes";
import DetalheOracao from "./DetalheOracao";

export default function OracoesCategoriaPage({ slug }: OracoesCategoriaPageProps) {
    const nomeCat = SLUG_PARA_CAT[slug];
    const config = nomeCat ? CONFIG_CAT[nomeCat] : null;

    const { oracoes, letras } = useOracoes(nomeCat);

    const [letraAtiva, setLetraAtiva] = useState<string | null>(null);
    const [indiceSelecionado, setIndiceSelecionado] = useState<number | null>(null);

    const visiveis = useMemo(() => {
        return letraAtiva
            ? oracoes.filter((o) => obterPrimeiraLetra(o.titulo) === letraAtiva)
            : oracoes;
    }, [oracoes, letraAtiva]);

    const oracaoSelecionada =
        indiceSelecionado !== null ? visiveis[indiceSelecionado] : null;

    const irProxima = () =>
        setIndiceSelecionado((i) => (i !== null && i < visiveis.length - 1 ? i + 1 : i));

    const irAnterior = () =>
        setIndiceSelecionado((i) => (i !== null && i > 0 ? i - 1 : i));

    if (!nomeCat || !config) {
        return null;
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />

            <main className="flex-1">
                <HeroCategoria nomeCat={nomeCat} config={config} quantidadeOracoes={oracoes.length} />

                <div className="container mx-auto px-4 py-8 max-w-4xl">
                    <FiltroLetra
                        letras={letras}
                        letraAtiva={letraAtiva}
                        setLetraAtiva={setLetraAtiva}
                        config={config}
                        visiveis={visiveis}
                    />

                    <GruposOracoes
                        visiveis={visiveis}
                        setIndiceSelecionado={setIndiceSelecionado}
                        config={config}
                    />
                </div>
            </main>

            {oracaoSelecionada && indiceSelecionado !== null && (
                <DetalheOracao
                    oracao={oracaoSelecionada}
                    config={config}
                    aoFechar={() => setIndiceSelecionado(null)}
                    aoAnterior={irAnterior}
                    aoProximo={irProxima}
                    temAnterior={indiceSelecionado > 0}
                    temProximo={indiceSelecionado < visiveis.length - 1}
                />
            )}
        </div>
    );
}
