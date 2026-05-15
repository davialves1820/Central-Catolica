import { PropsBarraProgressoLeitor } from "@/types/biblia";
import { motion } from "framer-motion";

export default function BarraProgressoLeitor({ atual, total }: PropsBarraProgressoLeitor) {
  const percent = ((atual + 1) / total) * 100;

  return (
    <div
      className="h-1 w-full bg-primary/10 overflow-hidden"
      role="progressbar"
      aria-valuenow={atual + 1}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-label={`Capítulo ${atual + 1} de ${total}`}
    >
      <motion.div
        className="h-full bg-primary"
        initial={{ width: 0 }}
        animate={{ width: `${percent}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </div>
  );
}
