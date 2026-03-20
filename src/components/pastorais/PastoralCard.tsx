"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Church } from "lucide-react";
import { Pastoral } from "../../types/index";
import NextImage from "next/image";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

interface PastoralCardProps {
  pastoral: Pastoral;
  index: number;
}

export const PastoralCard = ({ pastoral, index }: PastoralCardProps) => {
  const Icon = pastoral.icon || Church;

  return (
    <Link href={`/pastorais/${pastoral.slug || pastoral.id}`} className="block">
      <motion.div
        custom={index}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={cardVariants}
        className="pastoral-card group flex items-start gap-4 p-4 rounded-xl border border-primary/10 hover:border-primary/30 bg-white hover:bg-primary/5 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-primary/5"
      >
        <div className="shrink-0 w-12 h-12 bg-primary/5 rounded-lg flex items-center justify-center group-hover:bg-primary/10 transition-colors overflow-hidden border border-primary/5 relative">
          {pastoral.image_url ? (
            <NextImage
              src={pastoral.image_url}
              alt={pastoral.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <Icon
              size={24}
              className="text-primary group-hover:text-accent transition-colors"
            />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-heading text-lg font-bold text-foreground">
              {pastoral.name}
            </h3>
            <span className="text-[10px] uppercase tracking-wider font-body font-bold text-primary border border-primary/20 rounded-full px-2 py-0.5 shrink-0 ml-2">
              {pastoral.tag}
            </span>
          </div>
          <p className="font-body text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {pastoral.description}
          </p>
          <div className="mt-3 flex items-center gap-1 text-accent font-body text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
            Saiba mais <ArrowRight size={14} />
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
