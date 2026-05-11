"use client";

import { motion, AnimatePresence } from "framer-motion";
import { DateTime } from "luxon";
import { Info, Sparkles, X } from "lucide-react";
import ColorDot from "./ColorDot";
import Link from "next/link";
import { type PropsDrawerDia, type DadosDiaLiturgico, BADGE_BG, GRAUS } from "@/types/calendario";

function Backdrop({ onClick }: { onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed md:hidden inset-0 z-40 bg-black/50 backdrop-blur-sm"
      onClick={onClick}
      aria-hidden="true"
    />
  );
}

function Sheet({
  diaSelecionado,
  dadosSelecionados,
  aoFechar,
}: {
  diaSelecionado: string;
  dadosSelecionados: DadosDiaLiturgico[];
  aoFechar: () => void;
}) {
  const main = dadosSelecionados[0];
  const cor = main?.cores?.[0] || "AMARELO";
  const data = DateTime.fromISO(diaSelecionado);

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 30, stiffness: 320 }}
      className="fixed md:hidden inset-x-0 bottom-0 z-50 rounded-t-3xl border-t border-border overflow-hidden"
      style={{ background: "hsl(var(--card))", maxHeight: "80vh" }}
      role="dialog"
      aria-label="Detalhes litúrgicos do dia"
    >
      {/* Drag handle */}
      <div className="flex justify-center pt-3 pb-1">
        <div
          className="w-10 h-1 rounded-full"
          style={{ background: "hsl(var(--border))" }}
          aria-hidden="true"
        />
      </div>

      {/* Colored header */}
      <div
        className="px-5 py-4"
        style={{ background: BADGE_BG[cor] || "hsl(var(--secondary))" }}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-bold font-body uppercase tracking-widest text-white/60 mb-1">
              {data.toFormat("EEEE, dd 'de' MMMM", { locale: "pt-BR" })}
            </p>
            <h3 className="font-heading text-xl font-bold text-white leading-tight">
              {main.nome}
            </h3>
          </div>
          <button
            onClick={aoFechar}
            aria-label="Fechar detalhes"
            className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Scrollable body */}
      <div
        className="overflow-y-auto px-5 py-5 space-y-4"
        style={{ maxHeight: "calc(80vh - 120px)" }}
      >
        {/* Rank + season */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { Icon: Info, label: "Grau", value: GRAUS[main.rank] || main.nomeRank },
            { Icon: Sparkles, label: "Tempo", value: main.nomesTemporadas?.join(", ") },
          ].map(({ Icon, label, value }) => (
            <div
              key={label}
              className="rounded-2xl border border-border/50 p-4 shadow-sm"
              style={{ background: "hsl(var(--secondary)/0.5)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-6 h-6 rounded-lg flex items-center justify-center"
                  style={{
                    background: "hsl(var(--gold)/0.1)",
                    color: "hsl(var(--gold))",
                  }}
                >
                  <Icon size={14} aria-hidden="true" />
                </div>
                <p className="text-[10px] font-bold font-body uppercase tracking-wider text-muted-foreground">
                  {label}
                </p>
              </div>
              <p className="font-semibold text-sm font-body text-foreground leading-snug">
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Other memorials */}
        {dadosSelecionados.length > 1 && (
          <div className="space-y-2">
            <p className="text-xs font-bold font-body uppercase tracking-widest text-muted-foreground">
              Outras Memórias
            </p>
            {dadosSelecionados.slice(1).map((day, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl border border-border p-3"
                style={{ background: "hsl(var(--secondary))" }}
              >
                <ColorDot cor={day.cores[0]} />
                <p className="text-sm font-body text-foreground">{day.nome}</p>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <Link
          href={`/liturgia?dia=${data.day}&mes=${data.month}&ano=${data.year}`}
          className="flex items-center justify-center w-full py-4 rounded-2xl font-body font-bold text-sm transition-all active:scale-[0.98] shadow-lg shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          style={{
            background: "hsl(var(--primary))",
            color: "hsl(var(--primary-foreground))",
          }}
        >
          Ver Leituras do Dia
        </Link>
      </div>
    </motion.div>
  );
}

/** Renders the mobile bottom sheet + backdrop when a day with data is selected. */
export default function DaySheet({ diaSelecionado, dadosSelecionados, aoFechar }: PropsDrawerDia) {
  return (
    <AnimatePresence>
      {dadosSelecionados && diaSelecionado && (
        <>
          <Backdrop onClick={aoFechar} />
          <Sheet
            diaSelecionado={diaSelecionado}
            dadosSelecionados={dadosSelecionados}
            aoFechar={aoFechar}
          />
        </>
      )}
    </AnimatePresence>
  );
}
