import { type LucideIcon } from "lucide-react";

export interface Leitura {
  referencia: string;
  titulo: string;
  texto: string;
}

export interface Salmo {
  referencia: string;
  refrao: string;
  texto: string;
}

export interface Antifonas {
  entrada: string;
  comunhao: string;
}

export interface LiturgiaDiaria {
  data: string;
  liturgia: string;
  cor: string;
  dia: string;
  oferendas: string;
  comunhao: string;
  primeiraLeitura: Leitura;
  salmo: Salmo;
  segundaLeitura?: Leitura;
  evangelho: Leitura;
  antifonas: Antifonas;
}

export interface PropsSecaoLeitura {
  titulo: string;
  leitura: Leitura;
  Icon: LucideIcon;
  ehEvangelho?: boolean;
}

export interface PropsSecaoSalmo {
  salmo: Salmo;
}

export interface PropsFundoLiturgico {
  cor: string;
}

export interface PropsBarraLateralLiturgia {
  liturgia: LiturgiaDiaria;
}

export interface PropsSeletorData {
  parametrosAtuais: { dia?: string; mes?: string; ano?: string };
  dataInicial?: string;
}

export interface PropsPaginaLiturgia {
  searchParams: Promise<{ dia?: string; mes?: string; ano?: string }>;
}