"use client";

import { PropsSeletorData } from "@/types/liturgia";
import { useRouter } from "next/navigation";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const pushDate = (router: ReturnType<typeof useRouter>, date: Date) => {
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();
  router.push(`/liturgia?dia=${d}&mes=${m}&ano=${y}`);
};

export default function DateSelector({ parametrosAtuais }: PropsSeletorData) {
  const router = useRouter();

  const buildDateFromParams = () => {
    if (parametrosAtuais.dia && parametrosAtuais.mes && parametrosAtuais.ano) {
      return new Date(
        parseInt(parametrosAtuais.ano),
        parseInt(parametrosAtuais.mes) - 1,
        parseInt(parametrosAtuais.dia),
      );
    }
    return new Date();
  };

  const currentDate = buildDateFromParams();
  const dateValue = currentDate.toISOString().split("T")[0];

  const [prevParams, setPrevParams] = useState(parametrosAtuais);
  const [inputDate, setInputDate] = useState(dateValue);

  if (parametrosAtuais !== prevParams) {
    setPrevParams(parametrosAtuais);
    setInputDate(dateValue);
  }

  const today = new Date();
  const isToday =
    currentDate.getDate() === today.getDate() &&
    currentDate.getMonth() === today.getMonth() &&
    currentDate.getFullYear() === today.getFullYear();

  const formattedDate = currentDate.toLocaleDateString("pt-BR", {
    weekday: "long", day: "numeric", month: "long"
  });

  return (
    <div className="border-b border-border/40 bg-card/30 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-2">
            <button
              onClick={() => { const p = new Date(currentDate); p.setDate(p.getDate() - 1); pushDate(router, p); }}
              className="w-10 h-10 rounded-xl border border-border/40 flex items-center justify-center hover:bg-primary/5 transition-all text-muted-foreground hover:text-primary"
            >
              <ChevronLeft size={18} />
            </button>

            <label htmlFor="liturgia-date" className="relative group cursor-pointer">
              <div className="flex items-center gap-4 px-6 py-2 rounded-xl bg-card/50 border border-border/40 hover:border-primary/30 transition-all">
                <Calendar size={16} className="text-primary opacity-70" />
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-primary font-bold leading-none mb-1">
                    Liturgia do dia
                  </span>
                  <span className="text-sm font-heading font-medium text-foreground capitalize">
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
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </label>

            <button
              onClick={() => { const n = new Date(currentDate); n.setDate(n.getDate() + 1); pushDate(router, n); }}
              className="w-10 h-10 rounded-xl border border-border/40 flex items-center justify-center hover:bg-primary/5 transition-all text-muted-foreground hover:text-primary"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {!isToday && (
            <button
              onClick={() => pushDate(router, new Date())}
              className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-[10px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
            >
              Voltar para hoje
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
