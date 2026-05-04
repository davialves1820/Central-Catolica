"use client";

import { Bookmark } from "lucide-react";
import { motion } from "framer-motion";
import { useBibleProgress } from "@/lib/client/hooks/bible/useBibleProgress";
import { GoldIconBadge } from "@/components/bible/GoldIconBadge";
import { ProgressInfo } from "@/components/bible/ProgressInfo";
import { ContinueReadingLink } from "@/components/bible/ContinueReadingLink";

export default function BibleProgress() {
  const progress = useBibleProgress();

  if (!progress) return null;

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
        <GoldIconBadge icon={Bookmark} />
        <ProgressInfo timestamp={progress.timestamp} />
      </div>

      <ContinueReadingLink bookName={progress.bookName} chapter={progress.chapter} />
    </motion.div>
  );
}