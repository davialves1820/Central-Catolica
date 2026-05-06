"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { LetterFilterProps } from "@/types/oracao";

export default function LetterFilter({ letters, activeLetter, setActiveLetter, cfg, visible, }: LetterFilterProps) {
    return (
        <div className="mb-8">
            <p className="text-xs font-body font-bold uppercase tracking-widest text-muted-foreground mb-3">
                Filtrar por inicial
            </p>

            <div className="flex flex-wrap gap-2">
                <motion.button
                    whileTap={{ scale: 0.92 }}
                    onClick={() => setActiveLetter(null)}
                    className="px-4 py-2 rounded-lg text-sm font-body font-bold border"
                    style={
                        activeLetter === null
                            ? { background: cfg.color, color: "hsl(var(--primary-foreground))", borderColor: cfg.color }
                            : { background: "hsl(var(--card))", color: "hsl(var(--muted-foreground))", borderColor: "hsl(var(--border))" }
                    }
                >
                    Todas
                </motion.button>

                {letters.map((letter: string) => {
                    const isActive = activeLetter === letter;

                    return (
                        <motion.button
                            key={letter}
                            whileTap={{ scale: 0.92 }}
                            onClick={() => setActiveLetter(isActive ? null : letter)}
                            className="relative w-11 h-11 rounded-xl text-sm font-bold font-heading border"
                            style={
                                isActive
                                    ? {
                                        background: cfg.color,
                                        color: "hsl(var(--primary-foreground))",
                                        borderColor: cfg.color,
                                        boxShadow: `0 4px 16px ${cfg.border}`,
                                    }
                                    : {
                                        background: cfg.glow,
                                        color: cfg.color,
                                        borderColor: cfg.border,
                                    }
                            }
                        >
                            {letter}
                        </motion.button>
                    );
                })}
            </div>

            <AnimatePresence>
                {activeLetter && (
                    <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="mt-3 flex items-center gap-2"
                    >
                        <span className="text-sm font-body font-semibold" style={{ color: cfg.color }}>
                            {visible.length} orações com inicial “{activeLetter}”
                        </span>

                        <button onClick={() => setActiveLetter(null)} className="text-xs flex items-center gap-1">
                            <X size={12} /> limpar
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}