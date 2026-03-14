import { pastorais } from "@/components/pastorais/constants";
import PastoralDetails from "@/components/pastorais/PastoralDetails";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pastoral = pastorais.find((p) => p.id === slug);

  if (!pastoral) {
    return { title: "Pastoral não encontrada" };
  }

  return {
    title: `${pastoral.name} | Paróquia Santo Menino Jesus de Praga`,
    description: pastoral.description,
  };
}

export default async function PastoralPage({ params }: PageProps) {
  const { slug } = await params;
  const pastoral = pastorais.find((p) => p.id === slug);

  if (!pastoral) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="grow py-12 md:py-20">
        <div className="container mx-auto px-4">
          <PastoralDetails slug={slug} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
