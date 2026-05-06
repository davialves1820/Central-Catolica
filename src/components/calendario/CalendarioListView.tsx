"use client";

import { motion } from "framer-motion";
import { DateTime } from "luxon";
import { ChevronRight } from "lucide-react";
import { type CalendarioListViewProps, RANKS } from "@/types/calendar";
import ColorDot from "./ColorDot";

export default function CalendarioListView({
  days, calendar, selectedDay, isMounted, monthLabel, onSelectDay,
}: CalendarioListViewProps) {
  return (
    <div
      className="divide-y divide-border/30"
      role="list"
      aria-label={`Dias de ${monthLabel}`}
    >
      {days.map((date) => {
        const dateStr = date.toISODate()!;
        const ld = calendar[dateStr] || [];
        const main = ld[0];
        const isSelected = selectedDay === dateStr;
        const isToday = isMounted && date.hasSame(DateTime.now(), "day");
        const isSunday = date.weekday === 7;
        const color = main?.colors?.[0] || "GOLD";
        const weekday = date.toFormat("EEE", { locale: "pt-BR" });

        return (
          <motion.button
            key={dateStr}
            role="listitem"
            whileTap={{ scale: 0.98 }}
            onClick={() => { if (main) onSelectDay(dateStr); }}
            aria-label={`${date.toFormat("EEEE, dd 'de' MMMM", { locale: "pt-BR" })}${main ? ": " + main.name : ""}`}
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
                {weekday}
              </span>
              <span
                className="text-lg font-bold font-body rounded-2xl w-10 h-10 flex items-center justify-center transition-all"
                style={
                  isMounted && isToday
                    ? {
                      background: "hsl(var(--primary))",
                      color: "hsl(var(--primary-foreground))",
                      boxShadow: "0 4px 12px hsl(var(--primary)/0.3)",
                    }
                    : isSunday
                      ? {
                        color: "hsl(0,60%,60%)",
                        background: "hsl(0,60%,60%,0.05)",
                      }
                      : {
                        color: "hsl(var(--foreground))",
                        background: "hsl(var(--secondary)/0.3)",
                      }
                }
              >
                {date.day}
              </span>
            </span>

            {/* Color dot */}
            {main ? <ColorDot color={color} /> : <span className="block w-1.5 shrink-0" />}

            {/* Celebration info */}
            <span className="flex-1 min-w-0 flex flex-col justify-center">
              {main ? (
                <>
                  <span className="text-sm font-semibold font-body text-foreground leading-snug line-clamp-2 block">
                    {main.name}
                  </span>
                  <span className="text-[11px] text-muted-foreground font-body mt-0.5 leading-tight block">
                    {RANKS[main.rank] || main.rankName}
                  </span>
                </>
              ) : (
                <span className="text-sm text-muted-foreground/50 italic font-body block">Féria</span>
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
