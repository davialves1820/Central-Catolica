import type { Mandamento, SacramentoConfissao } from "@/types/confissao";
import exameData from "@/data/exameConsciencia.json";

export const MANDAMENTOS = exameData.mandamentos as Mandamento[];
export const RITO_CONFISSAO = exameData.rito;
export const ATO_DE_CONTRICAO = exameData.atoDeContricao;
export const FAZIA_TEMPO = exameData.faziaTempo;
export const SACRAMENTO = exameData.sacramento as SacramentoConfissao;
