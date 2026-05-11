"use client";

import { Bookmark } from "lucide-react";
import { motion } from "framer-motion";
import { useProgressoBiblia } from "@/lib/client/hooks/biblia/useProgressoBiblia";
import BadgeIconeOuro from "@/components/biblia/BadgeIconeOuro";
import InfoProgresso from "@/components/biblia/InfoProgresso";
import LinkContinuarLeitura from "@/components/biblia/LinkContinuarLeitura";

export default function ProgressoBiblia() {
  const progresso = useProgressoBiblia();

  if (!progresso) return null;

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
        <BadgeIconeOuro icon={Bookmark} />
        <InfoProgresso dataHora={progresso.dataHora} />
      </div>

      <LinkContinuarLeitura nomeLivro={progresso.nomeLivro} capitulo={progresso.capitulo} />
    </motion.div>
  );
}