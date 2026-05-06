"use client";

import { useState, useMemo, useEffect } from "react";
import { DateTime } from "luxon";
import { type CalendarioState, type ViewMode, type LiturgicalDayData } from "@/types/calendar";

export function useCalendario(initialCalendar: Record<string, LiturgicalDayData[]>,): CalendarioState {
  const [isMounted, setIsMounted] = useState(false);
  const [currentDate, setCurrentDate] = useState(() => DateTime.now().startOf("month"));
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const syncMode = () => setViewMode(media.matches ? "grid" : "list");

    const handle = requestAnimationFrame(() => {
      setIsMounted(true);
      setCurrentDate(DateTime.now());
      syncMode();
    });

    media.addEventListener("change", syncMode);
    return () => {
      cancelAnimationFrame(handle);
      media.removeEventListener("change", syncMode);
    };
  }, []);

  const monthLabel = currentDate.toFormat("MMMM yyyy", { locale: "pt-BR" });

  const daysInMonth = useMemo(() => {
    const start = currentDate.startOf("month");
    const startPadding = start.weekday === 7 ? 0 : start.weekday;
    const days: { date: DateTime; isCurrentMonth: boolean }[] = [];

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
    return Array.from({ length: start.daysInMonth! }, (_, i) =>
      start.plus({ days: i }),
    );
  }, [currentDate]);

  const selectedData = selectedDay ? (initialCalendar[selectedDay] ?? null) : null;

  const goToPrev = () => setCurrentDate((d) => d.minus({ months: 1 }));
  const goToNext = () => setCurrentDate((d) => d.plus({ months: 1 }));
  const goToToday = () => {
    const today = DateTime.now();
    setCurrentDate(today);
    setSelectedDay(today.toISODate());
  };
  const selectDay = (dateStr: string) => {
    if (initialCalendar[dateStr]) {
      setSelectedDay(dateStr);
    }
  };
  const clearDay = () => setSelectedDay(null);

  return {
    currentDate,
    selectedDay,
    viewMode,
    isMounted,
    monthLabel,
    daysInMonth,
    listDays,
    selectedData,
    goToPrev,
    goToNext,
    goToToday,
    selectDay,
    clearDay,
    setViewMode,
  };
}