import { motion, AnimatePresence } from "framer-motion";
import { PropsConteudoCapitulo } from "@/types/biblia";
import CabecalhoCapitulo from "./CabecalhoCapitulo";
import ItemVersiculo from "./ItemVersiculo";

export default function ConteudoCapitulo({
  livro,
  indexCapitulo,
  direcao,
  tamanhoFonte,
  t,
  modoLeitura,
  versiculoDestaque,
  refsVersiculo,
}: PropsConteudoCapitulo) {
  const capituloAtual = livro.capitulos[indexCapitulo];

  const criarRefVersiculo = (numeroVersiculo: number) => (el: HTMLElement | null) => {
    if (el) refsVersiculo.current.set(numeroVersiculo, el);
    else refsVersiculo.current.delete(numeroVersiculo);
  };

  if (modoLeitura === "continuo") {
    return (
      <div className="max-w-3xl mx-auto">
        <p
          className="text-center font-body text-[10px] font-bold uppercase tracking-[0.4em] mb-16 opacity-40"
          style={{ color: "hsl(var(--primary))" }}
        >
          Leitura contínua
        </p>
        {livro.capitulos.map((cap) => (
          <div key={cap.capitulo} className="mb-24">
            <CabecalhoCapitulo t={t} nomeLivro={livro.nome} numeroCapitulo={cap.capitulo} />
            <div className="space-y-1">
              {cap.versiculos.map((v, vi) => (
                <ItemVersiculo
                  key={v.versiculo}
                  versiculo={v}
                  t={t}
                  tamanhoFonte={tamanhoFonte}
                  ehPrimeiro={vi === 0}
                  estaDestacado={v.versiculo === versiculoDestaque}
                  refVersiculo={criarRefVersiculo(v.versiculo)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait" custom={direcao}>
      <motion.div
        key={`${livro.nome}-${capituloAtual.capitulo}`}
        custom={direcao}
        variants={{
          enter: (d: number) => ({ x: d * 36, opacity: 0 }),
          center: { x: 0, opacity: 1 },
          exit: (d: number) => ({ x: d * -36, opacity: 0 }),
        }}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.26, ease: "easeInOut" }}
        className="max-w-2xl mx-auto"
      >
        <CabecalhoCapitulo t={t} nomeLivro={livro.nome} numeroCapitulo={capituloAtual.capitulo} />
        <div className="space-y-0.5">
          {capituloAtual.versiculos.map((v, idx) => (
            <ItemVersiculo
              key={v.versiculo}
              versiculo={v}
              t={t}
              tamanhoFonte={tamanhoFonte}
              ehPrimeiro={idx === 0}
              estaDestacado={v.versiculo === versiculoDestaque}
              refVersiculo={criarRefVersiculo(v.versiculo)}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
