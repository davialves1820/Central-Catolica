"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Info, 
  Sparkles
} from "lucide-react";
import { DateTime } from "luxon";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LiturgicalDayData } from "@/app/calendario/page";

// Note: We'll pass the serialized calendar data from the server
interface CalendarioViewProps {
  initialCalendar: Record<string, LiturgicalDayData[]>;
}

const LITURGICAL_COLORS: Record<string, string> = {
  // English keys (legacy)
  GREEN: "bg-green-600 text-white",
  PURPLE: "bg-purple-700 text-white",
  WHITE: "bg-slate-100 text-slate-900 border border-slate-200",
  RED: "bg-red-600 text-white",
  ROSE: "bg-pink-400 text-white",
  GOLD: "bg-yellow-500 text-white",
  BLACK: "bg-gray-900 text-white",
  // Portuguese keys (from calendario2026.json)
  VERDE: "bg-green-600 text-white",
  ROXO: "bg-purple-700 text-white",
  BRANCO: "bg-slate-100 text-slate-900 border border-slate-200",
  VERMELHO: "bg-red-600 text-white",
  ROSA: "bg-pink-400 text-white",
};

const LITURGICAL_RANKS: Record<string, string> = {
  SOLEMNITY: "Solenidade",
  SUNDAY: "Domingo",
  FEAST: "Festa",
  MEMORIAL: "Memória",
  OPTIONAL_MEMORIAL: "Memória Opcional",
  WEEKDAY: "Féria",
};

