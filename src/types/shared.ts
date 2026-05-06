import { type ReactNode } from "react";

export interface InfoCardProps {
  index: number;
  icon: ReactNode;
  accentColor: string;
  title: string;
  children: ReactNode;
  note?: string;
}

export interface ScheduleRowProps {
  day: string;
  times: string[];
}
