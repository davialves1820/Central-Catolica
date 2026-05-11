import { PropsBarraProgressoLeitor } from "@/types/biblia";
import { motion } from "framer-motion";

export default function BarraProgressoLeitor({ atual, total }: PropsBarraProgressoLeitor) {
  const percent = ((atual + 1) / total) * 100;

  return (
    <div
      className="h-0.5 w-full"
      style={{ background: "hsl(var(--border))" }}
      role="progressbar"
      aria-valuenow={atual + 1}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-label={`Capítulo ${atual + 1} de ${total}`}
    >
      <motion.div
        className="h-full"
        style={{ background: "hsl(var(--gold))" }}
        animate={{ width: `${percent}%` }}
        transition={{ duration: 0.4 }}
      />
    </div>
  );
}
