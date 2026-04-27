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
