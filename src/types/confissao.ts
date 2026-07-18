/**
 * Modelo de dados da Preparação para a Confissão (exame de consciência interativo).
 * O conteúdo (mandamentos, perguntas, rito, orações) vive em src/data/exameConsciencia.json
 * e src/config/confissao.ts; este arquivo define apenas os tipos.
 *
 * Importante: nada desta funcionalidade é persistido (sem localStorage). Todo o estado
 * vive apenas em memória, no componente React, e é descartado ao sair da página —
 * ver src/lib/client/hooks/confissao/useExameConsciencia.ts.
 */

export type EstadoVida = "jovem" | "solteiro" | "casado" | "pais" | "religioso";

export interface OpcaoEstadoVida {
  slug: EstadoVida;
  nome: string;
  descricao: string;
  emoji: string;
}

export interface Mandamento {
  numero: number;
  titulo: string;
  resumo: string;
  perguntas: string[];
  /** Perguntas adicionais, específicas do estado de vida escolhido. */
  perguntasPorEstado?: Partial<Record<EstadoVida, string[]>>;
}

export interface PassoRito {
  titulo: string;
  texto: string;
}

export interface Oracao {
  titulo: string;
  texto: string;
}

export type AbaConfissao = "exame" | "resumo" | "rito" | "contricao" | "ajuda";

/** Identificador único de uma pergunta marcada: `${numeroMandamento}:${indicePergunta}`. */
export type IdPergunta = string;

export interface ItemResumoMandamento {
  mandamento: Mandamento;
  perguntasMarcadas: string[];
}

export interface PropsSeletorEstadoVida {
  opcoes: OpcaoEstadoVida[];
  estadoSelecionado: EstadoVida | null;
  onSelecionar: (estado: EstadoVida) => void;
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
