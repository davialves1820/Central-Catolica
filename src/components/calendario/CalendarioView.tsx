"use client";

import { type CalendarioViewProps } from "@/types/calendar";
import { useCalendario } from "../../lib/client/hooks/calendar/useCalendario";
import CalendarioHeader from "./CalendarioHeader";
import CalendarioGridView from "./CalendarioGridView";
import CalendarioListView from "./CalendarioListView";
import DaySidebar from "./DaySidebar";
import DaySheet from "./DaySheet";

export default function CalendarioView({ initialCalendar }: CalendarioViewProps) {
  const cal = useCalendario(initialCalendar);

  /* Avoid hydration mismatch — render nothing until client mounts */
  if (!cal.isMounted) return null;

  return (
    <>
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 py-4 sm:py-10">
        <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-10">

          {/* ── Calendar column ── */}
          <div className="md:col-span-2 xl:col-span-3">
            <div
              className="overflow-hidden border border-border rounded-2xl shadow-lg"
              style={{ background: "hsl(var(--card))" }}
            >
              <CalendarioHeader
                monthLabel={cal.monthLabel}
                viewMode={cal.viewMode}
                onViewMode={cal.setViewMode}
                onPrev={cal.goToPrev}
                onNext={cal.goToNext}
                onToday={cal.goToToday}
              />

              {cal.viewMode === "grid" ? (
                <CalendarioGridView
                  days={cal.daysInMonth}
                  calendar={initialCalendar}
                  selectedDay={cal.selectedDay}
                  isMounted={cal.isMounted}
                  monthLabel={cal.monthLabel}
                  onSelectDay={cal.selectDay}
                />
              ) : (
                <CalendarioListView
                  days={cal.listDays}
                  calendar={initialCalendar}
                  selectedDay={cal.selectedDay}
                  isMounted={cal.isMounted}
                  monthLabel={cal.monthLabel}
                  onSelectDay={cal.selectDay}
                />
              )}
            </div>
          </div>

          {/* ── Desktop sidebar ── */}
          <DaySidebar
            selectedDay={cal.selectedDay}
            selectedData={cal.selectedData}
          />
        </div>
      </div>

      {/* ── Mobile bottom sheet ── */}
      <DaySheet
        selectedDay={cal.selectedDay}
        selectedData={cal.selectedData}
        onClose={cal.clearDay}
      />
    </>
  );
}
