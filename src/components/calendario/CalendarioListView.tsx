"use client";

import { motion } from "framer-motion";
import { DateTime } from "luxon";
import { ChevronRight } from "lucide-react";
import { type PropsVisualizacaoListaCalendario, GRAUS } from "@/types/calendario";
import ColorDot from "./ColorDot";

export default function CalendarioListView({ dias, calendario, diaSelecionado, estaMontado, rotuloMes, aoSelecionarDia, }: PropsVisualizacaoListaCalendario) {
  return (
    <div
      className="divide-y divide-border/30"
      role="list"
      aria-label={`Dias de ${rotuloMes}`}
    >
      {dias.map((data) => {
        const dateStr = data.toISODate()!;
        const ld = calendario[dateStr] || [];
        const main = ld[0];
        const isSelected = diaSelecionado === dateStr;
        const isToday = estaMontado && data.hasSame(DateTime.now(), "day");
        const isSunday = data.weekday === 7;
        const cor = main?.cores?.[0] || "AMARELO";
        const diaSemana = data.toFormat("EEE", { locale: "pt-BR" });

        return (
          <motion.button
            key={dateStr}
            type="button"
            role="listitem"
            whileTap={{ scale: 0.98 }}
            onClick={() => { if (main) aoSelecionarDia(dateStr); }}
            aria-label={`${data.toFormat("EEEE, dd 'de' MMMM", { locale: "pt-BR" })}${main ? ": " + main.nome : ""}`}
            aria-current={isToday ? "date" : undefined}
            className="w-full flex items-center gap-3 px-4 py-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
            style={{
              background: isSelected ? "hsl(var(--gold)/0.07)" : undefined,
              borderLeft: isSelected
                ? "3px solid hsl(var(--gold))"
                : "3px solid transparent",
            }}
          >
            {/* Day number + weekday label */}
            <span className="flex flex-col items-center w-12 shrink-0">
              <span
                className={`text-[9px] font-bold font-body uppercase tracking-wider mb-0.5 ${isSunday ? "text-red-400" : "text-muted-foreground/60"
                  }`}
              >
                {diaSemana}
              </span>
              <span
                className="text-lg font-bold font-body rounded-2xl w-10 h-10 flex items-center justify-center transition-all"
                style={
                  estaMontado && isToday
                    ? {
                      background: "hsl(var(--primary))",
                      color: "hsl(var(--primary-foreground))",
                      boxShadow: "0 4px 12px hsl(var(--primary)/0.3)",
                    }
                    : isSunday
                      ? { color: "hsl(0,60%,60%)", background: "hsl(0,60%,60%,0.05)" }
                      : { color: "hsl(var(--foreground))", background: "hsl(var(--secondary)/0.3)" }
                }
              >
                {data.day}
              </span>
            </span>

            {/* Color dot */}
            {main ? <ColorDot cor={cor} /> : <span className="block w-1.5 shrink-0" />}

            {/* Celebration info */}
            <span className="flex-1 min-w-0 flex flex-col justify-center">
              {main ? (
                <>
                  <span className="text-sm font-semibold font-body text-foreground leading-snug line-clamp-2 block">
                    {main.nome}
                  </span>
                  <span className="text-[11px] text-muted-foreground font-body mt-0.5 leading-tight block">
                    {GRAUS[main.rank] || main.nomeRank}
                  </span>
                </>
              ) : (
                <span className="text-sm text-muted-foreground/50 italic font-body block">
                  Féria
                </span>
              )}
            </span>

            {/* Chevron hint */}
            {main && (
              <ChevronRight
                size={13}
                className="text-muted-foreground/25 shrink-0"
                aria-hidden="true"
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
