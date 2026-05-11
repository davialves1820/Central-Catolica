import { motion, AnimatePresence } from "framer-motion";
import {
  type Tema, type TamanhoFonte,
  TEMAS, LABELS_TEMA,
  TAMANHO_FONTE_MIN, TAMANHO_FONTE_MAX, TAMANHO_FONTE_PASSO,
  PropsPainelConfiguracoes,
} from "@/types/biblia";

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
          transition={{ duration: 0.18 }}
          className={`overflow-hidden border-b ${t.borda}`}
        >
          <div className="p-5 grid sm:grid-cols-2 gap-6" style={{ background: bg }}>
            {/* Font size */}
            <div className="space-y-3">
              <p className={`text-xs font-bold font-body uppercase tracking-wider ${t.muted}`}>
                Tamanho
              </p>
              <div className="flex items-center gap-3" role="group" aria-label="Tamanho da fonte">
                <button
                  onClick={() =>
                    aoMudarTamanhoFonte(Math.max(TAMANHO_FONTE_MIN, tamanhoFonte - TAMANHO_FONTE_PASSO) as TamanhoFonte)
                  }
                  aria-label="Diminuir fonte"
                  className={`w-9 h-9 rounded-lg border flex items-center justify-center font-bold text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${t.muted} ${t.borda}`}
                >
                  A−
                </button>
                <span
                  className={`flex-1 text-center font-mono text-sm font-bold ${t.texto}`}
                  aria-live="polite"
                >
                  {tamanhoFonte}px
                </span>
                <button
                  onClick={() =>
                    aoMudarTamanhoFonte(Math.min(TAMANHO_FONTE_MAX, tamanhoFonte + TAMANHO_FONTE_PASSO) as TamanhoFonte)
                  }
                  aria-label="Aumentar fonte"
                  className={`w-9 h-9 rounded-lg border flex items-center justify-center font-bold text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${t.muted} ${t.borda}`}
                >
                  A+
                </button>
              </div>
            </div>

            {/* Theme */}
            <div className="space-y-3">
              <p className={`text-xs font-bold font-body uppercase tracking-wider ${t.muted}`}>
                Tema
              </p>
              <div className="flex gap-2" role="group" aria-label="Tema de leitura">
                {(["pergaminho", "escuro", "claro"] as Tema[]).map((th) => (
                  <button
                    key={th}
                    onClick={() => aoMudarTema(th)}
                    aria-label={`Tema ${LABELS_TEMA[th]}`}
                    aria-pressed={tema === th}
                    className="flex-1 py-2 rounded-lg text-xs font-bold font-body border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    style={{
                      background: TEMAS[th].bg,
                      color: th === "escuro" ? "#f0ebe0" : "#2c1f0e",
                      borderColor: tema === th ? "hsl(var(--gold))" : "transparent",
                      boxShadow: tema === th ? "0 0 0 2px hsl(var(--gold)/0.4)" : "none",
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
