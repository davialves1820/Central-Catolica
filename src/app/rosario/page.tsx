import { Metadata } from "next";
import { RosarioApp } from "@/components/rosario/RosarioApp";

export const metadata: Metadata = {
  title: "Santo Rosário Interativo",
  description:
    "Reze o Santo Rosário de forma visual e interativa: toque em cada conta, acompanhe os mistérios gozosos, dolorosos, gloriosos e luminosos, e siga seu progresso em tempo real.",
};

export default function PaginaRosario() {
  return <RosarioApp />;
}
