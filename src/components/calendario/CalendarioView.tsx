"use client";

import { type PropsVisualizacaoCalendario } from "@/types/calendario";
import { useCalendario } from "../../lib/client/hooks/calendario/useCalendario";
import CalendarioHeader from "./CalendarioHeader";
import CalendarioGridView from "./CalendarioGridView";
import CalendarioListView from "./CalendarioListView";
import DaySidebar from "./DaySidebar";
import DaySheet from "./DaySheet";

export default function CalendarioView({ calendarioInicial }: PropsVisualizacaoCalendario) {
  const cal = useCalendario(calendarioInicial);

  /* Avoid hydration mismatch — render nothing until client mounts */
  if (!cal.estaMontado) return null;

  return (
    <>
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 py-4 sm:py-10">
        <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-10">

          {/* ── Calendar column ── */}
          <div className="md:col-span-2 xl:col-span-3">
            <div
              className="overflow-hidden border border-border rounded-2xl shadow-lg"
              style={{ background: "hsl(var(--card))" }}
            >
              <CalendarioHeader
                rotuloMes={cal.rotuloMes}
                modoVisualizacao={cal.modoVisualizacao}
                aoMudarModo={cal.setModoVisualizacao}
                aoAnterior={cal.irAnterior}
                aoProximo={cal.irProximo}
                aoHoje={cal.irHoje}
              />

              {cal.modoVisualizacao === "grade" ? (
                <CalendarioGridView
                  dias={cal.diasNoMes}
                  calendario={calendarioInicial}
                  diaSelecionado={cal.diaSelecionado}
                  estaMontado={cal.estaMontado}
                  rotuloMes={cal.rotuloMes}
                  aoSelecionarDia={cal.selecionarDia}
                />
              ) : (
                <CalendarioListView
                  dias={cal.listaDias}
                  calendario={calendarioInicial}
                  diaSelecionado={cal.diaSelecionado}
                  estaMontado={cal.estaMontado}
                  rotuloMes={cal.rotuloMes}
                  aoSelecionarDia={cal.selecionarDia}
                />
              )}
            </div>
          </div>

          {/* ── Desktop sidebar ── */}
          <DaySidebar
            diaSelecionado={cal.diaSelecionado}
            dadosSelecionados={cal.dadosSelecionados}
          />
        </div>
      </div>

      {/* ── Mobile bottom sheet ── */}
      <DaySheet
        diaSelecionado={cal.diaSelecionado}
        dadosSelecionados={cal.dadosSelecionados}
        aoFechar={cal.limparDia}
      />
    </>
  );
}
