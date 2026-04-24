"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Calendar, ChevronRight } from "lucide-react";

export interface FeaturedEvent {
  id: string;
  title: string;
  description: string;
  image_url: string;
  start_date: string | null;
  end_date: string | null;
  type: string;
  meeting_location?: string;
  pastoral?: {
    name: string;
    slug: string;
  };
}

export default function FeaturedEventsList({ events }: { events: FeaturedEvent[] }) {
  if (events.length === 0) {
    return null;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="bg-pearl-light rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group border border-border"
        >
          <div className="relative h-48 w-full group-hover:scale-105 transition-transform duration-500">
            <Image
              src={event.image_url || "/images/church.jpg"}
              alt={event.title}
              fill
              className="object-cover"
            />
            <div className="absolute top-4 left-4 bg-accent/90 backdrop-blur-sm text-accent-foreground px-3 py-1 rounded-full text-xs font-bold font-body uppercase tracking-wider">
              {event.type === "EVENT"
                ? "Evento"
                : event.type === "NEWS"
                  ? "Notícia"
                  : event.type === "PASTORAL"
                    ? "Aviso"
                    : event.type === "REGISTRATION"
                      ? "Inscrição"
                      : event.type}
            </div>
          </div>
          <div className="p-6">
            <div className="flex flex-col gap-2 mb-3">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Calendar size={16} className="text-primary" />
                <p className="font-body">
                  {event.start_date
                    ? new Date(event.start_date).toLocaleDateString(
                        "pt-BR",
                        { day: "numeric", month: "long" },
                      )
                    : "Data a definir"}
                </p>
              </div>
              {event.meeting_location && (
                <div className="flex items-center gap-2 text-muted-foreground text-xs italic">
                  <span className="font-bold text-accent">Local:</span>
                  <p className="font-body">
                    {event.meeting_location}
                  </p>
                </div>
              )}
            </div>
            <h3 className="font-heading text-xl font-bold text-accent mb-2 line-clamp-2">
              {event.title}
            </h3>
            <p className="font-body text-sm text-foreground/80 mb-4 line-clamp-3">
              {event.description}
            </p>

            <div className="flex justify-between items-center mt-auto">
              {event.pastoral && (
                <span className="text-xs font-medium font-body text-accent bg-accent/10 px-2 py-1 rounded border border-accent/20">
                  {event.pastoral.name}
                </span>
              )}
              <button className="flex items-center gap-1 text-primary font-bold text-sm hover:translate-x-1 transition-transform font-body">
                Saiba mais <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
