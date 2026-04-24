import { Church } from "lucide-react";
import { prisma } from "@/lib/server/db";
import { auth } from "@/lib/server/auth";
import PastoralHero from "./PastoralHero";
import PastoralHeaderInfo from "./PastoralHeaderInfo";
import PastoralMetadata from "./PastoralMetadata";
import PastoralEventsList from "./PastoralEventsList";
import SuggestedPastoralsList from "./SuggestedPastoralsList";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PastoralDetailsProps {
  slug: string;
}

const PastoralDetails = async ({ slug }: PastoralDetailsProps) => {
  const session = await auth();
  
  const pastoral = await prisma.pastorals.findUnique({
    where: { slug },
    include: {
      events: {
        where: { is_active: true },
        orderBy: { start_date: "desc" },
        take: 3,
      },
      members: {
        where: { role: "COORDENADOR" },
        include: { user: { select: { full_name: true, email: true, id: true } } },
      },
    },
  });

  if (!pastoral) {
    return (
      <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-primary/20 shadow-xl shadow-primary/5">
        <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
          Pastoral não encontrada
        </h2>
        <p className="font-body text-muted-foreground mb-8">
          O grupo que você procura não foi encontrado ou foi removido.
        </p>
        <Link
          href="/pastorais"
          className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-accent transition-all shadow-lg shadow-primary/20"
        >
          <ArrowLeft size={18} /> Voltar para a lista
        </Link>
      </div>
    );
  }

  const allPastorals = await prisma.pastorals.findMany({
    where: { NOT: { slug } },
    take: 10,
  });
  const suggestedPastorals = allPastorals.sort(() => 0.5 - Math.random()).slice(0, 3);

  const coordinators = pastoral.members.map(m => ({
    id: m.user.id,
    name: m.user.full_name || "Membro",
    email: m.user.email,
  }));

  const isAdmin = session?.user?.role === "ADMIN";
  const isCoordinator = session?.user && pastoral.members.some(m => m.user_id === session.user.id);
  const canEdit = isAdmin || !!isCoordinator;

  const serializablePastoral = {
    ...pastoral,
    coordinators,
    events: pastoral.events.map(e => ({
      ...e,
      start_date: e.start_date?.toISOString() || null,
      end_date: e.end_date?.toISOString() || null,
    })),
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-12 gap-8 md:gap-12 mb-12 md:mb-20 px-4 pt-4 md:pt-12 items-center">
        <PastoralHero pastoral={serializablePastoral as any} />
        
        <div className="col-span-12 md:col-span-7 flex flex-col gap-8">
          <PastoralHeaderInfo pastoral={serializablePastoral as any} />
          <PastoralMetadata pastoral={serializablePastoral as any} canEdit={canEdit} />
        </div>
      </div>

      <hr className="border-border/40 mx-4 mb-12 md:mb-20" />

      {/* About Section */}
      <section className="mb-12 md:mb-24 px-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <Church size={20} className="text-accent" />
          </div>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            Sobre a Pastoral
          </h2>
        </div>

        <div className="bg-white p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] border border-primary/10 shadow-xl shadow-primary/5 leading-relaxed text-foreground/80 font-body text-lg md:text-xl whitespace-pre-wrap">
          {pastoral.description}
        </div>
      </section>

      <hr className="border-border/40 mb-12 md:mb-20 px-4" />

      <PastoralEventsList events={serializablePastoral.events as any} />

      <hr className="border-border/40 mb-20 px-4" />

      <SuggestedPastoralsList pastorals={suggestedPastorals as any} />
    </div>
  );
};

export default PastoralDetails;
