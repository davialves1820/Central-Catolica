"use client";

import { useState, useEffect } from "react";
import { Bookmark, ChevronRight, Clock } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Progress {
  bookName: string;
  chapter: number;
  timestamp: number;
}

export default function BibleProgress() {
  const [progress, setProgress] = useState<Progress | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("bible-progress");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTimeout(() => setProgress(parsed), 0);
      } catch {
        console.error("Failed to parse bible progress");
      }
    }
  }, []);

  if (!progress) return null;

  const timeAgo = new Date(progress.timestamp).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border p-5 flex flex-col sm:flex-row items-center justify-between gap-4"
      style={{
        background: "hsl(var(--card))",
        borderColor: "hsl(var(--gold)/0.25)",
        boxShadow: "0 0 20px hsl(var(--gold)/0.06)",
      }}
      role="region"
      aria-label="Continuar leitura"
    >
      <div className="flex items-center gap-4">
        <div
          className="p-3 rounded-lg"
          style={{
            background: "hsl(var(--gold)/0.12)",
            border: "1px solid hsl(var(--gold)/0.25)",
          }}
          aria-hidden="true"
        >
          <Bookmark
            className="w-5 h-5"
            style={{ color: "hsl(var(--gold))" }}
          />
        </div>
        <div>
          <h3 className="font-heading text-base font-semibold text-foreground">
            Continuar de onde parou
          </h3>
          <p className="text-muted-foreground flex items-center gap-1.5 text-xs font-body mt-0.5">
            <Clock className="w-3 h-3" aria-hidden="true" />
            Lido em {timeAgo}
          </p>
        </div>
      </div>

      <Link
        href={`/biblia/${encodeURIComponent(progress.bookName)}/${progress.chapter}`}
        aria-label={`Continuar lendo ${progress.bookName}, capítulo ${progress.chapter}`}
        className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-body font-bold text-sm transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        style={{
          background: "hsl(var(--primary))",
          color: "hsl(var(--primary-foreground))",
        }}
      >
        <span>
          {progress.bookName}, Cap. {progress.chapter}
        </span>
        <ChevronRight
          className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
          aria-hidden="true"
        />
      </Link>
    </motion.div>
  );
}