import { DateTime } from "luxon";

export const DOT: Record<string, string> = {
  GREEN: "bg-emerald-500",
  PURPLE: "bg-purple-500",
  WHITE: "bg-slate-300",
  RED: "bg-red-500",
  ROSE: "bg-pink-400",
  GOLD: "bg-amber-400",
  BLACK: "bg-slate-600",
  VERDE: "bg-emerald-500",
  ROXO: "bg-purple-500",
  BRANCO: "bg-slate-300",
  VERMELHO: "bg-red-500",
  ROSA: "bg-pink-400",
};

export const BADGE_BG: Record<string, string> = {
  GREEN: "hsl(142,55%,25%)",
  PURPLE: "hsl(270,45%,28%)",
  WHITE: "hsl(220,12%,45%)",
  RED: "hsl(0,58%,28%)",
  ROSE: "hsl(330,52%,32%)",
  GOLD: "hsl(42,75%,32%)",
  BLACK: "hsl(220,12%,16%)",
  VERDE: "hsl(142,55%,25%)",
  ROXO: "hsl(270,45%,28%)",
  BRANCO: "hsl(220,12%,45%)",
  VERMELHO: "hsl(0,58%,28%)",
  ROSA: "hsl(330,52%,32%)",
};

export const RANKS: Record<string, string> = {
  SOLEMNITY: "Solenidade",
  SUNDAY: "Domingo",
  FEAST: "Festa",
  MEMORIAL: "Memória",
  OPTIONAL_MEMORIAL: "Memória Opcional",
  WEEKDAY: "Féria",
};

export const getDot = (color: string) => {
  return `block w-1.5 h-1.5 rounded-full shrink-0 ${DOT[color] || "bg-slate-400"}`;
};

export interface LiturgicalDayData {
  key: string;
  name: string;
  rank: string;
  rankName: string;
  colors: string[];
  colorNames: string[];
  seasons: string[];
  seasonNames: string[];
}

export interface JsonDayEntry {
  nome: string;
  cor: string;
  rank: string;
  temporada: string;
}

export type ViewMode = "grid" | "list";

export interface CalendarioState {
  /* current state */
  currentDate: DateTime;
  selectedDay: string | null;
  viewMode: ViewMode;
  isMounted: boolean;

  /* derived */
  monthLabel: string;
  daysInMonth: { date: DateTime; isCurrentMonth: boolean }[];
  listDays: DateTime[];
  selectedData: LiturgicalDayData[] | null;

  /* actions */
  goToPrev: () => void;
  goToNext: () => void;
  goToToday: () => void;
  selectDay: (dateStr: string) => void;
  clearDay: () => void;
  setViewMode: (m: ViewMode) => void;
}

export interface DayCell {
  date: DateTime;
  isCurrentMonth: boolean;
}

export interface DaySidebarProps {
  selectedDay: string | null;
  selectedData: LiturgicalDayData[] | null;
}

export interface DaySheetProps {
  selectedDay: string | null;
  selectedData: LiturgicalDayData[] | null;
  onClose: () => void;
}

export interface ColorDotProps {
  color: string;
  className?: string;
}

export interface CalendarioViewProps {
  initialCalendar: Record<string, LiturgicalDayData[]>;
}

export interface CalendarioListViewProps {
  days: DateTime[];
  calendar: Record<string, LiturgicalDayData[]>;
  selectedDay: string | null;
  isMounted: boolean;
  monthLabel: string;
  onSelectDay: (dateStr: string) => void;
}

export interface CalendarioHeaderProps {
  monthLabel: string;
  viewMode: ViewMode;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  onViewMode: (m: ViewMode) => void;
}

export interface CalendarioGridViewProps {
  days: DayCell[];
  calendar: Record<string, LiturgicalDayData[]>;
  selectedDay: string | null;
  isMounted: boolean;
  monthLabel: string;
  onSelectDay: (dateStr: string) => void;
}