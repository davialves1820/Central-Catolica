"use client";

import { BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useProgressoBiblia } from "@/lib/client/hooks/biblia/useProgressoBiblia";
import Link from "next/link";

export default function ProgressoBiblia() {
  const progresso = useProgressoBiblia();

  // If no progress, we can show a default "Start Reading" state or null
  // For the "Revelatio" design, we want it to look like the "Plano de Leitura" card
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-card rounded-3xl border border-primary/10 p-10 flex flex-col justify-center items-center text-center shadow-sm h-full"
    >
      <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mb-8 border border-primary/10">
        <BookOpen className="text-primary w-10 h-10" />
      </div>
      <h3 className="font-heading text-3xl mb-4 font-medium text-foreground">Plano de Leitura</h3>
      <p className="font-body text-sm text-muted-foreground mb-8 px-4 leading-relaxed">
        {progresso 
          ? `Você parou em ${progresso.nomeLivro} ${progresso.capitulo}. Continue sua jornada espiritual.`
          : "Comece sua jornada através das Escrituras e complete a Bíblia em um ano."}
      </p>
      
      <div className="w-full h-2 bg-muted rounded-full mb-4 relative overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: progresso ? "34%" : "0%" }} // This should ideally be calculated
          className="absolute inset-y-0 left-0 bg-primary" 
        />
      </div>
      
      <p className="font-body text-[10px] font-bold text-muted-foreground/60 mb-10 uppercase tracking-[0.2em]">
        Progresso: {progresso ? "34%" : "0%"} concluído
      </p>
      
      {progresso ? (
        <Link 
          href={`/biblia/${encodeURIComponent(progresso.nomeLivro)}/${progresso.capitulo}`}
          className="w-full border border-primary/30 px-6 py-4 font-body text-xs font-bold text-primary uppercase tracking-[0.1em] hover:bg-primary hover:text-white transition-all rounded-xl text-center"
        >
          Continuar Leitura
        </Link>
      ) : (
        <button className="w-full border border-primary/30 px-6 py-4 font-body text-xs font-bold text-primary uppercase tracking-[0.1em] hover:bg-primary hover:text-white transition-all rounded-xl">
          Começar Plano
        </button>
      )}
    </motion.div>
  );
}