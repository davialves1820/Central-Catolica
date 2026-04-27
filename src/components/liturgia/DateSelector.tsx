"use client";

import { useRouter } from "next/navigation";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface DateSelectorProps {
  initialDate?: string;
  currentParams: { dia?: string; mes?: string; ano?: string };
}

const pushDate = (router: ReturnType<typeof useRouter>, date: Date) => {
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();
  router.push(`/liturgia?dia=${d}&mes=${m}&ano=${y}`);
};

export default function DateSelector({ currentParams }: DateSelectorProps) {
  const router = useRouter();

  const buildDateFromParams = () => {
    if (currentParams.dia && currentParams.mes && currentParams.ano) {
      return new Date(
        parseInt(currentParams.ano),
        parseInt(currentParams.mes) - 1,
        parseInt(currentParams.dia),
      );
    }
    return new Date();
  };

  const currentDate = buildDateFromParams();
  const dateValue = currentDate.toISOString().split("T")[0];

  const [prevParams, setPrevParams] = useState(currentParams);
  const [inputDate, setInputDate] = useState(dateValue);

  if (currentParams !== prevParams) {
    setPrevParams(currentParams);
    setInputDate(dateValue);
  }

  const isToday = (() => {
    const today = new Date();
    return (
      currentDate.getDate() === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  })();

  const handlePrev = () => {
    const prev = new Date(currentDate);
    prev.setDate(prev.getDate() - 1);
    pushDate(router, prev);
  };

  const handleNext = () => {
    const next = new Date(currentDate);
    next.setDate(next.getDate() + 1);
    pushDate(router, next);
  };

  const handleToday = () => pushDate(router, new Date());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputDate(val);
    if (val) {
      const [y, m, d] = val.split("-");
      router.push(`/liturgia?dia=${parseInt(d)}&mes=${parseInt(m)}&ano=${y}`);
    }
  };

  const formattedDate = currentDate.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-white border-b border-primary/8 py-4 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

          {/* Nav group */}
          <div className="flex items-center gap-2">
            {/* Prev day */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={handlePrev}
              aria-label="Dia anterior"
              className="w-9 h-9 rounded-xl border border-border bg-white hover:bg-primary/5 hover:border-primary/20 flex items-center justify-center text-primary/60 hover:text-primary transition-all duration-200 shadow-sm"
            >
              <ChevronLeft size={18} />
            </motion.button>

            {/* Date display + picker */}
            <label htmlFor="liturgia-date" className="relative group cursor-pointer">
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl border-2 border-primary/15 hover:border-accent/40 bg-white shadow-sm transition-all duration-200 group-focus-within:border-accent/60">
                <Calendar size={16} className="text-accent shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-body leading-none mb-0.5">
                    Liturgia do dia
                  </span>
                  <span className="text-sm font-bold text-primary font-heading capitalize">
                    {formattedDate}
                  </span>
                </div>
              </div>
              <input
                type="date"
                id="liturgia-date"
                value={inputDate}
                onChange={handleInputChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full"
                aria-label="Selecionar data da liturgia"
              />
            </label>

            {/* Next day */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={handleNext}
              aria-label="Próximo dia"
              className="w-9 h-9 rounded-xl border border-border bg-white hover:bg-primary/5 hover:border-primary/20 flex items-center justify-center text-primary/60 hover:text-primary transition-all duration-200 shadow-sm"
            >
              <ChevronRight size={18} />
            </motion.button>
          </div>

          {/* Today button */}
          {!isToday && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleToday}
              className="text-xs font-bold text-accent hover:text-primary transition-colors border border-accent/25 hover:border-primary/25 px-4 py-2 rounded-full bg-accent/5 hover:bg-primary/5 shadow-sm"
            >
              Ir para hoje
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}