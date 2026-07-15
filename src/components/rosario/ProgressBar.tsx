"use client";

import { motion } from "framer-motion";
import type { PropsProgressBar } from "@/types/rosario";

export function ProgressBar({ concluidosCount, total }: PropsProgressBar) {
  const percentual = total > 0 ? Math.round((concluidosCount / total) * 100) : 0;

  return (
    <div className="w-full" role="group" aria-label="Progresso do terço">
      <div className="mb-1.5 flex items-center justify-between font-body-sm text-on-surface-variant">
        <span>
          {concluidosCount} de {total} contas
        </span>
        <span className="font-semibold">{percentual}%</span>
      </div>
      <div
        className="h-2 w-full rounded-full bg-secondary/10 overflow-hidden"
        role="progressbar"
        aria-valuenow={percentual}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#c9a84c] to-primary"
          initial={false}
          animate={{ width: `${percentual}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </div>
    </div>
  );
}
