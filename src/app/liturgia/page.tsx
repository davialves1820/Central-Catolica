import { getLiturgiaDiaria } from "../../lib/server/services/liturgia";
import LiturgiaView from "../../components/liturgia/LiturgiaView";
import { LiturgiaSkeleton } from "@/components/ui/skeletons";
import { Metadata } from "next";
import DateSelector from "../../components/liturgia/DateSelector";
import { Suspense } from "react";
import { type PropsPaginaLiturgia } from "@/types/liturgia";

export const metadata: Metadata = {
  title: "Liturgia Diária",
  description: "Acompanhe a liturgia diária da Igreja Católica.",
};

export const revalidate = 3600;

async function LiturgiaContent({ dia, mes, ano }: { dia?: string; mes?: string; ano?: string }) {
  const liturgia = await getLiturgiaDiaria(dia, mes, ano);

  if (!liturgia) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h2 className="font-heading text-4xl font-medium text-foreground mb-4">
          Ops! Não conseguimos carregar a liturgia.
        </h2>
        <p className="text-muted-foreground font-body max-w-md mb-10">
          Houve um problema ao buscar os dados da liturgia. Por favor, tente novamente em instantes.
        </p>
        <a href="/liturgia"
          className="px-8 py-4 rounded-xl font-body font-bold text-[10px] uppercase tracking-widest transition-all bg-foreground text-background hover:bg-primary shadow-xl shadow-foreground/10 hover:shadow-primary/20">
          Tentar Novamente
        </a>
      </div>
    );
  }

  return <LiturgiaView liturgia={liturgia} />;
}

export default async function LiturgiaPage({ searchParams }: PropsPaginaLiturgia) {
  const { dia, mes, ano } = await searchParams;

  const dateForSelector =
    dia && mes && ano ? `${ano}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`
      : new Date(new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })).toISOString().split("T")[0];

  return (
    <div className="flex flex-col bg-background min-h-screen">
      <main className="flex-1">
        <DateSelector
          dataInicial={dateForSelector}
          parametrosAtuais={{ dia, mes, ano }}
        />

        <Suspense fallback={<LiturgiaSkeleton />}>
          <LiturgiaContent dia={dia} mes={mes} ano={ano} />
        </Suspense>
      </main>
    </div>
  );
}