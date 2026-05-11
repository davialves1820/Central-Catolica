"use client";

import { useState } from "react";
import { type PropsLeitorBiblia, TEMAS } from "@/types/biblia";
import { usePreferenciasLeitor } from "@/lib/client/hooks/biblia/usePreferenciasLeitor";
import { useNavegacaoCapitulo } from "@/lib/client/hooks/biblia/useNavegacaoCapitulo";
import { useDestaqueVersiculo } from "@/lib/client/hooks/biblia/useDestaqueVersiculo";
import { useProgressoLeitura } from "@/lib/client/hooks/biblia/useProgressoLeitura";
import BarraProgressoLeitor from "@/components/biblia/leitor-biblia/BarraProgressoLeitor";
import BarraFerramentasLeitor from "@/components/biblia/leitor-biblia/BarraFerramentasLeitor";
import Sumario from "@/components/biblia/leitor-biblia/Sumario";
import PainelConfiguracoes from "@/components/biblia/leitor-biblia/PainelConfiguracoes";
import ConteudoCapitulo from "@/components/biblia/leitor-biblia/ConteudoCapitulo";
import RodapeNavegacao from "@/components/biblia/leitor-biblia/RodapeNavegacao";

export default function LeitorBiblia({
  livro,
  indexCapituloInicial,
  versiculoDestaque: versiculoDestaqueInicial,
}: PropsLeitorBiblia) {
  const [exibirConfiguracoes, setExibirConfiguracoes] = useState(false);
  const [exibirSumario, setExibirSumario] = useState(false);

  const { tamanhoFonte, tema, modoLeitura, setTamanhoFonte, setTema, setModoLeitura } =
    usePreferenciasLeitor();

  const { indexCapitulo, direcao, temProximo, temAnterior, navegar, irPara, manipuladoresToque } =
    useNavegacaoCapitulo({
      indexInicial: indexCapituloInicial,
      total: livro.capitulos.length,
    });

  const { versiculoDestaque, limparDestaque, refsVersiculo } = useDestaqueVersiculo(versiculoDestaqueInicial, indexCapitulo);

  const capituloAtual = livro.capitulos[indexCapitulo];

  useProgressoLeitura({
    nomeLivro: livro.nome,
    capitulo: capituloAtual.capitulo,
    destaqueVersiculo: versiculoDestaque,
  });

  const t = TEMAS[tema as keyof typeof TEMAS];

  return (
    <div
      className={`relative rounded-2xl overflow-hidden border shadow-2xl transition-colors duration-300 ${t.borda}`}
      style={{ background: t.bg }}
      {...manipuladoresToque}
    >
      <BarraProgressoLeitor atual={indexCapitulo} total={livro.capitulos.length} />

      <BarraFerramentasLeitor
        t={t}
        nomeLivro={livro.nome}
        numeroCapitulo={capituloAtual.capitulo}
        quantidadeVersiculos={capituloAtual.versiculos.length}
        modoLeitura={modoLeitura}
        exibirSumario={exibirSumario}
        exibirConfiguracoes={exibirConfiguracoes}
        aoAlternarSumario={() => setExibirSumario((v) => !v)}
        aoAlternarConfiguracoes={() => setExibirConfiguracoes((v) => !v)}
        aoAlternarModoLeitura={() =>
          setModoLeitura(modoLeitura === "paginado" ? "continuo" : "paginado")
        }
      />

      <Sumario
        t={t}
        capitulos={livro.capitulos}
        indexAtual={indexCapitulo}
        estaAberto={exibirSumario}
        aoFechar={() => setExibirSumario(false)}
        aoSelecionar={(idx) => {
          irPara(idx);
          limparDestaque();
          setExibirSumario(false);
        }}
      />

      <PainelConfiguracoes
        t={t}
        estaAberto={exibirConfiguracoes}
        tamanhoFonte={tamanhoFonte}
        tema={tema}
        bg={t.bg}
        aoMudarTamanhoFonte={setTamanhoFonte}
        aoMudarTema={setTema}
      />

      <div
        className="relative min-h-[70vh] px-5 py-12 sm:px-14 sm:py-16"
        style={{ fontSize: `${tamanhoFonte}px` }}
      >
        <ConteudoCapitulo
          livro={livro}
          indexCapitulo={indexCapitulo}
          direcao={direcao}
          tamanhoFonte={tamanhoFonte}
          t={t}
          modoLeitura={modoLeitura}
          versiculoDestaque={versiculoDestaque}
          refsVersiculo={refsVersiculo}
        />
      </div>

      {modoLeitura === "paginado" && (
        <RodapeNavegacao
          t={t}
          indexCapitulo={indexCapitulo}
          total={livro.capitulos.length}
          temProximo={temProximo}
          temAnterior={temAnterior}
          aoAnterior={() => navegar(-1)}
          aoProximo={() => navegar(1)}
        />
      )}

      <p
        className="md:hidden text-center py-2 text-xs font-body select-none"
        style={{ color: "hsl(var(--gold)/0.3)" }}
        aria-hidden="true"
      >
        ← deslize para navegar →
      </p>
    </div>
  );
}
