/**
 * Modelo de dados da Preparação para a Confissão (exame de consciência interativo).
 * O conteúdo (mandamentos, perguntas, rito, orações) vive em src/data/exameConsciencia.json
 * e src/config/confissao.ts; este arquivo define apenas os tipos.
 *
 * Importante: nada desta funcionalidade é persistido (sem localStorage). Todo o estado
 * vive apenas em memória, no componente React, e é descartado ao sair da página —
 * ver src/lib/client/hooks/confissao/useExameConsciencia.ts.
 */

export interface Mandamento {
  numero: number;
  /** Rótulo de exibição, ex.: "1º Mandamento" ou "6º e 9º Mandamentos". */
  rotulo: string;
  titulo: string;
  resumo: string;
  perguntas: string[];
  /** Nota de atenção do Manual de Confissão, exibida em destaque abaixo do resumo. */
  observacao?: string;
}

export interface PassoRito {
  titulo: string;
  texto: string;
}

export interface Oracao {
  titulo: string;
  texto: string;
}

/** Um item explicativo com título, texto e um exemplo opcional (usado na aba "Sobre a Confissão"). */
export interface PassoExplicativo {
  titulo: string;
  texto: string;
  exemplo?: string;
}

export interface SacramentoConfissao {
  citacao: { texto: string; autor: string };
  condicoesPecadoMortal: PassoExplicativo[];
  obsPecadoMortal: string;
  requisitos: PassoExplicativo[];
  sigilo: string;
  oracaoPreparatoria: Oracao;
  perguntasIniciais: string[];
}

export type AbaConfissao = "sacramento" | "exame" | "resumo" | "rito" | "contricao" | "ajuda";

/** Identificador único de uma pergunta marcada: `${numeroMandamento}:${indicePergunta}`. */
export type IdPergunta = string;

export interface ItemResumoMandamento {
  mandamento: Mandamento;
  perguntasMarcadas: string[];
}

export interface PropsListaMandamentos {
  mandamentos: Mandamento[];
  mandamentoIndex: number;
  marcadosPorMandamento: (mandamento: Mandamento) => number;
  onSelecionar: (indice: number) => void;
}

export interface PropsMandamentoPanel {
  mandamento: Mandamento;
  perguntas: string[];
  marcados: Set<IdPergunta>;
  onAlternar: (id: IdPergunta) => void;
}

export interface PropsPerguntaItem {
  texto: string;
  marcado: boolean;
  onAlternar: () => void;
}

export interface PropsProgressBar {
  atualCount: number;
  total: number;
  rotulo: string;
}

export interface PropsControls {
  temAnterior: boolean;
  temProxima: boolean;
  onAnterior: () => void;
  onProxima: () => void;
  onVerResumo: () => void;
}
