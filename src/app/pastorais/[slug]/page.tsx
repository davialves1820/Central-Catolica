import PastoralDetails from "@/components/pastorais/PastoralDetails";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { prisma } from "@/lib/server/db";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const pastoral = await prisma.pastorals.findUnique({
    where: { slug },
    select: { name: true, description: true },
  });

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

  // Verify if it exists on server-side first to avoid client-side 404 lag
  const exists = await prisma.pastorals.findUnique({
    where: { slug },
    select: { id: true },
  });

  if (!exists) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
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
