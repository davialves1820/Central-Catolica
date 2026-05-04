import { motion, AnimatePresence } from "framer-motion";
import {
  type Theme, type FontSize, type ThemeTokens,
  THEMES, THEME_LABELS,
  FONT_SIZE_MIN, FONT_SIZE_MAX, FONT_SIZE_STEP,
} from "@/types";

interface SettingsPanelProps {
  t: ThemeTokens;
  isOpen: boolean;
  fontSize: FontSize;
  theme: Theme;
  bg: string;
  onFontSizeChange: (s: FontSize) => void;
  onThemeChange: (th: Theme) => void;
}

export function SettingsPanel({
  t,
  isOpen,
  fontSize,
  theme,
  bg,
  onFontSizeChange,
  onThemeChange,
}: SettingsPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.18 }}
          className={`overflow-hidden border-b ${t.border}`}
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
                    onFontSizeChange(Math.max(FONT_SIZE_MIN, fontSize - FONT_SIZE_STEP) as FontSize)
                  }
                  aria-label="Diminuir fonte"
                  className={`w-9 h-9 rounded-lg border flex items-center justify-center font-bold text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${t.muted} ${t.border}`}
                >
                  A−
                </button>
                <span
                  className={`flex-1 text-center font-mono text-sm font-bold ${t.text}`}
                  aria-live="polite"
                >
                  {fontSize}px
                </span>
                <button
                  onClick={() =>
                    onFontSizeChange(Math.min(FONT_SIZE_MAX, fontSize + FONT_SIZE_STEP) as FontSize)
                  }
                  aria-label="Aumentar fonte"
                  className={`w-9 h-9 rounded-lg border flex items-center justify-center font-bold text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${t.muted} ${t.border}`}
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
                {(["parchment", "dark", "white"] as Theme[]).map((th) => (
                  <button
                    key={th}
                    onClick={() => onThemeChange(th)}
                    aria-label={`Tema ${THEME_LABELS[th]}`}
                    aria-pressed={theme === th}
                    className="flex-1 py-2 rounded-lg text-xs font-bold font-body border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    style={{
                      background: THEMES[th].bg,
                      color: th === "dark" ? "#f0ebe0" : "#2c1f0e",
                      borderColor: theme === th ? "hsl(var(--gold))" : "transparent",
                      boxShadow: theme === th ? "0 0 0 2px hsl(var(--gold)/0.4)" : "none",
                    }}
                  >
                    {THEME_LABELS[th]}
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
