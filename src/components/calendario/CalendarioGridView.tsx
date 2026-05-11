"use client";

import { motion } from "framer-motion";
import { DateTime } from "luxon";
import { type PropsVisualizacaoGradeCalendario, PONTO } from "@/types/calendario";

const DIAS_SEMANA = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export default function CalendarioGridView({ dias, calendario, diaSelecionado, estaMontado, rotuloMes, aoSelecionarDia, }: PropsVisualizacaoGradeCalendario) {
  return (
    <>
      {/* Weekday headers */}
      <div className="grid grid-cols-7 text-center border-b border-border/50">
        {DIAS_SEMANA.map((d) => (
          <div
            key={d}
            className="py-3 text-[10px] font-bold font-body uppercase tracking-widest text-muted-foreground"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7" role="grid" aria-label={`Calendário de ${rotuloMes}`}>
        {dias.map(({ data, ehMesAtual }, idx) => {
          const dateStr = data.toISODate()!;
          const ld = calendario[dateStr] || [];
          const main = ld[0];
          const isSelected = diaSelecionado === dateStr;
          const isToday = estaMontado && data.hasSame(DateTime.now(), "day");
          const cor = main?.cores?.[0] || "AMARELO";

          return (
            <motion.button
              key={dateStr}
              type="button"
              role="gridcell"
              whileTap={{ scale: 0.93 }}
              onClick={() => { if (ehMesAtual) aoSelecionarDia(dateStr); }}
              aria-label={`${data.toFormat("dd 'de' MMMM", { locale: "pt-BR" })}${main ? ": " + main.nome : ""}`}
              aria-selected={isSelected}
              aria-current={isToday ? "date" : undefined}
              className={`relative border-r border-b p-2 sm:p-4 text-left transition-all
                min-h-[90px] sm:min-h-[140px] xl:min-h-[160px] focus-visible:outline-none
                ${idx % 7 === 6 ? "border-r-0" : ""}`}
              style={{
                borderColor: "hsl(var(--border)/0.4)",
                background: !ehMesAtual
                  ? "hsl(var(--background))"
                  : isSelected
                    ? "hsl(var(--gold)/0.08)"
                    : undefined,
                opacity: !ehMesAtual ? 0.15 : 1,
                outline: isSelected ? "3px solid hsl(var(--gold)/0.6)" : undefined,
                outlineOffset: isSelected ? "-3px" : undefined,
              }}
            >
              {/* Day number */}
              <span
                className="text-sm sm:text-lg font-bold rounded-2xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center font-body mb-2"
                style={
                  isToday
                    ? { background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }
                    : { color: "hsl(var(--foreground))" }
                }
              >
                {data.day}
              </span>

              {/* Color bar + name */}
              {main && ehMesAtual && (
                <span className="mt-1 space-y-2 block">
                  <span
                    className={`block h-1 w-full rounded-full ${PONTO[cor] || "bg-slate-400"}`}
                    aria-hidden="true"
                  />
                  <span className="hidden md:block text-[10px] sm:text-xs leading-tight font-medium font-body text-muted-foreground line-clamp-3">
                    {main.nome}
                  </span>
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    </>
  );
}