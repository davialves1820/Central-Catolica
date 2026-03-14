'use client';

import { useMemo } from "react";

import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Mail, Instagram, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { pastorais } from "./constants";

interface PastoralDetailsProps {
  slug: string;
}

const PastoralDetails = ({ slug }: PastoralDetailsProps) => {
  const suggestedPastorals = useMemo(() => {
    // Deterministic approach for purity and hydration stability
    const filtered = pastorais.filter(p => p.id !== slug);
    return filtered
      .map(p => ({ p, sort: (p.id + slug).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) }))
      .sort((a, b) => a.sort - b.sort)
      .slice(0, 3)
      .map(item => item.p);
  }, [slug]);

  const pastoral = pastorais.find(p => p.id === slug);

  if (!pastoral) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="max-w-5xl mx-auto"
    >
      {/* Voltar */}
      <Link
        href="/pastorais"
        className="flex items-center gap-2 text-sm font-body font-medium text-foreground/70 hover:text-primary transition-colors mb-8 group w-fit"
      >
        <ArrowLeft size={18} className="group-hover:translate-x--1 transition-transform" />
        Voltar
      </Link>

      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start mb-12">
        {/* Logo/Icon Container */}
        <div className="shrink-0 w-48 h-48 bg-white border border-border/40 rounded-3xl flex items-center justify-center p-8 shadow-sm">
          {pastoral.logoUrl ? (
            <Image
              src={pastoral.logoUrl}
              alt={pastoral.name}
              width={150}
              height={150}
              className="w-full h-full object-contain"
            />
          ) : (
            <pastoral.icon size={80} className="text-primary/20" />
          )}
        </div>

        {/* Info */}
        <div className="flex-1">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-3">
            {pastoral.name}
          </h1>

          <div className="inline-block bg-foreground text-background text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6">
            {pastoral.tag}
          </div>

          {pastoral.location && (
            <div className="flex items-center gap-2 text-muted-foreground font-body text-sm mb-8">
              <MapPin size={16} className="text-primary/60" />
              {pastoral.location}
            </div>
          )}

          {/* Social Links */}
          <div className="flex flex-wrap gap-3">
            {pastoral.email && (
              <a
                href={`mailto:${pastoral.email}`}
                className="flex items-center gap-2 px-4 py-2 bg-background border border-border/60 rounded-lg text-xs font-body font-medium hover:border-primary/40 hover:bg-accent/5 transition-all"
              >
                <Mail size={14} /> Email
              </a>
            )}
            {pastoral.instagram && (
              <a
                href={`https://instagram.com/${pastoral.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-background border border-border/60 rounded-lg text-xs font-body font-medium hover:border-primary/40 hover:bg-accent/5 transition-all"
              >
                <Instagram size={14} /> Instagram
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12 mb-20">
        {/* Description Section */}
        <div className="lg:col-span-2">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
            Sobre
          </h2>
          <p className="font-body text-foreground/80 leading-relaxed text-lg mb-10">
            {pastoral.description}
          </p>
        </div>

        {/* Coordinators Section */}
        {pastoral.coordinators && pastoral.coordinators.length > 0 && (
          <div className="bg-accent/5 rounded-2xl p-8 border border-accent/10">
            <h2 className="font-heading text-xl font-bold text-foreground mb-6">
              Coordenação
            </h2>
            <div className="space-y-6">
              {pastoral.coordinators.map((coord, idx) => (
                <div key={idx} className="border-b border-accent/10 pb-4 last:border-0 last:pb-0">
                  <p className="font-body font-bold text-foreground mb-1">{coord.name}</p>
                  {coord.phone && (
                    <p className="font-body text-sm text-muted-foreground flex items-center gap-2 mb-1">
                      <Phone size={14} className="text-primary/60" /> {coord.phone}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <hr className="border-border/40 mb-16" />

      {/* Suggested Pastorals */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-bold text-foreground mb-8">
          Outras Pastorais e Movimentos
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {suggestedPastorals.map((p) => (
            <div key={p.id} className="opacity-90 hover:opacity-100 transition-opacity">
                {/* We can't use PastoralCard directly here if it has complex motion logic that interferes or we just want a simpler version */}
                <Link href={`/pastorais/${p.id}`} className="block group bg-pearl/30 p-6 rounded-xl border border-border/50 hover:border-accent/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                      <p.icon size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-foreground text-sm group-hover:text-primary transition-colors">
                        {p.name}
                      </h3>
                      <p className="font-body text-[10px] text-muted-foreground uppercase tracking-widest">
                        {p.tag}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </section>
    </motion.div>
  );
};

export default PastoralDetails;
