"use client";

import { motion, AnimatePresence } from "framer-motion";
import { DateTime } from "luxon";
import { Calendar as CalendarIcon, Info, Sparkles } from "lucide-react";
import { type DaySidebarProps, type LiturgicalDayData, BADGE_BG, RANKS } from "@/types/calendar";
import ColorDot from "./ColorDot";

export default function DaySidebar({ selectedDay, selectedData }: DaySidebarProps) {
  return (
    <div className="hidden md:block space-y-5">
      <AnimatePresence mode="wait">
        {selectedData && selectedDay ? (
          <motion.div
            key={selectedDay}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            className="space-y-5"
          >
            {/* Main card */}
            <div
              className="border border-border rounded-2xl overflow-hidden shadow-lg"
              style={{ background: "hsl(var(--card))" }}
            >
              {/* Colored top strip */}
              <div
                className="p-6"
                style={{
                  background:
                    BADGE_BG[selectedData[0].colors[0]] || "hsl(var(--secondary))",
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-bold font-body uppercase tracking-[0.2em] text-white/60">
                    {DateTime.fromISO(selectedDay).toFormat("dd 'de' MMMM", {
                      locale: "pt-BR",
                    })}
                  </span>
                  <CalendarIcon size={16} className="text-white/40" aria-hidden="true" />
                </div>
                <h3 className="font-heading text-xl font-bold text-white leading-tight">
                  {selectedData[0].name}
                </h3>
              </div>

              {/* Details */}
              <div className="p-8 space-y-6">
                {[
                  {
                    Icon:  Info,
                    label: "Grau Litúrgico",
                    value: RANKS[selectedData[0].rank] || selectedData[0].rankName,
                  },
                  {
                    Icon:  Sparkles,
                    label: "Tempo Litúrgico",
                    value: selectedData[0].seasonNames?.join(", "),
                  },
                ].map(({ Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shadow-inner"
                      style={{
                        background: "hsl(var(--secondary))",
                        color:      "hsl(var(--gold))",
                      }}
                    >
                      <Icon size={20} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-widest font-body mb-0.5">
                        {label}
                      </p>
                      <p className="font-bold text-foreground font-body text-base">{value}</p>
                    </div>
                  </div>
                ))}

                {/* CTA */}
                <div className="pt-6 border-t border-border/50">
                  <a
                    href={`/liturgia?dia=${DateTime.fromISO(selectedDay).day}&mes=${DateTime.fromISO(selectedDay).month}&ano=${DateTime.fromISO(selectedDay).year}`}
                    className="flex items-center justify-center w-full py-4 rounded-xl font-body font-bold text-sm transition-all hover:scale-[1.02] active:scale-100 shadow-xl shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    style={{
                      background: "hsl(var(--primary))",
                      color:      "hsl(var(--primary-foreground))",
                    }}
                  >
                    Ver Leituras do Dia
                  </a>
                </div>
              </div>
            </div>

            {/* Other memorials */}
            {selectedData.length > 1 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold font-body text-muted-foreground uppercase tracking-widest px-1">
                  Outras Memórias
                </h4>
                {selectedData.slice(1).map((day: LiturgicalDayData, i: number) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 border border-border rounded-xl p-4"
                    style={{ background: "hsl(var(--card))" }}
                  >
                    <ColorDot color={day.colors[0]} />
                    <p className="text-sm font-bold font-body text-foreground">{day.name}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          /* Empty state */
          <div
            className="flex flex-col items-center justify-center text-center p-12 rounded-2xl border-2 border-dashed border-border"
            role="status"
          >
            <CalendarIcon
              size={36}
              className="text-muted-foreground/20 mb-3"
              aria-hidden="true"
            />
            <p className="text-sm text-muted-foreground font-body">
              Selecione um dia para ver os detalhes litúrgicos.
            </p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
