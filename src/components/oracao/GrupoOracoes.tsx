"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { obterPrimeiraLetra } from "@/lib/client/hooks/utils/primeiraLetra";
import { PropsGruposOracoes, Oracao } from "@/types/oracao";

export default function GruposOracoes({ visiveis: visible, setIndiceSelecionado: setSelectedIdx, config: cfg }: PropsGruposOracoes) {
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
        <div className="space-y-8">
            {grupos.map((grupo) => (
                <div key={grupo.letra}>
                    <div className="flex items-center gap-3 mb-3">
                        <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center font-heading font-bold text-lg"
                            style={{ background: cfg.brilho, color: cfg.cor, border: `1px solid ${cfg.borda}` }}
                        >
                            {grupo.letra}
                        </div>
                        <div className="h-px flex-1" style={{ background: `linear-gradient(to right, ${cfg.borda}, transparent)` }} />
                    </div>

                    <div className="rounded-2xl border border-border overflow-hidden divide-y divide-border/40">
                        {grupo.itens.map(({ oracao, idx }: { oracao: Oracao, idx: number }) => (
                            <motion.button
                                key={oracao.slug}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => setSelectedIdx(idx)}
                                className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-secondary/60 group"
                            >
                                <div
                                    className="w-10 h-10 rounded-lg flex items-center justify-center font-bold"
                                    style={{ background: cfg.brilho, color: cfg.cor, border: `1px solid ${cfg.borda}` }}
                                >
                                    {oracao.titulo.charAt(0).toUpperCase()}
                                </div>

                                <div className="flex-1">
                                    <p className="font-semibold">{oracao.titulo}</p>
                                    <p className="text-xs text-muted-foreground italic">
                                        {oracao.texto.slice(0, 90)}…
                                    </p>
                                </div>

                                <ChevronRight size={15} />
                            </motion.button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}