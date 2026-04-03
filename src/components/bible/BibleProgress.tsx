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

  const date = new Date(progress.timestamp);
  const timeAgo = date.toLocaleDateString("pt-BR", { 
    day: 'numeric', 
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-primary/5 border border-primary/20 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4"
    >
      <div className="flex items-center gap-4">
        <div className="bg-primary text-primary-foreground p-3 rounded-xl shadow-md">
          <Bookmark className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-heading text-lg font-bold">Continuar de onde parou</h3>
          <p className="text-muted-foreground flex items-center gap-1.5 text-sm">
            <Clock className="w-3 h-3" />
            Lido em {timeAgo}
          </p>
        </div>
      </div>

      <Link 
        href={`/biblia/${encodeURIComponent(progress.bookName)}/${progress.chapter}`}
        className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 group"
      >
        <span>{progress.bookName}, Capítulo {progress.chapter}</span>
        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
}
