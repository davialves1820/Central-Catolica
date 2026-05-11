import { type ReactNode } from "react";

export interface PropsCardInfo {
  index: number;
  icon: ReactNode;
  accentColor: string;
  title: string;
  children: ReactNode;
  note?: string;
}

export interface PropsLinhaHorario {
  day: string;
  times: string[];
}
