import CalendarioView from "@/components/calendario/CalendarioView";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Metadata } from "next";
import path from "path";
import fs from "fs";

export const metadata: Metadata = {
  title: "Calendário Litúrgico | Menino Jesus de Praga",
  description: "Consulte as datas, festas e memórias do calendário litúrgico católico.",
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

// JSON entry type from calendario2026.json
interface JsonDayEntry {
  nome: string;
  cor: string;
  rank: string;
  temporada: string;
}

export default async function CalendarioPage() {
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

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="grow">
        {/* Hero Section */}
        <div className="bg-primary pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4">
              Calendário Litúrgico
            </h1>
            <p className="text-white/70 font-body text-lg max-w-2xl mx-auto">
              Acompanhe os tempos, festas e memórias que marcam o ritmo da nossa fé ao longo do ano.
            </p>
          </div>
        </div>

        <CalendarioView initialCalendar={initialCalendar} />
      </main>

      <Footer />
    </div>
  );
}
