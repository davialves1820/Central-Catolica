import { ReaderProgressBarProps } from "@/types/bible";
import { motion } from "framer-motion";

export function ReaderProgressBar({ current, total }: ReaderProgressBarProps) {
  const percent = ((current + 1) / total) * 100;

  return (
    <div
      className="h-0.5 w-full"
      style={{ background: "hsl(var(--border))" }}
      role="progressbar"
      aria-valuenow={current + 1}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-label={`Capítulo ${current + 1} de ${total}`}
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