export default function CalendarioView({ initialCalendar }: CalendarioViewProps) {
  const [currentDate, setCurrentDate] = useState(DateTime.now());
  const [selectedDay, setSelectedDay] = useState<string | null>(
    DateTime.now().toISODate()
  );

  const daysInMonth = useMemo(() => {
    const start = currentDate.startOf("month");
    
    // Get padding days for the start of the week (Sunday as first day)
    const startPadding = start.weekday === 7 ? 0 : start.weekday;
    
    const days = [];
    
    // Previous month padding
    for (let i = startPadding - 1; i >= 0; i--) {
      days.push({ 
        date: start.minus({ days: i + 1 }), 
        isCurrentMonth: false 
      });
    }
    
    // Current month
    for (let i = 0; i < start.daysInMonth!; i++) {
      days.push({ 
        date: start.plus({ days: i }), 
        isCurrentMonth: true 
      });
    }
    
    return days;
  }, [currentDate]);

  const goToPreviousMonth = () => {
    setCurrentDate(currentDate.minus({ months: 1 }));
  };

  const goToNextMonth = () => {
    setCurrentDate(currentDate.plus({ months: 1 }));
  };

  const goToToday = () => {
    setCurrentDate(DateTime.now());
    setSelectedDay(DateTime.now().toISODate());
  };

  const selectedData = selectedDay ? initialCalendar[selectedDay] : null;

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Calendar Column */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden border-none shadow-2xl bg-white/80 backdrop-blur-xl rounded-3xl">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-primary/5">
              <div>
                <h2 className="text-2xl font-heading font-bold text-primary">
                  {currentDate.toFormat("MMMM yyyy", { locale: "pt-BR" })}
                </h2>
                <p className="text-sm text-muted-foreground font-body">
                  Calendário Litúrgico Romano
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button onClick={goToToday} className="rounded-full bg-white text-primary border border-slate-200 hover:bg-slate-50 px-3 py-1.5 h-auto">
                  Hoje
                </Button>
                <div className="flex bg-white rounded-full border border-slate-200 p-1">
                  <button 
                    onClick={goToPreviousMonth}
                    className="p-1.5 hover:bg-slate-50 rounded-full transition-colors"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button 
                    onClick={goToNextMonth}
                    className="p-1.5 hover:bg-slate-50 rounded-full transition-colors"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>

            <CardContent className="p-0">
              <div className="grid grid-cols-7 text-center border-b border-slate-50">
                {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
                  <div key={day} className="py-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7">
                {daysInMonth.map(({ date, isCurrentMonth }, idx) => {
                  const dateStr = date.toISODate()!;
                  const liturgicalDays = initialCalendar[dateStr] || [];
                  const mainDay = liturgicalDays[0];
                  const isSelected = selectedDay === dateStr;
                  const isToday = date.hasSame(DateTime.now(), "day");
                  
                  const mainColor = mainDay?.colors?.[0] || "GREEN";
                  const colorClass = LITURGICAL_COLORS[mainColor] || "bg-slate-100";

                  return (
                    <motion.button
                      key={dateStr}
                      whileHover={{ scale: 0.98 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedDay(dateStr)}
                      className={`
                        relative h-24 md:h-32 border-r border-b border-slate-50 p-2 text-left transition-all
                        ${!isCurrentMonth ? "bg-slate-50/50 opacity-40" : "bg-white"}
                        ${isSelected ? "ring-2 ring-inset ring-accent z-10" : ""}
                        ${idx % 7 === 6 ? "border-r-0" : ""}
                      `}
                    >
                      <span className={`
                        text-sm font-bold rounded-full w-7 h-7 flex items-center justify-center
                        ${isToday ? "bg-primary text-white" : "text-slate-600"}
                      `}>
                        {date.day}
                      </span>

                      {mainDay && isCurrentMonth && (
                        <div className="mt-2 space-y-1">
                          <div className={`h-1.5 w-full rounded-full ${colorClass.split(" ")[0]}`} />
                          <p className="text-[10px] md:text-xs leading-tight font-medium text-slate-700 line-clamp-2 md:line-clamp-3">
                            {mainDay.name}
                          </p>
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {selectedData ? (
              <motion.div
                key={selectedDay}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <Card className="border-none shadow-xl rounded-3xl overflow-hidden bg-white/90 backdrop-blur-md">
                  <div className={`p-8 ${LITURGICAL_COLORS[selectedData[0].colors[0]] || "bg-primary"}`}>
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-sm font-bold uppercase tracking-[0.2em] opacity-80">
                        {DateTime.fromISO(selectedDay!).toFormat("dd 'de' MMMM", { locale: "pt-BR" })}
                      </span>
                      <CalendarIcon size={20} className="opacity-60" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold leading-tight">
                      {selectedData[0].name}
                    </h3>
                  </div>
                  
                  <CardContent className="p-8 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-primary">
                        <Info size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Grau Litúrgico</p>
                        <p className="font-bold text-slate-800">{LITURGICAL_RANKS[selectedData[0].rank] || selectedData[0].rankName}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-primary">
                        <Sparkles size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Tempo Litúrgico</p>
                        <p className="font-bold text-slate-800">{selectedData[0].seasonNames?.join(", ")}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                      <a 
                        href={`/liturgia?dia=${DateTime.fromISO(selectedDay!).day}&mes=${DateTime.fromISO(selectedDay!).month}&ano=${DateTime.fromISO(selectedDay!).year}`}
                        className="inline-flex items-center justify-center whitespace-nowrap text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 w-full rounded-full py-6 text-base font-bold shadow-lg shadow-primary/20"
                      >
                        Ver Leituras do Dia
                      </a>
                    </div>
                  </CardContent>
                </Card>

                {/* Optional Celebrations */}
                {selectedData.length > 1 && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest px-2">Outras Memórias</h4>
                    {selectedData.slice(1).map((day: LiturgicalDayData, i: number) => (
                      <Card key={i} className="border border-slate-100 bg-white/50 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full shrink-0 ${LITURGICAL_COLORS[day.colors[0]]?.split(" ")[0] || "bg-slate-300"}`} />
                        <p className="text-sm font-bold text-slate-700">{day.name}</p>
                      </Card>
                    ))}
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                <CalendarIcon size={48} className="text-slate-300 mb-4" />
                <p className="text-slate-500 font-body">Selecione um dia para ver os detalhes litúrgicos.</p>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
