export interface Verse {
  versiculo: number;
  texto: string;
}

export interface Chapter {
  capitulo: number;
  versiculos: Verse[];
}

export interface Book {
  nome: string;
  capitulos: Chapter[];
}

export interface BibleData {
  antigoTestamento: Book[];
  novoTestamento: Book[];
}
