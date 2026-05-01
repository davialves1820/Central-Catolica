"use client";

import { LiturgiaDiaria } from "../../types/liturgia";
import { BookOpen, Cross, Music, Quote } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import LiturgicalBackground from "./LiturgicalBackground";
import ReadingSection from "./ReadingSection";
import PsalmSection from "./PsalmSection";

/* Liturgical color  */
const getCorTheme = (cor: string) => {
  const c = cor.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  if (c.includes("verde")) {
    return {
      badge: "border-emerald-700/40 text-emerald-400",
      dot: "bg-emerald-500",
      dot2: "#10b981",
      sidebarAccent: "text-emerald-400",
    };
  }
  if (c.includes("roxo") || c.includes("violeta")) {
    return {
      badge: "border-purple-700/40 text-purple-400",
      dot: "bg-purple-500",
      dot2: "#a855f7",
      sidebarAccent: "text-purple-400",
    };
  }
  if (c.includes("vermelho")) {
    return {
      badge: "border-red-700/40 text-red-400",
      dot: "bg-red-500",
      dot2: "#ef4444",
      sidebarAccent: "text-red-400",
    };
  }
  if (c.includes("rosa")) {
    return {
      badge: "border-pink-600/40 text-pink-400",
      dot: "bg-pink-400",
      dot2: "#f472b6",
      sidebarAccent: "text-pink-400",
    };
  }
  if (c.includes("preto")) {
    return {
      badge: "border-slate-600/40 text-slate-400",
      dot: "bg-slate-500",
      dot2: "#64748b",
      sidebarAccent: "text-slate-400",
    };
  }
  /* Branco / Dourado */
  return {
    badge: "border-primary/40 text-primary",
    dot: "bg-primary",
    dot2: "hsl(var(--gold))",
    sidebarAccent: "text-primary",
  };
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.45, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function LiturgiaView({ liturgia }: { liturgia: LiturgiaDiaria }) {
  const theme = getCorTheme(liturgia.cor);

  return (
    <div className="relative min-h-screen">
      <LiturgicalBackground cor={liturgia.cor} />

      <AnimatePresence mode="wait">
        <motion.div
          key={liturgia.data}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative z-10 max-w-4xl mx-auto px-4 py-12 space-y-12"
        >
          {/* Header */}
          <motion.div custom={0} variants={sectionVariants} initial="hidden" animate="visible"
            className="text-center space-y-3"
          >
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold font-body uppercase tracking-wider border ${theme.badge}`}
              style={{ background: "hsl(var(--card))" }}
            >
              <span className={`w-2 h-2 rounded-full ${theme.dot}`} aria-hidden="true" />
              {liturgia.cor}
            </div>

            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground leading-tight">
              {liturgia.liturgia}
            </h1>

            <p className="font-body text-sm text-muted-foreground capitalize">{liturgia.data}</p>
          </motion.div>

          {/* Main grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

            {/* Readings */}
            <div className="lg:col-span-2 space-y-12">
              <motion.div custom={1} variants={sectionVariants} initial="hidden" animate="visible">
                <ReadingSection title="Primeira Leitura" leitura={liturgia.primeiraLeitura} Icon={BookOpen} />
              </motion.div>

              <motion.div custom={2} variants={sectionVariants} initial="hidden" animate="visible">
                <PsalmSection salmo={liturgia.salmo} />
              </motion.div>

              {liturgia.segundaLeitura?.texto && (
                <motion.div custom={3} variants={sectionVariants} initial="hidden" animate="visible">
                  <ReadingSection title="Segunda Leitura" leitura={liturgia.segundaLeitura} Icon={BookOpen} />
                </motion.div>
              )}

              <motion.div custom={4} variants={sectionVariants} initial="hidden" animate="visible">
                <ReadingSection title="Evangelho" leitura={liturgia.evangelho} Icon={Cross} isGospel />
              </motion.div>
            </div>

            {/* Sidebar */}
            <motion.div custom={2} variants={sectionVariants} initial="hidden" animate="visible"
              className="space-y-5"
            >
              <div className="sticky top-24 space-y-5">

                {/* Orações do Dia */}
                <div className="rounded-2xl border border-border p-6 space-y-5"
                  style={{ background: "hsl(var(--card))" }}
                >
                  <h3 className="font-heading text-lg font-semibold text-foreground border-b border-border pb-3">
                    Orações do Dia
                  </h3>
                  {[
                    { label: "Coleta", text: liturgia.dia },
                    { label: "Sobre as Oferendas", text: liturgia.oferendas },
                    { label: "Depois da Comunhão", text: liturgia.comunhao },
                  ].map(({ label, text }) => (
                    <div key={label}>
                      <h4 className={`text-[10px] font-bold font-body uppercase tracking-widest mb-1.5 ${theme.sidebarAccent}`}>
                        {label}
                      </h4>
                      <p className="text-sm text-muted-foreground italic leading-relaxed"
                        style={{ fontFamily: "var(--font-reading)" }}>
                        {text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Antífonas */}
                <div className="rounded-2xl border border-border p-6 space-y-5"
                  style={{ background: "hsl(var(--secondary))" }}
                >
                  <div className="flex items-center gap-2 border-b border-border pb-3">
                    <Quote size={16} aria-hidden="true" style={{ color: theme.dot2 }} />
                    <h3 className="font-heading text-lg font-semibold text-foreground">Antífonas</h3>
                  </div>
                  {[
                    { label: "Entrada", text: liturgia.antifonas.entrada },
                    { label: "Comunhão", text: liturgia.antifonas.comunhao },
                  ].map(({ label, text }) => (
                    <div key={label}>
                      <h4 className={`text-[10px] font-bold font-body uppercase tracking-widest mb-1.5 ${theme.sidebarAccent}`}>
                        {label}
                      </h4>
                      <p className="text-sm text-foreground/80 leading-relaxed"
                        style={{ fontFamily: "var(--font-reading)" }}>
                        {text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Refrão */}
                <div className="rounded-2xl border border-border p-5"
                  style={{ background: "hsl(var(--card))" }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Music size={14} aria-hidden="true" style={{ color: theme.dot2 }} />
                    <span className="text-[10px] font-bold font-body uppercase tracking-widest text-muted-foreground">
                      Refrão do Salmo
                    </span>
                  </div>
                  <p className="font-heading text-sm font-semibold text-foreground italic leading-relaxed">
                    R. {liturgia.salmo.refrao}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-2 font-body">{liturgia.salmo.referencia}</p>
                </div>

              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}