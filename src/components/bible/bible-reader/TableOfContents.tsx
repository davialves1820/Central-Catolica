import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { type Chapter, type ThemeTokens } from "@/types";

interface TableOfContentsProps {
  t: ThemeTokens;
  chapters: Chapter[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (index: number) => void;
}

export function TableOfContents({
  t,
  chapters,
  currentIndex,
  isOpen,
  onClose,
  onSelect,
}: TableOfContentsProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: -280, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -280, opacity: 0 }}
          transition={{ type: "spring", damping: 28, stiffness: 320 }}
          className={`absolute top-0 left-0 h-full w-60 z-30 border-r overflow-y-auto ${t.border}`}
          style={{ background: t.bg }}
          role="dialog"
          aria-label="Índice de capítulos"
        >
          <div className={`flex items-center justify-between p-4 border-b sticky top-0 ${t.toolbar}`}>
            <p className={`font-heading font-semibold text-sm ${t.text}`}>Capítulos</p>
            <button
              onClick={onClose}
              aria-label="Fechar índice"
              className={`p-1.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${t.muted}`}
            >
              <X size={15} aria-hidden="true" />
            </button>
          </div>

          <div className="p-3 grid grid-cols-4 gap-1.5">
            {chapters.map((ch, idx) => (
              <button
                key={ch.capitulo}
                onClick={() => onSelect(idx)}
                aria-label={`Capítulo ${ch.capitulo}`}
                aria-current={idx === currentIndex ? "true" : undefined}
                className="aspect-square rounded-lg text-sm font-bold font-body transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                style={
                  idx === currentIndex
                    ? { background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }
                    : { color: t.muted.replace("text-[", "").replace("]", "") }
                }
              >
                {ch.capitulo}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
