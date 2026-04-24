"use client";

import { motion } from "framer-motion";
import { Church } from "lucide-react";
import NextImage from "next/image";

interface PastoralHeroProps {
  pastoral: {
    name: string;
    image_url?: string | null;
  };
}

export default function PastoralHero({ pastoral }: PastoralHeroProps) {
  return (
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
      <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
    </motion.div>
  );
}
