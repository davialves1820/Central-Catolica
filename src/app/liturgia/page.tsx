import { getLiturgiaDiaria } from "../../lib/server/services/liturgia";
import LiturgiaView from "../../components/liturgia/LiturgiaView";
import Header from "../../components/shared/Header";
import { LiturgiaSkeleton } from "@/components/ui/skeletons";
import { Metadata } from "next";
import DateSelector from "../../components/liturgia/DateSelector";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Liturgia Diária",
  description: "Acompanhe a liturgia diária da Igreja Católica.",
};

export const revalidate = 3600;

interface PageProps {
  searchParams: Promise<{ dia?: string; mes?: string; ano?: string }>;
}

async function LiturgiaContent({ dia, mes, ano }: { dia?: string; mes?: string; ano?: string }) {
  const liturgia = await getLiturgiaDiaria(dia, mes, ano);

  if (!liturgia) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
          Ops! Não conseguimos carregar a liturgia.
        </h2>
        <p className="text-muted-foreground font-body max-w-md mb-8">
          Houve um problema ao buscar os dados da liturgia. Por favor, tente novamente em instantes.
        </p>
        <a href="/liturgia"
          className="px-6 py-3 rounded-lg font-body font-bold text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
          Tentar Novamente
        </a>
      </div>
    );
  }

  return <LiturgiaView liturgia={liturgia} />;
}

export default async function LiturgiaPage({ searchParams }: PageProps) {
  const { dia, mes, ano } = await searchParams;

  const dateForSelector =
    dia && mes && ano
      ? `${ano}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`
      : new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero strip */}
        <div className="border-b border-border" style={{ background: "hsl(var(--secondary))" }}>
          <div className="container mx-auto px-4 pt-14 pb-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-4" aria-hidden="true">
              <div className="h-px w-10" style={{ background: "hsl(var(--gold)/0.4)" }} />
              <span className="text-xs font-body font-bold uppercase tracking-[0.25em]"
                style={{ color: "hsl(var(--gold))" }}>Liturgia Diária</span>
              <div className="h-px w-10" style={{ background: "hsl(var(--gold)/0.4)" }} />
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
              A Palavra de Deus
            </h1>
            <p className="font-body text-sm text-muted-foreground mb-6">
              Leituras, salmo e evangelho de cada dia da Igreja Católica
            </p>
          </div>
          <DateSelector
            initialDate={dateForSelector}
            currentParams={{ dia, mes, ano }}
          />
        </div>

        <Suspense fallback={<LiturgiaSkeleton />}>
          <LiturgiaContent dia={dia} mes={mes} ano={ano} />
        </Suspense>
      </main>
    </div>
  );
}