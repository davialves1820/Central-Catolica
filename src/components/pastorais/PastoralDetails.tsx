"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Mail,
  Instagram,
  Church,
  Users,
  ArrowRight,
  Edit,
  Plus,
  CheckCircle2,
} from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import api from "@/lib/client/api";

interface Coordinator {
  name: string;
  email?: string;
}

interface Event {
  id: string;
  title: string;
  image_url?: string;
  start_date?: string;
  meeting_location?: string;
}

interface Pastoral {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url?: string;
  instagram?: string;
  meeting_location?: string;
  coordinatorIds?: string[];
  coordinators?: Coordinator[];
  events?: Event[];
}

interface PastoralDetailsProps {
  slug: string;
}

const PastoralDetails = ({ slug }: PastoralDetailsProps) => {
  const { data: session, status } = useSession();
  const [pastoral, setPastoral] = useState<Pastoral | null>(null);
  const [suggestedPastorals, setSuggestedPastorals] = useState<Pastoral[]>([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = status === "authenticated" && session?.user?.role === "ADMIN";
  const isCoordinator =
    status === "authenticated" &&
    pastoral?.coordinatorIds?.includes(session?.user?.id);
  const canEdit = isAdmin || isCoordinator;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [pastoralRes, allRes] = await Promise.all([
          api.get(`/pastorals/${slug}`),
          api.get("/pastorals"),
        ]);

        setPastoral(pastoralRes.data);

        // Suggested pastorals (random 3 excluding current)
        const others = allRes.data.filter((p: Pastoral) => p.slug !== slug);
        setSuggestedPastorals(
          others.sort(() => 0.5 - Math.random()).slice(0, 3),
        );
      } catch (error) {
        console.error("Error fetching pastoral details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-6">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
          <div className="absolute inset-0 border-4 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
        <p className="font-body text-muted-foreground animate-pulse text-lg">
          Carregando detalhes...
        </p>
      </div>
    );
  }

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

  return (
    <div className="max-w-6xl mx-auto">
      {/* New Top Section: Photo + Vital Info */}
      <div className="grid md:grid-cols-12 gap-8 md:gap-12 mb-12 md:mb-20 px-4 pt-4 md:pt-12 items-center">
        {/* Left Col: Photo - Limited size */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="col-span-12 md:col-span-5 relative aspect-square md:aspect-4/5 md:max-h-[500px] rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-2xl bg-pearl border border-primary/5"
        >
          {pastoral.image_url ? (
            <NextImage
              src={pastoral.image_url}
              alt={pastoral.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-linear-to-br from-primary via-primary/80 to-primary/40 opacity-40 flex items-center justify-center">
              <Church size={120} className="text-white/20" />
            </div>
          )}
          {/* Subtle gradient for depth */}
          <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
        </motion.div>

        {/* Right Col: Info - More space */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="col-span-12 md:col-span-7 flex flex-col gap-8"
        >
          <div className="space-y-4">
            <Link
              href="/pastorais"
              className="inline-flex items-center gap-2 text-primary text-[10px] md:text-xs font-bold uppercase tracking-widest hover:text-accent transition-all group mb-2 md:mb-4"
            >
              <ArrowLeft
                size={14}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Voltar para Pastorais
            </Link>
            <h1 className="font-heading text-3xl md:text-6xl font-bold text-foreground leading-tight">
              {pastoral.name}
            </h1>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 rounded-full bg-accent text-[10px] font-bold text-accent-foreground uppercase tracking-widest">
                Pastoral Paroquial
              </span>
              {pastoral.instagram && (
                <a
                  href={`https://instagram.com/${pastoral.instagram.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground text-sm font-bold hover:text-primary transition-all font-body"
                >
                  <Instagram size={16} className="text-accent" />{" "}
                  {pastoral.instagram}
                </a>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* Coordination Recap */}
            {pastoral.coordinators && pastoral.coordinators.length > 0 && (
              <div className="bg-white p-6 rounded-3xl border border-primary/10 shadow-lg shadow-primary/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Users size={16} className="text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground">Coordenação</h3>
                </div>
                <div className="space-y-3">
                  {pastoral.coordinators.slice(0, 2).map((coord: Coordinator, idx: number) => (
                    <div key={idx} className="space-y-1">
                      <p className="font-body text-sm font-bold text-foreground/80 leading-none">
                        {coord.name}
                      </p>
                      {coord.email && (
                        <a
                          href={`mailto:${coord.email}`}
                          className="font-body text-xs text-primary hover:text-accent transition-colors flex items-center gap-1.5"
                        >
                          <Mail size={12} />
                          {coord.email}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location Recap */}
            {pastoral.meeting_location && (
              <div className="bg-white p-6 rounded-3xl border border-primary/10 shadow-lg shadow-primary/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <MapPin size={16} className="text-accent" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground">
                    Encontros
                  </h3>
                </div>
                <p className="font-body text-sm text-muted-foreground italic">
                  {pastoral.meeting_location}
                </p>
              </div>
            )}
          </div>

          {canEdit && (
            <div className="flex flex-wrap gap-4 pt-4 border-t border-border/50">
              <Link
                href={`/pastorais/${pastoral.slug}/events/new`}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-white hover:bg-accent font-body font-bold transition-all shadow-lg shadow-primary/10"
              >
                <Plus size={18} /> Novo Evento
              </Link>
              <Link
                href={`/pastorais/${pastoral.slug}/edit`}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-primary/20 text-primary hover:bg-primary hover:text-white font-body font-bold transition-all"
              >
                <Edit size={18} /> Editar
              </Link>
            </div>
          )}
        </motion.div>
      </div>

      <hr className="border-border/40 mx-4 mb-12 md:mb-20" />

      {/* Full Width About Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 md:mb-24 px-4"
      >
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
      </motion.section>

      <hr className="border-border/40 mb-12 md:mb-20 px-4" />

      {/* Latest Events Section - Full Width for better alignment */}
      {pastoral.events && pastoral.events.length > 0 && (
        <section className="mb-12 md:mb-24 px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <CheckCircle2 size={24} className="text-primary" />
              </div>
              <div>
                <h2 className="font-heading text-3xl font-bold text-foreground mb-1">
                  Últimos Eventos
                </h2>
                <div className="w-12 h-1 bg-accent rounded-full" />
              </div>
            </div>
            <Link
              href="/eventos"
              className="text-primary hover:text-accent font-bold font-body transition-colors flex items-center justify-center md:justify-start gap-2 group"
            >
              Ver todos os eventos
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastoral.events.map((event: Event) => (
              <motion.div
                key={event.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-4xl p-5 border border-primary/10 shadow-lg shadow-primary/5 flex items-center gap-5 group"
              >
                {/* Event Image / Thumbnail */}
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-3xl overflow-hidden shrink-0 bg-pearl relative border border-primary/5">
                  {event.image_url ? (
                    <NextImage
                      src={event.image_url}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-primary/20">
                      <CheckCircle2 size={32} />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0 space-y-2">
                  <div className="space-y-1">
                    <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors leading-tight truncate">
                      {event.title}
                    </h3>
                    {event.start_date && (
                      <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-body">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        {new Date(event.start_date).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "short",
                        })}
                      </div>
                    )}
                  </div>

                  {event.meeting_location && (
                    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-body truncate">
                      <MapPin size={12} className="text-accent shrink-0" />
                      <span className="truncate">
                        {event.meeting_location}
                      </span>
                    </div>
                  )}
                </div>

                <div className="w-10 h-10 rounded-2xl bg-pearl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                  <ArrowRight size={18} />
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      <hr className="border-border/40 mb-20 px-4" />

      {/* Suggested Pastorals */}
      {suggestedPastorals.length > 0 && (
        <section className="mb-12 md:mb-24 px-4 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3">
                Descubra Mais
              </h2>
              <div className="w-16 h-1 bg-accent rounded-full mx-auto md:mx-0" />
            </div>
            <Link
              href="/pastorais"
              className="text-primary hover:text-accent font-bold font-body transition-colors flex items-center justify-center md:justify-start gap-2 group"
            >
              Ver todas
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {suggestedPastorals.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  href={`/pastorais/${p.slug}`}
                  className="group relative block aspect-4/3 rounded-3xl md:rounded-4xl overflow-hidden shadow-xl border border-primary/5 hover:shadow-primary/10 hover:border-primary/20 transition-all bg-white"
                >
                  {p.image_url ? (
                    <NextImage
                      src={p.image_url}
                      alt={p.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/5 flex items-center justify-center">
                      <Church size={48} className="text-primary/10" />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-primary/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                    <span className="inline-block px-3 py-1 rounded-full bg-accent text-[10px] font-bold text-accent-foreground uppercase tracking-widest mb-3">
                      Conhecer
                    </span>
                    <h3 className="font-heading font-bold text-white text-xl leading-tight group-hover:text-accent transition-colors">
                      {p.name}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default PastoralDetails;
