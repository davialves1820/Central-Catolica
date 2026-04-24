import { prisma } from "@/lib/server/db";
import FeaturedEventsList from "./FeaturedEventsList";

const FeaturedEvents = async () => {
  const now = new Date();
  const eventsRaw = await prisma.events.findMany({
    where: {
      is_active: true,
      OR: [{ start_date: null }, { start_date: { lte: now } }],
      AND: [
        {
          OR: [{ end_date: null }, { end_date: { gte: now } }],
        },
      ],
    },
    include: {
      pastoral: {
        select: { name: true, slug: true },
      },
    },
    orderBy: { created_at: "desc" },
    take: 3,
  });

  // Serialize dates for Client Component
  const events = eventsRaw.map(event => ({
    ...event,
    start_date: event.start_date?.toISOString() || null,
    end_date: event.end_date?.toISOString() || null,
    created_at: event.created_at.toISOString(),
    updated_at: event.updated_at.toISOString(),
  }));

  if (events.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-2">
              Próximos Eventos e Notícias
            </h2>
            <p className="font-body text-muted-foreground">
              Fique por dentro do que está acontecendo em nossa paróquia.
            </p>
          </div>
        </div>

        <FeaturedEventsList events={events as any} />
      </div>
    </section>
  );
};

export default FeaturedEvents;
