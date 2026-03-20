import Link from "next/link";
import { motion } from "framer-motion";
import { GraduationCap, ArrowRight, Settings } from "lucide-react";
import { CatechismClass } from "@/types";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.05 },
  }),
};

interface ClassCardProps {
  cls: CatechismClass;
  onEdit: (cls: CatechismClass) => void;
  index?: number;
}

export const ClassCard = ({ cls, onEdit, index = 0 }: ClassCardProps) => {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={cardVariants}
      className="bg-white rounded-2xl border border-border p-6 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 group flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="shrink-0 w-12 h-12 bg-primary/5 rounded-lg flex items-center justify-center group-hover:bg-primary/10 transition-colors border border-primary/5">
          <GraduationCap className="text-primary group-hover:text-accent transition-colors" size={24} />
        </div>
        <button
          type="button"
          onClick={() => onEdit(cls)}
          className="p-2 text-muted-foreground hover:text-primary transition-colors hover:bg-zinc-50 rounded-lg"
          title="Editar Turma"
        >
          <Settings size={18} />
        </button>
      </div>

      <Link href={`/catequese/${cls.id}`} className="flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] uppercase tracking-wider font-body font-bold text-primary border border-primary/20 rounded-full px-2 py-0.5">
            Turma {cls.year}
          </span>
        </div>
        
        <h3 className="text-xl font-heading font-bold text-zinc-900 group-hover:text-primary transition-colors flex-1">
          {cls.name}
        </h3>

        <div className="mt-6 flex items-center gap-1 text-accent font-body text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
          Gerenciar Turma <ArrowRight size={14} />
        </div>
      </Link>
    </motion.div>
  );
};
