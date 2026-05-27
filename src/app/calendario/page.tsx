import CalendarioView from "@/components/calendario/CalendarioView";
import { CalendarioSkeleton } from "@/components/ui/skeletons";
import { Suspense } from "react";
import path from "path";
import fs from "fs/promises";

import { type DadosDiaLiturgico, type EntradaDiaJson } from "@/types/calendario";

async function CalendarioContent() {
  const calendarioInicial: Record<string, DadosDiaLiturgico[]> = {};

  try {
    const jsonPath = path.join(process.cwd(), "data", "calendario2026.json");
    const raw = await fs.readFile(jsonPath, "utf8");
    const jsonData: Record<string, EntradaDiaJson[]> = JSON.parse(raw);

    for (const [dateStr, entries] of Object.entries(jsonData)) {
      calendarioInicial[dateStr] = entries.map((entry) => ({
        chave: entry.nome.toLowerCase().replace(/[^a-z0-9]/g, "_"),
        nome: entry.nome,
        rank: entry.rank,
        nomeRank: entry.rank,
        cores: [entry.cor],
        nomesCores: [entry.cor],
        temporadas: [entry.temporada],
        nomesTemporadas: [entry.temporada],
      }));
    }
  } catch (error) {
    console.error("[calendario] Erro ao ler JSON:", error);
  }

  return <CalendarioView calendarioInicial={calendarioInicial} />;
}

export default function CalendarioPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1">
        <div className="relative border-b border-border py-10 sm:py-16 md:py-20 overflow-hidden">
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
            <h1 className="font-headline-xl text-primary mb-8 tracking-tighter">
              Calendário Litúrgico
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed opacity-80">
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