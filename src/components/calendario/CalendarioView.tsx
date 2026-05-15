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
    <main className="pt-32 pb-24 px-gutter max-w-container-max mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        {/* Left Side: Calendar and Legend */}
        <div className="col-span-1 lg:col-span-2">
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

          {/* Legend */}
          <div className="mt-12 flex flex-wrap gap-8 items-center justify-center p-8 ghost-border rounded-lg bg-surface">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-green-700 rounded-full"></div>
              <span className="font-label-sm text-label-sm">Tempo Comum</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-white border border-outline-variant rounded-full"></div>
              <span className="font-label-sm text-label-sm">Festas e Solenidades</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-red-700 rounded-full"></div>
              <span className="font-label-sm text-label-sm">Paixão e Mártires</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-purple-700 rounded-full"></div>
              <span className="font-label-sm text-label-sm">Penitência e Advento</span>
            </div>
          </div>
        </div>

        {/* Right Side: Details Sidebar */}
        <DaySidebar
          diaSelecionado={cal.diaSelecionado}
          dadosSelecionados={cal.dadosSelecionados}
        />
      </div>

      {/* Mobile bottom sheet */}
      <DaySheet
        diaSelecionado={cal.diaSelecionado}
        dadosSelecionados={cal.dadosSelecionados}
        aoFechar={cal.limparDia}
      />
    </main>
  );
}

