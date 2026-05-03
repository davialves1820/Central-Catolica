"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft, ChevronRight, Calendar as CalendarIcon,
  Info, Sparkles, List, LayoutGrid, X,
} from "lucide-react";
import { DateTime } from "luxon";
import { LiturgicalDayData } from "@/app/calendario/page";

/* Color maps */
export const DOT: Record<string, string> = {
  GREEN: "bg-emerald-500", PURPLE: "bg-purple-500", WHITE: "bg-slate-300",
  RED: "bg-red-500", ROSE: "bg-pink-400", GOLD: "bg-amber-400", BLACK: "bg-slate-600",
  VERDE: "bg-emerald-500", ROXO: "bg-purple-500", BRANCO: "bg-slate-300",
  VERMELHO: "bg-red-500", ROSA: "bg-pink-400",
};

export const BADGE_BG: Record<string, string> = {
  GREEN: "hsl(142,55%,25%)", PURPLE: "hsl(270,45%,28%)", WHITE: "hsl(220,12%,45%)",
  RED: "hsl(0,58%,28%)", ROSE: "hsl(330,52%,32%)", GOLD: "hsl(42,75%,32%)", BLACK: "hsl(220,12%,16%)",
  VERDE: "hsl(142,55%,25%)", ROXO: "hsl(270,45%,28%)", BRANCO: "hsl(220,12%,45%)",
  VERMELHO: "hsl(0,58%,28%)", ROSA: "hsl(330,52%,32%)",
};

export const RANKS: Record<string, string> = {
  SOLEMNITY: "Solenidade", SUNDAY: "Domingo", FEAST: "Festa",
  MEMORIAL: "Memória", OPTIONAL_MEMORIAL: "Memória Opcional", WEEKDAY: "Féria",
};

interface CalendarioViewProps {
  initialCalendar: Record<string, LiturgicalDayData[]>;
}

type ViewMode = "grid" | "list";

