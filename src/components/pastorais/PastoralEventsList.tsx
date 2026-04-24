"use client";

import { motion } from "framer-motion";
import { MapPin, CheckCircle2, ArrowRight } from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";

interface Event {
  id: string;
  title: string;
  image_url?: string | null;
  start_date?: string | null;
  meeting_location?: string | null;
}

export default function PastoralEventsList({ events }: { events: Event[] }) {
  if (events.length === 0) return null;

  return (
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
        {events.map((event) => (
          <motion.div
            key={event.id}
            whileHover={{ y: -5 }}
            className="bg-white rounded-4xl p-5 border border-primary/10 shadow-lg shadow-primary/5 flex items-center gap-5 group"
          >
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
  );
}
