"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Instagram } from "lucide-react";
import Link from "next/link";

interface PastoralHeaderInfoProps {
  pastoral: {
    name: string;
    instagram?: string | null;
  };
}

export default function PastoralHeaderInfo({ pastoral }: PastoralHeaderInfoProps) {
  return (
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
    </motion.div>
  );
}
