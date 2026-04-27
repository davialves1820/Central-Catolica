import { getLiturgiaDiaria } from "../../lib/server/services/liturgia";
import LiturgiaView from "../../components/liturgia/LiturgiaView";
import Header from "../../components/shared/Header";
import Footer from "../../components/shared/Footer";
import { Metadata } from "next";
import DateSelector from "../../components/liturgia/DateSelector";

export const metadata: Metadata = {
  title: "Liturgia Diária | Menino Jesus de Praga",
  description: "Acompanhe a liturgia diária da Igreja Católica.",
};

interface PageProps {
  searchParams: Promise<{ dia?: string; mes?: string; ano?: string }>;
}

export default async function LiturgiaPage({ searchParams }: PageProps) {
  const { dia, mes, ano } = await searchParams;
  const liturgia = await getLiturgiaDiaria(dia, mes, ano);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="grow">
        <DateSelector 
          initialDate={liturgia?.data} 
          currentParams={{ dia, mes, ano }}
        />
        {liturgia ? (
          <LiturgiaView liturgia={liturgia} />
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <h2 className="text-3xl font-heading font-bold text-primary mb-4">
              Ops! Não conseguimos carregar a liturgia.
            </h2>
            <p className="text-muted-foreground font-body max-w-md">
              Houve um problema ao buscar os dados da liturgia de hoje. Por favor, tente novamente em instantes.
            </p>
            <a 
              href="/liturgia"
              className="mt-8 px-6 py-2 bg-primary text-white rounded-full font-bold hover:bg-accent transition-colors"
            >
              Tentar Novamente
            </a>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
