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

export interface ReadingSectionProps {
  title: string;
  leitura: Leitura;
  Icon: LucideIcon;
  isGospel?: boolean;
}

export interface PsalmSectionProps {
  salmo: Salmo;
}

export interface LiturgicalBackgroundProps {
  cor: string;
}

export interface LiturgiaSidebarProps {
  liturgia: LiturgiaDiaria;
}

export interface DateSelectorProps {
  currentParams: { dia?: string; mes?: string; ano?: string };
  initialDate?: string;
}

export interface LiturgiaPageProps {
  searchParams: Promise<{ dia?: string; mes?: string; ano?: string }>;
}