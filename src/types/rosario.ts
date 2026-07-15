/**
 * Modelo de dados do Rosário Interativo.
 * O conteúdo (mistérios e orações) vive em src/data/*.json e src/config/rosario.ts;
 * este arquivo define apenas os tipos. Cores e fontes seguem os tokens globais do site
 * (text-primary, text-on-surface-variant, font-headline-xl, etc. — ver globals.css).
 */

export type SlugMisterio = "gozosos" | "dolorosos" | "gloriosos" | "luminosos";

export interface Misterio {
  numero: number;
  nome: string;
  meditacao: string;
  fruto: string;
}

export interface GrupoMisterio {
  slug: SlugMisterio;
  nome: string;
  dias: string[];
  cor: string;
  bgCor: string;
  emoji: string;
  descricao: string;
  misterios: Misterio[];
}

/** Tipo de oração/conta representada em um ponto da sequência do terço. */
export type TipoConta =
  | "cruz"
  | "creio"
  | "pai-nosso"
  | "ave-maria"
  | "gloria"
  | "o-meu-jesus"
  | "salve-rainha";

export interface Oracao {
  titulo: string;
  slug: string;
  texto: string;
  referencia?: string;
}

/** Um passo (conta) na sequência completa de orações do terço. */
export interface PassoRosario {
  /** Posição sequencial única, 0-based. */
  ordem: number;
  tipo: TipoConta;
  oracaoSlug: string;
  /** Rótulo curto exibido junto à conta / no painel, ex: "3ª Ave-Maria". */
  rotulo: string;
  /** Índice (0-4) do mistério/dezena ao qual este passo pertence; ausente na introdução. */
  grupoIndex?: number;
  /** Posição da Ave-Maria dentro da dezena (1-10), quando aplicável. */
  posicaoNaDezena?: number;
}

export const TAMANHO_FONTE_MIN = 14;
export const TAMANHO_FONTE_MAX = 24;
export const TAMANHO_FONTE_PASSO = 2;

export interface ProgressoRosario {
  misterioSlug: SlugMisterio;
  passoIndex: number;
  concluidos: number[];
  atualizadoEm: number;
}

export interface PreferenciasRosario {
  tamanhoFonte: number;
  modoFoco: boolean;
}

export interface PropsPrayerListItem {
  passo: PassoRosario;
  ativo: boolean;
  concluido: boolean;
  onSelecionar: () => void;
}

export interface PropsPrayerList {
  sequencia: PassoRosario[];
  grupo: GrupoMisterio;
  passoIndex: number;
  concluidos: Set<number>;
  onSelecionarPasso: (indice: number) => void;
}

export interface PropsMysterySelector {
  grupos: GrupoMisterio[];
  misterioSlug: SlugMisterio;
  slugRecomendadoHoje: SlugMisterio;
  onSelecionar: (slug: SlugMisterio) => void;
}

export interface PropsProgressBar {
  concluidosCount: number;
  total: number;
}

export interface PropsPrayerCard {
  oracao: Oracao;
  tamanhoFonte: number;
}

export interface PropsPrayerPanel {
  grupo: GrupoMisterio;
  passo: PassoRosario | null;
  oracao: Oracao | null;
  tamanhoFonte: number;
}

export interface PropsControls {
  temAnterior: boolean;
  temProxima: boolean;
  iniciado: boolean;
  podeContinuar: boolean;
  onProxima: () => void;
  onAnterior: () => void;
  onReiniciar: () => void;
  onContinuar: () => void;
}
