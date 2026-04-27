"use client";

import { LiturgiaDiaria } from "../../types/liturgia";
import { Book, Cross } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import LiturgicalBackground from "./LiturgicalBackground";
import ReadingSection from "./ReadingSection";
import PsalmSection from "./PsalmSection";
import LiturgiaSidebar from "./LiturgiaSidebar";

interface LiturgiaViewProps {
  liturgia: LiturgiaDiaria;
}

const getCorStyles = (cor: string) => {
  const c = cor.toLowerCase();
  if (c.includes("branco")) return { bg: "bg-white", text: "text-slate-800", border: "border-slate-200", accent: "primary" };
  if (c.includes("verde")) return { bg: "bg-emerald-600", text: "text-white", border: "border-emerald-700", accent: "emerald-900" };
  if (c.includes("roxo")) return { bg: "bg-purple-700", text: "text-white", border: "border-purple-800", accent: "purple-900" };
  if (c.includes("vermelho")) return { bg: "bg-crimson", text: "text-white", border: "border-crimson-light", accent: "crimson-light" };
  if (c.includes("rosa")) return { bg: "bg-pink-400", text: "text-white", border: "border-pink-500", accent: "pink-600" };
  if (c.includes("preto")) return { bg: "bg-slate-900", text: "text-white", border: "border-slate-950", accent: "black" };
  return { bg: "bg-primary", text: "text-white", border: "border-primary-foreground", accent: "primary" };
};

export default function LiturgiaView({ liturgia }: LiturgiaViewProps) {
  const corStyles = getCorStyles(liturgia.cor);

  return (
    <div className="relative min-h-screen">
      <LiturgicalBackground cor={liturgia.cor} />

      <AnimatePresence mode="wait">
        <motion.div
          key={liturgia.data}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 max-w-4xl mx-auto px-4 py-12 space-y-12"
        >
          {/* Header Section */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border mb-2 bg-pearl">
              <div className={`w-3 h-3 rounded-full ${corStyles.bg} border border-slate-200`} />
              <span className="text-muted-foreground">{liturgia.cor}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary">
              {liturgia.liturgia}
            </h1>
            <p className="text-lg text-muted-foreground font-body">
              {liturgia.data}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <ReadingSection 
                title="Primeira Leitura" 
                leitura={liturgia.primeiraLeitura} 
                Icon={Book} 
              />

              <PsalmSection salmo={liturgia.salmo} />

              {liturgia.segundaLeitura && (
                <ReadingSection 
                  title="Segunda Leitura" 
                  leitura={liturgia.segundaLeitura} 
                  Icon={Book} 
                />
              )}

              <ReadingSection 
                title="Evangelho" 
                leitura={liturgia.evangelho} 
                Icon={Cross} 
                isGospel 
              />
            </div>

            {/* Sidebar / Prayers */}
            <LiturgiaSidebar liturgia={liturgia} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
