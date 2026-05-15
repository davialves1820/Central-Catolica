import { motion, AnimatePresence } from "framer-motion";
import {
  type Tema, type TamanhoFonte,
  TEMAS, LABELS_TEMA,
  TAMANHO_FONTE_MIN, TAMANHO_FONTE_MAX, TAMANHO_FONTE_PASSO,
  PropsPainelConfiguracoes,
} from "@/types/biblia";
import { Minus, Plus } from "lucide-react";

export default function PainelConfiguracoes({
  t,
  estaAberto,
  tamanhoFonte,
  tema,
  bg,
  aoMudarTamanhoFonte,
  aoMudarTema,
}: PropsPainelConfiguracoes) {
  return (
    <AnimatePresence>
      {estaAberto && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className={`overflow-hidden border-b shadow-inner ${t.borda}`}
        >
          <div className="p-8 grid sm:grid-cols-2 gap-10" style={{ background: bg }}>
            {/* Font size */}
            <div className="space-y-4">
              <p className={`text-[10px] font-bold font-body uppercase tracking-[0.2em] opacity-60 ${t.muted}`}>
                Tamanho da Fonte
              </p>
              <div className="flex items-center gap-4" role="group" aria-label="Tamanho da fonte">
                <button
                  onClick={() =>
                    aoMudarTamanhoFonte(Math.max(TAMANHO_FONTE_MIN, tamanhoFonte - TAMANHO_FONTE_PASSO) as TamanhoFonte)
                  }
                  aria-label="Diminuir fonte"
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center font-bold transition-all hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${t.muted} ${t.borda}`}
                >
                  <Minus size={16} />
                </button>
                <span
                  className={`flex-1 text-center font-body text-lg font-bold ${t.texto}`}
                  aria-live="polite"
                >
                  {tamanhoFonte}px
                </span>
                <button
                  onClick={() =>
                    aoMudarTamanhoFonte(Math.min(TAMANHO_FONTE_MAX, tamanhoFonte + TAMANHO_FONTE_PASSO) as TamanhoFonte)
                  }
                  aria-label="Aumentar fonte"
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center font-bold transition-all hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${t.muted} ${t.borda}`}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Theme */}
            <div className="space-y-4">
              <p className={`text-[10px] font-bold font-body uppercase tracking-[0.2em] opacity-60 ${t.muted}`}>
                Tema de Leitura
              </p>
              <div className="flex gap-3" role="group" aria-label="Tema de leitura">
                {(["pergaminho", "escuro", "claro"] as Tema[]).map((th) => (
                  <button
                    key={th}
                    onClick={() => aoMudarTema(th)}
                    aria-label={`Tema ${LABELS_TEMA[th]}`}
                    aria-pressed={tema === th}
                    className={`flex-1 py-3 rounded-xl text-[10px] font-bold font-body uppercase tracking-widest border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                      tema === th ? "border-primary shadow-lg shadow-primary/10" : "border-transparent"
                    }`}
                    style={{
                      background: TEMAS[th].bg,
                      color: th === "escuro" ? "#fbf9f4" : "#1b1c19",
                    }}
                  >
                    {LABELS_TEMA[th]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
