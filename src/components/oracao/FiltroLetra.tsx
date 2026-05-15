"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { PropsFiltroLetra } from "@/types/oracao";

export default function FiltroLetra({ letras, letraAtiva, setLetraAtiva, visiveis }: PropsFiltroLetra) {
    return (
        <div className="mb-10">
            <p className="font-label-sm text-on-surface-variant uppercase tracking-widest mb-4">
                Filtrar por inicial
            </p>

            <div className="flex flex-wrap gap-3">
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setLetraAtiva(null)}
                    className={`px-5 py-2.5 rounded-xl text-label-md font-bold transition-all border ${
                        letraAtiva === null
                            ? "bg-primary text-white border-primary shadow-md"
                            : "bg-surface-container-low text-on-surface-variant border-outline-variant/30 hover:border-secondary/40"
                    }`}
                >
                    Todas
                </motion.button>

                {letras.map((letra: string) => {
                    const isAtiva = letraAtiva === letra;

                    return (
                        <motion.button
                            key={letra}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setLetraAtiva(isAtiva ? null : letra)}
                            className={`w-11 h-11 rounded-xl font-headline-sm text-headline-sm transition-all border flex items-center justify-center ${
                                isAtiva
                                    ? "bg-secondary text-white border-secondary shadow-md"
                                    : "bg-surface-container-low text-primary border-outline-variant/30 hover:border-secondary/40"
                            }`}
                        >
                            {letra}
                        </motion.button>
                    );
                })}
            </div>

            <AnimatePresence>
                {letraAtiva && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="mt-6 flex items-center gap-3 text-secondary"
                    >
                        <span className="font-body-md font-semibold">
                            {visiveis.length} orações com a inicial “{letraAtiva}”
                        </span>

                        <button 
                            onClick={() => setLetraAtiva(null)} 
                            className="p-1 hover:bg-secondary/10 rounded-full transition-colors"
                            title="Limpar filtro"
                        >
                            <X size={16} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}