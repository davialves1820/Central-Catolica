"use client";

import { useCallback, useRef, useState } from "react";
import { Trash2 } from "lucide-react";
import type { AbaConfissao } from "@/types/confissao";
import { MANDAMENTOS, RITO_CONFISSAO, ATO_DE_CONTRICAO, FAZIA_TEMPO, SACRAMENTO } from "@/config/confissao";
import { useExameConsciencia } from "@/lib/client/hooks/confissao/useExameConsciencia";
import { AvisoPrivacidade } from "./AvisoPrivacidade";
import { ListaMandamentos } from "./ListaMandamentos";
import { MandamentoPanel } from "./MandamentoPanel";
import { ProgressBar } from "./ProgressBar";
import { Controls } from "./Controls";
import { Resumo } from "./Resumo";
import { RitoConfissao } from "./RitoConfissao";
import { AtoDeContricao } from "./AtoDeContricao";
import { FazTempoQueNaoConfesso } from "./FazTempoQueNaoConfesso";
import { SacramentoInfo } from "./SacramentoInfo";

const ABAS: { slug: AbaConfissao; rotulo: string }[] = [
  { slug: "sacramento", rotulo: "Sobre a Confissão" },
  { slug: "exame", rotulo: "Exame" },
  { slug: "resumo", rotulo: "Resumo" },
  { slug: "rito", rotulo: "Como se confessar" },
  { slug: "contricao", rotulo: "Ato de Contrição" },
  { slug: "ajuda", rotulo: "Faz tempo que não me confesso" },
];

function BotaoLimparTudo({ onConfirmar }: { onConfirmar: () => void }) {
  const [confirmando, setConfirmando] = useState(false);

  if (confirmando) {
    return (
      <div className="flex items-center gap-2 font-body-sm">
        <span className="text-on-surface-variant">Limpar tudo?</span>
        <button
          type="button"
          onClick={() => {
            onConfirmar();
            setConfirmando(false);
          }}
          className="rounded-lg bg-red-600 px-3 py-1.5 font-semibold text-white hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt"
        >
          Sim, limpar
        </button>
        <button
          type="button"
          onClick={() => setConfirmando(false)}
          className="rounded-lg border border-secondary/20 px-3 py-1.5 text-on-surface hover:bg-secondary/5"
        >
          Cancelar
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirmando(true)}
      className="inline-flex items-center gap-1.5 rounded-lg border border-secondary/20 px-3 py-1.5 font-body-sm text-on-surface transition-colors hover:bg-secondary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt"
    >
      <Trash2 size={14} aria-hidden="true" />
      Limpar tudo
    </button>
  );
}

