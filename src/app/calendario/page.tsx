import CalendarioView from "@/components/calendario/CalendarioView";
import Header from "@/components/shared/Header";
import { CalendarioSkeleton } from "@/components/ui/skeletons";
import { Metadata } from "next";
import { Suspense } from "react";
import path from "path";
import fs from "fs";

export const metadata: Metadata = {
  title: "Calendário Litúrgico",
  description:
    "Consulte as datas, festas e memórias do calendário litúrgico católico.",
};

export const revalidate = 3600;

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

interface JsonDayEntry {
  nome: string;
  cor: string;
  rank: string;
  temporada: string;
}

async function CalendarioContent() {
  const initialCalendar: Record<string, LiturgicalDayData[]> = {};

  try {
    const jsonPath = path.join(process.cwd(), "data", "calendario2026.json");
    const raw = fs.readFileSync(jsonPath, "utf8");
    const jsonData: Record<string, JsonDayEntry[]> = JSON.parse(raw);

    for (const [dateStr, entries] of Object.entries(jsonData)) {
      initialCalendar[dateStr] = entries.map((entry) => ({
        key: entry.nome.toLowerCase().replace(/[^a-z0-9]/g, "_"),
        name: entry.nome,
        rank: entry.rank,
        rankName: entry.rank,
        colors: [entry.cor],
        colorNames: [entry.cor],
        seasons: [entry.temporada],
        seasonNames: [entry.temporada],
      }));
    }
  } catch (error) {
    console.error("Error reading calendar JSON:", error);
  }

  return <CalendarioView initialCalendar={initialCalendar} />;
}

export default function CalendarioPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <div
          className="relative border-b border-border py-10 sm:py-16 md:py-20 overflow-hidden"
          style={{ background: "hsl(var(--secondary))" }}
        >
          {/* Grid ornamental */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            aria-hidden="true"
            style={{
              backgroundImage: `
                repeating-linear-gradient(0deg,  transparent, transparent 47px, hsl(var(--gold)) 47px, hsl(var(--gold)) 48px),
                repeating-linear-gradient(90deg, transparent, transparent 47px, hsl(var(--gold)) 47px, hsl(var(--gold)) 48px)
              `,
            }}
          />
          <div className="relative container mx-auto px-4 sm:px-6 text-center">
            {/* Anno Domini badge */}
            <div
              className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-5"
              aria-hidden="true"
            >
              <div
                className="h-px w-6 sm:w-10"
                style={{ background: "hsl(var(--gold)/0.4)" }}
              />
              <span
                className="text-[10px] sm:text-xs font-body font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em]"
                style={{ color: "hsl(var(--gold))" }}
              >
                Anno Domini
              </span>
              <div
                className="h-px w-6 sm:w-10"
                style={{ background: "hsl(var(--gold)/0.4)" }}
              />
            </div>

            {/* Title */}
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 leading-tight">
              Calendário Litúrgico
            </h1>

            {/* Subtitle */}
            <p className="font-body text-sm sm:text-base text-muted-foreground max-w-xs sm:max-w-xl mx-auto leading-relaxed">
              Solenidades, festas, memórias e tempos que marcam o ritmo da fé
              ao longo do ano.
            </p>
          </div>
        </div>

        <Suspense fallback={<CalendarioSkeleton />}>
          <CalendarioContent />
        </Suspense>
      </main>
    </div>
  );
}