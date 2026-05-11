import { DateTime } from "luxon";

export const PONTO: Record<string, string> = {
  VERDE: "bg-emerald-500",
  ROXO: "bg-purple-500",
  BRANCO: "bg-slate-300",
  VERMELHO: "bg-red-500",
  ROSA: "bg-pink-400",
  AMARELO: "bg-amber-400",
  PRETO: "bg-slate-600",
};

export const BADGE_BG: Record<string, string> = {
  GREEN: "hsl(142,55%,25%)",
  PURPLE: "hsl(270,45%,28%)",
  WHITE: "hsl(220,12%,45%)",
  RED: "hsl(0,58%,28%)",
  ROSE: "hsl(330,52%,32%)",
  GOLD: "hsl(42,75%,32%)",
  BLACK: "hsl(220,12%,16%)",
  VERDE: "hsl(142,55%,25%)",
  ROXO: "hsl(270,45%,28%)",
  BRANCO: "hsl(220,12%,45%)",
  VERMELHO: "hsl(0,58%,28%)",
  ROSA: "hsl(330,52%,32%)",
};

export const GRAUS: Record<string, string> = {
  SOLEMNITY: "Solenidade",
  SUNDAY: "Domingo",
  FEAST: "Festa",
  MEMORIAL: "Memória",
  OPTIONAL_MEMORIAL: "Memória Opcional",
  WEEKDAY: "Féria",
};

export const obterPonto = (cor: string) => {
  return `block w-1.5 h-1.5 rounded-full shrink-0 ${PONTO[cor] || "bg-slate-400"}`;
};

export interface DadosDiaLiturgico {
  chave: string;
  nome: string;
  rank: string;
  nomeRank: string;
  cores: string[];
  nomesCores: string[];
  temporadas: string[];
  nomesTemporadas: string[];
}

export interface EntradaDiaJson {
  nome: string;
  cor: string;
  rank: string;
  temporada: string;
}

export type ModoVisualizacao = "grade" | "lista";

export interface EstadoCalendario {
  /* estado atual */
  dataAtual: DateTime;
  diaSelecionado: string | null;
  modoVisualizacao: ModoVisualizacao;
  estaMontado: boolean;

  /* derivados */
  rotuloMes: string;
  diasNoMes: { data: DateTime; ehMesAtual: boolean }[];
  listaDias: DateTime[];
  dadosSelecionados: DadosDiaLiturgico[] | null;

  /* ações */
  irAnterior: () => void;
  irProximo: () => void;
  irHoje: () => void;
  selecionarDia: (dateStr: string) => void;
  limparDia: () => void;
  setModoVisualizacao: (m: ModoVisualizacao) => void;
}

export interface CelulaDia {
  data: DateTime;
  ehMesAtual: boolean;
}

export interface PropsBarraLateralDia {
  diaSelecionado: string | null;
  dadosSelecionados: DadosDiaLiturgico[] | null;
}

export interface PropsDrawerDia {
  diaSelecionado: string | null;
  dadosSelecionados: DadosDiaLiturgico[] | null;
  aoFechar: () => void;
}

export interface PropsPontoCor {
  cor: string;
  className?: string;
}

export interface PropsVisualizacaoCalendario {
  calendarioInicial: Record<string, DadosDiaLiturgico[]>;
}

export interface PropsVisualizacaoListaCalendario {
  dias: DateTime[];
  calendario: Record<string, DadosDiaLiturgico[]>;
  diaSelecionado: string | null;
  estaMontado: boolean;
  rotuloMes: string;
  aoSelecionarDia: (dateStr: string) => void;
}

export interface PropsCabecalhoCalendario {
  rotuloMes: string;
  modoVisualizacao: ModoVisualizacao;
  aoAnterior: () => void;
  aoProximo: () => void;
  aoHoje: () => void;
  aoMudarModo: (m: ModoVisualizacao) => void;
}

export interface PropsVisualizacaoGradeCalendario {
  dias: CelulaDia[];
  calendario: Record<string, DadosDiaLiturgico[]>;
  diaSelecionado: string | null;
  estaMontado: boolean;
  rotuloMes: string;
  aoSelecionarDia: (dateStr: string) => void;
}