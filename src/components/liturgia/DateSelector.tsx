"use client";

import { DateSelectorProps } from "../../types/liturgia";
import { useRouter } from "next/navigation";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

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

  const today = new Date();
  const isToday =
    currentDate.getDate() === today.getDate() &&
    currentDate.getMonth() === today.getMonth() &&
    currentDate.getFullYear() === today.getFullYear();

  const formattedDate = currentDate.toLocaleDateString("pt-BR", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  return (
    <div
      className="border-b border-border py-4"
      style={{ background: "hsl(var(--secondary))" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

          {/* Nav group */}
          <div className="flex items-center gap-2">
            <motion.button whileTap={{ scale: 0.92 }}
              onClick={() => { const p = new Date(currentDate); p.setDate(p.getDate() - 1); pushDate(router, p); }}
              aria-label="Dia anterior"
              className="w-9 h-9 rounded-lg border border-border flex items-center justify-center transition-all hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              style={{ background: "hsl(var(--card))" }}
            >
              <ChevronLeft size={17} className="text-muted-foreground" aria-hidden="true" />
            </motion.button>

            {/* Date picker trigger */}
            <label htmlFor="liturgia-date" className="relative group cursor-pointer">
              <div
                className="flex items-center gap-2.5 px-4 py-2 rounded-lg border border-border transition-all duration-200 group-focus-within:border-primary/50"
                style={{ background: "hsl(var(--card))" }}
              >
                <Calendar size={15} aria-hidden="true" style={{ color: "hsl(var(--gold))" }} />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-body leading-none mb-0.5">
                    Liturgia do dia
                  </span>
                  <span className="text-sm font-heading font-semibold text-foreground capitalize">
                    {formattedDate}
                  </span>
                </div>
              </div>
              <input type="date" id="liturgia-date" value={inputDate}
                onChange={(e) => {
                  setInputDate(e.target.value);
                  if (e.target.value) {
                    const [y, m, d] = e.target.value.split("-");
                    router.push(`/liturgia?dia=${parseInt(d)}&mes=${parseInt(m)}&ano=${y}`);
                  }
                }}
                className="absolute inset-0 opacity-0 cursor-pointer w-full"
                aria-label="Selecionar data da liturgia"
              />
            </label>

            <motion.button whileTap={{ scale: 0.92 }}
              onClick={() => { const n = new Date(currentDate); n.setDate(n.getDate() + 1); pushDate(router, n); }}
              aria-label="Próximo dia"
              className="w-9 h-9 rounded-lg border border-border flex items-center justify-center transition-all hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              style={{ background: "hsl(var(--card))" }}
            >
              <ChevronRight size={17} className="text-muted-foreground" aria-hidden="true" />
            </motion.button>
          </div>

          {/* Today button */}
          {!isToday && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => pushDate(router, new Date())}
              className="text-xs font-bold font-body px-4 py-2 rounded-full border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              style={{
                color: "hsl(var(--gold))",
                borderColor: "hsl(var(--gold)/0.3)",
                background: "hsl(var(--gold)/0.06)",
              }}
            >
              Ir para hoje
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}