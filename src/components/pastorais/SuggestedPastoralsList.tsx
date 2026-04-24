"use client";

import { motion } from "framer-motion";
import { Church, ArrowRight } from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";

interface Pastoral {
  id: string;
  name: string;
  slug: string;
  image_url?: string | null;
}

export default function SuggestedPastoralsList({ pastorals }: { pastorals: Pastoral[] }) {
  if (pastorals.length === 0) return null;

  return (
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
        {pastorals.map((p, i) => (
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
  );
}
