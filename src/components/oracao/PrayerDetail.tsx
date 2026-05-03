"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Oracao } from "@/types";
import { CategoryConfig } from "./CategoryHero";

interface PrayerDetailProps {
    prayer: Oracao;
    cfg: CategoryConfig;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
    hasPrev: boolean;
    hasNext: boolean;
}

/* Format prayer text */
function PrayerText({ text }: { text: string }) {
    const paragraphs = text.split(/\n\n+/);
    return (
        <div className="space-y-4">
            {paragraphs.map((para, i) => {
                const lines = para.split("\n").filter(Boolean);
                return (
                    <p
                        key={i}
                        className="leading-[1.95] text-foreground/85"
                        style={{ fontFamily: "var(--font-reading)", fontSize: "1.05rem" }}
                    >
                        {lines.map((line, j) => (
                            <span key={j}>
                                {line}
                                {j < lines.length - 1 && <br />}
                            </span>
                        ))}
                    </p>
                );
            })}
        </div>
    );
}


export default function PrayerDetail({ prayer, cfg, onClose, onPrev, onNext, hasPrev, hasNext }: PrayerDetailProps) {
    useEffect(() => {
        const h = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
            if (e.key === "ArrowRight") {
                onNext();
            }
            if (e.key === "ArrowLeft") {
                onPrev();
            }
        };
        window.addEventListener("keydown", h);
        return () => window.removeEventListener("keydown", h);
    }, [onClose, onNext, onPrev]);

    return (
        <>
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Panel */}
            <motion.div
                initial={{ opacity: 0, y: 48 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 48 }}
                transition={{ type: "spring", damping: 28, stiffness: 300 }}
                className="fixed inset-x-0 bottom-0 z-50 flex flex-col rounded-t-3xl border-t border-border overflow-hidden shadow-2xl md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:top-12 md:bottom-12 md:w-[680px] md:rounded-2xl md:border"
                style={{ background: "hsl(var(--card))", maxHeight: "88vh" }}
                role="dialog"
                aria-label={prayer.titulo}
                aria-modal="true"
            >
                {/* Drag handle (mobile) */}
                <div className="flex justify-center pt-3 pb-1 md:hidden">
                    <div className="w-10 h-1 rounded-full" style={{ background: "hsl(var(--border))" }} aria-hidden="true" />
                </div>

                {/* Header */}
                <div
                    className="px-5 py-4 flex items-start gap-4 shrink-0"
                    style={{
                        background: `linear-gradient(135deg, hsl(var(--secondary)) 0%, ${cfg.glow} 100%)`,
                        borderBottom: `1px solid ${cfg.border}`,
                    }}
                >
                    <div className="flex-1 min-w-0">
                        <span
                            className="inline-block text-[10px] font-bold font-body uppercase tracking-widest px-2.5 py-0.5 rounded-full border mb-2"
                            style={{ color: cfg.color, borderColor: cfg.border, background: cfg.glow }}
                        >
                            {prayer.categoria}
                        </span>
                        <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground leading-tight">
                            {prayer.titulo}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        aria-label="Fechar oração"
                        className="shrink-0 p-2 rounded-xl text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        style={{ background: "hsl(var(--border)/0.4)" }}
                    >
                        <X size={18} aria-hidden="true" />
                    </button>
                </div>

                {/* Scrollable body */}
                <div className="flex-1 overflow-y-auto px-5 py-6">
                    <PrayerText text={prayer.texto} />
                </div>

                {/* Footer — prev / next navigation */}
                <div
                    className="shrink-0 px-5 py-3 border-t border-border flex items-center justify-between gap-3"
                    style={{ background: "hsl(var(--secondary))" }}
                >
                    <button
                        onClick={onPrev}
                        disabled={!hasPrev}
                        aria-label="Oração anterior"
                        className="flex items-center gap-1.5 text-xs font-body font-bold px-3 py-2 rounded-lg border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-25 disabled:cursor-not-allowed"
                        style={{
                            borderColor: hasPrev ? cfg.border : "hsl(var(--border))",
                            color: hasPrev ? cfg.color : "hsl(var(--muted-foreground))",
                            background: hasPrev ? cfg.glow : "transparent",
                        }}
                    >
                        <ChevronLeft size={14} aria-hidden="true" />
                        Anterior
                    </button>

                    {/* Ornament */}
                    <span className="text-xs text-muted-foreground/40 font-body select-none">✦ Amém ✦</span>

                    <button
                        onClick={onNext}
                        disabled={!hasNext}
                        aria-label="Próxima oração"
                        className="flex items-center gap-1.5 text-xs font-body font-bold px-3 py-2 rounded-lg border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-25 disabled:cursor-not-allowed"
                        style={{
                            borderColor: hasNext ? cfg.border : "hsl(var(--border))",
                            color: hasNext ? cfg.color : "hsl(var(--muted-foreground))",
                            background: hasNext ? cfg.glow : "transparent",
                        }}
                    >
                        Próxima
                        <ChevronRight size={14} aria-hidden="true" />
                    </button>
                </div>
            </motion.div>
        </>
    );
}