import { Settings, List, BookOpen, ScrollText, BookMarked } from "lucide-react";
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
      className={`flex items-center justify-between px-4 py-3 border-b sticky top-0 z-20 backdrop-blur-sm ${t.barraFerramentas}`}
    >
      <div className="flex items-center gap-2">
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
          className={`p-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${t.muted}`}
        >
          <BookOpen size={18} aria-hidden="true" />
        </Link>

        <div className="w-px h-5 mx-1 opacity-20" style={{ background: "currentColor" }} aria-hidden="true" />

        <div>
          <p className={`font-heading font-semibold text-base leading-tight ${t.texto}`}>{nomeLivro}</p>
          <p className={`text-xs font-body ${t.muted}`}>
            Cap. {numeroCapitulo} · {quantidadeVersiculos} versículos
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1">
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