/* Day detail bottom sheet (mobile) */
function DaySheet({ selectedDay, selectedData, onClose, }: { selectedDay: string; selectedData: LiturgicalDayData[]; onClose: () => void; }) {
  const main = selectedData[0];
  const color = main?.colors?.[0] || "GOLD";
  const date = DateTime.fromISO(selectedDay);

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 30, stiffness: 320 }}
      className="fixed md:hidden inset-x-0 bottom-0 z-50 rounded-t-3xl border-t border-border overflow-hidden"
      style={{ background: "hsl(var(--card))", maxHeight: "80vh" }}
      role="dialog"
      aria-label="Detalhes litúrgicos do dia"
    >
      {/* Handle */}
      <div className="flex justify-center pt-3 pb-1">
        <div className="w-10 h-1 rounded-full" style={{ background: "hsl(var(--border))" }} aria-hidden="true" />
      </div>

      {/* Colored header */}
      <div className="px-5 py-4" style={{ background: BADGE_BG[color] || "hsl(var(--secondary))" }}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-bold font-body uppercase tracking-widest text-white/60 mb-1">
              {date.toFormat("EEEE, dd 'de' MMMM", { locale: "pt-BR" })}
            </p>
            <h3 className="font-heading text-xl font-bold text-white leading-tight">
              {main.name}
            </h3>
          </div>
          <button onClick={onClose} aria-label="Fechar detalhes"
            className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50">
            <X size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Body — scrollable */}
      <div className="overflow-y-auto px-5 py-5 space-y-4" style={{ maxHeight: "calc(80vh - 120px)" }}>
        {/* Rank + season */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-2xl border border-border/50 p-4 shadow-sm" style={{ background: "hsl(var(--secondary)/0.5)" }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--gold)/0.1)", color: "hsl(var(--gold))" }}>
                <Info size={14} aria-hidden="true" />
              </div>
              <p className="text-[10px] font-bold font-body uppercase tracking-wider text-muted-foreground">Grau</p>
            </div>
            <p className="font-semibold text-sm font-body text-foreground leading-snug">
              {RANKS[main.rank] || main.rankName}
            </p>
          </div>
          <div className="rounded-2xl border border-border/50 p-4 shadow-sm" style={{ background: "hsl(var(--secondary)/0.5)" }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--gold)/0.1)", color: "hsl(var(--gold))" }}>
                <Sparkles size={14} aria-hidden="true" />
              </div>
              <p className="text-[10px] font-bold font-body uppercase tracking-wider text-muted-foreground">Tempo</p>
            </div>
            <p className="font-semibold text-sm font-body text-foreground leading-snug">
              {main.seasonNames?.join(", ")}
            </p>
          </div>
        </div>

        {/* Other memorials */}
        {selectedData.length > 1 && (
          <div className="space-y-2">
            <p className="text-xs font-bold font-body uppercase tracking-widest text-muted-foreground">
              Outras Memórias
            </p>
            {selectedData.slice(1).map((day, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border border-border p-3"
                style={{ background: "hsl(var(--secondary))" }}>
                <div className={`w-2 h-2 rounded-full shrink-0 ${DOT[day.colors[0]] || "bg-slate-400"}`} aria-hidden="true" />
                <p className="text-sm font-body text-foreground">{day.name}</p>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <a
          href={`/liturgia?dia=${date.day}&mes=${date.month}&ano=${date.year}`}
          className="flex items-center justify-center w-full py-4 rounded-2xl font-body font-bold text-sm transition-all active:scale-[0.98] shadow-lg shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
        >
          Ver Leituras do Dia
        </a>
      </div>
    </motion.div>
  );
}

/* Backdrop */
function Backdrop({ onClick }: { onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed md:hidden inset-0 z-40 bg-black/50 backdrop-blur-sm"
      onClick={onClick}
      aria-hidden="true"
    />
  );
}

export default function CalendarioView({ initialCalendar }: CalendarioViewProps) {
  const [mounted, setMounted] = useState(false);
  const [currentDate, setCurrentDate] = useState(DateTime.fromISO("2026-04-01")); // Stable initial date for SSR
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");

    const handleChange = () => {
      setViewMode(media.matches ? "grid" : "list");
    };

    // Defer client-only state updates to avoid cascading renders
    const timer = setTimeout(() => {
      setMounted(true);
      setCurrentDate(DateTime.now());
      handleChange();
    }, 0);

    media.addEventListener("change", handleChange);

    return () => {
      clearTimeout(timer);
      media.removeEventListener("change", handleChange);
    };
  }, []);

  const daysInMonth = useMemo(() => {
    const start = currentDate.startOf("month");
    const startPadding = start.weekday === 7 ? 0 : start.weekday;
    const days = [];
    for (let i = startPadding - 1; i >= 0; i--) {
      days.push({ date: start.minus({ days: i + 1 }), isCurrentMonth: false });
    }

    for (let i = 0; i < start.daysInMonth!; i++) {
      days.push({ date: start.plus({ days: i }), isCurrentMonth: true });
    }
    return days;
  }, [currentDate]);

  const listDays = useMemo(() => {
    const start = currentDate.startOf("month");
    return Array.from({ length: start.daysInMonth! }, (_, i) => start.plus({ days: i }));
  }, [currentDate]);

  const goToPrev = () => setCurrentDate(currentDate.minus({ months: 1 }));
  const goToNext = () => setCurrentDate(currentDate.plus({ months: 1 }));
  const goToToday = () => {
    setCurrentDate(DateTime.now());
    setSelectedDay(DateTime.now().toISODate());
  };

  const selectedData = selectedDay ? initialCalendar[selectedDay] : null;
  const monthLabel = currentDate.toFormat("MMMM yyyy", { locale: "pt-BR" });

  const selectDay = (dateStr: string) => {
    if (initialCalendar[dateStr]) {
      setSelectedDay(dateStr);
    }
  };

  const dot = (color: string) => (
    <span className={`block w-1.5 h-1.5 rounded-full shrink-0 ${DOT[color] || "bg-slate-400"}`} aria-hidden="true" />
  );

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Calendar card */}
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 py-4 sm:py-10">
        <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-10">

          {/* Calendar column */}
          <div className="md:col-span-2 xl:col-span-3">
            <div className="overflow-hidden border border-border rounded-2xl shadow-lg"
              style={{ background: "hsl(var(--card))" }}>

              {/* Header */}
              <div
                className="px-4 py-4 sm:p-6 border-b border-border flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap"
                style={{ background: "hsl(var(--secondary)/0.3)" }}>
                <div className="min-w-0 flex-1">

                  <h2 className="font-heading text-lg sm:text-2xl font-bold text-foreground capitalize truncate leading-tight">
                    {monthLabel}
                  </h2>
                  <p className="font-body text-[10px] text-muted-foreground mt-0.5 hidden sm:block uppercase tracking-widest font-bold">
                    Calendário Litúrgico
                  </p>
                </div>

                <div className="flex items-center gap-1 sm:gap-2 shrink-0 flex-wrap justify-end">
                  {/* View toggle — hidden on mobile (always list) */}
                  <div className="hidden md:flex rounded-lg border border-border overflow-hidden"
                    role="group" aria-label="Modo de visualização">
                    {([
                      ["grid", <LayoutGrid key="g" size={15} aria-hidden="true" />, "Grade"],
                      ["list", <List key="l" size={15} aria-hidden="true" />, "Lista"],
                    ] as const).map(([mode, icon, label]) => (
                      <button key={mode} onClick={() => setViewMode(mode)}
                        aria-label={label} aria-pressed={viewMode === mode}
                        className="p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        style={viewMode === mode
                          ? { background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }
                          : { background: "hsl(var(--card))", color: "hsl(var(--muted-foreground))" }}
                      >{icon}</button>
                    ))}
                  </div>

                  <button onClick={goToToday} aria-label="Ir para hoje"
                    className="px-3 py-1.5 text-xs font-body font-bold rounded-xl border border-border/50 transition-all active:scale-95 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-sm"
                    style={{ background: "hsl(var(--card))", color: "hsl(var(--foreground))" }}
                  >Hoje</button>

                  {/* Month nav */}
                  <div className="flex rounded-xl border border-border/50 overflow-hidden shadow-sm">
                    <button onClick={goToPrev} aria-label="Mês anterior"
                      className="p-2 transition-colors active:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary border-r border-border/50"
                      style={{ background: "hsl(var(--card))", color: "hsl(var(--muted-foreground))" }}>
                      <ChevronLeft size={18} aria-hidden="true" />
                    </button>
                    <button onClick={goToNext} aria-label="Próximo mês"
                      className="p-2 transition-colors active:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      style={{ background: "hsl(var(--card))", color: "hsl(var(--muted-foreground))" }}>
                      <ChevronRight size={18} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>

              {/* GRID VIEW (md+) */}

              {viewMode === "grid" && (
                <>
                  <div className="grid grid-cols-7 text-center border-b border-border/50">
                    {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((d) => (
                      <div key={d}
                        className="py-3 text-[10px] font-bold font-body uppercase tracking-widest text-muted-foreground">
                        {d}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7" role="grid" aria-label={`Calendário de ${monthLabel}`}>
                    {daysInMonth.map(({ date, isCurrentMonth }, idx) => {
                      const dateStr = date.toISODate()!;
                      const ld = initialCalendar[dateStr] || [];
                      const main = ld[0];
                      const isSelected = selectedDay === dateStr;
                      const isToday = mounted ? date.hasSame(DateTime.now(), "day") : false;
                      const color = main?.colors?.[0] || "GOLD";

                      return (
                        <motion.button key={dateStr} role="gridcell"
                          whileTap={{ scale: 0.93 }}
                          onClick={() => { if (isCurrentMonth) selectDay(dateStr); }}
                          aria-label={`${date.toFormat("dd 'de' MMMM", { locale: "pt-BR" })}${main ? ": " + main.name : ""}`}
                          aria-selected={isSelected}
                          aria-current={isToday ? "date" : undefined}
                          className={`relative border-r border-b p-2 sm:p-4 text-left transition-all min-h-[90px] sm:min-h-[140px] xl:min-h-[160px] focus-visible:outline-none ${idx % 7 === 6 ? "border-r-0" : ""}`}
                          style={{
                            borderColor: "hsl(var(--border)/0.4)",
                            background: !isCurrentMonth ? "hsl(var(--background))"
                              : isSelected ? "hsl(var(--gold)/0.08)" : undefined,
                            opacity: !isCurrentMonth ? 0.15 : 1,
                            outline: isSelected ? "3px solid hsl(var(--gold)/0.6)" : undefined,
                            outlineOffset: isSelected ? "-3px" : undefined,
                          }}
                        >
                          <span className="text-sm sm:text-lg font-bold rounded-2xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center font-body mb-2"
                            style={isToday
                              ? { background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }
                              : { color: "hsl(var(--foreground))" }}>
                            {date.day}
                          </span>
                          {main && isCurrentMonth && (
                            <span className="mt-1 space-y-2 block">
                              <span className={`block h-1 w-full rounded-full ${DOT[color] || "bg-slate-400"}`} aria-hidden="true" />
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
              )}

              {/* LIST VIEW (mobile default) */}
              {viewMode === "list" && (
                <div className="divide-y divide-border/30" role="list" aria-label={`Dias de ${monthLabel}`}>
                  {listDays.map((date) => {
                    const dateStr = date.toISODate()!;
                    const ld = initialCalendar[dateStr] || [];
                    const main = ld[0];
                    const isSelected = selectedDay === dateStr;
                    const isToday = mounted ? date.hasSame(DateTime.now(), "day") : false;
                    const isSunday = date.weekday === 7;
                    const color = main?.colors?.[0] || "GOLD";
                    const weekday = date.toFormat("EEE", { locale: "pt-BR" });

                    return (
                      <motion.button key={dateStr} role="listitem"
                        whileTap={{ scale: 0.98 }}
                        onClick={() => { if (main) selectDay(dateStr); }}
                        aria-label={`${date.toFormat("EEEE, dd 'de' MMMM", { locale: "pt-BR" })}${main ? ": " + main.name : ""}`}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
                        style={{
                          background: isSelected ? "hsl(var(--gold)/0.07)" : undefined,
                          borderLeft: isSelected
                            ? "3px solid hsl(var(--gold))"
                            : "3px solid transparent",
                        }}
                      >
                        {/* Day number */}
                        <span className="flex flex-col items-center w-12 shrink-0">
                          <span className={`text-[9px] font-bold font-body uppercase tracking-wider mb-0.5 ${isSunday ? "text-red-400" : "text-muted-foreground/60"}`}>
                            {weekday}
                          </span>
                          <span
                            className="text-lg font-bold font-body rounded-2xl w-10 h-10 flex items-center justify-center transition-all"
                            style={mounted && isToday
                              ? { background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))", boxShadow: "0 4px 12px hsl(var(--primary)/0.3)" }
                              : isSunday
                                ? { color: "hsl(0,60%,60%)", background: "hsl(0,60%,60%,0.05)" }
                                : { color: "hsl(var(--foreground))", background: "hsl(var(--secondary)/0.3)" }}
                          >
                            {date.day}
                          </span>
                        </span>

                        {/* Color dot */}
                        {main ? dot(color) : <span className="block w-1.5 shrink-0" />}

                        {/* Name + rank */}
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

                        {main && (
                          <ChevronRight size={13} className="text-muted-foreground/25 shrink-0" aria-hidden="true" />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* ── Desktop sidebar ── */}
          <div className="hidden md:block space-y-5">
            <AnimatePresence mode="wait">
              {selectedData && selectedDay ? (
                <motion.div key={selectedDay}
                  initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }} className="space-y-5"
                >
                  <div className="border border-border rounded-2xl overflow-hidden shadow-lg"
                    style={{ background: "hsl(var(--card))" }}>
                    {/* Color top */}
                    <div className="p-6"
                      style={{ background: BADGE_BG[selectedData[0].colors[0]] || "hsl(var(--secondary))" }}>
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-xs font-bold font-body uppercase tracking-[0.2em] text-white/60">
                          {DateTime.fromISO(selectedDay).toFormat("dd 'de' MMMM", { locale: "pt-BR" })}
                        </span>
                        <CalendarIcon size={16} className="text-white/40" aria-hidden="true" />
                      </div>
                      <h3 className="font-heading text-xl font-bold text-white leading-tight">
                        {selectedData[0].name}
                      </h3>
                    </div>

                    <div className="p-8 space-y-6">
                      {[
                        { Icon: Info, label: "Grau Litúrgico", value: RANKS[selectedData[0].rank] || selectedData[0].rankName },
                        { Icon: Sparkles, label: "Tempo Litúrgico", value: selectedData[0].seasonNames?.join(", ") },
                      ].map(({ Icon, label, value }) => (
                        <div key={label} className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-inner"
                            style={{ background: "hsl(var(--secondary))", color: "hsl(var(--gold))" }}>
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

                      <div className="pt-6 border-t border-border/50">
                        <a href={`/liturgia?dia=${DateTime.fromISO(selectedDay).day}&mes=${DateTime.fromISO(selectedDay).month}&ano=${DateTime.fromISO(selectedDay).year}`}
                          className="flex items-center justify-center w-full py-4 rounded-xl font-body font-bold text-sm transition-all hover:scale-[1.02] active:scale-100 shadow-xl shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
                          Ver Leituras do Dia
                        </a>
                      </div>
                    </div>
                  </div>

                  {selectedData.length > 1 && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold font-body text-muted-foreground uppercase tracking-widest px-1">
                        Outras Memórias
                      </h4>
                      {selectedData.slice(1).map((day: LiturgicalDayData, i: number) => (
                        <div key={i} className="flex items-center gap-3 border border-border rounded-xl p-4"
                          style={{ background: "hsl(var(--card))" }}>
                          {dot(day.colors[0])}
                          <p className="text-sm font-bold font-body text-foreground">{day.name}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-12 rounded-2xl border-2 border-dashed border-border"
                  role="status">
                  <CalendarIcon size={36} className="text-muted-foreground/20 mb-3" aria-hidden="true" />
                  <p className="text-sm text-muted-foreground font-body">
                    Selecione um dia para ver os detalhes litúrgicos.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile bottom sheet */}
      <AnimatePresence>
        {selectedData && selectedDay && (
          <>
            <Backdrop onClick={() => setSelectedDay(null)} />
            <DaySheet
              selectedDay={selectedDay}
              selectedData={selectedData}
              onClose={() => setSelectedDay(null)}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
}