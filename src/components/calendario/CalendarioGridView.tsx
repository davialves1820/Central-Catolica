"use client";

import { motion } from "framer-motion";
import { DateTime } from "luxon";
import { type CalendarioGridViewProps, DOT } from "@/types/calendar";

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export default function CalendarioGridView({
  days, calendar, selectedDay, isMounted, monthLabel, onSelectDay,
}: CalendarioGridViewProps) {
  return (
    <>
      {/* Weekday headers */}
      <div className="grid grid-cols-7 text-center border-b border-border/50">
        {WEEKDAYS.map((d) => (
          <div
            key={d}
            className="py-3 text-[10px] font-bold font-body uppercase tracking-widest text-muted-foreground"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7" role="grid" aria-label={`Calendário de ${monthLabel}`}>
        {days.map(({ date, isCurrentMonth }, idx) => {
          const dateStr = date.toISODate()!;
          const ld      = calendar[dateStr] || [];
          const main    = ld[0];
          const isSelected = selectedDay === dateStr;
          const isToday    = isMounted && date.hasSame(DateTime.now(), "day");
          const color      = main?.colors?.[0] || "GOLD";

          return (
            <motion.button
              key={dateStr}
              role="gridcell"
              whileTap={{ scale: 0.93 }}
              onClick={() => { if (isCurrentMonth) onSelectDay(dateStr); }}
              aria-label={`${date.toFormat("dd 'de' MMMM", { locale: "pt-BR" })}${main ? ": " + main.name : ""}`}
              aria-selected={isSelected}
              aria-current={isToday ? "date" : undefined}
              className={`relative border-r border-b p-2 sm:p-4 text-left transition-all
                min-h-[90px] sm:min-h-[140px] xl:min-h-[160px] focus-visible:outline-none
                ${idx % 7 === 6 ? "border-r-0" : ""}`}
              style={{
                borderColor: "hsl(var(--border)/0.4)",
                background:  !isCurrentMonth
                  ? "hsl(var(--background))"
                  : isSelected
                    ? "hsl(var(--gold)/0.08)"
                    : undefined,
                opacity:      !isCurrentMonth ? 0.15 : 1,
                outline:      isSelected ? "3px solid hsl(var(--gold)/0.6)" : undefined,
                outlineOffset:isSelected ? "-3px" : undefined,
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
                {date.day}
              </span>

              {/* Color bar + name */}
              {main && isCurrentMonth && (
                <span className="mt-1 space-y-2 block">
                  <span
                    className={`block h-1 w-full rounded-full ${DOT[color] || "bg-slate-400"}`}
                    aria-hidden="true"
                  />
                  <span className="hidden md:block text-[10px] sm:text-xs leading-tight font-medium font-body text-muted-foreground line-clamp-3">
                    {main.name}
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
