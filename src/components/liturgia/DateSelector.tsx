"use client";

import { useRouter } from "next/navigation";
import { Calendar } from "lucide-react";
import { useState } from "react";

interface DateSelectorProps {
  initialDate?: string;
  currentParams: { dia?: string; mes?: string; ano?: string };
}

export default function DateSelector({ currentParams }: DateSelectorProps) {
  const router = useRouter();

  // Derive date from currentParams directly
  const d = currentParams.dia && currentParams.mes && currentParams.ano
    ? new Date(parseInt(currentParams.ano), parseInt(currentParams.mes) - 1, parseInt(currentParams.dia))
    : new Date();
  const dateValueFromParams = d.toISOString().split("T")[0];

  const [date, setDate] = useState(dateValueFromParams);
  const [prevParams, setPrevParams] = useState(currentParams);

  // Sync state if params changed (standard React pattern for syncing state to props)
  if (currentParams !== prevParams) {
    setPrevParams(currentParams);
    setDate(dateValueFromParams);
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setDate(newDate);

    if (newDate) {
      const [year, month, day] = newDate.split("-");
      // Remove leading zeros for the API
      const d = parseInt(day).toString();
      const m = parseInt(month).toString();
      const y = year;

      router.push(`/liturgia?dia=${d}&mes=${m}&ano=${y}`);
    }
  };

  return (
    <div className="bg-pearl/50 border-b border-primary/5 py-4">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-4">
        <label htmlFor="liturgia-date" className="flex items-center gap-2 font-heading font-bold text-primary">
          <Calendar size={20} />
          Selecionar Data:
        </label>
        <div className="relative group">
          <input
            type="date"
            id="liturgia-date"
            value={date}
            onChange={handleDateChange}
            className="bg-white border-2 border-primary/10 rounded-full px-6 py-2 font-body text-primary focus:outline-none focus:border-accent transition-all shadow-sm hover:shadow-md cursor-pointer"
          />
        </div>
        
        {/* Navigation helpers */}
        <div className="flex gap-2">
           <button 
             onClick={() => {
               const today = new Date();
               router.push(`/liturgia?dia=${today.getDate()}&mes=${today.getMonth() + 1}&ano=${today.getFullYear()}`);
             }}
             className="text-xs font-bold text-accent hover:text-primary transition-colors border border-accent/20 px-3 py-1 rounded-full bg-white"
           >
             Hoje
           </button>
        </div>
      </div>
    </div>
  );
}
