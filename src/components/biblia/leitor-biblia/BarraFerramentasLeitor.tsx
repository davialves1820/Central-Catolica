import { Settings, List, ScrollText, BookMarked, Home } from "lucide-react";
import Link from "next/link";
import { type PropsBarraFerramentasLeitor } from "@/types/biblia";
import BotaoBarraFerramentas from "./BotaoBarraFerramentas";

export default function BarraFerramentasLeitor({
  t,
  nomeLivro,
  numeroCapitulo,
  quantidadeVersiculos,
  modoLeitura,
  exibirSumario,
  exibirConfiguracoes,
  aoAlternarSumario,
  aoAlternarConfiguracoes,
  aoAlternarModoLeitura,
}: PropsBarraFerramentasLeitor) {
  return (
    <div
      className={`flex items-center justify-between px-6 py-4 border-b sticky top-0 z-40 backdrop-blur-md ${t.barraFerramentas}`}
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <BotaoBarraFerramentas
            onClick={aoAlternarSumario}
            active={exibirSumario}
            label={exibirSumario ? "Fechar índice" : "Abrir índice de capítulos"}
          >
            <List size={18} aria-hidden="true" />
          </BotaoBarraFerramentas>

          <Link
            href="/biblia"
            aria-label="Voltar para a Bíblia"
            className={`p-2.5 rounded-xl transition-all hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${t.muted}`}
          >
            <Home size={18} aria-hidden="true" />
          </Link>
        </div>

        <div className="w-px h-6 mx-2 opacity-10 bg-primary" aria-hidden="true" />

        <div>
          <p className={`font-heading font-medium text-lg leading-tight ${t.texto}`}>{nomeLivro}</p>
          <p className={`text-[10px] font-body font-bold uppercase tracking-widest opacity-60 ${t.muted}`}>
            Capítulo {numeroCapitulo} · {quantidadeVersiculos} Versículos
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <BotaoBarraFerramentas
          onClick={aoAlternarModoLeitura}
          active={modoLeitura === "continuo"}
          label={modoLeitura === "paginado" ? "Leitura contínua" : "Leitura paginada"}
        >
          {modoLeitura === "paginado"
            ? <ScrollText size={18} aria-hidden="true" />
            : <BookMarked size={18} aria-hidden="true" />}
        </BotaoBarraFerramentas>

        <BotaoBarraFerramentas
          onClick={aoAlternarConfiguracoes}
          active={exibirConfiguracoes}
          label={exibirConfiguracoes ? "Fechar configurações" : "Configurações de leitura"}
        >
          <Settings size={18} aria-hidden="true" />
        </BotaoBarraFerramentas>
      </div>
    </div>
  );
}
