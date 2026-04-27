"use client";

import { useState } from "react";
import { Bookmark, ChevronRight, Clock, BookOpen } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Progress {
  bookName: string;
  chapter: number;
  timestamp: number;
}

export default function BibleProgress() {
  const [progress] = useState<Progress | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const saved = localStorage.getItem("bible-progress");
      return saved ? (JSON.parse(saved) as Progress) : null;
    } catch {
      return null;
    }
  });

  if (!progress) return null;

  const date = new Date(progress.timestamp);
  const isToday =
    new Date().toDateString() === date.toDateString();

  const timeAgo = isToday
    ? `Hoje às ${date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`
    : date.toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-2xl border border-primary/15 bg-white shadow-sm hover:shadow-md hover:border-primary/25 transition-all duration-300"
    >
      {/* Left accent bar */}
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-accent to-primary rounded-l-2xl" />

      <div className="pl-6 pr-5 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Info */}
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 bg-primary text-white rounded-xl flex items-center justify-center shadow-md shadow-primary/20 shrink-0">
            <Bookmark size={20} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground font-body mb-0.5">
              Continuar leitura
            </p>
            <p className="font-heading font-bold text-primary text-lg leading-tight">
              {progress.bookName}
              <span className="text-muted-foreground font-body font-normal text-sm ml-2">
                cap. {progress.chapter}
              </span>
            </p>
            <div className="flex items-center gap-1.5 mt-1 text-muted-foreground text-xs font-body">
              <Clock size={11} />
              {timeAgo}
            </div>
          </div>
        </div>

        {/* CTA */}
        <Link
          href={`/biblia/${encodeURIComponent(progress.bookName)}/${progress.chapter}`}
          className="shrink-0 flex items-center gap-2 bg-primary hover:bg-crimson-light text-white text-sm font-bold font-body px-5 py-2.5 rounded-xl shadow-md shadow-primary/20 hover:shadow-primary/30 transition-all duration-200 hover:-translate-y-0.5 group/btn"
        >
          <BookOpen size={15} />
          Continuar
          <ChevronRight
            size={14}
            className="group-hover/btn:translate-x-0.5 transition-transform"
          />
        </Link>
      </div>
    </motion.div>
  );
}