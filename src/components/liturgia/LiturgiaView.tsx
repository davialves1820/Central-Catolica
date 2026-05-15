"use client";

import { LiturgiaDiaria } from "../../types/liturgia";
import { BookOpen, Cross, Quote } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import ReadingSection from "./ReadingSection";
import PsalmSection from "./PsalmSection";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.45, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function LiturgiaView({ liturgia }: { liturgia: LiturgiaDiaria }) {
  return (
    <div className="relative min-h-screen">
      <AnimatePresence mode="wait">
        <motion.div
          key={liturgia.data}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 space-y-24"
        >
          {/* Header */}
          <motion.div custom={0} variants={sectionVariants} initial="hidden" animate="visible"
            className="flex flex-col items-center text-center space-y-6"
          >
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-[1px] bg-primary/30"></div>
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary">Liturgia Diária</span>
              <div className="w-12 h-[1px] bg-primary/30"></div>
            </div>
            
            <h1 className="font-headline-xl text-primary leading-[1.1] max-w-4xl">
              {liturgia.liturgia}
            </h1>

            <p className="font-body text-[10px] font-bold text-muted-foreground/60 uppercase tracking-[0.3em]">{liturgia.data}</p>
          </motion.div>

          {/* Main grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            {/* Readings */}
            <div className="lg:col-span-8 space-y-32">
              <motion.div custom={1} variants={sectionVariants} initial="hidden" animate="visible">
                <ReadingSection titulo="Primeira Leitura" leitura={liturgia.primeiraLeitura} Icon={BookOpen} />
              </motion.div>

              <motion.div custom={2} variants={sectionVariants} initial="hidden" animate="visible">
                <PsalmSection salmo={liturgia.salmo} />
              </motion.div>

              {liturgia.segundaLeitura?.texto && (
                <motion.div custom={3} variants={sectionVariants} initial="hidden" animate="visible">
                  <ReadingSection titulo="Segunda Leitura" leitura={liturgia.segundaLeitura} Icon={BookOpen} />
                </motion.div>
              )}

              <motion.div custom={4} variants={sectionVariants} initial="hidden" animate="visible">
                <ReadingSection titulo="Evangelho" leitura={liturgia.evangelho} Icon={Cross} ehEvangelho />
              </motion.div>
            </div>

            {/* Sidebar */}
            <motion.div custom={2} variants={sectionVariants} initial="hidden" animate="visible"
              className="lg:col-span-4 space-y-8"
            >
              <div className="sticky top-32 space-y-12">

                {/* Orações do Dia */}
                <div className="bg-card/50 backdrop-blur-sm border border-border/40 p-10 rounded-3xl shadow-xl shadow-foreground/5 space-y-10">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary border-b border-border/40 pb-6">
                    Orações do Dia
                  </h3>
                  {[
                    { label: "Coleta", text: liturgia.dia },
                    { label: "Sobre as Oferendas", text: liturgia.oferendas },
                    { label: "Depois da Comunhão", text: liturgia.comunhao },
                  ].map(({ label, text }) => (
                    <div key={label} className="space-y-4">
                      <h4 className="text-[9px] font-bold uppercase tracking-widest text-primary/60">
                        {label}
                      </h4>
                      <p className="text-base text-foreground/80 leading-relaxed font-reading italic">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Antífonas */}
                <div className="bg-pearl/40 backdrop-blur-sm border border-primary/10 p-10 rounded-3xl shadow-xl shadow-primary/5 space-y-10">
                  <div className="flex items-center gap-3 border-b border-primary/10 pb-6">
                    <Quote size={16} aria-hidden="true" className="text-primary" />
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground">Antífonas</h3>
                  </div>
                  {[
                    { label: "Entrada", text: liturgia.antifonas.entrada },
                    { label: "Comunhão", text: liturgia.antifonas.comunhao },
                  ].map(({ label, text }) => (
                    <div key={label} className="space-y-4">
                      <h4 className="text-[9px] font-bold uppercase tracking-widest text-primary/60">
                        {label}
                      </h4>
                      <p className="text-base text-foreground/80 leading-relaxed font-reading italic">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}