export function ConfissaoApp() {
  const exame = useExameConsciencia();
  const topoRef = useRef<HTMLDivElement>(null);

  // Em telas pequenas, o painel do mandamento fica abaixo da lista e dos controles:
  // ao trocar de mandamento ou de aba, rolamos até o topo do conteúdo para o usuário
  // não precisar arrastar a tela para cima manualmente.
  const rolarParaTopo = useCallback(() => {
    topoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const irParaAbaComScroll = useCallback(
    (aba: AbaConfissao) => {
      exame.irParaAba(aba);
      rolarParaTopo();
    },
    [exame, rolarParaTopo]
  );

  const avancarComScroll = useCallback(() => {
    exame.avancarMandamento(MANDAMENTOS.length);
    rolarParaTopo();
  }, [exame, rolarParaTopo]);

  const voltarComScroll = useCallback(() => {
    exame.voltarMandamento();
    rolarParaTopo();
  }, [exame, rolarParaTopo]);

  const selecionarMandamentoComScroll = useCallback(
    (indice: number) => {
      exame.irParaMandamento(indice);
      rolarParaTopo();
    },
    [exame, rolarParaTopo]
  );

  const verResumoComScroll = useCallback(() => {
    exame.irParaAba("resumo");
    rolarParaTopo();
  }, [exame, rolarParaTopo]);

  const mandamentoAtual = MANDAMENTOS[exame.mandamentoIndex];
  const perguntasPorMandamento = (mandamento: (typeof MANDAMENTOS)[number]) => mandamento.perguntas;

  const marcadosPorMandamento = (mandamento: (typeof MANDAMENTOS)[number]) => {
    const perguntas = perguntasPorMandamento(mandamento);
    return perguntas.filter((_, indice) => exame.marcados.has(`${mandamento.numero}:${indice}`)).length;
  };

  const totalMarcados = MANDAMENTOS.reduce((soma, m) => soma + marcadosPorMandamento(m), 0);

  return (
    <div className="min-h-screen bg-[#fbf9f4]">
      <section className="relative overflow-hidden bg-surface-container-low py-16 md:py-24">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, var(--color-primary) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <p className="font-label-sm mb-2 text-secondary">Preparação para a Confissão</p>
          <h1 className="font-headline-xl text-primary mb-6">Exame de Consciência</h1>
          <p className="font-body-lg text-on-surface-variant max-w-xl mx-auto leading-relaxed">
            Um roteiro para se preparar com calma para o Sacramento da Reconciliação, no seu ritmo.
          </p>
        </div>
      </section>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-12">
        <div className="mb-6">
          <AvisoPrivacidade />
        </div>

        <div ref={topoRef} className="mb-6 flex flex-wrap items-center justify-between gap-3 scroll-mt-4">
          <nav className="flex flex-wrap gap-2" aria-label="Seções da preparação">
            {ABAS.filter((aba) => aba.slug !== "resumo" || exame.iniciado).map((aba) => {
              const ativo = aba.slug === exame.abaAtiva;
              return (
                <button
                  key={aba.slug}
                  type="button"
                  onClick={() => irParaAbaComScroll(aba.slug)}
                  aria-current={ativo ? "page" : undefined}
                  className={`rounded-lg px-3 py-1.5 font-body-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt ${
                    ativo ? "bg-primary text-white" : "border border-secondary/20 text-on-surface hover:bg-secondary/5"
                  }`}
                >
                  {aba.rotulo}
                </button>
              );
            })}
          </nav>
          {exame.iniciado && <BotaoLimparTudo onConfirmar={exame.limparTudo} />}
        </div>

        {exame.abaAtiva === "sacramento" && <SacramentoInfo sacramento={SACRAMENTO} />}

        {exame.abaAtiva === "exame" && (
          <>
            {!exame.iniciado ? (
              <div className="rounded-2xl border border-[#c9a84c]/25 bg-white p-8 md:p-10 text-center">
                <h2 className="font-heading text-xl font-semibold mb-2 text-primary">Pronto para começar?</h2>
                <p className="mb-6 font-body-md text-on-surface-variant max-w-md mx-auto">
                  Vamos percorrer os Dez Mandamentos e os Cinco Mandamentos da Igreja, um de cada vez, no seu ritmo.
                </p>
                <button
                  type="button"
                  onClick={exame.iniciarExame}
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-2.5 font-body-md font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt"
                >
                  Começar o exame
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <ProgressBar
                    atualCount={exame.mandamentoIndex + 1}
                    total={MANDAMENTOS.length}
                    rotulo={`Passo ${exame.mandamentoIndex + 1} de ${MANDAMENTOS.length}`}
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-8 items-start">
                  <div className="rounded-2xl border border-[#c9a84c]/25 bg-white p-4 md:p-6">
                    <ListaMandamentos
                      mandamentos={MANDAMENTOS}
                      mandamentoIndex={exame.mandamentoIndex}
                      marcadosPorMandamento={marcadosPorMandamento}
                      onSelecionar={selecionarMandamentoComScroll}
                    />
                  </div>

                  <div className="lg:sticky lg:top-8">
                    <MandamentoPanel
                      mandamento={mandamentoAtual}
                      perguntas={mandamentoAtual.perguntas}
                      marcados={exame.marcados}
                      onAlternar={exame.alternarPergunta}
                    />
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
                  <Controls
                    temAnterior={exame.mandamentoIndex > 0}
                    temProxima={exame.mandamentoIndex < MANDAMENTOS.length - 1}
                    onAnterior={voltarComScroll}
                    onProxima={avancarComScroll}
                    onVerResumo={verResumoComScroll}
                  />
                  {totalMarcados > 0 && (
                    <p className="font-body-sm text-on-surface-variant">
                      {totalMarcados} {totalMarcados === 1 ? "ponto marcado" : "pontos marcados"} até agora.
                    </p>
                  )}
                </div>
              </>
            )}
          </>
        )}

        {exame.abaAtiva === "resumo" && (
          <Resumo mandamentos={MANDAMENTOS} perguntasPorMandamento={perguntasPorMandamento} marcados={exame.marcados} />
        )}

        {exame.abaAtiva === "rito" && <RitoConfissao passos={RITO_CONFISSAO} />}

        {exame.abaAtiva === "contricao" && <AtoDeContricao oracao={ATO_DE_CONTRICAO} />}

        {exame.abaAtiva === "ajuda" && (
          <FazTempoQueNaoConfesso titulo={FAZIA_TEMPO.titulo} pontos={FAZIA_TEMPO.pontos} />
        )}
      </div>
    </div>
  );
}
