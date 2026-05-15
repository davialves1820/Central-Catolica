"use client";

import { useState, useMemo } from "react";
import { SLUG_PARA_CAT, CONFIG_CAT, OracoesCategoriaPageProps } from "@/types/oracao";
import { useOracoes } from "@/lib/client/hooks/oracoes/useOracoes";
import { obterPrimeiraLetra } from "@/lib/client/hooks/utils/primeiraLetra";
import OracoesSidebar from "./OracoesSidebar";
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
            <main className="flex-1 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-16">
                <HeroCategoria nomeCat={nomeCat} config={config} quantidadeOracoes={oracoes.length} />

                <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
                    <OracoesSidebar currentCat={nomeCat} />

                    <div className="md:col-span-9 space-y-12">
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
