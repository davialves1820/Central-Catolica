"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { obterPrimeiraLetra } from "@/lib/client/hooks/utils/primeiraLetra";
import { PropsGruposOracoes, Oracao } from "@/types/oracao";


export default function GruposOracoes({ visiveis: visible, setIndiceSelecionado: setSelectedIdx }: PropsGruposOracoes) {
    type Grupo = { letra: string; itens: { oracao: Oracao; idx: number }[] };

    const grupos = visible.reduce<Grupo[]>((acc, oracao, idx) => {
        const l = obterPrimeiraLetra(oracao.titulo);
        const ultimo = acc[acc.length - 1];

        if (!ultimo || ultimo.letra !== l) {
            acc.push({ letra: l, itens: [{ oracao, idx }] });
        } else {
            ultimo.itens.push({ oracao, idx });
        }
        return acc;
    }, []);

    return (
        <div className="space-y-16">
            {grupos.map((grupo) => (
                <div key={grupo.letra}>
                    <div className="flex items-center gap-6 mb-8">
                        <div className="w-12 h-12 rounded-2xl border border-secondary/20 flex items-center justify-center font-headline-md text-primary bg-surface-container-low shadow-sm">
                            {grupo.letra}
                        </div>
                        <div className="h-[1px] flex-1 bg-secondary/10" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {grupo.itens.map(({ oracao, idx }: { oracao: Oracao, idx: number }) => (
                            <motion.button
                                key={oracao.slug}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setSelectedIdx(idx)}
                                className="flex items-center gap-6 p-6 text-left border border-outline-variant/30 rounded-2xl hover:border-secondary/40 hover:bg-white transition-all group shadow-sm bg-surface-container-lowest"
                            >
                                <div className="w-14 h-14 rounded-xl flex items-center justify-center font-headline-sm text-primary bg-primary/5 border border-primary/10 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                    {oracao.titulo.charAt(0).toUpperCase()}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className="font-label-md text-on-surface truncate mb-1 group-hover:text-primary transition-colors">{oracao.titulo}</p>
                                    <p className="text-body-sm text-on-surface-variant truncate opacity-60">
                                        {oracao.texto.slice(0, 60)}…
                                    </p>
                                </div>

                                <ChevronRight className="w-4 h-4 text-outline-variant group-hover:text-secondary group-hover:translate-x-1 transition-all" />
                            </motion.button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
