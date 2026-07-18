import type { EstadoVida, Mandamento, OpcaoEstadoVida } from "@/types/confissao";
import exameData from "@/data/exameConsciencia.json";

export const ESTADOS_VIDA = exameData.estados as OpcaoEstadoVida[];
export const MANDAMENTOS = exameData.mandamentos as Mandamento[];
export const RITO_CONFISSAO = exameData.rito;
export const ATO_DE_CONTRICAO = exameData.atoDeContricao;
export const FAZIA_TEMPO = exameData.faziaTempo;

/** Perguntas do mandamento, já com as adicionais do estado de vida escolhido. */
export function obterPerguntas(mandamento: Mandamento, estadoVida: EstadoVida): string[] {
  const extras = mandamento.perguntasPorEstado?.[estadoVida] ?? [];
  return [...mandamento.perguntas, ...extras];
}
