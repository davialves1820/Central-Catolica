"use client";

import { useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PartyPopper, Sparkles } from "lucide-react";
import misteriosData from "@/data/misterios.json";
import type { GrupoMisterio } from "@/types/rosario";
import { obterOracao, misterioDeHoje } from "@/config/rosario";
import { gerarSequenciaRosario } from "@/lib/rosario/sequencia";
import { useRosarioProgresso } from "@/lib/client/hooks/rosario/useRosarioProgresso";
import { useRosarioPreferencias } from "@/lib/client/hooks/rosario/useRosarioPreferencias";
import { PrayerList } from "./PrayerList";
import { PrayerPanel } from "./PrayerPanel";
import { MysterySelector } from "./MysterySelector";
import { ProgressBar } from "./ProgressBar";
import { Controls } from "./Controls";

const GRUPOS = misteriosData.grupos as GrupoMisterio[];

export function RosarioApp() {
  const slugDeHoje = useMemo(() => misterioDeHoje(), []);
  const preferencias = useRosarioPreferencias();
  const progresso = useRosarioProgresso(slugDeHoje);

  const grupoAtual = GRUPOS.find((g) => g.slug === progresso.misterioSlug) ?? GRUPOS[0];
  const sequencia = useMemo(() => gerarSequenciaRosario(grupoAtual), [grupoAtual]);

  const total = sequencia.length;
  const passoAtual = progresso.passoIndex >= 0 ? sequencia[progresso.passoIndex] : null;
  const oracaoAtual = passoAtual ? obterOracao(passoAtual.tipo) : null;
  const concluido = progresso.passoIndex === total - 1 && progresso.concluidos.has(progresso.passoIndex);

  // Atalhos de teclado: setas para navegar entre as orações
  useEffect(() => {
    const aoTeclar = (e: KeyboardEvent) => {
      const alvo = e.target as HTMLElement;
      if (alvo.tagName === "INPUT" || alvo.tagName === "TEXTAREA") return;
      if (e.key === "ArrowRight") progresso.avancar(total);
      if (e.key === "ArrowLeft") progresso.voltar();
    };
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [progresso, total]);

  return (
    <div className="min-h-screen bg-[#fbf9f4]">
      {!preferencias.modoFoco && (
        <section className="relative overflow-hidden bg-surface-container-low py-16 md:py-24">
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, var(--color-primary) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
          <div className="relative max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
            <p className="font-label-sm mb-2 text-secondary">Oração Interativa</p>
            <h1 className="font-headline-xl text-primary mb-6">Santo Rosário</h1>
            <p className="font-body-lg text-on-surface-variant max-w-xl mx-auto leading-relaxed">
              Acompanhe o terço oração por oração. Escolha os mistérios do dia e reze no seu ritmo.
            </p>
          </div>
        </section>
      )}

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-12">
        {progresso.progressoSalvo && progresso.passoIndex === -1 && (
          <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl border border-[#c9a84c]/25 bg-white px-5 py-3">
            <p className="font-body-sm text-on-surface">
              Você tinha uma oração em andamento nos {" "}
              <strong>{GRUPOS.find((g) => g.slug === progresso.progressoSalvo?.misterioSlug)?.nome}</strong>.
            </p>
            <button
              type="button"
              onClick={progresso.continuarDeOndeParou}
              className="shrink-0 rounded-lg bg-primary px-4 py-1.5 font-body-sm font-semibold text-white hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt"
            >
              Continuar de onde parei
            </button>
          </div>
        )}

        {!preferencias.modoFoco && (
          <div className="mb-8">
            <MysterySelector
              grupos={GRUPOS}
              misterioSlug={progresso.misterioSlug}
              slugRecomendadoHoje={slugDeHoje}
              onSelecionar={progresso.selecionarMisterio}
            />
          </div>
        )}

        <div className="mb-6">
          <ProgressBar concluidosCount={progresso.concluidos.size} total={total} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-8 items-start">
          <div className="rounded-2xl border border-[#c9a84c]/25 bg-white p-4 md:p-6">
            <PrayerList
              sequencia={sequencia}
              grupo={grupoAtual}
              passoIndex={progresso.passoIndex}
              concluidos={progresso.concluidos}
              onSelecionarPasso={progresso.selecionarPasso}
            />
          </div>

          <div className="lg:sticky lg:top-8">
            <PrayerPanel
              grupo={grupoAtual}
              passo={passoAtual}
              oracao={oracaoAtual}
              tamanhoFonte={preferencias.tamanhoFonte}
            />
          </div>
        </div>

        <div className="mt-8">
          <Controls
            temAnterior={progresso.passoIndex > 0}
            temProxima={progresso.passoIndex < total - 1}
            iniciado={progresso.passoIndex >= 0}
            podeContinuar={!!progresso.progressoSalvo}
            onProxima={() => progresso.avancar(total)}
            onAnterior={progresso.voltar}
            onReiniciar={progresso.reiniciar}
            onContinuar={progresso.continuarDeOndeParou}
          />
        </div>
      </div>

      <AnimatePresence>
        {concluido && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Terço concluído"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="max-w-sm w-full rounded-2xl border border-[#c9a84c]/25 bg-white p-8 text-center shadow-xl"
            >
              <PartyPopper className="mx-auto mb-3 text-[#c9a84c]" size={40} aria-hidden="true" />
              <h2 className="font-heading text-2xl font-semibold mb-2 text-primary">Terço concluído!</h2>
              <p className="font-body-sm mb-6 text-on-surface-variant">
                <Sparkles className="inline-block -mt-0.5 mr-1" size={14} aria-hidden="true" />
                Que Nossa Senhora interceda por você. Deus vos abençoe.
              </p>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={progresso.reiniciar}
                  className="rounded-lg bg-primary px-4 py-2 font-body-sm font-semibold text-white hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt"
                >
                  Rezar novamente
                </button>
                <button
                  type="button"
                  onClick={() => {
                    progresso.reiniciar();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="rounded-lg border border-secondary/20 px-4 py-2 font-body-sm font-semibold text-on-surface hover:bg-secondary/5"
                >
                  Escolher outro mistério
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
