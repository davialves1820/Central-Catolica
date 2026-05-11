"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { PropsFiltroLetra } from "@/types/oracao";

export default function FiltroLetra({ letras, letraAtiva, setLetraAtiva, config, visiveis }: PropsFiltroLetra) {
    return (
        <div className="mb-8">
            <p className="text-xs font-body font-bold uppercase tracking-widest text-muted-foreground mb-3">
                Filtrar por inicial
            </p>

            <div className="flex flex-wrap gap-2">
                <motion.button
                    whileTap={{ scale: 0.92 }}
                    onClick={() => setLetraAtiva(null)}
                    className="px-4 py-2 rounded-lg text-sm font-body font-bold border"
                    style={
                        letraAtiva === null
                            ? { background: config.cor, color: "hsl(var(--primary-foreground))", borderColor: config.cor }
                            : { background: "hsl(var(--card))", color: "hsl(var(--muted-foreground))", borderColor: "hsl(var(--border))" }
                    }
                >
                    Todas
                </motion.button>

                {letras.map((letra: string) => {
                    const isAtiva = letraAtiva === letra;

                    return (
                        <motion.button
                            key={letra}
                            whileTap={{ scale: 0.92 }}
                            onClick={() => setLetraAtiva(isAtiva ? null : letra)}
                            className="relative w-11 h-11 rounded-xl text-sm font-bold font-heading border"
                            style={
                                isAtiva
                                    ? {
                                        background: config.cor,
                                        color: "hsl(var(--primary-foreground))",
                                        borderColor: config.cor,
                                        boxShadow: `0 4px 16px ${config.borda}`,
                                    }
                                    : {
                                        background: config.brilho,
                                        color: config.cor,
                                        borderColor: config.borda,
                                    }
                            }
                        >
                            {letra}
                        </motion.button>
                    );
                })}
            </div>

            <AnimatePresence>
                {letraAtiva && (
                    <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="mt-3 flex items-center gap-2"
                    >
                        <span className="text-sm font-body font-semibold" style={{ color: config.cor }}>
                            {visiveis.length} orações com inicial “{letraAtiva}”
                        </span>

                        <button onClick={() => setLetraAtiva(null)} className="text-xs flex items-center gap-1">
                            <X size={12} /> limpar
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}