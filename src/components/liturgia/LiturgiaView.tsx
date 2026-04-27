"use client";

import { LiturgiaDiaria } from "../../types/liturgia";
import { Book, Cross, Music, Quote } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

import LiturgicalBackground from "./LiturgicalBackground";
import ReadingSection from "./ReadingSection";
import PsalmSection from "./PsalmSection";

interface LiturgiaViewProps {
  liturgia: LiturgiaDiaria;
}

// Derives a full theme object from the liturgical color
const getCorTheme = (cor: string) => {
  const c = cor.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  if (c.includes("verde"))
    return {
      badge: "bg-emerald-50 border-emerald-200 text-emerald-700",
      dot: "bg-emerald-500",
      sidebarBorder: "border-emerald-100",
      sidebarAccent: "text-emerald-600",
      labelColor: "text-emerald-600",
      gospelAccent: "text-crimson",
      gospelBorder: "border-crimson/10",
    };

  if (c.includes("roxo") || c.includes("violeta"))
    return {
      badge: "bg-purple-50 border-purple-200 text-purple-700",
      dot: "bg-purple-500",
      sidebarBorder: "border-purple-100",
      sidebarAccent: "text-purple-600",
      labelColor: "text-purple-600",
      gospelAccent: "text-crimson",
      gospelBorder: "border-crimson/10",
    };

  if (c.includes("vermelho"))
    return {
      badge: "bg-red-50 border-red-200 text-red-700",
      dot: "bg-red-500",
      sidebarBorder: "border-red-100",
      sidebarAccent: "text-red-600",
      labelColor: "text-red-600",
      gospelAccent: "text-crimson",
      gospelBorder: "border-crimson/10",
    };

  if (c.includes("rosa"))
    return {
      badge: "bg-pink-50 border-pink-200 text-pink-700",
      dot: "bg-pink-400",
      sidebarBorder: "border-pink-100",
      sidebarAccent: "text-pink-600",
      labelColor: "text-pink-600",
      gospelAccent: "text-crimson",
      gospelBorder: "border-crimson/10",
    };

  if (c.includes("preto"))
    return {
      badge: "bg-slate-100 border-slate-300 text-slate-700",
      dot: "bg-slate-700",
      sidebarBorder: "border-slate-200",
      sidebarAccent: "text-slate-600",
      labelColor: "text-slate-600",
      gospelAccent: "text-crimson",
      gospelBorder: "border-crimson/10",
    };

  // Branco / Dourado (default)
  return {
    badge: "bg-amber-50 border-amber-200 text-amber-700",
    dot: "bg-amber-400",
    sidebarBorder: "border-primary/10",
    sidebarAccent: "text-accent",
    labelColor: "text-accent",
    gospelAccent: "text-crimson",
    gospelBorder: "border-crimson/10",
  };
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function LiturgiaView({ liturgia }: LiturgiaViewProps) {
  const theme = getCorTheme(liturgia.cor);

  return (
    <div className="relative min-h-screen">
      <LiturgicalBackground cor={liturgia.cor} />

      <AnimatePresence mode="wait">
        <motion.div
          key={liturgia.data}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-10 max-w-4xl mx-auto px-4 py-12 space-y-12"
        >
          {/* ── Header ─────────────────────────────────────────── */}
          <motion.div
            custom={0}
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="text-center space-y-3"
          >
            {/* Color badge */}
            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${theme.badge}`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${theme.dot}`} />
              {liturgia.cor}
            </div>

            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary leading-tight">
              {liturgia.liturgia}
            </h1>

            <p className="text-base text-muted-foreground font-body capitalize">
              {liturgia.data}
            </p>
          </motion.div>

          {/* ── Main grid ──────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

            {/* Left: readings */}
            <div className="lg:col-span-2 space-y-12">
              <motion.div custom={1} variants={sectionVariants} initial="hidden" animate="visible">
                <ReadingSection
                  title="Primeira Leitura"
                  leitura={liturgia.primeiraLeitura}
                  Icon={Book}
                />
              </motion.div>

              <motion.div custom={2} variants={sectionVariants} initial="hidden" animate="visible">
                <PsalmSection salmo={liturgia.salmo} />
              </motion.div>

              {liturgia.segundaLeitura && (
                <motion.div custom={3} variants={sectionVariants} initial="hidden" animate="visible">
                  <ReadingSection
                    title="Segunda Leitura"
                    leitura={liturgia.segundaLeitura}
                    Icon={Book}
                  />
                </motion.div>
              )}

              <motion.div custom={4} variants={sectionVariants} initial="hidden" animate="visible">
                <ReadingSection
                  title="Evangelho"
                  leitura={liturgia.evangelho}
                  Icon={Cross}
                  isGospel
                />
              </motion.div>
            </div>

            {/* Right: sidebar */}
            <motion.div
              custom={2}
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <div className="sticky top-24 space-y-6">

                {/* Orações do Dia — glassmorphism card */}
                <div
                  className={`bg-white/80 backdrop-blur-md rounded-2xl border ${theme.sidebarBorder} p-6 shadow-lg space-y-5`}
                >
                  <h3 className="text-lg font-heading font-bold text-primary border-b border-primary/8 pb-3">
                    Orações do Dia
                  </h3>

                  {[
                    { label: "Coleta", text: liturgia.dia },
                    { label: "Sobre as Oferendas", text: liturgia.oferendas },
                    { label: "Depois da Comunhão", text: liturgia.comunhao },
                  ].map(({ label, text }) => (
                    <div key={label}>
                      <h4 className={`text-[10px] font-bold uppercase tracking-widest mb-1.5 ${theme.sidebarAccent}`}>
                        {label}
                      </h4>
                      <p className="text-sm font-body text-slate-600 italic leading-relaxed">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Antífonas */}
                <div
                  className={`bg-primary/5 backdrop-blur-md rounded-2xl border ${theme.sidebarBorder} p-6 space-y-5`}
                >
                  <div className="flex items-center gap-2 text-primary border-b border-primary/8 pb-3">
                    <Quote size={18} className={theme.sidebarAccent} />
                    <h3 className="text-lg font-heading font-bold">Antífonas</h3>
                  </div>

                  {[
                    { label: "Entrada", text: liturgia.antifonas.entrada },
                    { label: "Comunhão", text: liturgia.antifonas.comunhao },
                  ].map(({ label, text }) => (
                    <div key={label}>
                      <h4 className={`text-[10px] font-bold uppercase tracking-widest mb-1.5 ${theme.sidebarAccent}`}>
                        {label}
                      </h4>
                      <p className="text-sm font-body text-slate-700 leading-relaxed">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Salmo refrain quick access */}
                <div className="bg-white/70 backdrop-blur-md rounded-2xl border border-primary/8 p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Music size={15} className={theme.sidebarAccent} />
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${theme.sidebarAccent}`}>
                      Refrão do Salmo
                    </span>
                  </div>
                  <p className="text-sm font-heading font-semibold text-primary italic leading-relaxed">
                    R. {liturgia.salmo.refrao}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-2">
                    {liturgia.salmo.referencia}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}