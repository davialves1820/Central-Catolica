"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { firstLetter } from "@/lib/client/hooks/utils/firstLetter";
import { Oracao } from "@/types";
import { CategoryConfig } from "./CategoryHero";

interface PrayerGroupsProps {
    visible: Oracao[];
    setSelectedIdx: (idx: number) => void;
    cfg: CategoryConfig;
}

export default function PrayerGroups({ visible, setSelectedIdx, cfg }: PrayerGroupsProps) {
    const groups: { letter: string; items: { prayer: Oracao; idx: number }[] }[] = [];

    visible.forEach((prayer: Oracao, idx: number) => {
        const l = firstLetter(prayer.titulo);
        const last = groups[groups.length - 1];

        if (!last || last.letter !== l) {
            groups.push({ letter: l, items: [{ prayer, idx }] });
        } else {
            last.items.push({ prayer, idx });
        }
    });

    return (
        <div className="space-y-8">
            {groups.map((group) => (
                <div key={group.letter}>
                    <div className="flex items-center gap-3 mb-3">
                        <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center font-heading font-bold text-lg"
                            style={{ background: cfg.glow, color: cfg.color, border: `1px solid ${cfg.border}` }}
                        >
                            {group.letter}
                        </div>
                        <div className="h-px flex-1" style={{ background: `linear-gradient(to right, ${cfg.border}, transparent)` }} />
                    </div>

                    <div className="rounded-2xl border border-border overflow-hidden divide-y divide-border/40">
                        {group.items.map(({ prayer, idx }: { prayer: Oracao, idx: number }) => (
                            <motion.button
                                key={prayer.slug}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => setSelectedIdx(idx)}
                                className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-secondary/60 group"
                            >
                                <div
                                    className="w-10 h-10 rounded-lg flex items-center justify-center font-bold"
                                    style={{ background: cfg.glow, color: cfg.color, border: `1px solid ${cfg.border}` }}
                                >
                                    {prayer.titulo.charAt(0).toUpperCase()}
                                </div>

                                <div className="flex-1">
                                    <p className="font-semibold">{prayer.titulo}</p>
                                    <p className="text-xs text-muted-foreground italic">
                                        {prayer.texto.slice(0, 90)}…
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